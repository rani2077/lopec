/* **********************************************************************************************************************
* variable name		:	mobileCheck
* description       : 	현재 접속한 디바이스 기기가 모바일, 태블릿일 경우 true를 반환
*********************************************************************************************************************** */
let mobileCheck = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(navigator.userAgent.toLowerCase())
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
        // { key: 'component', path: '../custom-module/component.js' },
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
* function name		:	scProfileSkeleton
* description       : 	유저 프로필 정보 스켈레톤 화면
*********************************************************************************************************************** */
export async function scProfileSkeleton() {
    return `
        <section class="sc-profile">
            <div class="group-img skeleton">
                <img src="/asset/image/skeleton-img.png" alt="">
            </div>
            <div class="group-profile">
                <div class="name-area">
                    <span class="name skeleton-text">LV.N NNN <i class="job">#NNN</i></span>
                    <button class="favorite-button">
                        <div class="icon">
                            <div class="star"></div>
                        </div>
                    </button>
                </div>
                <div class="info-area">
                    <div class="info-box">
                        <span class="name skeleton-text">서버 : NNN</span>
                        <span class="name skeleton-text">레벨 : NNN</span>
                    </div>
                    <div class="info-box">
                        <span class="name skeleton-text">칭호 : NNN</span>
                        <span class="name skeleton-text">길드 : NNN</span>
                    </div>
                    <div class="info-box">
                    <span class="name skeleton-text">전체랭킹 : NNN</span>
                        <span class="name skeleton-text">직업랭킹 : NNN</span>
                    </div>
                </div>
            </div>
        </section>`;
}
/* **********************************************************************************************************************
* function name		:	scProfile
* description       : 	유저 프로필 정보
*********************************************************************************************************************** */
export async function scProfile(userData, extractValue, response) {
    // let response = await dataBaseWrite(userData, extractValue, specPoint);
    // console.log(response)
    let imageSrc = userData.ArmoryProfile.CharacterImage;
    let jobName = extractValue.etcObj.supportCheck + " " + userData.ArmoryProfile.CharacterClassName;
    let serverName = userData.ArmoryProfile.ServerName;
    let characterLevel = userData.ArmoryProfile.CharacterLevel;
    let userName = userData.ArmoryProfile.CharacterName;
    let totalLevel = userData.ArmoryProfile.ItemAvgLevel;
    let title = userData.ArmoryProfile.Title;
    let guild = userData.ArmoryProfile.GuildName;

    let jobRankVariable = response.classRank.rank;
    let totalRankVariable = response.totalRank.rank;
    let jobPercent = response.classRank.percentage;
    let totalPercent = response.totalRank.percentage;

    let patreonBadge = await fetch(`https://api.lopec.kr/api/character/badge?nickname=${userName}`);
    patreonBadge = await patreonBadge.json();
    // console.log(patreonBadge)
    // patreonBadge = { // <== 응답값 예시
    //     "nickname": "로스트다람쥐",
    //     "badges": [
    //      "lopec_badge_connie",
    //      "lopec_badge_blackCow",
    //      "lopec_badge_doggie",
    //      "lopec_badge_mokoko",
    //      "lopec_badge_pinekoko",
    //      "lopec_badge_penguin"
    //     ]
    // }

    let badgeHtml = "";
    if (patreonBadge) {
        patreonBadge.badges.forEach(item => {
            badgeHtml += `<i class="badge ${item}"></i>`
        })
    }
    if (mobileCheck) {
        let badgeElement = badgeHtml
        badgeHtml = `
            <div class="badge-area">
                ${badgeElement}
            </div>`
    }
    setTimeout(() => {
        userBookmarkSave(userName);
        // profileImagePosUserSetting(userName)
    }, 0)
    // <i class="badge lopec_badge_01"></i>
    return `
    <section class="sc-profile">
        <div class="group-img">
            <img src="${imageSrc}" style="top:${profileImagePosition(userData.ArmoryProfile.CharacterClassName).top}px;left:${profileImagePosition(userData.ArmoryProfile.CharacterClassName).left}px" alt="">
        </div>
        <div class="group-profile">
            <div class="name-area">
                <span class="name">LV.${characterLevel} ${userName}${mobileCheck ? "" : badgeHtml}<i class="job" style="margin-left:6px">#${jobName}</i></span>
                <button class="favorite-button">
                    <div class="icon">
                        <div class="star"></div>
                    </div>
                </button>
            </div>
            ${mobileCheck ? badgeHtml : ""}
            <div class="info-area">
                <div class="info-box">
                    <span class="name">서버 : ${serverName}</span>
                    <span class="name">레벨 : ${totalLevel}</span>
                </div>
                <div class="info-box">
                    <span class="name">칭호 : ${title ? title : "없음"}</span>
                    <span class="name">길드 : ${guild ? guild : "없음"}</span>
                </div>
                <div class="info-box">
                <span class="name">전체랭킹 : ${totalRankVariable.toLocaleString()}위<em style="margin-left:2px;font-size:11px;opacity:0.8;">${totalPercent}%</em></span>
                    <span class="name">직업랭킹 : ${jobRankVariable.toLocaleString()}위<em style="margin-left:2px;font-size:11px;opacity:0.8;">${jobPercent}%</em></span>
                </div>
            </div>
        </div>
    </section>`;
}


//<span class="name">전체랭킹 : ${totalRankVariable}<em style="margin-left:2px;font-size:11px;opacity:0.8;">${totalPercent}</em></span>
//<span class="name">직업랭킹 : ${jobRankVariable}<em style="margin-left:2px;font-size:11px;opacity:0.8;">${jobPercent}</em></span>


/* **********************************************************************************************************************
* function name		:	profileImagePosition
* description       : 	직업별 프로필 이미지 좌표값
*********************************************************************************************************************** */
function profileImagePosition(jobName) {
    let posObj = { top: 0, left: 0 };
    switch (jobName) {
        case "디스트로이어":
        case "워로드":
        case "버서커":
        case "홀리나이트":
            posObj.left = -214;
            posObj.top = -60;
            break;
        case "발키리":
        case "슬레이어":
            posObj.left = -215;
            posObj.top = -77;
            break;
        case "인파이터":
        case "배틀마스터":
        case "창술사":
        case "기공사":
            posObj.left = -213;
            posObj.top = -87;
            break;
        case "스트라이커":
        case "브레이커":
            posObj.left = -206;
            posObj.top = -87;
            break;
        case "데빌헌터":
        case "스카우터":
        case "호크아이":
        case "블래스터":
            posObj.left = -214;
            posObj.top = -77;
            break;
        case "건슬링어":
            posObj.left = -215;
            posObj.top = -76;
            break;
        case "소서리스":
        case "서머너":
        case "바드":
        case "아르카나":
            posObj.left = -214;
            posObj.top = -84;
            break;
        case "데모닉":
        case "소울이터":
        case "블레이드":
        case "리퍼":
            posObj.left = -215;
            posObj.top = -83;
            break;
        case "기상술사":
        case "도화가":
        case "환수사":
            posObj.left = -214;
            posObj.top = -166;
            break;
        default:
            // Handle unknown job names (optional)
            console.warn(`Unknown job name: ${jobName}`);
            break;
    }
    return posObj;
}
/* **********************************************************************************************************************
* function name		:	starAnimation()
* description       : 	북마크 별 아이콘 애니메이션
*********************************************************************************************************************** */
function starAnimation() {
    let button = document.querySelector('.sc-profile .favorite-button');
    button.style.pointerEvents = 'none';

    button.classList.add('animated');

    const starY = { value: -20 };
    const starScale = { value: 1.2 };
    const buttonY = { value: 0 };
    const starFaceScale = { value: 1 };
    const starHoleScale = { value: 1 };
    const starRotate = { value: 0 };

    const speedFactor = 0.5; // 30% faster

    // 애니메이션 1 (위로 튀어오르기 + 빠른 회전)
    animate(starY, -36, 300 * speedFactor, 'easeOutPower2', () => {
        button.classList.add('star-round');
        animate(starY, 48, 350 * speedFactor, 'easeOutPower2', () => {
            button.classList.toggle('active');
            setTimeout(() => button.classList.remove('star-round'), 100 * speedFactor);
            animate(starY, -64, 450 * speedFactor, 'easeOutPower2', () => {
                starScale.value = 1.2;
                animate(starY, 0, 450 * speedFactor, 'easeInPower2', () => {
                    animate(buttonY, 3, 210 * speedFactor, '', () => {
                        starFaceScale.value = 0.65;
                        animate(buttonY, 0, 225 * speedFactor, '', () => {
                            starFaceScale.value = 1;
                            button.classList.remove('animated');
                            button.style.setProperty('--star-y', '0px');
                            button.style.setProperty('--star-scale', '1.2');
                            button.style.setProperty('--button-y', '0px');
                            button.style.setProperty('--star-face-scale', '1');
                            button.style.setProperty('--star-rotate', '0deg');
                            button.style.pointerEvents = 'auto';
                        });
                    });
                });
            });
        });
    });

    // 회전 애니메이션을 별이 튀어오를 때 함께 실행 (속도 증가)
    animate(starRotate, 360, 1400 * speedFactor, '');

    // 애니메이션 2 (별 구멍 확장)
    animate(starHoleScale, 0.8, 500 * speedFactor, 'easeOutElastic', () => {
        setTimeout(() => {
            animate(starHoleScale, 0, 200 * speedFactor, '');
        }, 200 * speedFactor);
    });

    // 애니메이션 함수 (간단한 선형 애니메이션)
    function animate(target, to, duration, ease, onComplete) {
        const start = target.value;
        const startTime = performance.now();

        function update() {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            let progress = elapsed / duration;

            if (progress > 1) progress = 1;

            if (ease === 'easeOutPower2') {
                progress = 1 - (1 - progress) * (1 - progress);
            } else if (ease === 'easeInPower2') {
                progress = progress * progress;
            } else if (ease === 'easeOutElastic') {
                const p = 0.3;
                const s = p / 4;
                progress = 1 + Math.pow(2, -10 * progress) * Math.sin((progress - s) * (2 * Math.PI) / p);
            }

            target.value = start + (to - start) * progress;

            button.style.setProperty('--star-y', starY.value + 'px');
            button.style.setProperty('--star-scale', starScale.value);
            button.style.setProperty('--button-y', buttonY.value + 'px');
            button.style.setProperty('--star-face-scale', starFaceScale.value);
            button.style.setProperty('--star-hole-scale', starHoleScale.value);
            button.style.setProperty('--star-rotate', starRotate.value + 'deg');

            if (elapsed < duration) {
                requestAnimationFrame(update);
            } else if (onComplete) {
                onComplete();
            }
        }

        requestAnimationFrame(update);
    }
}
/* **********************************************************************************************************************
* function name		:	profileImagePosUserSetting()
* description       : 	프로필 이미지를 위치를 유저가 원하는대로 설정할 수 있게 하는 기능
* state             :   ~개발중~
*********************************************************************************************************************** */
function profileImagePosUserSetting(userName) {
    console.log(userName);
    let groupImg = document.querySelector('.sc-profile .group-img');
    let originalImg = groupImg.querySelector('img');
}
/* **********************************************************************************************************************
* function name		:	userBookmarkSave
* description       : 	즐겨찾기 저장
*********************************************************************************************************************** */
function userBookmarkSave(userName) {
    let element = document.querySelector(".sc-profile .favorite-button")
    element.addEventListener("click", bookmarkToggle)
    // localStorage.removeItem("userBookmark");                                             //로컬스토리지 비우기
    // localStorage.clear();                                                                //로컬스토리지 전체 제거
    let userBookmarkList = JSON.parse(localStorage.getItem("userBookmark")) || []           //북마크 리스트
    function bookmarkToggle(el) {
        // el.target.classList.toggle("active");                                                 //북마크 아이콘 토글  
        if (userBookmarkList.length < 6 && !el.target.classList.contains("active")) {
            userBookmarkList.push(userName)                                                 //북마크 추가하기
            localStorage.setItem("userBookmark", JSON.stringify(userBookmarkList))
            starAnimation();
            // alert("북마크 저장")
        } else if (el.target.classList.contains("active")) {
            userBookmarkList = userBookmarkList.filter(item => item !== userName)
            localStorage.setItem("userBookmark", JSON.stringify(userBookmarkList))
            starAnimation();
            // alert("북마크 저장2")

        } else if (userBookmarkList.length >= 6) {
            el.target.classList.remove("active");                                             //북마크 아이콘 토글  
            alert("즐겨찾기는 5개까지 저장됩니다.");
            return;
        }
    }
    if (userBookmarkList.includes(userName)) {
        element.classList.add("active");
    } else {
        element.classList.remove("active");
    }
    // userBookmarkList.includes(userName) ? document.querySelector(".sc-profile .favorite-button").classList.add("active") : document.querySelector(".sc-profile .favorite-button").classList.remove("active")
}

/* **********************************************************************************************************************
* function name		:	scNav
* description       : 	메인, 원정대, 시뮬레이터로 이동할 수 있는 네비게이션
*********************************************************************************************************************** */
export async function scNav(userName) {
    let name = "";
    if (userName) {
        name = userName;
    }
    const urlParams = window.location.pathname;
    let simulatorClassName = "";
    let searchClassName = "";
    let nowPage = "";
    if (urlParams.includes("simulator")) {
        simulatorClassName = "on";
        nowPage = "simulator";
    } else if (urlParams.includes("search")) {
        searchClassName = "on";
        nowPage = "search";
    }
    async function scNavEvent() {
        document.querySelector(".sc-nav").insertAdjacentHTML('afterend', await scExpeditionSkeleton());
        document.querySelector(".sc-nav").insertAdjacentHTML('afterend', await scHistorySkeleton());
        let elements = document.querySelectorAll(`.sc-nav .link.${nowPage}, .sc-nav .link[href=""]`);
        let expeditionFlag = null;
        let historyFlag = null;
        elements.forEach((element, idx) => {
            element.addEventListener("click", async (e) => {
                e.preventDefault();
                elements.forEach(sibling => {
                    sibling.classList.remove("on");
                });
                element.classList.add("on");
                let scInfo = document.querySelector(".sc-info");
                let scExpeditionElement = document.querySelector(".sc-expedition");
                let scHistoryElement = document.querySelector(".sc-history");

                scInfo.style.display = "none";
                scExpeditionElement.style.display = "none";
                scHistoryElement.style.display = "none";
                let page = element.getAttribute("data-page");
                document.querySelector(`.${page}`).style.display = "flex";
                if (element.classList.contains("expedition") && !expeditionFlag) {
                    expeditionFlag = true;
                    let expeditionElement = document.querySelector(".sc-expedition");
                    expeditionElement.outerHTML = await scExpedition(name);
                    document.querySelector(`.${page}`).style.display = "flex";
                } if (element.classList.contains("history") && !historyFlag) {
                    historyFlag = true;
                    let historyElement = document.querySelector(".sc-history");
                    await scHistory()
                    // historyElement.outerHTML = await 
                    // document.querySelector(`.${page}`).style.display = "flex";
                }
            })
        })
    }
    setTimeout(() => { scNavEvent() }, 0)
    let mobilePath = "";
    if (mobileCheck) {
        mobilePath = "/mobile"
    }
    return `
    <nav class="sc-nav">
        <a href="${mobilePath}/search/search.html?headerCharacterName=${name}" class="link search ${searchClassName}" data-page="sc-info" >메인</a>
        <a href="" class="link expedition" data-page="sc-expedition">원정대</a>
        <a href="${mobilePath}/simulator/simulator.html?headerCharacterName=${name}" class="link simulator ${simulatorClassName}" data-page="sc-info">시뮬레이터</a>
        <a href="https://cool-kiss-ec2.notion.site/1da758f0e8da8058a37bd1b7c6f49cd3?pvs=4" target="_blink" class="link" data-page="">중앙값</a>
        </nav>`
}
// <a href="" class="link history" data-page="sc-history">히스토리</a>

/* **********************************************************************************************************************
* function name		:	scExpedition
* description       : 	원정대 컴포넌트
*********************************************************************************************************************** */
async function scExpeditionSkeleton() {
    return `
        <section class="sc-expedition">
            <div class="group-server shadow">
                <div class="server-area">
                    <span class="server-name">서버</span>
                </div>
                <div class="expedition-area">
                    <i>로딩중...</i>
                </div>
            </div>
        </section>`;
}
/* **********************************************************************************************************************
* function name		:	scExpedition
* description       : 	원정대 컴포넌트
*********************************************************************************************************************** */
async function scExpedition(inputName) {
    let data = await manageExpeditionData(inputName);
    function groupByServerName(data) {
        const result = {};

        data.forEach(item => {
            if (!result[item.ServerName]) {
                result[item.ServerName] = [];
            }
            result[item.ServerName].push(item);
        });
        // 정렬 로직
        for (const serverName in result) {
            result[serverName].sort((a, b) => {
                const levelA = parseFloat(a.ItemAvgLevel.replace(/,/g, ''));
                const levelB = parseFloat(b.ItemAvgLevel.replace(/,/g, ''));
                return levelB - levelA; // 내림차순 정렬 (높은 레벨이 먼저)
            });
        }

        return Object.entries(result).map(([serverName, characters]) => ({
            ServerName: serverName,
            Characters: characters,
        }));
    }
    function sortCharacters(data, targetCharacterName) {
        const matchingServer = data.find((server) =>
            server.Characters.some(
                (character) => character.CharacterName === targetCharacterName
            )
        );

        if (matchingServer) {
            const remainingServers = data.filter(
                (server) => server !== matchingServer
            );
            return [matchingServer, ...remainingServers];
        } else {
            return data; // 일치하는 캐릭터가 없으면 원래 순서대로 반환
        }
    }

    let groupData = groupByServerName(data);
    groupData = sortCharacters(groupData, inputName)

    //console.log(groupData)
    let groupServer = groupData.map(serverName => {
        let expeditionListElement = serverName.Characters.map(character => expeditionList(character));
        return `
            <div class="group-server shadow">
                <div class="server-area">
                    <span class="server-name">${serverName.ServerName}</span>
                </div>
                <div class="expedition-area">
                    ${expeditionListElement.join('')}
                </div>
            </div>`;
    })
    function expeditionList(info) {
        return `
            <a href="/search/search.html?headerCharacterName=${info.CharacterName}" class="expedition-list">
                <!-- <img src="https://cdn.korlark.com/lostark/avatars/striker.png" alt=""> -->
                <div class="info-box">
                    <span class="character-level">Lv.${info.CharacterLevel} ${info.CharacterClassName}</span>
                    <span class="name">${info.CharacterName}</span>
                    <span class="armor-level">${info.ItemAvgLevel}</span>
                </div>
            </a>`;
    }
    return `
        <section class="sc-expedition">
            ${groupServer.join('')}
        </section>`;
}
/* **********************************************************************************************************************
* function name		:	scHistorySkeleton
* description       : 	히스토리 컴포넌트 스켈레톤
*********************************************************************************************************************** */
async function scHistorySkeleton() {
    return `
        <section class="sc-history" style="margin-top:20px;">
            <i style="color:#121212;">준비중</i>
            <i style="color:#fff;">준비중</i>
        </section>`;
}

/* **********************************************************************************************************************
* function name		:	scHistory
* description       : 	히스토리 컴포넌트
*********************************************************************************************************************** */
async function scHistory() {
    let response = await fetch("https://api.lopec.kr/api/score-history?nickname=로스트다람쥐&characterClass=황후 아르카나")
    let historyData = await response.json()
    console.log(historyData)
    return `
        <section class="sc-history">
            <i>로딩중...</i>
        </section>`;
}
/* **********************************************************************************************************************
* function name		:	manageExpeditionData
* description       : 	원정대 데이터 로컬스토리지 저장
*********************************************************************************************************************** */
async function manageExpeditionData(inputName) {
    const MAX_STORAGE = 100; // 로컬 스토리지 최대 저장 개수
    const STORAGE_KEY = 'lopecExpeditionData'; // 로컬 스토리지 키
    const CACHE_DURATION = 3600 * 1000; // 캐시 유효 시간 (60분)

    let expeditionData = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || []; // 로컬 스토리지에서 데이터 가져오기 (없으면 빈 배열)
    // 기존 항목 찾기 및 타임스탬프 확인
    const existingEntryIndex = expeditionData.findIndex(item =>
        item.some(obj => obj.CharacterName === inputName)
    );

    let existingEntry = null;
    if (existingEntryIndex !== -1) {
        existingEntry = expeditionData[existingEntryIndex];
        const timestamp = existingEntry[0].timestamp; // 첫 번째 객체의 타임스탬프 사용 (가정)
        if (Date.now() - timestamp < CACHE_DURATION) {
            // alert("로컬 스토리지에서 데이터를 가져왔습니다.");
            console.log('Data is fresh from local storage.');
            return existingEntry;
        } else {
            // alert("캐시가 만료되었습니다. API를 호출합니다.");
            console.log('Local storage data is stale. Fetching new data.');
            expeditionData.splice(existingEntryIndex, 1); // 오래된 데이터 제거
        }
    }

    // API에서 새 데이터 가져오기
    try {
        // alert("첫검색 api 호출")
        let Module = await import("./fetchApi.js");
        let newData = await Module.expeditionApiCall(inputName);

        if (newData && Array.isArray(newData)) {
            // newData의 각 객체에 타임스탬프 추가
            newData.forEach(obj => {
                obj.timestamp = Date.now();
            });
            expeditionData.push(newData);

            // 로컬 스토리지 크기 제한
            if (expeditionData.length > MAX_STORAGE) {
                expeditionData.shift();
            }
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(expeditionData));
            console.log('새 데이터를 로컬 스토리지에 추가했습니다.');
            return newData;
        } else {
            console.error('API에서 잘못된 데이터를 받았습니다:', newData);
            return null;
        }
    } catch (error) {
        console.error('원정대 데이터를 가져오는 중 오류가 발생했습니다:', error);
        return null;
    }
}

/* **********************************************************************************************************************
* function name		:	gemFreeSetSave
* description       : 	보석 프리셋 저장, 로드, 리셋을 하는 함수
*********************************************************************************************************************** */
export async function gemFreeSetSave(gemSlotData) {
    let saveElement = document.querySelector(".gem-box .save");
    let loadElement = document.querySelector(".gem-box .load");
    let resetElement = document.querySelector(".gem-box .reset");
    if (saveElement && loadElement && resetElement) {
        saveElement.addEventListener("click", () => {
            const gemSlotString = JSON.stringify(gemSlotData.ArmoryGem);
            if (confirm("현재 장착중인 보석을 저장합니다.(저장은 최대 1개까지 가능합니다.)\n보석설정을 저장하시겠습니까?")) {
                localStorage.setItem('gemSlot', gemSlotString);
            }
        })
        loadElement.addEventListener("click", () => {
            if (localStorage.getItem('gemSlot')) {
                localStorage.setItem('gemSet', gemSlotData.ArmoryProfile.CharacterName);
                // localStorage.setItem('gemSet', "청염각");
            } else {
                alert("저장된 보석이 없습니다. 보석을 저장후 눌러주세요");
                return;
            }
            if (confirm("보석설정을 로드했습니다.\n새로고침 후 적용됩니다.\n지금 바로 새로고침 하시겠습니까?")) {
                location.reload();
            }
        })
        resetElement.addEventListener("click", () => {
            window.localStorage.removeItem("gemSet");
            if (confirm("보석설정을 취소했습니다.\n새로고침 후 적용됩니다.\n지금 바로 새로고침 하시겠습니까?")) {
                location.reload();
            }
        })
    }
    // 'q' 키를 눌렀을 때 로컬 스토리지에 저장하는 이벤트 리스너 추가
    // window.addEventListener('keydown', (event) => {
    //     if (event.key === 'q' || event.key === 'Q') {
    //         const gemSlotString = JSON.stringify(gemSlotData);
    //         localStorage.setItem('gemSlot', gemSlotString);
    //         console.log("'q' 키 입력 감지: gemSlot 데이터가 로컬 스토리지에 저장되었습니다.", gemSlotString);
    //     }
    // });
}

/* **********************************************************************************************************************
* function name		:	manageExpeditionData
* description       : 	원정대 데이터 로컬스토리지 저장
*********************************************************************************************************************** */
