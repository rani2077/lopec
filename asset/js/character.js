// // /* ############################## character insert */
// // api 결과 받은 시점에 파싱 후 각 개별값을 넘겨주면 디비에 저장

/* **********************************************************************************************************************
 * name		              :	  
 * description            :   api이전으로 인한 미사용예정
 * response				  :   JSON
 * USE_TN                 :   미사용
 *********************************************************************************************************************** */
export async function dataBaseWrite(data, extractValue, specPoint) {
	let totalStatus = 0;
	if (extractValue.etcObj.supportCheck === "서폿") {
		totalStatus = (extractValue.defaultObj.haste + extractValue.defaultObj.special - extractValue.bangleObj.haste - extractValue.bangleObj.special)
	} else {
		totalStatus = (extractValue.defaultObj.haste + extractValue.defaultObj.special + extractValue.defaultObj.crit - extractValue.bangleObj.haste - extractValue.bangleObj.crit - extractValue.bangleObj.special)
	}
	// await Modules.userDataWriteDeviceLog.insertLopecSearch(nameParam); <== 삭제예정
	// console.log(totalStatus)
	let result = await insertLopecCharacters(
		data.ArmoryProfile.CharacterName,                                               // 닉네임 
		data.ArmoryProfile.CharacterLevel,                                              // 캐릭터 레벨 
		extractValue.etcObj.supportCheck + " " + data.ArmoryProfile.CharacterClassName, // 직업 풀네임 
		totalStatus,                                                                    // 프로필 이미지 
		data.ArmoryProfile.ServerName,                                                  // 서버 
		parseFloat(data.ArmoryProfile.ItemMaxLevel.replace(/,/g, '')),                  // 아이템 레벨 
		data.ArmoryProfile.GuildName,                                                   // 길드 
		data.ArmoryProfile.Title,                                                       // 칭호 
		specPoint.dealerlastFinalValue,                                                 // 딜러 통합 스펙포인트 
		specPoint.supportSpecPoint,                                                     // 서폿 통합 스펙포인트 
		specPoint.supportAllTimeBuff,                                                   // 상시버프 
		specPoint.supportFullBuff,                                                      // 풀버프 
		null,                                                                           // 진화 카르마 랭크 <== 제거예정                 
		"2.0"                                                                           // 현재 버전 
	);
	// console.log(result)
	return result;
}

/* **********************************************************************************************************************
 * name		              :	  
 * description            :   api이전으로 인한 미사용예정
 * response				  :   JSON
 * USE_TN                 :   미사용
 *********************************************************************************************************************** */
export var insertLopecCharacters = function (lchaCharacterNickname, lchaCharacterLevel, lchaCharacterClass, lchaCharacterImage
	, lchaServer, lchaLevel, lchaGuild, lchaTitle, lchaTotalsum, lchaTotalsumSupport
	, lchaAlltimebuff, lchaFullbuff, lchaEvoKarma, lchaVersion) {
	return new Promise((resolve, reject) => { // Promise 객체를 반환
		var atMode = "insertCharacter";
		/**
		 *
		 * {
		 * "nickname": "로스트다람쥐",
		 * "characterLevel": 70,
		 * "characterClass": "황후 아르카나",
		 * "characterImage": "2371",
		 * "server": "니나브",
		 * "itemLevel": 1685.83,
		 * "guild": "모코코칩스",
		 * "title": "이클립스",
		 * "totalSum": 1138.85,
		 * "totalSumSupport": 200.27,
		 * "allTimeBuff": 33,
		 * "fullBuff": 71,
		 * "karma": 0,
		 * "version": "2.0"
		 * }
		 *
		 */
		var saveDatas = {
			nickname: lchaCharacterNickname
			, characterLevel: lchaCharacterLevel
			, characterClass: lchaCharacterClass
			, totalStatus: lchaCharacterImage
			, server: lchaServer
			, itemLevel: lchaLevel
			, guild: lchaGuild
			, title: lchaTitle
			, totalSum: lchaTotalsum
			, totalSumSupport: lchaTotalsumSupport
			, allTimeBuff: lchaAlltimebuff
			, fullBuff: lchaFullbuff
			, karma: null
			, version: "2.0"
		}
		console.log(saveDatas)
		console.log(JSON.stringify(saveDatas))
		fetch("https://api.lopec.kr/api/character", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(saveDatas)
		})
			.then(async response => {
				if (!response.ok) {
					// 서버 응답이 실패인 경우 에러를 발생시킵니다.
					return response.text().then(text => { throw new Error(`HTTP error! status: ${response.status}, body: ${text}`); });
				}
				return response.json();
			})
			.then(async msg => {
				// console.log("best score info : " + JSON.stringify(msg));
				// console.log("totalSum : " + msg.totalSum);
				// console.log("totalSumSupport : " + msg.totalSumSupport);
				// console.log(msg)
				if (msg.result == "S") {
					// console.log("LOPEC_API 저장 성공");
				} else if (msg.result == "F") {
					// console.log("LOPEC_API 저장 실패");
				} else if (msg.result == "E") {
					// console.log("LOPEC_API 저장 Exception");
				}
				let rankData = await fetchLostArkRankingData(lchaCharacterNickname, lchaCharacterClass);
				//console.log(msg)
				//console.log(rankData)
				msg.classRank = rankData.classRank;
				msg.totalRank = rankData.totalRank;
				resolve(msg); // 성공 시 resolve 함수를 호출하며 msg 값을 전달
			})
			.catch(error => {
				// console.log("LOPEC_API 저장 Error");
				// console.error(error);
				reject(error); // 실패 시 reject 함수를 호출하며 에러를 전달
			});
	});
}

/* **********************************************************************************************************************
 * name		              :	  fetchLostArkRankingData
 * description            :   DB에 저장된 캐릭터의 직업랭킹 및 전체랭킹을 받아옴
 * response				  :   JSON
 * USE_TN                 :   사용
 * name					  :	  닉네임
 * job					  :   직업명(1차직업 + 뿌리직업)
 *********************************************************************************************************************** */
async function fetchLostArkRankingData(name, job) {
	const ROOT_KEY = 'LOPEC_RANKING_DATA';
	const CACHE_EXPIRATION = 60 * 60 * 1000; // 1시간
	const MAX_ITEMS = 100; // 최대 저장 개수

	// 1. 전체 캐시 객체 가져오기
	const rawCache = sessionStorage.getItem(ROOT_KEY);
	let rootCache = rawCache ? JSON.parse(rawCache) : {};

	// 2. 해당 캐릭터의 데이터 확인 (캐시 히트 체크)
	const charCache = rootCache[name];
	if (charCache) {
		const now = new Date().getTime();
		if (now - charCache.timestamp < CACHE_EXPIRATION) {
			console.log(`[Cache Hit] ${name} 데이터 로드`);
			return charCache.data;
		}
	}

	// 3. 캐시가 없거나 만료된 경우 API 호출
	console.log(`[Cache Miss/Expired] ${name} 데이터 요청`);
	const url = `https://api.lopec.kr/api/ranking?nickname=${encodeURIComponent(name)}&characterClass=${encodeURIComponent(job)}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Accept': 'application/json' }
		});

		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const data = await response.json();

		// 4. 저장 전 개수 제한 체크 (100개 초과 시 가장 오래된 것 삭제)
		const keys = Object.keys(rootCache);
		if (keys.length >= MAX_ITEMS && !rootCache[name]) {
			// timestamp 기준 오름차순 정렬하여 가장 오래된 키 찾기
			const oldestKey = keys.sort((a, b) => rootCache[a].timestamp - rootCache[b].timestamp)[0];
			delete rootCache[oldestKey];
			console.log(`[Cache Clean] 용량 초과로 인해 가장 오래된 데이터(${oldestKey})를 삭제했습니다.`);
		}

		// 5. 데이터 저장/갱신
		rootCache[name] = {
			data: data,
			timestamp: new Date().getTime()
		};
		sessionStorage.setItem(ROOT_KEY, JSON.stringify(rootCache));

		return data;

	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}
/* **********************************************************************************************************************
 * name		              :	  evoKarmaDataBase
 * description            :   진화 카르마 계산에 필요한 값들을 백엔드 서버로 전송
 * response				  :   http status 204 no_content
 * USE_TN                 :   사용
 * inputName			  :	  닉네임
 * extractValue			  :   진화 카르마 계산에 필요한 값이 담긴 객체
 *********************************************************************************************************************** */
//POST http://localhost:8080/api/karma/enlight
//Content-Type: application/json
//export async function evoKarmaDataBase(inputName, extractValue) {
//	let postObj = {
//		EVO_KARMA: {
//			nickname: inputName,
//			cardHP: extractValue.etcObj.evoKarmaMaterial.cardHP,
//			maxHealth: extractValue.etcObj.evoKarmaMaterial.maxHealth,
//			baseHealth: extractValue.etcObj.evoKarmaMaterial.baseHealth,
//			vitalityRate: extractValue.etcObj.evoKarmaMaterial.vitalityRate
//		}
//	}
//	fetch("https://api.lopec.kr/api/karma/evo", {
//		method: "POST",
//		headers: { "Content-Type": 'application/json' },
//		body: JSON.stringify(postObj)
//	})
//}

/* **********************************************************************************************************************
 * name		              :	  dataBaseResponse
 * description            :   DB에 저장된 캐릭터의 스펙포인트 및 특성합 값을 받아옴
 * response				  :   JSON
 * USE_TN                 :   사용
 * inputName			  :	  닉네임
 * extractValue			  :   특성합
 *********************************************************************************************************************** */
export async function dataBaseResponse(inputName, extractValue, data) {
	const urlParam = inputName;
	const decodedText = decodeURIComponent(urlParam);

	let characterInfoObj = {
		nickname: decodedText,
		characterClass: `${extractValue.etcObj.supportCheck} ${extractValue.etcObj.characterClass}`,
		totalStatus: extractValue.defaultObj.totalStatus,
		statusSpecial: extractValue.defaultObj.statusSpecial,
		statusHaste: extractValue.defaultObj.statusHaste,
		characterImage: data.ArmoryProfile.CharacterImage,
		honor: Number(data.ArmoryProfile.HonorPoint),
		server: data.ArmoryProfile.ServerName,
		combatPower: Number(data.ArmoryProfile.CombatPower.replace(/,/g, '')),
	}
	let response = await fetch("https://api.lopec.kr/api/character/stats", {
		method: "POST",
		headers: { "Content-Type": 'application/json' },
		body: JSON.stringify(characterInfoObj)
	})

	let responseData = await response.json()
	// console.log(`${extractValue.etcObj.supportCheck} ${extractValue.etcObj.characterClass}`)
	let rankData = await fetchLostArkRankingData(decodedText, `${extractValue.etcObj.supportCheck} ${extractValue.etcObj.characterClass}`)
	responseData.classRank = rankData.classRank;
	responseData.totalRank = rankData.totalRank;
	return responseData;
}

/* **********************************************************************************************************************
 * name		              :	  specPointUpdate
 * description            :   DB에 저장된 캐릭터의 스펙포인트를 업데이트 함
 * response				  :   http status 204 no_content
 * USE_TN                 :   사용
 * inputName			  :	  닉네임
 * extractValue			  :   
 *********************************************************************************************************************** */

export async function specPointUpdate(inputName, data, extractValue, calcValue) {
	const urlParam = inputName;
	const decodedText = decodeURIComponent(urlParam);

	let characterInfoObj = {
		nickname: decodedText,
		characterClass: `${extractValue.etcObj.supportCheck} ${extractValue.etcObj.characterClass}`,
		totalSum: calcValue.completeSpecPoint,
		itemLevel: Number(data.ArmoryProfile.ItemAvgLevel.replace(/,/g, ''))
	}
	// let characterInfoObj = {
	// 	nickname: "청염각",
	// 	characterClass: "일격 스트라이커",
	// 	totalSum: 1000
	// }
	fetch("https://api.lopec.kr/api/character/best", {
		method: "POST",
		headers: { "Content-Type": 'application/json' },
		body: JSON.stringify(characterInfoObj)
	})
}