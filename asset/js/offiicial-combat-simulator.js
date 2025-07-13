/* **********************************************************************************************************************
 * function name		:	importModuleManager()
 * description			: 	사용하는 모든 외부 module파일 import
 *********************************************************************************************************************** */

export async function importModuleManager() {
    // 이 함수는 매개변수를 받지 않으며, 정의된 모든 모듈을 무조건 로드합니다.

    let interValTime = 60 * 1000;
    const cacheBuster = `?${Math.floor((new Date).getTime() / interValTime)}`;

    // 로드할 가능성이 있는 모든 모듈 정보
    // filename 키는 더 이상 사용되지 않으므로 제거했습니다.
    const potentialModules = [
        { key: 'apiCalcValue', path: '../custom-module/api-calc.js' },
        { key: 'officialCombatDealer', path: '../filter/official-combat-dealer.js' },
    ];

    const promisesToLoad = [];
    const loadedModuleKeys = [];

    // potentialModules 목록을 순회하며 모든 모듈을 로드 대상에 추가
    for (const moduleInfo of potentialModules) {
        // filename 키와 관련된 로직은 모두 제거되었습니다.

        // 모든 모듈을 로드할 프로미스 배열에 추가합니다.
        promisesToLoad.push(import(moduleInfo.path + cacheBuster));
        // 로드될 모듈의 키(key)도 함께 저장합니다.
        loadedModuleKeys.push(moduleInfo.key);
    }

    // 로드 대상으로 선정된 모든 모듈을 비동기적으로 로드
    const loadedModules = await Promise.all(promisesToLoad);

    // 로드된 모듈들을 원래의 키에 매핑하여 결과 객체 생성
    const Modules = {};
    for (let i = 0; i < loadedModules.length; i++) {
        const key = loadedModuleKeys[i];
        Modules[key] = loadedModules[i];
    }

    // 로드되지 않은 모듈에 대한 키는 결과 객체에 포함되지 않습니다.
    return Modules;
}
let Modules = await importModuleManager();


export async function simulatorToOffcialCombatObj() {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('headerCharacterName');
    let apiData = await Modules.apiCalcValue.apiCalcValue(nameParam);


    /* **********************************************************************************************************************
     * name		              :	  characterLevelToOffcialCombat
     * version                :   2.0
     * description            :   
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function characterLevelToOffcialCombat() {
        return Modules.officialCombatDealer.officialCombatDealer.attack.level[apiData.data.ArmoryProfile.CharacterLevel] / 10000 + 1;
    };
    // console.log("레벨", characterLevelToOffcialCombat());

    /* **********************************************************************************************************************
     * name		              :	  weaponQualityToOffcialCombat
     * version                :   2.0
     * description            :   
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function weaponQualityToOffcialCombat() {
        let weaponQuality = Number(document.querySelectorAll(".sc-info .armor-item")[5].querySelector(".img-box select").value);
        let offcialCombatWeaponValue = Modules.officialCombatDealer.officialCombatDealer.attack.weapon_quality[weaponQuality] / 10000 + 1;
        return offcialCombatWeaponValue;
    };
    // console.log("무품", weaponQualityToOffcialCombat());

    /* **********************************************************************************************************************
     * name		              :	  characterArkToOffcialCombat
     * version                :   2.0
     * description            :   
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function characterArkToOffcialCombat() {
        let result = {};
        let evolutionElementValue = Number(document.querySelector(".sc-info .ark-area .title-box.evolution .title").textContent);
        let enlightElementValue = Number(document.querySelector(".sc-info .ark-area .title-box.enlightenment .title").textContent);
        let leapElementValue = Number(document.querySelector(".sc-info .ark-area .title-box.leap .title").textContent);

        let evolutionValue = (Math.max(evolutionElementValue - 40, 0) * 50) / 10000 + 1;
        let enlightValue = Math.min((Math.max(enlightElementValue, 0) * 70), (100 * 70)) / 10000 + 1;
        let leapValue = (Math.max(leapElementValue, 0) * 20) / 10000 + 1;

        return (evolutionValue * enlightValue * leapValue).toFixed(4);
    };
    // console.log("아크패시브", characterArkToOffcialCombat());

    /* **********************************************************************************************************************
     * name		              :	  characterKarmaToOffcialCombat
     * version                :   2.0
     * description            :   
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function characterKarmaToOffcialCombat() {
        let evolutionKarmaRank = Number(Array.from(document.querySelectorAll(".sc-info .ark-list.evolution .radio input")).findIndex(input => input.checked));
        let leapKarmaLevel = Number(document.querySelectorAll(".sc-info .ark-list.leap .ark-item")[3].querySelector("input.input-number").value);
        let evolutionKarmaValue = (evolutionKarmaRank * 0.6) / 100 + 1;
        let leapKarmaValue = (leapKarmaLevel * 0.02) / 100 + 1;
        return evolutionKarmaValue * leapKarmaValue;
    }
    // console.log("카르마", characterKarmaToOffcialCombat());

    /* **********************************************************************************************************************
     * name		              :	  engravingToOffcialCombat
     * version                :   2.0
     * description            :   유저 각인 인겜 전투력 데이터 변환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function engravingToOffcialCombat() {

        let stoneElements = Array.from(document.querySelectorAll(".sc-info .accessory-area .accessory-item")[5].querySelectorAll(".option-box .buff"));
        let stoneObject = stoneElements.map(element => {
            let name = element.getAttribute("data-stone").split(":")[0];
            let level = Number(element.getAttribute("data-stone").split(":")[1]);
            let result = {
                name: name,
                level: level
            };
            return result;
        })

        let engravingElements = Array.from(document.querySelectorAll(".sc-info .engraving-area .engraving-box"));
        let engravingArray = engravingElements.map(element => {
            let engravingName = element.querySelector(".engraving-name").value.replace("- 무효", "").trim();
            let engravingLevel = Number(element.querySelector(".grade").value);
            let engravingGrade = element.querySelector(".engraving-ico").value;

            let result = {
                name: engravingName,
                level: engravingLevel,
                grade: engravingGrade
            };
            let engravingStone = stoneObject.filter(stone => stone.name === engravingName);
            if (engravingStone.length > 0) {
                result.stone = engravingStone[0].level;
            }
            return result;
        })

        let arkpassiveValue = engravingArray.map(engraving => {
            let name = engraving.name;
            let grade = engraving.grade;
            let level = engraving.level;
            let stone = engraving.stone ? engraving.stone : 0;

            let activeValue = stone * 20 + level + (grade === "유물" ? 9 : 5);

            let engravingFilter = Modules.officialCombatDealer.officialCombatDealer.attack.ability_attack[name];
            let engravingValue = 0;
            if (engravingFilter) {
                engravingValue = engravingFilter[activeValue] / 10000 + 1;
            }

            let result = {
                name: name,
                value: engravingValue
            };
            return result;
        });
        let resultArkValue = arkpassiveValue.reduce((a, b) => { return a * b.value }, 1);
        return resultArkValue
    };
    // console.log("각인", engravingToOffcialCombat());


    // 투견상하장에 엘릭서 선택 박스가 있잖아?
    // 1. 장갑/투구에 똑같은 특옵을 들고 있어야해 (회심/달인 등등)
    // 2. 그리고 엘릭서 총합 레벨이 35/40 이상이어야 됨. 

    /* **********************************************************************************************************************
     * name		              :	  elixirToOffcialCombat
     * version                :   2.0
     * description            :   
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function elixirToOffcialCombat() {
        let armoryElixirElements = Array.from(document.querySelectorAll(".sc-info .armor-area .armor-item .elixir-wrap .elixir"));
        let armoryElixirLevels = armoryElixirElements.map(element => {
            return element.value.split("|").filter(elixir => elixir.includes("level"));
        });
        armoryElixirLevels = armoryElixirLevels.flat().map(levelString => {
            const match = levelString.match(/level:(\d+)/);
            return match ? parseInt(match[1], 10) : 0;
        });
        let helmetElement = document.querySelectorAll(".sc-info .armor-area .armor-item")[0].querySelector(".elixir-wrap .elixir");
        let helmetElixirName = helmetElement.options[helmetElement.selectedIndex].textContent.replace(/\sLv\.\d/, '');
        // let helmetElixirLevel = Number(helmetElement.value.split("|").filter(elixir => elixir.includes("level"))[0].split(":")[1]);

        let gloveElement = document.querySelectorAll(".sc-info .armor-area .armor-item")[4].querySelector(".elixir-wrap .elixir");
        let gloveElixirName = gloveElement.options[gloveElement.selectedIndex].textContent.replace(/\sLv\.\d/, '');

        let elixirList = [
            { name: '행운', level: 1, value: 1.05 },
            { name: '행운', level: 2, value: 1.10 },
            { name: '회심', level: 1, value: 1.060 },
            { name: '회심', level: 2, value: 1.12 },
            { name: '달인', level: 1, value: 1.06 },
            { name: '달인', level: 2, value: 1.12 },
            { name: '강맹', level: 1, value: 1.035 },
            { name: '강맹', level: 2, value: 1.070 },
            { name: '칼날 방패', level: 1, value: 1.04 },
            { name: '칼날 방패', level: 2, value: 1.08 },
            { name: '선봉대', level: 1, value: 1.06 },
            { name: '선봉대', level: 2, value: 1.11 },
            { name: '선각자', level: 1, value: 1 },
            { name: '선각자', level: 2, value: 1.05 },
            { name: '진군', level: 1, value: 1.02 },
            { name: '진군', level: 2, value: 1.02 }
        ];

        function totalElixirLevel() {
            if (helmetElixirName !== gloveElixirName) {
                return { name: '없음', value: 1 };
            }

            let totalSum = armoryElixirLevels.reduce((a, b) => {
                return a + b;
            }, 0);
            let elixirGrade = 0;
            if (totalSum >= 40) {
                elixirGrade = 2;
            } else if (totalSum >= 35) {
                elixirGrade = 1;
            }

            let doubleElixirValue = elixirList.find(item => item.name === gloveElixirName && item.level === elixirGrade);
            return doubleElixirValue;
        };
        // console.log();

        let elixirFilter = Modules.officialCombatDealer.officialCombatDealer.attack.elixir_grade_attack;
        let eachElixirValue = armoryElixirElements.map(element => {
            let elixirName = element.options[element.selectedIndex].textContent;
            let elixirValue = elixirFilter[elixirName] ? elixirFilter[elixirName] / 10000 + 1 : 1;
            let result = {
                name: elixirName,
                value: elixirValue
            }
            return result;
        })
        let eachElixirSum = eachElixirValue.reduce((a, b) => { return a * b.value }, 1);
        // let result = {
        //     doubleElixir: totalElixirLevel(),
        //     eachElixir: eachElixirSum
        // }
        return eachElixirSum * totalElixirLevel().value;
    };
    // console.log("엘릭서", elixirToOffcialCombat());

    /* **********************************************************************************************************************
     * name		              :	  accessoryToOffcialCombat
     * version                :   2.0
     * description            :   
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function accessoryToOffcialCombat() {
        let accessoryOptionElements = Array.from(document.querySelectorAll(".accessory-area .accessory-item.accessory .grinding-wrap select.option"));

        // 2. 추출할 스탯 이름과 변환율을 포함하는 객체 배열을 정의합니다.
        const targetStatsConversion = [
            { name: '공격력', regex: /^공격력 \+(\d+\.?\d+)$/, value: 0.000007 }, // 일반 공격력 (정수 또는 소수)
            { name: '공격력', regex: /^공격력 \+(\d+\.?\d+)%$/, value: 0.01 }, // 공격력 %
            { name: '추가 피해', regex: /^추가 피해 \+(\d+\.?\d+)%$/, value: 0.007692 },
            { name: '치명타 적중률', regex: /^치명타 적중률 \+(\d+\.?\d+)%$/, value: 0.007742 },
            { name: '치명타 피해', regex: /^치명타 피해 \+(\d+\.?\d+)%$/, value: 0.003 },
            { name: '적에게 주는 피해', regex: /^적에게 주는 피해 \+(\d+\.?\d*)%$/, value: 0.01 }, // '적에게 주는 피해'는 고정값으로 가정

        ];

        // 정규표현식을 동적으로 생성합니다.
        // 여기서는 각 targetStatsConversion 항목의 regex를 직접 사용하므로, 별도의 statRegex를 하나로 합칠 필요가 없습니다.

        // 4. 최종 결과를 담을 빈 배열을 생성합니다.
        const extractedStats = [];

        // 5. 각 장신구를 순회하며 스탯을 추출합니다.
        accessoryOptionElements.forEach(accessory => {
            let tooltipString = accessory.options[accessory.selectedIndex].textContent;
            if (typeof tooltipString !== 'string' || tooltipString.length === 0) {
                return; // 처리할 문자열이 없으면 다음으로 넘어갑니다.
            }

            targetStatsConversion.forEach(statConvert => {
                const matches = tooltipString.match(statConvert.regex);
                if (matches) {
                    let statValue = 0;
                    // '적에게 주는 피해'와 같이 숫자가 없는 경우를 처리
                    if (matches.length > 1) { // 정규식에 캡처 그룹이 있는 경우 (숫자 추출)
                        statValue = parseFloat(matches[1]);
                    } else { // 캡처 그룹이 없는 경우 (예: "적에게 주는 피해")
                        // statValue는 해당 스탯의 고정값으로 처리되므로 여기서는 0으로 두고 아래에서 변환율을 곱함
                    }

                    // 최종 value 계산: 추출된 값 * 변환율
                    // '적에게 주는 피해'처럼 직접적인 숫자가 없는 경우, statValue는 0이 되고,
                    // 변환율(statConvert.value)이 곱해져서 해당 스탯의 고정된 값이 됩니다.
                    const calculatedValue = statValue * statConvert.value + 1;


                    extractedStats.push({
                        name: `${statConvert.name} ${matches.length > 1 ? matches[1] + (statConvert.regex.source.includes('%') ? '%' : '') : ''}`.trim(),
                        value: calculatedValue
                    });
                }
            });
        });
        let accessorySum = extractedStats.reduce((a, b) => { return a * b.value }, 1);
        return accessorySum;
    };
    // console.log("악세서리", accessoryToOffcialCombat());

    /* **********************************************************************************************************************
    * name		             :	 bangleOffcialCombat
    * version                :   2.0
    * description            :   
    * USE_TN                 :   사용
    *********************************************************************************************************************** */
    function bangleOffcialCombat() {
        let bangleElement = Array.from(document.querySelectorAll(".accessory-area .accessory-item.bangle select.option"));
        let bangleOptions = bangleElement.map(element => {
            let oiptionName = element.options[element.selectedIndex].textContent;
            return oiptionName;
        });

        let bangleFilter = Modules.officialCombatDealer.officialCombatDealer.attack.bracelet_addontype_attack;

        let bangleValue = bangleOptions.map(option => {
            let optionValue = bangleFilter[option] ? bangleFilter[option] / 10000 + 1 : 1;
            return { name: option, value: optionValue }
        });

        let bangleSum = bangleValue.reduce((a, b) => { return a * b.value }, 1);
        return bangleSum;
    };
    // console.log("팔찌", bangleOffcialCombat());

    /* **********************************************************************************************************************
    * name		             :	 gemOffcialCombat
    * version                :   2.0
    * description            :   
    * USE_TN                 :   사용
    *********************************************************************************************************************** */
    function gemOffcialCombat() {
        let gemFilter = Modules.officialCombatDealer.officialCombatDealer.attack.gem;
        let gemElements = Array.from(document.querySelectorAll(".gem-area .gem-box:not(.free-set)"));
        let gemList = gemElements.map(element => {
            let name = element.querySelector("select.gems").value.replace(/쿨|딜/, "");
            let level = Number(element.querySelector("select.level").value);

            let sort = /광휘|겁화|작열/.test(name) ? 4 : 3;
            let value = gemFilter[sort][level] / 10000 + 1
            let result = {
                name: name,
                level: level,
                value: value
            }
            return result;
        });
        let gemSum = gemList.reduce((a, b) => { return a * b.value }, 1);
        return gemSum;
    };
    // console.log("보석", gemOffcialCombat());

    /* **********************************************************************************************************************
    * name		             :	 estherOffcialCombat
    * version                :   2.0
    * description            :   
    * USE_TN                 :   사용
    *********************************************************************************************************************** */
    function estherOffcialCombat() {
        let estherElement = document.querySelectorAll(".armor-area .armor-item")[5];
        let estherTier = Number(estherElement.querySelector("select.plus").value);
        let estherNormal = Number(estherElement.querySelector("select.armor-name").value);

        let isEsther = estherTier <= 2 ? true : false;
        let estherFilter = Modules.officialCombatDealer.officialCombatDealer.attack.esther_weapon;
        if (isEsther) {
            return estherFilter[estherNormal][estherTier] / 10000 + 1;
        } else {
            return 1;
        };
    };
    // console.log("에스더", estherOffcialCombat());

    /* **********************************************************************************************************************
    * name		             :	 hyperOffcialCombat
    * version                :   2.0
    * description            :   
    * USE_TN                 :   사용
    *********************************************************************************************************************** */
    function hyperOffcialCombat() {
        let hyperElements = Array.from(document.querySelectorAll(".armor-area .armor-item"));
        let armoryElements = hyperElements.filter((element, index) => !(index >= 6));
        let armoryHyperList = armoryElements.map(element => {
            let hyper = Number(element.querySelector(".hyper-wrap select.hyper").value);
            return hyper;
        })
        let armoryTotalHyper = armoryHyperList.reduce((a, b) => a + b) / 10000 + 1;

        let weaponElement = Array.from(document.querySelectorAll(".armor-area .armor-item"))[5].querySelector(".hyper-wrap select.hyper");
        let weaponHyper = Number(weaponElement.value);

        let pantsElement = Array.from(document.querySelectorAll(".armor-area .armor-item"))[3].querySelector(".hyper-wrap select.hyper");
        let pantsHyper = Number(pantsElement.value);

        // "하의": {
        //     "10": 10,
        //     "15": 20,
        //     "20": 170
        // },
        // "무기": {
        //     "5": 56,
        //     "10": 56,
        //     "15": 56,
        //     "20": 79
        // }

        let weaponValue;
        if (weaponHyper >= 20) {
            weaponValue = 79;
        } else if (weaponHyper >= 15) {
            weaponValue = 56;
        } else if (weaponHyper >= 10) {
            weaponValue = 56;
        } else if (weaponHyper >= 5) {
            weaponValue = 56;
        } else {
            weaponValue = 0;
        }

        let pantsValue;
        if (pantsHyper >= 20) {
            pantsValue = 170;
        } else if (pantsHyper >= 15) {
            pantsValue = 20;
        } else if (pantsHyper >= 10) {
            pantsValue = 10;
        } else {
            pantsValue = 0;
        }


        // let result = {
        //     total: armoryTotalHyper,
        //     weapon: weaponValue / 10000 + 1,
        //     pants: pantsValue / 10000 + 1
        // }
        return armoryTotalHyper * (weaponValue / 10000 + 1) * (pantsValue / 10000 + 1);
    };
    // console.log("초월", hyperOffcialCombat());

    /* **********************************************************************************************************************
    * name		             :	 statsOffcialCombat
    * version                :   2.0
    * description            :   
    * USE_TN                 :   사용
    *********************************************************************************************************************** */
    function statsOffcialCombat() {
        let baseStats = apiData.dataBase.totalStatus;

        let statsElement = Array.from(document.querySelector(".accessory-area .accessory-item.bangle").querySelectorAll(".option-wrap .option-item"));
        let statsList = statsElement.map(element => {
            let statsName = element.querySelector("select.stats").value;
            let statsValue = Number(element.querySelector("input.option").value);
            if (!/crit|special|haste/.test(statsName)) {
                statsValue = 0;
            };
            return statsValue;
        })

        let totalStats = (Number(statsList.reduce((a, b) => a + b)) + baseStats) * 3 / 10000 + 1;
        return totalStats;
    };
    // console.log("특성", statsOffcialCombat());

    /* **********************************************************************************************************************
    * name		             :	 cardOffcialCombat
    * version                :   2.0
    * description            :   
    * USE_TN                 :   사용
    *********************************************************************************************************************** */
    function cardOffcialCombat() {
        let cardData = apiData.data.ArmoryCard ? apiData.data.ArmoryCard.Effects : [];
        let cardArray = cardData.map(card => card.Items.at(-1).Name);
        let cardFilter = Modules.officialCombatDealer.officialCombatDealer.attack.card_set;

        let cardValue = cardArray.map(card => {
            let result = {
                name: card,
                value: cardFilter[card] / 10000 + 1
            }
            return result;
        })
        let cardSum = cardValue.reduce((a, b) => { return a * b.value }, 1);
        return cardSum;
    };
    // console.log("카드", cardOffcialCombat());

    let officialCombatObj = {
        level: characterLevelToOffcialCombat(),
        weaponQuality: weaponQualityToOffcialCombat(),
        ark: characterArkToOffcialCombat(),
        karma: characterKarmaToOffcialCombat(),
        engraving: engravingToOffcialCombat(),
        elixir: elixirToOffcialCombat(),
        accessory: accessoryToOffcialCombat(),
        bangle: bangleOffcialCombat(),
        gem: gemOffcialCombat(),
        esther: estherOffcialCombat(),
        hyper: hyperOffcialCombat(),
        stats: statsOffcialCombat(),
        card: cardOffcialCombat()
    };
    // console.log("전투력OBJ", officialCombatObj)
    return officialCombatObj;
};