import { getJsonCookie, setJsonCookie } from './storage-cookie.js';

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
        let nameListStorage = getJsonCookie('nameList', []);
        // localStorage.removeItem("userBookmark");                                 //로컬스토리지 비우기
        if (nameListStorage.includes(nameParam) || nameListStorage.includes(null)) {
            //로컬스토리지 저장
            nameListStorage = nameListStorage.filter(item => item !== nameParam && item !== null)
            nameListStorage.push(nameParam)
            setJsonCookie('nameList', nameListStorage);
        } else {
            if (nameListStorage.length >= 6) {
                nameListStorage.shift();
            }
            nameListStorage.push(nameParam);
            setJsonCookie('nameList', nameListStorage);
        }
    }
    function headerElement() {
        if (mobileCheck) {    //모바일
            return `
                <header class="sc-header m-header">
                    <div class="m-header__inner">
                        <h1 class="logo">
                            <span class="blind">로스트아크 전투정보실 전투력계산 스펙포인트</span>
                            <a href="/mobile/" class="logo-link" aria-label="LOPEC 홈">
                                <svg class="logo" xmlns="http://www.w3.org/2000/svg" width="143" height="30" fill="none" viewBox="0 0 143 30">
                                    <g clip-path="url(#clip0_9574_130)">
                                        <path d="M53.4388 0V23.8923H48.0779V0H53.4388ZM59.7747 22.7473C58.3819 21.9821 57.2904 20.9277 56.5059 19.5815C55.7185 18.2352 55.3234 16.7019 55.3234 14.9844C55.3234 13.2669 55.7185 11.7619 56.5059 10.4043C57.2932 9.04676 58.3819 7.99244 59.7747 7.23855C61.1675 6.48465 62.748 6.1077 64.5132 6.1077C66.2783 6.1077 67.8247 6.48465 69.2175 7.23855C70.6103 7.99244 71.7018 9.04676 72.4892 10.4043C73.2766 11.7619 73.6717 13.2896 73.6717 14.9844C73.6717 16.6793 73.2766 18.2352 72.4892 19.5815C71.7018 20.9277 70.6103 21.9821 69.2175 22.7473C67.8247 23.5097 66.2556 23.8923 64.5132 23.8923C62.7707 23.8923 61.1675 23.5097 59.7747 22.7473ZM67.2078 18.1332C67.8986 17.3708 68.2453 16.3193 68.2453 14.9844C68.2453 13.6495 67.8957 12.6264 67.1936 11.8498C66.4915 11.0761 65.599 10.6878 64.5132 10.6878C63.4273 10.6878 62.5348 11.0761 61.8327 11.8498C61.1306 12.6235 60.781 13.6693 60.781 14.9844C60.781 16.2995 61.1306 17.3708 61.8327 18.1332C62.5348 18.8984 63.4273 19.2782 64.5132 19.2782C65.599 19.2782 66.5171 18.8984 67.2078 18.1332ZM93.9017 15.0156C93.9017 13.2981 93.5066 11.7648 92.7192 10.4185C91.9318 9.07227 90.8403 8.01795 89.4475 7.25272C88.0547 6.49032 86.4856 6.1077 84.7432 6.1077C83.3475 6.1077 82.0741 6.35711 80.9143 6.83042V6.1077H75.5534V30H80.9143V23.1781C82.0769 23.6486 83.3504 23.8923 84.7432 23.8923C86.4856 23.8923 88.0547 23.5154 89.4475 22.7615C90.8403 22.0076 91.9318 20.9532 92.7192 19.5957C93.5066 18.2381 93.9017 16.7104 93.9017 15.0156ZM88.4782 15.0156C88.4782 16.3307 88.1286 17.3736 87.4265 18.1502C86.7244 18.924 85.8319 19.3122 84.746 19.3122C83.6602 19.3122 82.7676 18.924 82.0655 18.1502C81.3634 17.3765 81.0138 16.3307 81.0138 15.0156C81.0138 13.7005 81.3634 12.6292 82.0655 11.8668C82.7676 11.1016 83.6602 10.7218 84.746 10.7218C85.8319 10.7218 86.75 11.1016 87.4407 11.8668C88.1314 12.6292 88.4782 13.6807 88.4782 15.0156ZM137.113 22.906C136.442 22.2485 136.107 21.4209 136.107 20.4232C136.107 19.4256 136.437 18.5838 137.096 17.9575C137.756 17.3311 138.574 17.0194 139.552 17.0194C140.53 17.0194 141.349 17.3311 142.008 17.9575C142.667 18.5838 142.997 19.4058 142.997 20.4232C142.997 21.4407 142.662 22.2485 141.991 22.906C141.32 23.5635 140.507 23.8923 139.549 23.8923C138.591 23.8923 137.778 23.5635 137.108 22.906H137.113ZM128.702 16.6226C128.532 17.2036 128.279 17.7194 127.904 18.1332C127.213 18.8984 126.315 19.2782 125.209 19.2782C124.103 19.2782 123.231 18.8984 122.528 18.1332C121.826 17.3708 121.477 16.3193 121.477 14.9844C121.477 13.6495 121.826 12.6264 122.528 11.8498C123.231 11.0761 124.123 10.6878 125.209 10.6878C126.295 10.6878 127.187 11.0761 127.889 11.8498C128.273 12.2721 128.529 12.7936 128.702 13.3774H134.222C134.049 12.3118 133.714 11.317 133.185 10.4043C132.398 9.04676 131.306 7.99244 129.913 7.23855C128.52 6.48465 126.951 6.1077 125.209 6.1077C123.466 6.1077 121.863 6.48465 120.47 7.23855C119.078 7.99244 117.986 9.04676 117.202 10.4043C116.414 11.7619 116.019 13.2896 116.019 14.9844C116.019 16.6793 116.414 18.2352 117.202 19.5815C117.989 20.9277 119.078 21.9821 120.47 22.7473C121.863 23.5097 123.444 23.8923 125.209 23.8923C126.974 23.8923 128.52 23.5097 129.913 22.7473C131.306 21.9821 132.398 20.9277 133.185 19.5815C133.711 18.6802 134.046 17.6882 134.22 16.6226H128.702ZM107.728 18.0539C107.708 18.0794 107.693 18.1105 107.674 18.1332C106.983 18.8984 106.085 19.2782 104.979 19.2782C103.873 19.2782 103.001 18.8984 102.298 18.1332C101.918 17.7194 101.662 17.2036 101.485 16.6226H113.99C114.075 16.0954 114.135 15.5541 114.135 14.9844C114.135 13.2867 113.739 11.7619 112.952 10.4043C112.165 9.04676 111.073 7.99244 109.68 7.23855C108.288 6.48465 106.718 6.1077 104.976 6.1077C103.234 6.1077 101.63 6.48465 100.238 7.23855C98.8448 7.99244 97.7533 9.04676 96.9687 10.4043C96.1814 11.7619 95.7863 13.2896 95.7863 14.9844C95.7863 16.6793 96.1814 18.2352 96.9687 19.5815C97.7561 20.9277 98.8448 21.9821 100.238 22.7473C101.63 23.5097 103.211 23.8923 104.976 23.8923C106.741 23.8923 108.288 23.5097 109.68 22.7473C111.073 21.9821 112.165 20.9277 112.952 19.5815C113.233 19.0997 113.447 18.5838 113.629 18.0539H107.728ZM102.296 11.8498C102.998 11.0761 103.89 10.6878 104.976 10.6878C106.062 10.6878 106.954 11.0761 107.657 11.8498C108.04 12.2721 108.296 12.7936 108.469 13.3774H101.483C101.656 12.7936 101.912 12.2749 102.296 11.8498Z" fill="#333333" />
                                        <path d="M30.1276 6.1077H24.0645C22.4926 6.1077 20.4802 7.37742 19.5734 8.94757L14.2153 18.2012H7.78274L13.1408 8.94757C14.0476 7.38025 13.5104 6.1077 11.9385 6.1077C10.3666 6.1077 8.35408 7.37742 7.44733 8.94757L0.440587 21.0411C-0.466167 22.6084 0.0710636 23.881 1.64296 23.881H10.9237L9.02207 27.163C8.11531 28.7303 8.65254 30.0028 10.2244 30.0028C11.7963 30.0028 13.8088 28.7331 14.7156 27.163L16.6172 23.881H19.8349C24.7496 23.881 31.0542 19.8961 33.891 14.9958C36.7278 10.0954 35.0394 6.11053 30.1247 6.11053L30.1276 6.1077ZM23.1237 18.2012H19.906L23.6211 11.7874H26.8388C28.6125 11.7874 29.2237 13.2272 28.1975 14.9958C27.1714 16.7643 24.8974 18.2041 23.1237 18.2041V18.2012Z" fill="#2563EB" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_9574_130">
                                            <rect width="143" height="30" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </h1>
                    </div>
                    <em class="hamburger-button" role="button" tabindex="0">
                        <span class="blind">사이드메뉴 토글 버튼</span>
                        <i class="hamburger-line"></i>
                        <i class="hamburger-line"></i>
                        <i class="hamburger-line"></i>
                    </em>
                    <aside class="sc-sidemenu m-side-menu" aria-label="모바일 내비게이션">
                        <div class="m-side-menu__inner">
                            <div class="m-side-menu__dark-area">
                                <button class="dark-button theme m-side-menu__dark-button" type="button" aria-label="다크모드 전환">
                                    <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 5H22M20 3V7M20.985 12.486C20.8913 14.2221 20.2967 15.894 19.2731 17.2994C18.2495 18.7048 16.8407 19.7837 15.217 20.4055C13.5934 21.0274 11.8244 21.1656 10.1238 20.8035C8.42325 20.4414 6.86398 19.5945 5.63449 18.3652C4.40499 17.1358 3.55791 15.5766 3.19564 13.8761C2.83337 12.1756 2.97142 10.4065 3.5931 8.78282C4.21478 7.15909 5.29348 5.75019 6.6988 4.72644C8.10412 3.70268 9.77589 3.1079 11.512 3.014C11.917 2.992 12.129 3.474 11.914 3.817C11.1949 4.96755 10.887 6.32787 11.0405 7.67595C11.194 9.02403 11.7999 10.2803 12.7593 11.2397C13.7187 12.1991 14.975 12.805 16.3231 12.9585C17.6712 13.112 19.0315 12.8041 20.182 12.085C20.526 11.87 21.007 12.081 20.985 12.486Z" stroke="#2563EB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#AAAAAA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span class="blind">다크모드 전환</span>
                                </button>
                            </div>
                            <nav class="m-side-menu__nav" aria-label="모바일 메뉴">
                                <div class="m-menu-item" data-menu="rank">
                                    <a class="m-menu-button" href="https://lopec.kr/rank/specPoint">
                                        <span class="m-menu-icon">
                                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                <path stroke="#AAA" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.333" d="M2.5 2.5v13.333A1.666 1.666 0 0 0 4.167 17.5H17.5M6.667 10.833H12.5c.46 0 .833.373.833.834v1.666c0 .46-.373.834-.833.834H6.667a.833.833 0 0 1-.834-.834v-1.666c0-.46.373-.834.834-.834m0-6.666H15c.46 0 .833.373.833.833v1.667c0 .46-.373.833-.833.833H6.667a.833.833 0 0 1-.834-.833V5c0-.46.373-.833.834-.833"/>
                                            </svg>
                                        </span>
                                        <span class="m-menu-text">랭킹</span>
                                    </a>
                                </div>
                                <div class="m-menu-item" data-menu="tool">
                                    <a class="m-menu-button" href="https://lopec.kr/tool/mvp">
                                        <span class="m-menu-icon">
                                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                <path d="M8.333 12.5H11.667M12.348 9.163l-.81-1.209.862-1.026a1.665 1.665 0 0 0 .093-1.149 1.668 1.668 0 0 0-.799-.938 1.666 1.666 0 0 0-1.038-.062l-1.516.304-.938-1.295a1.667 1.667 0 0 0-1.72-.613 1.668 1.668 0 0 0-1.255 1.365l-.12 1.597-1.438.355a1.667 1.667 0 0 0-.927 2.481 1.666 1.666 0 0 0 1.3.807l.547.225M15.685 9.163l1.883-4.484a.833.833 0 0 0-.25-.978l-2.975-1.164a.833.833 0 0 0-1.045.464l-.77 1.768M3.333 10.005a.833.833 0 0 1 .829-.838h11.671c.221 0 .433.088.589.244.156.156.244.368.244.589v5.834c0 .442-.176.866-.489 1.178a1.666 1.666 0 0 1-1.178.489H5c-.442 0-.866-.176-1.178-.489a1.666 1.666 0 0 1-.489-1.178v-5.828Z" stroke="#AAAAAA" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                        <span class="m-menu-text">도구</span>
                                    </a>
                                </div>
                            </nav>
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
                            <a href="https://lopec.kr/" class="logo-link" aria-label="LOPEC 홈">
                                <svg class="logo" xmlns="http://www.w3.org/2000/svg" width="143" height="30" fill="none" viewBox="0 0 143 30">
                                    <g clip-path="url(#clip0_9574_130)">
                                        <path d="M53.4388 0V23.8923H48.0779V0H53.4388ZM59.7747 22.7473C58.3819 21.9821 57.2904 20.9277 56.5059 19.5815C55.7185 18.2352 55.3234 16.7019 55.3234 14.9844C55.3234 13.2669 55.7185 11.7619 56.5059 10.4043C57.2932 9.04676 58.3819 7.99244 59.7747 7.23855C61.1675 6.48465 62.748 6.1077 64.5132 6.1077C66.2783 6.1077 67.8247 6.48465 69.2175 7.23855C70.6103 7.99244 71.7018 9.04676 72.4892 10.4043C73.2766 11.7619 73.6717 13.2896 73.6717 14.9844C73.6717 16.6793 73.2766 18.2352 72.4892 19.5815C71.7018 20.9277 70.6103 21.9821 69.2175 22.7473C67.8247 23.5097 66.2556 23.8923 64.5132 23.8923C62.7707 23.8923 61.1675 23.5097 59.7747 22.7473ZM67.2078 18.1332C67.8986 17.3708 68.2453 16.3193 68.2453 14.9844C68.2453 13.6495 67.8957 12.6264 67.1936 11.8498C66.4915 11.0761 65.599 10.6878 64.5132 10.6878C63.4273 10.6878 62.5348 11.0761 61.8327 11.8498C61.1306 12.6235 60.781 13.6693 60.781 14.9844C60.781 16.2995 61.1306 17.3708 61.8327 18.1332C62.5348 18.8984 63.4273 19.2782 64.5132 19.2782C65.599 19.2782 66.5171 18.8984 67.2078 18.1332ZM93.9017 15.0156C93.9017 13.2981 93.5066 11.7648 92.7192 10.4185C91.9318 9.07227 90.8403 8.01795 89.4475 7.25272C88.0547 6.49032 86.4856 6.1077 84.7432 6.1077C83.3475 6.1077 82.0741 6.35711 80.9143 6.83042V6.1077H75.5534V30H80.9143V23.1781C82.0769 23.6486 83.3504 23.8923 84.7432 23.8923C86.4856 23.8923 88.0547 23.5154 89.4475 22.7615C90.8403 22.0076 91.9318 20.9532 92.7192 19.5957C93.5066 18.2381 93.9017 16.7104 93.9017 15.0156ZM88.4782 15.0156C88.4782 16.3307 88.1286 17.3736 87.4265 18.1502C86.7244 18.924 85.8319 19.3122 84.746 19.3122C83.6602 19.3122 82.7676 18.924 82.0655 18.1502C81.3634 17.3765 81.0138 16.3307 81.0138 15.0156C81.0138 13.7005 81.3634 12.6292 82.0655 11.8668C82.7676 11.1016 83.6602 10.7218 84.746 10.7218C85.8319 10.7218 86.75 11.1016 87.4407 11.8668C88.1314 12.6292 88.4782 13.6807 88.4782 15.0156ZM137.113 22.906C136.442 22.2485 136.107 21.4209 136.107 20.4232C136.107 19.4256 136.437 18.5838 137.096 17.9575C137.756 17.3311 138.574 17.0194 139.552 17.0194C140.53 17.0194 141.349 17.3311 142.008 17.9575C142.667 18.5838 142.997 19.4058 142.997 20.4232C142.997 21.4407 142.662 22.2485 141.991 22.906C141.32 23.5635 140.507 23.8923 139.549 23.8923C138.591 23.8923 137.778 23.5635 137.108 22.906H137.113ZM128.702 16.6226C128.532 17.2036 128.279 17.7194 127.904 18.1332C127.213 18.8984 126.315 19.2782 125.209 19.2782C124.103 19.2782 123.231 18.8984 122.528 18.1332C121.826 17.3708 121.477 16.3193 121.477 14.9844C121.477 13.6495 121.826 12.6264 122.528 11.8498C123.231 11.0761 124.123 10.6878 125.209 10.6878C126.295 10.6878 127.187 11.0761 127.889 11.8498C128.273 12.2721 128.529 12.7936 128.702 13.3774H134.222C134.049 12.3118 133.714 11.317 133.185 10.4043C132.398 9.04676 131.306 7.99244 129.913 7.23855C128.52 6.48465 126.951 6.1077 125.209 6.1077C123.466 6.1077 121.863 6.48465 120.47 7.23855C119.078 7.99244 117.986 9.04676 117.202 10.4043C116.414 11.7619 116.019 13.2896 116.019 14.9844C116.019 16.6793 116.414 18.2352 117.202 19.5815C117.989 20.9277 119.078 21.9821 120.47 22.7473C121.863 23.5097 123.444 23.8923 125.209 23.8923C126.974 23.8923 128.52 23.5097 129.913 22.7473C131.306 21.9821 132.398 20.9277 133.185 19.5815C133.711 18.6802 134.046 17.6882 134.22 16.6226H128.702ZM107.728 18.0539C107.708 18.0794 107.693 18.1105 107.674 18.1332C106.983 18.8984 106.085 19.2782 104.979 19.2782C103.873 19.2782 103.001 18.8984 102.298 18.1332C101.918 17.7194 101.662 17.2036 101.485 16.6226H113.99C114.075 16.0954 114.135 15.5541 114.135 14.9844C114.135 13.2867 113.739 11.7619 112.952 10.4043C112.165 9.04676 111.073 7.99244 109.68 7.23855C108.288 6.48465 106.718 6.1077 104.976 6.1077C103.234 6.1077 101.63 6.48465 100.238 7.23855C98.8448 7.99244 97.7533 9.04676 96.9687 10.4043C96.1814 11.7619 95.7863 13.2896 95.7863 14.9844C95.7863 16.6793 96.1814 18.2352 96.9687 19.5815C97.7561 20.9277 98.8448 21.9821 100.238 22.7473C101.63 23.5097 103.211 23.8923 104.976 23.8923C106.741 23.8923 108.288 23.5097 109.68 22.7473C111.073 21.9821 112.165 20.9277 112.952 19.5815C113.233 19.0997 113.447 18.5838 113.629 18.0539H107.728ZM102.296 11.8498C102.998 11.0761 103.89 10.6878 104.976 10.6878C106.062 10.6878 106.954 11.0761 107.657 11.8498C108.04 12.2721 108.296 12.7936 108.469 13.3774H101.483C101.656 12.7936 101.912 12.2749 102.296 11.8498Z" fill="#333333" />
                                        <path d="M30.1276 6.1077H24.0645C22.4926 6.1077 20.4802 7.37742 19.5734 8.94757L14.2153 18.2012H7.78274L13.1408 8.94757C14.0476 7.38025 13.5104 6.1077 11.9385 6.1077C10.3666 6.1077 8.35408 7.37742 7.44733 8.94757L0.440587 21.0411C-0.466167 22.6084 0.0710636 23.881 1.64296 23.881H10.9237L9.02207 27.163C8.11531 28.7303 8.65254 30.0028 10.2244 30.0028C11.7963 30.0028 13.8088 28.7331 14.7156 27.163L16.6172 23.881H19.8349C24.7496 23.881 31.0542 19.8961 33.891 14.9958C36.7278 10.0954 35.0394 6.11053 30.1247 6.11053L30.1276 6.1077ZM23.1237 18.2012H19.906L23.6211 11.7874H26.8388C28.6125 11.7874 29.2237 13.2272 28.1975 14.9958C27.1714 16.7643 24.8974 18.2041 23.1237 18.2041V18.2012Z" fill="#2563EB" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_9574_130">
                                            <rect width="143" height="30" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </h1>
                    </div>
                    <div class="group-link">
                        <a href="https://lopec.kr/rank/specPoint" class="link-box" data-page="rank">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <path stroke="#AAA" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.333" d="M2.5 2.5v13.333A1.666 1.666 0 0 0 4.167 17.5H17.5M6.667 10.833H12.5c.46 0 .833.373.833.834v1.666c0 .46-.373.834-.833.834H6.667a.833.833 0 0 1-.834-.834v-1.666c0-.46.373-.834.834-.834m0-6.666H15c.46 0 .833.373.833.833v1.667c0 .46-.373.833-.833.833H6.667a.833.833 0 0 1-.834-.833V5c0-.46.373-.833.834-.833"/>
                            </svg>
                            <span class="text">랭킹</span>
                        </a>
                        <a href="https://lopec.kr/tool/mvp" class="link-box" data-page="tool">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <path d="M7.5 6.66667H13.3333M6.66667 10H11.6667M9.16667 13.3333H13.3333M4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5Z" stroke="#AAAAAA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span class="text">도구</span>
                        </a>
                    </div>
                    <div class="group-search">
                        <form action="/search/search.html" class="search-area search-page on">
                            <input id="headerInput" autocomplete="off" name="headerCharacterName" class="header-input character-name-search" type="text" value="" placeholder="닉네임을 입력해주세요">
                            <button class="search-btn" type="submit">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path d="M21 21L16.66 16.66M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="blind">검색버튼</span>
                            </button>
                        </form>
                        <div class="dark-area" style="display:flex;align-items:center;">
                            <button class="dark-button theme header-dark-button" type="button" aria-label="다크모드 전환" aria-pressed="false">
                                <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 5H22M20 3V7M20.985 12.486C20.8913 14.2221 20.2967 15.894 19.2731 17.2994C18.2495 18.7048 16.8407 19.7837 15.217 20.4055C13.5934 21.0274 11.8244 21.1656 10.1238 20.8035C8.42325 20.4414 6.86398 19.5945 5.63449 18.3652C4.40499 17.1358 3.55791 15.5766 3.19564 13.8761C2.83337 12.1756 2.97142 10.4065 3.5931 8.78282C4.21478 7.15909 5.29348 5.75019 6.6988 4.72644C8.10412 3.70268 9.77589 3.1079 11.512 3.014C11.917 2.992 12.129 3.474 11.914 3.817C11.1949 4.96755 10.887 6.32787 11.0405 7.67595C11.194 9.02403 11.7999 10.2803 12.7593 11.2397C13.7187 12.1991 14.975 12.805 16.3231 12.9585C17.6712 13.112 19.0315 12.8041 20.182 12.085C20.526 11.87 21.007 12.081 20.985 12.486Z" stroke="#2563EB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#AAAAAA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="blind">다크모드 변환</span>
                            </button>
                        </div>
                    </div>
                </section>
            </header>`;
        }
    }
    document.body.insertAdjacentHTML('afterbegin', headerElement());

    // 네비 현재 경로 on 표시
    (function setActiveNav(){
        try{
            const path = window.location.pathname || '';
            const rankLink = document.querySelector('.sc-header .group-link [data-page="rank"]');
            const toolLink = document.querySelector('.sc-header .group-link [data-page="tool"]');
            if(path.startsWith('/rank') && rankLink){ rankLink.classList.add('on'); }
            else if(path.startsWith('/tool') && toolLink){ toolLink.classList.add('on'); }
        }catch(e){ /* noop */ }
    })();

    function injectMobileSearch() {
        const header = document.querySelector('header.sc-header.m-header');
        if (!header) { return; }
        if (document.querySelector('.js-mobile-search')) { return; }

        const searchSection = document.createElement('section');
        searchSection.className = 'm-search js-mobile-search';
        searchSection.setAttribute('aria-label', '캐릭터 검색');
        searchSection.innerHTML = `
            <form class="m-search__form" action="/mobile/search/search.html" method="get" novalidate>
                <div class="m-search__input-card">
                    <input
                        autocomplete="off"
                        name="headerCharacterName"
                        class="m-search__input character-name-search"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        aria-label="닉네임을 입력해주세요"
                    />
                </div>
                <button class="m-search__button" type="submit">
                    <span class="blind">검색버튼</span>
                    <svg class="m-search__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" focusable="false">
                        <path d="M21 21L16.66 16.66M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </form>
        `;

        header.insertAdjacentElement('afterend', searchSection);

        const form = searchSection.querySelector('.m-search__form');
        const input = form ? form.querySelector('.m-search__input') : null;
        if (!form || !input) { return; }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const value = input.value != null ? input.value.trim() : '';
            if (value.length < 2) {
                alert('최소 2글자이상 입력해 주세요');
                input.focus();
                return;
            }

            addSearchTerm('nameList', value);

            const redirectUrl = `${window.location.origin}/mobile/search/search.html?headerCharacterName=${encodeURIComponent(value)}`;
            window.location.href = redirectUrl;
        });

        function addSearchTerm(key, rawValue) {
            if (!rawValue) { return; }

            const trimmedValue = rawValue.trim();
            if (trimmedValue.length === 0) { return; }

            let storedList = getJsonCookie(key, []);
            if (!Array.isArray(storedList)) {
                storedList = [];
            }

            const existingIndex = storedList.indexOf(trimmedValue);
            if (existingIndex !== -1) {
                storedList.splice(existingIndex, 1);
            }

            storedList.unshift(trimmedValue);

            const MAX_ITEMS = 6;
            if (storedList.length > MAX_ITEMS) {
                storedList = storedList.slice(0, MAX_ITEMS);
            }

            setJsonCookie(key, storedList);
        }
    }

    if (mobileCheck) {
        injectMobileSearch();
        const hamburgerButton = document.querySelector(".hamburger-button");
        const sideMenu = document.querySelector("header .sc-sidemenu");
        const sideBlur = document.querySelector("header .side-blur");

        if (hamburgerButton && sideMenu) {
            const openMenu = () => {
                hamburgerButton.classList.add("on");
                sideMenu.classList.add("on");
                if (sideBlur) {
                    sideBlur.classList.add("on");
                }
            };

            const closeMenu = () => {
                hamburgerButton.classList.remove("on");
                sideMenu.classList.remove("on");
                if (sideBlur) {
                    sideBlur.classList.remove("on");
                }
            };

            hamburgerButton.addEventListener("click", function () {
                if (hamburgerButton.classList.contains("on")) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            if (sideBlur) {
                sideBlur.addEventListener("click", closeMenu);
            }

            sideMenu.addEventListener("click", function (event) {
                if (!event.target.closest(".m-side-menu__inner")) {
                    closeMenu();
                }
            });

            const currentPath = window.location.pathname || "";
            const normalizedPath = currentPath.replace(/^\/mobile/, "");
            const menuItems = sideMenu.querySelectorAll(".m-menu-item");

            menuItems.forEach(function (item) {
                const trigger = item.querySelector(".m-menu-button");
                const submenu = item.querySelector(".m-submenu");
                if (!trigger) { return; }

                if (submenu) {
                    trigger.setAttribute("aria-expanded", trigger.getAttribute("aria-expanded") || "false");

                    trigger.addEventListener("click", function (event) {
                        event.preventDefault();
                        const isOpen = item.classList.toggle("is-open");
                        item.classList.toggle("is-active", isOpen);
                        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
                    });
                }

                const linkElements = submenu ? submenu.querySelectorAll("a") : item.querySelectorAll("a");
                let isActive = false;

                linkElements.forEach(function (link) {
                    const href = link.getAttribute("href") || "";
                    if (!href) { return; }
                    let linkPath = href;
                    try {
                        linkPath = new URL(href, window.location.origin).pathname;
                    } catch (e) {
                        /* noop */
                    }
                    if (linkPath && (
                        currentPath === linkPath ||
                        currentPath.startsWith(linkPath) ||
                        normalizedPath === linkPath ||
                        normalizedPath.startsWith(linkPath)
                    )) {
                        isActive = true;
                    }
                });

                if (isActive) {
                    item.classList.add("is-active");
                    if (submenu) {
                        item.classList.add("is-open");
                        trigger.setAttribute("aria-expanded", "true");
                    }
                }
            });
        }
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
    const DARK_MODE_KEY = 'darkMode';
    const toggleSelector = '.header-dark-button, .m-side-menu__dark-button, .dark-mode-button';
    const toggleButtons = document.querySelectorAll(toggleSelector);

    function syncToggleState(isEnabled) {
        document.querySelectorAll('.header-dark-button, .m-side-menu__dark-button').forEach((button) => {
            button.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
        });
        const legacyCheckbox = document.querySelector('.dark-mode-button .checkbox');
        if (legacyCheckbox) {
            legacyCheckbox.checked = isEnabled;
        }
    }

    function enableDarkMode() {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem(DARK_MODE_KEY, 'enabled');
        syncToggleState(true);
    }

    function disableDarkMode() {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem(DARK_MODE_KEY, 'disabled');
        syncToggleState(false);
    }

    function toggleDarkMode() {
        if (localStorage.getItem(DARK_MODE_KEY) === 'enabled') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    if (localStorage.getItem(DARK_MODE_KEY) === 'enabled') {
        enableDarkMode();
    } else {
        syncToggleState(false);
    }

    if (toggleButtons.length) {
        toggleButtons.forEach((button) => {
            button.addEventListener('click', toggleDarkMode);
        });
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

    const nameListStorage = getJsonCookie('nameList', []);            // 쿠키 최근 검색어
    const userBookmarkStorage = getJsonCookie('userBookmark', []);    // 쿠키 즐겨찾기 목록
    const recentNameList = [...nameListStorage].reverse();            // 최신순으로 정렬
    const bookmarkNameList = [...userBookmarkStorage].reverse();      // 최신순으로 정렬

    let recentNameBox = ""
    let bookmarkNameBox = ""
    let mobilePath = "";
    if (mobileCheck) {
        mobilePath = "/mobile"
    }
    recentNameList.forEach(function (recentNameArry) {                                       //최근검색HTML목록

        recentNameBox += `
            <div class="name-box" data-sort="recent">
                <a href="${mobilePath}/search/search.html?headerCharacterName=${recentNameArry}" class="name">${recentNameArry}</a>
                <em class="del remove" aria-label="삭제">
                    <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#333333" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </em>
            </div>`;
    })

    bookmarkNameList.forEach(function (bookmarkArry) {

        bookmarkNameBox += `
        <div class="name-box" data-sort="bookmark">
            <a href="${mobilePath}/search/search.html?headerCharacterName=${bookmarkArry}" class="name">${bookmarkArry}</a>
            <em class="del remove" aria-label="삭제">
                <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#333333" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </em>
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
            const frag = document.createRange().createContextualFragment(recentBookmark());
            const mobileForm = document.querySelector('.js-mobile-search .m-search__form');
            const container = mobileForm
                || document.querySelector('.sc-header .group-search .search-area')
                || document.querySelector('.sc-header .group-search')
                || document.body;
            container.appendChild(frag);
        }

        let recentHtml = document.querySelector(".group-recent")
        const searchGroup = document.querySelector('.js-mobile-search') || document.querySelector(".group-search");
        if (mobileCheck && searchGroup) {
            // 모바일 검색화면 뒤로가기 버튼 & 스크롤 금지
            searchGroup.classList.add("on");
            document.documentElement.style.overflow = 'hidden';
        } else {
            // 데스크탑: CSS가 입력영역 기준으로 위치를 제어함 (JS 위치 보정 불필요)

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
        const storedNameList = getJsonCookie('nameList', []);
        const nowUserName = storedNameList.length ? storedNameList[storedNameList.length - 1] : null;   // 현재 검색된 유저명
        document.querySelectorAll(".group-recent .memo .remove").forEach(function (removeBtn) {

            removeBtn.addEventListener("click", function () {
                let nowRecentName = removeBtn.parentElement.querySelector(".name").textContent       // 선택한 유저명
                console.log(removeBtn.parentElement.getAttribute("data-sort"))

                if (removeBtn.parentElement.getAttribute("data-sort") == "recent") {

                    const cookieNameList = getJsonCookie('nameList', []);
                    const updatedNameList = cookieNameList.filter(item => item !== nowRecentName);
                    setJsonCookie('nameList', updatedNameList);

                } else if (removeBtn.parentElement.getAttribute("data-sort") == "bookmark") {

                    const cookieBookmarkList = getJsonCookie('userBookmark', []);
                    const updatedBookmarkList = cookieBookmarkList.filter(item => item !== nowRecentName);
                    setJsonCookie('userBookmark', updatedBookmarkList);

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
    const input = document.querySelector(".js-mobile-search input[type='text']")
        || document.querySelector(".group-search input[type='text']");
    const searchGroup = document.querySelector('.js-mobile-search') || document.querySelector(".group-search");

    setTimeout(function () {
        if (!recentHTML || !input) {
            recentFlag = 0;
            return;
        }

        if (!input.contains(document.activeElement) && !recentHTML.contains(document.activeElement)) {
            if (mobileCheck && searchGroup) {
                searchGroup.classList.remove("on")
                document.documentElement.style.overflow = '';
            }
            recentHTML.remove()
            recentFlag = 0;
        }
    }, 0)
}
const searchInputSelector = ".group-search input[type='text'], .js-mobile-search input[type='text']";
document.querySelectorAll(searchInputSelector).forEach(function (element) {
    userInputMemoHtml(element);
    element.addEventListener("blur", inputBlur);
});


/* **********************************************************************************************************************
* variable name		:	scFooterCreate
* description       : 	footer요소를 생성함
* useDevice         : 	모두 사용
*********************************************************************************************************************** */
function scFooterCreate() {
    let footerElement = "";
    const copyMarkup = `© 2024 lopec.kr All Rights Reserved.${mobileCheck ? '<br>' : ' '}This site is not associated with Smilegate RPG & Smilegate Stove.${mobileCheck ? '<br>' : ' '}Data based on Lostark Open API.`;

    if (mobileCheck) {
        footerElement = `
        <footer class="sc-footer sc-footer--mobile">
            <div class="sc-footer__container">
                <div class="sc-footer__copy">
                    <span class="sc-footer__text">${copyMarkup}</span>
                </div>
            </div>
        </footer>`;
    } else {
        footerElement = `
        <footer class="sc-footer">
            <div class="sc-footer__container">
                <div class="sc-footer__copy">
                    <span class="sc-footer__text">${copyMarkup}</span>
                </div>
                <div class="sc-footer__links">
                    <a class="sc-footer__link" href="https://cool-kiss-ec2.notion.site/FAQ-1da758f0e8da80618220fe697190f345" target="_blank">1:1문의</a>
                    <a class="sc-footer__link" href="https://cool-kiss-ec2.notion.site/120758f0e8da80889d2fe738c694a7a1" target="_blank">후원안내</a>
                    <a class="sc-footer__link" href="https://discord.com/invite/5B8SjX4ug4" target="_blank">디스코드</a>
                    <a class="sc-footer__link" href="https://cool-kiss-ec2.notion.site/LOPEC-CREDIT-1cc758f0e8da80a18f49f93dafb886f3" target="_blank">Credit</a>
                </div>
            </div>
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
    if (!footer) { return; }
    if (footer.classList.contains('sc-footer--mobile')) {
        footer.style.removeProperty('top');
        footer.style.removeProperty('width');
        footer.style.removeProperty('display');
        return;
    }
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
    const bodyWidth = document.querySelector("body").offsetWidth;
    const header = document.querySelector("header");
    if (header) {
        header.style.width = bodyWidth + "px";
    }
    const footer = document.querySelector("footer");
    if (footer && !footer.classList.contains('sc-footer')) {
        footer.style.width = bodyWidth + "px";
    }
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
* description       : 	localStorage에서 'devilDamage'와 'devilDamageAlertShown' 키를 삭제합니다.
* useDevice         : 	모두 사용 (현재 layout.js에 위치)
*********************************************************************************************************************** */
function devilDamageCheck() {
    const devilDamageKey = 'devilDamage';
    const alertShownKey = 'devilDamageAlertShown';

    if (localStorage.getItem(devilDamageKey)) {
        localStorage.removeItem(devilDamageKey);
    }

    if (localStorage.getItem(alertShownKey)) {
        localStorage.removeItem(alertShownKey);
    }
}

devilDamageCheck();
