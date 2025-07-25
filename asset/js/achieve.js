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


/* **********************************************************************************************************************
* function name		:	selectBoss
* description	    : 	보스리스트에서 보스를 선택함
*********************************************************************************************************************** */
function selectBoss() {
    let bossItemElements = Array.from(document.querySelectorAll(".boss-area .boss-item:not(.head)"));
    let nowBossElement = document.querySelector(".group-percent .boss-item");
    bossItemElements.forEach((element) => {
        element.addEventListener("click", () => {
            nowBossElement.textContent = `현재 보스 : ${bossElementClick(element).name}`;
            nowBossElement.setAttribute("data-health", bossElementClick(element).health)
        })
        function bossElementClick(e) {
            let bossName = e.querySelector(".name").textContent;
            let bossHealth = Number(e.querySelector(".health").textContent.replace(/,/g, ""));
            let result = {
                name: bossName,
                health: bossHealth
            }
            return result;
        }
    })
};
selectBoss();


/* **********************************************************************************************************************
* function name		:	percentCalc
* description	    : 	사용자의 데미지 값을 입력받아 보스기여도와 칭호를 계산
*********************************************************************************************************************** */
function percentCalc() {
    let percentInputElement = document.querySelector(".group-percent .input-area input");
    let resultAreaElement = document.querySelector(".group-percent .result-area");
    let resultPercentElement = resultAreaElement.querySelector(".percent em");
    let resultTitleElement = resultAreaElement.querySelector(".achieve em");

    percentInputElement.addEventListener("keyup", () => {
        let value = bossDamagePercent();
        resultPercentElement.textContent = value.percent;
        resultTitleElement.textContent = value.title;
    })

    let bossAreaElement = document.querySelector(".group-boss .boss-area");
    bossAreaElement.addEventListener("click", () => {
        let value = bossDamagePercent();
        resultPercentElement.textContent = value.percent;
        resultTitleElement.textContent = value.title;
    })

    let estherAreaElement = document.querySelector(".group-percent .esther-area");
    estherAreaElement.addEventListener("change", () => {
        let value = bossDamagePercent();
        resultPercentElement.textContent = value.percent;
        resultTitleElement.textContent = value.title;
    })

    function bossDamagePercent() {
        let damageValue = Number(document.querySelector(".group-percent .input-area .input-item input").value);
        let healthValue = Number(document.querySelector(".group-percent .input-area .boss-item").getAttribute("data-health"));
        if (healthValue === 0) {
            return {
                percent: 0,
                title: "-"
            }
        };
        let estherSkill = Array.from(document.querySelectorAll(".group-percent .esther-area .esther-item:not(.title) input"));
        let checkedEsther = estherSkill.filter(element => element.checked);
        let estherValue = checkedEsther.reduce((a, b) => {
            return a + Number(b.value);
        }, 0)
        let percent = damageValue * 100000000 / (healthValue - estherValue) * 100;
        let title = "무능";
        if (percent >= 20) {
            title = "많이";
        } else if (percent >= 15) {
            title = "보통";
        } else if (percent >= 10) {
            title = "조금";
        }
        let result = {
            percent: percent,
            title: title
        };
        return result;
    }
};
percentCalc();


/* **********************************************************************************************************************
* function name		:	bossListFilter
* description	    : 	선택한 필터에 해당하는 보스의 목록만 보여줌
*********************************************************************************************************************** */
function bossListFilter() {
    let filterElement = document.querySelector(".group-boss .filter-area .filter-list");
    let bossListElements = Array.from(document.querySelectorAll(".group-boss .boss-area .boss-item:not(.head)"));
    filterElement.addEventListener("click", (e) => {
        divisionFilter(e.target)
    })
    function divisionFilter(element) {
        let filter = element.getAttribute("data-filter");
        if (!filter) {
            return;
        };
        Array.from(element.parentNode.querySelectorAll(".filter-item")).forEach(element => {
            element.classList.remove("on");
        })
        element.classList.add("on");
        bossListElements.forEach(element => {
            let bossTag = element.getAttribute("data-tag");
            if (filter === "모두") {
                element.style.display = "flex";
            } else if (bossTag !== filter) {
                element.style.display = "none";
            } else if (bossTag === filter) {
                element.style.display = "flex";
            }

        })
    }
};
bossListFilter();


/* **********************************************************************************************************************
* function name		:	userClassSelect
* description	    : 	유저가 딜러인지 서폿인지 선택하게함
*********************************************************************************************************************** */
function userClassSelect() {
    let classAreaElement = document.querySelector(".group-percent .class-area");
    let damageName = document.querySelector(".group-percent .input-area .damage");
    classAreaElement.addEventListener("change", (e) => {
        if (e.target.value === "dealer") {
            damageName.textContent = "총 데미지";
        } else if (e.target.value === "support") {
            damageName.textContent = "조력 피해량";
        }
    })
};
userClassSelect();