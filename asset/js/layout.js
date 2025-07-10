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
* variable name		:	userDeviceToRedirection
* description       : 	사용자의 접속 기기를 확인하여 모바일과 pc페이지로 리디렉션시켜줌
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function userDeviceToRedirection() {
    // console.log("현재 URL: " + window.location.pathname);
    let currentPath = window.location.pathname;
    let queryString = window.location.search;
    if (mobileCheck) {    //모바일
        if (!currentPath.startsWith('/mobile')) {
            window.location.href = window.location.origin + '/mobile' + currentPath + queryString;
        }
    } else {
        if (currentPath.startsWith('/mobile')) {
            window.location.href = window.location.origin + currentPath.replace('/mobile', '') + queryString;
        }
    }
}
userDeviceToRedirection()


/* **********************************************************************************************************************
* variable name		:	scHeaderCreate
* description       : 	사용자의 접속 기기를 확인하여 모바일과 pc페이지로 리디렉션시켜줌
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function scHeaderCreate() {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('headerCharacterName');
    if (nameParam) {
        let nameListStorage = JSON.parse(localStorage.getItem("nameList")) || []
        // localStorage.removeItem("userBookmark");                                 //로컬스토리지 비우기
        if (nameListStorage.includes(nameParam) || nameListStorage.includes(null)) {
            //로컬스토리지 저장
            nameListStorage = nameListStorage.filter(item => item !== nameParam && item !== null)
            nameListStorage.push(nameParam)
            localStorage.setItem('nameList', JSON.stringify(nameListStorage));
        } else {
            if (nameListStorage.length >= 6) {
                nameListStorage.shift();
            }
            nameListStorage.push(nameParam);
            localStorage.setItem('nameList', JSON.stringify(nameListStorage));
        }
    }
    function headerElement() {
        if (mobileCheck) {    //모바일
            return `
                <header>
                    <div class="sc-header">
                        <div class="logo-group">
                            <h1 class="logo">
                                <span class="blind">로스트아크 전투정보실 전투력계산 스펙포인트</span>
                                <a href="/mobile/" class="link-site"></a>
                            </h1>
                        </div>
                        <div class="group-search">
                            <span class="recent-close"><span class="blind">검색화면 나가기 버튼</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z"/></svg></span>
                            <form action="/mobile/search/search.html" class="search-area search-page on">
                                <input id="headerInput" autocomplete="off" name="headerCharacterName" class="header-input character-name-search" type="text" value="" placeholder="캐릭터 검색">
                                <button class="search-btn"></button>
                            </form>
                        </div>
                    </div>
        
                <span class="side-btn">
        
                    <em class="blind">사이드메뉴 토글 버튼</em>
                    <em class="line1"></em>
                    <em class="line2"></em>
                    <em class="line3"></em>
                </span>
                <div class="side-blur"></div>
                
                <aside class="sc-sidemenu">
        
                    <div class="group-link">
                        <a href="https://open.kakao.com/o/smvJ4DQg" class="link-item" target="_blink">1:1문의</a>
                        <a href="https://cool-kiss-ec2.notion.site/120758f0e8da80889d2fe738c694a7a1" target="_blink" class="link-item">후원안내</a>
                        <a href="https://discord.gg/5B8SjX4ug4" class="link-item" target="_blink">디스코드</a>
                        <a href="https://cool-kiss-ec2.notion.site/LOPEC-CREDIT-1cc758f0e8da80a18f49f93dafb886f3" target="_blink" class="link-item">credit</a>
                    </div>
        
        
                    <div class="group-darkmode">
                        <div  class="button b2 dark-mode-button" id="button-17">
                            <input type="checkbox" class="checkbox" />
                            <div class="knobs">
                                <span></span>
                            </div>
                            <div class="layer"></div>
                        </div>
                    </div>
                </aside>
            </header>`;
        } else {              //데스크탑
            return `
            <header>
                <section class="sc-header">
                    <div class="logo-group">
                        <h1 class="logo">
                            <span class="blind">로스트아크 전투정보실 전투력계산 스펙포인트</span>
                            <a href="/" class="link-site"></a>
                        </h1>
                    </div>
                    <div class="group-search">
                        <div class="handle-area" title="좌우로 드래그하여 위치 조절 가능 합니다.">
                            <div class="handle">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>
                        </div>
                        <form action="/search/search.html" class="search-area search-page on">
                            <input id="headerInput" autocomplete="off" name="headerCharacterName" class="header-input character-name-search" type="text" value="" placeholder="캐릭터 검색">
                            <button class="search-btn"></button>
                        </form>
                        <div class="dark-area" style="display:flex;align-items:center;">
                
                            <div  class="button b2 dark-mode-button" id="button-17">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs">
                                    <span></span>
                                </div>
                                <div class="layer"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>`;
        }
    }
    document.body.insertAdjacentHTML('afterbegin', headerElement());

    function handleDragAndDrop() {
        let handleElement = document.querySelector(".sc-header .group-search .handle");
        let targetElement = document.querySelector(".sc-header .group-search"); // 실제로 움직일 요소

        // 요소가 없을 경우 경고 및 함수 종료
        if (!handleElement || !targetElement) {
            console.warn("필요한 요소를 찾을 수 없습니다. '.sc-header .group-search .handle' 또는 '.sc-header .group-search' 셀렉터를 확인하세요.");
            return;
        }

        let isDragging = false;       // 드래그 중인지 여부
        let startMouseX;            // 마우스 클릭 시 X 좌표
        let startTargetRight;       // 드래그 시작 시 targetElement의 현재 right 값

        // 4. 세션 스토리지에서 저장된 right 값 불러오기
        const savedRight = sessionStorage.getItem('targetRightPosition'); // 키 이름을 변경했습니다.
        if (savedRight !== null) {
            targetElement.style.right = `${savedRight}px`;
        }

        // mousedown 이벤트: 드래그 시작 (handleElement 위에서 감지)
        handleElement.addEventListener("mousedown", (e) => {
            isDragging = true;
            // 시각적 피드백을 위해 targetElement에 클래스 추가 (선택 사항)
            targetElement.classList.add('dragging');

            // 현재 마우스 X 좌표 저장
            startMouseX = e.clientX;

            // targetElement의 현재 right 값을 얻습니다.
            startTargetRight = parseFloat(window.getComputedStyle(targetElement).right);

            // 텍스트 선택 방지
            e.preventDefault();

            // --- 커서 일관성 유지 로직 시작 ---
            // 드래그 시작 시 body에 e-resize 커서를 적용
            document.body.style.cursor = 'e-resize';
            // 요소 드래그 중 사용자 경험을 위해 기본 텍스트 선택 방지
            document.body.style.userSelect = 'none';
            // --- 커서 일관성 유지 로직 끝 ---

            // document 전체에 mousemove와 mouseup 이벤트 리스너를 추가
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // mousemove 이벤트: 드래그 중 이동 (좌우만)
        function onMouseMove(e) {
            if (!isDragging) return;

            // 현재 마우스 위치와 시작 위치의 차이를 계산
            const deltaX = e.clientX - startMouseX;

            // 새로운 right 값 계산
            // 마우스 이동 거리에 따라 targetElement의 right 값을 조절합니다.
            let newRight = startTargetRight - deltaX;

            // 음수 값이 되지 않도록 (화면 밖으로 나가지 않도록) 최소값 0 설정
            // 필요에 따라 최대값을 설정하여 너무 왼쪽으로 이동하는 것을 제한할 수 있습니다.
            // 예를 들어, newRight = Math.max(0, Math.min(MaxRightValue, newRight));
            newRight = Math.max(0, Math.min(700, newRight));

            targetElement.style.right = `${newRight}px`;

            // 4. 세션 스토리지에 값 저장
            sessionStorage.setItem('targetRightPosition', newRight); // 키 이름을 변경했습니다.
        }

        // mouseup 이벤트: 드래그 종료
        function onMouseUp() {
            isDragging = false;

            // 시각적 피드백 클래스 제거
            targetElement.classList.remove('dragging');

            // --- 커서 일관성 유지 로직 시작 ---
            // 드래그 종료 시 body의 커서를 기본값으로 되돌림
            document.body.style.cursor = 'default'; // 또는 'auto'
            // 텍스트 선택 허용
            document.body.style.userSelect = ''; // 또는 'auto'
            // --- 커서 일관성 유지 로직 끝 ---


            // 이벤트 리스너 제거
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
    handleDragAndDrop();

    if (mobileCheck) {
        // 사이드메뉴 토글
        document.querySelector(".side-btn").addEventListener("click", function () {
            this.classList.toggle("on");

            if (this.classList.contains("on")) {
                document.documentElement.style.overflow = "hidden";
            } else {
                document.documentElement.style.overflow = "";
            }

            document.querySelector("header .sc-sidemenu").classList.toggle("on")
            document.querySelector("header .side-blur").classList.toggle("on")
        })
        document.querySelector(".side-blur").addEventListener("click", function () {
            document.documentElement.style.overflow = "";
            document.querySelector(".side-btn").classList.remove("on")
            document.querySelector("header .sc-sidemenu").classList.remove("on")
            document.querySelector("header .side-blur").classList.remove("on")
        })
    }

    // 헤더 좌우스크롤 에 맞게 위치조정
    window.addEventListener("scroll", function () {
        document.querySelector("header").style.left = "-" + window.scrollX + "px"
    })
}
scHeaderCreate()


// <input id="toggle" class="dark-mode-button" type="checkbox" alt="다크모드 전환" title="다크모드 전환하기" checked="">

/* **********************************************************************************************************************
* variable name		:	darkModeSetting
* description       : 	다크모드 활성화 비활성화를 관리함
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function darkModeSetting() {
    // 다크모드 스크립트
    function enableDarkMode() {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');

    }
    function disableDarkMode() {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
    if (localStorage.getItem('darkMode') == 'enabled') {
        enableDarkMode();
    }
    document.querySelector('.dark-mode-button').addEventListener('click', () => {
        if (localStorage.getItem('darkMode') == 'enabled') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    if (localStorage.getItem('darkMode') == 'enabled') {
        document.querySelector(".dark-mode-button .checkbox").checked = true
    }

}
darkModeSetting()

/* **********************************************************************************************************************
* variable name		:	recentBookmark()
* description       : 	최근 검색목록과 즐겨찾기를 생성
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
// 최근검색및 즐겨찾기
function recentBookmark() {

    let nameListStorage = JSON.parse(localStorage.getItem("nameList")) || []            //로컬스토리지 최근 검색어
    let userBookmarkStorage = JSON.parse(localStorage.getItem("userBookmark")) || []    //로컬스토리지 즐겨찾기 목록
    nameListStorage = nameListStorage.reverse()                                         //최신순으로 정렬
    userBookmarkStorage = userBookmarkStorage.reverse()                                 //최신순으로 정렬

    let recentNameBox = ""
    let bookmarkNameBox = ""
    let mobilePath = "";
    if (mobileCheck) {
        mobilePath = "/mobile"
    }
    nameListStorage.forEach(function (recentNameArry) {                                       //최근검색HTML목록

        recentNameBox += `
            <div class="name-box" data-sort="recent">
                <a href="${mobilePath}/search/search.html?headerCharacterName=${recentNameArry}" class="name">${recentNameArry}</a>
                <em class="del remove"></em>
            </div>`;
    })

    userBookmarkStorage.forEach(function (bookmarkArry) {

        bookmarkNameBox += `
        <div class="name-box" data-sort="bookmark">
            <a href="${mobilePath}/search/search.html?headerCharacterName=${bookmarkArry}" class="name">${bookmarkArry}</a>
            <em class="star remove">☆</em>
        </div>`;
    })

    return `
    <div class="group-recent" tabindex="0">
        <div class="name-area">
            <span data-sort="recent" class="recent sort on">최근검색</span>
            <span data-sort="bookmark" class="bookmark sort">즐겨찾기</span>
        </div>
        <div class="recent-area memo on">
            ${recentNameBox}
        </div>

        <div class="bookmark-area memo">
            ${bookmarkNameBox}
        </div>
    </div>`;
}

let recentFlag = 0;
function userInputMemoHtml(inputElement) {
    inputElement.addEventListener("focus", function (input) {
        let leftPos = input.target.getBoundingClientRect().left;
        let topPos = input.target.getBoundingClientRect().top;

        // 브라우저 외부에서 브라우저로 포커스시 좌표 버그 해결 코드
        if (recentFlag == 0) {
            document.body.appendChild(
                document.createRange().createContextualFragment(recentBookmark())
            )
        }

        let recentHtml = document.querySelector(".group-recent")
        if (mobileCheck) {
            // 모바일 검색화면 뒤로가기 버튼 & 스크롤 금지
            document.querySelector(".group-search").classList.add("on");
            document.documentElement.style.overflow = 'hidden';
        } else {
            recentHtml.style.top = topPos + 55 + "px";
            recentHtml.style.left = leftPos + "px";

        }

        // 분류명 클릭
        document.querySelectorAll(".group-recent .name-area .sort").forEach(function (sort) {
            sort.addEventListener("click", function () {
                let nowSort = sort.getAttribute("data-sort")


                document.querySelectorAll(".group-recent .memo").forEach(function (memo) {
                    memo.classList.remove("on");
                })
                document.querySelectorAll(".group-recent .name-area .sort").forEach(function (removeSort) {
                    removeSort.classList.remove("on");
                })

                document.querySelector("." + nowSort + "-area").classList.add("on");
                document.querySelector("." + nowSort).classList.add("on");

            })
        })

        // 목록제거버튼
        let nowUserName = JSON.parse(localStorage.getItem("nameList")).reverse()[0]                  // 현재 검색된 유저명
        document.querySelectorAll(".group-recent .memo .remove").forEach(function (removeBtn) {

            removeBtn.addEventListener("click", function () {
                let nowRecentName = removeBtn.parentElement.querySelector(".name").textContent       // 선택한 유저명
                console.log(removeBtn.parentElement.getAttribute("data-sort"))

                if (removeBtn.parentElement.getAttribute("data-sort") == "recent") {

                    let nameListStorage = JSON.parse(localStorage.getItem("nameList")).reverse()     // 로컬스토리지 최근 검색어


                    nameListStorage = nameListStorage.filter(item => item !== nowRecentName);
                    localStorage.setItem("nameList", JSON.stringify(nameListStorage.reverse()))

                } else if (removeBtn.parentElement.getAttribute("data-sort") == "bookmark") {

                    let nameListStorage = JSON.parse(localStorage.getItem("userBookmark")).reverse() // 즐겨찾기 리스트


                    nameListStorage = nameListStorage.filter(item => item !== nowRecentName);
                    localStorage.setItem("userBookmark", JSON.stringify(nameListStorage.reverse()))

                    if (document.querySelector(".star.full") && nowRecentName == nowUserName) {

                        document.querySelector(".star.full").classList.remove("full");
                    }
                }

                removeBtn.parentElement.remove()
            })
        })

        //.group-recent포커스해제
        recentHtml.addEventListener("blur", inputBlur)
        recentFlag = 1;
    })
}

/* **********************************************************************************************************************
* variable name		:	inputBlur
* description       : 	input요소에서 포커스가 제거될 시 최근검색 및 즐겨찾기 제거
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function inputBlur() {
    let recentHTML = document.querySelector(".group-recent")
    let input = document.querySelector("input")

    setTimeout(function () {
        if (!input.contains(document.activeElement) && !recentHTML.contains(document.activeElement)) {
            if (mobileCheck) {
                document.querySelector(".group-search").classList.remove("on")
                document.documentElement.style.overflow = '';
            }
            recentHTML.remove()
            recentFlag = 0;
        }
    }, 0)
}
// input포커스
document.querySelectorAll("input[type='text']").forEach(function (element) {
    element.addEventListener("click", userInputMemoHtml(element))
})

// input포커스해제
document.querySelectorAll("input[type='text']").forEach(function (inputArry) {
    inputArry.addEventListener("blur", inputBlur)
})


/* **********************************************************************************************************************
* variable name		:	scFooterCreate
* description       : 	footer요소를 생성함
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function scFooterCreate() {
    let footerElement = "";
    if (mobileCheck) {
        footerElement = `<footer class="sc-footer"><span>Copyright 2024 lopec.kr All rights reserved.</span></footer>`
    } else {
        footerElement = `
        <footer>
            <section class=".sc-footer">
                <div class="group-link">
                    <a href="https://open.kakao.com/o/smvJ4DQg" class="link" target="_blink">1:1문의</a>
                    <a href="https://cool-kiss-ec2.notion.site/120758f0e8da80889d2fe738c694a7a1" target="_blink" class="link">후원안내</a>
                    <a href="https://discord.gg/5B8SjX4ug4" class="link" target="_blink">디스코드</a>
                    <a href="https://cool-kiss-ec2.notion.site/LOPEC-CREDIT-1cc758f0e8da80a18f49f93dafb886f3" target="_blink" class="link">credit</a>
                </div>
                <span>Copyright 2024 lopec.kr All rights reserved.</span>
            </section>
        </footer>`;
    }
    document.body.insertAdjacentHTML('beforeend', footerElement);
}
scFooterCreate()

/* **********************************************************************************************************************
* variable name		:	footerPositionFnc()
* description       : 	푸터 하단 고정 스크립트(앵커광고 삽입시 레이아웃 깨짐 대책)
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function footerPositionFnc() {
    let footer = document.querySelector("footer")
    footer.style.display = "block"
    footer.style.top = (document.body.offsetHeight - footer.offsetHeight) + "px";
    footer.style.width = window.offsetWidth + "px"
}
footerPositionFnc()

/* **********************************************************************************************************************
* variable name		:	windowChangeDetect
* description       : 	변화를 감지하여 dom을 올바르게 수정함
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function windowChangeDetect() {
    let resizeObserver = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.target === document.body) {
                footerPositionFnc();
            }
        });
    });
    resizeObserver.observe(document.body);
    // window.addEventListener("resize", footerPositionFnc); //필요없다고 판단될시 추후 제거

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                footerPositionFnc();
            }
        });
    });
    let config = {
        childList: true,
        subtree: true
    };
    observer.observe(document.body, config);
}
windowChangeDetect()



// 헤더푸터 너비조정

/* **********************************************************************************************************************
* variable name		:	widthSetFnc
* description       : 	헤더푸터 너비조정
* useDevice         : 	데스크탑
*********************************************************************************************************************** */
function widthSetFnc() {
    document.querySelector("header").style.width = document.querySelector("body").offsetWidth + "px"
    document.querySelector("footer").style.width = document.querySelector("body").offsetWidth + "px"
}
if (mobileCheck) {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.addEventListener("load", function () {
        window.scrollTo(0, 0);
    });
} else {
    widthSetFnc()
    window.addEventListener("resize", widthSetFnc)
}

/* **********************************************************************************************************************
* variable name		:	scLopecClickCreate
* description       : 	sc-lopec-click를 생성하고 드래그 가능하게 하며, 위치를 저장/동기화하는 함수 (on 클래스 시 드래그 방지, 클릭/드래그 구분)
* useDevice         : 	데스크탑
*********************************************************************************************************************** */
let simpleNameFlag = "";
// <span class="auto btn">딸깍</span>
// <span class="auto btn" style="opacity:0.2" onClick="alert('해당 기능은 현재 준비중입니다 빠른 시일내 준비할 수 있도록 노력하겠습니다.')">딸깍</span>

async function scLopecClickCreate() {
    const clickElementHtml = `
        <section class="sc-lopec-click">
            <div class="blob blob1"></div>
            <div class="blob blob2"></div>
            <div class="blob blob3"></div>
            <div class="group-category">
                <span class="category">로펙딸깍</span>
                <div class="devil-box">
                    <span>악추피</span><input type="checkbox">
                </div>
            </div>
            <div class="group-simple">
                <div class="search-area">
                    <input type="text no-recent" placeholder="캐릭터 검색">
                    <span class="search btn">검색</span>
                    <span class="auto btn">딸깍</span>
                </div>
                <div class="result-area scrollbar">
                    <div class="sort-box">
                        <div class="result-item sort">
                            <span class="name result">닉네임</span>
                            <span class="job result">직업</span>
                            <span class="point result">점수</span>
                            <span class="del result"></span>
                        </div>
                    </div>
                    <div class="result-box">
                    </div>
                </div>
            </div>
            <div class="group-auto"></div>
            <span class="hint">아이콘을 드래그로 옮길 수 있습니다</span>
        </section>`;

    if (mobileCheck) {
        return;
    }

    document.body.insertAdjacentHTML('beforeend', clickElementHtml);


    const lopecClickElement = document.querySelector(".sc-lopec-click");
    const storageKey = 'lopecClickPosition';

    if (!lopecClickElement) {
        console.error(".sc-lopec-click 요소를 찾을 수 없습니다.");
        return;
    }

    // --- 위치 관련 함수 (loadPosition, applyPosition, savePosition) ---
    function loadPosition() {
        const savedPosition = localStorage.getItem(storageKey);
        if (savedPosition) {
            try {
                const pos = JSON.parse(savedPosition);
                applyPosition(pos); // 부모와 자식 위치 동시 적용
            } catch (e) {
                console.error("저장된 위치 데이터 파싱 오류:", e);
                localStorage.removeItem(storageKey);
                // 기본 위치 적용 (선택 사항)
                // applyPosition({ left: '10px', top: '10px', right: 'auto', bottom: 'auto' });
            }
        } else {
            // 저장된 위치 없을 때 기본 위치 적용 (선택 사항)
            // applyPosition({ left: '10px', top: '10px', right: 'auto', bottom: 'auto' });
        }
    }

    function applyPosition(pos) {
        if (!pos) return;

        // 1. 부모(lopecClickElement) 위치 적용
        lopecClickElement.style.transform = '';
        lopecClickElement.style.left = pos.left ?? 'auto';
        lopecClickElement.style.top = pos.top ?? 'auto';
        lopecClickElement.style.right = pos.right ?? 'auto';
        lopecClickElement.style.bottom = pos.bottom ?? 'auto';

        // 2. 모든 자식(group-user-data) 요소에 위치 적용
        const groupUserDataElements = document.querySelectorAll('.group-user-data');
        groupUserDataElements.forEach(element => {

            // 기존 위치 속성 초기화
            element.style.left = 'auto';
            element.style.right = 'auto';
            element.style.top = 'auto';
            element.style.bottom = 'auto';

            // 가로 위치 설정
            if (pos.left !== 'auto') { // 부모가 왼쪽에 있을 때
                element.style.left = '100%';
            } else if (pos.right !== 'auto') { // 부모가 오른쪽에 있을 때
                element.style.right = '100%';
            }

            // 세로 위치 설정
            if (pos.top !== 'auto') { // 부모가 위쪽에 있을 때
                element.style.top = '0';
            } else if (pos.bottom !== 'auto') { // 부모가 아래쪽에 있을 때
                element.style.bottom = '0';
            }
        });
    }

    function savePosition(pos) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(pos));
        } catch (e) {
            console.error("localStorage 저장 오류:", e);
        }
    }

    // --- 드래그 및 클릭/드래그 구분 관련 변수 ---
    let isDragging = false;       // 실제 드래그 중인지 여부
    let potentialDrag = false;    // 드래그 시작 가능성이 있는지 여부
    let wasDragging = false;      // 직전에 드래그가 있었는지 여부 (클릭 이벤트 방지용)
    let startX = 0;               // mousedown 시 X 좌표
    let startY = 0;               // mousedown 시 Y 좌표
    let offsetX = 0;              // 드래그 시작 시 요소 내부 X 오프셋
    let offsetY = 0;              // 드래그 시작 시 요소 내부 Y 오프셋
    const dragThreshold = 5;      // 드래그로 간주할 최소 이동 거리 (px)

    // --- 드래그 시작 (mousedown) ---
    lopecClickElement.addEventListener("mousedown", (e) => {
        // 1. 'on' 클래스가 있으면 드래그 시작 안 함
        if (lopecClickElement.classList.contains('on')) {
            return;
        }

        // 2. 특정 자식 요소 클릭 시 드래그 시작 방지
        if (e.target.closest('input, button, .btn, a, .group-user-data')) { // group-user-data 내부 클릭 시에도 드래그 방지 추가
            return;
        }

        // 3. 드래그 시작 가능성 설정 및 시작 좌표 기록
        potentialDrag = true;
        isDragging = false; // 아직 실제 드래그는 아님
        wasDragging = false; // 드래그 상태 초기화
        startX = e.clientX;
        startY = e.clientY;

        // 4. mousemove, mouseup 리스너 등록 (드래그 감지 및 종료 처리용)
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        // 5. 기본 커서 설정 (아직 grabbing 아님) - 'on' 클래스가 없을 때만 grab으로 설정
        lopecClickElement.style.cursor = 'grab';
    });

    // --- 드래그 중 (mousemove) ---
    function handleMouseMove(e) {
        // 드래그 시작 가능성이 없으면 아무것도 안 함
        if (!potentialDrag && !isDragging) return;

        // 드래그 시작 가능성이 있다면, 임계값 이상 움직였는지 확인
        if (potentialDrag) {
            const deltaX = Math.abs(e.clientX - startX);
            const deltaY = Math.abs(e.clientY - startY);

            if (deltaX > dragThreshold || deltaY > dragThreshold) {
                // 임계값 이상 움직였으면 실제 드래그 시작
                isDragging = true;
                potentialDrag = false; // 시작 가능성 해제
                wasDragging = true; // 드래그 발생 기록

                // 드래그 스타일 적용
                lopecClickElement.style.cursor = 'grabbing'; // 드래그 중에는 grabbing
                lopecClickElement.style.userSelect = 'none';

                // 현재 위치 기준으로 오프셋 계산 (드래그 시작 시점)
                const rect = lopecClickElement.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
            }
        }

        // 실제 드래그 중일 때만 요소 이동
        if (isDragging) {
            const elementRect = lopecClickElement.getBoundingClientRect();
            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            const constrainedLeft = Math.max(0, Math.min(newLeft, window.innerWidth - elementRect.width));
            const constrainedTop = Math.max(0, Math.min(newTop, window.innerHeight - elementRect.height));

            const centerX = constrainedLeft + elementRect.width / 2;
            const centerY = constrainedTop + elementRect.height / 2;

            const newPosition = { left: 'auto', top: 'auto', right: 'auto', bottom: 'auto' };

            if (centerX > window.innerWidth / 2) {
                newPosition.right = `${window.innerWidth - (constrainedLeft + elementRect.width)}px`;
            } else {
                newPosition.left = `${constrainedLeft}px`;
            }

            if (centerY > window.innerHeight / 2) {
                newPosition.bottom = `${window.innerHeight - (constrainedTop + elementRect.height)}px`;
            } else {
                newPosition.top = `${constrainedTop}px`;
            }

            applyPosition(newPosition); // 부모와 자식 위치 동시 적용
        }
    }

    // --- 드래그 종료 (mouseup) ---
    function handleMouseUp(e) {
        // 드래그 시작 가능성이나 실제 드래그 중이 아니었으면 무시
        if (!potentialDrag && !isDragging) return;

        if (isDragging) {
            // 실제 드래그가 발생했을 경우에만 최종 위치 계산 및 저장
            const finalRect = lopecClickElement.getBoundingClientRect();
            const finalLeft = finalRect.left;
            const finalTop = finalRect.top;
            const finalCenterX = finalLeft + finalRect.width / 2;
            const finalCenterY = finalTop + finalRect.height / 2;

            const finalPosition = { left: 'auto', top: 'auto', right: 'auto', bottom: 'auto' };

            if (finalCenterX > window.innerWidth / 2) {
                finalPosition.right = `${window.innerWidth - (finalLeft + finalRect.width)}px`;
            } else {
                finalPosition.left = `${finalLeft}px`;
            }

            if (finalCenterY > window.innerHeight / 2) {
                finalPosition.bottom = `${window.innerHeight - (finalTop + finalRect.height)}px`;
            } else {
                finalPosition.top = `${finalTop}px`;
            }

            savePosition(finalPosition);
            // applyPosition은 mousemove에서 이미 호출되었으므로 여기서 중복 호출 불필요
        } else {
            // isDragging이 false이면 단순 클릭으로 간주
        }

        // 상태 초기화 및 리스너 제거
        potentialDrag = false;
        isDragging = false;

        lopecClickElement.style.cursor = lopecClickElement.classList.contains('on') ? 'auto' : 'grab';
        lopecClickElement.style.removeProperty('user-select');

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }

    // --- 외부 클릭 시 'on' 클래스 제거 / 내부 클릭 시 'on' 클래스 추가 로직 ---
    window.addEventListener("click", (e) => {
        if (wasDragging) {
            wasDragging = false;
            return;
        }

        // groupUserDataElement 내부 클릭 시 'on' 클래스 유지 (제거 로직 방지)
        if (e.target.closest('.group-user-data')) {
            return;
        }
        if (e.target.classList.contains("del")) { // 삭제버튼 클릭시 on 유지
            return;
        }
        if (!lopecClickElement.classList.contains('on') && lopecClickElement.contains(e.target)) {
            lopecClickElement.classList.add("on");
            lopecClickElement.querySelector(".search-area input").focus();
            lopecClickElement.style.cursor = 'auto';
        } else if (lopecClickElement.classList.contains('on') && !lopecClickElement.contains(e.target)) {
            lopecClickElement.classList.remove("on");
            // 모든 group-user-data 요소들에서 on 클래스 제거
            document.querySelectorAll('.group-user-data').forEach(element => {
                element.classList.remove("on");
            });
            simpleNameFlag = "";
            lopecClickElement.style.cursor = 'grab';
        }
    });

    // --- 탭 간 동기화 (storage 이벤트) ---
    window.addEventListener('storage', (e) => {
        if (e.key === storageKey) {
            if (e.newValue) {
                try {
                    const newPos = JSON.parse(e.newValue);
                    applyPosition(newPos); // 부모와 자식 위치 동시 적용
                } catch (err) {
                    console.error("Error parsing storage event data:", err);
                }
            } else {
                // 위치 데이터가 삭제되었을 때의 처리 (예: 기본 위치로 리셋)
                // applyPosition({ left: '10px', top: '10px', right: 'auto', bottom: 'auto' });
            }
        }
    });

    // --- 초기화 ---
    loadPosition(); // 여기서 applyPosition 호출되어 초기 위치 설정됨
    lopecClickElement.style.position = 'fixed';
    lopecClickElement.style.cursor = lopecClickElement.classList.contains('on') ? 'auto' : 'grab';

}

// 함수 실행
await scLopecClickCreate();


/* **********************************************************************************************************************
* variable name		:	lopecClickSearch
* description       : 	로펙딸깍 검색기능
* useDevice         : 	데스크탑
*********************************************************************************************************************** */
async function lopecClickSearch() {
    if (mobileCheck) {
        return;
    }
    const lopecClickElement = document.querySelector(".sc-lopec-click");
    // let Modules = await importModuleManager();
    // accessoryAbbreviationMap import 추가
    const { accessoryAbbreviationMap } = await import("../filter/filter.js" + `?${Math.floor((new Date).getTime() / interValTime)}`);

    // groupUserDataElementSkeleton 초기화를 가장 먼저 진행
    // 빈 템플릿 생성하여 스켈레톤 HTML 저장
    const tempGroupUserDataHtml = `
    <div class="group-user-data shadow temp-skeleton">
        <div class="name-area">
            <span class="name">로딩중 <em style="color:#adadaa;font-weight:600;">--</em></span>
        </div>
        <div class="etc-area">
            <div class="etc-list">
                <div class="etc-item elxir">
                    <span class="elxir etc">엘릭서: </span>
                    <span class="value">-</span>
                </div>
                <div class="etc-item hyper">
                    <span class="hyper etc">초월합: </span>
                    <span class="value">-</span>
                </div>
            </div>
            <div class="ark-list">
                <div class="ark-item">
                    <span class="name">진화</span>
                    <span class="value">-</span>
                </div>
                <div class="ark-item">
                    <span class="name">깨달음</span>
                    <span class="value">-</span>
                </div>
                <div class="ark-item">
                    <span class="name">도약</span>
                    <span class="value">-</span>
                </div>
            </div>
        </div>
        <div class="armory-area">
            <div class="armory-list armory">
                <div class="armory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <span class="normale-upgrade">+-</span>
                    <span class="parts-name">투구</span>
                    <span class="advanced-upgrade">X-</span>
                </div>
                <div class="armory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <span class="normale-upgrade">+-</span>
                    <span class="parts-name">견갑</span>
                    <span class="advanced-upgrade">X-</span>
                </div>
                <div class="armory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <span class="normale-upgrade">+-</span>
                    <span class="parts-name">상의</span>
                    <span class="advanced-upgrade">X-</span>
                </div>
                <div class="armory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <span class="normale-upgrade">+-</span>
                    <span class="parts-name">하의</span>
                    <span class="advanced-upgrade">X-</span>
                </div>
                <div class="armory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <span class="normale-upgrade">+-</span>
                    <span class="parts-name">장갑</span>
                    <span class="advanced-upgrade">X-</span>
                </div>
                <div class="armory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <span class="normale-upgrade">+-</span>
                    <span class="parts-name">무기</span>
                    <span class="advanced-upgrade">X-</span>
                </div>
            </div>
            <div class="armory-list accessory">
                <div class="accessory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <div class="accessory">
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                    </div>
                </div>
                <div class="accessory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <div class="accessory">
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                    </div>
                </div>
                <div class="accessory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <div class="accessory">
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                    </div>
                </div>
                <div class="accessory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <div class="accessory">
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                    </div>
                </div>
                <div class="accessory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <div class="accessory">
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                        <span class="option tooltip-text">하:-</span>
                    </div>
                </div>
                <div class="accessory-item">
                    <img src="/asset/image/skeleton-img.png" alt="">
                    <div class="accessory">
                        <span class="option">-</span>
                    </div>
                </div>

            </div>
        </div>
        <div class="gem-area">
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="gem-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
        </div>
        <div class="engraving-area">
            <div class="engraving-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="engraving-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="engraving-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="engraving-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
            <div class="engraving-item">
                <img src="/asset/image/skeleton-img.png" alt="">
                <span class="name">-</span>
            </div>
        </div>
    </div>`;

    // 임시로 body에 추가
    document.body.insertAdjacentHTML('beforeend', tempGroupUserDataHtml);
    const tempElement = document.querySelector('.group-user-data.temp-skeleton');

    const groupUserDataElementSkeleton = tempElement.innerHTML;
    // 임시 요소 제거
    tempElement.remove();

    let inputElement = lopecClickElement.querySelector(".group-simple input");
    lopecClickElement.addEventListener("keydown", async (key) => {
        // 한글 입력 이벤트 더블링 처리 <== 젠장 한글 또 너야
        if (key.code === `Enter` && !key.isComposing) {
            await simpleSearch(inputElement.value);
            // await groupUserDataSet(inputElement.value);
        }
    })

    let searchElement = lopecClickElement.querySelector(".group-simple .search");
    searchElement.addEventListener("click", async () => {
        await simpleSearch(inputElement.value);
        // await groupUserDataSet(inputElement.value);
    })
    async function simpleSearch(inputName) {
        let nameElements = lopecClickElement.querySelectorAll(".result-area .result-item.not-sort .name");
        let nameLogArray = Array.from(nameElements).map(name => name.textContent);
        if (nameLogArray.includes(inputName)) {
            return;
        }
        searchElement.textContent = "검색중";
        let data = await Modules.fetchApi.lostarkApiCall(inputName);
        // data가 null일 경우 처리 (API 호출 실패 등)
        if (!data) {
            console.error(`${inputName}의 데이터를 가져오지 못했습니다.`);
            searchElement.textContent = "검색"; // 버튼 텍스트 복구
            // 사용자에게 오류 알림 (선택 사항)
            // alert(`${inputName} 캐릭터 정보를 조회하는데 실패했습니다.`);
            return; // 함수 종료
        }
        let apiCalc = await Modules.apiCalcValue.apiCalcValue(inputName);
        let extractValue = apiCalc.extractValue;
        let calcValue = apiCalc.calcValue;
        // let extractValue = await Modules.transValue.getCharacterProfile(data); <==DB통신모듈 통합및 이전으로 인해 삭제예정
        // let calcValue = await Modules.calcValue.specPointCalc(extractValue);
        // let dataBaseResponse = await Modules.dataBase.dataBaseWrite(data, extractValue, calcValue);
        // if (extractValue.etcObj.supportCheck !== "서폿" && dataBaseResponse.totalStatus !== 0) {
        //     extractValue.defaultObj.totalStatus = dataBaseResponse.totalStatus;
        // } else if (dataBaseResponse.totalStatusSupport !== 0) {
        //     extractValue.defaultObj.totalStatus = dataBaseResponse.totalStatusSupport;
        // }
        // calcValue = await Modules.calcValue.specPointCalc(extractValue);

        let supportMinMedianValue = extractValue.htmlObj.medianInfo.supportMinMedianValue;
        let supportMaxMedianValue = extractValue.htmlObj.medianInfo.supportMaxMedianValue;
        let dealerMinMedianValue = extractValue.htmlObj.medianInfo.dealerMinMedianValue;
        let dealerMaxMedianValue = extractValue.htmlObj.medianInfo.dealerMaxMedianValue;
        let currentSupportScore = calcValue.completeSpecPoint;
        let supportRange = supportMaxMedianValue - supportMinMedianValue;
        let supportPosition = currentSupportScore - supportMinMedianValue;

        // 3. 서포터 위치 정규화 (0 이상 값으로, 상한 제한 없음)
        let normalizedSupport = 0; // 기본값 0
        if (supportRange > 0) { // 0으로 나누는 경우 방지
            normalizedSupport = supportPosition / supportRange;
        }
        // 최소 0으로만 제한 (음수 점수는 없다고 가정)
        normalizedSupport = Math.max(0, normalizedSupport);

        // 4. 딜러 점수 범위 계산
        let dealerRange = dealerMaxMedianValue - dealerMinMedianValue;

        // 5. 최종 딜러 환산 점수 계산
        let dealerSupportConversion = dealerMinMedianValue + (normalizedSupport * dealerRange);

        let convertValue;
        if (extractValue.etcObj.supportCheck === "서폿") {
            convertValue = dealerSupportConversion.toFixed(2);
        } else {
            convertValue = "-";
        }

        // 각 캐릭터마다 고유한 ID 생성 (타임스탬프 + 랜덤값)
        const characterId = `char_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        // 1. 새로 추가할 아이템의 HTML 문자열만 생성
        const newResultItemHtml = `
        <div class="result-item not-sort" title="${inputName}의 상세정보 확인하기" data-character-id="${characterId}">
            <span class="name result">${inputName}</span>
            <span class="job result">${extractValue.etcObj.supportCheck}</span>
            <span class="point result">${calcValue.completeSpecPoint.toFixed(2)}</span>
            <span class="del result">삭제</span>
        </div>`;
        //❌삭제 유니코드 저장용
        let resultBox = lopecClickElement.querySelector('.result-area .result-box');

        // 2. 새 아이템 HTML을 resultBox의 맨 앞에 삽입
        resultBox.insertAdjacentHTML('afterbegin', newResultItemHtml);

        // 3. 이 캐릭터에 대한 group-user-data 생성 및 초기화 
        // (이미 만들어진 groupUserDataElementSkeleton HTML을 기반으로)
        const newGroupUserDataHtml = `
        <div class="group-user-data shadow" data-character-id="${characterId}">
            ${groupUserDataElementSkeleton}
        </div>`;

        // 4. 생성한 group-user-data를 lopecClickElement에 추가
        lopecClickElement.insertAdjacentHTML('beforeend', newGroupUserDataHtml);
        const groupUserDataElements = document.querySelectorAll('.group-user-data');
        groupUserDataElements.forEach(element => {
            positionUserDataElement(lopecClickElement, element)
        });

        function positionUserDataElement(parentElement, userDataElement) {
            // 부모 요소와 자식 요소 찾기
            // const parentElement = document.querySelector(parentSelector);
            // const userDataElement = document.querySelector(childSelector);

            // 요소가 존재하는지 확인
            if (!parentElement || !userDataElement) {
                console.error("부모 요소 또는 group-user-data 요소를 찾을 수 없습니다.");
                return;
            }

            // 부모 요소의 위치 및 크기 정보 가져오기 (뷰포트 기준)
            const parentRect = parentElement.getBoundingClientRect();

            // 뷰포트(화면)의 너비와 높이 가져오기
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // 부모 요소의 중앙 위치가 뷰포트의 어느 사분면에 있는지 판단
            // 부모 요소의 왼쪽 상단 좌표를 기준으로 판단합니다.
            const isInTopHalf = parentRect.top < viewportHeight / 2;
            const isInLeftHalf = parentRect.left < viewportWidth / 2;

            // group-user-data 요소의 위치를 절대 위치로 설정 (필요하다면)
            // CSS에 position: absolute; 가 미리 설정되어 있다면 이 줄은 필요 없을 수 있습니다.
            userDataElement.style.position = 'absolute';

            // 사분면에 따라 group-user-data 요소의 위치 설정
            if (isInTopHalf && isInLeftHalf) {
                // 좌측 상단에 위치한 경우
                userDataElement.style.left = '100%'; // 부모 너비의 100%만큼 오른쪽으로 이동
                userDataElement.style.top = '0';     // 부모의 상단에 맞춤
                userDataElement.style.right = 'auto';// 다른 위치 속성 초기화
                userDataElement.style.bottom = 'auto'; // 다른 위치 속성 초기화
            } else if (!isInTopHalf && isInLeftHalf) {
                // 좌측 하단에 위치한 경우
                userDataElement.style.left = '100%';   // 부모 너비의 100%만큼 오른쪽으로 이동
                userDataElement.style.bottom = '0';  // 부모의 하단에 맞춤
                userDataElement.style.right = 'auto'; // 다른 위치 속성 초기화
                userDataElement.style.top = 'auto';    // 다른 위치 속성 초기화
            } else if (isInTopHalf && !isInLeftHalf) {
                // 우측 상단에 위치한 경우
                userDataElement.style.right = '100%';  // 부모 너비의 100%만큼 왼쪽으로 이동
                userDataElement.style.top = '0';     // 부모의 상단에 맞춤
                userDataElement.style.left = 'auto';   // 다른 위치 속성 초기화
                userDataElement.style.bottom = 'auto'; // 다른 위치 속성 초기화
            } else {
                // 우측 하단에 위치한 경우 (그 외의 경우)
                userDataElement.style.right = '100%';  // 부모 너비의 100%만큼 왼쪽으로 이동
                userDataElement.style.bottom = '0';  // 부모의 하단에 맞춤
                userDataElement.style.left = 'auto';   // 다른 위치 속성 초기화
                userDataElement.style.top = 'auto';    // 다른 위치 속성 초기화
            }
        }

        // 5. 생성된 group-user-data에 데이터 채우기
        await groupUserDataSet(inputName, characterId, data, extractValue, calcValue);

        inputElement.value = "";
        searchElement.textContent = "검색";
    }

    let resultArea = lopecClickElement.querySelector('.result-area');
    resultArea.addEventListener("click", async (e) => {
        let resultItem = e.target.closest(".result-item");
        if (!resultItem) {
            return;
        }
        if (!resultItem.classList.contains('sort')) {
            if (e.target.classList.contains('del')) {
                // 삭제 시 연결된 group-user-data도 함께 삭제
                const characterId = resultItem.dataset.characterId;
                const groupUserData = document.querySelector(`.group-user-data[data-character-id="${characterId}"]`);
                if (groupUserData) {
                    groupUserData.remove();
                }
                resultItem.remove();
            } else {
                // 클릭 시 해당 group-user-data 토글
                const characterId = resultItem.dataset.characterId;
                const allGroupUserData = document.querySelectorAll('.group-user-data');
                allGroupUserData.forEach(element => {
                    if (element.dataset.characterId === characterId) {
                        element.classList.toggle("on");
                    } else {
                        element.classList.remove("on");
                    }
                });
            }
        }
    })
    // let simpleNameFlag = "";
    async function groupUserDataSet(inputName, characterId, fetchedData, fetchedExtractValue, fetchedCalcValue) {
        let groupUserDataElement = document.querySelector(`.group-user-data[data-character-id="${characterId}"]`);
        if (!groupUserDataElement) {
            console.error(`캐릭터 ID ${characterId}에 해당하는 group-user-data를 찾을 수 없습니다.`);
            return;
        }

        // 매개변수로 전달된 데이터가 있으면 사용, 없으면 새로 API 호출
        let data, extractValue, calcValue;

        if (fetchedData && fetchedExtractValue && fetchedCalcValue) {
            // 이미 가져온 데이터 사용
            data = fetchedData;
            extractValue = fetchedExtractValue;
            calcValue = fetchedCalcValue;
        } else {
            // 새로 API 호출 (이전 버전과의 호환성 유지)
            data = await Modules.fetchApi.lostarkApiCall(inputName);
            extractValue = await Modules.transValue.getCharacterProfile(data);
            calcValue = await Modules.calcValue.specPointCalc(extractValue);
        }

        // 유저닉네임 및 직업 설정
        let nameArea = groupUserDataElement.querySelector(".name-area");
        nameArea.innerHTML = `<span class="name">${inputName} <em style="color:#adadaa;font-weight:600;">${extractValue.etcObj.supportCheck} ${data.ArmoryProfile.CharacterClassName}</em></span>`

        // 엘릭서 설정
        let elxirValueElement = groupUserDataElement.querySelector(".etc-item.elxir .value");
        elxirValueElement.textContent = extractValue.htmlObj.elxirInfo.name === "" ? "없음" : extractValue.htmlObj.elxirInfo.name + " " + extractValue.htmlObj.elxirInfo.sumValue;
        // 초월 설정
        let hyperValueElement = groupUserDataElement.querySelector(".etc-item.hyper .value");
        hyperValueElement.textContent = extractValue.htmlObj.hyperInfo.sumValue;

        // 진/깨/도 포인트 설정
        let arkItems = groupUserDataElement.querySelectorAll(".ark-list .ark-item");
        let evloutionValueElement = arkItems[0].querySelector(".value");
        let enlightValueElement = arkItems[1].querySelector(".value");
        let leapValueElement = arkItems[2].querySelector(".value");
        evloutionValueElement.textContent = data.ArkPassive.Points[0].Value
        enlightValueElement.textContent = data.ArkPassive.Points[1].Value
        leapValueElement.textContent = data.ArkPassive.Points[2].Value

        // 장비 설정
        let armoryElements = groupUserDataElement.querySelectorAll(".armory-list.armory .armory-item");
        let helmetElement = armoryElements[0];
        let shoulderElement = armoryElements[1];
        let armorElement = armoryElements[2];
        let pantsElement = armoryElements[3];
        let gloveElement = armoryElements[4];
        let weaponElement = armoryElements[5];
        armoryElementSet(helmetElement, "투구");
        armoryElementSet(shoulderElement, "어깨");
        armoryElementSet(armorElement, "상의");
        armoryElementSet(pantsElement, "하의");
        armoryElementSet(gloveElement, "장갑");
        armoryElementSet(weaponElement, "무기");
        function armoryElementSet(element, typeName) {
            let armoryData = extractValue.htmlObj.armoryInfo.find(armory => armory.type === typeName);
            if (!armoryData) {
                return;
            }
            let icon = armoryData.icon;
            let normalValue = armoryData.name.match(/\+(\d+)/)[0];
            let advancedValue = armoryData.advancedLevel;
            let backgroundClassName = "none";
            if (armoryData.grade === "고대") {
                backgroundClassName = "ultra-background";
            } else if (armoryData.grade === "유물") {
                backgroundClassName = "rare-background";
            }
            if (isNaN(Number(advancedValue))) {
                advancedValue = "0";
            }

            let imgElement = element.querySelector("img");
            let upgradeElement = element.querySelector(".normale-upgrade");
            let advancedUpgradeElement = element.querySelector(".advanced-upgrade");
            imgElement.src = armoryData.icon;
            imgElement.classList.add(backgroundClassName);
            upgradeElement.textContent = `${normalValue}`;
            advancedUpgradeElement.textContent = `X${advancedValue}`;
        }
        function accessoryElementSet() {
            let accessoryElements = groupUserDataElement.querySelectorAll(".armory-list.accessory .accessory-item");
            let necklaceElement = accessoryElements[0];
            let earRingElement1 = accessoryElements[1];
            let earRingElement2 = accessoryElements[2];
            let ringElement1 = accessoryElements[3];
            let ringElement2 = accessoryElements[4];
            let earRingCount = 0;
            let ringCount = 0;

            extractValue.htmlObj.accessoryInfo.forEach(item => {
                let backgroundClassName = "none";
                if (item.grade === "고대") {
                    backgroundClassName = "ultra-background"
                } else if (item.grade === "유물") {
                    backgroundClassName = "rare-background"
                }
                if (item.type === "목걸이") {
                    necklaceElement.querySelector("img").classList.add(backgroundClassName);
                    necklaceElement.querySelector("img").src = item.icon;
                    necklaceElement.querySelector(".accessory").innerHTML = optionElementsCreate();
                } else if (item.type === "귀걸이") {
                    if (earRingCount === 0) {
                        earRingElement1.querySelector("img").classList.add(backgroundClassName);
                        earRingElement1.querySelector("img").src = item.icon;
                        earRingElement1.querySelector(".accessory").innerHTML = optionElementsCreate();
                        earRingCount++;
                    } else {
                        earRingElement2.querySelector("img").classList.add(backgroundClassName);
                        earRingElement2.querySelector("img").src = item.icon;
                        earRingElement2.querySelector(".accessory").innerHTML = optionElementsCreate();
                    }
                } else if (item.type === "반지") {
                    if (ringCount === 0) {
                        ringElement1.querySelector("img").classList.add(backgroundClassName);
                        ringElement1.querySelector("img").src = item.icon;
                        ringElement1.querySelector(".accessory").innerHTML = optionElementsCreate();
                        ringCount++;
                    } else {
                        ringElement2.querySelector("img").classList.add(backgroundClassName);
                        ringElement2.querySelector("img").src = item.icon;
                        ringElement2.querySelector(".accessory").innerHTML = optionElementsCreate();
                    }
                }
                function optionElementsCreate() {
                    let optionHtml = ``;
                    item.accessory.forEach(option => {
                        let name = option.split(":")[0];
                        let grade = option.split(":")[1];

                        // filter.js에서 가져온 매핑 사용
                        let abbreviatedName = accessoryAbbreviationMap[name] || name;

                        if (grade === "low") {
                            grade = `<em style="color:#4671ff;font-size:11px;">하</em>`;
                        } else if (grade === "middle") {
                            grade = `<em style="color:#7a13be;font-size:11px;">중</em>`;
                        } else if (grade === "high") {
                            grade = `<em style="color:#ecc515;font-size:11px;">상</em>`;
                        }
                        optionHtml += `<span class="option tooltip-text">${grade}:${abbreviatedName}</span>`;
                    });
                    return optionHtml;
                }
            })

            // 팔찌 설정
            let bangleElement = accessoryElements[5];
            if (extractValue.htmlObj.bangleInfo) {
                if (extractValue.htmlObj.bangleInfo.grade === "고대") {
                    bangleElement.querySelector("img").classList.add("ultra-background");
                } else if (extractValue.htmlObj.bangleInfo.grade === "유물") {
                    bangleElement.querySelector("img").classList.add("rare-background");
                }
                if (extractValue.etcObj.supportCheck !== "서폿") {
                    bangleElement.querySelector(".option").textContent = calcValue.dealerBangleResult + "%";
                } else if (extractValue.etcObj.supportCheck === "서폿") {
                    bangleElement.querySelector(".option").textContent = calcValue.supportBangleResult.toFixed(2) + "%";
                }
                bangleElement.querySelector("img").src = extractValue.htmlObj.bangleInfo.icon;
            }
        };
        accessoryElementSet();

        // 보석 설정
        let gemAreaElement = groupUserDataElement.querySelector(".gem-area");
        let gemItemHtml = "";
        if (data.ArmoryGem.Gems) {
            data.ArmoryGem.Gems.forEach(gem => {
                let gemSort = gem.Name.match(/(겁화|멸화|작열|홍염)/)[0];
                let gemIndex = 0;
                if (/겁화|멸화/.test(gemSort)) {
                    gemIndex = 0;
                } else if (/작열|홍염/.test(gemSort)) {
                    gemIndex = 1;
                } else {
                    gemIndex = 2;
                }
                gemItemHtml += `
                    <div class="gem-item" data-sort="${gemIndex}">
                        <img src="${gem.Icon}" alt="">
                        <span class="name">${gem.Level}${gemSort}</span>
                    </div>`;
            });
            gemAreaElement.innerHTML = gemItemHtml;
            let gemItemArray = Array.from(gemAreaElement.querySelectorAll(".gem-item"));
            function sortByDataSort(a, b) {
                const sortValueA = parseInt(a.dataset.sort);
                const sortValueB = parseInt(b.dataset.sort);
                if (sortValueA < sortValueB) {
                    return -1;
                }
                if (sortValueA > sortValueB) {
                    return 1;
                }
                return 0;
            }
            // gemItems 배열을 정렬
            gemItemArray.sort(sortByDataSort);
            // 기존의 gem-item들을 gem-area에서 모두 제거
            gemAreaElement.innerHTML = '';

            // 정렬된 gemItems를 gem-area에 다시 추가
            gemItemArray.forEach(item => {
                gemAreaElement.appendChild(item);
            });
        }

        // 각인 설정
        let engravingAreaElement = groupUserDataElement.querySelector(".engraving-area");
        let engravingItemHtml = "";
        extractValue.htmlObj.engravingInfo.forEach(engraving => {
            engravingItemHtml += `
                <div class="engraving-item">
                    <img src="${engraving.icon}" alt="">
                    <span class="grade">${engraving.grade + engraving.level}</span>
                    <span class="name">${engraving.name}</span>
                </div>`;
        })
        engravingAreaElement.innerHTML = engravingItemHtml;

        createTooltip();
    }



    /* **********************************************************************************************************************
    * function name		:	
    * description		: 	ocr모듈 호출 <== 베타 후 제거 예정
    *********************************************************************************************************************** */
    // OCR 기능 부분(베타 후 제거 예정) - 주석 처리됨
    let btnElement = document.querySelector(".sc-lopec-click .auto.btn");
    await LopecOCR.loadDefaultTemplates();
    btnElement.addEventListener("click", async (e) => {
        let searchBtnElement = e.target.closest(".search-area").querySelector(".search.btn");
        let timerCountDown
        try {
            // OCR 실행 (API 키 'free', 버전 'auto')
            let leftTimeCount = 3;
            searchBtnElement.textContent = "검색중";
            btnElement.style.pointerEvents = "none";
            btnElement.style.opacity = "0.2";
            timerCountDown = setInterval(() => {
                if (leftTimeCount >= 0) {
                    btnElement.textContent = `딸깍(${leftTimeCount})`;
                    leftTimeCount--;
                } else {
                    btnElement.style.pointerEvents = "auto";
                    btnElement.style.opacity = "1";
                    btnElement.textContent = `딸깍`;
                    clearInterval(timerCountDown);
                }
            }, 1000)
            const nicknames = await LopecOCR.extractCharactersFromClipboard('auto', {
                onStatusUpdate: (message) => {
                    // statusElement.textContent = message; // 진행 상태 업데이트
                },
                onError: (error) => {
                    clearInterval(timerCountDown);

                    // 사소한 오류는 여기서 처리 가능 (예: OCR API 자체 오류)
                    // errorElement.textContent = `처리 중 오류: ${error.message}`;
                    console.warn('OCR 처리 중 오류 발생:', error);
                }
            });
            console.warn(nicknames)
            if (nicknames.length > 0) {
                nicknames.forEach(name => {
                    simpleSearch(name);
                })
            }
        } catch (error) {
            btnElement.style.pointerEvents = "auto";
            btnElement.style.opacity = "1";
            searchBtnElement.textContent = "검색";
            clearInterval(timerCountDown);
            // alert("이미지가 감지되지 않았습니다.\n파티 입장 후 alt + Printscreen키를 누른 뒤 사용해주세요!")
            // 치명적인 오류 처리 (예: 클립보드 접근 불가, 유효하지 않은 이미지 등)
            // statusElement.textContent = 'OCR 실패';
            // errorElement.textContent = `오류: ${error.message}`;
            console.error('OCR 실행 중 심각한 오류 발생:', error);
        }
    })

}
await lopecClickSearch()
/* **********************************************************************************************************************
 * function name		:	createTooltip()
 * description			: 	.tooltip-text 클래스를 가진 요소에 마우스 오버 시 툴팁을 생성하고, select 요소의 경우 선택된 option의 텍스트를 표시합니다.
 *********************************************************************************************************************** */
function createTooltip() {
    const hoverElements = document.querySelectorAll('.tooltip-text');
    let tooltip = null;
    hoverElements.forEach(element => {
        element.addEventListener('mouseover', (event) => {
            // 툴팁 생성 및 설정
            tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.style.zIndex = "9";
            document.body.appendChild(tooltip);

            // 툴팁 내용 설정
            if (element.tagName === 'SELECT') {
                tooltip.textContent = element.options[element.selectedIndex].textContent;
            } else {
                tooltip.textContent = element.textContent;
            }

            // 툴팁 위치 설정
            updateTooltipPosition(event);
        });

        element.addEventListener('mousemove', (event) => {
            // 툴팁 위치 업데이트
            updateTooltipPosition(event);
        });

        element.addEventListener('mouseout', () => {
            // 툴팁 제거
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });

    function updateTooltipPosition(event) {
        if (tooltip) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            // 툴팁이 화면을 벗어나지 않도록 조정
            let tooltipX = mouseX + 10; // 마우스 오른쪽으로 10px 이동
            let tooltipY = mouseY + 10; // 마우스 아래로 10px 이동

            // 스크롤 위치를 고려하여 툴팁 위치 조정
            tooltipX += window.scrollX;
            tooltipY += window.scrollY;

            if (tooltipX + tooltipWidth > window.innerWidth + window.scrollX) {
                tooltipX = mouseX - tooltipWidth - 10 + window.scrollX; // 마우스 왼쪽으로 이동
            }

            if (tooltipY + tooltipHeight > window.innerHeight + window.scrollY) {
                tooltipY = mouseY - tooltipHeight - 10 + window.scrollY; // 마우스 위쪽으로 이동
            }

            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY}px`;
        }
    }
}
window.addEventListener("load", createTooltip);
// window.body.addEventListener("change", createTooltip);

/* **********************************************************************************************************************
* function name		:	devilDamageCheck()
* description       : 	악추피 적용 여부 체크박스의 상태를 로컬 스토리지에 저장하고 불러옵니다.
* useDevice         : 	모두 사용 (현재 layout.js에 위치)
*********************************************************************************************************************** */
function devilDamageCheck() {
    // 1. 모든 ".devil-box" 요소를 선택
    const elements = document.querySelectorAll(".devil-box"); // 컨테이너 요소들

    // 요소가 없으면 함수 종료 (오류 방지)
    if (elements.length === 0) {
        return;
    }

    elements.forEach(element => {
        const checkBox = element.querySelector("input[type='checkbox']"); // 각 요소 내부의 체크박스 요소
        // 체크박스가 없으면 해당 요소는 건너<0xEB><0x9B><0x84> (오류 방지)
        if (!checkBox) {
            return;
        }

        const storageKey = 'devilDamage'; // 로컬 스토리지 키

        // 2. 페이지 로드 시 로컬 스토리지 값 확인 및 체크박스 상태 설정
        const savedState = localStorage.getItem(storageKey);
        if (savedState === 'true') {
            checkBox.checked = true; // 저장된 값이 'true' 문자열이면 체크 상태로 설정
        } else {
            checkBox.checked = false; // 그 외의 경우 (null, 'false' 등) 체크 해제 상태로 설정
        }

        // 3. 체크박스 상태 변경 시 로컬 스토리지에 저장하는 이벤트 리스너 추가
        const alertShownKey = 'devilDamageAlertShown'; // 로컬 스토리지 키 (알림 표시 여부)
        checkBox.addEventListener("change", () => {
            // 3-1. 알림이 이미 표시되었는지 확인
            const alertShown = localStorage.getItem(alertShownKey);

            if (alertShown !== 'true') {
                // 3-2. 알림이 표시되지 않았다면 알림 표시 및 플래그 저장
                alert("악추피 체크/해제시 자동으로 새로고침이 진행됩니다.\n시뮬레이터에서도 정상작동하니 사전에 체크/해제 해주세요.\n※본 메시지는 최초 1회만 표시됩니다.");
                localStorage.setItem(alertShownKey, 'true');
            }

            // 3-3. 체크박스의 현재 상태를 로컬 스토리지에 저장
            localStorage.setItem(storageKey, checkBox.checked);
            // console.log(`로컬 스토리지 '${storageKey}' 저장됨: ${checkBox.checked}`); // 확인용 로그

            // 3-4. 페이지 새로고침
            location.reload();
        });
    });
}

// 함수 실행하여 기능 활성화
devilDamageCheck();