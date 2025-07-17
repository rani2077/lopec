/* **********************************************************************************************************************
* variable name		:	mobileCheck
* description       : 	현재 접속한 디바이스 기기가 모바일, 태블릿일 경우 true를 반환
*********************************************************************************************************************** */
let mobileCheck = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(navigator.userAgent.toLowerCase())
/* **********************************************************************************************************************
 * function name		:	importModuleManager() <== import 전역화로 인한 미사용
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
    ];
    const promisesToLoad = [];
    const loadedModuleKeys = [];
    // potentialModules 목록을 순회하며 모든 모듈을 로드 대상에 추가
    for (const moduleInfo of potentialModules) {
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

async function mainSearchFunction() {

    const urlParams = new URLSearchParams(window.location.search);
    // const nameParam = urlParams.get('headerCharacterName');
    const nameParam = urlParams.get('headerCharacterName').trim();
    document.title = `로펙 : ${nameParam}님의 스펙포인트 및 환산점수`
    // let Modules = await importModuleManager();
    let component = await Modules.component;
    /* **********************************************************************************************************************
    * function name		:	scProfileSkeleton
    * description       : 	scProfile컴포넌트의 스켈레톤 html
    *********************************************************************************************************************** */
    let scProfileSkeleton = await component.scProfileSkeleton();
    document.querySelector(".wrapper").insertAdjacentHTML('afterbegin', scProfileSkeleton);
    // let scNavElement = await component.scNav(nameParam)
    document.querySelector(".sc-profile").insertAdjacentHTML('afterend', await component.scNav(nameParam));
    document.querySelector(".wrapper").style.display = "block";

    /* **********************************************************************************************************************
    * function name		:	
    * description       : 	
    *********************************************************************************************************************** */
    let apiData = await Modules.apiCalcValue.apiCalcValue(nameParam);
    console.log("API데이터", apiData)
    let data = apiData.data;
    let dataBaseResponse = apiData.dataBase;
    let extractValue = apiData.extractValue;
    let specPoint = apiData.calcValue;

    console.log("스펙포인트", specPoint)
    // console.log("오리진obj", extractValue);

    await Modules.fetchApi.clearLostarkApiCache(nameParam, document.querySelector(".sc-info .spec-area span.reset"));

    /* **********************************************************************************************************************
    * function name		:	
    * description       : 	user정보가 로딩완료 시 scProfile을 재생성함
    *********************************************************************************************************************** */
    document.querySelector(".sc-profile").outerHTML = await component.scProfile(data, extractValue, dataBaseResponse);
    // document.querySelector(".sc-profile").outerHTML = await component.scProfile(data, extractValue, userDbInfo.characterRanking.RANKING_NUM, userDbInfo.classRanking.CLASS_RANK);

    /* **********************************************************************************************************************
    * function name		:	specAreaCreate
    * description       : 	spec-area html을 생성함
    *********************************************************************************************************************** */
    function specAreaCreate() {
        let specAreaElement = document.querySelector(".sc-info .group-info .spec-area");
        let nowSpecElement = specAreaElement.querySelector(".spec-point");
        let gaugeElement = specAreaElement.querySelector(".gauge-box");
        let tierImageElement = specAreaElement.querySelector(".tier-box > img");

        //브론즈 500미만
        //실버 500+
        //골드 700+
        //다이아 900+
        //마스터 1000+
        //에스더 1300+

        let gradeImageSrc = "";
        console.log(specPoint.tierInfoObj)
        let gaugePercent = (specPoint.completeSpecPoint - specPoint.tierInfoObj.nowTierValue) / (specPoint.tierInfoObj.nextTierValue - specPoint.tierInfoObj.nowTierValue) * 100;
        let gauge = "";
        if (specPoint.tierInfoObj.nextTierNameEng) {
            gauge = `
            <div class="gauge">
                <span class="tier now ${specPoint.tierInfoObj.tierNameEng}">${specPoint.tierInfoObj.tierNameKor}</span>
                <span class="tier next ${specPoint.tierInfoObj.nextTierNameEng}">${specPoint.tierInfoObj.nextTierNameKor}</span>
                <span class="value">${Math.floor(specPoint.completeSpecPoint)}/${specPoint.tierInfoObj.nextTierValue}</span>
                <i class="bar" style="clip-path: polygon(0 0, ${gaugePercent}% 0, ${gaugePercent}% 100%, 0% 100%);"></i>
            </div>`;
        } else {
            gauge = `
                <div class="gauge">
                    <span class="tier now">에스더</span>
                    <span class="value">최고티어달성</span>
                    <i class="bar" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);"></i>
                </div>`;
        }

        gaugeElement.innerHTML = gauge;
        if (localStorage.getItem("gemSet")) nowSpecElement.style.color = "#e44103";
        nowSpecElement.innerHTML = (specPoint.completeSpecPoint).toFixed(2).replace(/\.(\d{2})$/, ".<i style='font-size:20px'>$1</i>");

        // bestSpecElement.innerHTML = "다이아몬드 티어<br> 마스터까지 앞으로 100점!";
        tierImageElement.setAttribute("src", `${baseUrl}/image/${specPoint.tierInfoObj.tierNameEng}.png`);
    }
    specAreaCreate()

    /* **********************************************************************************************************************
    * function name		:	detailAreaCreate
    * description       : 	detail-area html을 생성함
    *********************************************************************************************************************** */



    /* **********************************************************************************************************************
    * function name		:	gemAreaCreate
    * description       : 	gem-area html을 생성함
    *********************************************************************************************************************** */
    function gemAreaCreate() {
        let element = document.querySelector(".sc-info .group-equip .gem-area");
        let gemArray = extractValue.htmlObj.gemSkillArry;
        let gemBox = ""
        if (gemArray.length !== 0) {
            gemArray.forEach((gemItem, idx) => {
                let sortTag = 0;
                if (/멸화|겁화|딜광휘/.test(gemItem.name)) {
                    sortTag = 1;
                } else {
                    sortTag = 2;
                }
                let grade = data.ArmoryGem.Gems[idx].Grade;
                let gradeClassName = "";
                if (grade === "고대") {
                    gradeClassName = "ultra-background";
                } else if (grade === "유물") {
                    gradeClassName = "rare-background";
                } else if (grade === "전설") {
                    gradeClassName = "common-background";
                } else if (grade === "영웅") {
                    gradeClassName = "hero-background";
                }
                let gemDealInfo = "";
                if (/홍염|작열|쿨광휘/.test(gemItem.name)) {
                    gemDealInfo = gemItem.skill;
                } else {
                    gemDealInfo = `${gemItem.skill} <br> 딜 지분 : ${gemItem.skillPer !== "none" ? `${(gemItem.skillPer * 100).toFixed(1)}%` : "데이터 없음"}`;
                };
                gemBox += `
                <div class="gem-box radius ${gradeClassName}">
                    <img src="${data.ArmoryGem.Gems[idx].Icon}" alt="" style="border-radius:3px;">
                    <span class="level">${gemItem.level}</span>
                    <span class="detail">${gemDealInfo}</span>
                    <i style="display:none;">${sortTag}</i>
                </div>`
            })
            gemBox += `
                <div class="gem-box radius free-set">
                    <span class="save">저 장</span>
                    <span class="load">로 드</span>
                    <span class="reset">리 셋</span>
                    <span class="blind level">9</span>
                    <i style="display:none;">3</i>
                </div>`
            element.innerHTML = gemBox;
        } else if (gemArray.length === 0) {
            for (let i = 0; i < 11; i++) {
                gemBox += `
                <div class="gem-box radius empty">
                    <img src="/asset/image/skeleton-img.png" alt="" style="border-radius:3px;">
                    <span class="level">N</span>
                    <span class="detail">보석없음</span>
                    <i style="display:none;">1</i>
                </div>`
            }
            gemBox += `
                <div class="gem-box radius free-set">
                    <span class="save">저 장</span>
                    <span class="load">로 드</span>
                    <span class="reset">리 셋</span>
                    <span class="blind level">9</span>
                    <i style="display:none;">3</i>
                </div>`
            element.innerHTML = gemBox;

        }
        Modules.component.gemFreeSetSave(data)

    }
    gemAreaCreate()
    /* **********************************************************************************************************************
    * function name		:	gemSort()
    * description       : 	보석을 정렬함
    *********************************************************************************************************************** */
    async function gemSort() {
        const parent = document.querySelector('.sc-info .gem-area');
        const children = Array.from(parent.children);
        // 순서정렬
        children.sort((a, b) => {
            const iA = parseInt(a.querySelector('i').textContent);
            const iB = parseInt(b.querySelector('i').textContent);
            const levelA = parseInt(a.querySelector('.level').textContent);
            const levelB = parseInt(b.querySelector('.level').textContent);
            if (iA === iB) {
                return levelB - levelA;
            }
            return iA - iB;
        });
        // 정렬되지 않은 html 제거
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        // 정렬된 html 추가
        children.forEach(child => parent.appendChild(child));
    }
    gemSort()

    /* **********************************************************************************************************************
    * function name		:	armorAreaCreate
    * description       : 	armor-area html을 생성함
    *********************************************************************************************************************** */
    function armorAreaCreate() {
        let elements = document.querySelectorAll(".group-equip .armor-area .armor-item");
        let helmetElement = elements[0];
        let shoulderElement = elements[1];
        let topElement = elements[2];
        let bottomElement = elements[3];
        let gloveElement = elements[4];
        let weaponElement = elements[5];

        extractValue.htmlObj.armoryInfo.forEach(item => {
            let progressClassName = "";
            if (item.quality < 10) {
                progressClassName = "common";
            } else if (item.quality < 30) {
                progressClassName = "uncommon";
            } else if (item.quality < 70) {
                progressClassName = "rare";
            } else if (item.quality < 90) {
                progressClassName = "epic";
            } else if (item.quality < 100) {
                progressClassName = "legendary";
            } else if (item.quality === '100') {
                progressClassName = "mythic";
            }

            let backgroundClassName = "";
            if (item.grade === "고대") {
                backgroundClassName = "ultra";
            } else if (item.grade === "유물") {
                backgroundClassName = "rare";
            } else if (item.grade === "영웅") {
                backgroundClassName = "hero";
            }

            let advancedLevel = "";
            if (item.advancedLevelIndex !== -1) {
                advancedLevel = "X" + item.advancedLevel;
            }
            let elixirWrap = ""
            if (item.elixir.length !== 0) {
                let spanElixir = ""
                item.elixir.forEach(elixirItem => {
                    spanElixir += `<span class="elixir radius"> ${elixirItem.name} ${elixirItem.level}</span>`;
                });
                elixirWrap = `
                    <div class="elixir-wrap">
                        ${spanElixir}
                    </div>`
            };
            let hyperWrap = ""
            if (item.hyperIndex !== -1) {
                hyperWrap = `
                    <div class="hyper-wrap">
                        <span class="hyper"><img src="https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/game/ico_tooltip_transcendence.png" alt="꽃모양 아이콘">${item.hyperStar}</span>
                        <span class="level">${item.hyperLevel}단계</span>
                    </div>`
            }
            let armorItem = `
            <li class="armor-item">
                <div class="img-box radius ${backgroundClassName}-background">
                    <img src="${item.icon}" alt="착용장비프로필">
                    <span class="tier">${item.tier === "E" ? "E" : "T" + item.tier}</span>
                    <span class="progress ${progressClassName}-progressbar">${item.quality}</span>
                </div>
                <div class="text-box">
                    <div class="name-wrap">
                        <span class="tag"></span>
                        <span class="armor-name">${item.name} <strong style="font-weight:600;">${advancedLevel}</strong></span>
                    </div>
                    ${elixirWrap}
                    ${hyperWrap}
                </div>
            </li>`

            if (item.type === "투구") {
                helmetElement.outerHTML = armorItem;
            } else if (item.type === "어깨") {
                shoulderElement.outerHTML = armorItem;
            } else if (item.type === "상의") {
                topElement.outerHTML = armorItem;
            } else if (item.type === "하의") {
                bottomElement.outerHTML = armorItem;
            } else if (item.type === "장갑") {
                gloveElement.outerHTML = armorItem;
            } else if (item.type === "무기") {
                weaponElement.outerHTML = armorItem;
            }
        })
    }
    armorAreaCreate()
    /* **********************************************************************************************************************
    * function name		:	armorItemDetailInfoCreate
    * description       : 	armor-item 엘릭서 초월 정보 html을 생성함
    *********************************************************************************************************************** */
    function armorItemDetailInfoCreate() {
        let elixirDouble = ["회심", "달인 (", "강맹", "칼날방패", "선봉대", "행운", "선각자", "진군", "신념"]
        // extractValue.htmlObj.armoryInfo[i].elixir[i]
        let allElixirData = [];
        extractValue.htmlObj.armoryInfo.forEach(item => {
            if (item.elixir && Array.isArray(item.elixir)) {
                allElixirData = allElixirData.concat(item.elixir);
            }
        });
        let specialElixir = allElixirData.filter(elixir => elixirDouble.find(double => elixir.name.includes(double)));
        specialElixir = specialElixir.map(elixir => elixir.name.replace(/\([^)]*\)/g, '').trim())
        function countDuplicates(arr) {
            const counts = {};
            for (const item of arr) {
                counts[item] = (counts[item] || 0) + 1;
            }
            let mostFrequent = null;
            let maxCount = 0;
            for (const item in counts) {
                if (counts[item] > 1) { // 중복된 값만 고려
                    if (counts[item] > maxCount) {
                        maxCount = counts[item];
                        mostFrequent = { name: item, count: counts[item] };
                    }
                }
            }
            return mostFrequent;
        }
        let elixirResult = "비활성화";
        if (countDuplicates(specialElixir) !== null && countDuplicates(specialElixir).count > 1) {
            elixirResult = countDuplicates(specialElixir).name + " 2단계"
        }
        function elixirLevelSum(array) {
            let sumValue = 0;
            array.forEach(item => {
                let value = Number(item.level.match(/Lv\.(\d+)/)[1]);
                sumValue += value;
            })
            return sumValue
        }
        let elixirProgressClassName = "";
        if (elixirLevelSum(allElixirData) < 35) {
            elixirProgressClassName = "common"
        } else if (elixirLevelSum(allElixirData) < 40) {
            elixirProgressClassName = "epic"
        } else if (elixirLevelSum(allElixirData) < 50) {
            elixirProgressClassName = "legendary"
        } else if (elixirLevelSum(allElixirData) < 999) {
            elixirProgressClassName = "mythic"
        }

        let hyperStarArray = extractValue.htmlObj.armoryInfo.map(item => item.hyperStar);
        function hyperAvgValue(array) {
            let sumValue = 0;
            let obj = {};
            array.forEach(item => {
                sumValue += Number(item);
            })
            obj.avgValue = sumValue / array.length;
            obj.sumValue = sumValue;

            return obj;
        }
        let hyperProgressClassName = "";
        if (hyperAvgValue(hyperStarArray).sumValue < 100) {
            hyperProgressClassName = "common"
        } else if (hyperAvgValue(hyperStarArray).sumValue < 120) {
            hyperProgressClassName = "epic"
        } else if (hyperAvgValue(hyperStarArray).sumValue < 126) {
            hyperProgressClassName = "legendary"
        } else if (hyperAvgValue(hyperStarArray).sumValue < 999) {
            hyperProgressClassName = "mythic"
        }

        let element = document.querySelectorAll(".sc-info .group-equip .armor-item")[6];
        element.innerHTML = `
            <div class="img-box radius ultra-background">
                <img src="/asset/image/elixir.png" alt="">
                <span class="progress ${elixirProgressClassName}-progressbar">${elixirLevelSum(allElixirData)}</span>
            </div>
            <div class="text-box">
                <div class="name-wrap">엘릭서</div>
                <div class="name-wrap">${elixirResult}</div>
            </div>
            <div class="img-box radius ultra-background">
                <img src="/asset/image/hyper.png" alt="">
                <span class="progress ${hyperProgressClassName}-progressbar">${hyperAvgValue(hyperStarArray).sumValue}</span>
            </div>
            <div class="text-box">
                <div class="name-wrap">초월</div>
                <div class="name-wrap">평균 ${hyperAvgValue(hyperStarArray).avgValue.toFixed(1)}성</div>
            </div>`
    }
    armorItemDetailInfoCreate()

    /* **********************************************************************************************************************
    * function name		:	accessoryAreaCreate
    * description       : 	accessory-area html을 생성함
    *********************************************************************************************************************** */
    function accessoryAreaCreate() {
        let elements = document.querySelectorAll(".group-equip .accessory-area .accessory-item");
        let necklaceElement = elements[0];
        let earringElement1 = elements[1];
        let earringElement2 = elements[2];
        let ringElement1 = elements[3];
        let ringElement2 = elements[4];

        let earringCount = 0;
        let ringCount = 0;
        extractValue.htmlObj.accessoryInfo.forEach(accessory => {

            let grindingWrap = ``;
            if (accessory.accessory && accessory.accessory.length > 0) {
                accessory.accessory.forEach(item => {
                    let grade = item.split(":")[1];
                    let name = item.split(":")[0];
                    let gradeName = "";
                    if (grade === "high") {
                        gradeName = "상";
                    } else if (grade === "middle") {
                        gradeName = "중";
                    } else if (grade === "low") {
                        gradeName = "하";
                    }
                    grindingWrap += `
                    <div class="grinding-wrap">
                        <span class="quality ${grade}">${gradeName}</span>
                        <span class="option">${name}</span>
                    </div>`;
                });
            }

            let statsPercent = 0;
            if (accessory.type === "목걸이") {
                statsPercent = (accessory.stats - 15178) / (17857 - 15178) * 100
            } else if (accessory.type === "귀걸이") {
                if (earringCount === 0) {
                    statsPercent = (accessory.stats - 11806) / (13889 - 11806) * 100
                } else {
                    statsPercent = (accessory.stats - 11806) / (13889 - 11806) * 100
                }
            } else if (accessory.type === "반지") {
                if (ringCount === 0) {
                    statsPercent = (accessory.stats - 10962) / (12897 - 10962) * 100
                } else {
                    statsPercent = (accessory.stats - 10962) / (12897 - 10962) * 100
                }
            }
            //console.log(statsPercent)


            let progressClassName = "";
            if (statsPercent < 50) {
                progressClassName = "epic";
            } else if (statsPercent < 90) {
                progressClassName = "legendary";
            } else if (statsPercent < 101) {
                progressClassName = "mythic";
            }

            let backgroundClassName = "";
            if (accessory.grade === "고대") {
                backgroundClassName = "ultra";
            } else if (accessory.grade === "유물") {
                backgroundClassName = "rare";
            } else if (accessory.grade === "영웅") {
                backgroundClassName = "hero";
            }




            let accessoryItem = `
                <div class="img-box radius ${backgroundClassName}-background">
                    <img src="${accessory.icon}" alt="">
                    <span class="tier">T${accessory.tier}</span>
                    <span class="progress ${progressClassName}-progressbar">${statsPercent.toFixed(1)}%</span>
                </div>
                <div class="option-box">
                    <div class="text-box">
                        ${grindingWrap}
                    </div>

                </div>`
            if (accessory.type === "목걸이") {
                necklaceElement.innerHTML = accessoryItem;
            } else if (accessory.type === "귀걸이") {
                if (earringCount === 0) {
                    earringElement1.innerHTML = accessoryItem;
                    earringCount++;
                } else {
                    earringElement2.innerHTML = accessoryItem;
                }
            } else if (accessory.type === "반지") {
                if (ringCount === 0) {
                    ringElement1.innerHTML = accessoryItem;
                    ringCount++;
                } else {
                    ringElement2.innerHTML = accessoryItem;
                }
            }
        })
    }
    accessoryAreaCreate()

    /* **********************************************************************************************************************
    * function name		:	stoneItemCreate
    * description       : 	steon-item html을 생성함
    *********************************************************************************************************************** */
    function stoneItemCreate() {
        let element = document.querySelectorAll(".group-equip .accessory-area .accessory-item")[5];
        let stone = extractValue.htmlObj.stoneInfo;
        if (stone) {
            let buff = "";
            stone.optionArray.forEach(item => {
                let minus = "";
                if (item.name.includes("감소")) {
                    minus = "minus";
                }
                buff += `<span class="buff ${minus}">${item.name} Lv.${item.level}</span>`
            })

            let backgroundClassName = "";
            if (stone.grade === "고대") {
                backgroundClassName = "ultra";
            } else if (stone.grade === "유물") {
                backgroundClassName = "rare";
            } else if (stone.grade === "영웅") {
                backgroundClassName = "hero";
            }

            let progressClassName = "";
            if (stone.grade === "고대") {
                progressClassName = "mythic";
            } else if (stone.grade === "유물") {
                progressClassName = "relics";
            }


            element.innerHTML = `
                <div class="img-box radius ${backgroundClassName}-background">
                    <img src="${stone.icon}" alt="">
                    <span class="tier">T${stone.tier}</span>
                    <span class="progress ${progressClassName}-progressbar">${stone.grade}</span>
                </div>

                <div class="option-box">
                    <span class="option">${stone.name}</span>

                    <div class="buff-wrap">
                        ${buff}
                    </div>

                </div>`
        }

    }
    stoneItemCreate()

    /* **********************************************************************************************************************
    * function name		:	bangleItemCreate
    * description       : 	bangle-item html을 생성함
    *********************************************************************************************************************** */
    function bangleItemCreate() {
        let element = document.querySelectorAll(".group-equip .accessory-area .accessory-item")[6];
        let bangle = extractValue.htmlObj.bangleInfo;
        if (bangle) {

            let backgroundClassName = "";
            if (bangle.grade === "고대") {
                backgroundClassName = "ultra";
            } else if (bangle.grade === "유물") {
                backgroundClassName = "rare";
            } else if (bangle.grade === "영웅") {
                backgroundClassName = "hero";
            }

            let progressClassName = "";
            if (bangle.grade === "고대") {
                progressClassName = "mythic";
            } else if (bangle.grade === "유물") {
                progressClassName = "relics";
            }

            let optionWrap = "";
            if (bangle.specialStatsArray.length !== 0) {
                let option = "";
                bangle.specialStatsArray.forEach(item => {
                    option += `<span class="option">${item.trim()}</span>`
                })
                optionWrap = `
                    <div class="option-wrap">
                        ${option}
                    </div>`
            }

            let grindingWrap = "";
            if (bangle.optionArray.length !== 0) {
                bangle.optionArray.forEach(item => {
                    let grade = "";
                    if (item.grade === "상") {
                        grade = "high";
                    } else if (item.grade === "중") {
                        grade = "middle";
                    } else if (item.grade === "하") {
                        grade = "low";
                    }
                    grindingWrap += `
                        <div class="grinding-wrap">
                            <span class="quality ${grade}">${item.grade}</span>
                            <span class="option">${item.name}</span>
                        </div>`
                })
            }
            if (bangle.normalStatsArray.length !== 0) {
                bangle.normalStatsArray.forEach(item => {
                    let gradeClassName = "";
                    let gradeName = "";
                    let value = Number(item.match(/\d+/)[0]);
                    if (/힘|민첩|지능/.test(item)) {
                        if (bangle.tier == 3 && bangle.grade === "유물") {
                            if (value >= 1500 && value <= 2500) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 2501 && value <= 3250) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 3251 && value <= 4000) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        } else if (bangle.tier == 3 && bangle.grade === "고대") {
                            if (value >= 2500 && value <= 3500) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 3501 && value <= 4250) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 4251 && value <= 5000) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        } else if (bangle.tier == 4 && bangle.grade === "유물") {
                            if (value >= 6400 && value <= 8960) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 8961 && value <= 10880) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 10881 && value <= 12800) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        } else if (bangle.tier == 4 && bangle.grade === "고대") {
                            if (value >= 9600 && value <= 12160) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 12161 && value <= 14080) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 14081 && value <= 16000) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        }

                    } else if (/체력/.test(item)) {
                        if (bangle.tier == 3 && bangle.grade === "유물") {
                            if (value >= 500 && value <= 1500) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 1501 && value <= 2250) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 2251 && value <= 3000) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        } else if (bangle.tier == 3 && bangle.grade === "고대") {
                            if (value >= 1500 && value <= 2500) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 2501 && value <= 3250) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 3251 && value <= 4000) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        } else if (bangle.tier == 4 && bangle.grade === "유물") {
                            if (value >= 3000 && value <= 3800) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 3801 && value <= 4400) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 4401 && value <= 5000) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        } else if (bangle.tier == 4 && bangle.grade === "고대") {
                            if (value >= 4000 && value <= 4800) {
                                gradeClassName = "low";
                                gradeName = "하";
                            } else if (value >= 4801 && value <= 5400) {
                                gradeClassName = "middle";
                                gradeName = "중";
                            } else if (value >= 5401 && value <= 6000) {
                                gradeClassName = "high";
                                gradeName = "상";
                            }
                        }
                    }
                    grindingWrap += `
                        <div class="grinding-wrap">
                            <span class="quality ${gradeClassName}">${gradeName}</span>
                            <span class="option">${item.trim()}</span>
                        </div>`
                })
            }
            element.innerHTML = `
                <div class="img-box radius ${backgroundClassName}-background">
                    <img src="${bangle.icon}" alt="">
                    <span class="tier">T${bangle.tier}</span>
                    <span class="progress ${progressClassName}-progressbar">${bangle.grade}</span>
                </div>
                <div class="option-box">
                    ${optionWrap}
                    <div class="text-box">
                        ${grindingWrap}
                    </div>

                </div>`
        }
    }
    bangleItemCreate();

    /* **********************************************************************************************************************
    * function name		:	arkAreaCreate
    * description       : 	ark-area html을 생성함
    *********************************************************************************************************************** */
    function arkAreaCreate() {
        let elements = document.querySelector(".sc-info .group-equip .ark-area");
        let evolutionElement = elements.querySelector(".ark-list.evolution");
        let enlightenmentElement = elements.querySelector(".ark-list.enlightenment");
        let leapElement = elements.querySelector(".ark-list.leap");

        let evolutionPoint = data.ArkPassive.Points[0].Value;
        let enlightenmentPoint = data.ArkPassive.Points[1].Value;
        let leapPoint = data.ArkPassive.Points[2].Value;

        let arkItemEvolution = `
        <div class="title-box evolution">
            <span class="tag">진화</span>
            <span class="title">${evolutionPoint}</span>
        </div>`;
        let arkItemEnlightenment = `
        <div class="title-box enlightenment">
            <span class="tag">깨달음</span>
            <span class="title">${enlightenmentPoint}</span>
        </div>`;
        let arkItemLeap = `
        <div class="title-box leap">
            <span class="tag">도약</span>
            <span class="title">${leapPoint}</span>
        </div>`;
        data.ArkPassive.Effects.forEach(arkData => {
            let betweenText = arkData.Description.match(/>([^<]+)</g)?.map(match => match.slice(1, -1)) || [];

            let tier = betweenText[1].match(/\d+/)[0];
            let arkItem =
                `<li class="ark-item">
                    <div class="img-box">
                        <span class="tier">${tier}</span>
                        <img src="${arkData.Icon}" alt="">
                    </div>
                    <div class="text-box">
                        <span class="name">${betweenText[2].trim()}</span>
                    </div>
                </li>`
            if (arkData.Name === "진화") {
                arkItemEvolution += arkItem;
            } else if (arkData.Name === "깨달음") {
                arkItemEnlightenment += arkItem;
            } else if (arkData.Name === "도약") {
                arkItemLeap += arkItem;
            }
        })
        evolutionElement.innerHTML = arkItemEvolution;
        enlightenmentElement.innerHTML = arkItemEnlightenment;
        leapElement.innerHTML = arkItemLeap;
    }
    arkAreaCreate();

    /* **********************************************************************************************************************
    * function name		:	engravingAreaCreate
    * description       : 	engraving-area html을 생성함
    *********************************************************************************************************************** */
    function engravingAreaCreate() {
        let element = document.querySelector(".sc-info .group-system .engraving-area");
        if (extractValue.htmlObj.engravingInfo.length !== 0) {
            let engravingBox = "";
            extractValue.htmlObj.engravingInfo.forEach(engraving => {
                let gradeIconClassName = "";
                if (engraving.grade === "유물") {
                    gradeIconClassName = "orange"
                } else if (engraving.grade === "고대") {
                    gradeIconClassName = "yellow"
                } else if (engraving.grade === "영웅") {
                    gradeIconClassName = "puple"
                }
                let abilityStone = "";
                if (engraving.stone) {
                    abilityStone += `
                    <div class="ability-ico engraving-ico"></div>
                    <span class="ability-level">LV.${engraving.stone}</span>`;
                } else if (engraving.stone <= -1) {
                    abilityStone += `
                        <div class="ability-ico engraving-ico red"></div>
                        <span class="ability-level">LV.-${engraving.stone}</span>`;
                }
                engravingBox += `
                <div class="engraving-box">
                    <img src="${engraving.icon}" class="engraving-img" alt="">
                    <div class="relic-ico engraving-ico ${gradeIconClassName}"></div>
                    <span class="grade orange">X ${engraving.level}</span>
                    <span class="engraving-name">${engraving.name}</span>
                    ${abilityStone}
                    </div>`;
            })
            element.innerHTML = engravingBox;
        }
    }
    engravingAreaCreate();

    /* **********************************************************************************************************************
    * function name		:	karmaAreaCreate
    * description       : 	karma-area 상세정보의 내용을 생성함
    *********************************************************************************************************************** */
    function karmaAreaCreate() {
        let elements = document.querySelectorAll(".sc-info .group-system .karma-area .karma");
        let evolutionKarmaRankElement = elements[0].querySelector(".rank");
        let enlightenmentKarmaRankElement = elements[1].querySelector(".rank");
        let leapKarmaRankElement = elements[2].querySelector(".rank");

        // 자바스크립트에서 0을 false로 취급하기 때문에 +1
        let evolutionKarmaRankText = extractValue.karmaObj.evolutionKarmaRank !== null ? `${extractValue.karmaObj.evolutionKarmaRank}랭크` : "미등록"
        let enlightenmentKarmaRankText = extractValue.karmaObj.enlightKarmaRank + 1 ? `${extractValue.karmaObj.enlightKarmaRank}랭크` : "미등록"
        let leapKarmaRankText = extractValue.karmaObj.leapKarmaRank + 1 ? `${extractValue.karmaObj.leapKarmaRank}랭크` : "미등록"

        evolutionKarmaRankElement.textContent = evolutionKarmaRankText;
        enlightenmentKarmaRankElement.textContent = enlightenmentKarmaRankText;
        leapKarmaRankElement.textContent = leapKarmaRankText;
    }
    karmaAreaCreate();
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
        // 오늘 날짜를 YYYYMMDDHHmmss형식으로 가져옴
        function nowDate() {
            const now = new Date(); // 현재 날짜와 시간을 가지는 Date 객체 생성

            const year = now.getFullYear(); // 년도 (예: 2025)
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요), 두 자릿수로 패딩
            const day = now.getDate().toString().padStart(2, '0'); // 일, 두 자릿수로 패딩
            const hours = now.getHours().toString().padStart(2, '0'); // 시, 두 자릿수로 패딩 (24시간 형식)
            const minutes = now.getMinutes().toString().padStart(2, '0'); // 분, 두 자릿수로 패딩
            const seconds = now.getSeconds().toString().padStart(2, '0'); // 초, 두 자릿수로 패딩

            // 모든 구성 요소를 결합하여 "YYYYMMDDHHmmss" 형식의 문자열 생성
            const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

            return formattedDateTime;
        }

        let dealerMedianValue = extractValue.htmlObj.medianInfo.dealerMedianValue;
        let supportMedianValue = extractValue.htmlObj.medianInfo.supportMedianValue;
        let supportMinMedianValue = extractValue.htmlObj.medianInfo.supportMinMedianValue;
        let supportMaxMedianValue = extractValue.htmlObj.medianInfo.supportMaxMedianValue;
        let dealerMinMedianValue = extractValue.htmlObj.medianInfo.dealerMinMedianValue;
        let dealerMaxMedianValue = extractValue.htmlObj.medianInfo.dealerMaxMedianValue;
        let currentSupportScore = specPoint.completeSpecPoint;
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

        let bestSpecPoint;
        let archiveDate;

        let gemSetCheck = localStorage.getItem('gemSet');
        let devilDmgCheck = localStorage.getItem("devilDamage")
        if (
            apiData.calcValue.completeSpecPoint > apiData.dataBase.totalSum &&          // 계산된 스펙포인트가 DB값보다 큰 경우
            devilDmgCheck !== "true" &&                                                 // 악추피 체크를 안한 경우
            !gemSetCheck                                                                // 저장된 보석설정을 로드한 경우

        ) {
            bestSpecPoint = apiData.calcValue.completeSpecPoint;
            archiveDate = formatDate(nowDate());
        } else {
            bestSpecPoint = apiData.dataBase.totalSum;
            archiveDate = formatDate(apiData.dataBase.achieveDate);
        }
        bestSpecPoint = bestSpecPoint.toFixed(2);

        let specPointInfo = [
            { name: "달성 최고 점수", value: bestSpecPoint, icon: "medal-solid" },
            { name: "현재 레벨 중앙값", value: dealerMedianValue, icon: "chart-simple-solid" },
            { name: "인게임 전투력", value: data.ArmoryProfile.CombatPower.replace(/,/g, ''), icon: "bolt-lightning-solid" },
        ]
        let armorInfo = [
            { name: "공격력", value: Number(specPoint.dealerAttackPowResult).toFixed(0), icon: "bolt-solid" },
            { name: "엘릭서", value: Number(specPoint.dealerExlixirValue).toFixed(2) + "%", icon: "flask-solid" },
            { name: "초월", value: Number(specPoint.dealerHyperValue).toFixed(2) + "%", icon: "star-solid" },
            { name: "악세", value: Number(specPoint.dealerAccValue).toFixed(2) + "%", icon: "circle-notch-solid" },
            { name: "팔찌", value: Number(specPoint.dealerBangleResult).toFixed(2) + "%", icon: "ring-solid" },
            { name: "각인", value: Number(specPoint.dealerEngResult).toFixed(2) + "%", icon: "book-solid" },
        ]
        let arkPassiveInfo = [
            { name: "진화", value: Number(specPoint.dealerEvloutionResult).toFixed(0) + "%", icon: "fire-solid" },
            { name: "깨달음", value: Number(specPoint.dealerEnlightResult).toFixed(0) + "%", icon: "lightbulb-solid" },
            { name: "도약", value: Number(specPoint.dealerLeapResult).toFixed(0) + "%", icon: "feather-pointed-solid" },
        ]
        let gemInfo;
        if (extractValue.etcObj.gemCheckFnc.originGemValue === 0) {
            gemInfo = [
                { name: "보석 실질 딜증", value: Number((extractValue.etcObj.gemCheckFnc.etcAverageValue - 1) * 100).toFixed(2) + "%", icon: "gem-solid", question: "보석을 통해 얻은 스킬 대미지 증가량" },
                { name: "보석 최종 딜증", value: Number((extractValue.etcObj.gemCheckFnc.etcAverageValue - 1) * 100).toFixed(2) + "%", icon: "gem-solid", question: "보석 순수 딜증 x 보정치로 인한 최종 딜증값으로, 스펙포인트에 적용되는 값" },
                { name: "보석 쿨감", value: Number(extractValue.etcObj.gemCheckFnc.gemAvg).toFixed(2) + "%", icon: "gem-solid", question: "보석 평균 쿨감 수치" },
                { name: "보석 보정치", value: Number(extractValue.etcObj.gemCheckFnc.specialSkill).toFixed(2), icon: "gem-solid", question: "보석에 포함되지 않는 스킬 및 효과를 보정하기 위한 계수. 직각 별로 고정값이며, 소수점 두 번째 자리까지만 표시" },
            ]
        } else {
            gemInfo = [
                { name: "보석 실질 딜증", value: Number(extractValue.etcObj.gemCheckFnc.originGemValue).toFixed(2) + "%", icon: "gem-solid", question: "보석을 통해 얻은 스킬 대미지 증가량" },
                { name: "보석 최종 딜증", value: Number((extractValue.etcObj.gemCheckFnc.gemValue - 1) * 100).toFixed(2) + "%", icon: "gem-solid", question: "보석 순수 딜증 x 보정치로 인한 최종 딜증값으로, 스펙포인트에 적용되는 값" },
                { name: "보석 쿨감", value: Number(extractValue.etcObj.gemCheckFnc.gemAvg).toFixed(2) + "%", icon: "gem-solid", question: "보석 평균 쿨감 수치" },
                { name: "보석 보정치", value: Number(extractValue.etcObj.gemCheckFnc.specialSkill).toFixed(2), icon: "gem-solid", question: "보석에 포함되지 않는 스킬 및 효과를 보정하기 위한 계수. 직각 별로 고정값이며, 소수점 두 번째 자리까지만 표시" },
            ]
        }

        let supportSpecPointInfo = [
            { name: "달성 최고 점수", value: bestSpecPoint, icon: "medal-solid" },
            { name: "현재 레벨 중앙값", value: supportMedianValue, icon: "chart-simple-solid" }, //value: supportMedianValue
            { name: "인게임 전투력", value: data.ArmoryProfile.CombatPower.replace(/,/g, ''), icon: "bolt-lightning-solid" },
            //{ name: "딜러 환산 점수", value: dealerSupportConversion.toFixed(2), icon: "arrows-left-right-to-line-solid" },
            //{ name: "최고 점수 달성일", value: archiveDate, icon: "calendar-check-solid" },
        ]
        let supportImportantBuffInfo = [
            //{ name: "공격력 증가", value: Number(specPoint.supportFinalAtkBuff).toFixed(0) /* 추가됨 */, icon: "bolt-solid" },
            { name: "종합 버프력", value: Number(specPoint.supportAvgBuffPower).toFixed(2) /* 추가됨 */ + "%", icon: "bolt-solid" },
            { name: "케어력", value: Number(specPoint.supportCarePowerResult).toFixed(2) + "%", icon: "shield-halved-solid" },
            { name: "유틸력", value: Number(specPoint.supportUtilityPower).toFixed(2) /* 추가됨 */ + "%", icon: "gear-solid" },
        ]
        let supportBuffInfo = [
            { name: "낙인력", value: Number(specPoint.supportStigmaResult).toFixed(1) + "%", icon: "bullseye-solid" },
            { name: "상시버프", value: Number(specPoint.supportAllTimeBuff).toFixed(2) + "%", icon: "wand-magic-solid" },
            { name: "풀버프", value: Number(specPoint.supportFullBuff).toFixed(2) + "%", icon: "wand-magic-sparkles-solid" },
            //{ name: "종합버프", value: Number(specPoint.supportTotalAvgBuff).toFixed(2) /* 추가됨 */ + "%", icon: "wand-magic-sparkles-solid" },
            { name: "팔찌", value: Number(specPoint.supportBangleResult).toFixed(2) + "%", icon: "ring-solid" },
        ]
        let supportUtilizationRate = [
            { name: "아덴 가동률", value: Number(specPoint.supportIdentityUptime).toFixed(2) /* 추가됨 */ + "%", icon: "hourglass-half-solid" },
            { name: "초각 가동률", value: Number(specPoint.supportHyperUptime).toFixed(2) /* 추가됨 */ + "%", icon: "hourglass-half-solid" },
            { name: "풀버프 가동률", value: Number(specPoint.supportFullBuffUptime).toFixed(2) /* 추가됨 */ + "%", icon: "hourglass-half-solid" },
        ]
        //let supportEffectInfo = [
        //    { name: "특성", value: specPoint.supportTotalStatus, icon: "person-solid" },
        //    { name: "쿨타임 감소", value: Number(specPoint.supportgemsCoolAvg).toFixed(2) + "%", icon: "gem-solid" },
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
            result += infoWrap("점수 통계", specPointInfo);
            result += infoWrap("장비 효과", armorInfo);
            result += infoWrap("아크패시브", arkPassiveInfo);
            result += infoWrap("보석 효과", gemInfo);
        } else {
            result += infoWrap("점수 통계", supportSpecPointInfo);
            result += infoWrap("주요 버프", supportImportantBuffInfo);
            result += infoWrap("버프 정보", supportBuffInfo);
            result += infoWrap("가동률", supportUtilizationRate);
            //result += infoWrap("추가 효과", supportEffectInfo);
        }
        element.innerHTML = result;
    }
    detailAreaCreate()

}
mainSearchFunction()