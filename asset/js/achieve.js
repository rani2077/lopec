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
            let bossHealth = Number(e.querySelector(".health").textContent.replace("억", ""));
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

    function bossDamagePercent() {
        let damageValue = Number(document.querySelector(".group-percent .input-area .input-item input").value);
        let healthValue = Number(document.querySelector(".group-percent .input-area .boss-item").getAttribute("data-health"));
        if (healthValue === 0) {
            return {
                percent: 0,
                title: "-"
            }
        }
        let percent = damageValue / healthValue * 100;
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