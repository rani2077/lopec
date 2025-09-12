async function importModuleManager() {
    let interValTime = 60 * 1000;
    let modules = await Promise.all([
        import(`../filter/filter.js?${Math.floor((new Date).getTime() / interValTime)}`),              // CDN 로드 주석 처리
        import(`../filter/simulator-filter.js?${Math.floor((new Date).getTime() / interValTime)}`),   // CDN 로드 주석 처리
        // import(`../filter/offcial-combat-dealer.js?${Math.floor((new Date).getTime() / interValTime)}`),   // CDN 로드 주석 처리
        //import("../filter/filter.js" + `?${Math.floor((new Date).getTime() / interValTime)}`),              // 기존 타임스탬프 방식 복구
        //import("../filter/simulator-filter.js" + `?${Math.floor((new Date).getTime() / interValTime)}`), // 기존 타임스탬프 방식 복구
    ])
    let moduleObj = {
        originFilter: modules[0],
        simulatorFilter: modules[1],
        //officialCombatDealer: modules[2].officialCombatDealer,
    }
    return moduleObj
}

// 필터
// import {
//     keywordList,
//     grindingFilter,
//     arkFilter,
//     bangleJobFilter,
//     engravingImg,
//     engravingCalFilter,
//     dealerAccessoryFilter,
//     calAccessoryFilter,
//     elixirFilter,
//     cardPointFilter,
//     bangleFilter,
//     engravingCheckFilter,
//     stoneCheckFilter,
//     elixirCalFilter,
//     arkCalFilter,
//     // engravingCheckFilterLowTier,
//     classGemFilter,
// } from '../filter/filter.js';
// import * as Filter from "../filter/filter.js";
// import * as SimulatorFilter from "../filter/simulator-filter.js";


export async function getCharacterProfile(data, dataBase) {
    let Modules = await importModuleManager();
    // console.log(Modules.originFilter)
    // console.log(Modules.simulatorFilter.bangleOptionData.t4MythicData)



    // 호출api모음
    let characterImage = data.ArmoryProfile.CharacterImage //캐릭터 이미지
    let characterLevel = data.ArmoryProfile.CharacterLevel //캐릭터 레벨
    let characterNickName = data.ArmoryProfile.CharacterName //캐릭터 닉네임
    let characterClass = data.ArmoryProfile.CharacterClassName //캐릭터 직업
    let serverName = data.ArmoryProfile.ServerName //서버명
    let itemLevel = data.ArmoryProfile.ItemMaxLevel //아이템레벨
    let guildNullCheck = data.ArmoryProfile.GuildName //길드명
    function guildName() {
        if (guildNullCheck == null) {
            return ("없음")
        } else {
            return (guildNullCheck)
        }
    }
    let titleNullCheck = data.ArmoryProfile.Title //칭호명
    function titleName() {
        if (titleNullCheck == null) {
            return ("없음")
        } else {
            return (titleNullCheck)
        }
    }


    /* **********************************************************************************************************************
     * name		              :     htmlObj{}
     * version                :     2.0
     * description            :     search, m-search 페이지에서 사용될 정보를 저장하는 객체 
     * inUse                  :     사용중
     *********************************************************************************************************************** */

    let htmlObj = {};

    /* **********************************************************************************************************************
     * name		              :	 suppportCheck{}
     * version                :   2.0
     * description            :   서폿/딜러 검증 및 직업각인 포함 직업명 출력 
     * inUse                  :   사용중
     *********************************************************************************************************************** */

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
    function supportCheck() {
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
     * name		              :	 allCardDescriptions[]
     * version                :   2.0
     * description            :   카르마 랭크 뻥튀기 방지를 위한 카드 옵션 검사
     * inUse                  :   사용중
     *********************************************************************************************************************** */


    //let allCardDescriptions = []; // 모든 Description을 저장할 배열 초기화
    //
    //if (data.ArmoryCard && data.ArmoryCard.Effects && Array.isArray(data.ArmoryCard.Effects)) {
    //    // effect를 순회
    //    data.ArmoryCard.Effects.forEach(effect => {
    //        // 현재 effect 객체와 그 안의 Items가 존재하고 배열인지 확인
    //        if (effect && effect.Items && Array.isArray(effect.Items)) {
    //            // item 순회
    //            effect.Items.forEach(item => {
    //                // Description 속성이 존재하는지 확인
    //                if (item && item.Description) {
    //                    // Description 값을 allCardDescriptions 배열에 추가
    //                    allCardDescriptions.push(item.Description);
    //                }
    //            });
    //        }
    //    });
    //}
    //
    //let totalMaxHpBonus = 0; // 추출된 최대 생명력 보너스 합계
    //
    //// allCardDescriptions 순회
    //allCardDescriptions.forEach(description => {
    //    // "최대 생명력"이 포함되어 있는지 확인
    //    if (description.includes("최대 생명력")) {
    //        // 정규식
    //        const regex = /최대 생명력 \+(\d+(?:\.\d+)?)\%/;
    //        const match = description.match(regex);
    //
    //        // 정규식 매칭에 성공했고, 숫자를 포함한 그룹이 있는지 확인합니다.
    //        if (match && match[1]) {
    //            // 추출된 숫자 문자열을 부동소수점 숫자로 변환하여 합계에 더합니다.
    //            totalMaxHpBonus += parseFloat(match[1]);
    //        }
    //    }
    //});
    //
    ////console.log("최대 생명력 보너스 총합:", totalMaxHpBonus);
    //totalMaxHpBonus = (totalMaxHpBonus / 100)
    //console.log(totalMaxHpBonus)



    /* **********************************************************************************************************************
     * name		              :	  bangleTierFnc{}
     * version                :   2.0
     * description            :   캐릭터의 팔찌 티어 검사
     * inUse                  :   사용 중
     *********************************************************************************************************************** */


    let bangleOptionArry = [];
    let bangleSpecialStats = ["힘", "민첩", "지능", "체력"]

    data.ArmoryEquipment.forEach(function (arry) {
        if (arry.Type == "팔찌") {
            let bangleTier = JSON.parse(arry.Tooltip).Element_001.value.leftStr2.replace(/<[^>]*>/g, '').replace(/\D/g, '')
            let bangleTool = JSON.parse(arry.Tooltip)?.Element_005?.value?.Element_001
            if (bangleTier && bangleTool) {
                bangleTierFnc(bangleTier, bangleTool)
            }
        }
    })


    // 팔찌 티어 검사 후 옵션 배열저장
    function bangleTierFnc(bangle, bangleTool) {
        if (bangle == 3) {
            let regex = />([^<]+)</g;
            let regexEnd = />([^<]*)$/;
            let matches;

            while ((matches = regex.exec(bangleTool)) !== null) {
                // console.log(matches[1])
                bangleOptionArry.push(matches[1].trim());
            }
            if ((matches = regexEnd.exec(bangleTool)) !== null) {
                bangleOptionArry.push(matches[1].trim());
            }

        } else if (bangle == 4) {
            let regex = />([^<]+)</g;
            let regexEnd = />([^<]*)$/;
            let matches;

            while ((matches = regex.exec(bangleTool)) !== null) {
                // console.log(matches[1])
                bangleOptionArry.push(matches[1].trim());
            }
            if ((matches = regexEnd.exec(bangleTool)) !== null) {
                bangleOptionArry.push(matches[1].trim());
            }
        }
    }

    /* **********************************************************************************************************************
     * name		             :	 etcObj{}
     * version               :   2.0
     * description           :   하나의 종류로 묶이지 않는 값들을 묶기 위한 객체
     * inUse                 :   사용중
     *********************************************************************************************************************** */

    let etcObj = {
        expeditionStats: 0,
        gemsCoolAvg: 0,
        gemAttackBonus: 0,
        abilityAttackBonus: 0,
        armorStatus: 0,
        healthStatus: 0,
        RealHealthStauts: 0,
        avatarStats: 1,
        supportCheck: supportCheck(),
        characterClass: data.ArmoryProfile.CharacterClassName,
        gemCheckFnc: {
            specialSkill: 1,
            originGemValue: 1,
            gemValue: 1,
            gemAvg: 0,
            etcAverageValue: 1,
        },

    }

    /* **********************************************************************************************************************
     * name		             :	 defaultObj{}
     * version               :   2.0
     * description           :   캐릭터의 기본 스탯 요소 종합
     * inUse                 :   special/haste/crit 제외 미사용
     *********************************************************************************************************************** */

    let defaultObj = {
        combatPower: 0,
        attackPow: 0,
        baseAttackPow: 0,
        criticalChancePer: 0,
        addDamagePer: 0,
        criticalDamagePer: 200,
        moveSpeed: 14,
        atkSpeed: 14,
        skillCool: 0,
        special: 0,
        haste: 0,
        crit: 0,
        weaponAtk: 0,
        maxHp: 0,
        statHp: 0,
        hpActive: 0,
        estherDeal: 1,
        estherSupport: 1,
    }
    defaultObj.combatPower = parseFloat(data.ArmoryProfile.CombatPower.replace(/,/g, ''));
    data.ArmoryProfile.Stats.forEach(function (statsArry) {
        if (statsArry.Type == "공격력") {
            defaultObj.attackPow = Number(statsArry.Value)
        } else if (statsArry.Type == "치명") {
            let regex = />(\d+(\.\d+)?)%/;
            defaultObj.criticalChancePer = Number(statsArry.Tooltip[0].match(regex)[1])
            defaultObj.crit = Number(statsArry.Value)
        } else if (statsArry.Type == "신속") {
            let atkMoveSpeed = statsArry.Tooltip[0].match(/>(\d+(\.\d+)?)%<\/font>/)[1]
            let skillCool = statsArry.Tooltip[2].match(/>(\d+(\.\d+)?)%<\/font>/)[1]
            defaultObj.atkSpeed += Number(atkMoveSpeed)
            defaultObj.moveSpeed += Number(atkMoveSpeed)
            defaultObj.skillCool = Number(skillCool)
            defaultObj.haste = Number(statsArry.Value)
        } else if (statsArry.Type == "특화") {
            defaultObj.special = Number(statsArry.Value)
        } else if (statsArry.Type == "최대 생명력") {
            defaultObj.maxHp = Number(statsArry.Value)
            defaultObj.statHp = Number(statsArry.Tooltip[1].match(/>(\d+(\.\d+)?)<\/font>/)[1])
            //defaultObj.hpActive = Number(statsArry.Tooltip[2].match(/<font[^>]*>(\d+(\.\d+)?)%<\/font>/)[1])
            //console.log(defaultObj.hpActive)
        }
    })


    let vitalitySum = 0; // 툴팁에서 추출한 생명 활성력 합계를 위한 변수
    data.ArmoryEquipment.forEach(function (equip) {
        if (equip.Type == "무기") {
            let quality = JSON.parse(equip.Tooltip).Element_001.value.qualityValue;
            let esther = JSON.parse(equip.Tooltip).Element_001.value.leftStr0;

            if (esther && esther.includes("에스더")) {
                defaultObj.estherDeal = 1.01
                defaultObj.estherSupport = 1.005
            }
            defaultObj.addDamagePer += 10 + 0.002 * (quality ** 2);

        } else if (/투구|상의|하의|장갑|어깨/.test(equip.Type)) { // 방어구 5종
            try {
                let tooltipJson = JSON.parse(equip.Tooltip);
                let vitalityValue = 0; // 해당 장비에서 찾은 값
                let foundVitality = false; // 찾았는지 여부 플래그

                // Element_006.value.Element_001 확인
                let vitalityStringFrom006 = tooltipJson?.Element_008?.value?.Element_001;
                if (vitalityStringFrom006 && vitalityStringFrom006.startsWith("생명 활성력")) {
                    const match = vitalityStringFrom006.match(/\d+/);
                    if (match) {
                        vitalityValue = Number(match[0]);
                        foundVitality = true; // 006에서 찾음
                    }
                }

                // Element_006에서 못 찾았으면 Element_007.value.Element_001 확인
                if (!foundVitality) { // 006에서 못 찾았을 경우에만 007 확인
                    let vitalityStringFrom007 = tooltipJson?.Element_007?.value?.Element_001;
                    if (vitalityStringFrom007 && vitalityStringFrom007.startsWith("생명 활성력")) {
                        const match = vitalityStringFrom007.match(/\d+/);
                        if (match) {
                            vitalityValue = Number(match[0]);
                            // foundVitality 플래그는 여기서 설정할 필요 없음 (마지막 확인이므로)
                        }
                    }
                }

                vitalitySum += vitalityValue; // 해당 장비에서 찾은 값을 합계에 더함 (못 찾으면 0)

            } catch (e) {
                console.error("Error parsing tooltip or finding vitality for:", equip.Type, e);
            }
        }
    });

    //console.log(vitalitySum)
    //defaultObj.hpActive = (0.000071427 * vitalitySum) + 1
    defaultObj.hpActive = 1 + (vitalitySum / 14000);

    // 무기 공격력
    data.ArmoryEquipment.forEach(function (weapon) {
        if (weapon.Type == "무기") {
            const regex = /무기 공격력\s*\+(\d+)/;
            defaultObj.weaponAtk = Number(weapon.Tooltip.match(regex)[1])
        }
    })


    // baseAttckPow(기본 공격력 stats)
    data.ArmoryProfile.Stats.forEach(function (stats) {
        if (stats.Type == "공격력") {
            const regex = />(\d+)</
            defaultObj.baseAttackPow += Number(stats.Tooltip[1].match(regex)[1])
        }
    })

    etcObj.expeditionStats = Math.floor((data.ArmoryProfile.ExpeditionLevel - 1) / 2) * 5 + 5 // 원정대 힘민지


    /* **********************************************************************************************************************
     * name		              :	  jobObj{}
     * version                :   2.0
     * description            :   직업별 기본 스탯 요소 종합
     * USE_TN                 :   finalDamagePer 제외 미사용
     *********************************************************************************************************************** */


    let jobObj = {
        criticalChancePer: 0,
        criticalDamagePer: 0,
        moveSpeed: 0,
        atkSpeed: 0,
        skillCool: 0,
        atkPer: 0,
        healthPer: 0,

        finalDamagePer: 1,
        criFinalDamagePer: 1,
    }

    Modules.originFilter.arkFilter.forEach(function (filterArry) {

        let plusArry = []
        let perArry = []

        objExtrudeFnc(jobObj, plusArry, perArry)

        plusArry.forEach(function (plusAttr) {
            if (filterArry.initial == supportCheck() && !(filterArry[plusAttr] == undefined)) {
                jobObj[plusAttr] = filterArry[plusAttr]
            }
        })
        perArry.forEach(function (percent) {
            if (filterArry.initial == supportCheck() && !(filterArry[percent] == undefined)) {
                jobObj[percent] = (filterArry[percent] / 100) + 1
            }

        })

    })

    function objExtrudeFnc(object, plus, percent) {
        Object.keys(object).forEach(function (objAttr) {
            if (object[objAttr] == 0) {
                plus.push(objAttr);
            } else if (object[objAttr] == 1) {
                percent.push(objAttr);
            }
        })
    }


    /* **********************************************************************************************************************
     * name		              :	  accObj{}
     * version                :   2.0
     * description            :   악세서리 옵션 값 추출
     * USE_TN                 :   enlightPoint 미사용
     *********************************************************************************************************************** */


    let accObj = {
        addDamagePer: 0,
        finalDamagePer: 1,
        weaponAtkPlus: 0,
        weaponAtkPer: 0,
        atkPlus: 0,
        atkPer: 0,
        statHp: 0,
        criticalChancePer: 0,
        criticalDamagePer: 0,
        stigmaPer: 0,
        atkBuff: 0,
        damageBuff: 0,
        enlightPoint: 0,
        carePower: 0,
        identityUptime: 1,
        utilityPower: 0,

    }


    function equimentCalPoint() {
        data.ArmoryEquipment.forEach(function (equipArry) {
            let accOption
            try {
                accOption = JSON.parse(equipArry.Tooltip).Element_006.value.Element_001
                accessoryFilterFnc(accOption)
            }
            catch { }

        })
    }


    equimentCalPoint()
    function accessoryFilterFnc(accessoryOption) {
        const cleanAccessoryOption = accessoryOption.replace(/<[^>]*>/g, ' ');

        Modules.originFilter.calAccessoryFilter.forEach(function (filterArry) {
            let optionCheck = cleanAccessoryOption.includes(filterArry.name)
            if (optionCheck && filterArry.attr == "AddDamagePer") { //추가 피해 %
                accObj.addDamagePer += filterArry.value
            } else if (optionCheck && filterArry.attr == "FinalDamagePer") { //에게 주는 피해가 %
                accObj.finalDamagePer += (filterArry.value / 100)
            } else if (optionCheck && filterArry.attr == "WeaponAtkPlus") { //무기 공격력 +
                accObj.weaponAtkPlus += filterArry.value
            } else if (optionCheck && filterArry.attr == "WeaponAtkPer") { //무기 공격력 %
                accObj.weaponAtkPer += filterArry.value
            } else if (optionCheck && filterArry.attr == "AtkPlus") { //공격력 +
                accObj.atkPlus += filterArry.value
            } else if (optionCheck && filterArry.attr == "AtkPer") { //공격력 %   
                accObj.atkPer += filterArry.value
            } else if (optionCheck && filterArry.attr == "CriticalChancePer") { //치명타 적중률 %
                accObj.criticalChancePer += filterArry.value
            } else if (optionCheck && filterArry.attr == "CriticalDamagePer") { //치명타 피해 %
                accObj.criticalDamagePer += filterArry.value
            } else if (optionCheck && filterArry.attr == "StigmaPer") { //낙인력 %
                accObj.stigmaPer += filterArry.value
            } else if (optionCheck && filterArry.attr == "AtkBuff") { //아군 공격력 강화 %
                accObj.atkBuff += filterArry.value
            } else if (optionCheck && filterArry.attr == "DamageBuff") { //아군 피해량 강화 %
                accObj.damageBuff += filterArry.value
            } else if (optionCheck && filterArry.attr == "CarePower") { // 아군 보호막, 회복 강화 %
                accObj.carePower += filterArry.value
            } else if (optionCheck && filterArry.attr == "StatHp") { // 최대 생명력
                accObj.statHp += filterArry.value
            } else if (optionCheck && filterArry.attr == "UtilityPower") { // 유틸력
                accObj.utilityPower += filterArry.value
            } else if (optionCheck && filterArry.attr == "IdentityUptime") { // 게이지 획득량
                accObj.identityUptime += filterArry.value
            }
        })
    }
    accObj.finalDamagePer *= ((accObj.criticalChancePer * 0.684) / 100 + 1)
    accObj.finalDamagePer *= ((accObj.criticalDamagePer * 0.3625) / 100 + 1)
    //accObj.finalDamagePer *= ((accObj.weaponAtkPer * 0.4989) / 100 + 1)
    //accObj.finalDamagePer *= ((accObj.atkPer * 0.9246) / 100 + 1)



    // 악세 깨달음 포인트
    data.ArmoryEquipment.forEach(function (arry) {
        let regex = /"([^"]*)"/g;
        let matches = [];
        let match;
        if (/목걸이|귀걸이|반지/.test(arry.Type)) {
            while ((match = regex.exec(arry.Tooltip)) !== null) {             // ""사이값 추출
                matches.push(match[1]);
            }
            let enlightStr = matches.filter(item => /깨달음/.test(item));     // 깨달음 포인트값 추출
            accObj.enlightPoint += Number(enlightStr[0]?.match(/\d+/)[0]);
        }
    })


    /* **********************************************************************************************************************
     * name		              :	  bangleObj{}
     * version                :   2.0
     * description            :   팔찌 옵션 값 추출
     * USE_TN                 :   critical / atk&moveSpeed / skillCool 미사용
     *********************************************************************************************************************** */


    let bangleObj = {
        atkPlus: 0,
        atkPer: 0,
        weaponAtkPlus: 0,
        weaponAtkBonus: 0,
        criticalDamagePer: 0,
        criticalChancePer: 0,
        addDamagePer: 0,
        moveSpeed: 0,
        atkSpeed: 0,
        skillCool: 0,
        atkBuff: 0,
        atkBuffPlus: 1,
        damageBuff: 0,
        leapPoint: 0,

        crit: 0,
        special: 0,
        haste: 0,

        str: 0,
        dex: 0,
        int: 0,
        statHp: 0,
        carePower: 0,

        weaponAtkPer: 1,
        finalDamagePer: 1,
        finalDamagePerEff: 1,
        criFinalDamagePer: 1,
        devilDamagePer: 1,
    }

    bangleOptionArry.forEach(function (realBangleArry, realIdx) {

        let plusArry = ['atkPlus', 'atkPer', 'weaponAtkPlus', 'criticalDamagePer', 'criticalChancePer', 'addDamagePer', 'moveSpeed', 'atkSpeed', "skillCool", 'atkBuff', 'damageBuff', 'carePower', 'weaponAtkBonus']
        let perArry = ['weaponAtkPer', 'finalDamagePer', 'criFinalDamagePer', 'finalDamagePerEff', 'atkBuffPlus', "devilDamagePer"]
        let statsArry = ["치명:crit", "특화:special", "신속:haste", "힘:str", "민첩:dex", "지능:int", "최대 생명력:statHp"];

        statsArry.forEach(function (stats) {
            const statName = stats.split(":")[0];
            const statKey = stats.split(":")[1];

            if (realBangleArry === statName) {
                const valueString = bangleOptionArry[realIdx + 1];
                if (valueString) {
                    const valueMatch = valueString.match(/\d+/);
                    if (valueMatch && valueMatch[0]) {
                        bangleObj[statKey] += Number(valueMatch[0]);
                    }
                }
            }
        });


        Modules.originFilter.bangleFilter.forEach(function (filterArry) {

            if (realBangleArry == filterArry.name && bangleOptionArry[realIdx + 1] == filterArry.option && filterArry.secondCheck == null) {
                typeCheck(filterArry)

            } else if (realBangleArry == filterArry.name && filterArry.option == null && filterArry.secondCheck == null) {
                typeCheck(filterArry)

            } else if (realBangleArry == filterArry.name && bangleOptionArry[realIdx + 1] == filterArry.option && bangleOptionArry[realIdx + 2] != filterArry.secondCheck) {
                typeCheck(filterArry)

            }

        })
        function typeCheck(validValue) {
            plusArry.forEach(function (value) {
                if (!(validValue[value] == undefined)) {

                    bangleObj[value] += validValue[value]
                    // console.log(value+" : "+bangleObj[value])
                }
            })
            perArry.forEach(function (value) {
                if (!(validValue[value] == undefined)) {
                    // console.log(value+" : "+ bangleObj[value])
                    bangleObj[value] *= (validValue[value] / 100) + 1 // <== 
                }
            })
        }
    })
    //let devilCheck = localStorage.getItem("devilDamage");
    // if (devilCheck !== "true") {
    // console.log(bangleObj)
    //if (devilCheck === "true") {
    // bangleObj.devilDamagerPer = 1;
    bangleObj.finalDamagePer = bangleObj.finalDamagePer * bangleObj.devilDamagePer;
    //}


    function leapPoint() {
        let result = 0;
        data.ArmoryEquipment.forEach(function (armor) {

            if (/^(팔찌)$/.test(armor.Type)) {


                if (armor.Tooltip && typeof armor.Tooltip === 'string') {
                    const allMatches = armor.Tooltip.match(/도약 \+\d+/g);

                    if (allMatches) {
                        allMatches.forEach(matchText => {
                            const numberMatch = matchText.match(/\d+/);

                            if (numberMatch) {
                                result += Number(numberMatch[0]);
                            }
                        });
                    }
                }
            }
        });
        return result;
    }
    bangleObj.leapPoint = leapPoint()

    /* **********************************************************************************************************************
     * name		              :	  bangleBlockStats
     * version                :   2.0
     * description            :   직업에 따라 팔찌의 힘/민첩/지능 수치를 일부 무효처리함
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function bangleBlockStats() {
        let userClass = data.ArmoryProfile.CharacterClassName;
        let filter = Modules.originFilter.bangleJobFilter;
        let vailedStat = filter.find(item => item.job === userClass).stats;
        if (vailedStat === "str") {
            bangleObj.dex = 0;
            bangleObj.int = 0;
        } else if (vailedStat === "dex") {
            bangleObj.str = 0;
            bangleObj.int = 0;
        } else if (vailedStat === "int") {
            bangleObj.str = 0;
            bangleObj.dex = 0;
        }
        defaultObj.statusSpecial = (defaultObj.special - bangleObj.special)
        defaultObj.statusHaste = (defaultObj.haste - bangleObj.haste)

        if (supportCheck() === "서폿") {
            defaultObj.totalStatus = (defaultObj.haste + defaultObj.special - bangleObj.haste - bangleObj.special)
        } else {
            defaultObj.totalStatus = (defaultObj.haste + defaultObj.special + defaultObj.crit - bangleObj.haste - bangleObj.crit - bangleObj.special)
        }
        // console.log(dataBase)

    };
    bangleBlockStats();


    /* **********************************************************************************************************************
     * name		              :	  hyperObj{}
     * version                :   2.0
     * description            :   초월 옵션 값 추출
     * USE_TN                 :   사용
     *********************************************************************************************************************** */


    let hyperPoint = 0;
    let hyperArmoryLevel = 0;
    let hyperWeaponLevel = 0;

    function hyperCalcFnc(e) {
        let hyperStr = data.ArmoryEquipment[e].Tooltip;


        const regex = /(\[초월\]\s*.*?\s*<\/img>\s*\d{1,2})/;
        const hyperMatch = hyperStr.match(regex);

        try {
            let hyperReplace = hyperMatch[0].replace(/<[^>]*>/g, ' ')
            hyperReplace = hyperReplace.replace(/\s+/g, ',')
            let hyperArry = hyperReplace.split(","); //초월,N(단계),단계,N(성)
            hyperPoint += Number(hyperArry[3]) * 1600 + Number(hyperArry[1] * 3400)
            return Number(hyperArry[3])
        } catch {
            return 0
        }
    }

    data.ArmoryEquipment.forEach(function (arry, idx) {
        if (arry.Type == "무기") {
            hyperWeaponLevel += hyperCalcFnc(idx)
        } else {
            hyperArmoryLevel += hyperCalcFnc(idx)
        }
    })

    let hyperSum = hyperWeaponLevel + hyperArmoryLevel

    let hyperObj = {
        atkPlus: 0,
        weaponAtkPlus: 0,
        atkBuff: 0,
        stigmaPer: 0,

        str: 0,
        dex: 0,
        int: 0,
        statHp: 0,

        finalDamagePer: 1,

    }


    // hyperObj객체에 무언가 영향을 미침 원인 해명 필요
    data.ArmoryEquipment.forEach(function (equip, equipIdx) {

        // function hyperInfoFnc(e ,parts){
        let hyperStr = data.ArmoryEquipment[equipIdx].Tooltip;

        const regex = /(\[초월\]\s*.*?\s*<\/img>\s*\d{1,2})/;
        const hyperMatch = hyperStr.match(regex);

        try {
            let hyperReplace = hyperMatch[0].replace(/<[^>]*>/g, ' ')
            hyperReplace = hyperReplace.replace(/\s+/g, ',')
            let hyperArry = hyperReplace.split(","); //초월,N(단계),단계,N(성)
            // console.log(hyperArry)
            headStarCal(hyperArry[3], equip.Type)
            shoulderStarCal(hyperArry[3], equip.Type)
            shirtStarCal(hyperArry[3], equip.Type)
            pantsStarCal(hyperArry[3], equip.Type)
            gloveStarCal(hyperArry[3], equip.Type)
            weaponStarCal(hyperArry[3], equip.Type)
        } catch { }
        // }

        // hyperInfoFnc(equipIdx, equip.Type)
    })


    function hyperStageCalc(e) {
        let hyperStr = data.ArmoryEquipment[e].Tooltip;


        const regex = /(\[초월\]\s*.*?\s*<\/img>\s*\d{1,2})/;
        const hyperMatch = hyperStr.match(regex);

        try {
            let hyperReplace = hyperMatch[0].replace(/<[^>]*>/g, ' ')
            hyperReplace = hyperReplace.replace(/\s+/g, ',')
            let hyperArry = hyperReplace.split(","); //초월,N(단계),단계,N(성)
            return Number(hyperArry[1])

            // return Number(hyperArry[3])*3750 + Number(hyperArry[1]*7500)

        } catch {
            return 0
        }
    }


    let armoryListArry = ["투구", "상의", "하의", "장갑", "어깨"]
    data.ArmoryEquipment.forEach(function (equip, equipIdx) {
        if (equip.Type == "무기") {

            let n = hyperStageCalc(equipIdx)
            hyperObj.weaponAtkPlus += 280 * n + 20 * (n ** 2)
            // console.log(equip.Type + "초월 단계 " + n )
            // console.log("무공 초월 "+ ( 280*n + 20*(n**2) ))
        }
        armoryListArry.forEach(function (armoryList) {
            if (equip.Type == armoryList) {

                let n = hyperStageCalc(equipIdx)
                // console.log(equip.Type + "초월 단계 " + n )
                // console.log(equip.Type+" 초월 "+" : "+ ( 560*n + 40*(n**2) ))
                hyperObj.str += 560 * n + 40 * (n ** 2)
                hyperObj.dex += 560 * n + 40 * (n ** 2)
                hyperObj.int += 560 * n + 40 * (n ** 2)
            }
        })
    })




    // 투구 N성
    function headStarCal(value, parts) {
        let check = (parts == "투구")
        if (value >= 20 && check) {
            hyperObj.statHp += hyperSum * 80
            hyperObj.atkBuff += hyperSum * 0.04
            hyperObj.atkPlus += hyperSum * 6
            hyperObj.weaponAtkPlus += hyperSum * 14
            hyperObj.str += hyperSum * 55
            hyperObj.dex += hyperSum * 55
            hyperObj.int += hyperSum * 55
        } else if (value >= 15 && check) {
            hyperObj.statHp += hyperSum * 80
            hyperObj.atkBuff += hyperSum * 0.03
            hyperObj.weaponAtkPlus += hyperSum * 14
            hyperObj.str += hyperSum * 55
            hyperObj.dex += hyperSum * 55
            hyperObj.int += hyperSum * 55
        } else if (value >= 10 && check) {
            hyperObj.statHp += hyperSum * 80
            hyperObj.atkBuff += hyperSum * 0.02
            hyperObj.str += hyperSum * 55
            hyperObj.dex += hyperSum * 55
            hyperObj.int += hyperSum * 55
        } else if (value >= 5 && check) {
            hyperObj.atkBuff += hyperSum * 0.01
            hyperObj.statHp += hyperSum * 80
        }
    }

    // 어깨 N성
    function shoulderStarCal(value, parts) {
        let check = (parts == "어깨")
        if (value >= 20 && check) {
            hyperObj.atkBuff += 3
            hyperObj.weaponAtkPlus += 3600

        } else if (value >= 15 && check) {
            hyperObj.atkBuff += 2
            hyperObj.weaponAtkPlus += 2400
        } else if (value >= 10 && check) {
            hyperObj.atkBuff += 1
            hyperObj.weaponAtkPlus += 1200
        } else if (value >= 5 && check) {
            hyperObj.atkBuff += 1
            hyperObj.weaponAtkPlus += 1200
        }
    }
    // 상의 N성
    function shirtStarCal(value, parts) {
        let check = (parts == "상의")
        if (value >= 20 && check) {
            hyperObj.weaponAtkPlus += 7200
        } else if (value >= 15 && check) {
            hyperObj.weaponAtkPlus += 4000
        } else if (value >= 10 && check) {
            hyperObj.weaponAtkPlus += 2000
        } else if (value >= 5 && check) {
            hyperObj.weaponAtkPlus += 2000
        }
    }
    // 하의 N성
    function pantsStarCal(value, parts) {
        let check = (parts == "하의")
        if (value >= 20 && check) {
            hyperObj.atkBuff += 6
            hyperObj.finalDamagePer *= 1.015 * 1.01
        } else if (value >= 15 && check) {
            hyperObj.atkBuff += 3
            hyperObj.finalDamagePer *= 1.01
        } else if (value >= 10 && check) {
            hyperObj.atkBuff += 1.5
            hyperObj.finalDamagePer *= 1.005

        }
    }
    // 하의 N성
    function gloveStarCal(value, parts) {
        let check = (parts == "장갑")
        if (value >= 20 && check) {
            hyperObj.str += 12600
            hyperObj.dex += 12600
            hyperObj.int += 12600
            hyperObj.atkBuff += 3
        } else if (value >= 15 && check) {
            hyperObj.str += 8400
            hyperObj.dex += 8400
            hyperObj.int += 8400
            hyperObj.atkBuff += 2
        } else if (value >= 10 && check) {
            hyperObj.str += 4200
            hyperObj.dex += 4200
            hyperObj.int += 4200
            hyperObj.atkBuff += 1
        } else if (value >= 5 && check) {
            hyperObj.str += 4200
            hyperObj.dex += 4200
            hyperObj.int += 4200
            hyperObj.atkBuff += 1
        }
    }
    // 무기 N성
    function weaponStarCal(value, parts) {
        let check = (parts == "무기")
        if (value >= 20 && check) {
            hyperObj.atkPlus += 3525
            hyperObj.stigmaPer += 8
            hyperObj.atkBuff += 2
        } else if (value >= 15 && check) {
            hyperObj.atkPlus += 2400
            hyperObj.stigmaPer += 4
            hyperObj.atkBuff += 2
        } else if (value >= 10 && check) {
            hyperObj.atkPlus += 1600
            hyperObj.stigmaPer += 2
            hyperObj.atkBuff += 2
        } else if (value >= 5 && check) {
            hyperObj.atkPlus += 800
            hyperObj.stigmaPer += 2
        }
    }



    /* **********************************************************************************************************************
     * name		              :	  armorStatus{}
     * version                :   2.0
     * description            :   착용 장비 및 악세 STR/DEX/INT 추출
     * USE_TN                 :   사용
     *********************************************************************************************************************** */


    function armorStatus() {
        let result = 0;
        data.ArmoryEquipment.forEach(function (armor) {

            if (/^(투구|상의|하의|장갑|어깨|목걸이|귀걸이|반지|)$/.test(armor.Type)) {

                let firstExtract = armor.Tooltip.match(/>([^<]+)</g).map(match => match.replace(/[><]/g, ''))
                let secondExtract = firstExtract.filter(item => item.match(/^(힘|민첩|지능) \+\d+$/));
                let thirdExtract = secondExtract[0].match(/\d+/)[0]
                result += Number(thirdExtract)

            }
        })
        return result
    }
    etcObj.armorStatus = armorStatus()

    /* **********************************************************************************************************************
     * name		              :	  engObj{}
     * version                :   2.0
     * description            :   각인 딜증율 추출
     * USE_TN                 :   criticalChance&Damage 미사용
     *********************************************************************************************************************** */


    let engObj = {
        finalDamagePer: 1,
        criticalChancePer: 0,
        criticalDamagePer: 0,
        atkPer: 0,
        carePower: 0,
        utilityPower: 0,
        cdrPercent: 0,
        awakencdrPercent: 0,
        dealpport: "false",
    }


    // 4티어 각인 모든 옵션 값 계산(무효옵션 하단 제거)
    Modules.originFilter.engravingCheckFilter.forEach(function (checkArry) {
        if (!(data.ArmoryEngraving == null) && !(data.ArmoryEngraving.ArkPassiveEffects == null)) {
            data.ArmoryEngraving.ArkPassiveEffects.forEach(function (realEngArry) {
                if (checkArry.name == realEngArry.Name && checkArry.grade == realEngArry.Grade && checkArry.level == realEngArry.Level) {


                    engCalMinus(checkArry.name, checkArry.finalDamagePer, checkArry.criticalChancePer, checkArry.criticalDamagePer, checkArry.atkPer, checkArry.atkSpeed, checkArry.moveSpeed, checkArry.carePower, checkArry.utilityPower, checkArry.engBonusPer)

                    engObj.finalDamagePer = (engObj.finalDamagePer * (checkArry.finalDamagePer / 100 + 1));
                    engObj.criticalChancePer = (engObj.criticalChancePer + checkArry.criticalChancePer);
                    engObj.criticalDamagePer = (engObj.criticalDamagePer + checkArry.criticalDamagePer);
                    engObj.atkPer = (engObj.atkPer + checkArry.atkPer);
                    engObj.carePower = (engObj.carePower + checkArry.carePower);
                    engObj.cdrPercent = (engObj.cdrPercent + checkArry.cdrPercent);
                    engObj.awakencdrPercent = (engObj.awakencdrPercent + checkArry.awakencdrPercent);
                    engObj.utilityPower = (engObj.utilityPower + checkArry.utilityPower);
                    if (supportCheck() !== "서폿") {
                        stoneCalc(realEngArry.Name, checkArry.finalDamagePer)
                    } else {
                        stoneCalc(realEngArry.Name, checkArry.engBonusPer)
                    }
                }
            })
        }


    })

    // 무효옵션 값 제거4티어만 해당
    function engCalMinus(name, finalDamagePer, criticalChancePer, criticalDamagePer, atkPer) {
        Modules.originFilter.engravingCalFilter.forEach(function (FilterArry) {
            if (FilterArry.job == supportCheck()) {
                FilterArry.block.forEach(function (blockArry) {
                    if (blockArry == name) {
                        engObj.finalDamagePer = (engObj.finalDamagePer / (finalDamagePer / 100 + 1));
                        engObj.atkPer = (engObj.atkPer - atkPer);
                    }
                })
            }
        })
    }


    // 어빌리티스톤(곱연산 제거 후 곱연산+어빌리티스톤 적용)
    function stoneCalc(name, minusVal) {
        function notZero(num) {
            if (num == 0) {
                return 1;
            } else {
                return num / 100 + 1
            }
        }
        data.ArmoryEngraving.ArkPassiveEffects.forEach(function (stoneArry) {
            Modules.originFilter.stoneCheckFilter.forEach(function (filterArry, idx) {
                if (idx === 0) {

                }
                if (stoneArry.AbilityStoneLevel == filterArry.level && stoneArry.Name == filterArry.name && stoneArry.Name == name) {

                    engObj.finalDamagePer = (engObj.finalDamagePer) / notZero(minusVal) //퐁트라이커기준 저주받은 인형(돌맹이) 제거값
                    engObj.finalDamagePer = (engObj.finalDamagePer * (notZero(minusVal) + (filterArry.finalDamagePer / 100)));
                    engObj.atkPer = (engObj.atkPer + filterArry.atkPer);
                    engObj.cdrPercent = (engObj.cdrPercent + filterArry.cdrPercent);
                    engObj.awakencdrPercent = (engObj.awakencdrPercent + filterArry.awakencdrPercent);
                    engObj.utilityPower = (engObj.utilityPower + filterArry.utilityPower);
                    engObj.carePower = (engObj.carePower + filterArry.carePower);
                    engObj.criticalChancePer = (engObj.criticalChancePer + filterArry.criticalChancePer);
                    engObj.criticalDamagePer = (engObj.criticalDamagePer + filterArry.criticalDamagePer);
                }
            })

        })
    }

    //딜폿 검증
    function checkDealpport(arkPassiveEffects) {
        if ((!arkPassiveEffects) || !Array.isArray(arkPassiveEffects)) {
            return false
        }
        return arkPassiveEffects.some(effect => effect && effect.Name === "원한");
    }
    const checkDealer = checkDealpport(data.ArmoryEngraving?.ArkPassiveEffects)

    if (checkDealer === true) {
        engObj.dealpport = "true";
    } else {
        engObj.dealpport = "false";
    }


    /* **********************************************************************************************************************
     * name		              :	  elixirObj{}
     * version                :   2.0
     * description            :   엘릭서 옵션 추출
     * USE_TN                 :   사용
     *********************************************************************************************************************** */


    let elixirObj = {
        atkPlus: 0,
        atkBonus: 0,
        atkBuff: 0,
        weaponAtkPlus: 0,
        criticalDamagePer: 0,
        criticalChancePer: 0,
        criFinalDamagePer: 1,
        addDamagePer: 0,
        atkPer: 0,
        finalDamagePer: 1,
        carePower: 0,
        identityUptime: 0,
        utilityPower: 0,
        statHp: 0,
        str: 0,
        dex: 0,
        int: 0,
    }

    // 엘릭서 레벨 추출
    function elixirKeywordCheck(e) {
        let elixirValString = data.ArmoryEquipment[e].Tooltip;


        const matchedKeywordsWithContext = Modules.originFilter.keywordList.flatMap(keyword => {
            const index = elixirValString.indexOf(keyword);
            if (index !== -1) {
                const endIndex = Math.min(index + keyword.length + 4, elixirValString.length);
                return [elixirValString.slice(index, endIndex).replace(/<[^>]*>/g, '')];
            }
            return [];
        });


        // span태그로 반환
        let elixirSpan = []
        let i
        for (i = 0; i < matchedKeywordsWithContext.length; i++) {
            elixirSpan.push(matchedKeywordsWithContext[i])
        }
        return (elixirSpan)

    }

    let elixirData = []
    // 엘릭서 인덱스 번호 검사
    data.ArmoryEquipment.forEach(function (arry, idx) {
        elixirKeywordCheck(idx).forEach(function (elixirArry, idx) {
            elixirData.push({ name: ">" + elixirArry.split("Lv.")[0], level: elixirArry.split("Lv.")[1] })
        })
    })

    elixirData.forEach(function (realElixir) {
        // console.log(realElixir.name)

        Modules.originFilter.elixirCalFilter.forEach(function (filterArry) {
            if (realElixir.name == filterArry.name && !(filterArry.atkPlus == undefined)) {

                elixirObj.atkPlus += filterArry.atkPlus[realElixir.level - 1]
                // console.log(realElixir.name+" : " + elixirAtkPlus)

            } else if (realElixir.name == filterArry.name && !(filterArry.weaponAtkPlus == undefined)) {

                elixirObj.weaponAtkPlus += filterArry.weaponAtkPlus[realElixir.level - 1]
                // console.log(realElixir.name+" : " + elixirWeaponAtkPlus)

            } else if (realElixir.name == filterArry.name && !(filterArry.atkBonus == undefined)) {

                elixirObj.atkBonus += filterArry.atkBonus[realElixir.level - 1]

            } else if (realElixir.name == filterArry.name && !(filterArry.criticalDamage == undefined)) {

                elixirObj.criticalDamagePer += filterArry.criticalDamagePer[realElixir.level - 1]
                // console.log(realElixir.name+" : " + elixirCriticalDamage)

            } else if (realElixir.name == filterArry.name && !(filterArry.addDamagePer == undefined)) {

                elixirObj.addDamagePer += filterArry.addDamagePer[realElixir.level - 1]
                // console.log(realElixir.name+" : " + elixirAddDamagePer)

            } else if (realElixir.name == filterArry.name && !(filterArry.atkPer == undefined)) {

                elixirObj.atkPer += filterArry.atkPer[realElixir.level - 1]
                // console.log(realElixir.name+" : " + elixirAtkPer)

            } else if (realElixir.name == filterArry.name && !(filterArry.finalDamagePer == undefined)) {
                // console.log(realElixir.name)

                elixirObj.finalDamagePer *= filterArry.finalDamagePer[realElixir.level - 1] / 100 + 1
                // console.log(realElixir.name+" : " + elixirFinalDamagePer)

            } else if (realElixir.name == filterArry.name && !(filterArry.str == undefined)) {

                elixirObj.str += filterArry.str[realElixir.level - 1]
                // console.log(realElixir.name+" : " + filterArry.stats[realElixir.level - 1])

            } else if (realElixir.name == filterArry.name && !(filterArry.dex == undefined)) {

                elixirObj.dex += filterArry.dex[realElixir.level - 1]
                // console.log(realElixir.name+" : " + filterArry.dex[realElixir.level - 1])

            } else if (realElixir.name == filterArry.name && !(filterArry.int == undefined)) {

                elixirObj.int += filterArry.int[realElixir.level - 1]
                // console.log(realElixir.name+" : " + filterArry.stats[realElixir.level - 1])

            } else if (realElixir.name == filterArry.name && !(filterArry.atkBuff == undefined)) {

                elixirObj.atkBuff += filterArry.atkBuff[realElixir.level - 1]

            } else if (realElixir.name == filterArry.name && !(filterArry.carePower == undefined)) {

                elixirObj.carePower += filterArry.carePower[realElixir.level - 1]

            } else if (realElixir.name == filterArry.name && !(filterArry.identityUptime == undefined)) {

                elixirObj.identityUptime += filterArry.identityUptime[realElixir.level - 1]

            } else if (realElixir.name == filterArry.name && !(filterArry.utilityPower == undefined)) {

                elixirObj.utilityPower += filterArry.utilityPower[realElixir.level - 1] //이새끼가 문제같은데 얘만 문제인지 모르겠네

            } else if (realElixir.name == filterArry.name && !(filterArry.statHp == undefined)) {

                elixirObj.statHp += filterArry.statHp[realElixir.level - 1]
            }

        })
    })
    Modules.originFilter.elixirCalFilter.forEach(function (arr) {

    })

    let elixirLevel = 0

    elixirData.forEach(function (arry) {
        Modules.originFilter.elixirFilter.forEach(function (filterArry) {
            if (arry.name == filterArry.split(":")[0]) {
                elixirLevel += Number(arry.level)
            } else {
            }
        })
    })

    function containsTwoWord(data, doubleString) {
        let count = data.filter(item => item.name.includes(doubleString)).length;
        return count === 2;
    }


    function doubleElixir() {
        if (containsTwoWord(elixirData, "회심") && elixirLevel >= 40) {
            elixirObj.criFinalDamagePer *= 1.12
            elixirObj.finalDamagePer *= 1.12
        } else if (containsTwoWord(elixirData, "회심") && elixirLevel >= 35) {
            elixirObj.criFinalDamagePer *= 1.06
            elixirObj.finalDamagePer *= 1.06
        } else if (containsTwoWord(elixirData, "달인 (") && elixirLevel >= 40) {
            elixirObj.criticalChancePer += 7
            elixirObj.finalDamagePer *= 1.12
        } else if (containsTwoWord(elixirData, "달인 (") && elixirLevel >= 35) {
            elixirObj.criticalChancePer += 7
            elixirObj.finalDamagePer *= 1.06
        } else if (containsTwoWord(elixirData, "강맹") && elixirLevel >= 40) {
            elixirObj.finalDamagePer *= 1.08
        } else if (containsTwoWord(elixirData, "강맹") && elixirLevel >= 35) {
            elixirObj.finalDamagePer *= 1.04
        } else if (containsTwoWord(elixirData, "칼날방패") && elixirLevel >= 40) {
            elixirObj.finalDamagePer *= 1.08
        } else if (containsTwoWord(elixirData, "칼날방패") && elixirLevel >= 35) {
            elixirObj.finalDamagePer *= 1.04
        } else if (containsTwoWord(elixirData, "선봉대") && elixirLevel >= 40) {
            defaultObj.attackPow *= 1.03
            elixirObj.finalDamagePer *= 1.12
        } else if (containsTwoWord(elixirData, "선봉대") && elixirLevel >= 35) {
            defaultObj.attackPow *= 1.03
            elixirObj.finalDamagePer *= 1.06
        } else if (containsTwoWord(elixirData, "선각자") && elixirLevel >= 40) {
            elixirObj.atkBuff += 14
        } else if (containsTwoWord(elixirData, "선각자") && elixirLevel >= 35) {
            elixirObj.atkBuff += 8
        } else if (containsTwoWord(elixirData, "신념") && elixirLevel >= 40) {
            elixirObj.atkBuff += 14
        } else if (containsTwoWord(elixirData, "신념") && elixirLevel >= 35) {
            elixirObj.atkBuff += 8
        } else if (containsTwoWord(elixirData, "진군") && elixirLevel >= 40) {
            elixirObj.atkBuff += 6
        } else if (containsTwoWord(elixirData, "진군") && elixirLevel >= 35) {
            elixirObj.atkBuff += 0
        }
    }
    doubleElixir()

    /* **********************************************************************************************************************
     * name		              :	  gemsCool{}
     * version                :   2.0
     * description            :   작열/홍염 보석 평균값 추출
     * USE_TN                 :   for support
     *********************************************************************************************************************** */

    let gemsCool = 0;
    let gemsCoolCount = 0;


    if (!(data.ArmoryGem.Gems == null)) {
        data.ArmoryGem.Gems.forEach(function (arry) {
            if (arry.Name.includes("10레벨 작열")) {
                gemsCool += 24
                gemsCoolCount += 1
            } else if (arry.Name.includes("9레벨 작열")) {
                gemsCool += 22
                gemsCoolCount += 1
            } else if (arry.Name.includes("8레벨 작열") || arry.Name.includes("10레벨 홍염")) {
                gemsCool += 20
                gemsCoolCount += 1
            } else if (arry.Name.includes("7레벨 작열") || arry.Name.includes("9레벨 홍염")) {
                gemsCool += 18
                gemsCoolCount += 1
            } else if (arry.Name.includes("6레벨 작열") || arry.Name.includes("8레벨 홍염")) {
                gemsCool += 16
                gemsCoolCount += 1
            } else if (arry.Name.includes("5레벨 작열") || arry.Name.includes("7레벨 홍염")) {
                gemsCool += 14
                gemsCoolCount += 1
            } else if (arry.Name.includes("4레벨 작열") || arry.Name.includes("6레벨 홍염")) {
                gemsCool += 12
                gemsCoolCount += 1
            } else if (arry.Name.includes("3레벨 작열") || arry.Name.includes("5레벨 홍염")) {
                gemsCool += 10
                gemsCoolCount += 1
            } else if (arry.Name.includes("2레벨 작열") || arry.Name.includes("4레벨 홍염")) {
                gemsCool += 8
                gemsCoolCount += 1
            } else if (arry.Name.includes("1레벨 작열") || arry.Name.includes("3레벨 홍염")) {
                gemsCool += 6
                gemsCoolCount += 1
            } else if (arry.Name.includes("2레벨 홍염")) {
                gemsCool += 4
                gemsCoolCount += 1
            } else if (arry.Name.includes("1레벨 홍염")) {
                gemsCool += 2
                gemsCoolCount += 1
            }
        })
    } else {
        gemsCool = 0
        gemsCoolCount = 1
    }
    etcObj.gemsCoolAvg = Number(((gemsCool / gemsCoolCount)).toFixed(1))


    /* **********************************************************************************************************************
     * name		              :	  arkObj{}
     * version                :   2.0
     * description            :   아크패시브 옵션 추출
     * USE_TN                 :   evolution/enlightenment/leap 사용
     *********************************************************************************************************************** */


    let arkPassiveArry = [];
    let arkObj = {
        skillCool: 0,
        evolutionDamage: 0,
        enlightenmentDamage: 0,
        leapDamage: 0,
        criticalChancePer: 0,
        moveSpeed: 0,
        atkSpeed: 0,
        stigmaPer: 0,
        criticalDamagePer: 0,
        evolutionBuff: 0,
        enlightenmentBuff: 1,
        leapBuff: 0,
        weaponAtkPer: 1,
        cdrPercent: 0,
        statHp: 0,
    }

    data.ArkPassive.Effects.forEach(function (arkArry) {
        const regex = /<FONT.*?>(.*?)<\/FONT>/g;
        let match;
        while ((match = regex.exec(arkArry.Description)) !== null) {
            const text = match[1];
            const levelMatch = text.match(/(.*) Lv\.(\d+)/);
            if (levelMatch) {
                const name = levelMatch[1];
                const level = parseInt(levelMatch[2], 10);
                arkPassiveArry.push({ name, level });

            }
        }
    });

    arkPassiveArry.forEach(function (ark) {
        Modules.originFilter.arkCalFilter.forEach(function (filter) {
            if (ark.name == filter.name && ark.level == filter.level) {
                arkAttrCheck(filter)
            }
        })
    })

    function arkAttrCheck(validValue) {
        let arkAttr = ['skillCool', 'evolutionDamage', 'criticalChancePer', 'moveSpeed', 'atkSpeed', 'stigmaPer', 'criticalDamagePer', 'evolutionBuff', 'cdrPercent', 'enlightenmentBuff']
        arkAttr.forEach(function (attrArry) {
            if (!(validValue[attrArry] == undefined) && data.ArkPassive.IsArkPassive) {
                arkObj[attrArry] += validValue[attrArry];
            }
        })
    }


    /* **********************************************************************************************************************
     * name		              :	  arkPassiveValue{}
     * version                :   2.0
     * description            :   아크패시브 수치 추출 및 계산
     * USE_TN                 :   사용
     *********************************************************************************************************************** */


    function arkPassiveValue(e) {
        let arkPassiveVal = data.ArkPassive.Points[e].Value
        return arkPassiveVal
    }



    if (arkPassiveValue(0) >= 120) { // arkPassiveValue(0) == 진화수치

        arkObj.evolutionDamage += 1.45

    } else if (arkPassiveValue(0) >= 105) {

        arkObj.evolutionDamage += 1.35

    } else if (arkPassiveValue(0) >= 90) {

        arkObj.evolutionDamage += 1.30

    } else if (arkPassiveValue(0) >= 80) {

        arkObj.evolutionDamage += 1.25

    } else if (arkPassiveValue(0) >= 70) {

        arkObj.evolutionDamage += 1.20

    } else if (arkPassiveValue(0) >= 60) {

        arkObj.evolutionDamage += 1.15

    } else if (arkPassiveValue(0) >= 50) {

        arkObj.evolutionDamage += 1.10

    } else if (arkPassiveValue(0) >= 40) {

        arkObj.evolutionDamage += 1
    }




    if (arkPassiveValue(1) >= 100) { // arkPassiveValue(1) == 깨달음수치

        arkObj.enlightenmentDamage += 1.42

    } else if (arkPassiveValue(1) >= 98) {

        arkObj.enlightenmentDamage += 1.40

    } else if (arkPassiveValue(1) >= 97) {

        arkObj.enlightenmentDamage += 1.37

    } else if (arkPassiveValue(1) >= 96) {

        arkObj.enlightenmentDamage += 1.37

    } else if (arkPassiveValue(1) >= 95) {

        arkObj.enlightenmentDamage += 1.36

    } else if (arkPassiveValue(1) >= 94) {

        arkObj.enlightenmentDamage += 1.36

    } else if (arkPassiveValue(1) >= 93) {

        arkObj.enlightenmentDamage += 1.35

    } else if (arkPassiveValue(1) >= 92) {

        arkObj.enlightenmentDamage += 1.35

    } else if (arkPassiveValue(1) >= 90) {

        arkObj.enlightenmentDamage += 1.34

    } else if (arkPassiveValue(1) >= 88) {

        arkObj.enlightenmentDamage += 1.33

    } else if (arkPassiveValue(1) >= 86) {

        arkObj.enlightenmentDamage += 1.28

    } else if (arkPassiveValue(1) >= 84) {

        arkObj.enlightenmentDamage += 1.27

    } else if (arkPassiveValue(1) >= 82) {

        arkObj.enlightenmentDamage += 1.26

    } else if (arkPassiveValue(1) >= 80) {

        arkObj.enlightenmentDamage += 1.25

    } else if (arkPassiveValue(1) >= 78) {

        arkObj.enlightenmentDamage += 1.18

    } else if (arkPassiveValue(1) >= 76) {

        arkObj.enlightenmentDamage += 1.17

    } else if (arkPassiveValue(1) >= 74) {

        arkObj.enlightenmentDamage += 1.16

    } else if (arkPassiveValue(1) >= 72) {

        arkObj.enlightenmentDamage += 1.15

    } else if (arkPassiveValue(1) >= 64) {

        arkObj.enlightenmentDamage += 1.13

    } else if (arkPassiveValue(1) >= 56) {

        arkObj.enlightenmentDamage += 1.125

    } else if (arkPassiveValue(1) >= 48) {

        arkObj.enlightenmentDamage += 1.12

    } else if (arkPassiveValue(1) >= 40) {

        arkObj.enlightenmentDamage += 1.115

    } else if (arkPassiveValue(1) >= 32) {

        arkObj.enlightenmentDamage += 1.11

    } else if (arkPassiveValue(1) >= 24) {

        arkObj.enlightenmentDamage += 1.10

    } else {
        arkObj.enlightenmentDamage += 1
    }


    if (arkPassiveValue(2) >= 70) { // arkPassiveValue(2) == 도약 수치

        arkObj.leapDamage += 1.15
        arkObj.leapBuff += 1.051

    } else if (arkPassiveValue(2) >= 68) {

        arkObj.leapDamage += 1.14
        arkObj.leapBuff += 1.04545

    } else if (arkPassiveValue(2) >= 66) {

        arkObj.leapDamage += 1.13
        arkObj.leapBuff += 1.04535

    } else if (arkPassiveValue(2) >= 64) {

        arkObj.leapDamage += 1.12
        arkObj.leapBuff += 1.04525

    } else if (arkPassiveValue(2) >= 62) {

        arkObj.leapDamage += 1.11
        arkObj.leapBuff += 1.04515

    } else if (arkPassiveValue(2) >= 60) {

        arkObj.leapDamage += 1.10
        arkObj.leapBuff += 1.045

    } else if (arkPassiveValue(2) >= 50) {

        arkObj.leapDamage += 1.05
        arkObj.leapBuff += 1.035

    } else if (arkPassiveValue(2) >= 40) {

        arkObj.leapDamage += 1.03
        arkObj.leapBuff += 1.035

    } else {
        arkObj.leapDamage += 1
        arkObj.leapBuff += 1
    }


    /* **********************************************************************************************************************
     * name		              :	  gemObj{}
     * version                :   2.0
     * description            :   직업 별 보석 딜지분 계산
     * USE_TN                 :   사용
     *********************************************************************************************************************** */


    let gemObj = {
        atkBuff: 0,
        damageBuff: 0,
        atkBuffACool: 0,
        atkBuffBCool: 0,
        atkBuffACdr: 0,
        atkBuffBCdr: 0,
    }

    // 보석4종 레벨별 비율
    let gemPerObj = [
        { name: "겁화", level1: 8, level2: 12, level3: 16, level4: 20, level5: 24, level6: 28, level7: 32, level8: 36, level9: 40, level10: 44 },
        { name: "멸화", level1: 3, level2: 6, level3: 9, level4: 12, level5: 15, level6: 18, level7: 21, level8: 24, level9: 30, level10: 40 },
        { name: "홍염", level1: 2, level2: 4, level3: 6, level4: 8, level5: 10, level6: 12, level7: 14, level8: 16, level9: 18, level10: 20 },
        { name: "작열", level1: 6, level2: 8, level3: 10, level4: 12, level5: 14, level6: 16, level7: 18, level8: 20, level9: 22, level10: 24 },
        { name: "딜광휘", level1: 8, level2: 12, level3: 16, level4: 20, level5: 24, level6: 28, level7: 32, level8: 36, level9: 40, level10: 44 },
        { name: "쿨광휘", level1: 6, level2: 8, level3: 10, level4: 12, level5: 14, level6: 16, level7: 18, level8: 20, level9: 22, level10: 24 },
    ]

    let gemSkillArry = [];
    let specialClass;

    // 유저가 착용중인 보석,스킬 배열로 만들기

    if (data.ArmoryGem.Gems != null) {
        data.ArmoryGem.Gems.forEach(function (gem) {

            data.ArmoryProfile.CharacterClassName

            let regex = />([^<]*)</g;
            let match;
            let results = [];
            while ((match = regex.exec(gem.Tooltip)) !== null) {
                results.push(match[1]);
            }


            results.forEach(function (toolTip, idx) {

                toolTip = toolTip.replace(/"/g, '');

                if (toolTip.includes(data.ArmoryProfile.CharacterClassName) && /(^|[^"])\[([^\[\]"]+)\](?=$|[^"])/.test(toolTip) && toolTip.includes("Element")) {

                    let etcGemValue = results[idx + 2].substring(0, results[idx + 2].indexOf('"'))
                    let gemName;
                    let level = null;
                    if (results[1].match(/홍염|작열|멸화|겁화|광휘/) != null) {
                        gemName = results[1].match(/홍염|작열|멸화|겁화|광휘/)[0];
                        level = Number(results[1].match(/(\d+)레벨/)[1])

                        // '광휘' 보석 타입 구분
                        if (gemName === '광휘') {
                            // 툴팁 전체에서 HTML 태그를 제거하여 순수 텍스트만 남김
                            const tooltipText = gem.Tooltip.replace(/<[^>]*>/g, ' ');

                            if (tooltipText.includes('피해') || tooltipText.includes('지원')) {
                                gemName = '딜광휘'; // 피해 옵션이 있으면 '딜광휘'로 이름 변경
                            } else if (tooltipText.includes('재사용')) {
                                gemName = '쿨광휘'; // 재사용(쿨타임) 옵션이 있으면 '쿨광휘'로 이름 변경
                            }
                        }
                    } else {
                        gemName = "기타보석"
                    }
                    // let obj = { name: results[idx+1], gem: gemName, level : level};
                    let obj = { skill: results[idx + 1], name: gemName, level: level };
                    gemSkillArry.push(obj)

                } else if (!(toolTip.includes(data.ArmoryProfile.CharacterClassName)) && /(^|[^"])\[([^\[\]"]+)\](?=$|[^"])/.test(toolTip) && toolTip.includes("Element")) {  // 자신의 직업이 아닌 보석을 장착중인 경우

                    //console.log(toolTip)
                    let gemName;
                    let level = null;
                    const gemMatch = results[1].match(/홍염|작열|멸화|겁화|딜광휘|쿨광휘/);

                    if (gemMatch) {
                        gemName = gemMatch[0];

                        const levelMatch = results[1].match(/(\d+)레벨/);
                        if (levelMatch) {
                            level = Number(levelMatch[1]);
                        }
                    } else {
                        gemName = "기타보석";
                    }
                    let obj = { skill: "직업보석이 아닙니다", name: gemName, level: level };
                    gemSkillArry.push(obj);

                }

            })

        })

    }
    htmlObj.gemSkillArry = gemSkillArry;

    // 같은 스킬에 멸화/겁화 또는 작열/홍염이 중복되는 경우 처리하는 함수
    function filterDuplicateGems() {

        // 스킬 이름으로 그룹화
        const skillGroups = {};

        // 스킬 이름으로 gemSkillArry 그룹화
        gemSkillArry.forEach(gem => {
            if (!skillGroups[gem.skill]) {
                skillGroups[gem.skill] = [];
            }
            skillGroups[gem.skill].push(gem);
        });

        // 필터링된 보석 수 추적
        let filteredCount = 0;

        // 각 스킬 그룹에서 멸화/겁화 중복 처리
        Object.keys(skillGroups).forEach(skillName => {
            const gems = skillGroups[skillName];

            // 멸화/겁화 보석만 필터링
            const dmgGems = gems.filter(gem => gem.name === "멸화" || gem.name === "겁화" || gem.name === "딜광휘");

            // 멸화/겁화 보석이 2개 이상인 경우에만 처리
            if (dmgGems.length >= 2) {
                //console.log(`중복 보석 발견: ${skillName} - ${dmgGems.length}개`);

                // 각 보석의 실제 값 계산
                dmgGems.forEach(gem => {
                    const gemInfo = gemPerObj.find(info => info.name === gem.name);
                    if (gemInfo) {
                        gem.actualValue = gemInfo[`level${gem.level}`];
                        //console.log(`${gem.skill} - ${gem.name} 레벨 ${gem.level} - 값: ${gem.actualValue} - 현재 skillPer: ${gem.skillPer}`);
                    } else {
                        gem.actualValue = 0;
                    }
                });

                // 배열에 담긴 겁멸+레벨의 값이 가장 높은 보석 찾기
                const maxValueGem = dmgGems.reduce((max, gem) =>
                    (gem.actualValue > max.actualValue) ? gem : max, dmgGems[0]);

                // 값이 가장 높은 것 외에는 skillPer를 0으로 설정
                dmgGems.forEach(gem => {
                    if (gem !== maxValueGem && gem.skillPer !== "none") {
                        gem.skillPer = 0;
                        //console.log(`skillPer 0으로 설정: ${gem.skill} - ${gem.name} 레벨 ${gem.level}`);
                        filteredCount++;
                    }
                });
            }

            // 작열/홍염 보석 필터링 및 처리
            const coolGems = gems.filter(gem => gem.name === "작열" || gem.name === "홍염" || gem.name === "쿨광휘");

            // 작열/홍염 보석이 2개 이상인 경우 처리
            if (coolGems.length >= 2) {
                //console.log(`중복 쿨다운 보석 발견: ${skillName} - ${coolGems.length}개`);

                // 각 보석의 실제 값 계산
                coolGems.forEach(gem => {
                    const gemInfo = gemPerObj.find(info => info.name === gem.name);
                    if (gemInfo) {
                        gem.actualValue = gemInfo[`level${gem.level}`];
                        //console.log(`${gem.skill} - ${gem.name} 레벨 ${gem.level} - 값: ${gem.actualValue} - 현재 skillPer: ${gem.skillPer}`);
                    } else {
                        gem.actualValue = 0;
                    }
                });

                // 배열에 담긴 작열/홍염+레벨의 값이 가장 높은 보석 찾기
                const maxValueGem = coolGems.reduce((max, gem) =>
                    (gem.actualValue > max.actualValue) ? gem : max, coolGems[0]);

                // 값이 가장 높은 것 외에는 skillPer를 0으로 설정
                coolGems.forEach(gem => {
                    if (gem !== maxValueGem && gem.skillPer !== "none") {
                        gem.skillPer = 0;
                        //console.log(`skillPer 0으로 설정: ${gem.skill} - ${gem.name} 레벨 ${gem.level}`);
                        filteredCount++;
                    }
                });
            }
        });
        return gemSkillArry;
    }


    if (true) {

        let per = "홍염|작열|쿨광휘";
        let dmg = "겁화|멸화|딜광휘";

        function skillCheck(arr, ...nameAndGem) {
            for (let i = 0; i < nameAndGem.length; i += 2) {
                const name = nameAndGem[i];
                const gemPattern = nameAndGem[i + 1];
                const regex = new RegExp(gemPattern);
                const found = arr.some(item => item.skill === name && regex.test(item.name));
                //console.log(arr)
                //console.log(found)
                if (!found) return false;
            }
            return true;
        }
        function classCheck(className) {
            return supportCheck() == className;
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
        } else if (classCheck("잔재") && skillCheck(gemSkillArry, "블리츠 러시", dmg) && !skillCheck(gemSkillArry, "터닝 슬래쉬", dmg) && skillCheck(gemSkillArry, "어스 슬래쉬", per)) {
            specialClass = "어슬 작열 블리츠 잔재";
        } else if (classCheck("잔재") && skillCheck(gemSkillArry, "블리츠 러시", dmg) && !skillCheck(gemSkillArry, "보이드 스트라이크", dmg)) {
            specialClass = "블리츠 잔재";
        } else if (classCheck("잔재") && !skillCheck(gemSkillArry, "터닝 슬래쉬", dmg) && skillCheck(gemSkillArry, "어스 슬래쉬", per)) {
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
        } else if (classCheck("이슬비") && skillCheck(gemSkillArry, "뙤약볕", dmg) && skillCheck(gemSkillArry, "싹쓸바람", dmg) && skillCheck(gemSkillArry, "소용돌이", dmg) && skillCheck(gemSkillArry, "여우비 스킬", dmg) && skillCheck(gemSkillArry, "소나기", dmg) && skillCheck(gemSkillArry, "날아가기", dmg) && skillCheck(gemSkillArry, "센바람", dmg)) {
            specialClass = "7겁 이슬비";
        } else if (classCheck("환각") || classCheck("서폿") || classCheck("진실된 용맹") || classCheck("회귀") || classCheck("환류") || classCheck("비기") || classCheck("교감") || classCheck("빛의 기사")) {
            specialClass = "데이터 없음";
        } else {
            specialClass = supportCheck();
        }

    }


    const specialClassRules = [

        /*************************** 슈샤이어 ***************************/
        {
            class: "러쉬 광기",
            conditions: [
                { core: "다크 파워", point: 17, support: "광기" }
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

        /*************************** 애니츠 ***************************/
        {
            class: "무공탄 역천",
            conditions: [
                { core: "열파전조", point: 17, support: "역천" },
                { core: "기류탄화", point: 14 }
            ]
        },
        {
            class: "무한풍신 일격",
            conditions: [
                { core: "풍신", point: 14, support: "일격" },
                { core: "풍진천뢰", point: 14 }
            ]
        },
        //
        {
            class: "번천 역천",
            conditions: [
                { core: "번천귀류", point: 14, support: "역천" },
                { core: "맹공", point: 14, support: "역천" },

            ]
        },
        /*************************** 아르데 ***************************/
        {
            class: "레오불 사시",
            conditions: [
                { core: "풀 매거진", point: 14, support: "사시" }
            ]
        }
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


    const currentSupport = supportCheck();


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
    console.log("보석전용 직업 : ", specialClass)






    gemSkillArry.forEach(function (gemSkill, idx) {

        let realClass = Modules.originFilter.classGemFilter.filter(item => item.class == specialClass);

        if (realClass.length == 0) {
            gemSkillArry[idx].skillPer = "none"
        } else {

            let realSkillPer = realClass[0].skill.filter(item => item.name == gemSkill.skill);

            if (realSkillPer[0] != undefined) {
                gemSkillArry[idx].skillPer = realSkillPer[0].per;
            } else {
                gemSkillArry[idx].skillPer = "none";
            }
        }
    })

    // skillPer가 설정된 후 중복된 멸화/겁화 보석 필터링 적용
    filterDuplicateGems();

    // 직업별 보석 지분율 필터
    let classGemEquip = Modules.originFilter.classGemFilter.filter(function (filterArry) {
        return filterArry.class == specialClass;
    })
    //console.log(classGemEquip)
    //console.log("gemSkillArry",gemSkillArry)

    function gemCheckFnc() {
        try {
            // console.log(classGemEquip)
            let realGemValue = classGemEquip[0].skill.map(skillObj => {

                // 필터링 결과(skillPer가 0인 보석은 제외)를 realGemValue에 올바르게 반영
                let matchValue = gemSkillArry.filter(item =>
                    item.skill == skillObj.name &&
                    (item.skillPer !== 0 || item.skillPer === "none")
                );

                if (!(matchValue.length == 0)) {
                    // console.log(matchValue)
                    return {
                        name: skillObj.name,
                        per: skillObj.per,
                        gem: matchValue,
                    }
                }
            }).filter(Boolean);

            // console.log(realGemValue)
            // gemPerObj.name == realGemValue.name && realGemValue.gem.match(/멸화|겁화/g)[0];


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
            let gemValue = getLevels(gemPerObj, realGemValue).reduce((gemResultValue, finalGemValue) => {
                //console.log("gemResultValue" + gemResultValue)
                //console.log("finalGemValue.per" + finalGemValue.per)
                //console.log("finalGemValue.skillper" + finalGemValue.skillPer)
                return gemResultValue + finalGemValue.per * finalGemValue.skillPer
            }, 0)


            // special skill Value 값 계산식
            function specialSkillCalc() {
                let result = 0;
                classGemEquip[0].skill.forEach(function (skill) {
                    if (skill.per != "etc") {
                        result += skill.per;
                    }
                })
                return 1 / result
            }

            // 홍염,작열 평균레벨
            return {
                specialSkill: specialSkillCalc(),
                originGemValue: gemValue,
                gemValue: (gemValue * specialSkillCalc()) / 100 + 1,
                gemAvg: averageValue,
                etcAverageValue: etcAverageValue,
                excludedGemAvg: excludedAverageValue,
                careSkillAvg: careSkillAverageValue
            }
        } catch (error) {
            console.log(error)
            return {
                specialSkill: 1,
                originGemValue: 1,
                gemValue: 1,
                gemAvg: 0,
                etcAverageValue: 1,
                excludedGemAvg: 0

            }

        }
    }
    // gemCheckFnc() // <==보석 딜지분 최종값
    // console.log("잼체크함수",gemCheckFnc())
    etcObj.gemCheckFnc = gemCheckFnc();


    /* **********************************************************************************************************************
     * name		              :	  supportGemCheck()
     * version                :   2.0
     * description            :   서폿의 보석 딜증 및 공증 스킬 쿨타임 계산
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    let supportSkillObj = {
        atkBuffACool: 0,
        atkBuffADuration: 0,
        atkBuffBCool: 0,
        atkBuffBDuration: 0,
    }
    if (data.ArmoryProfile.CharacterClassName == "도화가") {
        supportSkillObj.atkBuffACool = 27
        supportSkillObj.atkBuffADuration = 8
        supportSkillObj.atkBuffBCool = 30
        if (data.ArmorySkills[12].Tripods[0].isSelected = true) {
            supportSkillObj.atkBuffBCool = 24
        }
        supportSkillObj.atkBuffBDuration = 6
    } else if (data.ArmoryProfile.CharacterClassName == "홀리나이트") {
        supportSkillObj.atkBuffACool = 27
        supportSkillObj.atkBuffADuration = 8
        supportSkillObj.atkBuffBCool = 35
        supportSkillObj.atkBuffBDuration = 8
    } else if (data.ArmoryProfile.CharacterClassName == "바드") {
        supportSkillObj.atkBuffACool = 30
        if (data.ArmorySkills[11].Tripods[0].isSelected = true) {
            supportSkillObj.atkBuffACool = 24
        }
        supportSkillObj.atkBuffADuration = 8
        supportSkillObj.atkBuffBCool = 24
        supportSkillObj.atkBuffBDuration = 5
    } else if (data.ArmoryProfile.CharacterClassName == "발키리") {
        supportSkillObj.atkBuffACool = 27
        supportSkillObj.atkBuffADuration = 8
        supportSkillObj.atkBuffBCool = 36
        supportSkillObj.atkBuffBDuration = 8
    }


    if (!(data.ArmoryGem.Gems == null) && supportCheck() == "서폿") {
        let supportSkill = ['천상의 축복', '신의 분노', '천상의 연주', '음파 진동', '묵법 : 해그리기', '묵법 : 해우물', '숭고한 맹세', '숭고한 도약', '신앙 스킬', '세레나데 스킬', '음양 스킬'];
        let atkBuff = ['천상의 축복', '신의 분노', '천상의 연주', '음파 진동', '묵법 : 해그리기', '묵법 : 해우물', '숭고한 맹세', '숭고한 도약'];
        let damageBuff = ['신앙 스킬', '세레나데 스킬', '음양 스킬'];
        let atkBuffACdr = ['천상의 연주', '신의 분노', '묵법 : 해그리기', '숭고한 맹세'];
        let atkBuffBCdr = ['음파 진동', '천상의 축복', '묵법 : 해우물', '숭고한 도약'];

        let toolTipOrigin = data.ArmoryGem.Gems.map(gem => gem.Tooltip);
        let toolTipProcess = toolTipOrigin.map(toolTip => {
            if (toolTip.includes("광휘")) {
                // let shineTooltip = "";
                if (toolTip.includes('피해') || toolTip.includes('지원')) {
                    return toolTip.replace('광휘', '딜광휘');
                } else if (toolTip.includes('재사용')) {
                    return toolTip.replace('광휘', '쿨광휘');
                }
            } else {
                return toolTip;
            }
        })

        function processData(dataArray) {

            return dataArray.map(dataString => {
                // 딜광휘, 쿨광휘, 작열, 겁화, 홍염, 멸화 추출
                const sortMatch = dataString.match(/딜광휘|쿨광휘|작열|겁화|홍염|멸화/);
                const sort = sortMatch ? sortMatch[0] : null;

                // 레벨 추출
                const levelMatch = dataString.match(/(\d+)레벨/);
                const level = levelMatch ? parseInt(levelMatch[1], 10) : null;

                // 스킬 추출
                let skill = null;
                for (const s of supportSkill) {
                    if (dataString.includes(s)) {
                        skill = s;
                        break;
                    }
                }
                return {
                    sort: sort,
                    level: level,
                    skill: skill
                };
            });
        }

        // 우선순위 맵 정의
        const priorityMap = {
            '작열': 3, '쿨광휘': 2, '홍염': 1,
            '겁화': 3, '딜광휘': 2, '멸화': 1
        };

        // sort가 속한 그룹을 반환하는 함수
        const getGroup = (sort) => {
            if (['홍염', '작열', '쿨광휘'].includes(sort)) {
                return 'group1';
            }
            if (['멸화', '겁화', '딜광휘'].includes(sort)) {
                return 'group2';
            }
            return 'other';
        };

        let aloneTooltip = Object.values(processData(toolTipProcess).reduce((acc, current) => {
            // skill이 null인 경우, 고유한 항목으로 처리
            if (current.skill === null) {
                // key를 고유하게 만들어 각 항목이 분리되도록 함
                const key = `${current.sort}-${current.level}-${Math.random()}`;
                acc[key] = current;
                return acc;
            }

            // 그룹 및 key 생성 (skill과 그룹으로 병합)
            const group = getGroup(current.sort);
            const key = `${current.skill}-${group}`;

            // 이미 `acc`에 해당 key가 존재하는 경우
            if (acc[key]) {
                const existing = acc[key];

                // 우선순위가 높은 sort를 선택
                if (priorityMap[current.sort] > priorityMap[existing.sort]) {
                    acc[key] = current;
                } else if (priorityMap[current.sort] === priorityMap[existing.sort]) {
                    // 우선순위가 같으면 level이 높은 것을 선택
                    if (current.level > existing.level) {
                        acc[key] = current;
                    }
                }
            } else {
                // `acc`에 key가 존재하지 않으면 현재 객체를 추가
                acc[key] = current;
            }

            return acc;
        }, {}));

        aloneTooltip.forEach(toolTip => {
            if (toolTip.skill === null) return;
            if (atkBuff.includes(toolTip.skill) && (toolTip.sort.includes("겁화") || toolTip.sort.includes("딜광휘"))) {
                gemObj.atkBuff += toolTip.level;
            }
            if (damageBuff.includes(toolTip.skill) && (toolTip.sort.includes("겁화") || toolTip.sort.includes("딜광휘"))) {
                gemObj.damageBuff += toolTip.level;
            }
            if (atkBuffACdr.includes(toolTip.skill) && (toolTip.sort.includes("작열") || toolTip.sort.includes("홍염") || toolTip.sort.includes("쿨광휘"))) {
                let coolValue = gemPerObj.find(obj => obj.name === toolTip.sort);
                gemObj.atkBuffACdr += coolValue[`level${toolTip.level}`];

            }
            if (atkBuffBCdr.includes(toolTip.skill) && (toolTip.sort.includes("작열") || toolTip.sort.includes("홍염") || toolTip.sort.includes("쿨광휘"))) {
                let coolValue = gemPerObj.find(obj => obj.name === toolTip.sort);
                gemObj.atkBuffBCdr += coolValue[`level${toolTip.level}`];

            }
        })
    }
    //console.log(gemObj)


    /* **********************************************************************************************************************
     * name		              :	  AttackBonus{}
     * version                :   2.0
     * description            :   보석, 어빌리티스톤 기본 공격력 추출
     * USE_TN                 :   사용
     *********************************************************************************************************************** */


    function gemAttackBonus() {
        let regex = /:\s*([\d.]+)%/
        if (!(data.ArmoryGem.Effects.Description == "")) {
            return Number(data.ArmoryGem.Effects.Description.match(regex)[1])
        } else {
            return 0
        }
    }
    function abilityAttackBonus() {
        let result = 0
        data.ArmoryEquipment.forEach(function (equip) {
            if (equip.Type == "어빌리티 스톤") {
                let regex = /기본 공격력\s\+([0-9.]+)%/;
                if (regex.test(equip.Tooltip)) {
                    result = Number(equip.Tooltip.match(regex)[1]);
                    return result
                }

            }
        })
        return result
    }
    etcObj.gemAttackBonus = gemAttackBonus();
    etcObj.abilityAttackBonus = abilityAttackBonus();

    /* **********************************************************************************************************************
     * name		              :	  avatarStats{}
     * version                :   2.0
     * description            :   전설/영웅 아바타 힘민지 추출
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    function avatarStats() {

        let result;

        const validTypes = ["무기 아바타", "머리 아바타", "상의 아바타", "하의 아바타"];
        const seenTypes = new Set();
        let bonusTotal = 0;
        let hasTopBottomLegendary = false;

        if (data.ArmoryAvatars != null) {
            data.ArmoryAvatars.forEach(item => {
                if ((item.Type === "상의 아바타" || item.Type === "하의 아바타") && item.Grade === "전설") {
                    hasTopBottomLegendary = true;
                }
            });
            data.ArmoryAvatars.forEach(item => {
                const isTopBottomAvatar = item.Tooltip.includes("상의&하의 아바타");
                if (validTypes.includes(item.Type) && !seenTypes.has(item.Type)) {
                    if (isTopBottomAvatar && !hasTopBottomLegendary) {
                        bonusTotal += 2;
                        seenTypes.add(item.Type);
                    } else if (item.Grade === "전설") {
                        bonusTotal += 2;
                        seenTypes.add(item.Type);
                    } else if (item.Grade === "영웅" && !seenTypes.has(item.Type)) {
                        bonusTotal += 1;
                        seenTypes.add(item.Type);
                    }
                }
            });

            result = bonusTotal / 100 + 1;
        } else {

            result = 1;
        }

        return result
    }
    // console.log(avatarStats()) <= 전설/영웅 아바타 스텟
    etcObj.avatarStats = avatarStats();


    /* **********************************************************************************************************************
     * name		              :	  healthStatus()
     * version                :   2.0
     * description            :   체력 자체 계산 로직
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    function healthStatus() {
        let result = 0;
        data.ArmoryEquipment.forEach(function (armor) {

            if (/^(투구|상의|하의|장갑|어깨|목걸이|귀걸이|반지|어빌리티 스톤|팔찌)$/.test(armor.Type)) {

                if (armor.Tooltip && typeof armor.Tooltip === 'string') {
                    let textToParse = armor.Tooltip;
                    // 팔찌 타입에만 HTML 태그 제거 로직 적용
                    if (armor.Type === "팔찌") {
                        textToParse = armor.Tooltip.replace(/<[^>]*>/g, ' ');
                    }

                    const allMatches = textToParse.match(/체력\s+\+\d+/g);

                    if (allMatches) {
                        allMatches.forEach(matchText => {
                            const numberMatch = matchText.match(/\d+/);

                            if (numberMatch) {
                                result += Number(numberMatch[0]);
                            }
                        });
                    }
                }
            }
        });
        return result;
    }


    let healthPer = 0;
    if (etcObj.characterClass === "바드") {
        healthPer = 2;
    } else if (etcObj.characterClass === "홀리나이트") {
        healthPer = 2.1;
    } else if (etcObj.characterClass === "발키리") {
        healthPer = 2.1;
    } else if (etcObj.characterClass === "도화가") {
        healthPer = 2;
    }

    /* **********************************************************************************************************************
     * name		              :	  karmaPoint{}
     * version                :   2.0
     * description            :   카르마 파싱
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    let karmaObj = {
        evolutionKarmaRank: null,
        evolutionKarmaLevel: null,
        enlightKarmaRank: null,
        leapKarmaRank: null,
    }

    const evolutionKarma = data.ArkPassive.Points[0].Description;
    const enlightKarma = data.ArkPassive.Points[1].Description;
    const leapKarma = data.ArkPassive.Points[2].Description;

    const rankRegex = /(\d+)랭크/;
    const levelRegex = /(\d+)레벨/;

    const evolutionRankMatch = evolutionKarma.match(rankRegex);
    const evolutionLevelMatch = evolutionKarma.match(levelRegex);

    const enlightRankMatch = enlightKarma.match(rankRegex);
    const enlightLevelMatch = enlightKarma.match(levelRegex);

    const leapRankMatch = leapKarma.match(rankRegex);
    const leapLevelMatch = leapKarma.match(levelRegex);

    karmaObj.evolutionKarmaRank = evolutionRankMatch ? parseInt(evolutionRankMatch[1], 10) : 0;
    karmaObj.evolutionKarmaLevel = evolutionLevelMatch ? parseInt(evolutionLevelMatch[1], 10) : 0;

    karmaObj.enlightKarmaRank = enlightRankMatch ? parseInt(enlightRankMatch[1], 10) : 0;
    karmaObj.enlightKarmaLevel = enlightLevelMatch ? parseInt(enlightLevelMatch[1], 10) : 0;

    karmaObj.leapKarmaRank = leapRankMatch ? parseInt(leapRankMatch[1], 10) : 0;
    karmaObj.leapKarmaLevel = leapLevelMatch ? parseInt(leapLevelMatch[1], 10) : 0;

    arkObj.evolutionDamage = arkObj.evolutionDamage + (karmaObj.evolutionKarmaRank * 0.01);
    arkObj.stigmaPer = arkObj.stigmaPer + karmaObj.evolutionKarmaRank;
    arkObj.statHp = karmaObj.evolutionKarmaLevel * 400;
    arkObj.weaponAtkPer = 1 + (karmaObj.enlightKarmaLevel * 0.001);
    arkObj.leapDamage = arkObj.leapDamage + Math.max(((karmaObj.leapKarmaLevel - 21) * 0.015 / 100), 0);

    //function karmaPointCalc() {
    //    let cardHP = totalMaxHpBonus;
    //    let maxHealth = defaultObj.maxHp;
    //    let baseHealth = defaultObj.statHp + elixirObj.statHp + accObj.statHp + hyperObj.statHp + bangleObj.statHp;
    //    let vitalityRate = defaultObj.hpActive;
    //    let materialObj = {
    //        cardHP: cardHP,
    //        maxHealth: maxHealth,
    //        baseHealth: baseHealth,
    //        vitalityRate: vitalityRate
    //    }
    //    etcObj.evoKarmaMaterial = materialObj;
    //};
    //karmaPointCalc();



    /* **********************************************************************************************************************
     * name		              :	  arkgridGemObj{}
     * version                :   2.0
     * description            :   아크그리드 젬 정보 파싱 및 수치 부여
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    const getOriginarkgridGemObj = () => ({
        finalDamagePer: 1,
        addDamagePer: 0,
        atkPer: 0,
        stigmaPer: 0,
        atkBuff: 0,
        damageBuff: 0,
    })

    let arkgridGemObj = getOriginarkgridGemObj();

    const arkgridGemMapping = {
        "공격력": {
            key: "atkPer",
            value: level => (Math.floor(11 * level / 3)) / 100
        },
        "추가 피해": {
            key: "addDamagePer",
            value: level => (Math.floor(97 * level / 12)) / 100
        },
        "보스 피해": {
            key: "finalDamagePer",
            value: level => (Math.floor(25 * level / 3)) / 10000 + 1
        },
        "낙인력": {
            key: "stigmaPer",
            value: level => (Math.floor(50 * level / 3)) / 100
        },
        "아군 공격 강화": {
            key: "atkBuff",
            value: level => (13 * level) / 100
        },
        "아군 피해 강화": {
            key: "damageBuff",
            value: level => (5 * level + Math.floor(level / 4)) / 100
        },
    }


    if (data.ArkGrid && Array.isArray(data.ArkGrid.Effects)) {

        data.ArkGrid.Effects.forEach(efffect => {
            const mapping = arkgridGemMapping[efffect.Name];
            if (mapping) {
                arkgridGemObj[mapping.key] = mapping.value(efffect.Level);
            }
        });

    }


    /* **********************************************************************************************************************
     * name		              :	  arkgridCoreObj{}
     * version                :   2.0
     * description            :   아크그리드 코어 정보 파싱 및 수치 부여
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    const getOriginarkgridObj = () => ({
        coreValue: 1,
        finalDamagePer: 1,
        addDamagePer: 0,
        atkPlus: 0,
        atkPer: 0,
        weaponAtkPlus: 0,
        weaponAtkPer: 0,
        identityUptime: 0,
        utilityPower: 0,
        cdrPercent: 0,
        carePower: 0,
        atkBuff: 0,
        damageBuff: 0,
        stigmaPer: 0,
        health: 0,
        statHP: 0,
        finalDamageBuff: 1,
        atkBuffPlus: 1,


    });

    let arkgridObj = getOriginarkgridObj();

    const arkPassive = supportCheck();
    const characterRole = arkPassive === "서폿" ? 'support' : 'dealer';
    const classCores = Modules.originFilter.arkgridCoreFilter[arkPassive];

    if (classCores && data.ArkGrid && Array.isArray(data.ArkGrid.Slots)) {
        const validOrderCores = [...(classCores.mainCore || []), ...(classCores.starCore || [])];
        const equippedValidOrderCores = data.ArkGrid.Slots
            .filter(slot => slot && slot.Name && validOrderCores.includes(slot.Name.trim()))
            .map(slot => slot.Name.trim());

        const hasSunCore = equippedValidOrderCores.some(Name => Name.startsWith("질서의 해"));
        const hasMoonCore = equippedValidOrderCores.some(Name => Name.startsWith("질서의 달"));
        const canApplySpecialCondition = hasSunCore && hasMoonCore;


        data.ArkGrid.Slots.forEach(slot => {

            if (!slot || !slot.Name) {
                return;
            }

            let { Grade, Point } = slot;
            const Name = slot.Name.trim();

            // --- 질서 코어 계산 ---
            if (validOrderCores.includes(Name)) {
                let coreGroup = null;
                let pointToUse = Point;

                if (Name.startsWith("질서의 해") || Name.startsWith("질서의 달")) {
                    coreGroup = "group1";
                    if (Point >= 14 && !canApplySpecialCondition) {
                        pointToUse = 10;
                    }
                } else if (Name.startsWith("질서의 별")) {
                    coreGroup = "group2";
                }

                if (coreGroup) {
                    const valueGrade = (Grade === "영웅" || Grade === "전설" || Grade === "유물") ? "유물" : Grade;
                    const value = Modules.originFilter.arkgridCoreValues[characterRole]?.[coreGroup]?.[valueGrade]?.[pointToUse];
                    if (value !== undefined) {
                        arkgridObj.coreValue *= value;
                    }
                }
            }

            // --- 혼돈 코어 계산 ---
            if (Name.startsWith("혼돈")) {
                const coreData = Modules.originFilter.chaosCoreValues[Name];
                if (coreData && coreData[Point]) {
                    let bonus = coreData[Point];

                    if (bonus[Grade]) {
                        bonus = bonus[Grade];
                    }

                    for (const statName in bonus) {
                        if (arkgridObj.hasOwnProperty(statName)) {
                            const value = bonus[statName];

                            if (getOriginarkgridObj()[statName] === 1) {
                                arkgridObj[statName] *= value;
                            } else {
                                arkgridObj[statName] += value;
                            }
                        }
                    }
                }
            }
        }); // forEach 루프는 여기서 올바르게 끝납니다.
    }

    arkgridObj.addDamagePer = arkgridObj.addDamagePer + arkgridGemObj.addDamagePer;
    arkgridObj.finalDamagePer = arkgridObj.finalDamagePer * arkgridGemObj.finalDamagePer;
    arkgridObj.atkPer = arkgridObj.atkPer + arkgridGemObj.atkPer;
    arkgridObj.atkBuff = arkgridObj.atkBuff + arkgridGemObj.atkBuff;
    arkgridObj.damageBuff = arkgridObj.damageBuff + arkgridGemObj.damageBuff;
    arkgridObj.stigmaPer = arkgridObj.stigmaPer + arkgridGemObj.stigmaPer;

    etcObj.healthStatus = Number((healthStatus() + arkgridObj.health) * jobObj.healthPer);
    etcObj.RealHealthStauts = Number(healthStatus() + arkgridObj.health) * healthPer;

    //if (localStorage.getItem("devilDamage") === "false") {
    //    arkgridObj = getOriginarkgridObj();
    //    arkgridGemObj = getOriginarkgridGemObj();
    //}


    /* **********************************************************************************************************************
     * name		              :	  armoryInfoExtract
     * version                :   2.0
     * description            :   html에 사용될 armory정보를 반환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function armoryInfoExtract() {
        let result = null;
        result = data.ArmoryEquipment.map(armoryObj => {
            if (/무기|투구|상의|하의|장갑|어깨/.test(armoryObj.Type)) {
                let obj = {};
                let betweenText = armoryObj.Tooltip.match(/>([^<]+)</g)?.map(match => match.slice(1, -1)) || [];
                let advancedLevelIndex = betweenText.findIndex(text => text === "[상급 재련]");

                let elixir = betweenText.map((text, idx) => {
                    if (/\[(투구|어깨|장갑|상의|하의|무기|공용)\]/.test(text)) {
                        let obj = {}
                        obj.type = text;
                        obj.name = betweenText[idx + 1].trim();
                        obj.level = betweenText[idx + 2].trim();
                        return obj
                    }
                    return null;
                }).filter(item => item !== null);

                let qualityIndex = betweenText.findIndex(text => text === "품질");
                let qualityValue = betweenText[qualityIndex + 3].match(/"qualityValue":\s*(\d+)/)[1];

                let tierValue = null; // 기본값을 null로 설정
                const tierText = betweenText.find(text => /\(티어\s[0-9]+\)/.test(text));
                if (tierText) { // tierText가 존재하는 경우에만 match 실행
                    const tierMatch = tierText.match(/\(티어\s([0-9]+)\)/);
                    if (tierMatch && tierMatch[1]) {
                        tierValue = tierMatch[1];
                    }
                } else if (betweenText.find(text => text.includes("에스더"))) { // 에스더 장비 티어 깨짐 검사
                    tierValue = "E"
                }

                let hyperIndex = betweenText.findIndex(text => text === "[초월]");
                let hyperLevel = betweenText[hyperIndex + 2];
                let hyperStar = betweenText[hyperIndex + 4].match(/\d+/)[0];

                obj.hyperIndex = hyperIndex;
                obj.hyperLevel = hyperLevel;
                obj.hyperStar = hyperStar;
                obj.tier = tierValue;
                obj.quality = qualityValue;
                obj.elixir = elixir;
                obj.advancedLevelIndex = advancedLevelIndex;
                obj.advancedLevel = betweenText[advancedLevelIndex + 2];
                obj.grade = armoryObj.Grade;
                obj.name = armoryObj.Name;
                obj.type = armoryObj.Type;
                obj.icon = armoryObj.Icon;
                return obj
            } else {
                return null
            }
        }).filter(item => item !== null);
        return result
    }
    htmlObj.armoryInfo = armoryInfoExtract()

    /* **********************************************************************************************************************
     * name		              :	  accessoryInfoExtract
     * version                :   2.0
     * description            :   html에 사용될 accessory정보를 반환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function accessoryInfoExtract() {
        let result = data.ArmoryEquipment.map((accessoryObj, idx) => {
            if (/목걸이|귀걸이|반지/.test(accessoryObj.Type)) {
                let obj = {};
                let betweenText = accessoryObj.Tooltip.match(/>([^<]+)</g)?.map(match => match.slice(0, -1)) || [];
                let gradeMatch = betweenText[2].match(/(고대|유물)/g);
                let grade = gradeMatch ? gradeMatch[0] : "없음";
                let strStats = betweenText.find(item => /힘 \+(\d+)/.test(item));
                strStats = Number(strStats.match(/힘 \+(\d+)/)[1]);
                let healthStats = betweenText.find(item => /체력 \+(\d+)/.test(item));
                healthStats = Number(healthStats.match(/체력 \+(\d+)/)[1]);
                let tierMatch = betweenText[6].match(/\d+/);
                let tier = tierMatch ? tierMatch[0] : null;
                let accessoryTooltip = accessoryObj.Tooltip.replace(/<[^>]*>/g, '')

                let accessoryGradeArray = Modules.originFilter.grindingFilter.filter(filter => {
                    let check = filter.split(":")[0];
                    if (accessoryTooltip.includes(check)) {
                        accessoryTooltip = accessoryTooltip.replace(check, "")
                        return true;
                    }
                })
                // console.log(accessoryGradeArray)
                let qualityIndex = betweenText.findIndex(text => text === ">품질");
                let qualityValueMatch = betweenText[qualityIndex + 3]?.match(/"qualityValue":\s*(\d+)/);
                let qualityValue = qualityValueMatch ? qualityValueMatch[1] : null;

                obj.grade = grade;
                obj.quality = qualityValue;
                obj.accessory = accessoryGradeArray;
                obj.tier = tier;
                obj.type = accessoryObj.Type;
                obj.name = accessoryObj.Name;
                obj.icon = accessoryObj.Icon;
                obj.stats = strStats;
                obj.health = healthStats;
                return obj;
            } else {
                return null;
            }
        }).filter(item => item !== null);
        return result;
    }
    htmlObj.accessoryInfo = accessoryInfoExtract();

    etcObj.sumStats = htmlObj.accessoryInfo.reduce((acc, item) => {
        return acc + (item.stats || 0);
    }, 0);

    /* **********************************************************************************************************************
     * name		              :	  stoneInfoExtract
     * version                :   2.0
     * description            :   html에 사용될 accessory정보를 반환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function stoneInfoExtract() {
        let result = null;
        data.ArmoryEquipment.forEach(stone => {
            if (stone.Type !== "어빌리티 스톤") {
                return;
            }

            let obj = {};
            try {
                const stoneParsed = JSON.parse(stone.Tooltip);
                const itemTitle = stoneParsed.Element_001?.value;
                // 티어 정보 추출
                const tierStr = itemTitle?.leftStr2 || '';
                const tierMatch = tierStr.replace(/<[^>]*>/g, "").match(/\d+/);
                obj.tier = tierMatch ? tierMatch[0] : null;
                // 체력 정보 추출
                let totalHealth = 0;
                // Element_004 (기본 효과)
                const baseEffectHealth = stoneParsed.Element_004?.value?.Element_001 || '';
                const baseHealthMatch = baseEffectHealth.match(/체력 \+(\d+)/);
                if (baseHealthMatch && baseHealthMatch[1]) {
                    totalHealth += parseInt(baseHealthMatch[1], 10);
                }
                // Element_006 (세공 단계 보너스)
                const bonusEffectHealth = stoneParsed.Element_006?.value?.Element_001 || '';
                const bonusHealthMatch = bonusEffectHealth.match(/체력 \+(\d+)/);
                if (bonusHealthMatch && bonusHealthMatch[1]) {
                    totalHealth += parseInt(bonusHealthMatch[1], 10);
                }
                obj.health = totalHealth;

                // 각인 정보 추출
                let engravings = stoneParsed.Element_007?.value?.Element_000?.contentStr;
                if (!engravings) {
                    engravings = stoneParsed.Element_006?.value?.Element_000?.contentStr;
                }
                let optionArray = [];
                if (engravings) {
                    for (const key in engravings) {
                        const engraveStr = engravings[key]?.contentStr;
                        if (engraveStr && engraveStr.includes("Lv.")) {
                            const nameMatch = engraveStr.match(/<FONT COLOR='#FFFFAC'>(.*?)<\/FONT>/);
                            const levelMatch = engraveStr.match(/Lv\.(\d+)/);

                            if (nameMatch && nameMatch[1] && levelMatch && levelMatch[1]) {
                                optionArray.push({
                                    name: nameMatch[1],
                                    level: levelMatch[1]
                                });
                            }
                        }
                    }
                }
                obj.optionArray = optionArray;

                // 나머지 기본 정보
                obj.grade = stone.Grade;
                obj.name = stone.Name;
                obj.icon = stone.Icon;
                result = obj;

            } catch (e) {
                console.error("어빌리티 스톤 정보 처리 중 오류:", e);
                result = null; // 오류 발생 시 null 반환
            }
        });
        return result;
    }
    htmlObj.stoneInfo = stoneInfoExtract();

    /* **********************************************************************************************************************
     * name		              :	  bangleInfoExtract
     * version                :   2.0
     * description            :   html에 사용될 accessory정보를 반환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    function bangleInfoExtract() {
        let result = null;
        data.ArmoryEquipment.forEach(bangle => {
            let obj = {};
            if (bangle.Type === "팔찌") {
                let betweenText = bangle.Tooltip.match(/>([^<]+)</g)?.map(match => match.slice(1, -1)) || [];
                let replaceText = bangle.Tooltip.replace(/<[^>]*>/g, '');
                let tier = betweenText[4].match(/\d+/)[0];
                let bangleFilter;
                if (tier === "3" && bangle.Grade === "유물") {
                    bangleFilter = Modules.simulatorFilter.bangleOptionData.t3RelicData;
                } else if (tier === "3" && bangle.Grade === "고대") {
                    bangleFilter = Modules.simulatorFilter.bangleOptionData.t3MythicData;
                } else if (tier === "4" && bangle.Grade === "유물") {
                    bangleFilter = Modules.simulatorFilter.bangleOptionData.t4RelicData;
                } else if (tier === "4" && bangle.Grade === "고대") {
                    bangleFilter = Modules.simulatorFilter.bangleOptionData.t4MythicData;
                }
                // console.log(replaceText)
                let options = bangleFilter.filter(filter => {
                    if (replaceText.includes(filter.fullName)) {
                        // console.log(filter.fullName)
                        replaceText = replaceText.replace(filter.fullName, "")
                        return true;
                    };
                });

                const bangleParsed = JSON.parse(bangle.Tooltip);
                const optionsHtml = bangleParsed.Element_005?.value?.Element_001 || '';
                const cleanLines = optionsHtml.split(/<BR>/i)
                    .map(line => line.replace(/<[^>]*>/g, '').trim())
                    .filter(line => line.length > 0);

                let specialStats = cleanLines.filter(text => /^(치명|특화|신속)\s*\+/.test(text));
                let normalStats = cleanLines.filter(text => /^(힘|민첩|지능|체력)\s*\+/.test(text));

                obj.normalStatsArray = normalStats;
                obj.specialStatsArray = specialStats;
                obj.optionArray = options;
                obj.tier = tier;
                obj.grade = bangle.Grade;
                obj.name = bangle.Name;
                obj.icon = bangle.Icon;
                result = obj;
            }

        })
        return result;
    }
    htmlObj.bangleInfo = bangleInfoExtract();


    /* **********************************************************************************************************************
     * name		              :	  engravingInfoExtract
     * version                :   2.0
     * description            :   html에 사용될 각인정보를 반환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function engravingInfoExtract() {
        let result = [];

        if (data.ArmoryEngraving) {
            data.ArmoryEngraving.ArkPassiveEffects.forEach(eng => {
                let obj = {};
                let icon = Modules.originFilter.engravingImg.find(filter => filter.split("^")[0] === eng.Name);

                obj.stone = eng.AbilityStoneLevel;
                obj.grade = eng.Grade;
                obj.level = eng.Level;
                obj.name = eng.Name;
                obj.icon = icon.split("^")[1];
                result.push(obj);
            })

        }
        return result;
    }
    htmlObj.engravingInfo = engravingInfoExtract();

    /* **********************************************************************************************************************
     * name		              :	  medianInfoExtract
     * version                :   2.0
     * description            :   현재 유저통계 중앙값 정보를 반환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function medianInfoExtract() {
        let result = {
            dealerMedianValue: "미제공",
            supportMedianValue: 0,
            supportMinMedianValue: 469.23,
            supportMaxMedianValue: 1630.71,
            dealerMinMedianValue: 853.43,
            dealerMaxMedianValue: 3265.48,

        };
        let itemLevel = Number(data.ArmoryProfile.ItemAvgLevel.replace(",", ""));
        if (itemLevel >= 1660 && itemLevel < 1665) {
            result.dealerMedianValue = 868.87;
        } else if (itemLevel >= 1665 && itemLevel < 1670) {
            result.dealerMedianValue = 917.60;
        } else if (itemLevel >= 1670 && itemLevel < 1675) {
            result.dealerMedianValue = 964.38;
        } else if (itemLevel >= 1675 && itemLevel < 1680) {
            result.dealerMedianValue = 989.95;
        } else if (itemLevel >= 1680 && itemLevel < 1685) {
            result.dealerMedianValue = 1356.94;
        } else if (itemLevel >= 1685 && itemLevel < 1690) {
            result.dealerMedianValue = 1522.24;
        } else if (itemLevel >= 1690 && itemLevel < 1695) {
            result.dealerMedianValue = 1585.47;
        } else if (itemLevel >= 1695 && itemLevel < 1700) {
            result.dealerMedianValue = 1683.30;
        } else if (itemLevel >= 1700 && itemLevel < 1705) {
            result.dealerMedianValue = 1829.85;
        } else if (itemLevel >= 1705 && itemLevel < 1710) {
            result.dealerMedianValue = 1982.23;
        } else if (itemLevel >= 1710 && itemLevel < 1715) {
            result.dealerMedianValue = 2076.34;
        } else if (itemLevel >= 1715 && itemLevel < 1720) {
            result.dealerMedianValue = 2140.00;
        } else if (itemLevel >= 1720 && itemLevel < 1725) {
            result.dealerMedianValue = 2307.12;
        } else if (itemLevel >= 1725 && itemLevel < 1730) {
            result.dealerMedianValue = 2426.64;
        } else if (itemLevel >= 1730 && itemLevel < 1735) {
            result.dealerMedianValue = 2583.30;
        } else if (itemLevel >= 1735 && itemLevel < 1740) {
            result.dealerMedianValue = 2741.69;
        } else if (itemLevel >= 1740 && itemLevel < 1745) {
            result.dealerMedianValue = 2969.72;
        } else if (itemLevel >= 1745 && itemLevel < 1750) {
            result.dealerMedianValue = 3272.14;
        } else if (itemLevel >= 1750 && itemLevel < 1755) {
            result.dealerMedianValue = 3521.55;
        } else if (itemLevel >= 1755) {
            result.dealerMedianValue = 3740.29;
        }

        // console.log(itemLevel)
        if (itemLevel >= 1660 && itemLevel < 1665) {
            result.supportMedianValue = 1022.14;
        } else if (itemLevel >= 1665 && itemLevel < 1670) {
            result.supportMedianValue = 1057.95;
        } else if (itemLevel >= 1670 && itemLevel < 1675) {
            result.supportMedianValue = 1094.42;
        } else if (itemLevel >= 1675 && itemLevel < 1680) {
            result.supportMedianValue = 1119.94;
        } else if (itemLevel >= 1680 && itemLevel < 1685) {
            result.supportMedianValue = 1394.56;
        } else if (itemLevel >= 1685 && itemLevel < 1690) {
            result.supportMedianValue = 1488.58;
        } else if (itemLevel >= 1690 && itemLevel < 1695) {
            result.supportMedianValue = 1549.66;
        } else if (itemLevel >= 1695 && itemLevel < 1700) {
            result.supportMedianValue = 1640.15;
        } else if (itemLevel >= 1700 && itemLevel < 1705) {
            result.supportMedianValue = 1769.76;
        } else if (itemLevel >= 1705 && itemLevel < 1710) {
            result.supportMedianValue = 1916.04;
        } else if (itemLevel >= 1710 && itemLevel < 1715) {
            result.supportMedianValue = 2025.63;
        } else if (itemLevel >= 1715 && itemLevel < 1720) {
            result.supportMedianValue = 2100.11;
        } else if (itemLevel >= 1720 && itemLevel < 1725) {
            result.supportMedianValue = 2257.75;
        } else if (itemLevel >= 1725 && itemLevel < 1730) {
            result.supportMedianValue = 2444.81;
        } else if (itemLevel >= 1730 && itemLevel < 1735) {
            result.supportMedianValue = 2627.55;
        } else if (itemLevel >= 1735 && itemLevel < 1740) {
            result.supportMedianValue = 2848.10;
        } else if (itemLevel >= 1740 && itemLevel < 1745) {
            result.supportMedianValue = 3075.01;
        } else if (itemLevel >= 1745 && itemLevel < 1750) {
            result.supportMedianValue = 3353.54;
        } else if (itemLevel >= 1750 && itemLevel < 1755) {
            result.supportMedianValue = 3587.85;
        } else if (itemLevel >= 1755) {
            result.supportMedianValue = 3824.50;
        }

        return result;
    }
    htmlObj.medianInfo = medianInfoExtract();
    /* **********************************************************************************************************************
     * name		              :	  elxirInfoExtract
     * version                :   2.0
     * description            :   중복된 유효 엘릭서 여부를 확인하여 유효 중복엘릭서와 총 레벨값을 반환함
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function elxirInfoExtract() {
        let result = {};
        let elixirDouble = ["회심", "달인 (", "강맹", "칼날방패", "선봉대", "행운", "선각자", "진군", "신념"]
        // extractValue.htmlObj.armoryInfo[i].elixir[i]
        let allElixirData = [];
        htmlObj.armoryInfo.forEach(item => {
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

        function elixirLevelSum(array) {
            let sumValue = 0;
            array.forEach(item => {
                let value = Number(item.level.match(/Lv\.(\d+)/)[1]);
                sumValue += value;
            })
            return sumValue
        }
        // console.log(countDuplicates(specialElixir))
        // console.log(elixirLevelSum(allElixirData))
        result.count = countDuplicates(specialElixir) ? countDuplicates(specialElixir).count : 0;
        result.name = countDuplicates(specialElixir) ? countDuplicates(specialElixir).name : "";
        result.sumValue = elixirLevelSum(allElixirData);
        return result;
    }
    htmlObj.elxirInfo = elxirInfoExtract();

    /* **********************************************************************************************************************
     * name		              :	  hyperInfoExtract
     * version                :   2.0
     * description            :   초월의 총합을 반환
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function hyperInfoExtract() {
        let reulst = {};
        let hyperStarArray = htmlObj.armoryInfo.map(item => item.hyperStar);
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
        reulst.sumValue = hyperAvgValue(hyperStarArray).sumValue;
        reulst.avgValue = hyperAvgValue(hyperStarArray).avgValue;
        return reulst;
    }
    htmlObj.hyperInfo = hyperInfoExtract();


    /* **********************************************************************************************************************
     * name		              :	  
     * version                :   2.0
     * description            :   export할 값들을 정리
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    let extractValue = {
        defaultObj,
        engObj,
        accObj,
        bangleObj,
        arkObj,
        elixirObj,
        jobObj,
        hyperObj,
        gemObj,
        supportSkillObj,
        etcObj,
        karmaObj,
        arkgridObj,
        htmlObj,
    }
    return extractValue
}