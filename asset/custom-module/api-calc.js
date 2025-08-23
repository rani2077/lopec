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
        // { key: 'apiCalcValue', path: '../custom-module/api-calc.js' },
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
 * name		              :	  apiCalcValue
 * description            :   DB에서 가져온 값을 이용해 진화 카르마 랭크를 계산해 extractValue에 반영
 * USE_TN                 :   사용
 *********************************************************************************************************************** */
//function evoKarmaRank(evoKarma, extractValue) {
//    if (evoKarma >= 21) {
//        extractValue.karmaObj.evolutionKarmaRank = 6;
//        extractValue.arkObj.evolutionDamage += 0.06;
//        extractValue.arkObj.stigmaPer += 6;
//    }
//    else if (evoKarma >= 17) {
//        extractValue.karmaObj.evolutionKarmaRank = 5;
//        extractValue.arkObj.evolutionDamage += 0.05;
//        extractValue.arkObj.stigmaPer += 5;
//    }
//    else if (evoKarma >= 13) {
//        extractValue.karmaObj.evolutionKarmaRank = 4;
//        extractValue.arkObj.evolutionDamage += 0.04;
//        extractValue.arkObj.stigmaPer += 4;
//    }
//    else if (evoKarma >= 9) {
//        extractValue.karmaObj.evolutionKarmaRank = 3;
//        extractValue.arkObj.evolutionDamage += 0.03;
//        extractValue.arkObj.stigmaPer += 3;
//    }
//    else if (evoKarma >= 5) {
//        extractValue.karmaObj.evolutionKarmaRank = 2;
//        extractValue.arkObj.evolutionDamage += 0.02;
//        extractValue.arkObj.stigmaPer += 2;
//    }
//    else if (evoKarma >= 1) {
//        extractValue.karmaObj.evolutionKarmaRank = 1;
//        extractValue.arkObj.evolutionDamage += 0.01;
//        extractValue.arkObj.stigmaPer += 1;
//    }
//    else if (evoKarma === 0) {
//        extractValue.karmaObj.evolutionKarmaRank = 0;
//    }
//    else extractValue.karmaObj.evolutionKarmaRank = null; //미등록
//    extractValue.arkObj.statHp = evoKarma * 400
//    extractValue.karmaObj.evolutionKarmaLevel = evoKarma;
//}

/* **********************************************************************************************************************
 * name		              :	  apiCalcValue
 * description            :   api를 사용한 스펙포인트 값과 DB를 사용해 계산된 스펙포인트 값을 비교하여 올바른 값을 사용
 * response				  :   OBJECT
 * USE_TN                 :   사용
 * inputName			  :	  닉네임
 *********************************************************************************************************************** */
export async function apiCalcValue(inputName) {
    let data = await Modules.fetchApi.lostarkApiCall(inputName);

    // 보석 프리셋 불러오기
    let gemSaveData = JSON.parse(localStorage.getItem('gemSlot'));
    let gemSetCheck = localStorage.getItem('gemSet');
    //console.log(gemSetCheck)
    if (gemSetCheck === inputName) {
        data.ArmoryGem = gemSaveData;
    } else {
        window.localStorage.removeItem("gemSet");
    }

    // 스펙포인트 계산
    let extractValue = await Modules.transValue.getCharacterProfile(data);
    //await Modules.dataBase.evoKarmaDataBase(inputName, extractValue); // 카르마 계산에 필요한 값을 서버로 전송하는 함수
    let dataBase = await Modules.dataBase.dataBaseResponse(inputName, extractValue, data);
    extractValue.defaultObj.totalStatus = dataBase.totalStatus ? dataBase.totalStatus : 0;
    extractValue.defaultObj.statusHaste = dataBase.statusHaste ? dataBase.statusHaste : 0;
    extractValue.defaultObj.statusSpecial = dataBase.statusSpecial ? dataBase.statusSpecial : 0;
    //evoKarmaRank(dataBase.evoKarma, extractValue);

    // if (dataBase.evoKarma >= 21) extractValue.karmaObj.evolutionKarmaRank = 6; <== 추후 삭제 예정
    // else if (dataBase.evoKarma >= 17) extractValue.karmaObj.evolutionKarmaRank = 5;
    // else if (dataBase.evoKarma >= 13) extractValue.karmaObj.evolutionKarmaRank = 4;
    // else if (dataBase.evoKarma >= 9) extractValue.karmaObj.evolutionKarmaRank = 3;
    // else if (dataBase.evoKarma >= 5) extractValue.karmaObj.evolutionKarmaRank = 2;
    // else if (dataBase.evoKarma >= 1) extractValue.karmaObj.evolutionKarmaRank = 1;
    // else if (dataBase.evoKarma === 0) extractValue.karmaObj.evolutionKarmaRank = 0;
    //console.log(window.location.href)
    // else extractValue.karmaObj.evolutionKarmaRank = '미등록';
    let calcValue = await Modules.calcValue.specPointCalc(extractValue);
    //let devilDmgCheck = localStorage.getItem("devilDamage")
    if (
        window.location.href.includes("lopec.kr") &&                // url이 lopec.kr일 경우
        window.location.href.includes("search") &&                  // 검색결과 페이지의 경우
        calcValue.completeSpecPoint > dataBase.totalSum &&          // 계산된 스펙포인트가 DB값보다 큰 경우
        //devilDmgCheck === "true" &&                               // 악추피 체크를 한 경우
        !gemSetCheck                                                // 저장된 보석설정을 로드하지 않은 경우
    ) {
        // DB 저장 함수
        Modules.dataBase.specPointUpdate(inputName, data, extractValue, calcValue);
        let checkUserList = [
            "쥬쥬",
            "히후히후",
            "sunea",
            "지니지니치치",
            "잇괴",
            "1파티4번도화가",
            "컨저링투에나오는귀신이름",
            "별을사랑하는엠제이",
            "왼쪽뺨도갈겨라",
            "처음키우는도화가",
            "연주자",
            "메이시에",
            "구원왕김구원",
            "챙뱌",
            "닼됴니",
            "애니붓",
            "작은바드님",
            "임희은",
            "소리징징",
            "돌돌말은김밥",
            "bbuy0",
            "하앙폿",
            "프레이mayer",
            "힐중독",
            "햬나",
            "말랑모찡",
            "김만수르",
            "근돼남",
            "밍쓴",
            "멍나니",
            "세츨링",
            "리니링",
            "홀리은가비",
            "Sana",
            "꿀꿀됴화",
            "satzzi",
            "진국화",
            "짱수정",
            "진아공쥬님",
            "댕아강",
            "백매린",
            "초숭달",
            "도아가호떡",
            "힐러푸우",
            "수원맘카페일진녀",
            "알로o",
            "천승호",
            "Muffy",
            "청염각"
        ];
        if (checkUserList.includes(inputName)) {
            let debugData = {
                extractValue: extractValue,
                data: data
            };

            // console.log("특별관리대상", inputName)
            // console.log(debugData)

            await fetch("https://api.lopec.kr/api/temp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nickname": inputName,
                    "content": JSON.stringify(debugData)
                })
            });
        };

    }
    let result = {};
    result.dataBase = dataBase;
    result.extractValue = extractValue;
    result.calcValue = calcValue;
    result.data = data;
    return result;
}
