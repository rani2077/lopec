/* **********************************************************************************************************************
* variable name		:	mobileCheck
* description       : 	현재 접속한 디바이스 기기가 모바일, 태블릿일 경우 true를 반환
*********************************************************************************************************************** */
let mobileCheck = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(navigator.userAgent.toLowerCase())
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
        { key: 'fetchApi', path: '../custom-module/fetchApi.js' },
        { key: 'transValue', path: '../custom-module/trans-value.js' },
        { key: 'calcValue', path: '../custom-module/calculator.js' },
        { key: 'apiCalcValue', path: '../custom-module/api-calc.js' },
        { key: 'component', path: '../custom-module/component.js' },
        { key: 'dataBase', path: '../js/character.js' },
        { key: 'originFilter', path: '../filter/filter.js' },
        { key: 'simulatorFilter', path: '../filter/simulator-filter.js' },
        { key: 'simulatorData', path: '../filter/simulator-data.js' },
        { key: 'lopecOcr', path: '../custom-module/lopec-ocr.js' },
        { key: 'officialCombatSimulator', path: '../js/offiicial-combat-simulator.js' },
        { key: 'officialCombatCalculator', path: '../custom-module/official-combat-calculator.js' },
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

let cachedData = null;
let cachedDetailInfo = {};
let officialCombatCachedFlag = null;
let dataBaseResponse;
async function simulatorInputCalc() {
    /* ************~**********************************************************************************************************
    * function name		:	nameParam
    * description		: 	검색 닉네임 정의
    *********************************************************************************************************************** */
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('headerCharacterName').trim();
    document.title = `로펙 : ${nameParam}님의 시뮬레이터`
    /* **********************************************************************************************************************
     * function name		:	
     * description			: 	유저 JSON데이터 호출 및 캐싱처리
     *********************************************************************************************************************** */
    if (!cachedData) {
        let scProfileSkeleton = await Modules.component.scProfileSkeleton();
        document.querySelector(".wrapper").insertAdjacentHTML('afterbegin', scProfileSkeleton);
        document.querySelector(".sc-profile").insertAdjacentHTML('afterend', await Modules.component.scNav(nameParam));
        document.querySelector(".wrapper").style.display = "block";

        let apiData = await Modules.apiCalcValue.apiCalcValue(nameParam);

        console.log("API데이터", apiData)
        let data = apiData.data;
        let extractValue = apiData.extractValue;
        let specPoint = apiData.calcValue;

        dataBaseResponse = apiData.dataBase;
        cachedDetailInfo.extractValue = extractValue;
        cachedDetailInfo.specPoint = specPoint;
        cachedData = data;

        const isSupport = await secondClassCheck(cachedData);

        extraElementCreate(isSupport); // 아제나, 펫 옵션을 서폿/딜러 다르게 생성
        extraLoadSelection(); // 아제나, 펫 설정 로드
        // await Modules.fetchApi.clearLostarkApiCache(nameParam, document.querySelector(".sc-info .spec-area span.reset")); // 캐싱없이 api갱신
        await originSpecPointToHtml(specPoint, extractValue);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isFirefox = /firefox/i.test(navigator.userAgent);
        if (isSafari || isFirefox) {
            console.log('사파리 또는 파이어폭스 브라우저에서 실행 중입니다.');
            setTimeout(() => { document.body.dispatchEvent(new Event("change")) }, 0);
            setTimeout(() => { document.body.dispatchEvent(new Event("change")) }, 500);
        }
    }

    /* **********************************************************************************************************************
     * function name		:	originSpecPointToHtml
     * description			: 	사용자의 기본 스펙포인트를 표시해줌
     *********************************************************************************************************************** */
    async function originSpecPointToHtml(originSpecPoint, extractValue) {
        let element = document.querySelector(".sc-info .group-info .spec-area .gauge-box span.desc.spec");
        let specPoint = Number(originSpecPoint.completeSpecPoint).toFixed(2);
        document.querySelector(".sc-profile").outerHTML = await Modules.component.scProfile(cachedData, extractValue, dataBaseResponse);
        element.textContent = `기존 스펙포인트 - ${specPoint}`;
        element.setAttribute("data-spec-point", specPoint);
        await selectCreate(cachedData, Modules);
    }
    /* **********************************************************************************************************************
    * function name		:	supportCheck
    * description			: 	2차 직업명 출력
    * function name		:	extractValue
    * description			: 	기존 spec-point.js 로직을 이용해 추출한 값
    *********************************************************************************************************************** */
    let supportCheck = await secondClassCheck(cachedData);
    gemInfoChangeToJson()

    let extractValue = await Modules.transValue.getCharacterProfile(cachedData);
    // console.log(dataBaseResponse)
    // console.log("오리진OBJ", extractValue)


    /* **********************************************************************************************************************
     * function name		:	stoneOutputCalc()
     * description			: 	돌맹이 수치 값
     *********************************************************************************************************************** */

    function stoneOutputCalc() {
        let obj = [];
        let elements = document.querySelectorAll(".buff-wrap .buff");
        // simulatorFilter.engFilter
        elements.forEach((element, idx) => {
            if (idx === 0) {
                obj = []
            }
            let name = element.value.split(":")[0]
            let level = Number(element.value.split(":")[1])

            let stoneObj = Modules.simulatorFilter.stoneFilter.find((filter) => filter.name === name && filter.level === level);
            if (!stoneObj) {
                stoneObj = { name: "없음", finalDamagePer: 1, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 };
            }
            obj.push(stoneObj)
        })
        return obj;
    }
    // console.log("돌맹이 착용 각인", stoneOutputCalc())

    /* **********************************************************************************************************************
     * function name		:	engExtract()
     * description			: 	현재 각인 객체로 추출
     *********************************************************************************************************************** */

    function engExtract() {
        let result = []

        let name = document.querySelectorAll(".engraving-box .engraving-name")
        let grade = document.querySelectorAll(".engraving-box .relic-ico")
        let level = document.querySelectorAll(".engraving-box .grade")

        for (let i = 0; i < name.length; i++) {
            const obj = {
                name: name[i].value,
                grade: grade[i].value,
                level: Number(level[i].value)
            };
            result.push(obj);
        }
        return result

    }


    /* **********************************************************************************************************************
     * function name		:	engOutputCalc(inputValueObjArr)
     * description			: 	각인 수치 값
     *********************************************************************************************************************** */

    function engOutputCalc(inputValueObjArr) {
        let arr = [];
        let result = {
            finalDamagePer: 1,
            carePower: 0,
            cdrPercent: 0,
            awakencdrPercent: 0,
            utilityPower: 0,
            dealpport: "false"
        };
        let matchingFilters
        inputValueObjArr.forEach(function (inputValue) {
            if (supportCheck !== "서폿") {
                matchingFilters = Modules.simulatorFilter.engFilter.dealer.filter(function (filter) {
                    return filter.name === inputValue.name && filter.grade === inputValue.grade && filter.level === inputValue.level;
                });
            } else {
                matchingFilters = Modules.simulatorFilter.engFilter.support.filter(function (filter) {
                    return filter.name === inputValue.name && filter.grade === inputValue.grade && filter.level === inputValue.level;
                });

            }

            matchingFilters.forEach(function (filter) {
                arr.push({
                    name: filter.name,
                    finalDamagePer: filter.finalDamagePer,
                    carePower: filter.carePower,
                    cdrPercent: filter.cdrPercent,
                    awakencdrPercent: filter.awakencdrPercent,
                    utilityPower: filter.utilityPower
                });
            });
        });
        //console.log("착용된 각인", arr);


        let mergedEngs = [];
        arr.forEach(eng => {
            let foundStoneEng = stoneOutputCalc().find(stoneEng => stoneEng.name === eng.name);
            if (foundStoneEng && foundStoneEng.name !== "없음") {
                // 이름이 같은 경우, 합연산으로 병합
                mergedEngs.push({
                    name: eng.name,
                    //finalDamagePer: eng.finalDamagePer * (foundStoneEng.finalDamagePer / 100 + 1),
                    finalDamagePer: eng.finalDamagePer + foundStoneEng.finalDamagePer / 100,
                    carePower: eng.carePower + foundStoneEng.carePower,
                    cdrPercent: eng.cdrPercent + foundStoneEng.cdrPercent,
                    awakencdrPercent: eng.awakencdrPercent + foundStoneEng.awakencdrPercent,
                    utilityPower: eng.utilityPower + foundStoneEng.utilityPower
                });
            } else {
                // 이름이 다른 경우, arr의 객체를 그대로 추가
                mergedEngs.push(eng);
            }

        });
        console.log()

        stoneOutputCalc().forEach(stoneEng => {
            if (stoneEng.name !== "없음" && !mergedEngs.find(eng => eng.name === stoneEng.name)) {
                mergedEngs.push(stoneEng)
            }
        })
        //console.log("각인 + 돌 병합:", mergedEngs);


        // 최종 결과 객체 생성
        mergedEngs.forEach(eng => {
            result.finalDamagePer *= eng.finalDamagePer;
            result.carePower += eng.carePower
            result.cdrPercent += eng.cdrPercent
            result.awakencdrPercent += eng.awakencdrPercent
            result.utilityPower += eng.utilityPower
        });

        result.dealpport = cachedDetailInfo.extractValue.engObj.dealpport;
        // console.log("최종결과:", result);
        // result.finalDamagePer *= stoneOutputCalc().finalDamagePer;
        // result.engBonusPer *= stoneOutputCalc().engBonusPer;


        return result;
    }


    // engOutputCalc(engExtract())
    // console.log(engExtract())
    // console.log("각인", engOutputCalc(engExtract()))

    /* **********************************************************************************************************************
     * function name		:	stoneLevelBuffStat
     * description			: 	돌맹이 레벨 합계에 따른 공격력 버프 보너스 수치 abilityAttackBonus에 넣으면 됨
     *********************************************************************************************************************** */

    function stoneLevelBuffStat() {
        let elements = document.querySelectorAll(".accessory-item .buff");
        let stoneLevel = 0;
        let result = 0;
        elements.forEach(element => {
            let level = Number(element.value.split(":")[1]);
            stoneLevel += level;
        })
        if (stoneLevel >= 5) {
            result = 1.5;
        }
        return result;
    }
    stoneLevelBuffStat()

    /* **********************************************************************************************************************
     * function name		:	bangleStatsNumberCalc()
     * description			: 	팔찌 스텟의 치/특/신 값을 가져와 api데이터 상의 총 치/특/신값에 반영한 값을 계산
     *********************************************************************************************************************** */
    function bangleStatsNumberCalc() {
        if (!cachedData.ArmoryEquipment.find(obj => obj.Type === "팔찌")) {
            let result = {
                special: 0,
                haset: 0,
                cri: 0
            }
            return result;
        }
        const bangleTooltip = cachedData.ArmoryEquipment.find(obj => obj.Type === "팔찌").Tooltip.replace(/<[^>]*>/g, '');
        const bangleStatsArry = extractValues(bangleTooltip);
        const bangleDataStats = bangleStatsArry.reduce((sum, stat) => sum + stat.value, 0);

        const originStatsObj = calculateDifference(bangleStatsArry, cachedData.ArmoryProfile.Stats);
        const inputStatsArray = getInputStatsArray();

        return convertArrayToObject(combineValues(originStatsObj, inputStatsArray));

        // 팔찌 툴팁에서 치명, 특화, 신속 값 추출
        function extractValues(str) {
            const regex = /(치명|특화|신속)\s*\+(\d+)/g;
            let matches, results = [];
            while ((matches = regex.exec(str)) !== null) {
                results.push({ name: matches[1], value: parseInt(matches[2], 10) });
            }
            return results;
        }

        // cachedData.ArmoryProfile.Stats에서 치명, 특화, 신속 값 계산
        function calculateDifference(bangleStatsArry, cachedDataArmoryProfileStats) {
            const typeConversion = { "치명": "crit", "특화": "special", "신속": "haste" };
            const requiredStats = ["치명", "신속", "특화"];
            const result = [];

            requiredStats.forEach(statName => {
                const bangleStat = bangleStatsArry.find(stat => stat.name === statName);
                const matchingStat = cachedDataArmoryProfileStats.find(stat => stat.Type === statName);
                const bangleValue = bangleStat ? bangleStat.value : 0;
                const profileValue = matchingStat ? parseInt(matchingStat.Value) : 0;
                result.push({ type: typeConversion[statName], originValue: profileValue - bangleValue });
            });
            return result;
        }

        // HTML 요소에서 입력된 치명, 특화, 신속 값 추출
        function getInputStatsArray() {
            const elements = document.querySelectorAll(".accessory-item.bangle input.option");
            const statsTagElements = document.querySelectorAll(".accessory-item.bangle select.stats");
            const inputStatsArray = [];

            elements.forEach((element, idx) => {
                const dataType = statsTagElements[idx].value;
                const value = Number(element.value);
                if (dataType !== "none" && /crit|special|haste/.test(dataType)) {
                    inputStatsArray.push({ type: dataType, value: value });
                }
            });
            return inputStatsArray;
        }

        // originArray와 valueArray의 값을 합쳐 객체 배열로 반환
        function combineValues(originArray, valueArray) {
            const valueMap = new Map(valueArray.map(item => [item.type, item.value]));
            return originArray.map(item => ({
                type: item.type,
                value: item.originValue + (valueMap.get(item.type) || 0)
            }));
        }

        // 객체 배열을 객체로 변환
        function convertArrayToObject(array) {
            return array.reduce((obj, item) => {
                obj[item.type] = item.value;
                return obj;
            }, {});
        }
    }
    //console.log(bangleStatsNumberCalc())

    /* **********************************************************************************************************************
     * function name		:	bangleOptionCalc()
     * description			: 	팔찌 옵션의 수치를 가져옴
     *********************************************************************************************************************** */
    function bangleOptionCalc() {
        let elements = document.querySelectorAll(".accessory-item.bangle select.option");
        let arr = []
        let result = {};
        elements.forEach(element => {
            let obj = {
                addDamagePer: 0,
                atkBuff: 0,
                atkBuffPlus: 1,
                damageBuff: 0,
                weaponAtkPlus: 0,
                weaponAtkBonus: 0,
                finalDamagePer: 1,
                devilDamagePer: 1,
                skillCool: 0,
                statHp: 0,
                health: 0,
                carePower: 0,
                special: 0,
                crit: 0,
                haste: 0,
                str: 0,
                dex: 0,
                int: 0
            }
            if (element.value.includes("|")) {
                let splitValue = element.value.split("|");
                splitValue.forEach(split => {
                    let name = split.split(":")[0];
                    let value = Number(split.split(":")[1]);
                    // console.log(value)
                    if (name !== "fullName") {
                        obj[name] = value;
                        arr.push(obj);
                        obj = {}
                    }
                })
            } else {
                let name = element.value.split(":")[0];
                let value = Number(element.value.split(":")[1]);
                obj[name] = value;
                arr.push(obj)
            }
        })
        arr = objKeyValueCombine(arr)
        let bangleElement = document.querySelector(".accessory-area .accessory-item.bangle");
        let statsElements = bangleElement.querySelectorAll(".stats");
        let numberElements = bangleElement.querySelectorAll("input.option");

        statsElements.forEach((statOption, idx) => {
            const statValue = Number(numberElements[idx].value) || 0;
            const selectedOption = statOption.options[statOption.selectedIndex];
            const statKey = statOption.value;
            const statText = selectedOption ? selectedOption.textContent.trim() : "";

            if (statKey !== "none") {
                arr[statKey] = (arr[statKey] || 0) + statValue;
            } else if (statText === "체력") {
                arr.health = (arr.health || 0) + statValue;
            }
        })
        if (typeof arr.health !== "number") {
            arr.health = 0;
        }
        function objKeyValueCombine(objArr) {
            const grouped = {};
            const combinedObj = {};

            // 객체들을 키별로 그룹화
            objArr.forEach(obj => {
                for (const key in obj) {
                    if (!grouped[key]) {
                        grouped[key] = [];
                    }
                    grouped[key].push(obj[key]);
                }
            });

            // 그룹화된 데이터를 바탕으로 새로운 객체 생성
            for (const key in grouped) {
                // if (key === "finalDamagePer" || key === "atkBuffPlus" /finalDamagePer|atkBuffPlus/.test(key)) {
                if (/finalDamagePer|atkBuffPlus|devilDamagePer/.test(key)) {
                    // finalDamagePer, atkBuffPlus는 곱셈
                    combinedObj[key] = grouped[key].reduce((acc, val) => acc * val, 1);
                } else {
                    // 기타 스텟은 덧셈
                    combinedObj[key] = grouped[key].reduce((acc, val) => acc + val, 0);
                }
            }
            combinedObj.finalDamagePer = combinedObj.finalDamagePer * combinedObj.devilDamagePer;
            return combinedObj;
        }
        return arr;
    }
    //console.log("bangleOptionCalc()", bangleOptionCalc())

    /* **********************************************************************************************************************
     * function name		:	armoryLevelCalc()
     * description			: 	사용자가 선택한 장비 level stat special 객체 반환
     *********************************************************************************************************************** */
    let armorWeaponStatsObj = await armoryLevelCalc(Modules)
    function defaultObjChangeValue() {
        extractValue.defaultObj.addDamagePer = defaultObjAddDamgerPerEdit();
        extractValue.defaultObj.weaponAtk = armorWeaponStatsObj.weaponStats;
        //extractValue.defaultObj.special = bangleStatsNumberCalc().special; <== 로직 변경으로 인한 미사용
        //extractValue.defaultObj.haste = bangleStatsNumberCalc().haste;
        //extractValue.defaultObj.crit = bangleStatsNumberCalc().crit;
        extractValue.defaultObj.totalStatus = cachedDetailInfo.extractValue.defaultObj.totalStatus;
        extractValue.defaultObj.statusSpecial = cachedDetailInfo.extractValue.defaultObj.statusSpecial;
        extractValue.defaultObj.statusHaste = cachedDetailInfo.extractValue.defaultObj.statusHaste;

        // let result = { <== 로직 수정으로 인한 미사용 추후 삭제
        //     addDamagePer: defaultObjAddDamgerPerEdit(),
        //     weaponAtk: armorWeaponStatsObj.weaponStats,
        //     special: bangleStatsNumberCalc().special,
        //     haste: bangleStatsNumberCalc().haste,
        //     crit: bangleStatsNumberCalc().crit,
        //     // 안사용되는 값들
        //     attackPow: 0,
        //     baseAttackPow: 0,
        //     criticalChancePer: 0,
        //     criticalDamagePer: 0,
        //     moveSpeed: 0,
        //     atkSpeed: 0,
        //     skillCool: 0,
        //     maxHp: 0,
        //     statHp: 0,
        //     hpActive: 0,
        //     totalStatus: extractValue.etcObj.supportCheck === "서폿" ? dataBaseResponse.totalStatusSupport : dataBaseResponse.totalStatus,
        // }
        // return result
    }
    // console.log(defaultObjChangeValue())

    /* **********************************************************************************************************************
    * function name         :	armorElixirToObj()
    * description			: 	장비 엘릭서 스텟 수치를 추출함
    *********************************************************************************************************************** */

    // function armorElixirToObj() {
    //     let arr = [];
    //     let elements = document.querySelectorAll(".armor-item .elixir");

    //     // 각 엘릭서 요소 처리
    //     elements.forEach(element => {
    //         const valueString = element.value;
    //         if (!valueString) return;

    //         // 엘릭서 장비 타입 식별 (투구, 장갑 등)
    //         const elementType = element.className.includes("helmet") ? "helmet" :
    //             element.className.includes("glove") ? "glove" :
    //                 element.className.includes("shoulder") ? "shoulder" :
    //                     element.className.includes("armor") ? "armor" :
    //                         element.className.includes("pants") ? "pants" :
    //                             element.className.includes("common") ? "common" : "unknown";

    //         const parts = valueString.split('|');
    //         const text = element.options[element.selectedIndex].textContent.replace(/Lv.\d+/g, "").trim();

    //         parts.forEach(part => {
    //             const [key, valStr] = part.split(':');
    //             if (key && valStr !== undefined) {
    //                 const value = Number(valStr);
    //                 if (!isNaN(value)) {
    //                     arr.push({ key: key, value: value, originalName: text, element: elementType });
    //                 }
    //             }
    //         });
    //     });

    //     // 엘릭서 이름 카운트 - 중복 없이 한 장비당 하나씩만 카운트
    //     let elixirNameCounts = {};
    //     let totalLevelSum = 0;
    //     let processedElixirs = new Set(); // 처리된 엘릭서 조합 추적

    //     arr.forEach(obj => {
    //         if (obj.key === 'level') {
    //             totalLevelSum += obj.value;
    //         } else {
    //             // 각 장비 요소별로 한 번만 카운트하기 위한 고유 식별자
    //             const elementId = obj.element + "-" + obj.originalName;
    //             if (!processedElixirs.has(elementId)) {
    //                 processedElixirs.add(elementId);
    //                 elixirNameCounts[obj.originalName] = (elixirNameCounts[obj.originalName] || 0) + 1;
    //             }
    //         }
    //     });

    //     // 데이터 그룹화 및 병합
    //     const grouped = {};
    //     arr.forEach(obj => {
    //         if (obj && obj.hasOwnProperty('key')) {
    //             const key = obj.key;
    //             if (!grouped[key]) {
    //                 grouped[key] = [];
    //             }
    //             grouped[key].push(obj.value);
    //         }
    //     });

    //     // 기본 결과 객체 생성
    //     const combinedObj = {
    //         atkPlus: 0, atkBonus: 0, weaponAtkPlus: 0, atkPer: 0, atkBuff: 0,
    //         carePower: 0, str: 0, int: 0, dex: 0, stats: 0, statHp: 0, identityUptime: 0, utilityPower: 0,
    //         finalDamagePer: 1, level: totalLevelSum
    //     };

    //     // 값 결합하기
    //     for (const key in grouped) {
    //         if (key === "finalDamagePer") {
    //             combinedObj[key] = grouped[key].reduce((acc, val) => acc * val, 1);
    //         } else {
    //             combinedObj[key] = grouped[key].reduce((acc, val) => acc + val, 0);
    //         }
    //     }

    //     // 중복 엘릭서 그룹 정의
    //     const group1 = ["회심", "달인", "선봉대"];
    //     const group2 = ["강맹", "칼날방패", "행운"];
    //     const group3 = ["선각자", "신념"];
    //     const group4 = ["진군"];

    //     // 중복된 엘릭서 찾기
    //     let duplicateElixirName = null;
    //     for (const name in elixirNameCounts) {
    //         if (elixirNameCounts[name] >= 2) {
    //             duplicateElixirName = name;
    //             break;
    //         }
    //     }

    //     // 중복 엘릭서의 그룹 찾기
    //     let duplicateGroup = null;
    //     if (duplicateElixirName) {
    //         if (group1.includes(duplicateElixirName)) {
    //             duplicateGroup = "group1";
    //         } else if (group2.includes(duplicateElixirName)) {
    //             duplicateGroup = "group2";
    //         } else if (group3.includes(duplicateElixirName)) {
    //             duplicateGroup = "group3";
    //         } else if (group4.includes(duplicateElixirName)) {
    //             duplicateGroup = "group4";
    //         }
    //     }

    //     // 중복 보너스 적용
    //     if (duplicateGroup === "group1") {
    //         if (totalLevelSum >= 40) {
    //             combinedObj.finalDamagePer *= 1.12;
    //         } else if (totalLevelSum >= 35) {
    //             combinedObj.finalDamagePer *= 1.06;
    //         }
    //     } else if (duplicateGroup === "group2") {
    //         if (totalLevelSum >= 40) {
    //             combinedObj.finalDamagePer *= 1.08;
    //         } else if (totalLevelSum >= 35) {
    //             combinedObj.finalDamagePer *= 1.04;
    //         }
    //     } else if (duplicateGroup === "group3") {
    //         if (totalLevelSum >= 40) {
    //             combinedObj.atkBuff += 14;
    //         } else if (totalLevelSum >= 35) {
    //             combinedObj.atkBuff += 8;
    //         }
    //     } else if (duplicateGroup === "group4") {
    //         if (totalLevelSum >= 40) {
    //             combinedObj.atkBuff += 6;
    //         } else if (totalLevelSum >= 35) {
    //             combinedObj.atkBuff += 3;
    //         }
    //     }

    //     // 마무리 정리
    //     delete combinedObj.level;
    //     combinedObj.str = combinedObj.stats ? combinedObj.stats : 0;

    //     return combinedObj;
    // }


    /* **********************************************************************************************************************
     * function name		:	defaultObjAddDamgerPerEdit
     * description			: 	무기 품질의 값을 이용해 defaultObj.addDamagePer의 값을 수정하는 함수
     *********************************************************************************************************************** */

    function defaultObjAddDamgerPerEdit() {
        let result = 0;
        let element = document.querySelector(".armor-item select.progress");
        let quality = Number(element.value)
        // extractValue.defaultObj.addDamagePer = 10 + 0.002 * (quality) ** 2
        result = 10 + 0.002 * (quality) ** 2;
        return result;
    }
    defaultObjAddDamgerPerEdit()

    /* **********************************************************************************************************************
     * function name		:	accessoryValueToObj()
     * description			: 	악세서리 수치를 obj로 저장
     *********************************************************************************************************************** */

    function accessoryValueToObj() {
        let result;
        let arr = [];
        let elements = document.querySelectorAll(".accessory-list .accessory-item.accessory .option");
        elements.forEach(element => {
            let parts = element.value.split(":");
            if (parts.length === 3) { // Ensure the value has the correct format
                let key = parts[1];
                let value = Number(parts[2]);
                let obj = {};
                obj[key] = value;
                arr.push(obj);
            } else {
                console.warn(`Invalid accessory option value: ${element.value}`);
            }
        });
        // console.log(arr);
        // console.log(objKeyValueSum(arr));


        //기본 obj 선언
        let defaultObj = {
            "addDamagePer": 0,
            "finalDamagePer": 1,
            "identityUptime": 1,
            "weaponAtkPlus": 0,
            "weaponAtkPer": 0,
            "atkPlus": 0,
            "atkPer": 0,
            "criticalChancePer": 0,
            "criticalDamagePer": 0,
            "stigmaPer": 0,
            "atkBuff": 0,
            "damageBuff": 0,
            "enlightPoint": 0,
            "statHp": 0,
            "utilityPower": 0,
            "carePower": 0,
        };

        result = objKeyValueSum(arr, defaultObj); // defaultObj 추가
        // console.log(result.finalDamagePer)
        // console.log(result.criticalChancePer)
        // console.log(result.criticalDamagePer)
        result.finalDamagePer *= ((result.criticalChancePer * 0.684) / 100 + 1)
        result.finalDamagePer *= ((result.criticalDamagePer * 0.3625) / 100 + 1)
        // console.log("적주피", result.finalDamagePer)
        // console.log("치적 적용", result.finalDamagePer)
        // console.log("치피 적용", result.finalDamagePer)
        return result;
    }
    // accessoryValueToObj()
    // console.log(accessoryValueToObj())

    /* **********************************************************************************************************************
    * function name		:	accessoryInputStatsValue
    * description		: 	악세서리의 힘/민첩/지능값을 가져옴
    *********************************************************************************************************************** */

    function accessoryInputStatsValue() {
        let elements = document.querySelectorAll(".accessory-area .accessory-item.accessory input.progress");
        let stats = 0;
        elements.forEach(element => {
            let value = Number(element.value);
            stats += value;
        })
        return stats;
    }

    /* **********************************************************************************************************************
    * function name		:	accessoryInputHealthValue
    * description		: 	악세서리의 체력값을 htmlObj에서 가져와 합산함
    *********************************************************************************************************************** */

    function accessoryInputHealthValue() {
        let totalHealth = 0;

        // 악세서리 체력값 가져오기
        if (extractValue && extractValue.htmlObj && extractValue.htmlObj.accessoryInfo) {
            for (let i = 0; i < 5 && i < extractValue.htmlObj.accessoryInfo.length; i++) {
                const accessory = extractValue.htmlObj.accessoryInfo[i];
                if (accessory && typeof accessory.health === 'number') {
                    totalHealth += accessory.health;
                }
            }
        }
        //console.log(totalHealth)

        // 팔찌 체력값 계산
        const bangleStatsElements = document.querySelectorAll(".accessory-item.bangle .stats");
        const bangleValueElements = document.querySelectorAll(".accessory-item.bangle input.option");

        let bangleInputHealth = 0;
        bangleStatsElements.forEach((statElement, idx) => {
            // value 값이나 텍스트 내용이 "체력"인 경우
            if (statElement.value === "체력" ||
                statElement.options[statElement.selectedIndex].text === "체력") {
                bangleInputHealth += Number(bangleValueElements[idx].value || 0);
            }
        });

        // 원래 팔찌 체력값 계산
        let originalBangleHealth = 0;
        if (extractValue && extractValue.htmlObj && extractValue.htmlObj.bangleInfo &&
            extractValue.htmlObj.bangleInfo.normalStatsArray) {

            extractValue.htmlObj.bangleInfo.normalStatsArray.forEach(statString => {
                const healthMatch = statString.match(/체력\s*\+(\d+)/);
                if (healthMatch && healthMatch[1]) {
                    originalBangleHealth += parseInt(healthMatch[1], 10);
                }
            });
        }

        // 최종 체력 계산: 악세서리 체력 + (새 팔찌 체력 - 원래 팔찌 체력)
        totalHealth = totalHealth + bangleInputHealth;

        return totalHealth;
    }

    /* **********************************************************************************************************************
    * function name        : stoneHealthValue
    * description          : 어빌리티 스톤에서 체력 값을 추출
    *********************************************************************************************************************** */
    function stoneHealthValue() {
        let stoneHealth = 0;

        // htmlObj에서 스톤 정보 확인
        if (extractValue.htmlObj && extractValue.htmlObj.stoneInfo && extractValue.htmlObj.stoneInfo.health) {
            stoneHealth = extractValue.htmlObj.stoneInfo.health;
        }

        return stoneHealth;
    }

    /* **********************************************************************************************************************
    * function name		:	objKeyValueSum(objArr)
    * description		: 	악세서리 옵션의 key값이 동일한 경우 합연산 또는 곱연산
    *********************************************************************************************************************** */
    function objKeyValueSum(objArr, defaultObj) { // defaultObj 매개변수 추가
        const grouped = {};

        // 객체들을 키별로 그룹화
        objArr.forEach(obj => {
            for (const key in obj) {
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(obj[key]);
            }
        });

        // 그룹화된 데이터를 바탕으로 새로운 객체 생성
        const combinedObj = { ...defaultObj }; // 기본 객체 복사
        for (const key in grouped) {
            // console.log(grouped)
            if (key === "finalDamagePer" || key === "identityUptime") {
                // finalDamagePer은 곱셈
                combinedObj[key] = Number(grouped[key].reduce((acc, val) => acc * val, 1));
            } else {
                // 기타 스텟은 덧셈
                combinedObj[key] = Number(grouped[key].reduce((acc, val) => acc + val, 0));
            }
        }
        //defaultObj에 존재하지만 combinedObj에 존재하지 않는 요소 추가
        for (const key in defaultObj) {
            if (!combinedObj.hasOwnProperty(key)) {
                combinedObj[key] = defaultObj[key];
            }
        }

        return combinedObj;
    }


    /* **********************************************************************************************************************
     * function name		:	gemInfoChangeToJson()
     * description			: 	변경된 보석정보의 수치를 계산하여 JSON데이터를 변경함
     *********************************************************************************************************************** */

    // let gemCalcResultAllInfo = await calculateGemData(cachedData);
    function gemInfoChangeToJson() {
        let elements = document.querySelectorAll(".gem-area .gem-box");
        elements.forEach((element, idx) => {
            if (elements.length === idx + 1) return;
            let index = Number(element.getAttribute("data-index"));
            let level = Number(element.querySelector(".level").value);
            let gem = element.querySelector(".gems").value;
            let gemDataJSON = cachedData.ArmoryGem.Gems[index];
            gemDataJSON.Level = level;
            gemDataJSON.Name = `<P ALIGN='CENTER'><FONT COLOR='#E3C7A1'>${level}레벨 ${gem}의 보석</FONT></P>`;
            gemDataJSON.Tooltip = modifyGemStringInJsonString(gemDataJSON.Tooltip, level, gem)

            // console.log(modifyGemStringInJsonString(gemDataJSON.Tooltip, level, gem))
            cachedData.ArmoryGem.Gems[index] = gemDataJSON;

        })

        /* **********************************************************************************************************************
        * function name		:	modifyGemStringInJsonString
        * description			: 	주어진 JSON 문자열 내에서 특정 보석의 레벨과 이름을 변경합니다.
        *                          JSON으로 파싱하지 않고 문자열 조작으로 처리합니다.
        *                          기존 레벨, 기존 이름 매개변수를 제거하고 정규표현식으로 찾아서 변경하도록 수정
        * parameter :
        * jsonString           :   수정할 JSON 형태의 문자열
        * newLevel             :   변경할 새로운 보석 레벨 (숫자)
        * newGemName           :   변경할 새로운 보석 이름 (문자열)
        *********************************************************************************************************************** */

        function modifyGemStringInJsonString(jsonString, newLevel, newGemName) {
            // 유효성 검사
            if (typeof jsonString !== 'string' || typeof newLevel !== 'number' || typeof newGemName !== 'string') {
                console.error("Invalid input: jsonString must be a string, newLevel must be a number, and newGemName must be a string.");
                return jsonString; // 오류 발생 시 원본 문자열 반환
            }

            // 1. NameTagBox value의 패턴을 찾습니다.
            //    - <P ALIGN='CENTER'><FONT COLOR='#E3C7A1'>: 시작 태그
            //    - (\d+)레벨 : 숫자를 캡쳐
            //    - (.*?): 레벨 뒤에 오는 임의의 문자열을 캡처합니다. (이것이 보석 이름입니다)
            //    - <\/FONT><\/P>: 끝 태그
            const nameTagRegex = /(\d+)레벨 (.*?의 보석)/g;  // 변경

            // 2. SingleTextBox value의 패턴을 찾습니다.
            //   - 보석 레벨 (\d+): 숫자를 캡쳐
            const gemLevelRegex = /보석 레벨 (\d+)/g;

            let modifiedJsonString = jsonString;

            // 1. NameTagBox의 value 수정
            modifiedJsonString = modifiedJsonString.replace(nameTagRegex, (match, oldLevel, oldGemName) => { // 변경
                // match: 전체 일치 문자열
                // oldLevel: (\d+) 에 해당하는 기존 레벨
                // oldGemName: (.*?) 에 해당하는 보석 이름
                return `${newLevel}레벨 ${newGemName}의 보석`; //변경
            });

            // 2. SingleTextBox의 value 수정
            modifiedJsonString = modifiedJsonString.replace(gemLevelRegex, `보석 레벨 ${newLevel}`);

            return modifiedJsonString;
        }

    }
    // gemInfoChangeToJson()
    // console.log("변경된JSON",cachedData)

    /* **********************************************************************************************************************
     * function name		:	supportGemValueCalc
     * description			: 	서폿용 보석 스킬명, 스킬수치 구하기
     *********************************************************************************************************************** */

    function supportGemValueCalc() {
        let result = {
            atkBuff: 0,
            damageBuff: 0,
            atkBuffACdr: 0,
            atkBuffBCdr: 0,
        }

        let gemPerObj = [
            { name: "홍염", level1: 2, level2: 4, level3: 6, level4: 8, level5: 10, level6: 12, level7: 14, level8: 16, level9: 18, level10: 20 },
            { name: "작열", level1: 6, level2: 8, level3: 10, level4: 12, level5: 14, level6: 16, level7: 18, level8: 20, level9: 22, level10: 24 },
            { name: "쿨광휘", level1: 6, level2: 8, level3: 10, level4: 12, level5: 14, level6: 16, level7: 18, level8: 20, level9: 22, level10: 24 },
        ]

        if (!(cachedData.ArmoryGem.Gems == null) && supportCheck == "서폿") {
            cachedData.ArmoryGem.Gems.forEach(function (gem) {
                let atkBuff = ['천상의 축복', '신의 분노', '천상의 연주', '음파 진동', '묵법 : 해그리기', '묵법 : 해우물', '숭고한 맹세', '숭고한 도약']
                let damageBuff = ['신앙 스킬', '세레나데 스킬', '음양 스킬']
                let atkBuffACdr = ['천상의 연주', '신의 분노', '묵법 : 해그리기', '숭고한 맹세']
                let atkBuffBCdr = ['음파 진동', '천상의 축복', '묵법 : 해우물', '숭고한 도약']

                let gemInfo = JSON.parse(gem.Tooltip)
                let type = gemInfo.Element_000.value
                //console.log(type)
                let level
                if (!(gemInfo.Element_004.value == null)) {
                    level = gemInfo.Element_004.value.replace(/\D/g, "")
                } else {
                }

                let skill
                if (!(gemInfo.Element_006.value.Element_001 == undefined)) {
                    skill = gemInfo.Element_006.value.Element_001.match(/>([^<]+)</)[1]
                } else {
                }

                // 기존 코드 유지
                atkBuff.forEach(function (buffSkill) {
                    if (skill == buffSkill && (type.includes("겁화") || type.includes("딜광휘"))) {
                        result.atkBuff += Number(level)

                    }
                })

                damageBuff.forEach(function (buffSkill) {
                    if (skill == buffSkill && (type.includes("겁화") || type.includes("딜광휘"))) {
                        result.damageBuff += Number(level)
                    }
                })

                // 작열/홍염 보석에 대한 실제 값 계산
                atkBuffACdr.forEach(function (buffSkill) {
                    if (skill == buffSkill) {
                        if (type.includes("작열") || type.includes("홍염") || type.includes("쿨광휘")) {
                            // gemPerObj에서 해당 보석 타입 찾기
                            let gemType = "";
                            if (type.includes("작열")) gemType = "작열";
                            else if (type.includes("홍염")) gemType = "홍염";
                            else if (type.includes("쿨광휘")) gemType = "쿨광휘";
                            const gemData = gemPerObj.find(g => g.name === gemType);

                            if (gemData && level) {
                                // 레벨에 맞는 실제 값 가져오기
                                const coolValue = gemData[`level${level}`];
                                //console.log(`스킬: ${skill}, 보석 종류: ${gemType}, 레벨: ${level}, 쿨감 값: ${coolValue}`);
                                result.atkBuffACdr += coolValue; // 레벨 대신 실제 값 사용
                            } else {
                            }
                        }
                    }
                })

                atkBuffBCdr.forEach(function (buffSkill) {
                    if (skill == buffSkill) {

                        if (type.includes("작열") || type.includes("홍염") || type.includes("쿨광휘")) {
                            // gemPerObj에서 해당 보석 타입 찾기
                            let gemType = "";
                            if (type.includes("작열")) gemType = "작열";
                            else if (type.includes("홍염")) gemType = "홍염";
                            else if (type.includes("쿨광휘")) gemType = "쿨광휘";

                            const gemData = gemPerObj.find(g => g.name === gemType);


                            if (gemData && level) {
                                // 레벨에 맞는 실제 값 가져오기
                                const coolValue = gemData[`level${level}`];
                                result.atkBuffBCdr += coolValue; // 레벨 대신 실제 값 사용
                            } else {
                            }
                        }
                    }
                })

            })
        }
        return result
    }
    // console.log(supportGemValueCalc())

    /* **********************************************************************************************************************
     * function name		:	karmaRankToValue()
     * description			: 	깨달음 카르마 랭크를 arkObj.weaponAtkPer 수치로 변환 
     *********************************************************************************************************************** */
    function enlightKarmaRankToValue() {
        let result = 1
        let enlightKarmaLevel = Number(document.querySelector(".ark-list.enlightenment .ark-item .input-number").value);
        result = enlightKarmaLevel * 0.001 + 1;
        return result;
    }
    /* **********************************************************************************************************************
     * function name		:	leapKarmaRankToValue()
     * description			: 	도약 카르마 랭크를 ??? 수치로 변환 
     *********************************************************************************************************************** */
    function leapKarmaRankToValue() {
        let result = 1
        let leapKarmaLevel = Number(document.querySelector(".ark-list.leap .ark-item .input-number").value);
        result = Math.max(((leapKarmaLevel - 21) * 0.015 / 100), 0);
        return result;
    }
    /* **********************************************************************************************************************
     * function name		:	evolutionKarmaRankToValue()
     * description			: 	진화 카르마 랭크를 변환 
     *********************************************************************************************************************** */
    function evolutionKarmaRankToValue() {
        let elements = document.querySelectorAll(".ark-list.evolution .ark-item")[1].querySelectorAll("input[type=radio]");
        let karmaRank = 0;
        elements.forEach((element, idx) => {
            if (element.checked) {
                karmaRank = idx;
            }
        })
        return karmaRank;
    }
    let evolutionKarmaRank = evolutionKarmaRankToValue();

    /* **********************************************************************************************************************
     * function name		:	supportEnlightNodeToValue
     * description			: 	서폿 깨달음 노드를 수치로 변환
     *********************************************************************************************************************** */
    function supportEnlightNodeToValue() {
        let result = {
            stigmaPer: 0,
            enlightenmentBuff: 0
        }
        let enlightElement = Array.from(document.querySelectorAll(".ark-area .ark-list.enlightenment .ark-item.node select"));
        enlightElement.forEach(element => {
            let name = element.value.split(":")[0];
            let value = Number(element.value.split(":")[1]);
            result[name] += value;
            return result;
        });
        return result;
    };
    supportEnlightNodeToValue();
    /* **********************************************************************************************************************
     * function name		:	gemAttackBonusValueCalc
     * description			: 	진,깨,도 수치를 반환
     *********************************************************************************************************************** */

    function arkPassiveValue() {
        let result = {
            atkBuff: 0,
            skillCool: 0,
            enlightenmentDamage: 0,
            enlightenmentBuff: 0,
            evolutionDamage: 0,
            evolutionBuff: 0,
            stigmaPer: 0,
            leapDamage: 0,
            leapBuff: 0,
            cdrPercent: 0,
            statHp: 0,
        }
        let enlightElement = Number(document.querySelector(".ark-area .title-box.enlightenment .title").textContent);
        let evolutionElement = Number(document.querySelector(".ark-area .title-box.evolution .title").textContent);
        let evolutionKarmaLevelElement = Number(document.querySelector(".ark-area .ark-list.evolution .ark-item .input-number").value);
        let leapElement = Number(document.querySelector(".ark-area .title-box.leap .title").textContent)

        if (evolutionElement >= 140) {
            result.evolutionDamage += 1.79
        } else if (evolutionElement >= 120) { //  == 진화수치
            result.evolutionDamage += 1.65
        } else if (evolutionElement >= 105) {
            result.evolutionDamage += 1.45
        } else if (evolutionElement >= 90) {
            result.evolutionDamage += 1.40
        } else if (evolutionElement >= 80) {
            result.evolutionDamage += 1.35
        } else if (evolutionElement >= 70) {
            result.evolutionDamage += 1.30
        } else if (evolutionElement >= 60) {
            result.evolutionDamage += 1.25
        } else if (evolutionElement >= 50) {
            result.evolutionDamage += 1.20
        } else if (evolutionElement >= 40) {
            result.evolutionDamage += 1
        }


        if (evolutionKarmaRank === 6) {
            result.evolutionDamage += 0.06;
            result.stigmaPer += 6;
        } else if (evolutionKarmaRank === 5) {
            result.evolutionDamage += 0.05;
            result.stigmaPer += 5;
        } else if (evolutionKarmaRank === 4) {
            result.evolutionDamage += 0.04;
            result.stigmaPer += 4
        } else if (evolutionKarmaRank === 3) {
            result.evolutionDamage += 0.03;
            result.stigmaPer += 3
        } else if (evolutionKarmaRank === 2) {
            result.evolutionDamage += 0.02;
            result.stigmaPer += 2
        } else if (evolutionKarmaRank === 1) {
            result.evolutionDamage += 0.01;
            result.stigmaPer += 1
        } else {
            result.evolutionDamage += 0.00;
            result.stigmaPer += 0
        }
        result.statHp = evolutionKarmaLevelElement * 400;


        if (enlightElement >= 100) { // enlightElement == 깨달음수치
            result.enlightenmentDamage += 1.42
        } else if (enlightElement >= 98) {
            result.enlightenmentDamage += 1.40
        } else if (enlightElement >= 97) {
            result.enlightenmentDamage += 1.37
        } else if (enlightElement >= 96) {
            result.enlightenmentDamage += 1.37
        } else if (enlightElement >= 95) {
            result.enlightenmentDamage += 1.36
        } else if (enlightElement >= 94) {
            result.enlightenmentDamage += 1.36
        } else if (enlightElement >= 93) {
            result.enlightenmentDamage += 1.35
        } else if (enlightElement >= 92) {
            result.enlightenmentDamage += 1.35
        } else if (enlightElement >= 90) {
            result.enlightenmentDamage += 1.34
        } else if (enlightElement >= 88) {
            result.enlightenmentDamage += 1.33
        } else if (enlightElement >= 86) {
            result.enlightenmentDamage += 1.28
        } else if (enlightElement >= 84) {
            result.enlightenmentDamage += 1.27
        } else if (enlightElement >= 82) {
            result.enlightenmentDamage += 1.26
        } else if (enlightElement >= 80) {
            result.enlightenmentDamage += 1.25
        } else if (enlightElement >= 78) {
            result.enlightenmentDamage += 1.18
        } else if (enlightElement >= 76) {
            result.enlightenmentDamage += 1.17
        } else if (enlightElement >= 74) {
            result.enlightenmentDamage += 1.16
        } else if (enlightElement >= 72) {
            result.enlightenmentDamage += 1.15
        } else if (enlightElement >= 64) {
            result.enlightenmentDamage += 1.13
        } else if (enlightElement >= 56) {
            result.enlightenmentDamage += 1.125
        } else if (enlightElement >= 48) {
            result.enlightenmentDamage += 1.12
        } else if (enlightElement >= 40) {
            result.enlightenmentDamage += 1.115
        } else if (enlightElement >= 32) {
            result.enlightenmentDamage += 1.11
        } else if (enlightElement >= 24) {
            result.enlightenmentDamage += 1.10
        } else {
            result.enlightenmentDamage += 1
        }


        if (leapElement >= 70) { // leapElement == 도약 수치
            result.leapDamage += 1.15
            result.leapBuff += 1.051
        } else if (leapElement >= 68) {
            result.leapDamage += 1.14
            result.leapBuff += 1.04545
        } else if (leapElement >= 66) {
            result.leapDamage += 1.13
            result.leapBuff += 1.04535
        } else if (leapElement >= 64) {
            result.leapDamage += 1.12
            result.leapBuff += 1.04525
        } else if (leapElement >= 62) {
            result.leapDamage += 1.11
            result.leapBuff += 1.04515
        } else if (leapElement >= 60) {
            result.leapDamage += 1.10
            result.leapBuff += 1.045
        } else if (leapElement >= 50) {
            result.leapDamage += 1.05
            result.leapBuff += 1.035
        } else if (leapElement >= 40) {
            result.leapDamage += 1.03
            result.leapBuff += 1.035
        } else {
            result.leapDamage += 1
            result.leapBuff += 1
        }

        result.weaponAtkPer = enlightKarmaRankToValue();
        result.leapDamage = result.leapDamage + leapKarmaRankToValue();
        result.evolutionBuff = evloutionArkCheck().evolutionBuff;
        result.stigmaPer += evloutionArkCheck().stigmaPer + supportEnlightNodeToValue().stigmaPer;
        result.cdrPercent = leapArkCheck().cdrPercent
        result.enlightenmentBuff += supportEnlightNodeToValue().enlightenmentBuff;
        result.atkBuff += evloutionArkCheck().atkBuff
        result.skillCool += evloutionArkCheck().skillCool
        return result
    }
    /* **********************************************************************************************************************
    * function name		:	evolutionArkCheck()
    * description	    : 	진화 노드 검사
    *********************************************************************************************************************** */
    function evloutionArkCheck() {
        let result = {
            atkBuff: 0,
            skillCool: 0,
            evolutionBuff: 0,
            stigmaPer: 0,
        }
        let evloutionArkPassive = cachedData.ArkPassive.Effects.filter(data => data.Name === "진화");
        evloutionArkPassive = evloutionArkPassive.map(evloution => evloution.Description.match(/>([^<]+)</g)[2].slice(1, -1));
        //console.log(evloutionArkPassive)
        evloutionArkPassive.forEach(arkPassive => {
            if (arkPassive === "정열의 춤사위 Lv.1") {
                result.evolutionBuff = 7;
            } else if (arkPassive === "정열의 춤사위 Lv.2") {
                result.evolutionBuff = 14;
            }
            if (/입식 타격가|마나 용광로|안정된 관리자/.test(arkPassive)) {
                if (arkPassive.includes("Lv.1")) {
                    result.stigmaPer += 10;
                } else if (arkPassive.includes("Lv.2")) {
                    result.stigmaPer += 20;
                }
            }
            if (arkPassive === "선각자 Lv.1") {
                result.skillCool = 0.05;
                result.atkBuff += 22;
            }
            if (arkPassive === "진군 Lv.1") {
                result.atkBuff += 24;
            }
            if (arkPassive === "기원 Lv.1") {
                result.stigmaPer = 4;
                result.atkBuff += 22;
            }
        })
        if (result.stigmaPer === 0) {
            result.stigmaPer = 1;
        }
        return result;
    }


    // { name: "선각자", level: 1, skillCool:0.05, atkBuff: 22 },
    // { name: "진군", level: 1, evolutionDamage: 0, atkBuff: 24 },
    // { name: "기원", level: 1, evolutionDamage: 0, atkBuff: 22, stigmaPer : 4 },


    /* **********************************************************************************************************************
    * function name		:	leapArkCheck()
    * description	    : 	도약 노드 검사
    *********************************************************************************************************************** */
    function leapArkCheck() {
        let result = {
            cdrPercent: 0
        }
        let leapArkPassive = cachedData.ArkPassive.Effects.filter(data => data.Name === "도약");
        leapArkPassive = leapArkPassive.map(leap => leap.Description.match(/>([^<]+)</g)[2].slice(1, -1));
        leapArkPassive.forEach(arkPassive => {
            if (arkPassive === "잠재력 해방 Lv.1") {
                result.cdrPercent = 0.02;

            } else if (arkPassive === "잠재력 해방 Lv.2") {
                result.cdrPercent = 0.04;

            } else if (arkPassive === "잠재력 해방 Lv.3") {
                result.cdrPercent = 0.06;

            } else if (arkPassive === "잠재력 해방 Lv.4") {
                result.cdrPercent = 0.08;

            } else if (arkPassive === "잠재력 해방 Lv.5") {
                result.cdrPercent = 0.1;
            }
        })
        return result;
    }

    /* **********************************************************************************************************************
    * function name		:	enlightArkCheck()
    * description	    : 	깨달음 노드 검사
    *********************************************************************************************************************** */
    function enlightArkCheck() {
        let result = { stigmaPer: 0, enlightenmentBuff: 1 };
        let stigmaArkPassiveArray = ["빠른 구원", "빛의 흔적", "포용의 세레나데", "낙인의 세레나데", "오누이", "낙인 강화", "해방자의 흔적", "빛의 검기"]
        const mainNodeBuffs = [
            { name: "신성 해방", level: 1, buff: 0.1 },
            { name: "신성 해방", level: 2, buff: 0.15 },
            { name: "신성 해방", level: 3, buff: 0.2 },
            { name: "세레나데 코드", level: 1, buff: 0.1 },
            { name: "세레나데 코드", level: 2, buff: 0.15 },
            { name: "세레나데 코드", level: 3, buff: 0.2 },
            { name: "묵법 : 접무", level: 1, buff: 0.1 },
            { name: "묵법 : 접무", level: 2, buff: 0.15 },
            { name: "묵법 : 접무", level: 3, buff: 0.2 },
            { name: "해방의 날개", level: 1, buff: 0.1 },
            { name: "해방의 날개", level: 2, buff: 0.15 },
            { name: "해방의 날개", level: 3, buff: 0.2 },
        ];
        let enlightArkPassive = cachedData.ArkPassive.Effects.filter(data => data.Name === "깨달음");
        enlightArkPassive = enlightArkPassive.map(enlight => enlight.Description.match(/>([^<]+)</g)[2].slice(1, -1));

        convertToNameLevelObjects(enlightArkPassive).forEach(arkPassiveObj => {
            // 낙인력 보너스 아크패시브 확인
            if (stigmaArkPassiveArray.includes(arkPassiveObj.name)) {
                result.stigmaPer += Number(arkPassiveObj.level - 1);
            }
            const mainNodeBuff = mainNodeBuffs.find(buff => buff.name === arkPassiveObj.name && buff.level === arkPassiveObj.level);
            if (mainNodeBuff) {
                result.enlightenmentBuff += mainNodeBuff.buff;
            }
        })

        // 아크패시브 배열을 이름과 레벨의 객체로 변환
        function convertToNameLevelObjects(dataArray) {
            // 결과를 저장할 빈 배열을 선언합니다.
            const resultArray = [];

            // 각 문자열을 처리하기 위해 배열을 순회합니다.
            dataArray.forEach(item => {
                const match = item.match(/(.*) Lv\.(\d+)/);

                if (match) {
                    // match[1]은 첫 번째 캡처 그룹(이름), match[2]는 두 번째 캡처 그룹(레벨)입니다.
                    const name = match[1].trim(); // 공백 제거
                    const level = Number(match[2]); // 숫자로 변환

                    // 새로운 객체를 생성하여 결과 배열에 추가
                    resultArray.push({
                        name: name,
                        level: level
                    });
                } else {
                    // 정규식 패턴과 일치하지 않는 경우
                    console.warn(`"${item}"은(는) 예상된 형식과 일치하지 않아 변환할 수 없습니다.`);
                }
            });

            return resultArray;
        }
        return result;
    };


    //홀나 메인노드
    //{ name: "신성 해방", level: 1, enlightenmentBuff: 0.1 },
    //{ name: "신성 해방", level: 2, enlightenmentBuff: 0.15 },
    //{ name: "신성 해방", level: 3, enlightenmentBuff: 0.2 },

    //바드 메인노드
    //{ name: "세레나데 코드", level: 1, enlightenmentBuff: 0.1 },
    //{ name: "세레나데 코드", level: 2, enlightenmentBuff: 0.15 },
    //{ name: "세레나데 코드", level: 3, enlightenmentBuff: 0.2 },



    /* **********************************************************************************************************************
     * function name		:	gemAttackBonusValueCalc
     * description			: 	작열,겁화 보석 공격력 보너스 계산 (gemAttackBonusObj에 적용함)
     *********************************************************************************************************************** */

    let gemCalcResultAllInfo = await calculateGemData(cachedData);
    function gemAttackBonusValueCalc() {
        let result = 0;
        if (gemCalcResultAllInfo && gemCalcResultAllInfo.gemSkillArry) {
            // let gemAttackBonusObj = [
            //     { name: "겁화", level1: 0, level2: 0.05, level3: 0.1, level4: 0.2, level5: 0.3, level6: 0.45, level7: 0.6, level8: 0.8, level9: 1.00, level10: 1.2 },
            //     { name: "작열", level1: 0, level2: 0.05, level3: 0.1, level4: 0.2, level5: 0.3, level6: 0.45, level7: 0.6, level8: 0.8, level9: 1.00, level10: 1.2 },
            // ];
            let gemAttackBonus = [0, 0.05, 0.1, 0.2, 0.3, 0.45, 0.6, 0.8, 1.00, 1.2];
            gemCalcResultAllInfo.gemSkillArry.forEach((gemTag, idx) => {
                if (/겁화|작열|광휘/.test(gemTag.name)) {
                    //console.log("보석디버깅")
                    //console.log(gemTag)
                    //console.log(gemAttackBonus[gemTag.level - 1])
                    result += gemAttackBonus[gemTag.level - 1];
                    //console.log(result)
                }
            })
        }
        return result;
    }
    // console.log(gemAttackBonusValueCalc())

    /* **********************************************************************************************************************
     * function name		:	avatarPointCalc
     * description			: 	영웅,전설,없음 아바타에 대한 점수를 계산
     *********************************************************************************************************************** */

    function avatarPointCalc() {

        let parentElement = document.querySelectorAll(".armor-area .armor-item")[6];
        let heroElement = parentElement.querySelector(".hero").querySelectorAll("input[type=radio]");
        let legendaryElement = parentElement.querySelector(".legendary").querySelectorAll("input[type=radio]");
        let legendValue = Array.from(legendaryElement).filter(radio => radio.checked).length;
        let heroValue = Array.from(heroElement).filter(radio => radio.checked).length;

        let avatorStat = (legendValue * 2) + heroValue;

        return (avatorStat / 100) + 1
    }

    /* **********************************************************************************************************************
    * function name		:	extraElementCreate
    * description       : 	아제나, 펫 효과 radio버튼을 생성함
    *********************************************************************************************************************** */
    function extraElementCreate(supportCheck) {
        const extraAreaElement = document.querySelector(".extra-area");

        if (supportCheck !== "서폿") {
            // if (false) {
            extraAreaElement.innerHTML =
                `<div class="extra-box azena">
                    <span class="tag">제일 먼저 아래 항목 선택 후 새로고침을 해주세요.</span>
                    <span class="text"></span>
                    <span class="text">아제나의 축복</span>
                    <div class="radio-item">
                        <input type="radio" id="azena-false" name="azena" value="0">
                        <label for="azena-false">미보유</label>
                        <input type="radio" id="azena-true" name="azena" value="6000" checked>
                        <label for="azena-true">보유</label>
                    </div>
                </div>
                <div class="extra-box damage">
                    <span class="text">펫 목장:추가 피해</span>
                    <div class="radio-item">
                        <input type="radio" id="damage0" name="damage" value="0">
                        <label for="damage0">0%</label>
                        <input type="radio" id="damage04" name="damage" value="0.4">
                        <label for="damage04">0.4%</label>
                        <input type="radio" id="damage07" name="damage" value="0.7">
                        <label for="damage07">0.7%</label>
                        <input type="radio" id="damage1" name="damage" value="1" checked>
                        <label for="damage1">1%</label>
                    </div>
                </div>
                <div class="extra-box stats">
                    <span class="text">펫 목장:힘/민첩/지능</span>
                    <div class="radio-item">
                        <input type="radio" id="stats0" name="stats" value="0">
                        <label for="stats0">0%</label>
                        <input type="radio" id="stats04" name="stats" value="0.4">
                        <label for="stats04">0.4%</label>
                        <input type="radio" id="stats07" name="stats" value="0.7">
                        <label for="stats07">0.7%</label>
                        <input type="radio" id="stats1" name="stats" value="1" checked>
                        <label for="stats1">1%</label>
                    </div>
                </div>`
        } else {
            extraAreaElement.innerHTML =
                `<div class="extra-box azena">
                    <span class="tag">제일 먼저 아래 항목 선택 후 새로고침을 해주세요.</span>
                    <span class="text"></span>
                    <span class="text">아제나의 축복</span>
                    <div class="radio-item">
                        <input type="radio" id="azena-false" name="azena" value="0">
                        <label for="azena-false">미보유</label>
                        <input type="radio" id="azena-true" name="azena" value="6000" checked>
                        <label for="azena-true">보유</label>
                    </div>
                </div>
                <div class="extra-box effect">
                    <span class="text">펫 효과 : 최대 생명력 %</span>
                    <div class="radio-item">
                        <input type="radio" id="petEffect0" name="effect" value="0">
                        <label for="petEffect0">0</label>
                        <input type="radio" id="petEffect1" name="effect" value="1">
                        <label for="petEffect1">1</label>
                        <input type="radio" id="petEffect2" name="effect" value="2">
                        <label for="petEffect2">2</label>
                        <input type="radio" id="petEffect3" name="effect" value="3">
                        <label for="petEffect3">3</label>
                        <input type="radio" id="petEffect4" name="effect" value="4">
                        <label for="petEffect4">4</label>
                        <input type="radio" id="petEffect5" name="effect" value="5" checked>
                        <label for="petEffect5">5</label>
                    </div>
                </div>
                <div class="extra-box ranch">
                    <span class="text">펫 목장 : 최대 생명력 %</span>
                    <div class="radio-item">
                        <input type="radio" id="petStats0" name="ranch" value="0">
                        <label for="petStats0">0</label>
                        <input type="radio" id="petStats1" name="ranch" value="0.8">
                        <label for="petStats1">0.8</label>
                        <input type="radio" id="petStats2" name="ranch" value="1.4">
                        <label for="petStats2">1.4</label>
                        <input type="radio" id="petStats3" name="ranch" value="2" checked>
                        <label for="petStats3">2</label>
                    </div>
                </div>`
        }
    };

    /* **********************************************************************************************************************
    * function name		:	extraSettingSelect
    * description       : 	아제나, 펫 효과 등 api상으로 알 수 없는 정보를 유저한테 선택시킴
    *********************************************************************************************************************** */
    function extraValueExtract() {
        const azenaElement = document.querySelector(".extra-area .extra-box.azena input[name='azena']:checked");
        const azenaValue = Number(azenaElement?.value ?? 0);

        const damageElement = document.querySelector(".extra-area .extra-box.damage input[name='damage']:checked");
        const damageValue = Number(damageElement?.value ?? 0);

        const statsElement = document.querySelector(".extra-area .extra-box.stats input[name='stats']:checked");
        const statsValue = Number(statsElement?.value ?? 0);

        const effectElement = document.querySelector(".extra-area .extra-box.effect input[name='effect']:checked");
        const effectValue = Number(effectElement?.value ?? 0);

        const ranchElement = document.querySelector(".extra-area .extra-box.ranch input[name='ranch']:checked");
        const ranchValue = Number(ranchElement?.value ?? 0);

        return {
            azena: azenaValue,
            petAddDmg: damageValue,
            petStats: statsValue,
            petHp: effectValue + ranchValue
        };
    }

    /* **********************************************************************************************************************
    * function name		:	extraSaveSelection
    * description       : 	현재 선택된 값을 로컬 스토리지에 저장하는 함수
    *********************************************************************************************************************** */
    function extraSaveSelection() {
        // 1. 현재 선택된 값의 value만 추출합니다.
        const selection = {
            azena: document.querySelector("input[name='azena']:checked")?.value,
            damage: document.querySelector("input[name='damage']:checked")?.value,
            stats: document.querySelector("input[name='stats']:checked")?.value
        };

        // 2. 객체를 JSON 문자열로 변환하여 로컬 스토리지에 저장
        localStorage.setItem('extraSelections', JSON.stringify(selection));
    }
    extraSaveSelection()
    /* **********************************************************************************************************************
    * function name		:	extraLoadSelection
    * description       : 	로컬 스토리지에서 값을 읽어와 선택 상태를 복원하는 함수
    *********************************************************************************************************************** */
    function extraLoadSelection() {
        const stored = localStorage.getItem('extraSelections');

        if (!stored) return;

        const selection = JSON.parse(stored);

        // 각 name과 value에 해당하는 라디오 버튼을 찾아 checked=true 설정
        for (const name in selection) {
            const value = selection[name];
            if (value) {
                const element = document.querySelector(`input[name='${name}'][value='${value}']`);
                if (element) {
                    element.checked = true;
                }
            }
        }

        // (선택 사항) 로딩 후 바로 계산 함수 실행
        // extraValueExtract()를 사용하여 값을 계산하는 로직이 있다면 여기서 실행할 수 있습니다.
        // console.log("복원된 값으로 계산:", extraValueExtract());
    }

    /* **********************************************************************************************************************
     * function name		:	etcObjChangeValue
     * description			: 	
     *********************************************************************************************************************** */

    function etcObjChangeValue() {
        extractValue.etcObj.expeditionStats = Math.floor((cachedData.ArmoryProfile.ExpeditionLevel - 1) / 2) * 5 + 5;
        extractValue.etcObj.gemAttackBonus = gemAttackBonusValueCalc();
        extractValue.etcObj.abilityAttackBonus = stoneLevelBuffStat();
        extractValue.etcObj.armorStatus = armorWeaponStatsObj.armorStats + accessoryInputStatsValue();
        extractValue.etcObj.avatarStats = avatarPointCalc();
        extractValue.etcObj.gemsCoolAvg = extractValue.etcObj.gemsCoolAvg;
        extractValue.etcObj.supportCheck = supportCheck;
        // 여기에 체력 값 추가
        extractValue.etcObj.healthStatus = (armorWeaponStatsObj.healthStats + accessoryInputHealthValue() + stoneHealthValue()) * extractValue.jobObj.healthPer;

        //console.log(accessoryInputHealthValue())
        extractValue.etcObj.gemCheckFnc.specialSkill = extractValue.etcObj.gemCheckFnc.specialSkill;
        extractValue.etcObj.gemCheckFnc.originGemValue = extractValue.etcObj.gemCheckFnc.originGemValue;
        extractValue.etcObj.gemCheckFnc.gemValue = extractValue.etcObj.gemCheckFnc.gemValue;
        extractValue.etcObj.gemCheckFnc.gemAvg = extractValue.etcObj.gemCheckFnc.gemAvg;
        extractValue.etcObj.gemCheckFnc.etcAverageValue = extractValue.etcObj.gemCheckFnc.etcAverageValue;
    }
    // console.log("기타OBJ", etcObjChangeValue())

    /* **********************************************************************************************************************
     * function name		:	simulatorDataToextractValue
     * description			: 	최종 시뮬레이터 결과를 extractValue에 반영
     *********************************************************************************************************************** */
    function simulatorDataToExtractValue() {
        extractValue.accObj = accessoryValueToObj();
        extractValue.arkObj = arkPassiveValue();
        extractValue.bangleObj = bangleOptionCalc();
        // extractValue.defaultObj = defaultObjChangeValue();
        defaultObjChangeValue();
        //extractValue.elixirObj = armorElixirToObj();
        extractValue.engObj = engOutputCalc(engExtract());
        // extractValue.etcObj = etcObjChangeValue();
        extractValue.gemObj = supportGemValueCalc();
        extractValue.extraObj = extraValueExtract();
        etcObjChangeValue()
    }
    simulatorDataToExtractValue()
    //console.log("totalStatus", extractValue.defaultObj.totalStatus)
    console.log("오리진OBJ", extractValue)

    /* **********************************************************************************************************************
     * function name		:	specPointCalc
     * description			: 	최종 스펙포인트 계산식
     *********************************************************************************************************************** */
    let originSpecPoint = await Modules.calcValue.specPointCalc(extractValue);
    console.log(originSpecPoint)
    /* **********************************************************************************************************************
     * function name		:	calcSpecPointToHtml
     * description			: 	변환된 스펙포인트를 표시해줌
     ********************************************************************************************************************** */
    function calcSpecPointToHtml() {
        let element = document.querySelector(".sc-info .group-info .spec-area");
        let specPointElement = element.querySelector(".tier-box .spec-point");
        let originElement = element.querySelector(".gauge-box span.spec.desc");
        let originValue = Number(originElement.getAttribute("data-spec-point"));

        let specPoint = Number(originSpecPoint.completeSpecPoint).toFixed(2);
        function formatSpecPoint(value) {
            let integer = value.split(".")[0];
            let decimal = value.split(".")[1];
            return `${integer}.<i style="font-size:20px;">${decimal}</i>`;
        }
        let diffValue = (Number(specPoint) - originValue).toFixed(2);
        let diffElement = element.querySelector(".tier-box .difference");
        diffElement.classList.remove("zero", "decrease", "incress");
        if (diffValue === "0.00") {
            diffElement.classList.add("zero");
        } else if (diffValue < 0) {
            diffElement.classList.add("decrease");
        } else if (diffValue > 0) {
            diffElement.classList.add("incress");
        }
        diffElement.innerHTML = diffValue;
        let itemLevelElement = document.querySelector(".sc-info .spec-area .gauge-box .level");
        function itemLevelAverage() {
            let avgLevel = 0;
            let sumValue = 0;
            armorWeaponStatsObj.level.forEach(item => {
                sumValue += item.level;
            })
            avgLevel = sumValue / 6;
            return avgLevel;
        }
        itemLevelElement.textContent = "아이템 레벨 - " + itemLevelAverage().toFixed(2);
        specPointElement.innerHTML = formatSpecPoint(specPoint);
    }
    calcSpecPointToHtml();


    /* **********************************************************************************************************************
    * function name		:	officialCombatCalcValue()
    * description       : 	상세정보의 내용을 생성함
    *********************************************************************************************************************** */
    // 계산값 변경을 추적할 수 있는 캐싱처리
    if (!officialCombatCachedFlag) {
        let officialCombatSimulatorObj = await Modules.officialCombatSimulator.simulatorToOffcialCombatObj();
        let officialCombatCalcValue = await Modules.officialCombatCalculator.officialCombatCalculator(officialCombatSimulatorObj, extractValue);

        if (extractValue.etcObj.supportCheck === "서폿") {
            cachedDetailInfo.extractValue.defaultObj.combatPower = officialCombatCalcValue.support;
        } else {
            cachedDetailInfo.extractValue.defaultObj.combatPower = officialCombatCalcValue.dealer;
        }
        officialCombatCachedFlag = "flag";
    }
    // 공식 전투력 계산 함수 로드(스크립트 동작 순서로 인해 작성)
    let officialCombatSimulatorObj = await Modules.officialCombatSimulator.simulatorToOffcialCombatObj();
    let officialCombatCalcValue = await Modules.officialCombatCalculator.officialCombatCalculator(officialCombatSimulatorObj, extractValue);
    //console.log("공식전투력 계산결과", officialCombatCalcValue);


    /* **********************************************************************************************************************
    * function name		:	detailAreaCreate()
    * description       : 	detail-area 상세정보의 내용을 생성함
    *********************************************************************************************************************** */
    async function detailAreaCreate() {
        let element = document.querySelector(".sc-info .group-info .detail-area");
        //console.log(userDbInfo)

        function infoWrap(tag, array) {
            let mobilePos = "";
            if (mobileCheck) {
                mobilePos = "top:initial;bottom:95%;left:-50px;";
            }
            let infoBox = array.map(object => {
                return `
                        <div class="info-box">
                            <span class="text">
                                <i class="icon ${object.icon}"></i>
                                ${object.name}
                                ${object.question ?
                        `<div class="question" style="margin-left:5px;">
                                <span class="detail" style="${mobilePos};width:200px;white-space:wrap;">${object.question}</span>
                            </div>` : ""}
                            </span>
                            <span class="text">${object.value}</span>
                        </div>`;
            });
            return `
                    <div class="info-wrap">
                        <span class="tag">${tag}</span>
                        ${infoBox.join('')}
                    </div>`;
        }
        function formatDate(dateString) {
            // 입력된 날짜 문자열의 형식을 검증합니다.
            if (!/^\d{14}$/.test(dateString)) {
                return '잘못된 날짜 형식입니다.';
            }

            // 문자열에서 년, 월, 일을 추출합니다.
            const year = dateString.substring(2, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);

            // 'YY.MM.DD' 형식의 문자열을 생성합니다.
            return `${year}.${month}.${day}`;
        }

        let dealerMedianValue = extractValue.htmlObj.medianInfo.dealerMedianValue;
        let supportMedianValue = extractValue.htmlObj.medianInfo.supportMedianValue;
        let supportMinMedianValue = extractValue.htmlObj.medianInfo.supportMinMedianValue;
        let supportMaxMedianValue = extractValue.htmlObj.medianInfo.supportMaxMedianValue;
        let dealerMinMedianValue = extractValue.htmlObj.medianInfo.dealerMinMedianValue;
        let dealerMaxMedianValue = extractValue.htmlObj.medianInfo.dealerMaxMedianValue;
        let currentSupportScore = originSpecPoint.completeSpecPoint;
        let supportRange = supportMaxMedianValue - supportMinMedianValue;
        let supportPosition = currentSupportScore - supportMinMedianValue;

        // 3. 서포터 위치 정규화 (0 이상 값으로, 상한 제한 없음)
        let normalizedSupport = 0; // 기본값 0
        if (supportRange > 0) { // 0으로 나누는 경우 방지
            normalizedSupport = supportPosition / supportRange;
        }
        normalizedSupport = Math.max(0, normalizedSupport);

        // 4. 딜러 점수 범위 계산
        let dealerRange = dealerMaxMedianValue - dealerMinMedianValue;

        // 5. 최종 딜러 환산 점수 계산
        let dealerSupportConversion = dealerMinMedianValue + (normalizedSupport * dealerRange);
        function compareValue(cachedValue, simulatorValue) {
            // cachedValue = Number(cachedValue);
            // simulatorValue = Number(simulatorValue);
            // let fontSizeValue = "12px;"
            // if (cachedValue < simulatorValue) return `<em style="color:#FF4500;font-size:${fontSizeValue}">▲${(simulatorValue - cachedValue).toFixed(0)}</em>`
            // else if (cachedValue > simulatorValue) return `<em style="color:#1E90FF;font-size:${fontSizeValue}">▼${(simulatorValue - cachedValue)}</em>`
            // else if (cachedValue == simulatorValue) return `<em style="color:#fff;font-size:${fontSizeValue}">▬0</em>`
            const cachedComp = Math.round(Number(cachedValue) * 100);
            const simulatorComp = Math.round(Number(simulatorValue) * 100);
            const diff = (Number(simulatorValue) - Number(cachedValue)).toFixed(2);
            let fontSizeValue = "11px;"
            if (cachedComp < simulatorComp) {
                return `<em style="color:#FF4500;font-size:${fontSizeValue}">(▲${diff})</em>`;
            } else if (cachedComp > simulatorComp) {
                return `<em style="color:#1E90FF;font-size:${fontSizeValue}">(▼${diff})</em>`;
            } else {
                return `<em style="color:#fff;font-size:${fontSizeValue}">(▬0)</em>`;
            }
        }
        let combatInfo = [
            { name: "예상 전투력 - Beta", value: Number(officialCombatCalcValue.dealer) + compareValue(cachedDetailInfo.extractValue.defaultObj.combatPower, officialCombatCalcValue.dealer), icon: "bolt-lightning-solid" },
        ]
        let armorInfo = [
            { name: "공격력", value: Number(originSpecPoint.dealerAttackPowResult).toFixed(0) + compareValue(cachedDetailInfo.specPoint.dealerAttackPowResult, originSpecPoint.dealerAttackPowResult), icon: "bolt-solid" },
            //{ name: "엘릭서", value: Number(originSpecPoint.dealerExlixirValue).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.dealerExlixirValue, originSpecPoint.dealerExlixirValue), icon: "flask-solid" },
            //{ name: "초월", value: Number(originSpecPoint.dealerHyperValue).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.dealerHyperValue, originSpecPoint.dealerHyperValue), icon: "star-solid" },
            { name: "악세", value: Number(originSpecPoint.dealerAccValue).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.dealerAccValue, originSpecPoint.dealerAccValue), icon: "circle-notch-solid" },
            { name: "팔찌", value: Number(originSpecPoint.dealerBangleResult).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.dealerBangleResult, originSpecPoint.dealerBangleResult), icon: "ring-solid" },
            { name: "각인", value: Number(originSpecPoint.dealerEngResult).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.dealerEngResult, originSpecPoint.dealerEngResult), icon: "book-solid" },
        ]
        let arkPassiveInfo = [
            { name: "진화", value: Number(originSpecPoint.dealerEvloutionResult).toFixed(0) + "%" + compareValue(cachedDetailInfo.specPoint.dealerEvloutionResult, originSpecPoint.dealerEvloutionResult), icon: "fire-solid" },
            { name: "깨달음", value: Number(originSpecPoint.dealerEnlightResult).toFixed(0) + "%" + compareValue(cachedDetailInfo.specPoint.dealerEnlightResult, originSpecPoint.dealerEnlightResult), icon: "lightbulb-solid" },
            { name: "도약", value: Number(originSpecPoint.dealerLeapResult).toFixed(0) + "%" + compareValue(cachedDetailInfo.specPoint.dealerLeapResult, originSpecPoint.dealerLeapResult), icon: "feather-pointed-solid" },
        ]
        let gemInfo;
        if (extractValue.etcObj.gemCheckFnc.originGemValue === 0) {
            gemInfo = [
                { name: "보석 실질 딜증", value: Number((extractValue.etcObj.gemCheckFnc.etcAverageValue - 1) * 100).toFixed(2) + "%" + compareValue(cachedDetailInfo.extractValue.etcObj.gemCheckFnc.etcAverageValue, extractValue.etcObj.gemCheckFnc.etcAverageValue), icon: "gem-solid", question: "보석을 통해 얻은 스킬 대미지 증가량" },
                { name: "보석 최종 딜증", value: Number((extractValue.etcObj.gemCheckFnc.etcAverageValue - 1) * 100).toFixed(2) + "%" + compareValue(cachedDetailInfo.extractValue.etcObj.gemCheckFnc.etcAverageValue, extractValue.etcObj.gemCheckFnc.etcAverageValue), icon: "gem-solid", question: "보석 순수 딜증 x 보정치로 인한 최종 딜증값으로, 스펙포인트에 적용되는 값" },
                { name: "보석 쿨감", value: Number(extractValue.etcObj.gemCheckFnc.gemAvg).toFixed(2) + "%" + compareValue(cachedDetailInfo.extractValue.etcObj.gemsCoolAvg, extractValue.etcObj.gemsCoolAvg), icon: "gem-solid", question: "보석 평균 쿨감 수치" },
                { name: "보석 보정치", value: Number(extractValue.etcObj.gemCheckFnc.specialSkill).toFixed(2) + compareValue(cachedDetailInfo.extractValue.etcObj.gemCheckFnc.specialSkill, extractValue.etcObj.gemCheckFnc.specialSkill), icon: "gem-solid", question: "보석에 포함되지 않는 스킬 및 효과를 보정하기 위한 계수. 직각 별로 고정값이며, 소수점 두 번째 자리까지만 표시" },
            ]
        } else {
            gemInfo = [
                { name: "보석 실질 딜증", value: Number(extractValue.etcObj.gemCheckFnc.originGemValue).toFixed(2) + "%" + compareValue(cachedDetailInfo.extractValue.etcObj.gemCheckFnc.originGemValue, extractValue.etcObj.gemCheckFnc.originGemValue), icon: "gem-solid", question: "보석을 통해 얻은 스킬 대미지 증가량" },
                { name: "보석 최종 딜증", value: Number((extractValue.etcObj.gemCheckFnc.gemValue - 1) * 100).toFixed(2) + "%" + compareValue(cachedDetailInfo.extractValue.etcObj.gemCheckFnc.gemValue, extractValue.etcObj.gemCheckFnc.gemValue), icon: "gem-solid", question: "보석 순수 딜증 x 보정치로 인한 최종 딜증값으로, 스펙포인트에 적용되는 값" },
                { name: "보석 쿨감", value: Number(extractValue.etcObj.gemCheckFnc.gemAvg).toFixed(2) + "%" + compareValue(cachedDetailInfo.extractValue.etcObj.gemsCoolAvg, extractValue.etcObj.gemsCoolAvg), icon: "gem-solid", question: "보석 평균 쿨감 수치" },
                { name: "보석 보정치", value: Number(extractValue.etcObj.gemCheckFnc.specialSkill).toFixed(2) + compareValue(cachedDetailInfo.extractValue.etcObj.gemCheckFnc.specialSkill, extractValue.etcObj.gemCheckFnc.specialSkill), icon: "gem-solid", question: "보석에 포함되지 않는 스킬 및 효과를 보정하기 위한 계수. 직각 별로 고정값이며, 소수점 두 번째 자리까지만 표시" },
            ]
        }
        let supportCombatInfo = [
            { name: "예상 전투력 - Beta", value: Number(officialCombatCalcValue.support) + compareValue(cachedDetailInfo.extractValue.defaultObj.combatPower, officialCombatCalcValue.support), icon: "bolt-lightning-solid" },
        ]
        let supportImportantBuffInfo = [
            //{ name: "공격력 증가", value: Number(originSpecPoint.supportFinalAtkBuff).toFixed(0) + compareValue(cachedDetailInfo.specPoint.supportFinalAtkBuff, originSpecPoint.supportFinalAtkBuff), icon: "bolt-solid" },
            { name: "종합 버프력", value: Number(originSpecPoint.supportAvgBuffPower).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportAvgBuffPower, originSpecPoint.supportAvgBuffPower), icon: "bolt-solid" },
            { name: "케어력", value: Number(originSpecPoint.supportCarePowerResult).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportCarePowerResult, originSpecPoint.supportCarePowerResult), icon: "shield-halved-solid" },
            { name: "유틸력", value: Number(originSpecPoint.supportUtilityPower).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportUtilityPower, originSpecPoint.supportUtilityPower), icon: "book-solid" },
        ]
        let supportBuffInfo = [
            { name: "낙인력", value: Number(originSpecPoint.supportStigmaResult).toFixed(1) + "%" + compareValue(cachedDetailInfo.specPoint.supportStigmaResult, originSpecPoint.supportStigmaResult), icon: "bullseye-solid" },
            { name: "상시버프", value: Number(originSpecPoint.supportAllTimeBuff).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportAllTimeBuff, originSpecPoint.supportAllTimeBuff), icon: "wand-magic-solid" },
            { name: "풀버프", value: Number(originSpecPoint.supportFullBuff).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportFullBuff, originSpecPoint.supportFullBuff), icon: "wand-magic-sparkles-solid" },
            //{ name: "종합버프", value: Number(originSpecPoint.supportTotalAvgBuff).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportTotalAvgBuff, originSpecPoint.supportTotalAvgBuff), icon: "wand-magic-sparkles-solid" },
            { name: "팔찌", value: Number(originSpecPoint.supportBangleResult).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportBangleResult, originSpecPoint.supportBangleResult), icon: "ring-solid" },
        ]
        let supportUtilizationRate = [
            //{ name: "쿨타임 감소", value: Number(originSpecPoint.supportgemsCoolAvg).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportgemsCoolAvg, originSpecPoint.supportgemsCoolAvg), icon: "gem-solid" },
            { name: "아덴 가동률", value: Number(originSpecPoint.supportIdentityUptime).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportIdentityUptime, originSpecPoint.supportIdentityUptime), icon: "hourglass-half-solid" },
            { name: "초각 가동률", value: Number(originSpecPoint.supportHyperUptime).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportHyperUptime, originSpecPoint.supportHyperUptime), icon: "hourglass-half-solid" },
            { name: "풀버프 가동률", value: Number(originSpecPoint.supportFullBuffUptime).toFixed(2) + "%" + compareValue(cachedDetailInfo.specPoint.supportFullBuffUptime, originSpecPoint.supportFullBuffUptime), icon: "hourglass-half-solid" },
        ]
        //let supportEffectInfo = [
        //    { name: "특성", value: originSpecPoint.supportTotalStatus + compareValue(cachedDetailInfo.specPoint.supportTotalStatus, originSpecPoint.supportTotalStatus), icon: "person-solid" },
        //]

        let result = "";
        if (mobileCheck) {
            result = `
                    <div class="title-box">
                        <span class="title">상세정보</span>
                    </div>
                    <span class="button" onclick="document.querySelector('.sc-info .detail-area').classList.toggle('on');"></span>`;
        }
        // extractValue.etcObj.supportCheck !== "서폿"
        if (!/서폿|회귀|심판자|진실된 용맹/.test(extractValue.etcObj.supportCheck) || (extractValue.engObj.dealpport === "true")) {
            result += infoWrap("전투력", combatInfo);
            result += infoWrap("장비 효과", armorInfo);
            result += infoWrap("아크패시브", arkPassiveInfo);
            result += infoWrap("보석 효과", gemInfo);
        } else {
            result += infoWrap("전투력", supportCombatInfo);
            result += infoWrap("주요 버프", supportImportantBuffInfo);
            result += infoWrap("버프 정보", supportBuffInfo);
            result += infoWrap("가동률", supportUtilizationRate);
            //result += infoWrap("추가 효과", supportEffectInfo);
        }
        element.innerHTML = result;
    }
    detailAreaCreate()


}
await simulatorInputCalc()
document.body.addEventListener('change', () => {
    simulatorInputCalc();
})




/* **********************************************************************************************************************
* function name		:	selectCreate(data)
* data              :   유저 JSON데이터
* description		: 	시뮬레이터 정보를 이용해 html을 생성
*********************************************************************************************************************** */
async function selectCreate(data, Modules) {

    /* **********************************************************************************************************************
    * function name		:	Modules
    * description		: 	모든 외부모듈 정의
    *********************************************************************************************************************** */
    // let Modules = await importModuleManager()


    /* **********************************************************************************************************************
    * variable name		:	supportCheck
    * description	    : 	2차 직업명 출력 변수
    *********************************************************************************************************************** */

    let supportCheck = await secondClassCheck(data)




    /* **********************************************************************************************************************
    * function name		:	engFilterToOptions()
    * description	    : 	각인 옵션을 생성하고 사용자의 직업에 따라 무효각인의 경우 무효를 표시해줌
    *********************************************************************************************************************** */

    function engFilterToOptions() {
        let engNameObj
        if (supportCheck !== "서폿") {
            engNameObj = Modules.simulatorFilter.engFilter.dealer.filter((obj, index, self) =>
                index === self.findIndex((o) => (
                    o.name === obj.name
                ))
            );
        } else {
            engNameObj = Modules.simulatorFilter.engFilter.support.filter((obj, index, self) =>
                index === self.findIndex((o) => (
                    o.name === obj.name
                ))
            );
        }


        // calcModule.supportCheck(data) 값과 일치하는 job의 block 값 제거
        Modules.originFilter.engravingCalFilter.forEach(filter => {
            if (filter.job === supportCheck) {
                filter.block = [...new Set(filter.block)]; // 중복 제거
                engNameObj = engNameObj.map(engName => {
                    if (filter.block.includes(engName.name)) {
                        return { name: `${engName.name} - 무효` };
                    }
                    return engName;
                });
            }
        });

        // .engraving-box .engraving-name 요소에 option 추가
        document.querySelectorAll(".engraving-box .engraving-name").forEach(el => {
            engNameObj.forEach(engNameObj => {
                el.innerHTML += `<option value="${engNameObj.name}">${engNameObj.name}</option>`;
            });
        });

    }
    engFilterToOptions()

    /* **********************************************************************************************************************
    * function name		:	engravingGradeToLimit()
    * description	    : 	각인 전설,영웅 등급의 4레벨 선택을 비활성화 함
    *********************************************************************************************************************** */
    function engravingGradeToLimit() {
        let elements = document.querySelectorAll(".sc-info .engraving-area select.relic-ico");
        elements.forEach(element => {
            element.addEventListener("change", () => { disable() });
            function disable() {
                let gradeElement = element.closest(".engraving-box").querySelector('select.grade');
                if (element.value !== "유물") {
                    gradeElement.options[gradeElement.length - 1].disabled = true;
                    if (gradeElement.options[gradeElement.length - 1].selected) {
                        gradeElement.options[gradeElement.length - 2].selected = true;
                    }
                } else if (gradeElement.options[gradeElement.length - 1]) {
                    gradeElement.options[gradeElement.length - 1].disabled = false;
                }
            }
            disable()
        })
    }
    engravingGradeToLimit()



    /* **********************************************************************************************************************
    * function name		:	armoryEnforceLimite()
    * description	    : 	.armor-item .armor-name와 .armor-item .tier 의 값에 따라 상급재련 선택요소 생성
    *********************************************************************************************************************** */
    function armoryEnforceLimite() {
        let armorElements = document.querySelectorAll(".armor-item .armor-name");
        const armorCounts = {}; // 각 armorElement에 대한 count 값을 저장할 객체

        armorElements.forEach((armorElement, idx) => {
            armorCounts[idx] = 0; // 각 요소에 대한 count 값을 0으로 초기화
            applyUpgradeOptions(armorElement, idx);

            armorElement.addEventListener("change", () => {
                applyUpgradeOptions(armorElement, idx);
            });

            // armorElement.parentElement.parentElement.parentElement.querySelector(".plus").addEventListener("change", () => {
            armorElement.closest(".armor-item").querySelector(".plus").addEventListener("change", () => {
                applyUpgradeOptions(armorElement, idx);
            });
        });

        function applyUpgradeOptions(armorElement, idx) {
            const upgradeElement = armorElement.closest(".name-wrap").querySelector(".armor-upgrade");
            const normalUpgradeValue = Number(armorElement.value);
            const tierValue = Number(armorElement.closest(".name-wrap").querySelector(".plus").value);
            // console.log(upgradeElement)
            // console.log(normalUpgradeValue)
            // console.log(tierValue)
            if (tierValue === 1 && armorCounts[idx] !== 1) {
                createOptions(upgradeElement, 0, 20);
                // selectLastOption(upgradeElement);
                armorCounts[idx] = 1;
            } else if (tierValue === 2 && armorCounts[idx] !== 2) {
                createOptions(upgradeElement, 0, 40);
                // selectLastOption(upgradeElement);
                armorCounts[idx] = 2;
            } else if (tierValue + normalUpgradeValue * 5 < 1620 && armorCounts[idx] !== 3 && !(/1|2/.test(tierValue))) {
                createOptions(upgradeElement, -1);
                // selectLastOption(upgradeElement);
                armorCounts[idx] = 3;
            } else if (1620 <= tierValue + normalUpgradeValue * 5 && tierValue + normalUpgradeValue * 5 < 1660 && armorCounts[idx] !== 4) {
                createOptions(upgradeElement, 0, 20);
                // selectLastOption(upgradeElement);
                armorCounts[idx] = 4;
            } else if (tierValue + normalUpgradeValue * 5 >= 1660 && armorCounts[idx] !== 5) {
                createOptions(upgradeElement, 0, 40);
                // selectLastOption(upgradeElement);
                armorCounts[idx] = 5;
            }
            applyDataStringToOptions();
        }
        function selectLastOption(selectElement) {
            if (!(selectElement instanceof HTMLSelectElement)) {
                return;
            }
            if (selectElement.options.length > 0) {
                selectElement.selectedIndex = selectElement.options.length - 1;
            }
        }

        function createOptions(selectElement, start, end) {
            if (!selectElement) {
                return;
            }

            // 기존 옵션 제거
            selectElement.innerHTML = '';

            if (start === -1) {
                const option = document.createElement('option');
                option.value = 0;
                option.textContent = '불가';
                selectElement.setAttribute('data-string', "")
                selectElement.appendChild(option);
            } else {
                // 옵션 생성 및 추가
                for (let i = start; i <= end; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    selectElement.setAttribute('data-string', "X ")
                    selectElement.appendChild(option);
                }
            }
        }
    }
    armoryEnforceLimite()

    /* **********************************************************************************************************************
    * function name		:	ellaOptionSetting
    * description		: 	에스더무기 엘라 옵션에 대한 처리
    *********************************************************************************************************************** */

    function ellaOptionSetting() {
        let armorItem = document.querySelectorAll(".armor-area .armor-item")[5];
        let ellaOptions = armorItem.querySelectorAll(".ella");
        let tierElement = armorItem.querySelector(".plus");
        let normalUpgradeElement = armorItem.querySelector(".armor-name");

        tierElement.addEventListener("change", () => { ellaCheck() })
        ellaCheck()
        function ellaCheck() {

            if (getSelectedOptionText(tierElement) === "에스더-엘라1") {
                normalUpgradeElement.options[7].selected = true;
                for (let i = 0; i < normalUpgradeElement.options.length; i++) {
                    if (i <= 4) {
                        normalUpgradeElement.options[i].disabled = true;
                    } else if (i >= 8) {
                        normalUpgradeElement.options[i].disabled = true;
                    } else {
                        normalUpgradeElement.options[i].disabled = false;
                    }
                }
            } else if (getSelectedOptionText(tierElement) === "에스더-엘라2") {
                normalUpgradeElement.options[8].selected = true;
                for (let i = 0; i < normalUpgradeElement.options.length; i++) {
                    if (i <= 4) {
                        normalUpgradeElement.options[i].disabled = true;
                    } else if (i >= 9) {
                        normalUpgradeElement.options[i].disabled = true;
                    } else {
                        normalUpgradeElement.options[i].disabled = false;
                    }
                }
            } else if (getSelectedOptionText(tierElement) === "에스더-엘라0") {
                normalUpgradeElement.options[0].selected = true;
                for (let i = 0; i < normalUpgradeElement.options.length; i++) {
                    normalUpgradeElement.options[i].disabled = true;
                }
            } else {
                for (let i = 0; i < normalUpgradeElement.options.length; i++) {
                    normalUpgradeElement.options[i].disabled = false;
                }

            }
        }
        function getSelectedOptionText(selectElement) {
            if (!selectElement || selectElement.tagName !== 'SELECT') {
                console.error("Error: Input is not a valid select element.");
                return null;
            }

            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.textContent : null;
        }

    }
    // ellaOptionSetting()

    /* **********************************************************************************************************************
    * function name		:	hyperStageToStarCreate
    * description		: 	초월 N단계를 바탕으로 3N성을 생성
    *********************************************************************************************************************** */

    function hyperStageToStarCreate() {
        let elements = document.querySelectorAll(".hyper-wrap select.level");

        elements.forEach(element => {
            let hyper = element.closest(".hyper-wrap").querySelector("select.hyper");
            function applyDataStringToOptions() {
                let stage = Number(element.value);
                hyper.innerHTML = "";
                if (stage === 0) {
                    let option = document.createElement('option');
                    option.value = 0;
                    option.textContent = 0;
                    hyper.appendChild(option);
                } else {
                    for (let i = 0; i <= stage * 3; i++) {
                        let option = document.createElement('option');
                        option.value = i;
                        option.textContent = i;
                        hyper.appendChild(option);
                    }
                }
            }
            applyDataStringToOptions()
            function lastOptionSelect() {
                hyper.options[hyper.options.length - 1].selected = true;
            }
            element.addEventListener("change", () => { applyDataStringToOptions(); lastOptionSelect(); })
        })
    }
    hyperStageToStarCreate()

    /* **********************************************************************************************************************
    * function name		:	accessoryTierToOptions()
    * description	    : 	악세서리 티어 등급 에 따라 옵션명을 생성
    *********************************************************************************************************************** */

    // simulatorFilter
    function accessoryTierToOptions() {
        let elements = document.querySelectorAll(".accessory-item .tier.accessory");
        elements.forEach(element => {
            element.addEventListener("change", createOption);

            function createOption() {
                let siblingElements = element.parentElement.parentElement.querySelectorAll(".option-box .option");
                siblingElements.forEach(siblingElement => {
                    siblingElement.innerHTML = "";
                    let tier = element.value.split(":")[0];
                    let tag = element.value.split(":")[1];
                    if (tier === "T3유물") {
                        if (tag === "목걸이") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3RelicData.necklace, "특옵");
                        } else if (tag === "귀걸이") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3RelicData.earing, "특옵");
                        } else if (tag === "반지") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3RelicData.ring, "특옵");
                        }
                        optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3RelicData.common, "공용");
                    } else if (tier === "T3고대") {
                        if (tag === "목걸이") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3MythicData.necklace, "특옵");
                        } else if (tag === "귀걸이") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3MythicData.earing, "특옵");
                        } else if (tag === "반지") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3MythicData.ring, "특옵");
                        }
                        optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t3MythicData.common, "공용");
                    } else if (tier === "T4유물" || tier === "T4고대") {
                        if (tag === "목걸이") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t4Data.necklace, "특옵");
                        } else if (tag === "귀걸이") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t4Data.earing, "특옵");
                        } else if (tag === "반지") {
                            optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t4Data.ring, "특옵");
                        }
                        optionCreate(siblingElement, Modules.simulatorFilter.accessoryOptionData.t4Data.common, "공용");
                    }
                });
            }
            createOption();
        });
        function optionCreate(element, data, tag) {
            if (tag === "공용") {
                let option = document.createElement("option");
                option.value = "";
                option.disabled = true;
                option.textContent = "--------공용--------";
                element.appendChild(option);
            } else if (tag === "특옵") {
                let option = document.createElement("option");
                option.value = "";
                option.disabled = true;
                option.textContent = "--------특옵--------";
                element.appendChild(option);
            }
            data.forEach((item, idx) => {
                let option = document.createElement("option");
                option.textContent = item.name;
                let valueParts = [];
                valueParts.push(`${item.grade}`);

                for (const key in item) {
                    if (key !== 'name' && key !== 'grade' && key !== 'optionValue') {
                        valueParts.push(`${key}:${item[key]}`);
                    }
                }

                option.value = valueParts.join(":");
                element.appendChild(option);
            });
            // element.dispatchEvent(new Event('change', { bubbles: true }));
        }

    }
    accessoryTierToOptions()

    /* **********************************************************************************************************************
    * function name		:	bangleTierToOption()
    * description	    : 	팔찌의 티어 등급에 따라 옵션, value를 동적으로 생성
    *********************************************************************************************************************** */

    function bangleTierToOption() {
        // simulatorFilter.bangleOptionData
        let elements = document.querySelectorAll(".accessory-item.bangle select.option");
        let tier = document.querySelector(".accessory-item.bangle .tier");
        tier.addEventListener("change", () => { changeTierToOption() });

        // console.log(simulatorFilter.bangleOptionData.t3RelicData)
        function changeTierToOption() {
            elements.forEach(element => {
                if (tier.value === "T3고대") {
                    createOption(element, Modules.simulatorFilter.bangleOptionData.t3MythicData)
                } else if (tier.value === "T3유물") {
                    createOption(element, Modules.simulatorFilter.bangleOptionData.t3RelicData)
                } else if (tier.value === "T4유물") {
                    createOption(element, Modules.simulatorFilter.bangleOptionData.t4RelicData)
                } else if (tier.value === "T4고대") {
                    createOption(element, Modules.simulatorFilter.bangleOptionData.t4MythicData)
                }
                // element.dispatchEvent(new Event('change', { bubbles: true }));
            })
            function createOption(element, filterArr) {
                filterArr.forEach((filter, idx) => {
                    if (idx === 0) {
                        element.innerHTML = "";
                    }
                    let option = document.createElement("option");
                    option.textContent = filter.name;
                    option.setAttribute("data-grade", filter.grade);
                    let valueParts = []; // key:value 쌍을 저장할 배열
                    for (const key in filter) {
                        if (key !== 'name' && key !== 'grade') {
                            valueParts.push(`${key}:${filter[key]}`); // key:value 형태로 배열에 추가
                        }
                    }

                    option.value = valueParts.join("|"); // 배열의 요소들을 |로 연결하여 value 설정
                    element.appendChild(option);
                })
            }
        }
        changeTierToOption()

    }
    bangleTierToOption()

    /* **********************************************************************************************************************
    * function name		:	userEngToStoneOption()
    * description	    : 	사용자가 장착중인 각인명을 가져와 어빌리티스톤의 옵션을 생성함
    *********************************************************************************************************************** */

    function userEngToStoneOption() {
        let stoneElements = document.querySelectorAll(".buff-wrap .buff");
        let engElements = document.querySelectorAll(".engraving-box .engraving-name");

        // engElements의 change 이벤트 리스너 설정 (각인 -> 어빌리티 스톤)
        engElements.forEach((engElement, idx) => {
            engElementChange(engElement, idx);
        });

        function engElementChange(element, idx) {
            const value = element.value; // 현재 변경된 값

            // idx가 0일 때만 engArry를 초기화하고 모든 stoneElement의 옵션을 초기화
            if (idx === 0) {
                stoneElements.forEach(stoneElement => {
                    stoneElement.innerHTML = "";
                });
            }
            // 모든 stoneElement에 현재 선택된 각인을 option으로 추가
            stoneElements.forEach(stoneElement => {
                if (value === "없음") {
                    return
                } else if (value.includes("- 무효")) {
                    let valueText = value.split("- 무효")[0];
                    for (let i = 0; i <= 4; i++) {
                        let option = document.createElement("option");
                        option.textContent = `${valueText} Lv${i} - 무효`;
                        option.value = `${valueText}- 무효:${i}`;
                        stoneElement.appendChild(option);
                    }
                } else {
                    for (let i = 0; i <= 4; i++) {
                        let option = document.createElement("option");
                        option.textContent = `${value} Lv${i}`;
                        option.value = `${value}:${i}`;
                        stoneElement.appendChild(option);
                    }

                }
            });
        }
    }
    document.querySelectorAll(".engraving-area .engraving-name").forEach(element => {
        element.addEventListener("change", () => { userEngToStoneOption() })
    })

    /* **********************************************************************************************************************
    * function name		:	bangleStatsOptionLimit()
    * description	    : 	캐릭터의 1차 직업을 기준으로 힘민지의 무효 표시를 생성함
    *********************************************************************************************************************** */

    function bangleStatsOptionLimit() {
        let elements = document.querySelectorAll(".accessory-item.bangle .stats");
        let validStats = Modules.originFilter.bangleJobFilter.find(jobFilter => jobFilter.job === data.ArmoryProfile.CharacterClassName);
        elements.forEach(element => {
            const options = Array.from(element.options);
            const validStatsValues = validStats.stats || [];

            options.forEach(option => {
                const optionValue = option.value;
                const optionText = option.textContent;
                // option의 value가 "stats"이거나 validStats.stats에 포함되는 경우, 변경하지 않음
                if (/cri|special|haste/.test(optionValue) || validStatsValues.includes(optionValue)) {
                    return;
                }

                // 이미 "- 무효"가 포함되어 있으면 추가하지 않음
                if (!optionText.includes("- 무효")) {
                    // option.textContent = optionText + " - 무효";
                    option.style.color = "#f00";
                    option.value = "none";
                }
            });
        });

        // console.log((validStats.stats))
    }
    bangleStatsOptionLimit()


    /* **********************************************************************************************************************
    * function name		:	userLevelAccessoryToEnlight()
    * description	    : 	유저레벨정보와 악세서리를 기반으로 깨달음 수치 계산
    *********************************************************************************************************************** */

    function userLevelAccessoryToEnlight() {
        let levelEvolution = Math.max(data.ArmoryProfile.CharacterLevel - 50, 0);

        let elements = document.querySelectorAll(".accessory-item .accessory");
        elements.forEach(element => {
            let value = Number(element.dataset.enlight ? element.dataset.enlight : 0);
            levelEvolution += value;
        })
        // console.log("깨포", levelEvolution)
        return levelEvolution;
    }
    // userLevelAccessoryToEnlight()

    /* **********************************************************************************************************************
    * function name		:	userRealEnlightArray()
    * description	    : 	유저의 악세서리에서 깨달음 수치와 해당 부위를 객체배열형태로 저장하여 반환함
    *********************************************************************************************************************** */
    function userRealEnlightArray() {
        let result = [];
        data.ArmoryEquipment.forEach(accessory => {
            if (/목걸이|귀걸이|반지/.test(accessory.Type)) {
                let enlightValue = Number(accessory.Tooltip.match(/깨달음 \+(\d+)/)[1]);
                let obj = {}
                obj.type = accessory.Type;
                obj.value = enlightValue;
                result.push(obj);
            }
        })
        return result;
    }
    /* **********************************************************************************************************************
    * function name		:	enlightValueAttributeSet()
    * description	    : 	유저의 깨달음 수치를 data-enlight에 설정하고 유저가 악세서리의 등급을 수정할 시 올바른 깨포값으로 수정함
    *********************************************************************************************************************** */
    function enlightValueAttributeSet() {
        let elements = document.querySelectorAll(".accessory-item .accessory");
        elements.forEach(element => {
            element.addEventListener("change", () => {
                let tier = element.value.split(":")[0];
                let parts = element.value.split(":")[1];
                let enlightValue = 0;
                if (/T3고대|T3유물|T4유물/.test(tier)) {
                    if (parts === "목걸이") {
                        enlightValue = 10;
                    } else if (parts === "귀걸이") {
                        enlightValue = 9;
                    } else if (parts === "반지") {
                        enlightValue = 9;
                    }
                } else if (/T4고대/.test(tier)) {
                    if (parts === "목걸이") {
                        enlightValue = 13;
                    } else if (parts === "귀걸이") {
                        enlightValue = 12;
                    } else if (parts === "반지") {
                        enlightValue = 12;
                    }
                }
                element.dataset.enlight = enlightValue;
            });
        })
    }

    /* **********************************************************************************************************************
    * function name		:	enlightValueAttributeSet()
    * description	    : 	유저의 깨달음 수치를 data-enlight에 설정하고 유저가 악세서리의 등급을 수정할 시 올바른 깨포값으로 수정함
    *********************************************************************************************************************** */
    function userEnlightValueSetData() {
        let enlightArray = userRealEnlightArray();
        let elements = document.querySelectorAll(".accessory-item .accessory");
        let necklaceElement = elements[0];
        let earRingElement1 = elements[1];
        let earRingElement2 = elements[2];
        let ringElement1 = elements[3];
        let ringElement2 = elements[4];

        let earRingCount = 0;
        let ringCount = 0;
        enlightArray.forEach(item => {
            if (item.type === "목걸이") {
                necklaceElement.dataset.enlight = item.value;
            } else if (item.type === "귀걸이") {
                if (earRingCount === 0) {
                    earRingElement1.dataset.enlight = item.value;
                    earRingCount++;
                } else if (earRingCount === 1) {
                    earRingElement2.dataset.enlight = item.value;
                }
            } else if (item.type === "반지") {
                if (ringCount === 0) {
                    ringElement1.dataset.enlight = item.value;
                    ringCount++;
                } else if (ringCount === 1) {
                    ringElement2.dataset.enlight = item.value;
                }
            }
        })
    }
    userEnlightValueSetData();

    /* **********************************************************************************************************************
    * function name		:	collectToKarma()
    * description	    : 	내실 및 카르마 수치 계산
    *********************************************************************************************************************** */
    function collectToKarma() {
        let collectElements = document.querySelectorAll(".ark-list.enlightenment .ark-item input[type=checkbox]");
        let level = stringToNumber(data.ArmoryProfile.ItemAvgLevel);
        function stringToNumber(str) {
            const commaRemoved = str.replace(/,/g, '');
            const number = parseFloat(commaRemoved);
            return number;
        }

        // let sumLevel = 0;
        // weaponLevelObj.forEach(weapon => {
        //     sumLevel += weapon.level;
        // });
        // let avgLevel = sumLevel / weaponLevelObj.length;
        // console.log(avgLevel)
        if (level < 1670) {
            collectElements.forEach((element, idx) => {
                let collectValue = data.ArkPassive.Points[1].Value - userLevelAccessoryToEnlight();
                if (collectValue === 14) {
                    element.checked = true;
                } else if (collectValue === 11) {
                    element.checked = true;
                    collectElements[2].checked = false;
                } else if (collectValue === 9) {
                    element.checked = true;
                    collectElements[3].checked = false;
                } else if (collectValue === 8) {
                    collectElements[0].checked = true;
                    collectElements[3].checked = true;
                } else if (collectValue === 6) {
                    collectElements[0].checked = true;
                    collectElements[1].checked = true;
                } else if (collectValue === 5) {
                    collectElements[3].checked = true;
                } else if (collectValue === 3) {
                    collectElements[0].checked = true;
                }
                // console.log(collectValue)
            })
        } else {
            collectElements.forEach(element => {
                element.checked = true;
            })
            // let karma = Math.max(1, Math.min(7, data.ArkPassive.Points[1].Value - userLevelAccessoryToEnlight() - 14 + 1)); <== 삭제예정
            document.querySelector(".ark-list.enlightenment .ark-item.karma-radio").querySelectorAll("input[type=radio]")[cachedDetailInfo.extractValue.karmaObj.enlightKarmaRank].checked = true;
        }
    }
    collectToKarma()
    /* **********************************************************************************************************************
    * function name		:	evloutionKarmaRankSelected()
    * description	    : 	진화 카르마 랭크와 레벨을 유저에게 표시해줌
    *********************************************************************************************************************** */
    function evloutionKarmaRankSelected() {
        let evolutionKarmaRankElements = document.querySelector(".ark-list.evolution .ark-item.karma-radio").querySelectorAll("input[type=radio]");
        let evolutionKarmaRankValue = cachedDetailInfo.extractValue.karmaObj.evolutionKarmaRank
        let evolutionKarmaLevelElement = document.querySelector(".ark-list.evolution .ark-item .input-number")
        evolutionKarmaRankElements[evolutionKarmaRankValue].checked = true;
        evolutionKarmaLevelElement.value = cachedDetailInfo.extractValue.karmaObj.evolutionKarmaLevel;

        let enlightenmentKarmaRankElements = document.querySelector(".ark-list.enlightenment .ark-item.karma-radio").querySelectorAll("input[type=radio]");
        let enlightenmentKarmaRankValue = cachedDetailInfo.extractValue.karmaObj.enlightKarmaRank
        let enlightenmentKarmaLevelElement = document.querySelector(".ark-list.enlightenment .ark-item .input-number")
        enlightenmentKarmaRankElements[enlightenmentKarmaRankValue].checked = true;
        enlightenmentKarmaLevelElement.value = cachedDetailInfo.extractValue.karmaObj.enlightKarmaLevel;

        let leapKarmaRankElements = document.querySelector(".ark-list.leap .ark-item.karma-radio").querySelectorAll("input[type=radio]");
        let leapKarmaRankValue = cachedDetailInfo.extractValue.karmaObj.leapKarmaRank;
        let leapKarmaLevelElement = document.querySelector(".ark-list.leap .ark-item .input-number")
        leapKarmaRankElements[leapKarmaRankValue].checked = true;
        leapKarmaLevelElement.value = cachedDetailInfo.extractValue.karmaObj.leapKarmaLevel;

    }
    evloutionKarmaRankSelected();


    /* **********************************************************************************************************************
    * function name     :	numberPlusMinusBtn
    * description       : 	카르마 진화레벨을 +-할 수 있는 함수
    *********************************************************************************************************************** */
    function numberPlusMinusBtn() {
        const decrementButtons = document.querySelectorAll('.group-equip .input-number-decrement');
        const incrementButtons = document.querySelectorAll('.group-equip .input-number-increment');
        const inputNumbers = document.querySelectorAll('.group-equip .input-number');

        // 감소 버튼
        decrementButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 인접 요소 input 검사
                const inputNumber = button.nextElementSibling;
                if (inputNumber && inputNumber.classList.contains('input-number')) {
                    let currentValue = parseInt(inputNumber.value, 10);
                    const min = parseInt(inputNumber.getAttribute('min'), 10);
                    if (currentValue > min) {
                        inputNumber.value = currentValue - 1;
                        // change 이벤트를 발생
                        inputNumber.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            });
        });

        // 증가 버튼
        incrementButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 인접 요소 input 검사
                const inputNumber = button.previousElementSibling;
                if (inputNumber && inputNumber.classList.contains('input-number')) {
                    let currentValue = parseInt(inputNumber.value, 10);
                    const max = parseInt(inputNumber.getAttribute('max'), 10);
                    if (currentValue < max) {
                        inputNumber.value = currentValue + 1;
                        // change 이벤트를 발생
                        inputNumber.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            });
        });

        // 각 숫자 입력 필드에 대한 유효성 검사 이벤트 리스너를 추가합니다.
        inputNumbers.forEach(inputNumber => {
            inputNumber.addEventListener('change', () => {
                let currentValue = parseInt(inputNumber.value, 10);
                const min = parseInt(inputNumber.getAttribute('min'), 10);
                const max = parseInt(inputNumber.getAttribute('max'), 10);

                // 입력값이 숫자가 아니거나 최소값보다 작으면 최소값으로 설정합니다.
                if (isNaN(currentValue) || currentValue < min) {
                    inputNumber.value = min;
                }
                // 입력값이 최대값보다 크면 최대값으로 설정합니다.
                else if (currentValue > max) {
                    inputNumber.value = max;
                }
            });
        });
    }

    // 함수를 호출하여 이벤트 리스너를 활성화합니다.
    numberPlusMinusBtn();
    /* **********************************************************************************************************************
    * function name		:	enlightValueChange()
    * description	    : 	깨달음 포인트를 유저에게 표시해줌
    *********************************************************************************************************************** */
    function enlightValueChange() {
        let karmaElements = document.querySelector(".ark-list.enlightenment .ark-item.karma-radio").querySelectorAll("input[type=radio]");
        let collectElements = document.querySelectorAll(".ark-list.enlightenment .ark-item input[type=checkbox]");
        let enlightValue = userLevelAccessoryToEnlight()

        karmaElements.forEach((karma, idx) => {
            if (karma.checked) {
                enlightValue += idx;
            }
        })
        collectElements.forEach(collect => {
            if (collect.checked) {
                enlightValue += Number(collect.value);
            }
        })

        document.querySelectorAll(".ark-list .title")[1].textContent = enlightValue;
    }
    enlightValueChange()

    /* **********************************************************************************************************************
    * function name		:	bangleToLeafPoint()
    * description	    : 	도약포인트 표시 및 카르마 수치 계산
    *********************************************************************************************************************** */

    function bangleToLeafPoint() {
        let leafPoint = (data.ArmoryProfile.CharacterLevel - 50) * 2;
        let element = document.querySelector(".accessory-item.bangle .tier");
        if (element.value === "T4유물") {
            leafPoint += 9;
        } else if (element.value === "T4고대") {
            leafPoint += 18;
        }
        // console.log(leafPoint)
        let leap = document.querySelector(".ark-list.leap .title");
        leap.textContent = leafPoint;
        return leafPoint;
    }

    /* **********************************************************************************************************************
    * function name		:	leafPointToKarmaSelect <== 삭제예정
    * description	    : 	유저의 도약 카르마랭크를 선택함
    *********************************************************************************************************************** */

    // function leafPointToKarmaSelect() {
    //     let karmaValue = Math.min((data.ArkPassive.Points[2].Value - bangleToLeafPoint()) / 2, 6);
    //     let radioElements = document.querySelectorAll('.ark-list.leap input[type=radio]');
    //     //console.log(karmaValue)
    //     radioElements[karmaValue].checked = true;
    // }
    // leafPointToKarmaSelect()

    //arkObj.weapenAtkPer = (깨달음카르마 레벨 * 0.001 + 1

    /* **********************************************************************************************************************
    * function name		:	showLeafInfo
    * description	    : 	선택옵션에 따라 도약포인트 표시를 변경해줌
    *********************************************************************************************************************** */

    function showLeafInfo() {
        let karmaElements = document.querySelectorAll(".ark-list.leap input[type=radio]");
        let leafPoint = bangleToLeafPoint();
        karmaElements.forEach((karma, idx) => {
            if (karma.checked) {
                leafPoint = bangleToLeafPoint() + (idx + 0) * 2
            }
        })
        let leaf = document.querySelector(".ark-list.leap .title");
        leaf.textContent = leafPoint;
    }
    /* **********************************************************************************************************************
    * function name     :	evolutionKarmaRangeLimited
    * description       : 	카르마 진화레벨을 조절하는 함수
    *********************************************************************************************************************** */
    // function evolutionKarmaRangeLimited() { <== 삭제예정
    //     let rankElements = document.querySelector(".ark-list.evolution .ark-item.karma-radio").querySelectorAll("input[type=radio]");
    //     let count = 0;
    //     rankElements.forEach(element => {
    //         element.addEventListener("change", () => {
    //             rangeChange();
    //         })
    //     })
    //     function rangeChange() {
    //         let rankValue = Array.from(rankElements).findIndex(element => element.checked === true);
    //         let levelElement = document.querySelector(".ark-list.evolution .ark-item .input-number");
    //         let levelValue = Number(levelElement.value);

    //         const rankRanges = [
    //             { rank: 0, min: 0, max: 0 },
    //             { rank: 1, min: 1, max: 4 },
    //             { rank: 2, min: 5, max: 8 },
    //             { rank: 3, min: 9, max: 12 },
    //             { rank: 4, min: 13, max: 16 },
    //             { rank: 5, min: 17, max: 20 },
    //             { rank: 6, min: 21, max: 30 }
    //         ];
    //         console.log(rankValue)
    //         let currentRange = rankRanges.find(range => range.rank === rankValue);
    //         if (currentRange) {
    //             levelElement.setAttribute('min', String(currentRange.min));
    //             levelElement.setAttribute('max', String(currentRange.max));
    //         } else {
    //             levelElement.setAttribute('min', '0');
    //             levelElement.setAttribute('max', '0');
    //         }
    //         if (count !== 0) {
    //             levelElement.value = currentRange.min;
    //         } else {
    //             count++;
    //         }
    //     }
    //     rangeChange();
    // }
    // evolutionKarmaRangeLimited();
    function everyKarmaLevelLimited() {
        let arkListElements = document.querySelectorAll(".group-equip .ark-list");
        arkListElements.forEach(arkListElement => {
            arkListElement.querySelector(".ark-item.karma-radio").addEventListener("change", () => { rangeChange() })

            let count = 0;
            function rangeChange() {
                let rankElement = arkListElement.querySelector(".ark-item.karma-radio").querySelectorAll("input[type=radio]");
                let rankValue = Array.from(rankElement).findIndex(radioElement => radioElement.checked);
                let levelElement = arkListElement.querySelector(".ark-item .input-number");
                let levelValue = Number(levelElement.value);
                const rankRanges = [
                    { rank: 0, min: 0, max: 0 },
                    { rank: 1, min: 1, max: 5 },
                    { rank: 2, min: 5, max: 9 },
                    { rank: 3, min: 9, max: 13 },
                    { rank: 4, min: 13, max: 17 },
                    { rank: 5, min: 17, max: 21 },
                    { rank: 6, min: 21, max: 30 }
                ];
                let currentRange = rankRanges.find(range => range.rank === rankValue);
                if (currentRange) {
                    levelElement.setAttribute('min', String(currentRange.min));
                    levelElement.setAttribute('max', String(currentRange.max));
                } else {
                    levelElement.setAttribute('min', '0');
                    levelElement.setAttribute('max', '0');
                }
                if (count !== 0) {
                    levelElement.value = currentRange.min;
                } else {
                    count++;
                }

            };
            rangeChange();
        })
    }
    everyKarmaLevelLimited();

    /* **********************************************************************************************************************
    * function name		:	userGemEquipmentToOption()
    * description	    : 	유저가 실제 착용중인 보석 정보를 이용해 html생성
    *********************************************************************************************************************** */

    let gemCalcResultAllInfo = await calculateGemData(data);
    function userGemEquipmentToOption() {
        let element = document.querySelector(".gem-area");
        if (gemCalcResultAllInfo && gemCalcResultAllInfo.gemSkillArry) {
            let customHtml = "";
            element.innerHTML = "";
            gemCalcResultAllInfo.gemSkillArry.forEach((gemElementObj, idx) => {
                let gemTag = ``;
                if (/멸화|겁화|딜광휘/.test(gemElementObj.name)) {
                    gemTag = `
                        <option value="멸화">멸화</option>
                        <option value="겁화">겁화</option>
                        <option value="딜광휘">광휘</option>
                        `;
                } else if (/홍염|작열|쿨광휘/.test(gemElementObj.name)) {
                    gemTag = `
                        <option value="홍염">홍염</option>
                        <option value="작열">작열</option>;
                        <option value="쿨광휘">광휘</option>`;
                }
                if (gemElementObj.skill.includes(":")) {
                    gemElementObj.skill = gemElementObj.skill.split(":")[1].trim()
                }
                customHtml += `
                    <div class="gem-box radius common-background" data-index="${idx}">
                        <select class="level" name="ArmoryGem Gems Level" data-max="10" data-select="${gemElementObj.level}">
                        </select>
                        <select class="gems" data-select="${gemElementObj.name}">
                            ${gemTag}
                        </select>
                        <span class="skill tooltip-text">${gemElementObj.skill}</span>
                    </div>`;
            })
            customHtml += `
                <div class="gem-box radius free-set">
                    <span class="save">저 장</span>
                    <span class="load">로 드</span>
                    <span class="reset">리 셋</span>
                    <span class="blind level">9</span>
                    <i style="display:none;">3</i>
                </div>`
            element.innerHTML = customHtml;
            sortGemInfo(".gem-area")
        } else {
            // element.innerHTML = `<span style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center;font-size:18px;">보석없음</span>`;
            element.innerHTML = `
                <div  class="gem-box radius free-set" style="margin-left:auto;">
                    <span class="save">저 장</span>
                    <span class="load">로 드</span>
                    <span class="reset">리 셋</span>
                    <span class="blind level">9</span>
                    <i style="display:none;">3</i>
                </div>`;
        }
        Modules.component.gemFreeSetSave(data)
    }
    userGemEquipmentToOption()

    /* **********************************************************************************************************************
    * function name		:	gemSimpleChangeButtonExtend()
    * description	    :   보석 선택 일괄변경
    *********************************************************************************************************************** */
    function gemSimpleChangeButtonExtend() {
        let element = document.querySelector(".simple-option-area .extend-button");
        let optionList = element.parentElement.querySelector(".extend-list");
        element.addEventListener("click", () => {
            element.classList.toggle("on");
            optionList.classList.toggle("on");
        })
        optionList.querySelectorAll(".extend-item").forEach(element => {
            element.addEventListener("click", () => {
                document.querySelectorAll(".gem-area .gem-box").forEach((gem) => {
                    const levelInput = gem.querySelector(".level");
                    // const gemsSelect = gem.querySelector(".gems");

                    levelInput.dispatchEvent(new Event('change', { bubbles: true }));
                    // gemsSelect.dispatchEvent(new Event('change', { bubbles: true }));  
                    gem.querySelector(".level").value = element.getAttribute("data-once");
                    if (/겁화|멸화/.test(gem.querySelector(".gems").value)) {
                        gem.querySelector(".gems").value = "겁화"
                    }
                    if (/홍염|작열/.test(gem.querySelector(".gems").value)) {
                        gem.querySelector(".gems").value = "작열"
                    }
                })
            })
        })

    }
    gemSimpleChangeButtonExtend();

    /* **********************************************************************************************************************
    * function name		:	userLevelAndArmorToEvolution()
    * description	    : 	진화포인트 계산
    *********************************************************************************************************************** */

    function userLevelAndArmorToEvolution() {
        let levelEvolution = Math.max(data.ArmoryProfile.CharacterLevel - 50, 0);
        let elements = document.querySelectorAll(".armor-item .plus");
        elements.forEach((element, idx) => {
            if (idx !== 5) {
                if (/T3 고대|T4 유물/.test(element.options[element.selectedIndex].text)) {
                    levelEvolution += 20;
                } else if (/T4 고대/.test(element.options[element.selectedIndex].text)) {
                    levelEvolution += 24;
                } else if (/세르카/.test(element.options[element.selectedIndex].text)) {
                    // ToDo 세르카 진화포인트 값
                    levelEvolution += 24;
                }
            }
        })

        let evolutionElement = document.querySelectorAll(".ark-list .title")[0];
        evolutionElement.textContent = levelEvolution;
    }
    /* **********************************************************************************************************************
    * function name		:	applyDataMinMaxToOptions()
    * description	    : 	data-min data-max값을 이용하여 select 드롭박스 숫자값 자동생성
    *********************************************************************************************************************** */
    function sortGemInfo(parentSelector) {
        const parentElement = document.querySelector(parentSelector);
        if (!parentElement) {
            console.error(`Parent element not found with selector: ${parentSelector}`);
            return;
        }

        const gemElements = Array.from(parentElement.children); //자식요소만 가져오도록 수정.
        if (gemElements.length === 0) {
            console.warn(`No child elements found within: ${parentSelector}`);
            return;
        }

        // 정렬 로직
        gemElements.sort((a, b) => {
            const aText = a.textContent;
            const bText = b.textContent;

            // 멸화, 겁화가 우선순위
            const aIsDamage = /멸화|겁화/.test(aText);
            const bIsDamage = /멸화|겁화/.test(bText);

            if (aIsDamage && !bIsDamage) {
                return -1; // a가 멸화 또는 겁화이고 b가 아니면 a가 먼저
            }
            if (!aIsDamage && bIsDamage) {
                return 1; // b가 멸화 또는 겁화이고 a가 아니면 b가 먼저
            }

            // a와 b가 모두 멸화 또는 겁화이거나 모두 아니면 순서 변경 없음 (원래 순서 유지)
            return 0;
        });

        // 정렬된 순서대로 다시 추가
        parentElement.innerHTML = ''; // 기존의 하위 요소 모두 제거
        gemElements.forEach(gemElement => {
            parentElement.appendChild(gemElement);
        });
    }

    /* **********************************************************************************************************************
    * function name		:	applyDataMinMaxToOptions()
    * description	    : 	data-min data-max값을 이용하여 select 드롭박스 숫자값 자동생성
    *********************************************************************************************************************** */

    function applyDataMinMaxToOptions() {
        const selectElements = document.querySelectorAll('select[data-max]');
        selectElements.forEach(selectElement => {
            const max = parseInt(selectElement.getAttribute('data-max'), 10);
            const min = selectElement.hasAttribute('data-min') ? parseInt(selectElement.getAttribute('data-min'), 10) : 1;

            for (let i = min; i <= max; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                selectElement.appendChild(option);
            }
        });
    }
    applyDataMinMaxToOptions()

    /* **********************************************************************************************************************
    * function name		:	applyDataSelectToOptions()
    * description	    : 	data-select을 이용하여 사용자의 기본값에 해당하는 option을 선택함
    *********************************************************************************************************************** */

    function applyDataSelectToOptions() {
        const selectElements = document.querySelectorAll("select[data-select]");
        selectElements.forEach(selectElement => {
            const name = selectElement.getAttribute("data-select");
            // const option = document.createElement('option');
            // option.value = name;
            // option.textContent = name;
            // option.selected = true;
            // selectElement.appendChild(option);
            let optionElements = Array.from(selectElement.querySelectorAll("option"))
            let selectOption = optionElements.find(optionElement => optionElement.value == name || optionElement.value == name + " - 무효");
            if (selectOption) {
                selectOption.selected = true;
            }
        })
    }
    applyDataSelectToOptions()

    /* **********************************************************************************************************************
    * function name		:	engravingAutoSelect()
    * description	    : 	유저 각인 정보를 바탕으로 각인 자동선택
    *********************************************************************************************************************** */
    function engravingAutoSelect() {
        let elements = document.querySelectorAll(".engraving-area .engraving-box");
        elements.forEach((element, index) => {
            let nameSelect = element.querySelector(".engraving-name");
            let gradeSelect = element.querySelector(".grade");
            let icoSelect = element.querySelector(".engraving-ico");
            let relicIcoSelect = element.querySelector(".relic-ico");

            // data.ArmoryEngraving.ArkPassiveEffects 배열 순회
            if (data.ArmoryEngraving) {
                if (data.ArmoryEngraving.ArkPassiveEffects && index < data.ArmoryEngraving.ArkPassiveEffects.length) {
                    let arkEffect = data.ArmoryEngraving.ArkPassiveEffects[index];
                    let targetName = arkEffect.Name;
                    let selectedOption = null;

                    // "이름 - 무효" 옵션 먼저 찾기
                    selectedOption = nameSelect.querySelector(`option[value='${targetName} - 무효']`);

                    if (selectedOption) {
                        // "이름 - 무효" 옵션이 있으면 선택하고 종료
                        nameSelect.value = `${targetName} - 무효`;
                    } else {
                        // "이름 - 무효" 옵션이 없으면 "이름" 옵션 찾기
                        selectedOption = nameSelect.querySelector(`option[value='${targetName}']`);

                        if (selectedOption) {
                            // "이름" 옵션이 있으면 선택
                            nameSelect.value = targetName;
                        } else {
                            // 둘 다 없으면 "이름 - 무효" 옵션 생성 및 선택
                            let newOption = document.createElement("option");
                            newOption.value = `${targetName} - 무효`;
                            newOption.textContent = `${targetName} - 무효`;
                            nameSelect.appendChild(newOption);
                            nameSelect.value = `${targetName} - 무효`;
                        }
                    }
                    // gradeSelect에 옵션 추가 (중복 방지)
                    if (!gradeSelect.querySelector(`option[value='${arkEffect.Level}']`)) {
                        let gradeOption = document.createElement("option");
                        gradeOption.value = arkEffect.Level;
                        gradeOption.textContent = arkEffect.Level;
                        gradeSelect.appendChild(gradeOption);
                    }
                    gradeSelect.value = arkEffect.Level;

                    // relicIcoSelect에 옵션 추가 (중복 방지)
                    if (!relicIcoSelect.querySelector(`option[value='${arkEffect.Grade}']`)) {
                        let relicOption = document.createElement("option");
                        relicOption.value = arkEffect.Grade;
                        relicOption.textContent = arkEffect.Grade;
                        relicIcoSelect.appendChild(relicOption);
                    }
                    relicIcoSelect.value = arkEffect.Grade;
                }
            } else {
                nameSelect.value = "없음";
                gradeSelect.value = 0;
                relicIcoSelect.value = "없음"
            }
        });
    }
    engravingAutoSelect()
    userEngToStoneOption() //각인이 생성된 이후 어빌리티스톤 옵션 생성

    /* **********************************************************************************************************************
    * function name		:	engSelectToImg
    * description	    : 	유저가 선택한 각인의 이미지로 바꿔줌
    *********************************************************************************************************************** */

    function engSelectToImg() {
        // console.log(Modules.originFilter.engravingImg);
        let elements = document.querySelectorAll(".engraving-area .engraving-name");
        elements.forEach(element => {
            imgChange(element)
            element.addEventListener("change", () => {
                imgChange(element)
            })

        })
        function imgChange(element) {
            let imgElement = element.closest(".engraving-box").querySelector("img.engraving-img");
            let name = element.value;
            let src = "";
            if (element.value.includes(" - ")) {
                name = element.value.split(" - ")[0];
            }
            Modules.originFilter.engravingImg.forEach(filter => {
                let filterName = filter.split("^")[0];
                let filterSrc = filter.split("^")[1];
                if (name === filterName) {
                    src = filterSrc;
                }
            })
            imgElement.src = src;
        }
    }
    engSelectToImg()

    /* **********************************************************************************************************************
    * function name		:	stoneAutoSelect()
    * description	    : 	어빌리티스톤(돌맹이)를 실제 유저의 정보에 맞춰 설정
    *********************************************************************************************************************** */
    function stoneAutoSelect() {
        const buffSelects = document.querySelectorAll(".buff-wrap .buff");
        const abilityStone = data.ArmoryEquipment.find(item => item.Type === "어빌리티 스톤");
        if (!abilityStone) {
            console.warn("어빌리티 스톤을 찾을 수 없습니다.");
            return;
        }

        const tooltip = abilityStone.Tooltip;
        const engravings = [];

        // 정규 표현식 수정
        const regex = /<FONT COLOR='#FFFFFF'>\[<FONT COLOR='#FFFFAC'>(.*?)<\/FONT>\] <img.*?><\/img>Lv\.(\d+)<\/FONT><BR>/g;

        let match;
        while ((match = regex.exec(tooltip)) !== null) {
            const name = match[1];
            const level = parseInt(match[2], 10);
            engravings.push({ name, level });
        }
        buffSelects.forEach((select, index) => {
            if (index >= engravings.length) return;

            const { name, level } = engravings[index];
            const targetValue = `${name}:${level}`;

            let foundOption = Array.from(select.options).find(option => option.value === targetValue);

            if (foundOption) {
                select.value = targetValue;
            } else {
                // "무효" 옵션 검색
                const invalidValue = `${name} - 무효:${level}`;
                foundOption = Array.from(select.options).find(option => option.value === invalidValue);

                if (foundOption) {
                    select.value = invalidValue
                } else {
                    // value와 일치하는 option이 없는 경우 새로운 option 생성
                    const newOption = document.createElement('option');
                    newOption.value = invalidValue;
                    newOption.text = `${name} Lv${level} - 무효`;
                    select.appendChild(newOption);
                    select.value = invalidValue;
                }
            }
        });
    }
    stoneAutoSelect()

    /* **********************************************************************************************************************
    * function name		:	keepStoneOption
    * description	    : 	사용자가 어빌리티 스톤이 포함되지 않은 각인을 변경시 현재 선택된 어빌리티 스톤 옵션을 유지
    *********************************************************************************************************************** */
    function keepStoneOption() {
        let eventElements = document.querySelectorAll(".engraving-box .engraving-name, .buff-wrap .buff");
        let engElements = document.querySelectorAll(".engraving-box .engraving-name");
        let stoneElements = document.querySelectorAll(".buff-wrap .buff");
        stoneElements.forEach(stone => {
            stone.addEventListener("change", () => { stoneAttributeSet() });
            function stoneAttributeSet() {
                stone.setAttribute("data-stone", stone.value);
            };
            stoneAttributeSet();
        })
        engElements.forEach(eng => {
            eng.addEventListener("change", () => { stoneChange() });
            function stoneChange() {
                stoneElements.forEach(stone => {
                    optionElementAutoCheck(stone, stone.getAttribute("data-stone"), "value");
                })
            };
            stoneChange();
        })
    }
    keepStoneOption()

    /* **********************************************************************************************************************
    * function name		    :	armoryTierAutoSelect()
    * description	        : 	방어구의 티어등급을 자동으로 선택해줌
    *                       :   변수설명
    * normalUpgradeValue    :   방어구의 일반 강화 수치 텍스트
    * 
    *********************************************************************************************************************** */

    function armoryTierAutoSelect() {

        data.ArmoryEquipment.forEach(armory => {
            let betweenText = betweenTextExtract(armory.Tooltip);

            let normalUpgradeValue;
            let armoryTierValue;
            let armoryTierName;
            let advancedValue;
            let specialElixir;
            let commonElixir;
            let hyperLevel;
            let hyperStar;


            partsAutoSelect("투구");
            partsAutoSelect("어깨");
            partsAutoSelect("장갑");
            partsAutoSelect("상의");
            partsAutoSelect("하의");
            partsAutoSelect("무기");

            function partsAutoSelect(partsName) {
                let elements = document.querySelectorAll(".armor-area .armor-item .armor-tag");

                if (armory.Type === partsName) {
                    normalUpgradeValue = numberExtract(betweenText.find(text => text.includes("+")));                           // +강화 수치값
                    armoryTierName = betweenText.find(text => /고대|유물|에스더/.test(text));                                   // 고대 유물 티어 풀 문자열
                    armoryTierName = armoryTierName.match(/(고대|유물|에스더)/g)[0];
                    if (armoryTierName !== "에스더") {
                        armoryTierValue = tierValueExtract(betweenText.find(text => /\(\D*\d+\D*\)/.test(text)));                   // 티어 숫자값
                        armoryTierName = `T${armoryTierValue} ${armoryTierName}`;                                               // 등급 풀네임 조합 예) T4 고대
                    } else if (armoryTierName === "에스더") {
                        let ellaLevel = Number(betweenText[betweenText.indexOf("엘라 부여") + 1].match(/\d+/g)[0])
                        if (ellaLevel === 1) {
                            armoryTierName = "에스더-엘라1"
                        } else if (ellaLevel === 2) {
                            armoryTierName = "에스더-엘라2"
                        } else {
                            armoryTierName = "에스더-엘라0"
                        }

                    }
                    advancedValue = advancedUpgradeValue(betweenText);                                                          // 상급강화 수치
                    hyperLevel = hyperValueExtract(betweenText).level;                                                          // 초월 N단계
                    hyperStar = hyperValueExtract(betweenText).star;                                                            // 초월 N성

                    if (armory.Type === partsName && partsName !== "무기") {
                        specialElixir = `${elixirNameExtract(betweenText)[0].value} ${elixirNameExtract(betweenText)[0].level}`     // 고유 엘릭서 옵션
                        commonElixir = `${elixirNameExtract(betweenText)[1].value} ${elixirNameExtract(betweenText)[1].level}`      // 공용 엘릭서 옵션
                    }


                    elements.forEach(element => {
                        if (element.textContent.includes(partsName)) {
                            let parent = element.parentElement;

                            let plus = parent.querySelector(".plus");
                            optionElementAutoCheck(plus, armoryTierName, 'textContent');

                            let armorName = parent.querySelector(".armor-name");
                            optionElementAutoCheck(armorName, normalUpgradeValue, 'value');

                            let armorUpgrade = parent.querySelector('.armor-upgrade');
                            // armorUpgrade 요소에 대한 데이터 속성 추가 (advancedValue 저장)
                            armorUpgrade.dataset.advancedValue = advancedValue;

                            if (partsName !== "무기") {
                                let specialElixirElement = parent.querySelectorAll(".elixir")[0];
                                let commonElixirElement = parent.querySelectorAll(".elixir")[1];
                                optionElementAutoCheck(specialElixirElement, specialElixir, 'textContent');
                                optionElementAutoCheck(commonElixirElement, commonElixir, 'textContent');

                            }

                            if (!armorUpgrade.dataset.initialized) {
                                armorUpgrade.dataset.initialized = 'true'; // 이미 처리된 요소인지 표시
                                armorName.dispatchEvent(new Event('change', { bubbles: true }));
                                // armoryEnforceLimite(); // 해당 armor-name에 대한 option을 생성
                                // hyperStageToStarCreate(); // 초월 N단계를 바탕으로 3N성 생성
                                optionElementAutoCheck(armorUpgrade, armorUpgrade.dataset.advancedValue, 'value');
                                // setTimeout(() => {
                                // optionElementAutoCheck(star, star.dataset.hyperStar, 'value');
                                // }, 0)
                            }
                        }
                    })

                    // console.log("=============================================")
                    // console.log("=============================================")
                    // console.log("=============================================")
                    // console.log(normalUpgradeValue)
                    // console.log(armoryTierValue)
                    // console.log(armoryTierName)
                    // console.log(advancedValue)
                    // console.log(hyperLevel)
                    // console.log(hyperStar)


                }
            }

        });

        function numberExtract(text) {
            if (typeof text !== 'string') {
                console.error("Error: Input must be a string.");
                return null; // 입력이 문자열이 아니면 null 반환
            }
            const numberMatch = text.match(/\d+(\.\d+)?/); // 정규 표현식을 사용하여 숫자(정수 또는 소수)를 찾음 (하나만)
            if (numberMatch === null) {
                return null; // 숫자가 없으면 null 반환
            }
            return Number(numberMatch[0]); // 찾은 숫자를 숫자로 변환하여 반환
        }

        function tierValueExtract(text) {
            let regex = /\(\D*(\d+)\D*\)/;
            let value = text.match(regex)
            return Number(value[1])
        }

        function advancedUpgradeValue(text) {
            let result = 0;
            text.forEach((item, idx) => {
                if (item === "[상급 재련]") {
                    result = Number(text[idx + 2])
                }
            })
            return result;
        }

        function elixirNameExtract(text) {
            let elixirArry = []
            text.forEach((item, idx) => {
                let regex = /\[(투구|어깨|장갑|상의|하의|무기|공용)\]/
                if (regex.test(item)) {
                    let obj = {
                        tag: item,
                        value: text[idx + 1].trim().replace(/\s*\(.*?\)/g, ""),
                        level: text[idx + 2].trim()
                    }
                    if (/힘|민첩|지능/.test(text[idx + 1].trim())) {
                        obj.value = "힘/민첩/지능"
                    }
                    elixirArry.push(obj)
                }
            })

            elixirArry.sort((a, b) => {
                if (a.tag === "[공용]") return 1; // [공용]을 뒤로 보냄
                if (b.tag === "[공용]") return -1; // [공용]이 아니면 앞으로 보냄
                return 0; // 나머지는 순서 유지
            });

            if (elixirArry.length === 0) {
                let emptyObj = {
                    tag: "없음",
                    value: "없음",
                    level: "없음"
                }
                elixirArry.push(emptyObj);
                elixirArry.push(emptyObj);
            } else if (elixirArry.length === 1) {
                let emptyObj = {
                    tag: "없음",
                    value: "없음",
                    level: "없음"
                }
                elixirArry.push(emptyObj);
            }
            // console.log(elixirArry)
            return elixirArry
        }
        function hyperValueExtract(text) {
            let obj = { level: 0, star: 0 };
            text.forEach((item, idx) => {
                if (item === '[초월]') {
                    obj.level = Number(text[idx + 2]);
                    obj.star = Number(text[idx + 5].match(/\d+/)[0]);
                }
            })
            return obj
        }

    }
    armoryTierAutoSelect();
    hyperStageToStarCreate();

    /* **********************************************************************************************************************
    * function name		:	keppAdvancedUpgradeValue
    * description		: 	상급재련의 강화수치가 초기화되지 않게 함
    *********************************************************************************************************************** */
    function keppAdvancedUpgradeValue() {
        let advancedElements = document.querySelectorAll(".sc-info .armor-area .armor-item select.armor-upgrade");
        let normalElements = document.querySelectorAll(".sc-info .armor-area .armor-item select.armor-name");
        let plusElements = document.querySelectorAll(".sc-info .armor-area .armor-item select.plus");
        advancedElements.forEach(element => {
            element.addEventListener("change", () => { valueAttribute() })
            function valueAttribute() {
                element.setAttribute("data-selected", element.value);
            }
            valueAttribute()
        })
        normalElements.forEach(normal => {
            let advancedElement = normal.closest(".armor-item").querySelector("select.armor-upgrade");
            normal.addEventListener("change", () => {
                let advancedValue = advancedElement.getAttribute("data-selected");
                if (advancedElement.options.length >= Number(advancedValue)) {
                    advancedElement.options[advancedValue].selected = 'true';
                } else {

                    advancedElement.setAttribute("data-selected", 0);
                }
            })
        })
        // ToDo simulator.html에서 `value="1600">세르카` 를 검색해서 value값을 일치시키면 됨
        plusElements.forEach((item) => {
            const normalUpgradeElement = item.closest(".armor-item").querySelector("select.armor-name");
            const normalUpgradeValue = Number(normalUpgradeElement.value);

            let currentIndex = normalUpgradeElement.selectedIndex;

            const advancedUpgradeElement = item.closest(".armor-item").querySelector("select.armor-upgrade");
            const advancedUpgradeValue = Number(advancedUpgradeElement.getAttribute("data-advanced-value"));

            // advancedUpgradeElement.selectedIndex = advancedUpgradeValue;

            if (Number(item.value) === 1600 && Number(item.getAttribute("data-selected")) !== 1600) {
                if (normalUpgradeValue <= 23) {
                    normalUpgradeElement.selectedIndex = Math.max(0, currentIndex - 9);
                } else if (normalUpgradeValue === 24) {
                    normalUpgradeElement.selectedIndex = Math.max(0, currentIndex - 8);
                } else if (normalUpgradeValue === 25) {
                    normalUpgradeElement.selectedIndex = Math.max(0, currentIndex - 7);
                }
                normalUpgradeElement.dispatchEvent(new Event('change'));
            } else if (Number(item.value) !== 1600 && Number(item.getAttribute("data-selected")) === 1600) {
                if (normalUpgradeValue <= 14) {
                    normalUpgradeElement.selectedIndex = Math.max(0, currentIndex + 9);
                    normalUpgradeElement.dispatchEvent(new Event('change'));
                    advancedUpgradeElement.selectedIndex = advancedUpgradeValue;
                    advancedUpgradeElement.dispatchEvent(new Event('change'));
                } else if (normalUpgradeValue <= 16) {
                    normalUpgradeElement.selectedIndex = Math.max(0, currentIndex + 8);
                    normalUpgradeElement.dispatchEvent(new Event('change'));
                    advancedUpgradeElement.selectedIndex = advancedUpgradeValue;
                    advancedUpgradeElement.dispatchEvent(new Event('change'));
                } else if (normalUpgradeValue <= 18) {
                    normalUpgradeElement.selectedIndex = Math.max(0, currentIndex + 7);
                    normalUpgradeElement.dispatchEvent(new Event('change'));
                    advancedUpgradeElement.selectedIndex = advancedUpgradeValue;
                    advancedUpgradeElement.dispatchEvent(new Event('change'));
                }
            }
            item.setAttribute("data-selected", item.value)
        });
    }
    keppAdvancedUpgradeValue()

    /* **********************************************************************************************************************
    * function name		:	armoryGradeToBackgroundClassName()
    * description	    : 	장비의 등급(예:고대,유물,전설,영웅)에 따라 배경 className을 설정
    *********************************************************************************************************************** */
    function armoryGradeToBackgroundClassName() {
        let armorElements = document.querySelectorAll(".sc-info .armor-area .armor-item select.plus");
        armorElements.forEach(element => {
            element.addEventListener("change", () => { backgroundClassNameChange() });
            let backgroundElement = element.closest(".armor-item").querySelector(".img-box");
            backgroundElement.classList.remove("skeleton");
            function backgroundClassNameChange() {
                let grade = element.options[element.selectedIndex].textContent;
                if (grade.includes("고대")) {
                    backgroundElement.classList.remove("ultra-background", "rare-background");
                    backgroundElement.classList.add("ultra-background");
                } else if (grade.includes("유물")) {
                    backgroundElement.classList.remove("ultra-background", "rare-background");
                    backgroundElement.classList.add("rare-background");
                } else if (grade.includes("엘라")) {
                    backgroundElement.classList.remove("ultra-background", "rare-background");
                }
            }
            backgroundClassNameChange();
        })
        let accessoryElements = document.querySelectorAll(".sc-info .accessory-area .accessory-item .number-box select.tier");
        accessoryElements.forEach(element => {
            element.addEventListener("change", () => { backgroundClassNameChange() });
            let backgroundElement = element.closest(".accessory-item").querySelector(".img-box");
            backgroundElement.classList.remove("skeleton");
            function backgroundClassNameChange() {
                let grade = element.options[element.selectedIndex].textContent;
                // console.log(grade)
                if (grade.includes("고대")) {
                    backgroundElement.classList.remove("ultra-background", "rare-background");
                    backgroundElement.classList.add("ultra-background");
                } else if (grade.includes("유물")) {
                    backgroundElement.classList.remove("ultra-background", "rare-background");
                    backgroundElement.classList.add("rare-background");
                }
            }
            backgroundClassNameChange();
        })
    }
    /* **********************************************************************************************************************
    * function name		:	armoryImageSetting()
    * description	    : 	처음 로딩 시 장비의 이미지를 유저가 장착한 이미지로 설정
    *********************************************************************************************************************** */
    function setItemImages() {
        let armorNameElements = document.querySelectorAll(".sc-info .armor-area .armor-item .armor-tag");
        armorNameElements.forEach(element => {
            let imgElement = element.closest(".armor-item").querySelector(".img-box img");
            let matchData = data.ArmoryEquipment.find(object => object.Type === element.textContent);
            if (!matchData) {
                return;
            }
            imgElement.setAttribute("src", matchData.Icon);
        })
        let accessoryElement = document.querySelectorAll(".sc-info .accessory-area .accessory-item");
        let necklaceElement = accessoryElement[0].querySelector(".img-box img");
        let earRingElement1 = accessoryElement[1].querySelector(".img-box img");
        let earRingElement2 = accessoryElement[2].querySelector(".img-box img");
        let ringElement1 = accessoryElement[3].querySelector(".img-box img");
        let ringElement2 = accessoryElement[4].querySelector(".img-box img");
        let stoneElement = accessoryElement[5].querySelector(".img-box img");
        let bangleElement = accessoryElement[6].querySelector(".img-box img");
        let earRingCount = 0;
        let ringCount = 0;
        data.ArmoryEquipment.forEach(accessory => {
            if (accessory.Type === "목걸이") {
                necklaceElement.setAttribute("src", accessory.Icon);
            } else if (accessory.Type === "귀걸이") {
                if (earRingCount === 0) {
                    earRingElement1.setAttribute("src", accessory.Icon);
                    earRingCount++;
                } else if (earRingCount === 1) {
                    earRingElement2.setAttribute("src", accessory.Icon);
                }
            } else if (accessory.Type === "반지") {
                if (ringCount === 0) {
                    ringElement1.setAttribute("src", accessory.Icon);
                    ringCount++;
                } else if (ringCount === 1) {
                    ringElement2.setAttribute("src", accessory.Icon);
                }
            } else if (accessory.Type === "어빌리티 스톤") {
                stoneElement.setAttribute("src", accessory.Icon);
            } else if (accessory.Type === "팔찌") {
                bangleElement.setAttribute("src", accessory.Icon);
            }
        })
    }
    setItemImages()

    /* **********************************************************************************************************************
    * function name		:	stoneProgressAndBackground
    * description	    : 	어비리티 스톤의 등급에 따라 배경과 progress의 색상을 변경
    *********************************************************************************************************************** */
    function stoneProgressAndBackground() {
        let imgBoxElement = document.querySelectorAll(".sc-info .accessory-area .accessory-item")[5].querySelector(".img-box");
        let progressElement = imgBoxElement.querySelector("span.progress");
        let backgroundClassName = "";
        let progressClassName = "";
        let stoneData = data.ArmoryEquipment.filter(data => data.Type === "어빌리티 스톤")[0];
        if (!stoneData) {
            return;
        }
        if (stoneData.Grade === "고대") {
            backgroundClassName = "ultra-background";
            progressClassName = "mythic-progressbar";
        } else if (stoneData.Grade === "유물") {
            backgroundClassName = "rare-background";
            progressClassName = "relics-progressbar";
        }

        // console.log(stoneData)
        imgBoxElement.classList.remove("skeleton");
        imgBoxElement.classList.add(backgroundClassName);
        progressElement.classList.add(progressClassName);
        progressElement.textContent = stoneData.Grade;
    }
    stoneProgressAndBackground()

    /* **********************************************************************************************************************
    * function name		:	armorQualityToHTML
    * description	    : 	장비의 품질을 표시해줌
    *********************************************************************************************************************** */

    function armorQualityToHTML() {
        let elements = document.querySelectorAll(".armor-area .armor-item");
        elements.forEach((element, idx) => {
            if (idx < 6) {
                let tag = element.querySelector(".armor-tag");
                let quality = element.querySelector(".progress");
                let tooltip = data.ArmoryEquipment.find(data => data.Type === tag.textContent);
                if (!tooltip) {
                    return;
                }
                let qualityValue = Number(tooltip.Tooltip.match(/"qualityValue":\s*(\d+)/)[1]);
                let className = "";
                if (qualityValue <= 9) {
                    className = "common-progressbar"
                } else if (qualityValue <= 29) {
                    className = "uncommon-progressbar"
                } else if (qualityValue <= 69) {
                    className = "rare-progressbar"
                } else if (qualityValue <= 89) {
                    className = "epic-progressbar"
                } else if (qualityValue <= 99) {
                    className = "legendary-progressbar"
                } else if (qualityValue == 100) {
                    className = "mythic-progressbar"
                } else {
                    className = 'unknown'
                }
                const classesToRemove = [
                    "common-progressbar",
                    "uncommon-progressbar",
                    "rare-progressbar",
                    "epic-progressbar",
                    "legendary-progressbar",
                    "mythic-progressbar",
                    "unknown"
                ];
                classesToRemove.forEach(classNameItem => {
                    quality.classList.remove(classNameItem);
                });
                quality.classList.add(className)
                if (idx !== 5) {
                    quality.textContent = qualityValue;
                }
            }


        })
    }
    armorQualityToHTML()

    /* **********************************************************************************************************************
    * function name		:	avgLevelKarmaYN
    * description	    : 	장비의 평균레벨을 토대로 카르마의 잠금해제를 결정
    *********************************************************************************************************************** */
    // body.addEventListener("click", ()=>{})
    async function avgLevelKarmaYN() {
        let armorLevelsObj = await armoryLevelCalc(Modules);
        armorLevelsObj = armorLevelsObj.level;
        let sumLevel = 0;
        armorLevelsObj.forEach(armor => {
            sumLevel += armor.level;
        })
        let avgLevel = sumLevel / armorLevelsObj.length;
        // console.log("평균레벨",avgLevel)
        let enlightElements = document.querySelectorAll(".ark-area .ark-list.enlightenment .radio input[type=radio]");
        let leapElements = document.querySelectorAll(".ark-area .ark-list.leap .radio input[type=radio]");
        if (avgLevel < 1670) {
            enlightElements.forEach(element => { element.disabled = true; element.checked = false; })
            leapElements.forEach(element => { element.disabled = true; element.checked = false; })
        } else if (avgLevel >= 1670) {
            enlightElements.forEach(element => { element.disabled = false; })
            leapElements.forEach(element => { element.disabled = false; })
        }
    }
    avgLevelKarmaYN()

    /* **********************************************************************************************************************
    * function name		:	enlightKarmaNodeList
    * description	    : 	도약카르마 노드 선택(서폿전용)
    *********************************************************************************************************************** */
    function enlightKarmaNodeList() {
        let arkListElement = document.querySelector(".ark-area .ark-list.enlightenment .ark-item.node");
        let firstClass = cachedDetailInfo.extractValue.etcObj.supportCheck;
        let secondClass = cachedDetailInfo.extractValue.etcObj.characterClass;

        // 1. 직업 목록
        const classes = [
            { id: 'supp_dohwaga', name: '서폿 도화가' },
            { id: 'supp_holyknight', name: '서폿 홀리나이트' },
            { id: 'supp_bard', name: '서폿 바드' },
            { id: 'supp_valkyrie', name: '서폿 발키리' },
        ];
        // 2. 옵션 목록 (각 옵션이 어떤 클래스에 속하는지 classId로 참조)
        const options = [
            { id: 'dohwaga_option_1', classId: 'supp_dohwaga', name: '오누이' },
            { id: 'dohwaga_option_2', classId: 'supp_dohwaga', name: '낙인 강화' },
            { id: 'dohwaga_option_3', classId: 'supp_dohwaga', name: '묵법 : 접무' },
            { id: 'holyknight_option_1', classId: 'supp_holyknight', name: '빠른 구원' },
            { id: 'holyknight_option_2', classId: 'supp_holyknight', name: '빛의 흔적' },
            { id: 'holyknight_option_3', classId: 'supp_holyknight', name: '신성 해방' },
            { id: 'bard_option_1', classId: 'supp_bard', name: '포용의 세레나데' },
            { id: 'bard_option_2', classId: 'supp_bard', name: '낙인의 세레나데' },
            { id: 'bard_option_3', classId: 'supp_bard', name: '세레나데 코드' },
            { id: 'valkyrie_option_1', classId: 'supp_valkyrie', name: '해방자의 흔적' },
            { id: 'valkyrie_option_2', classId: 'supp_valkyrie', name: '빛의 검기' },
            { id: 'valkyrie_option_3', classId: 'supp_valkyrie', name: '해방의 날개' }
        ];
        // 3. 레벨 목록 (각 레벨이 어떤 옵션에 속하는지 optionId로 참조)
        const levels = [
            // 도화가 : 오누이이
            { optionId: 'dohwaga_option_1', value: 'stigmaPer:0' },
            { optionId: 'dohwaga_option_1', value: 'stigmaPer:0' },
            { optionId: 'dohwaga_option_1', value: 'stigmaPer:1' },
            { optionId: 'dohwaga_option_1', value: 'stigmaPer:2' },
            { optionId: 'dohwaga_option_1', value: 'stigmaPer:3' },
            { optionId: 'dohwaga_option_1', value: 'stigmaPer:4' },
            // 도화가 : 낙인 강화
            { optionId: 'dohwaga_option_2', value: 'stigmaPer:0' },
            { optionId: 'dohwaga_option_2', value: 'stigmaPer:0' },
            { optionId: 'dohwaga_option_2', value: 'stigmaPer:1' },
            { optionId: 'dohwaga_option_2', value: 'stigmaPer:2' },
            { optionId: 'dohwaga_option_2', value: 'stigmaPer:3' },
            { optionId: 'dohwaga_option_2', value: 'stigmaPer:4' },
            // 도화가 : 묵법 : 접무
            { optionId: 'dohwaga_option_3', value: 'enlightenmentBuff:1' },
            { optionId: 'dohwaga_option_3', value: 'enlightenmentBuff:1.1' },
            { optionId: 'dohwaga_option_3', value: 'enlightenmentBuff:1.15' },
            { optionId: 'dohwaga_option_3', value: 'enlightenmentBuff:1.2' },
            // 홀나 : 빠른 구원
            { optionId: 'holyknight_option_1', value: 'stigmaPer:0' },
            { optionId: 'holyknight_option_1', value: 'stigmaPer:0' },
            { optionId: 'holyknight_option_1', value: 'stigmaPer:1' },
            { optionId: 'holyknight_option_1', value: 'stigmaPer:2' },
            { optionId: 'holyknight_option_1', value: 'stigmaPer:3' },
            { optionId: 'holyknight_option_1', value: 'stigmaPer:4' },
            // 홀나 : 빛의 흔적
            { optionId: 'holyknight_option_2', value: 'stigmaPer:0' },
            { optionId: 'holyknight_option_2', value: 'stigmaPer:0' },
            { optionId: 'holyknight_option_2', value: 'stigmaPer:1' },
            { optionId: 'holyknight_option_2', value: 'stigmaPer:2' },
            { optionId: 'holyknight_option_2', value: 'stigmaPer:3' },
            { optionId: 'holyknight_option_2', value: 'stigmaPer:4' },
            // 홀나 : 신성 해방
            { optionId: 'holyknight_option_3', value: 'enlightenmentBuff:1' },
            { optionId: 'holyknight_option_3', value: 'enlightenmentBuff:1.1' },
            { optionId: 'holyknight_option_3', value: 'enlightenmentBuff:1.15' },
            { optionId: 'holyknight_option_3', value: 'enlightenmentBuff:1.2' },
            // 바드 : 포용의 세레나데
            { optionId: 'bard_option_1', value: 'stigmaPer:0' },
            { optionId: 'bard_option_1', value: 'stigmaPer:0' },
            { optionId: 'bard_option_1', value: 'stigmaPer:1' },
            { optionId: 'bard_option_1', value: 'stigmaPer:2' },
            { optionId: 'bard_option_1', value: 'stigmaPer:3' },
            { optionId: 'bard_option_1', value: 'stigmaPer:4' },
            // 바드 : 낙인의 세레나데
            { optionId: 'bard_option_2', value: 'stigmaPer:0' },
            { optionId: 'bard_option_2', value: 'stigmaPer:0' },
            { optionId: 'bard_option_2', value: 'stigmaPer:1' },
            { optionId: 'bard_option_2', value: 'stigmaPer:2' },
            { optionId: 'bard_option_2', value: 'stigmaPer:3' },
            { optionId: 'bard_option_2', value: 'stigmaPer:4' },
            // 바드 : 세레나데 코드
            { optionId: 'bard_option_3', value: 'enlightenmentBuff:1' },
            { optionId: 'bard_option_3', value: 'enlightenmentBuff:1.1' },
            { optionId: 'bard_option_3', value: 'enlightenmentBuff:1.15' },
            { optionId: 'bard_option_3', value: 'enlightenmentBuff:1.2' },
            // 발키리 : 해방자의 흔적
            { optionId: 'valkyrie_option_1', value: 'stigmaPer:0' },
            { optionId: 'valkyrie_option_1', value: 'stigmaPer:0' },
            { optionId: 'valkyrie_option_1', value: 'stigmaPer:1' },
            { optionId: 'valkyrie_option_1', value: 'stigmaPer:2' },
            { optionId: 'valkyrie_option_1', value: 'stigmaPer:3' },
            { optionId: 'valkyrie_option_1', value: 'stigmaPer:4' },
            // 발키리 : 빛의 검기
            { optionId: 'valkyrie_option_2', value: 'stigmaPer:0' },
            { optionId: 'valkyrie_option_2', value: 'stigmaPer:0' },
            { optionId: 'valkyrie_option_2', value: 'stigmaPer:1' },
            { optionId: 'valkyrie_option_2', value: 'stigmaPer:2' },
            { optionId: 'valkyrie_option_2', value: 'stigmaPer:3' },
            { optionId: 'valkyrie_option_2', value: 'stigmaPer:4' },
            // 발키리 : 해방의 날개
            { optionId: 'valkyrie_option_3', value: 'enlightenmentBuff:1' },
            { optionId: 'valkyrie_option_3', value: 'enlightenmentBuff:1.1' },
            { optionId: 'valkyrie_option_3', value: 'enlightenmentBuff:1.15' },
            { optionId: 'valkyrie_option_3', value: 'enlightenmentBuff:1.2' },
        ];

        function generateSelectsForClass(classId) {
            let selectHtmlStrings = [];

            const classOptions = options.filter(option => option.classId === classId);

            classOptions.forEach(option => {
                let optionsHtml = '';
                const optionLevels = levels.filter(level => level.optionId === option.id);

                // 각 레벨로 <option> 태그를 생성합니다.
                // **변경 사항:** level.value 대신 index를 사용합니다.
                optionLevels.forEach((level, index) => {
                    // index는 0부터 시작하므로 그대로 사용하면 0레벨, 1레벨... 이 됩니다.
                    // 만약 1레벨부터 시작하게 하고 싶다면 'index + 1'을 사용하세요.
                    const displayLevel = index; // 0레벨부터 시작
                    // const displayLevel = index + 1; // 1레벨부터 시작

                    const optionText = `${option.name} Lv.${displayLevel}`;
                    optionsHtml += `<option value="${level.value}">${optionText}</option>`;
                });

                const selectString =
                    `<select name="${option.id}" data-node="${option.name}">
                        ${optionsHtml}
                    </select>`;
                selectHtmlStrings.push(selectString);
            });

            return selectHtmlStrings;
        }
        classes.forEach(characterClass => {
            if (characterClass.name === `${firstClass} ${secondClass}`) {
                arkListElement.insertAdjacentHTML("beforeend", generateSelectsForClass(characterClass.id).join(""));
            }
        })

    };
    enlightKarmaNodeList();
    /* **********************************************************************************************************************
    * function name		:	autoAelectEnlightNode
    * description	    : 	깨달음 스킬 노드를 자동으로 선택
    *********************************************************************************************************************** */
    function autoAelectEnlightNode() {
        let enlightNode = data.ArkPassive.Effects.filter(enlight => enlight.Name === "깨달음");
        let enlightElements = document.querySelectorAll(".ark-area .ark-list.enlightenment .ark-item.node select");
        let firstOption = enlightElements[0];
        let secondOption = enlightElements[1];
        let thirdOption = enlightElements[2];
        if (firstOption) {
            enlightNode.forEach(node => {
                let nodeName = node.Description.match(/<\/FONT>.*?<FONT color='#83E9FF'>(.*?)<\/FONT>/)[1];
                if (nodeName.includes(firstOption.getAttribute("data-node"))) {
                    optionElementAutoCheck(firstOption, nodeName, "textContent")
                }
                if (nodeName.includes(secondOption.getAttribute("data-node"))) {
                    optionElementAutoCheck(secondOption, nodeName, "textContent")
                }
                if (nodeName.includes(thirdOption.getAttribute("data-node"))) {
                    optionElementAutoCheck(thirdOption, nodeName, "textContent")
                }
            })
        }
    };
    autoAelectEnlightNode();

    // optionElementAutoCheck(firstOption, selectValue, tag)
    // optionElementAutoCheck(secondOption, selectValue, tag)
    // optionElementAutoCheck(thirdOption, selectValue, tag)

    /* **********************************************************************************************************************
    * function name		:	weaponQualitySelect
    * description	    : 	무기의 품질을 자동으로 선택함
    *********************************************************************************************************************** */

    function weaponQualitySelect() {
        let weaponData = data.ArmoryEquipment.find(armory => armory.Type === "무기");
        if (!weaponData) {
            return;
        }
        let betweenText = betweenTextExtract(weaponData.Tooltip);
        let qualityString = betweenText.find(between => between.includes("\"qualityValue\": ") && /\d/.test(between))
        let qualityValue = Number(qualityString.match(/"qualityValue":\s*(\d+)/)[1]);
        let weaponElement = document.querySelectorAll(".armor-area .armor-item")[5].querySelector("select.progress");
        optionElementAutoCheck(weaponElement, qualityValue, "value")
    }
    weaponQualitySelect()

    /* **********************************************************************************************************************
    * function name		:	avatarAutoSelect
    * description	    : 	유저의 아바타를 자동으로 선택해줌
    *********************************************************************************************************************** */

    function avatarAutoSelect() {
        const partGradeCounts = {
            "weapon": { "legendary": 0, "hero": 0 },
            "helmet": { "legendary": 0, "hero": 0 },
            "armor": { "legendary": 0, "hero": 0 },
            "pants": { "legendary": 0, "hero": 0 },
            "combo": { "legendary": 0, "hero": 0 },
        };
        if (!data.ArmoryAvatars) {
            let parentElement = document.querySelectorAll(".armor-area .armor-item")[6];
            let noneElement = parentElement.querySelector(".none").querySelectorAll("input[type=radio]");
            noneElement.forEach((input) => {
                console.log(input)
                input.checked = true;
            })
            return;
        }
        data.ArmoryAvatars.forEach(avatar => {
            let betweenText = betweenTextExtract(avatar.Tooltip)
            if (/무기|머리|상의|하의/.test(avatar.Type)) {
                let part = avatar.Type.split(" ")[0]; // 예) "무기 아바타" -> "무기"
                if (part === "무기") {
                    part = "weapon";
                } else if (part === "머리") {
                    part = "helmet";
                } else if (part === "상의") {
                    part = "armor";
                    if (betweenText.find(between => between.includes("상의&하의"))) {
                        part = "combo";
                    }
                } else if (part === "하의") {
                    part = "pants";
                }
                let grade = avatar.Grade;
                if (grade === "전설") {
                    grade = "legendary";
                } else if (grade === "영웅") {
                    grade = "hero";
                }
                if (partGradeCounts[part] && (grade === "legendary" || grade === "hero")) {
                    partGradeCounts[part][grade]++;
                }
            }
        });
        // console.log("아바타 부위 등급:", partGradeCounts);
        let parentElement = document.querySelectorAll(".armor-area .armor-item")[6];
        let noneElement = parentElement.querySelector(".none").querySelectorAll("input[type=radio]");
        let heroElement = parentElement.querySelector(".hero").querySelectorAll("input[type=radio]");
        let legendaryElement = parentElement.querySelector(".legendary").querySelectorAll("input[type=radio]");
        let weaponIndex = 0;
        let helmetIndex = 1;
        let armorIndex = 2;
        let pantsIndex = 3;

        avatorSelect(partGradeCounts.weapon, weaponIndex)
        avatorSelect(partGradeCounts.helmet, helmetIndex)
        avatorSelect(partGradeCounts.armor, armorIndex)
        avatorSelect(partGradeCounts.pants, pantsIndex)
        if (partGradeCounts.combo.hero === 1 && partGradeCounts.armor.legendary === 0) {
            avatorSelect(partGradeCounts.combo, armorIndex)
            avatorSelect(partGradeCounts.combo, pantsIndex)
        }
        function avatorSelect(data, partsIndex) {
            if (data.legendary >= 1) {
                legendaryElement[partsIndex].checked = true;
            } else if (data.hero >= 1) {
                heroElement[partsIndex].checked = true;
            } else {
                noneElement[partsIndex].checked = true;
            }
        }

    }

    avatarAutoSelect()

    /* **********************************************************************************************************************
    * function name		:	accessoryTierAutoSelect()
    * description	    : 	악세서리 티어와 스텟을 자동으로 선택하는 함수
    *********************************************************************************************************************** */
    function accessoryTierAutoSelect() {
        let elements = document.querySelectorAll(".accessory-item .accessory");
        let necklaceElement = elements[0];
        let earRingElement1 = elements[1];
        let earRingElement2 = elements[2];
        let ringElement1 = elements[3];
        let ringElement2 = elements[4];

        let earRingCount = 0;
        let ringCount = 0;
        data.ArmoryEquipment.forEach(accessory => {

            let optionIndex = 0;
            if (/목걸이|귀걸이|반지/.test(accessory.Type)) {
                let tooltipData = betweenTextExtract(accessory.Tooltip);
                let accessoryTierName = tooltipData[5].match(/(고대|유물)/g)[0];
                let accessoryTierNumber = Number(tooltipData[10].match(/\d+/));
                let accessoryStatsValue = Number(/(힘|민첩|지능)\s*\+(\d+)/g.exec(tooltipData)[2])

                if (accessoryTierNumber <= 3) {
                    if (accessoryTierName === "유물") {
                        optionIndex = 0;
                    } else if (accessoryTierName === "고대") {
                        optionIndex = 1;
                    }
                } else if (accessoryTierNumber === 4) {
                    if (accessoryTierName === "유물") {
                        optionIndex = 2;
                    } else if (accessoryTierName === "고대") {
                        optionIndex = 3;
                    }
                }
                if (accessory.Type === "목걸이") {
                    necklaceElement.options[optionIndex].selected = true;
                    necklaceElement.closest(".number-box").querySelector("input.progress").value = accessoryStatsValue;
                    necklaceElement.dispatchEvent(new Event("change"));
                } else if (accessory.Type === "귀걸이") {
                    if (earRingCount === 0) {
                        earRingElement1.options[optionIndex].selected = true;
                        earRingElement1.closest(".number-box").querySelector("input.progress").value = accessoryStatsValue;
                        earRingElement1.dispatchEvent(new Event("change"));
                        earRingCount++;
                    } else if (earRingCount === 1) {
                        earRingElement2.options[optionIndex].selected = true;
                        earRingElement2.closest(".number-box").querySelector("input.progress").value = accessoryStatsValue;
                        earRingElement2.dispatchEvent(new Event("change"));
                    }
                } else if (accessory.Type === "반지") {
                    if (ringCount === 0) {
                        ringElement1.options[optionIndex].selected = true;
                        ringElement1.closest(".number-box").querySelector("input.progress").value = accessoryStatsValue;
                        ringElement1.dispatchEvent(new Event("change"));
                        ringCount++;
                    } else if (ringCount === 1) {
                        ringElement2.options[optionIndex].selected = true;
                        ringElement2.closest(".number-box").querySelector("input.progress").value = accessoryStatsValue;
                        ringElement2.dispatchEvent(new Event("change"));
                    }
                }
            }

        })

    }
    accessoryTierAutoSelect();
    /* **********************************************************************************************************************
    * function name		:	accessoryOptionsAutoSelect()
    * description	    : 	악세서리를 자동으로 선택하는 함수
    *********************************************************************************************************************** */
    function accessoryOptionsAutoSelect() {
        let elements = document.querySelectorAll(".accessory-item.accessory .option-box");
        let necklaceElement = elements[0];
        let earRingElement1 = elements[1];
        let earRingElement2 = elements[2];
        let ringElement1 = elements[3];
        let ringElement2 = elements[4];

        let earRingCount = 0;
        let ringCount = 0;
        let accessoryFilter;
        data.ArmoryEquipment.forEach(accessory => {
            if (/목걸이|귀걸이|반지/.test(accessory.Type)) {
                let tooltipData = betweenTextExtract(accessory.Tooltip);
                let accessoryTierName = tooltipData[5].match(/(고대|유물)/g)[0];
                let accessoryTierNumber = Number(tooltipData[10].match(/\d+/));
                if (accessoryTierNumber <= 3) {
                    if (accessoryTierName === "유물") {
                        accessoryFilter = Modules.simulatorFilter.accessoryOptionData.t3RelicData;
                    } else if (accessoryTierName === "고대") {
                        accessoryFilter = Modules.simulatorFilter.accessoryOptionData.t3MythicData;
                    }
                } else if (accessoryTierNumber === 4) {
                    accessoryFilter = Modules.simulatorFilter.accessoryOptionData.t4Data;
                }
                let userAccessoryOptionArray = mergeFilter(accessoryFilter).filter(filter => {
                    return tooltipData.some((item, idx) => {
                        // 필터의 악세서리 옵션명에서 +숫자값%를 제거하고 이름만 남김
                        if (typeof item === 'string' && item === filter.name.replace(/[^가-힣\s,]/g, '').trim()) {
                            if (tooltipData[idx + 1] === filter.optionValue) {
                                return true;
                            }
                        }
                    });
                });

                if (accessory.Type === "목걸이") {
                    userAccessoryOptionArray.forEach((option, idx) => {
                        optionElementAutoCheck(necklaceElement.querySelectorAll("select.option")[idx], option.name, 'textContent');
                    })
                } else if (accessory.Type === "귀걸이") {
                    if (earRingCount === 0) {
                        userAccessoryOptionArray.forEach((option, idx) => {
                            optionElementAutoCheck(earRingElement1.querySelectorAll("select.option")[idx], option.name, 'textContent');
                        })
                        earRingCount++;
                    } else if (earRingCount === 1) {
                        userAccessoryOptionArray.forEach((option, idx) => {
                            optionElementAutoCheck(earRingElement2.querySelectorAll("select.option")[idx], option.name, 'textContent');
                        })

                    }
                } else if (accessory.Type === "반지") {
                    if (ringCount === 0) {
                        userAccessoryOptionArray.forEach((option, idx) => {
                            optionElementAutoCheck(ringElement1.querySelectorAll("select.option")[idx], option.name, 'textContent');
                        })
                        ringCount++;
                    } else if (ringCount === 1) {
                        userAccessoryOptionArray.forEach((option, idx) => {
                            optionElementAutoCheck(ringElement2.querySelectorAll("select.option")[idx], option.name, 'textContent');
                        })
                    }
                }

            }

        })

        // function mergeFilter(filterData) { <== 삭제예정
        //     const names = [];
        //     for (const key in filterData) {
        //         if (filterData.hasOwnProperty(key) && Array.isArray(filterData[key])) {
        //             filterData[key].forEach(item => {
        //                 if (item.hasOwnProperty("name")) {
        //                     names.push(item.name);
        //                 }
        //             });
        //         }
        //     }
        //     return names
        // }
        function mergeFilter(filterData) {
            const mergedArray = [];

            for (const key in filterData) {
                if (filterData.hasOwnProperty(key) && Array.isArray(filterData[key])) {
                    filterData[key].forEach(item => {
                        if (item.hasOwnProperty("name") && item.hasOwnProperty("optionValue")) {
                            mergedArray.push({
                                name: item.name,
                                optionValue: item.optionValue
                            });
                        }
                    });
                }
            }

            return mergedArray;
        }

    }
    accessoryOptionsAutoSelect();
    enlightValueAttributeSet();

    armoryGradeToBackgroundClassName() // 장비 및 악세서리 고대,유물 에 따른 배경이미지 변경

    /* **********************************************************************************************************************
    * function name		:	accessoryOptionToGrade()
    * description	    : 	선택한 악세서리의 상중하 옵션을 보여줌
    *********************************************************************************************************************** */
    function accessoryOptionToGrade() {
        let selectElements = document.querySelectorAll(".accessory-area .accessory-item.accessory select.option");
        let tierElements = document.querySelectorAll(".accessory-area .accessory-item.accessory select.option");
        selectElements.forEach(select => {
            let tierElement = select.closest(".accessory-item").querySelector(".accessory-area .accessory-item select.tier");
            function gradeChange() {
                let gradeElement = select.closest(".grinding-wrap").querySelector("span.quality");
                let gradeValue = select.value.split(":")[0];
                if (gradeValue === "상") {
                    gradeElement.classList.remove("low", "middle", "high");
                    gradeElement.classList.add("high")
                } else if (gradeValue === "중") {
                    gradeElement.classList.remove("low", "middle", "high");
                    gradeElement.classList.add("middle")
                } else if (gradeValue === "하") {
                    gradeElement.classList.remove("low", "middle", "high");
                    gradeElement.classList.add("low")
                }
                gradeElement.textContent = gradeValue;
            };
            gradeChange();
            select.addEventListener("change", () => { gradeChange() });
            tierElement.addEventListener("change", () => { gradeChange() });
        })
    }
    accessoryOptionToGrade()

    /* **********************************************************************************************************************
    * function name		:	bangleAutoSelect()
    * description	    : 	유저의 정보에 맞춰 팔찌의 option을 자동으로 선택함
    *********************************************************************************************************************** */

    function bangleAutoSelect() {

        // if (betweenTextExtract(data.ArmoryEquipment.find(obj => obj.Type === "팔찌")).length === 0 ) {
        //     return;
        // }
        let bangleTierData = betweenTextExtract(data.ArmoryEquipment.find(obj => obj.Type === "팔찌").Tooltip);
        let tierNumber = Number(bangleTierData[8].match(/\d+/));
        let tierName = bangleTierData[5].match(/(고대|유물)/g)[0];
        let parentElement = document.querySelector(".accessory-area .accessory-item.bangle");
        let tierElement = parentElement.querySelector(".tier");
        optionElementAutoCheck(tierElement, `T${tierNumber}${tierName}`, 'textContent');
        tierElement.dispatchEvent(new Event("change"));

        let bangleTooltip = data.ArmoryEquipment.find(obj => obj.Type === "팔찌").Tooltip.replace(/<[^>]*>/g, '');
        // let bangleMergeFilter = mergeFilter(Modules.simulatorFilter.bangleOptionData);
        let optionElements = parentElement.querySelectorAll("select.option");
        let count = 0;
        let tier3Relic = Modules.simulatorFilter.bangleOptionData.t3RelicData;
        let tier3Mythic = Modules.simulatorFilter.bangleOptionData.t3MythicData;
        let tier4Relic = Modules.simulatorFilter.bangleOptionData.t4RelicData;
        let tier4Mythic = Modules.simulatorFilter.bangleOptionData.t4MythicData;
        if (tierNumber <= 3 && tierName === "유물") {
            tierOptionSelect(tier3Relic)
        } else if (tierNumber <= 3 && tierName === "고대") {
            tierOptionSelect(tier3Mythic)
        } else if (tierNumber === 4 && tierName === "유물") {
            tierOptionSelect(tier4Relic)
        } else if (tierNumber === 4 && tierName === "고대") {
            tierOptionSelect(tier4Mythic)
        }
        function tierOptionSelect(tierFilter) {
            let userEquipOption = tierFilter.filter(filter => {
                if (bangleTooltip.includes(filter.fullName)) {
                    bangleTooltip = bangleTooltip.replace(filter.fullName, "")
                    return true;
                }
            });
            // console.log(userEquipOption)
            userEquipOption.forEach((option, idx) => {
                optionElementAutoCheck(optionElements[idx], option.name, 'textContent');
            })
        }

        let bangleStats = parentElement.querySelectorAll(".stats");
        let bangleNumbers = parentElement.querySelectorAll("input.option");
        let bangleStatsArry = extractValues(bangleTooltip);
        bangleStatsArry.forEach((stat, idx) => {
            optionElementAutoCheck(bangleStats[idx], stat.name, 'textContent');
            bangleNumbers[idx].value = stat.value;
        })
        if (bangleTooltip.match(/(체력)\s*\+(\d+)/g)) {
            let healthString = bangleTooltip.match(/(체력)\s*\+(\d+)/g)[0];
            let healthValue = Number(healthString.match(/\d+/)[0]);
            let healthSelectElement = document.querySelectorAll(".sc-info .accessory-item.bangle .option-wrap .option-item")[3];
            let selectElement = healthSelectElement.querySelector("select.stats");
            let inputElement = healthSelectElement.querySelector("input.option");

            optionElementAutoCheck(selectElement, "체력", 'textContent');
            inputElement.value = healthValue;
        }

        function extractValues(str) {
            let regex = /(치명|특화|신속|힘|민첩|지능)\s*\+(\d+)/g;
            let matches, results = [];

            while ((matches = regex.exec(str)) !== null) {
                results.push({
                    name: matches[1], // "치명", "특화", "신속"
                    value: parseInt(matches[2], 10) // 추출된 숫자 값을 정수로 변환
                });
            }
            return results;
        }
    }
    bangleAutoSelect()
    /* **********************************************************************************************************************
    * function name		:	bangleQualityToHTML
    * description	    : 	팔찌의 옵션을 토대로 상중하 표시를 해줌
    *********************************************************************************************************************** */

    function bangleQualityToHTML() {
        let selectElements = document.querySelectorAll(".accessory-item.bangle select.option");
        let inputElements = document.querySelectorAll(".accessory-item.bangle input.option");
        let tierValue = document.querySelector(".accessory-item.bangle .tier.bangle").value;
        selectElements.forEach(select => {
            let tierElement = select.closest(".accessory-item").querySelector("select.tier");
            tierElement.addEventListener("change", () => { selectQualityChange() })
            select.addEventListener("change", () => { selectQualityChange() })
            function selectQualityChange() {
                let gradeValue = select.options[select.selectedIndex].getAttribute("data-grade");
                let gradeElement = select.closest(".grinding-wrap").querySelector("span.quality");
                let className = "";
                if (gradeValue === "상") {
                    className = "high";
                } else if (gradeValue === "중") {
                    className = "middle";
                } else if (gradeValue === "하") {
                    className = "low";
                }
                gradeElement.classList.remove("high", "middle", "low", "none");
                gradeElement.classList.add(className);
                gradeElement.textContent = gradeValue;
            }
            selectQualityChange()
        })
    }
    bangleQualityToHTML()

    /* **********************************************************************************************************************
    * function name		:	bangleStatsDisable()
    * description	    : 	팔찌옵션의 갯수를 기준으로 비활성화 활성화를 결정함
    *********************************************************************************************************************** */

    function bangleStatsDisable() {
        let optionElements = document.querySelectorAll(".accessory-area .accessory-item.bangle select.option");
        let bangleElements = document.querySelectorAll(".accessory-area .accessory-item.bangle input.option");
        let bangleStatsName = document.querySelectorAll(".accessory-area .accessory-item.bangle .stats")[2];
        let bangleStatsValue = document.querySelectorAll(".accessory-area .accessory-item.bangle input.option")[2];


        optionElements.forEach(element => {
            element.addEventListener("change", () => { valueChange() })
            function valueChange() {
                if (element.options[element.selectedIndex].textContent !== "없음") {
                    bangleStatsName.options[0].selected = true;
                    bangleStatsValue.value = 0;
                    bangleQualityToHTML()
                }
            }
            valueChange()
        })
        bangleElements.forEach((element, idx) => {
            element.addEventListener("change", () => { valueChange() })
            function valueChange() {
                // console.log(element.value, idx)
                if (element.value > 0 && idx === 2) {
                    optionElements[2].options[0].selected = true;
                    bangleQualityToHTML()
                }
            }
            valueChange()
        })

    }
    // bangleStatsDisable()



    /* **********************************************************************************************************************
    * function name		:	
    * description	    : 	data-name함수 이후 실행되어야 하는 스크립트
    *********************************************************************************************************************** */

    // userLevelAccessoryToEnlight()
    collectToKarma()
    enlightValueChange()
    ellaOptionSetting(); // 엘라옵션 선택 조절
    // leafPointToKarmaSelect() <== 함수 순서 변경으로 인해 삭제예정
    showLeafInfo()
    userLevelAndArmorToEvolution()
    // evloutionKarmaRankChange()


    /* **********************************************************************************************************************
    * function name		:	applyDataStringToOptions()
    * description	    : 	data-string값을 이용하여 select 드롭박스 표시내용 수정
    *********************************************************************************************************************** */

    function applyDataStringToOptions() {
        const selectElementsWithDataString = document.querySelectorAll('select[data-string]');
        selectElementsWithDataString.forEach(selectElement => {
            const dataString = selectElement.getAttribute('data-string');
            const options = selectElement.querySelectorAll('option');

            options.forEach(option => {
                const originalText = option.textContent.replace(dataString, '');
                option.textContent = `${dataString}${originalText}`;
            });
        });
    }
    applyDataStringToOptions()


    /* **********************************************************************************************************************
    * function name		:	
    * description	    : 	값이 변경될때마다 재실행되어야 하는 함수 모음
    *********************************************************************************************************************** */

    document.body.addEventListener('change', () => {
        userLevelAndArmorToEvolution();
        // userLevelAccessoryToEnlight();
        // ellaOptionSetting(); // 엘라옵션 선택 조절
        showLeafInfo();
        enlightValueChange();
        avgLevelKarmaYN();

        keppAdvancedUpgradeValue();
    })
}






/* **********************************************************************************************************************
 * function name		:	secondClassCheck()
 * description			: 	2차 직업명
 *********************************************************************************************************************** */

async function secondClassCheck(data) {

    /* **********************************************************************************************************************
    * function name		:	Modules
    * description		: 	모든 외부모듈 정의
    *********************************************************************************************************************** */
    let Modules = await importModuleManager()

    let enlightenmentCheck = []
    let enlightenmentArry = []
    data.ArkPassive.Effects.forEach(function (arkArry) {
        if (arkArry.Name == '깨달음') {
            enlightenmentCheck.push(arkArry)
        }
    })


    function supportArkLeft(arkName) {
        arkName.map(function (arkNameArry) {
            // 아크이름 남기기
            let arkName = arkNameArry.Description.replace(/<[^>]*>/g, '').replace(/.*티어 /, '')
            enlightenmentArry.push(arkName)
        });
    }
    supportArkLeft(enlightenmentCheck)

    // 직업명 단축이름 출력
    let arkResult = ""
    try {
        Modules.originFilter.arkFilter.forEach(function (arry) {
            let arkInput = arry.name;
            let arkOutput = arry.initial;
            enlightenmentArry.forEach(function (supportCheckArry) {
                if (supportCheckArry.includes(arkInput) && data.ArkPassive.IsArkPassive) {
                    arkResult = arkOutput
                    return arkResult
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
    return arkResult
}



/* **********************************************************************************************************************
* function name		:	calculateGemData
* description	    :   보석정보 및 계산 모든 로직
*********************************************************************************************************************** */

async function calculateGemData(data) {

    /* **********************************************************************************************************************
    * function name		:	Modules
    * description		: 	모든 외부모듈 정의
    *********************************************************************************************************************** */
    let Modules = await importModuleManager()
    let supportCheck = await secondClassCheck(data)

    let gemObj = {
        atkBuff: 0,
        damageBuff: 0,
    };


    // 보석4종 레벨별 비율
    let gemPerObj = [
        { name: "겁화", level1: 8, level2: 12, level3: 16, level4: 20, level5: 24, level6: 28, level7: 32, level8: 36, level9: 40, level10: 44 },
        { name: "멸화", level1: 3, level2: 6, level3: 9, level4: 12, level5: 15, level6: 18, level7: 21, level8: 24, level9: 30, level10: 40 },
        { name: "홍염", level1: 2, level2: 4, level3: 6, level4: 8, level5: 10, level6: 12, level7: 14, level8: 16, level9: 18, level10: 20 },
        { name: "작열", level1: 6, level2: 8, level3: 10, level4: 12, level5: 14, level6: 16, level7: 18, level8: 20, level9: 22, level10: 24 },
        { name: "딜광휘", level1: 8, level2: 12, level3: 16, level4: 20, level5: 24, level6: 28, level7: 32, level8: 36, level9: 40, level10: 44 },
        { name: "쿨광휘", level1: 6, level2: 8, level3: 10, level4: 12, level5: 14, level6: 16, level7: 18, level8: 20, level9: 22, level10: 24 },
    ];


    let gemSkillArry = [];
    let specialClass;

    // 유저가 착용중인 보석,스킬 배열로 만들기
    if (!data.ArmoryGem.Gems) {
        return
    }
    data.ArmoryGem.Gems.forEach(function (gem) {
        let regex = />([^<]*)</g;
        let match;
        let results = [];
        while ((match = regex.exec(gem.Tooltip)) !== null) {
            results.push(match[1]);
        }
        // console.log(results)
        results.forEach(function (toolTip, idx) {
            toolTip = toolTip.replace(/"/g, '');
            if (toolTip.includes(data.ArmoryProfile.CharacterClassName) && /(^|[^"])\[([^\[\]"]+)\](?=$|[^"])/.test(toolTip) && toolTip.includes("Element")) {
                if (results[1].includes("광휘")) {
                    if (results.filter(arry => arry.includes("재사용 대기시간")).length > 0) {
                        results[1] = results[1].replace("광휘", "쿨광휘")
                    } else if (results.filter(arry => arry.includes("피해") || arry.includes("지원")).length > 0) {
                        results[1] = results[1].replace("광휘", "딜광휘")
                    }
                }
                let etcGemValue = results[idx + 2].substring(0, results[idx + 2].indexOf('"'));
                let gemName;
                let level = null;
                if (results[1].match(/홍염|작열|멸화|겁화|딜광휘|쿨광휘/) != null) {
                    gemName = results[1].match(/홍염|작열|멸화|겁화|딜광휘|쿨광휘/)[0];
                    level = Number(results[1].match(/(\d+)레벨/)[1]);
                } else {
                    gemName = "기타보석";
                }
                let obj = { skill: results[idx + 1], name: gemName, level: level };
                gemSkillArry.push(obj);
            } else if (!(toolTip.includes(data.ArmoryProfile.CharacterClassName)) && /(^|[^"])\[([^\[\]"]+)\](?=$|[^"])/.test(toolTip) && toolTip.includes("Element")) {  // 자신의 직업이 아닌 보석을 장착중인 경우
                let gemName;
                let level = null;
                if (results[1].match(/홍염|작열|멸화|겁화|딜광휘|쿨광휘/) != null) {
                    gemName = results[1].match(/홍염|작열|멸화|겁화|딜광휘|쿨광휘/)[0];
                    level = Number(results[1].match(/(\d+)레벨/)[1]);
                } else {
                    gemName = "기타보석";
                }
                let obj = { skill: "직업보석이 아닙니다", name: gemName, level: level };
                gemSkillArry.push(obj);
            }
        });
    });

    // console.log(gemSkillArry) // <= 유저가 착용중인 보석 정보

    let per = "홍염|작열|쿨광휘";
    let dmg = "겁화|멸화|딜광휘";

    function skillCheck(arr, ...nameAndGem) {
        for (let i = 0; i < nameAndGem.length; i += 2) {
            const name = nameAndGem[i];
            const gemPattern = nameAndGem[i + 1];
            const regex = new RegExp(gemPattern);
            const found = arr.some(item => item.skill === name && regex.test(item.name));
            if (!found) return false;
        }
        return true;
    }

    function classCheck(className) {
        return supportCheck == className;
    }

    const dmgGemCount = gemSkillArry.filter(item => new RegExp(dmg).test(item.name)).length;

    if (classCheck("전태") && skillCheck(gemSkillArry, "버스트 캐넌", dmg)) {
        specialClass = "버캐 채용 전태";
    } else if (classCheck("고기") && !skillCheck(gemSkillArry, "파이어 불릿", dmg)) {
        specialClass = "5겁 고기";
    } else if (classCheck("세맥") && dmgGemCount === 5) {
        specialClass = "5멸 세맥";
    } else if (classCheck("역천") && !skillCheck(gemSkillArry, "벽력장", dmg)) {
        specialClass = "5겁 역천";
    } else if (classCheck("핸건") && skillCheck(gemSkillArry, "데스파이어", dmg)) {
        specialClass = "7멸 핸건";
    } else if (classCheck("포강") && skillCheck(gemSkillArry, "에너지 필드", per) && skillCheck(gemSkillArry, "중력 폭발", dmg) && skillCheck(gemSkillArry, "공중 폭격", dmg) && skillCheck(gemSkillArry, "고압열탄", dmg)) {
        specialClass = "에필 5겁 포강";
    } else if (classCheck("포강") && skillCheck(gemSkillArry, "에너지 필드", per)) {
        specialClass = "에필 포강";
    } else if (classCheck("두동") && skillCheck(gemSkillArry, "블레이드 스톰", dmg)) {
        specialClass = "블스 두동";
    } else if (classCheck("두동") && !skillCheck(gemSkillArry, "애로우 해일", dmg) && skillCheck(gemSkillArry, "크레모아 지뢰", dmg)) {
        specialClass = "지뢰 두동";
    } else if (classCheck("질풍") && !skillCheck(gemSkillArry, "여우비 스킬", dmg)) {
        specialClass = "5멸 질풍";
    } else if (classCheck("그믐") && !skillCheck(gemSkillArry, "소울 시너스", dmg)) {
        specialClass = "데이터 없음";
    } else if (classCheck("광기") && !skillCheck(gemSkillArry, "소드 스톰", dmg) && !skillCheck(gemSkillArry, "마운틴 크래쉬", dmg)) {
        specialClass = "6겁 광기";
    } else if (classCheck("광기") && skillCheck(gemSkillArry, "소드 스톰", dmg) && skillCheck(gemSkillArry, "파워 브레이크", dmg)) {
        specialClass = "파브 광기";
    } else if (classCheck("광기") && !skillCheck(gemSkillArry, "소드 스톰", dmg) && skillCheck(gemSkillArry, "파워 브레이크", dmg)) {
        specialClass = "7겁 파브 광기";
    } else if (classCheck("광기") && !skillCheck(gemSkillArry, "소드 스톰", dmg)) {
        specialClass = "7겁 광기";
    } else if (classCheck("포식") && !skillCheck(gemSkillArry, "페이탈 소드", dmg) && skillCheck(gemSkillArry, "마운틴 클리브", dmg)) {
        specialClass = "마운틴 포식";
    } else if (classCheck("포식") && skillCheck(gemSkillArry, "크림슨 블레이드", dmg)) {
        specialClass = "크블 포식";
    } else if (classCheck("죽습") && skillCheck(gemSkillArry, "크레모아 지뢰", dmg)) {
        specialClass = "지뢰 죽습";
    } else if (classCheck("기술") && dmgGemCount === 5) {
        specialClass = "5겁 기술";
    } else if (classCheck("피메") && !skillCheck(gemSkillArry, "대재앙", dmg)) {
        specialClass = "6M 피메";
    } else if (classCheck("사시") && dmgGemCount === 6) {
        specialClass = "6겁 사시";
    } else if (classCheck("잔재") && dmgGemCount === 8) {
        specialClass = "8딜 잔재";
    } else if (classCheck("잔재") && skillCheck(gemSkillArry, "블리츠 러시", dmg) && skillCheck(gemSkillArry, "보이드 스트라이크", dmg) && !skillCheck(gemSkillArry, "터닝 슬래쉬", dmg) && skillCheck(gemSkillArry, "어스 슬래쉬", per)) {
        specialClass = "어슬 작열 슈차 잔재";
    } else if (classCheck("잔재") && skillCheck(gemSkillArry, "블리츠 러시", dmg) && !skillCheck(gemSkillArry, "터닝 슬래쉬", dmg) && skillCheck(gemSkillArry, "어스 슬래쉬", per)) {
        specialClass = "어슬 작열 블리츠 잔재";
    } else if (classCheck("잔재") && skillCheck(gemSkillArry, "블리츠 러시", dmg) && !skillCheck(gemSkillArry, "보이드 스트라이크", dmg)) {
        specialClass = "블리츠 잔재";
    } else if (classCheck("잔재") && skillCheck(gemSkillArry, "어스 슬래쉬", per)) {
        specialClass = "어슬 작열 잔재";
    } else if (classCheck("잔재") && skillCheck(gemSkillArry, "데스 센텐스", dmg) && skillCheck(gemSkillArry, "블리츠 러시", dmg) && skillCheck(gemSkillArry, "터닝 슬래쉬", dmg)) {
        specialClass = "슈차 7멸 잔재";
    } else if (classCheck("잔재") && skillCheck(gemSkillArry, "터닝 슬래쉬", dmg) && skillCheck(gemSkillArry, "블리츠 러시", dmg)) {
        specialClass = "슈차 터닝 잔재";
    } else if (classCheck("잔재") && skillCheck(gemSkillArry, "블리츠 러시", dmg)) {
        specialClass = "슈차 잔재";
    } else if (classCheck("오의") && skillCheck(gemSkillArry, "오의 : 풍신초래", dmg) && skillCheck(gemSkillArry, "오의 : 폭쇄진", dmg)) {
        specialClass = "밸패 오의";
    } else if (classCheck("오의") && !skillCheck(gemSkillArry, "오의 : 풍신초래", dmg)) {
        specialClass = "3오의";
    } else if (classCheck("체술") && dmgGemCount === 4) {
        specialClass = "4겁 체술";
    } else if (classCheck("체술") && dmgGemCount === 5) {
        specialClass = "5겁 체술";
    } else if (classCheck("체술") && !skillCheck(gemSkillArry, "일망 타진", dmg) && skillCheck(gemSkillArry, "심판", per)) {
        specialClass = "심판 체술";
    } else if (classCheck("일격") && skillCheck(gemSkillArry, "오의 : 뇌호격", dmg) && skillCheck(gemSkillArry, "오의 : 풍신초래", dmg) && skillCheck(gemSkillArry, "오의 : 호왕출현", dmg)) {
        specialClass = "4멸 일격";
    } else if (classCheck("일격") && !skillCheck(gemSkillArry, "오의 : 뇌호격", dmg) && skillCheck(gemSkillArry, "오의 : 풍신초래", dmg) && skillCheck(gemSkillArry, "오의 : 호왕출현", dmg)) {
        specialClass = "풍신 일격";
    } else if (classCheck("일격") && !skillCheck(gemSkillArry, "오의 : 뇌호격", dmg) && !skillCheck(gemSkillArry, "오의 : 풍신초래", dmg) && skillCheck(gemSkillArry, "오의 : 호왕출현", dmg) && skillCheck(gemSkillArry, "오의 : 폭쇄진", dmg)) {
        specialClass = "호왕 폭쇄 일격";
    } else if (classCheck("권왕") && dmgGemCount === 3) {
        specialClass = "3겁 권왕";
    } else if (classCheck("수라") && !skillCheck(gemSkillArry, "청월난무", dmg) && !skillCheck(gemSkillArry, "유성 낙하", dmg)) {
        specialClass = "4겁 수라";
    } else if (classCheck("수라") && skillCheck(gemSkillArry, "수라결 기본 공격", dmg) && skillCheck(gemSkillArry, "파천섬광", dmg) && skillCheck(gemSkillArry, "진 파공권", dmg) && skillCheck(gemSkillArry, "유성 낙하", dmg) && skillCheck(gemSkillArry, "청월난무", dmg) && skillCheck(gemSkillArry, "비상격", dmg)) {
        specialClass = "6겁 수라";
    } else if (classCheck("황제") && dmgGemCount === 4 && !skillCheck(gemSkillArry, "셀레스티얼 레인", dmg)) {
        specialClass = "또황";
    } else if (classCheck("억제") && skillCheck(gemSkillArry, "데몰리션", dmg) && (skillCheck(gemSkillArry, "그라인드 체인", dmg) || skillCheck(gemSkillArry, "스피닝 웨폰", dmg))) {
        specialClass = "반사멸 억모닉";
    } else if (classCheck("억제") && skillCheck(gemSkillArry, "데몰리션", dmg)) {
        specialClass = "사멸 억모닉";
    } else if (classCheck("질풍") && dmgGemCount === 6) {
        specialClass = "6멸 질풍";
    } else if (classCheck("질풍") && dmgGemCount === 5) {
        specialClass = "5멸 질풍";
    } else if (classCheck("이슬비") && skillCheck(gemSkillArry, "뙤약볕", dmg) && skillCheck(gemSkillArry, "싹쓸바람", dmg) && skillCheck(gemSkillArry, "소용돌이", dmg) && skillCheck(gemSkillArry, "여우비 스킬", dmg) && skillCheck(gemSkillArry, "소나기", dmg) && skillCheck(gemSkillArry, "날아가기", dmg) && skillCheck(gemSkillArry, "센바람", dmg)) {
        specialClass = "7겁 이슬비";
    } else if (classCheck("환각") || classCheck("서폿") || classCheck("진실된 용맹") || classCheck("회귀") || classCheck("환류") || classCheck("비기") || classCheck("교감") || classCheck("빛의 기사") || classCheck("업화") || classCheck("로어")) {
        specialClass = "데이터 없음";
    } else {
        specialClass = supportCheck;
    }


    const specialClassRules = [

        /*************************** 슈샤이어 ***************************/
        {
            class: "111 고기",
            conditions: [
                { core: "전술 제어", point: 14, support: "고기" },
                { core: "방어 전술", point: 14, support: "고기" },
                { core: "방어 포격", point: 14, support: "고기" },
            ]
        },
        {
            class: "311 고기",
            conditions: [
                { core: "종전", point: 14, support: "고기" },
                { core: "방어 전술", point: 14, support: "고기" },
                { core: "방어 포격", point: 14, support: "고기" },
            ]
        },
        {
            class: "313 고기",
            conditions: [
                { core: "종전", point: 14, support: "고기" },
                { core: "방어 전술", point: 14, support: "고기" },
                { core: "크로스 랜스", point: 14, support: "고기" },
            ]
        },
        {
            class: "331 고기",
            conditions: [
                { core: "종전", point: 14, support: "고기" },
                { core: "랜스 차지", point: 14, support: "고기" },
                { core: "방어 포격", point: 14, support: "고기" },
            ]
        },
        {
            class: "333 고기",
            conditions: [
                { core: "종전", point: 14, support: "고기" },
                { core: "랜스 차지", point: 14, support: "고기" },
                { core: "크로스 랜스", point: 14, support: "고기" },
            ]
        },
        {
            class: "222 전태",
            conditions: [
                { core: "연속 돌진", point: 14, support: "전태" },
                { core: "함성 돌진", point: 14, support: "전태" },
                { core: "전차 돌진", point: 14, support: "전태" },
            ]
        },
        {
            class: "222 비기",
            conditions: [
                { core: "오버 파워", point: 14, support: "비기" },
                { core: "오버 버스트", point: 17, support: "비기" },
                { core: "오버플로우", point: 17, support: "비기" },
            ]
        },
        {
            class: "러쉬 광기2",
            conditions: [
                { core: "다크 파워", point: 14, support: "광기" },
                { core: "어둠의 격류", point: 17, support: "광기" },
            ]
        },
        {
            class: "러쉬 광기",
            conditions: [
                { core: "다크 파워", point: 14, support: "광기" }
            ]
        },
        {
            class: "휠윈드 광기",
            conditions: [
                { core: "지옥 뒤집기", point: 14, support: "광기" }
            ]
        },
        {
            class: "231 포식",
            conditions: [
                { core: "예측불가", point: 14, support: "포식" },
                { core: "소용돌이", point: 14, support: "포식" },
                { core: "즉결 처형", point: 14, support: "포식" }
            ]
        },
        {
            class: "333 포식",
            conditions: [
                { core: "회오리", point: 14, support: "포식" },
                { core: "소용돌이", point: 14, support: "포식" },
                { core: "파괴의 바람", point: 14, support: "포식" }
            ]
        },
        {
            class: "허리케인 포식",
            conditions: [
                { core: "소용돌이", point: 10, support: "포식" }
            ]
        },
        {
            class: "허리케인 포식2",
            conditions: [
                { core: "파괴의 바람", point: 10, support: "포식" }
            ]
        },
        {
            class: "격노폭발 처단",
            conditions: [
                { core: "격노폭발", point: 17, support: "처단" }
            ]
        },
        {
            class: "노차징 고기",
            conditions: [
                { core: "스트라이크 포인트", point: 17, support: "고기" },
                { core: "창술", point: 14, support: "고기" }
            ]
        },
        {
            class: "어스 분망",
            conditions: [
                { core: "어스 웨이브", point: 17, support: "분망" }
            ]
        },
        {
            class: "붕쯔 중수",
            conditions: [
                { core: "그라비티 코어", point: 14, support: "중수" },
                { core: "몰아치는 중력", point: 14, support: "중수" },
                { core: "대지 부수기", point: 14, support: "중수" }
            ]
        },

        /*************************** 애니츠 ***************************/
        {
            class: "111 세맥",
            conditions: [
                { core: "임독양맥 타통", point: 14, support: "세맥" },
                { core: "귀환결", point: 14, support: "세맥" },
                { core: "벽파장공", point: 14, support: "세맥" },
            ]
        },
        {
            class: "333 세맥",
            conditions: [
                { core: "적수공권", point: 14, support: "세맥" },
                { core: "순섬보", point: 14, support: "세맥" },
                { core: "쌍파연격", point: 14, support: "세맥" },
            ]
        },
        {
            class: "111 역천",
            conditions: [
                { core: "기강결", point: 14, support: "역천" },
                { core: "금강진체", point: 14, support: "역천" },
                { core: "천화난무", point: 14, support: "역천" },

            ]
        },
        {
            class: "333 역천",
            conditions: [
                { core: "맹공", point: 14, support: "역천" },
                { core: "회기진천공", point: 14, support: "역천" },
                { core: "번천귀류", point: 14, support: "역천" },

            ]
        },
        {
            class: "222 역천",
            conditions: [
                { core: "기류탄화", point: 14, support: "역천" },
                { core: "열파전조", point: 14, support: "역천" },
                { core: "진혼섬포", point: 14, support: "역천" },

            ]
        },
        {
            class: "무공탄 역천",
            conditions: [
                { core: "기류탄화", point: 14, support: "역천" },
            ]
        },
        {
            class: "무공탄 역천2",
            conditions: [
                { core: "기류탄화", point: 14, support: "역천" },
                { core: "열파전조", point: 17, support: "역천" },
            ]
        },
        {
            class: "번천 역천",
            conditions: [
                { core: "맹공", point: 14, support: "역천" },

            ]
        },
        {
            class: "121 오의",
            conditions: [
                { core: "패황불패", point: 14, support: "오의" },
                { core: "화룡진천", point: 14, support: "오의" },
                { core: "창풍극의", point: 14, support: "오의" },

            ]
        },
        {
            class: "123 오의",
            conditions: [
                { core: "패황불패", point: 14, support: "오의" },
                { core: "화룡진천", point: 14, support: "오의" },
                { core: "패황권", point: 14, support: "오의" },

            ]
        },
        {
            class: "333 오의",
            conditions: [
                { core: "오기강체", point: 14, support: "오의" },
                { core: "심안", point: 14, support: "오의" },
                { core: "패황권", point: 14, support: "오의" },

            ]
        },
        {
            class: "111 절정",
            conditions: [
                { core: "적룡의 기운", point: 14, support: "절정" },
                { core: "일점 집중", point: 14, support: "절정" },
                { core: "진화의 끝", point: 14, support: "절정" },
            ]
        },
        {
            class: "222 절정",
            conditions: [
                { core: "적룡연격", point: 14, support: "절정" },
                { core: "집중 강화", point: 14, support: "절정" },
            ]
        },
        {
            class: "333 절정",
            conditions: [
                { core: "연가 창식", point: 14, support: "절정" },
                { core: "청룡기", point: 14, support: "절정" },
                { core: "맹룡 회도", point: 14, support: "절정" },
            ]
        },
        {
            class: "232 절제",
            conditions: [
                { core: "연가일섬", point: 14, support: "절제" },
                { core: "연환타격", point: 14, support: "절제" },
                { core: "환영", point: 14, support: "절제" },
            ]
        },
        {
            class: "콤보 절제",
            conditions: [
                { core: "연환 타격", point: 17, support: "절제" },
                { core: "연격 난무", point: 10, support: "절제" },

            ]
        },
        {
            class: "도약 체술",
            conditions: [
                { core: "반복 도약", point: 14, support: "체술" },
            ]
        },
        {
            class: "222 충단",
            conditions: [
                { core: "충격파", point: 14, support: "충단" },
                { core: "대지연타", point: 14, support: "충단" },
                { core: "지면분쇄", point: 14, support: "충단" },
            ]
        },
        {
            class: "333 충단",
            conditions: [
                { core: "충격 억제", point: 14, support: "충단" },
                { core: "기력 절약", point: 14, support: "충단" },
                { core: "역발산", point: 14, support: "충단" },
            ]
        },
        {
            class: "111 일격",
            conditions: [
                { core: "호령", point: 14, support: "일격" },
                { core: "천뢰포효", point: 14, support: "일격" },
                { core: "뇌호극권", point: 14, support: "일격" },
            ]
        },
        {
            class: "222 일격",
            conditions: [
                { core: "광폭", point: 14, support: "일격" },
                { core: "호뢰진", point: 14, support: "일격" },
                { core: "쌍극광폭진", point: 14, support: "일격" },
            ]
        },
        {
            class: "무한풍신 일격",
            conditions: [
                { core: "풍신", point: 14, support: "일격" },
                { core: "풍진천뢰", point: 14 }
            ]
        },
        {
            class: "111 난무",
            conditions: [
                { core: "광파섬", point: 14, support: "난무" },
                { core: "풍뢰보", point: 14, support: "난무" },
                { core: "신왕화신", point: 14, support: "난무" },
            ]
        },
        {
            class: "312 권왕",
            conditions: [
                { core: "충전된 충격", point: 14, support: "권왕" },
                { core: "권왕태세", point: 14, support: "권왕" },
                { core: "파천 돌파", point: 14, support: "권왕" },
            ]
        },
        {
            class: "진파천 권왕",
            conditions: [
                { core: "파천경", point: 14, support: "권왕" },
                { core: "진 파천섬광", point: 17 }
            ]
        },
        {
            class: "종횡무진 권왕",
            conditions: [
                { core: "종횡무진", point: 17, support: "권왕" },
            ]
        },
        {
            class: "322 수라",
            conditions: [
                { core: "그림자 주먹", point: 14, support: "수라" },
                { core: "수라결", point: 14, support: "수라" },
                { core: "수라", point: 14, support: "수라" },
            ]
        },
        /*************************** 아르데 ***************************/
        {
            class: "111 전탄",
            conditions: [
                { core: "블러드 하운드", point: 14, support: "전탄" },
                { core: "산탄강화", point: 14, support: "전탄" },
                { core: "탄환 폭발", point: 14, support: "전탄" },
            ]
        },
        {
            class: "333 전탄",
            conditions: [
                { core: "샷건 오버로드", point: 14, support: "전탄" },
                { core: "광란의 해결사", point: 14, support: "전탄" },
                { core: "지배자의 탄환", point: 14, support: "전탄" },
            ]
        },
        {
            class: "133 핸건",
            conditions: [
                { core: "섀도우 불릿", point: 14, support: "핸건" },
                { core: "이터널 리볼버", point: 14, support: "핸건" },
                { core: "끝없는 나선", point: 14, support: "핸건" },
            ]
        },
        {
            class: "222 죽습",
            conditions: [
                { core: "ATB-07 니들레인", point: 14, support: "죽습" },
                { core: "HSU-21 실버 레인", point: 14, support: "죽습" },
                { core: "HSU-17 일렉트릭 노바", point: 14, support: "죽습" }
            ]
        },
        {
            class: "311 죽습",
            conditions: [
                { core: "TA-12 버스팅 애로우", point: 14, support: "죽습" },
                { core: "HSU-98 버드 스트라이크", point: 14, support: "죽습" },
                { core: "HSU-04 자동 제어 스코프", point: 14, support: "죽습" }
            ]
        },
        {
            class: "333 죽습",
            conditions: [
                { core: "TA-12 버스팅 애로우", point: 14, support: "죽습" },
                { core: "HSU-13 특제 고폭약", point: 14, support: "죽습" },
                { core: "HSU-31 블록버스터", point: 14, support: "죽습" }
            ]
        },
        {
            class: "222 기술",
            conditions: [
                { core: "에이전트 SMG", point: 14, support: "기술" },
                { core: "불릿 템페스트", point: 14, support: "기술" }
            ]
        },
        {
            class: "333 포강",
            conditions: [
                { core: "포화 전차", point: 14, support: "포강" },
                { core: "세이프 존", point: 14, support: "포강" },
                { core: "초토화", point: 14, support: "포강" },
            ]
        },
        {
            class: "313 화강",
            conditions: [
                { core: "점핑맨", point: 14, support: "화강" },
                { core: "질풍 포병", point: 14, support: "화강" },
                { core: "오토 락온", point: 14, support: "화강" },
            ]
        },
        {
            class: "333 화강",
            conditions: [
                { core: "점핑맨", point: 14, support: "화강" },
                { core: "도약의 순간", point: 14, support: "화강" },
                { core: "오토 락온", point: 14, support: "화강" },
            ]
        },
        {
            class: "122 사시",
            conditions: [
                { core: "미드나잇 로즈", point: 14, support: "사시" },
                { core: "불릿 무빙", point: 14, support: "사시" },
                { core: "풀 매거진", point: 14, support: "사시" },
            ]
        },
        {
            class: "222 사시",
            conditions: [
                { core: "무법지대", point: 14, support: "사시" },
                { core: "불릿 무빙", point: 14, support: "사시" },
                { core: "풀 매거진", point: 14, support: "사시" },
            ]
        },
        {
            class: "레오불 사시",
            conditions: [
                { core: "풀 매거진", point: 14, support: "사시" }
            ]
        },
        /*************************** 데런 ***************************/
        {
            class: "111 갈증",
            conditions: [
                { core: "갈증의 악몽", point: 14, support: "갈증" },
                { core: "치명적 악몽", point: 14, support: "갈증" },
                { core: "급습 악몽", point: 14, support: "갈증" }
            ]
        },
        {
            class: "112 갈증",
            conditions: [
                { core: "갈증의 악몽", point: 14, support: "갈증" },
                { core: "치명적 악몽", point: 14, support: "갈증" },
                { core: "치명적 연계", point: 14, support: "갈증" }
            ]
        },
        {
            class: "111 버스트",
            conditions: [
                { core: "블레이드 버스트", point: 14, support: "버스트" },
                { core: "버스트 코어", point: 14, support: "버스트" },
                { core: "일격", point: 14, support: "버스트" },
            ]
        },
        {
            class: "111 잔재",
            conditions: [
                { core: "아츠 마스터", point: 14, support: "잔재" },
                { core: "아츠 코어", point: 14, support: "잔재" },
                { core: "기본기", point: 14, support: "잔재" },
            ]
        },
        {
            class: "222 그믐",
            conditions: [
                { core: "사신의 부름", point: 14, support: "그믐" },
                { core: "광월야", point: 14, support: "그믐" },
                { core: "사신의 힘", point: 14, support: "그믐" },
            ]
        },
        {
            class: "잠식 억모닉",
            conditions: [
                { core: "매시브 컨슘", point: 14, support: "억제" }
            ]
        },
        {
            class: "서징스톰 억제",
            conditions: [
                { core: "서징 스톰", point: 17, support: "억제" }
            ]
        },
        {
            class: "광월야 그믐",
            conditions: [
                { core: "광월야", point: 17, support: "그믐" }
            ]
        },
        /*************************** 실린 ***************************/
        {
            class: "112 교감",
            conditions: [
                { core: "정령 결속", point: 14, support: "교감" },
                { core: "결속 증폭", point: 14, support: "교감" },
                { core: "명령 각성", point: 14, support: "교감" }
            ]
        },
        {
            class: "고창 상소",
            conditions: [
                { core: "고대의 유산", point: 14, support: "상소" },
                { core: "오쉬의 지원", point: 14, support: "상소" }
            ]
        },
        {
            class: "333 점화",
            conditions: [
                { core: "종말의 시작", point: 14, support: "점화" },
                { core: "반복된 종말", point: 14, support: "점화" },
                { core: "종말의 시", point: 14, support: "점화" },
            ]
        },
        {
            class: "333 환류",
            conditions: [
                { core: "응축", point: 14, support: "환류" },
                { core: "와류", point: 14, support: "환류" },
                { core: "청뢰", point: 14, support: "환류" },
            ]
        },
        {
            class: "211 황제",
            conditions: [
                { core: "노말 인핸스", point: 14, support: "황제" },
                { core: "황제의 심장", point: 14, support: "황제" },
                { core: "다크 콜렉션", point: 14, support: "황제" },
            ]
        },
        {
            class: "212 황제",
            conditions: [
                { core: "노말 인핸스", point: 14, support: "황제" },
                { core: "황제의 심장", point: 14, support: "황제" },
                { core: "셔플 댄스", point: 14, support: "황제" },
            ]
        },
        {
            class: "233 황후",
            conditions: [
                { core: "인피니티 덱", point: 14, support: "황후" },
                { core: "루인 풀셋", point: 14, support: "황후" },
                { core: "루인 마이너셋", point: 14, support: "황후" },
            ]
        },
        {
            class: "체크메이트 황제",
            conditions: [
                { core: "임팩트 메이트", point: 10, support: "황제" },
                { core: "다크 메이트", point: 10, support: "황제" },
                { core: "스피드 메이트", point: 17, support: "황제" },
            ]
        },
        {
            class: "스파인플라워 황제",
            conditions: [
                { core: "셔플 댄스", point: 14, support: "황제" },
            ]
        },
        /*************************** 요즈 ***************************/
        {
            class: "111 질풍",
            conditions: [
                { core: "비연참", point: 14, support: "질풍" },
                { core: "우산의 춤", point: 14, support: "질풍" },
                { core: "휘몰아치기", point: 14, support: "질풍" },
            ]
        },
        {
            class: "333 질풍",
            conditions: [
                { core: "바람의 칼날", point: 14, support: "질풍" },
                { core: "쾌속", point: 14, support: "질풍" },
                { core: "강풍일섬", point: 14, support: "질풍" },
            ]
        },
        {
            class: "133 이슬비",
            conditions: [
                { core: "싸라기눈", point: 14, support: "이슬비" },
                { core: "뜨거운 햇볕", point: 14, support: "이슬비" },
                { core: "나그네의 외투를 벗긴건", point: 14, support: "이슬비" },
            ]
        },
        {
            class: "333 이슬비",
            conditions: [
                { core: "해와 바람", point: 14, support: "이슬비" },
                { core: "뜨거운 햇볕", point: 14, support: "이슬비" },
                { core: "나그네의 외투를 벗긴건", point: 14, support: "이슬비" },
            ]
        },
        {
            class: "112 환각",
            conditions: [
                { core: "무한 각성", point: 14, support: "환각" },
                { core: "환수 해방", point: 14, support: "환각" },
                { core: "붕붕 펀치", point: 14, support: "환각" },
            ]
        },
    ];





    const equippedCores = {};
    if (data.ArkGrid && Array.isArray(data.ArkGrid.Slots)) {
        for (const slot of data.ArkGrid.Slots) {
            if (slot && slot.Name && slot.Point) {
                equippedCores[slot.Name] = slot.Point;
            }
        }
    }


    const getPoint = (partialName) => {
        const fullName = Object.keys(equippedCores).find(name => name.includes(partialName));
        return fullName ? equippedCores[fullName] : 0;
    };


    const currentSupport = supportCheck;


    for (const rule of specialClassRules) {
        const isMatch = rule.conditions.every(condition => {
            const pointConditionMet = getPoint(condition.core) >= condition.point;
            // support 조건이 규칙에 정의되어 있을 때만 검사
            const supportConditionMet = !condition.support || currentSupport === condition.support;
            return pointConditionMet && supportConditionMet;
        });

        // 모든 조건이 맞으면, specialClass를 변경
        if (isMatch) {
            specialClass = rule.class;
            break;
        }
    }
    //console.log("보석전용 직업 : ", specialClass)


    {
        // (가장 간단하게) 보석체크용 헬퍼를 여기서 다시 선언해서 씀
        const per = "홍염|작열|쿨광휘";
        const dmg = "겁화|멸화|딜광휘";

        function skillCheck(arr, ...nameAndGem) {
            for (let i = 0; i < nameAndGem.length; i += 2) {
                const name = nameAndGem[i];
                const gemPattern = nameAndGem[i + 1];
                const regex = new RegExp(gemPattern);
                const found = arr.some(item => item.skill === name && regex.test(item.name));
                if (!found) return false;
            }
            return true;
        }

        const dmgGemCount = gemSkillArry.filter(item => new RegExp(dmg).test(item.name)).length;
        //console.log(gemSkillArry)
        if (specialClass === "111 일격" && skillCheck(gemSkillArry, "오의 : 호왕출현", dmg)) {
            specialClass = "111 일격 호왕";
        }
        else if (specialClass === "111 잔재" && skillCheck(gemSkillArry, "어스 슬래쉬", dmg) && dmgGemCount === 7) {
            specialClass = "111 잔재 7딜 어스"
        }
        else if (specialClass === "111 잔재" && skillCheck(gemSkillArry, "어스 슬래쉬", dmg) && dmgGemCount === 6) {
            specialClass = "111 잔재 7딜 어스 6겁"
        }
        else if (specialClass === "111 잔재" && skillCheck(gemSkillArry, "어스 슬래쉬", dmg) && dmgGemCount === 8) {
            specialClass = "111 잔재 8딜 어스"
        }
        else if (specialClass === "333 질풍" && skillCheck(gemSkillArry, "회오리 걸음", dmg) && dmgGemCount === 6) {
            specialClass = "333 질풍 회걸"
        }


        // 코어가 "111 세맥"으로 확정 + dmgGemCount 5면 또 분기
        else if (specialClass === "111 세맥" && dmgGemCount === 30) {
            specialClass = "111 5멸 세맥";
        }

        // “고기” 계열 코어(111/311/333/노차징 등) 모두에 적용
        else if (specialClass.includes("고기") && skillCheck(gemSkillArry, "슈퍼울트라메가톤파워", dmg)) {
            specialClass = "코어확정 + 5겁 고기";
        }
    }

    // console.log("보석전용 직업 : ", specialClass)
    gemSkillArry.forEach(function (gemSkill, idx) {
        let realClass = Modules.originFilter.classGemFilter.filter(item => item.class == specialClass);
        if (realClass.length == 0) {
            gemSkillArry[idx].skillPer = "none";
        } else {
            let realSkillPer = realClass[0].skill.filter(item => item.name == gemSkill.skill);
            if (realSkillPer[0] != undefined) {
                gemSkillArry[idx].skillPer = realSkillPer[0].per;
            } else {
                gemSkillArry[idx].skillPer = "none";
            }
        }
    });

    // 직업별 보석 지분율 필터
    let classGemEquip = Modules.originFilter.classGemFilter.filter(function (filterArry) {
        return filterArry.class == specialClass;
    });

    // console.log(classGemEquip[0])

    function gemCheckFnc() {
        try {
            // console.log(classGemEquip)
            let realGemValue = classGemEquip[0].skill.map(skillObj => {
                let matchValue = gemSkillArry.filter(item => item.skill == skillObj.name);
                if (!(matchValue.length == 0)) {
                    // console.log(matchValue)
                    return {
                        name: skillObj.name,
                        per: skillObj.per,
                        gem: matchValue,
                    };
                }
            }).filter(Boolean);

            //console.log(realGemValue)

            let coolGemCount = 0;
            let coolGemTotalWeight = 0;
            let weightedCoolValueSum = 0; // 가중치가 적용된 쿨감 수치 합계
            gemSkillArry.forEach(function (gemListArry) {
                if ((gemListArry.name == "홍염" || gemListArry.name == "작열" || gemListArry.name == "쿨광휘") && gemListArry.level != null && gemListArry.level >= 1 && gemListArry.skill !== "직업보석이 아닙니다") {
                    // if ((gemListArry.name == "홍염" || gemListArry.name == "작열") && gemListArry.level != null && gemListArry.level >= 1) {
                    const isImpulse = specialClass === "충동" && gemListArry.skill === "악마 스킬";
                    const isLegacy = specialClass === "유산" && gemListArry.skill === "싱크 스킬";
                    const isOtherClass = specialClass !== "충동" && specialClass !== "유산";

                    if (isImpulse || isLegacy || isOtherClass) {
                        // 해당 보석의 실제 쿨감 수치 가져오기
                        let gemType = gemPerObj.find(g => g.name === gemListArry.name);
                        let coolValue = gemType[`level${gemListArry.level}`];
                        let weight = Math.pow(2, gemListArry.level - 1);

                        // 가중치를 적용한 쿨감 수치 누적
                        weightedCoolValueSum += coolValue * weight;
                        coolGemTotalWeight += weight;
                        coolGemCount++;
                    }
                }
            });

            // 가중 평균 쿨감 수치 계산
            let averageValue = coolGemCount > 0 ? weightedCoolValueSum / coolGemTotalWeight : 0;

            let excludeSkills = ['수호의 연주', '신성한 보호', '빛의 광시곡'];

            //console.log("제외할 스킬 목록:", excludeSkills);

            // 특정 스킬 제외한 쿨감 계산
            let excludedCoolGemCount = 0;
            let sumCoolValues = 0;
            let excludedGems = [];

            gemSkillArry.forEach(function (gemListArry) {
                if ((gemListArry.name == "홍염" || gemListArry.name == "작열" || gemListArry.name == "쿨광휘") &&
                    gemListArry.level != null &&
                    gemListArry.level >= 1 &&
                    gemListArry.skill !== "직업보석이 아닙니다") {

                    // 제외할 스킬인지 확인
                    if (excludeSkills.includes(gemListArry.skill)) {
                        // 제외된 보석 정보 수집
                        excludedGems.push({
                            name: gemListArry.name,
                            skill: gemListArry.skill,
                            level: gemListArry.level
                        });
                        // 제외된 보석은 계산에서 제외
                    } else {
                        // 제외 대상이 아닌 보석만 계산에 포함
                        let gemType = gemPerObj.find(g => g.name === gemListArry.name);
                        let coolValue = gemType[`level${gemListArry.level}`];
                        // 단순히 쿨감 수치 합산 (가중치 없음)
                        sumCoolValues += coolValue;
                        excludedCoolGemCount++;
                    }
                }
            });


            let excludedAverageValue = excludedCoolGemCount > 0 ? sumCoolValues / excludedCoolGemCount : 0;

            let careSkills = ['수호의 연주', '윈드 오브 뮤직', '빛의 광시곡', '천상의 연주', '필법 : 흩뿌리기', '필법 : 콩콩이', '묵법 : 환영의 문', '묵법 : 해그리기', '묵법 : 미리내', '천상의 축복', '신성 지역', '신의 율법', '신성한 보호', '구원의 터', '구원의 은총'];

            // 특정 스킬만 대상으로 하는 쿨감 계산
            let careSkillGemCount = 0;
            let sumCareSkillCoolValues = 0;
            let careSkillGems = [];

            gemSkillArry.forEach(function (gemListArry) {
                if ((gemListArry.name == "홍염" || gemListArry.name == "작열" || gemListArry.name == "쿨광휘") &&
                    gemListArry.level != null &&
                    gemListArry.level >= 1 &&
                    gemListArry.skill !== "직업보석이 아닙니다") {

                    // 원하는 스킬인지 확인 (이 부분이 중요 - 포함여부 확인)
                    if (careSkills.includes(gemListArry.skill)) {
                        // 원하는 스킬의 보석 정보 수집
                        let gemType = gemPerObj.find(g => g.name === gemListArry.name);
                        let coolValue = gemType[`level${gemListArry.level}`];

                        // 원하는 스킬의 쿨감 수치 누적
                        sumCareSkillCoolValues += coolValue;
                        careSkillGemCount++;

                        careSkillGems.push({
                            name: gemListArry.name,
                            skill: gemListArry.skill,
                            level: gemListArry.level,
                            coolValue: coolValue
                        });
                    }
                }
            });

            // 원하는 스킬들만의 평균 쿨감 계산
            let careSkillAverageValue = careSkillGemCount > 0 ? sumCareSkillCoolValues / careSkillGemCount : 0;

            //console.log("원하는 스킬 보석 수:", careSkillGemCount);
            //console.log("원하는 스킬들의 평균 쿨감:", careSkillAverageValue);
            //console.log("원하는 스킬 보석 정보:", careSkillGems);

            //console.log("평균값 : " + averageValue) // <= 보석 쿨감 평균값

            let etcAverageValue;
            let dmgGemTotal = 0;
            let dmgCount = 0;

            // console.log(gemList)
            if (specialClass == "데이터 없음") {
                let totalWeight = 0;
                let dmgCount = 0;
                let weightedDmgSum = 0; // 가중치가 적용된 딜 증가율 합계
                gemSkillArry.forEach(function (gemListArry) {
                    // 멸화 또는 겁화 보석이고, 유효한 레벨을 가진 경우
                    if ((gemListArry.name == "멸화" || gemListArry.name == "겁화" || gemListArry.name == "딜광휘") && gemListArry.level != null && gemListArry.level >= 1) {
                        // 해당 보석의 실제 딜 증가율 가져오기
                        let gemType = gemPerObj.find(g => g.name === gemListArry.name);
                        let dmgPer = gemType[`level${gemListArry.level}`];

                        let weight = Math.pow(2, gemListArry.level - 1);

                        // 가중치를 적용한 딜 증가율 누적
                        weightedDmgSum += dmgPer * weight;
                        totalWeight += weight;
                        dmgCount++;
                    }
                });

                if (dmgCount > 0) {
                    // 가중 평균 딜 증가율 계산
                    etcAverageValue = (weightedDmgSum / totalWeight) / 100 + 1;
                } else {
                    // 멸화/겁화 보석이 없는 경우
                    etcAverageValue = 1;
                }
            } else {
                etcAverageValue = 1;
            }

            // 실제 유저가 장착한 보석의 딜 비율을 가져오는 함수
            function getLevels(gemPerObj, skillArray) {
                let result = [];
                skillArray.forEach(skill => {
                    if (skill.per != "etc") {
                        skill.gem.forEach(gem => {
                            let gemObj = gemPerObj.find(gemPerObj => gemPerObj.name == gem.name && (gem.name == "겁화" || gem.name == "멸화" || gem.name == "딜광휘"));
                            if (!(gemObj == undefined)) {
                                let level = gemObj[`level${gem.level}`];
                                result.push({ skill: skill.name, gem: gem.name, per: level, skillPer: skill.per });
                            }
                        });
                    } else if (skill.per == "etc") {
                        skill.gem.forEach(gem => {
                            let gemObj = gemPerObj.find(gemPerObj => gemPerObj.name == gem.name && (gem.name == "겁화" || gem.name == "멸화" || gem.name == "딜광휘"));
                            if (!(gemObj == undefined)) {
                                let level = gemObj[`level${gem.level}`];
                                result.push({ skill: skill.name, gem: gem.name, per: level, skillPer: etcValue / etcLength });
                            }
                        });
                    }
                });
                return result;
            }
            //console.log(getLevels(gemPerObj, realGemValue))
            let gemValue = getLevels(gemPerObj, realGemValue).reduce((gemResultValue, finalGemValue) => {
                return gemResultValue + finalGemValue.per * finalGemValue.skillPer;
            }, 0);

            // special skill Value 값 계산식
            function specialSkillCalc() {
                let result = 0;
                classGemEquip[0].skill.forEach(function (skill) {
                    if (skill.per != "etc") {
                        result += skill.per;
                    }
                });
                return 1 / result;
            }

            return {
                specialSkill: specialSkillCalc(),
                originGemValue: gemValue,
                gemValue: (gemValue * specialSkillCalc()) / 100 + 1,
                gemAvg: averageValue,
                etcAverageValue: etcAverageValue,
                averageValue: averageValue,  // 보석 쿨감 평균값
                gemSkillArry: gemSkillArry,    // 유저가 착용중인 보석
                excludedGemAvg: excludedAverageValue,
                careSkillAvg: careSkillAverageValue
            };
        } catch (error) {
            console.error("Error in gemCheckFnc:", error);
            return {
                averageValue: averageValue,  // 보석 쿨감 평균값
                gemSkillArry: gemSkillArry,    // 유저가 착용중인 보석
                specialSkill: 1,
                originGemValue: 1,
                gemValue: 1,
                gemAvg: 0,
                etcAverageValue: 1,
                excludedGemAvg: 0,
                careSkillAvg: 0
            };
        }
    }
    //console.log(gemCheckFnc())
    return gemCheckFnc()
}



/* **********************************************************************************************************************
* function name		:   optionElementAutoCheck(element, selectValue, tag)
* description	    :   조건과 일치하는 option값을 자동으로 선택함
 
* parameter         :   element
* description       :   선택할 select 요소
* parameter         :   selectValue
* description       :   선택할 select의 option의 조건
* parameter         :   tag
* description       :   option의 value, textContent중 어느것을 기준으로 선택하는지 정함
*********************************************************************************************************************** */
function optionElementAutoCheck(element, selectValue, tag) {
    if (!element) {
        console.error("element is null or undefined in armorAutoCheck");
        return;
    }
    if (tag === "value") {
        for (let i = 0; i < element.options.length; i++) {
            if (element.options[i].value == selectValue) {
                element.selectedIndex = i;
                return;
            }
        }
    } else if (tag === "textContent") {
        for (let i = 0; i < element.options.length; i++) {
            if (element.options[i].textContent.trim() == selectValue) {
                element.selectedIndex = i;
                return;
            }
        }
    }
    console.warn(`No matching option found for ${selectValue} in ${tag}`);
}

/* **********************************************************************************************************************
* function name		:   betweenTextExtract
* description	    :   >< 사이의 텍스트 문자열을 배열로 추출함
 
* parameter         :   inputString
* description       :   텍스트 문자열
*********************************************************************************************************************** */

function betweenTextExtract(inputString) {
    if (typeof inputString !== 'string') {
        console.error("Error: Input must be a string.");
        return [];
    }
    const regex = />([\s\S]*?)</g;

    let matches;
    const extractedTexts = [];

    while ((matches = regex.exec(inputString)) !== null) {
        extractedTexts.push(matches[1].trim());
    }

    return extractedTexts;
}


/* **********************************************************************************************************************
* function name		:	createSpinButton()
* description	    : 	spin-btn클래스를 가진 요소들에 spin버튼을 생성함
*********************************************************************************************************************** */

function createSpinButton() {
    let spinElements = document.querySelectorAll(".spin-wrapper");

    spinElements.forEach(element => {
        element.addEventListener("click", (e) => {
            let btnType = e.target.classList.value;
            let spinInput = element.querySelector("select");
            let index = spinInput.selectedIndex;
            let maxIndex = spinInput.options.length - 1;
            let minIndex = 0;
            if (btnType === "up" && maxIndex > index) {
                if (!spinInput.options[spinInput.selectedIndex + 1].disabled) {
                    spinInput.selectedIndex = index + 1;
                    spinInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            } else if (btnType === "down" && minIndex < index) {
                if (!spinInput.options[spinInput.selectedIndex - 1].disabled) {
                    spinInput.selectedIndex = index - 1;
                    spinInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        })
    })
}
createSpinButton()

/* **********************************************************************************************************************
* function name		:	createNumpad
* description	    : 	number타입의 input을 쉽게 입력할 수 있도록 넘패드를 생성함
*********************************************************************************************************************** */

function createNumpad() {
    const numpadTemplate = `
        <div class="numeric-keyboard-layout js-n-keyboard" id="dynamic-numpad" style="background-color:#fff">
            <p style="text-align:center;border-bottom:1px solid #767676;padding:3px 0;">키보드 입력도 가능</p>
            <ul class="list-num">
                <li><button type="button" id="1" name="1" value="1" class="btn-num js-btn-number">1</button></li>
                <li><button type="button" id="2" name="2" value="2" class="btn-num js-btn-number">2</button></li>
                <li><button type="button" id="3" name="3" value="3" class="btn-num js-btn-number">3</button></li>
                <li><button type="button" id="4" name="4" value="4" class="btn-num js-btn-number">4</button></li>
                <li><button type="button" id="5" name="5" value="5" class="btn-num js-btn-number">5</button></li>
                <li><button type="button" id="6" name="6" value="6" class="btn-num js-btn-number">6</button></li>
                <li><button type="button" id="7" name="7" value="7" class="btn-num js-btn-number">7</button></li>
                <li><button type="button" id="8" name="8" value="8" class="btn-num js-btn-number">8</button></li>
                <li><button type="button" id="9" name="9" value="9" class="btn-num js-btn-number">9</button></li>
                <li><button type="button" class="btn-num btn-none js-btn-close"><small class="sr-only">닫기</small></button></li>
                <li><button type="button" id="0" name="0" value="0" class="btn-num js-btn-number">0</button></li>
                <li><button type="button" id="backspace" name="backspace" class="btn-num btn-none js-btn-backspace">&#9003</button></li>
            </ul>
        </div>
    `;

    let currentInput = null;
    let numpadElement = null;
    let isNumpadActive = false;

    // Add focus event listener to input
    document.querySelectorAll('.js-trigger-numpad').forEach(function (input) {
        input.addEventListener('focus', function (event) {
            if (isNumpadActive) {
                removeNumpad();
            }

            currentInput = this;
            if (currentInput.value === "0") {
                currentInput.value = "";
            }
            const numpad = document.createElement('div');
            numpad.innerHTML = numpadTemplate;
            document.body.appendChild(numpad);

            numpadElement = document.getElementById("dynamic-numpad");
            isNumpadActive = true;

            const inputRect = currentInput.getBoundingClientRect();
            const numpadRect = numpadElement.getBoundingClientRect();
            const inputCenterX = inputRect.left + window.scrollX + (inputRect.width / 2);
            const numpadLeft = inputCenterX - (numpadRect.width / 2);

            numpadElement.style.top = `${inputRect.bottom + window.scrollY + 10}px`;
            numpadElement.style.left = `${numpadLeft}px`;

            addNumpadListeners();
            document.addEventListener('click', handleDocumentClick);
            // Add keydown event listener for Enter key
            currentInput.addEventListener('keydown', handleEnterKey);
        });
    });

    function addNumpadListeners() {
        document.querySelectorAll('.js-btn-number').forEach(function (button) {
            button.addEventListener('click', function (e) {
                if (currentInput) {
                    currentInput.value += this.value;
                }
            });
        });

        document.querySelectorAll('.js-btn-backspace').forEach(function (button) {
            button.addEventListener('click', function (e) {
                if (currentInput) {
                    currentInput.value = currentInput.value.slice(0, -1);
                }
            });
        });

        document.querySelectorAll('.js-btn-close').forEach(function (button) {
            button.addEventListener('click', function (e) {
                if (currentInput) {
                    removeNumpad();
                }
            });
        });
    }

    function removeNumpad() {
        if (numpadElement) {
            numpadElement.remove();
            numpadElement = null;
            isNumpadActive = false;
            document.removeEventListener('click', handleDocumentClick);
            currentInput.dispatchEvent(new Event('change', { bubbles: true }));
            if (currentInput) {
                currentInput.removeEventListener('keydown', handleEnterKey);
            }
        }
    }

    function handleDocumentClick(event) {
        if (currentInput && !currentInput.contains(event.target) && numpadElement && !numpadElement.contains(event.target)) {
            removeNumpad();
            currentInput.blur();
            currentInput = null;
        }
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            removeNumpad();
            currentInput.blur();
            currentInput = null;
        }
    }
}
createNumpad();

/* **********************************************************************************************************************
 * function name		:	armoryLevelCalc()
 * description			: 	사용자가 선택한 장비 level stat special 객체 반환
 *********************************************************************************************************************** */

async function armoryLevelCalc(Modules) {
    let result = []
    let armorNameElements = document.querySelectorAll(".armor-item .armor-tag");
    let startLevelElements = document.querySelectorAll(".armor-item .plus");
    let normaleUpgradeLevelElements = document.querySelectorAll(".armor-item .armor-name");
    let advancedUpgradeLevelElements = document.querySelectorAll(".armor-item .armor-upgrade");

    for (let i = 0; i < armorNameElements.length; i++) {
        let startLevelValue = Number(startLevelElements[i].value)
        let normaleUpgradeLevelValue = Number(normaleUpgradeLevelElements[i].value * 5)
        let advancedUpgradeLevelValue = Number(advancedUpgradeLevelElements[i].value)
        let obj = {
            name: armorNameElements[i].textContent,
            level: startLevelValue + normaleUpgradeLevelValue + advancedUpgradeLevelValue,
            special: advancedUpgradeLevelValue
        }
        result.push(obj)
    }

    let armorObj = []
    armorPartObjCreate(Modules.simulatorData.helmetlevels, result[0].level, result[0].special, "투구", Modules.simulatorData.helmetHealthLevels)           // 투구
    armorPartObjCreate(Modules.simulatorData.shoulderlevels, result[1].level, result[1].special, "어깨", Modules.simulatorData.shoulderHealthLevels)           // 어깨
    armorPartObjCreate(Modules.simulatorData.toplevels, result[2].level, result[2].special, "상의", Modules.simulatorData.topHealthLevels)           // 상의
    armorPartObjCreate(Modules.simulatorData.bottomlevels, result[3].level, result[3].special, "하의", Modules.simulatorData.bottomHealthLevels)           // 하의
    armorPartObjCreate(Modules.simulatorData.gloveslevels, result[4].level, result[4].special, "장갑", Modules.simulatorData.gloveHealthLevels)           // 장갑

    if (result[5].level < 100) {
        let tierElement = document.querySelectorAll(".armor-area .armor-item")[5].querySelector(".plus").value;
        let ellaLevelArry1 = [1100, 1200, 1300, 1400, 1500, 1600, 1650, 1665, 1680];
        let ellaLevelArry2 = [1100, 1200, 1300, 1400, 1500, 1600, 1675, 1695, 1715, 1745];
        let advancedLevel = Number(advancedUpgradeLevelElements[5].value);
        if (tierElement === "1") { // 엘라1
            let normalLevel = ellaLevelArry1[Number(normaleUpgradeLevelElements[5].value)];
            armorPartObjCreate(Modules.simulatorData.estherEllaLevels, normalLevel + advancedLevel, advancedLevel, "무기")           // 엘라1
        } else if (tierElement === "2") { // 엘라2
            let normalLevel = ellaLevelArry2[Number(normaleUpgradeLevelElements[5].value)]
            armorPartObjCreate(Modules.simulatorData.estherElla2Levels, normalLevel + advancedLevel, advancedLevel, "무기")           // 엘라2
        } else if (tierElement === "0") { // 엘라0
            armorPartObjCreate(Modules.simulatorData.estherEllaLevels, 0, 0, "무기")           // 엘라0
        }
    } else {
        armorPartObjCreate(Modules.simulatorData.weaponlevels, result[5].level, result[5].special, "무기")
    }

    function armorPartObjCreate(armorData, resultObj, advancedLevel, tag, healthData) {
        let obj = armorData.find(part => part.level === resultObj);
        if (!obj) { return; }
        obj = { ...obj };
        obj.name = tag;

        let originalStat = obj.stat;
        if (advancedLevel === 40) {
            obj.stat = Math.floor(originalStat * 1.05);
        } else if (advancedLevel >= 30) {
            obj.stat = Math.floor(originalStat * 1.02);
        }

        // 체력
        if (healthData) {
            let healthObj = healthData.find(part => part.level === resultObj);
            if (healthObj) {
                obj.health = healthObj.health;

                let originalHealth = obj.health;
                if (advancedLevel === 40) {
                    obj.health = Math.floor(originalHealth * 1.05);
                } else if (advancedLevel >= 30) {
                    obj.health = Math.floor(originalHealth * 1.02);
                }
            }
        }

        armorObj.push(obj);
    }

    let armorStats = armorObj.filter(obj => !(/무기|에스더/.test(obj.name)))
    let weaponStats = armorObj.find(obj => (/무기|에스더/.test(obj.name)))

    function sumStats(stats) {
        if (!Array.isArray(stats)) {
            return 0;
        }
        let totalStat = 0;
        for (const armor of stats) {
            if (typeof armor.stat !== 'number') {
                continue;
            }
            totalStat += armor.stat;
        }
        return totalStat;
    }

    // 체력 합계
    function sumHealth(stats) {
        if (!Array.isArray(stats)) {
            return 0;
        }
        let totalHealth = 0;
        for (const armor of stats) {
            if (armor.health && typeof armor.health === 'number') {
                totalHealth += armor.health;
            }
        }
        return totalHealth;
    }

    let returnObj = {
        armorStats: sumStats(armorStats),
        weaponStats: weaponStats.stat,
        level: armorObj,
        healthStats: sumHealth(armorStats)
    }
    return returnObj;
}

/* **********************************************************************************************************************
 * function name		:	simulatorReset
 * description			: 	버튼을 클릭시 초기 설정으로 돌아감
 *********************************************************************************************************************** */
function simulatorReset() {
    let element = document.querySelector("span.reset-area");
    element.addEventListener("click", () => { location.reload() })
}
simulatorReset()

/* **********************************************************************************************************************
 * function name		:	createTooltip() <== layout.js로 이전함
 * description			: 	.tooltip-text 클래스를 가진 요소에 마우스 오버 시 툴팁을 생성하고, select 요소의 경우 선택된 option의 텍스트를 표시합니다.
 *********************************************************************************************************************** */
// function createTooltip() {
//     const hoverElements = document.querySelectorAll('.tooltip-text');
//     let tooltip = null;

//     hoverElements.forEach(element => {
//         element.addEventListener('mouseover', (event) => {
//             // 툴팁 생성
//             tooltip = document.createElement('div');
//             tooltip.classList.add('tooltip');
//             document.body.appendChild(tooltip);

//             // 툴팁 내용 설정
//             if (element.tagName === 'SELECT') {
//                 tooltip.textContent = element.options[element.selectedIndex].textContent;
//             } else {
//                 tooltip.textContent = element.textContent;
//             }

//             // 툴팁 위치 설정
//             updateTooltipPosition(event);
//         });

//         element.addEventListener('mousemove', (event) => {
//             // 툴팁 위치 업데이트
//             updateTooltipPosition(event);
//         });

//         element.addEventListener('mouseout', () => {
//             // 툴팁 제거
//             if (tooltip) {
//                 tooltip.remove();
//                 tooltip = null;
//             }
//         });
//     });

//     function updateTooltipPosition(event) {
//         if (tooltip) {
//             const mouseX = event.clientX;
//             const mouseY = event.clientY;
//             const tooltipWidth = tooltip.offsetWidth;
//             const tooltipHeight = tooltip.offsetHeight;

//             // 툴팁이 화면을 벗어나지 않도록 조정
//             let tooltipX = mouseX + 10; // 마우스 오른쪽으로 10px 이동
//             let tooltipY = mouseY + 10; // 마우스 아래로 10px 이동

//             // 스크롤 위치를 고려하여 툴팁 위치 조정
//             tooltipX += window.scrollX;
//             tooltipY += window.scrollY;

//             if (tooltipX + tooltipWidth > window.innerWidth + window.scrollX) {
//                 tooltipX = mouseX - tooltipWidth - 10 + window.scrollX; // 마우스 왼쪽으로 이동
//             }

//             if (tooltipY + tooltipHeight > window.innerHeight + window.scrollY) {
//                 tooltipY = mouseY - tooltipHeight - 10 + window.scrollY; // 마우스 위쪽으로 이동
//             }

//             tooltip.style.left = `${tooltipX}px`;
//             tooltip.style.top = `${tooltipY}px`;
//         }
//     }
// }
// window.addEventListener("load", createTooltip);
