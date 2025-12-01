export async function specPointCalc(inputObj) {


    // 4티어 스펙포인트
    let highTierSpecPointObj = {

        dealerAttackPowResult: 0, // 공격력
        dealerTotalStatus: 0, // 치특신 합계
        dealerEngResult: 0, // 각인 효율
        dealerEvloutionResult: 0, // 진화 효율
        dealerEnlightResult: 0, // 깨달음 효율
        dealerLeapResult: 0, // 도약 효율
        dealerBangleResult: 0, // 팔찌 효율

        supportStigmaResult: 0, // 낙인력
        supportAllTimeBuff: 0, // 상시버프
        supportFullBuff: 0, //풀버프
        supportEngBonus: 0, //각인 보너스
        supportgemsCoolAvg: 0, // 보석 쿨감
        supportCarePowerResult: 0, // 케어력
        supportBangleResult: 0, // 팔찌효율


        supportSpecPoint: 0,     // 서폿 최종 스펙포인트
        dealerlastFinalValue: 0, // 딜러 최종 스펙포인트
        completeSpecPoint: 0, // 통합된 최종 스펙포인트
    }

    /* **********************************************************************************************************************
     * name		              :	  Variable for SpecPoint calc for deal
     * version                :   2.0
     * description            :   스펙 포인트 계산을 위한 변수 모음
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    
    // 기본 공격력 증가(보석, 어빌리티 스톤)
    let attackBonus = ((inputObj.etcObj.gemAttackBonus + inputObj.etcObj.abilityAttackBonus) / 100) + 1 
    //진화형 피해
    let evolutionDamageResult = (inputObj.arkObj.evolutionDamage)
    // 깨달음 딜증
    let enlightResult = inputObj.arkObj.enlightenmentDamage
    // 깨달음 버프력
    let enlightBuffResult = inputObj.arkObj.enlightenmentBuff
    // 보석 쿨감
    let gemsCoolValue = (1 / (1 - (inputObj.etcObj.gemCheckFnc.gemAvg) / 100) - 1) + 1
    // 쿨감 밸류 (현재 아크그리드만 존재)
    let coolDownValue = (1 / (1 - (inputObj.arkgridObj.cdrPercent)) - 1) + 1

    //총합 체력
    let totalHealth = Number(((
        inputObj.etcObj.healthStatus 
        + inputObj.hyperObj.statHp 
        + inputObj.elixirObj.statHp 
        + inputObj.bangleObj.statHp 
        + inputObj.accObj.statHp 
        + inputObj.arkObj.statHp 
        + inputObj.arkgridObj.statHP) 
        * inputObj.defaultObj.hpActive * 1.07).toFixed(0));        

    // 스탯 (힘민지)
    let totalStat = (inputObj.etcObj.armorStatus 
        + inputObj.etcObj.expeditionStats 
        + inputObj.hyperObj.str 
        + inputObj.elixirObj.str 
        + inputObj.elixirObj.dex 
        + inputObj.elixirObj.int 
        + inputObj.bangleObj.str 
        + inputObj.bangleObj.dex 
        + inputObj.bangleObj.int) 
        * (inputObj.etcObj.avatarStats)

    // 무기 공격력
    let totalWeaponAtk = ((inputObj.defaultObj.weaponAtk 
        + inputObj.hyperObj.weaponAtkPlus 
        + inputObj.elixirObj.weaponAtkPlus
        + inputObj.accObj.weaponAtkPlus 
        + inputObj.bangleObj.weaponAtkPlus 
        + inputObj.bangleObj.weaponAtkBonus 
        + inputObj.arkgridObj.weaponAtkPlus) 
        * (inputObj.arkObj.weaponAtkPer 
        + (inputObj.accObj.weaponAtkPer / 100) + (inputObj.arkgridObj.weaponAtkPer / 100)))
    // 공격력
    let totalAtk = (((totalStat * totalWeaponAtk / 6) ** 0.5) * attackBonus 
    + (inputObj.elixirObj.atkPlus 
        + inputObj.hyperObj.atkPlus 
        + inputObj.accObj.atkPlus 
        + inputObj.elixirObj.atkBonus 
        + inputObj.arkgridObj.atkPlus)) 
        * (((inputObj.accObj.atkPer + inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer) === 0 ? 1 : (inputObj.accObj.atkPer + inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer)) / 100 + 1)    
        console.log(totalAtk,"공격력")
    // 추피 총합
    let bangleAddDamageResult = ((inputObj.defaultObj.addDamagePer 
        + inputObj.accObj.addDamagePer 
        + inputObj.bangleObj.addDamagePer
        + inputObj.arkgridObj.addDamagePer) / 100) + 1 

    // 적에게 주는 피해 총합
    let bangleFinalDamageResult = (bangleAddDamageResult 
        * inputObj.accObj.finalDamagePer 
        * inputObj.hyperObj.finalDamagePer 
        * inputObj.engObj.finalDamagePer 
        * inputObj.bangleObj.finalDamagePer
        * inputObj.elixirObj.finalDamagePer 
        * inputObj.arkgridObj.finalDamagePer
        * inputObj.arkgridObj.coreValue)


    /* **********************************************************************************************************************
     * name		              :	  Value Calc
     * version                :   2.0
     * description            :   악세 / 초월 / 엘릭서 / 팔찌 효율 계산을 위해 필요한 변수들
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    /**************************************************** 악세 ****************************************************************/

    // 악세 제외 스탯 (힘민지)
    let minusAccStat = (inputObj.etcObj.armorStatus 
        + inputObj.etcObj.expeditionStats 
        + inputObj.hyperObj.str 
        + inputObj.elixirObj.str 
        + inputObj.elixirObj.dex 
        + inputObj.elixirObj.int
        + inputObj.bangleObj.str 
        + inputObj.bangleObj.dex 
        + inputObj.bangleObj.int - inputObj.etcObj.sumStats) * inputObj.etcObj.avatarStats

    // 악세 제외 무기 공격력
    let minusAccWeaponAtk = ((inputObj.defaultObj.weaponAtk 
        + inputObj.hyperObj.weaponAtkPlus 
        + inputObj.elixirObj.weaponAtkPlus 
        + inputObj.bangleObj.weaponAtkPlus
        + inputObj.bangleObj.weaponAtkBonus 
        + inputObj.arkgridObj.weaponAtkPlus) 
        * (inputObj.arkObj.weaponAtkPer + (inputObj.arkgridObj.weaponAtkPer / 100)))

    // 악세 제외 공격력
    let minusAccAtk = (((minusAccStat * minusAccWeaponAtk / 6) ** 0.5) * attackBonus 
    + (inputObj.elixirObj.atkPlus 
        + inputObj.hyperObj.atkPlus 
        + inputObj.elixirObj.atkBonus
        + inputObj.arkgridObj.atkPlus)) 
        * (((inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer) === 0 ? 1 : (inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer)) / 100 + 1) 

    // 악세 제외 적에게 주는 피해
    let minusAccFinal = (inputObj.engObj.finalDamagePer 
        * inputObj.hyperObj.finalDamagePer 
        * (((inputObj.defaultObj.addDamagePer + inputObj.bangleObj.addDamagePer + inputObj.arkgridObj.addDamagePer) / 100) + 1) 
        * inputObj.bangleObj.finalDamagePer * inputObj.elixirObj.finalDamagePer * inputObj.arkgridObj.finalDamagePer)
    

    /**************************************************** 초월 *****************************************************************/

    // 초월 제외 스탯 (힘민지)
    let minusHyperStat = (inputObj.etcObj.armorStatus 
        + inputObj.etcObj.expeditionStats 
        + inputObj.elixirObj.str 
        + inputObj.elixirObj.dex 
        + inputObj.elixirObj.int 
        + inputObj.bangleObj.str 
        + inputObj.bangleObj.dex 
        + inputObj.bangleObj.int) 
        * inputObj.etcObj.avatarStats


        
    // 초월 제외 무기 공격력
    let minusHyperWeaponAtk = ((inputObj.defaultObj.weaponAtk 
        + inputObj.elixirObj.weaponAtkPlus 
        + inputObj.accObj.weaponAtkPlus 
        + inputObj.bangleObj.weaponAtkPlus
        + inputObj.bangleObj.weaponAtkBonus 
        + inputObj.arkgridObj.weaponAtkPlus) 
        * (inputObj.arkObj.weaponAtkPer 
        + ((inputObj.accObj.weaponAtkPer + inputObj.arkgridObj.weaponAtkPer) / 100)))

    // 초월 공격력
    let minusHyperAtk = (((minusHyperStat * minusHyperWeaponAtk / 6) ** 0.5) * attackBonus
        + (inputObj.elixirObj.atkPlus 
            + inputObj.accObj.atkPlus
            + inputObj.elixirObj.atkBonus
            + inputObj.arkgridObj.atkPlus))
            * (((inputObj.accObj.atkPer + inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer) === 0 ? 1 : (inputObj.accObj.atkPer + inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer)) / 100 + 1)


    // 초월 제외 적에게 주는 피해
    let minusHyperFinal = (bangleAddDamageResult 
        * inputObj.accObj.finalDamagePer 
        * inputObj.engObj.finalDamagePer 
        * inputObj.bangleObj.finalDamagePer 
        * inputObj.elixirObj.finalDamagePer 
        * inputObj.arkgridObj.finalDamagePer
        * inputObj.arkgridObj.coreValue)

    /**************************************************** 엘릭서 *****************************************************************/

    // 엘릭서 제외 스탯(힘민지)
    let minusElixirStat = (inputObj.etcObj.armorStatus 
        + inputObj.etcObj.expeditionStats
        + inputObj.hyperObj.str 
        + inputObj.bangleObj.str 
        + inputObj.bangleObj.dex 
        + inputObj.bangleObj.int) 
        * inputObj.etcObj.avatarStats

    // 엘릭서 제외 무기 공격력
    let minusElixirWeaponAtk = ((inputObj.defaultObj.weaponAtk 
        + inputObj.hyperObj.weaponAtkPlus 
        + inputObj.accObj.weaponAtkPlus 
        + inputObj.bangleObj.weaponAtkPlus 
        + inputObj.bangleObj.weaponAtkBonus 
        + inputObj.arkgridObj.weaponAtkPlus) 
        * (inputObj.arkObj.weaponAtkPer 
        + ((inputObj.accObj.weaponAtkPer + inputObj.arkgridObj.weaponAtkPer) / 100)))

    // 엘릭서 제외 공격력
    let minusElixirAtk = (((minusElixirStat * minusElixirWeaponAtk / 6) ** 0.5) * attackBonus 
        + (inputObj.hyperObj.atkPlus 
            + inputObj.accObj.atkPlus
            + inputObj.arkgridObj.atkPlus))
            * (((inputObj.accObj.atkPer + inputObj.arkgridObj.atkPer) === 0 ? 1 : (inputObj.accObj.atkPer + inputObj.arkgridObj.atkPer)) / 100 + 1) 

    // 엘릭서 제외 적에게 주는 피해.
    let minusElixirFinal = (bangleAddDamageResult
        * inputObj.accObj.finalDamagePer 
        * inputObj.hyperObj.finalDamagePer 
        * inputObj.engObj.finalDamagePer 
        * inputObj.bangleObj.finalDamagePer
        * inputObj.arkgridObj.finalDamagePer
        * inputObj.arkgridObj.coreValue);

    /**************************************************** 팔찌 *****************************************************************/

    // 팔찌 제외 스탯
    let minusBangleStat = (inputObj.etcObj.armorStatus 
        + inputObj.etcObj.expeditionStats 
        + inputObj.hyperObj.str 
        + inputObj.elixirObj.str 
        + inputObj.elixirObj.dex 
        + inputObj.elixirObj.int) 
        * inputObj.etcObj.avatarStats

    // 팔찌 제외 무기 공격력
    let minusBangleWeaponAtk = ((inputObj.defaultObj.weaponAtk 
        + inputObj.hyperObj.weaponAtkPlus 
        + inputObj.elixirObj.weaponAtkPlus 
        + inputObj.accObj.weaponAtkPlus 
        + inputObj.arkgridObj.weaponAtkPlus) 
        * (inputObj.arkObj.weaponAtkPer + ((inputObj.accObj.weaponAtkPer + inputObj.arkgridObj.weaponAtkPer) / 100)))

    // 팔찌 제외 공격력
    let minusBangleAtk = (((minusBangleStat * minusBangleWeaponAtk / 6) ** 0.5) 
        * attackBonus 
        + (inputObj.elixirObj.atkPlus + inputObj.hyperObj.atkPlus + inputObj.accObj.atkPlus + inputObj.arkgridObj.atkPlus + inputObj.elixirObj.atkBonus)) 
        * (((inputObj.accObj.atkPer + inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer) === 0 ? 1 : (inputObj.accObj.atkPer + inputObj.elixirObj.atkPer + inputObj.arkgridObj.atkPer)) / 100 + 1)
    
    // 팔찌로 얻은 공격력 퍼센티지
    let bangleAtkValue = ((totalAtk - minusBangleAtk) / minusBangleAtk) + 1


    /* **********************************************************************************************************************
     * name		              :	  최종 계산식 for deal
     * version                :   2.0
     * description            :   모든 변수를 취합하여 스펙 포인트 계산식 작성~
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    //최종 환산
    let lastFinalValue = (((totalAtk) 
        * evolutionDamageResult
        * bangleFinalDamageResult
        * inputObj.defaultObj.trinityValue
        * enlightResult
        * inputObj.arkObj.leapDamage 
        * inputObj.etcObj.gemCheckFnc.gemValue 
        * inputObj.etcObj.gemCheckFnc.etcAverageValue 
        * 1.01 
        * gemsCoolValue 
        * coolDownValue 
        * (((inputObj.defaultObj.totalStatus + inputObj.bangleObj.crit + inputObj.bangleObj.haste + inputObj.bangleObj.special) / 100 * 2) / 100 + 1 + 0.3)) 
        * inputObj.defaultObj.estherDeal)

    //악세 효율 
    let accAddDamageValue = (bangleAddDamageResult - (bangleAddDamageResult - inputObj.accObj.addDamagePer / 100)) / bangleAddDamageResult
    let minusAccValue = ((minusAccAtk) * evolutionDamageResult * minusAccFinal * enlightResult * inputObj.arkObj.leapDamage * inputObj.etcObj.gemCheckFnc.gemValue * inputObj.etcObj.gemCheckFnc.etcAverageValue * gemsCoolValue * (((inputObj.defaultObj.totalStatus + inputObj.bangleObj.crit + inputObj.bangleObj.haste + inputObj.bangleObj.special) / 100 * 2) / 100 + 1 + 0.3))
    let accValue = (((totalAtk-minusAccAtk)/minusAccAtk)*100) * inputObj.accObj.finalDamagePer * (inputObj.accObj.addDamagePer/100+1)

    //초월 효율
    let minusHyperValue = (((minusHyperAtk) 
    * evolutionDamageResult 
    * minusHyperFinal
    * inputObj.defaultObj.trinityValue
    * enlightResult
    * inputObj.arkObj.leapDamage
    * inputObj.etcObj.gemCheckFnc.gemValue 
    * inputObj.etcObj.gemCheckFnc.etcAverageValue 
    * 1.01
    * gemsCoolValue 
    * coolDownValue
    * (((inputObj.defaultObj.totalStatus + inputObj.bangleObj.crit + inputObj.bangleObj.haste + inputObj.bangleObj.special) / 100 * 2) / 100 + 1 + 0.3))
    * inputObj.defaultObj.estherDeal)
    let hyperValue = ((lastFinalValue - minusHyperValue) / minusHyperValue * 100).toFixed(2)

    //엘릭서 효율
    let minusElixirValue = (((minusElixirAtk) 
        * evolutionDamageResult 
        * minusElixirFinal
        * inputObj.defaultObj.trinityValue
        * enlightResult 
        * inputObj.arkObj.leapDamage 
        * inputObj.etcObj.gemCheckFnc.gemValue 
        * inputObj.etcObj.gemCheckFnc.etcAverageValue 
        * 1.01
        * gemsCoolValue 
        * coolDownValue
        * (((inputObj.defaultObj.totalStatus + inputObj.bangleObj.crit + inputObj.bangleObj.haste + inputObj.bangleObj.special) / 100 * 2) / 100 + 1 + 0.3))
        * inputObj.defaultObj.estherDeal)
    let elixirValue = ((lastFinalValue - minusElixirValue) / minusElixirValue * 100).toFixed(2)

    //팔찌 효율
    let bangleAddDamageValue = (bangleAddDamageResult - (bangleAddDamageResult - inputObj.bangleObj.addDamagePer / 100)) / bangleAddDamageResult
    let bangleStatusValue = ((inputObj.bangleObj.crit + inputObj.bangleObj.haste + inputObj.bangleObj.special) / 100 * 2) / 100 + 1
    let bangleValue = ((((bangleAtkValue * inputObj.bangleObj.finalDamagePer * (bangleAddDamageValue + 1) * bangleStatusValue) - 1) * 100) * 1.07).toFixed(2)
    //let bangleValue = ((((1 * bangleAtkValue * inputObj.bangleObj.finalDamagePer * (bangleAddDamageValue + 1) * (((inputObj.bangleObj.crit + inputObj.bangleObj.haste + inputObj.bangleObj.special) / 100 * 2) / 100 + 1)) - 1) * 100) * 1.065).toFixed(2)


    /* **********************************************************************************************************************
     * name		              :	  Variable for SpecPoint calc for sup
     * version                :   2.0
     * description            :   스펙포인트 계산을 위한 변수 모음
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    //기본 공격력
    let totalAtk2 = ((totalStat * totalWeaponAtk / 6) ** 0.5) * attackBonus 

    // 신속
    let fakeHaste = inputObj.defaultObj.statusHaste + inputObj.bangleObj.haste
    // 특화
    let fakeSpecial = inputObj.defaultObj.statusSpecial + inputObj.bangleObj.special

    // 낙인력
    let finalStigmaPer = ((10 
        * ((inputObj.accObj.stigmaPer 
        + inputObj.arkObj.stigmaPer 
        + inputObj.hyperObj.stigmaPer 
        + inputObj.arkgridObj.stigmaPer) / 100 + 1)).toFixed(2))

    // 아공강
    let atkBuff = (1 
        + ((inputObj.accObj.atkBuff
             + inputObj.elixirObj.atkBuff 
             + inputObj.hyperObj.atkBuff 
             + inputObj.bangleObj.atkBuff 
             + inputObj.gemObj.atkBuff
             + inputObj.arkgridObj.atkBuff) / 100))

    // 최종 공증
    let finalAtkBuff = (totalAtk2 * 0.22 * atkBuff) // 최종 공증

    // 아피강
    let damageBuff = (inputObj.accObj.damageBuff 
        + inputObj.bangleObj.damageBuff 
        + inputObj.gemObj.damageBuff 
        + inputObj.arkgridObj.damageBuff) / 100 + 1 

    // 초각성 피증
    let hyperBuff = (10 
        * ((inputObj.accObj.damageBuff 
        + inputObj.bangleObj.damageBuff) / 100 + 1)) / 100 + 1 // 초각성

    // 특화 딜증
    let statDamageBuff = (fakeSpecial / 20.791) / 100 + 1

    // 진화카르마 버프
    let evolutionBuff = (inputObj.arkObj.evolutionBuff / 100)

    // 케어력
    let carePower = (1 
        + (inputObj.engObj.carePower 
            + inputObj.accObj.carePower 
            + inputObj.elixirObj.carePower 
            + inputObj.bangleObj.carePower
            + (inputObj.arkgridObj.carePower / 100)))

    // 최종 케어력
    let finalCarePower = ((((totalHealth * 0.3) * carePower) / 330000) * 100)

    // 최종 유틸력
    let finalUtilityPower = (inputObj.engObj.utilityPower 
        + inputObj.elixirObj.utilityPower 
        + inputObj.accObj.utilityPower
        + inputObj.arkgridObj.utilityPower) 

    // 상시 버프력
    let allTimeBuff = (finalStigmaPer / 100 + 1) 
    * 1.0965 
    * inputObj.bangleObj.atkBuffPlus
    * inputObj.arkgridObj.atkBuffPlus
    * inputObj.arkgridObj.finalDamageBuff

    // A스킬 지속시간 (천상, 신분, 해그)
    let duration_A = inputObj.supportSkillObj.atkBuffADuration

    // A스킬 쿨감 (천상, 신분, 해그)
    let cd_A = (inputObj.supportSkillObj.atkBuffACool) 
        * (1 - inputObj.defaultObj.haste * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - inputObj.gemObj.atkBuffACdr / 100)
        
    // B스킬 지속 시간 (음진, 천축, 해우물)
    let duration_B = inputObj.supportSkillObj.atkBuffBDuration

    // B스킬 쿨감 (음진, 천축, 해우물)
    let cd_B = (inputObj.supportSkillObj.atkBuffBCool) 
        * (1 - inputObj.defaultObj.haste * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - inputObj.gemObj.atkBuffBCdr / 100)

    // 총 버프 가동률
    let t_buff = duration_A + duration_B;
    let t_cycle = Math.max(duration_A + duration_B, cd_A, cd_B);
    let atkBuffUptime = t_buff / t_cycle;

    // 종합 쿨감
    let cdrPercent = ((1 - ((1 - fakeHaste * 0.0214739 / 100) 
        * (1 - inputObj.etcObj.gemsCoolAvg / 100) 
        * (1 - inputObj.engObj.cdrPercent)
        * (1 - inputObj.arkgridObj.cdrPercent)))
        / (1 + inputObj.bangleObj.skillCool)).toFixed(3) 
    
    // 아덴이 차지 않는 스킬 제외 쿨감
    let cdrPercentNoneCare = ((1 - ((1 - fakeHaste * 0.0214739 / 100) 
        * (1 - inputObj.etcObj.gemCheckFnc.excludedGemAvg / 100) 
        * (1 - inputObj.engObj.cdrPercent)
        * (1 - inputObj.arkgridObj.cdrPercent)))
        / (1 + inputObj.bangleObj.skillCool)).toFixed(3) 
    //console.log("아덴이 차지 않는 스킬 제외 쿨감", cdrPercentNoneCare)

    // Only 케어 스킬 쿨감
    let cdrPercentOnlyCare = ((1 - ((1 - fakeHaste * 0.0214739 / 100) 
        * (1 - inputObj.etcObj.gemCheckFnc.careSkillAvg / 100)
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - inputObj.engObj.cdrPercent))) / (1 + inputObj.bangleObj.skillCool)).toFixed(3)
    //console.log("Only 케어 스킬 쿨감", cdrPercentOnlyCare)
        
    // 각성기 가치
    let awakenIdentity = ((1 / ((1 - inputObj.engObj.awakencdrPercent) 
        * (1 - fakeHaste * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent)
        * (1 - inputObj.arkgridObj.cdrPercent))) - 1)
        * 0.15 + 1;

    // 특화 수급 계수
    let specialIdentity = ((fakeSpecial)/30.2/100+1)

    // 아덴 가동률
    let identityUptime = ((((20.05 
        * ((inputObj.accObj.identityUptime + inputObj.elixirObj.identityUptime + inputObj.arkgridObj.identityUptime) * specialIdentity) * awakenIdentity) 
        / (1 - cdrPercentNoneCare)) / 100)).toFixed(4) //아덴 가동률

    // 초각성 가동률 계산을 위한 쿨감
    let hyperCdrPercent = (1 - ((1 - inputObj.arkObj.cdrPercent) 
        * (1 - inputObj.engObj.cdrPercent)
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - fakeHaste * 0.0214739 / 100))) 
        / (1 + inputObj.bangleObj.skillCool).toFixed(3)

    // 초각성 가동률
    let hyperUptime = ((24.45 / (1 - hyperCdrPercent)) / 100).toFixed(4)

    // 기준딜러 공격력 상승량
    let defaultAtkBuff = ((170000 + finalAtkBuff * atkBuffUptime)) / 170000 

    // 모든 걸 종합한 진짜 상시 버프력 
    let allTimeBuffv2 = defaultAtkBuff 
    * (finalStigmaPer / 100 + 1) 
    * ((1.45 + evolutionBuff) / 1.45) 
    * inputObj.bangleObj.atkBuffPlus
    * inputObj.arkgridObj.atkBuffPlus
    * inputObj.arkgridObj.finalDamageBuff

    // 모든 걸 종합한 진짜 아덴 피증
    let identityBuffv2 = (((13 * enlightBuffResult) 
        * damageBuff 
        * statDamageBuff) / 100 + 1)
        * inputObj.arkgridObj.finalDamageBuff

    // 모든 걸 종합한 진짜 초각 피증
    let hyperBuffv2 = ((10 
        * ((inputObj.accObj.damageBuff + inputObj.bangleObj.damageBuff + inputObj.arkgridObj.damageBuff) / 100 + 1)) 
        / 100 + 1)
        * inputObj.arkgridObj.finalDamageBuff

    // 모든 걸 종합한 진짜 풀 버프력
    let fullBuffv2 = ((allTimeBuffv2 * identityBuffv2 * hyperBuffv2) - 1) * 100 * inputObj.arkgridObj.finalDamageBuff

    // 가동률 기반 평균 아덴 딜증
    let avgIdentityBuff = (((allTimeBuffv2 * identityBuffv2) - allTimeBuffv2) * 100) * identityUptime

    // 가동률 기반 평균 초각 딜증
    let avgHyperBuff = (((allTimeBuffv2 * hyperBuffv2) - allTimeBuffv2) * 100) * hyperUptime

    // 가동률 기반 종합 버프력
    let totalAvgBuff = ((allTimeBuffv2 - 1) * 100) + avgIdentityBuff + avgHyperBuff

    // 풀버프 가동률
    let doubleBuffUptime = identityUptime * hyperUptime

    // 아덴 가동률
    let onlyIdentityUptime = identityUptime * (1 - hyperUptime)

    // 초각 가동률
    let onlyHyperUptime = hyperUptime * (1 - identityUptime)

    // 버프 가동률
    let noBuffUptime = (1 - identityUptime) * (1 - hyperUptime)

    // 모든 걸 종합한 진짜 풀버프력
    let doubleBuffPower = (allTimeBuff / inputObj.arkgridObj.finalDamageBuff)
    * (identityBuffv2 / inputObj.arkgridObj.finalDamageBuff)
    * (hyperBuffv2 / inputObj.arkgridObj.finalDamageBuff)
    * inputObj.defaultObj.estherSupport
    * inputObj.arkgridObj.finalDamageBuff

    // 아덴 버프력
    let onlyIdentityPower = (allTimeBuff / inputObj.arkgridObj.finalDamageBuff) 
    * (identityBuffv2 / inputObj.arkgridObj.finalDamageBuff)
    * inputObj.arkgridObj.finalDamageBuff

    // 초각 버프력
    let onlyHyperPower = (allTimeBuff / inputObj.arkgridObj.finalDamageBuff)
    * (hyperBuffv2 / inputObj.arkgridObj.finalDamageBuff)
    * inputObj.arkgridObj.finalDamageBuff
  
    // 노버프 파워
    let noBuffPower = allTimeBuff

    // 버프 가동률 기반 평균 버프력
    let avgBuffPower = ((doubleBuffUptime * doubleBuffPower) 
    + (onlyIdentityUptime * onlyIdentityPower) 
    + (onlyHyperUptime * onlyHyperPower) 
    + (noBuffUptime * noBuffPower)) 
    * defaultAtkBuff





    // 서폿 계수
    let supportBuffPower = avgBuffPower * inputObj.arkObj.leapBuff//** 4.185) * 29.5
    let supportCarePower = (((finalCarePower / ((1 - cdrPercentOnlyCare)))) / 100 + 1)
    let supportUtilityPower = finalUtilityPower / 100 + 1

    let supportCombinedPower = (supportBuffPower ** 0.935) * (supportCarePower ** 0.035) * (supportUtilityPower ** 0.03)
    //let supportSpecPoint = (supportCombinedPower ** 4.29) * 33.4


    /* **********************************************************************************************************************
     * name		              :	  서폿 계산식 "실제용"
     * version                :   2.0
     * description            :   표시되는 정보가 아닌, 특/신 밸류를 동일하게 잡기 위한 계산식
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    // 특화를 1200으로 억제하기 위한 장치
    let finalSpecial = Math.min(inputObj.defaultObj.statusSpecial + inputObj.bangleObj.special, 1200)

    // 특화와 신속을 합친 뒤, 75%는 신속에 배분, 25%는 특화에 배분
    let calcHaste = (inputObj.defaultObj.statusHaste + inputObj.bangleObj.haste + finalSpecial) * 0.75
    let calcSpecial = (inputObj.defaultObj.statusHaste + inputObj.bangleObj.haste + finalSpecial) * 0.25

    // 특화 딜증
    let calcStatDamageBuff = (calcSpecial / 20.791) / 100 + 1 

    // A스킬 지속시간 (천상, 신분, 해그)
    let calcduration_A = inputObj.supportSkillObj.atkBuffADuration 

    // A스킬 쿨감 (천상, 신분, 해그)
    let calccd_A = (inputObj.supportSkillObj.atkBuffACool) 
        * (1 - calcHaste * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - inputObj.gemObj.atkBuffACdr / 100) 

    // B스킬 지속 시간 (음진, 천축, 해우물)
    let calcduration_B = inputObj.supportSkillObj.atkBuffBDuration 

    // B스킬 쿨감 (음진, 천축, 해우물물)
    let calccd_B = (inputObj.supportSkillObj.atkBuffBCool) 
        * (1 - calcHaste * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - inputObj.gemObj.atkBuffBCdr / 100) 

    // 총 버프 가동률
    let calct_buff = calcduration_A + calcduration_B;
    let calct_cycle = Math.max(calcduration_A + calcduration_B, calccd_A, calccd_B);
    let calcAtkBuffUptime = calct_buff / calct_cycle;


    // 종합 쿨감
    let calcCdrPercent = ((1 - ((1 - calcHaste * 0.0214739 / 100) 
        * (1 - inputObj.etcObj.gemsCoolAvg / 100) 
        * (1 - inputObj.engObj.cdrPercent)
        * (1 - inputObj.arkgridObj.cdrPercent)))
        / (1 + inputObj.bangleObj.skillCool)).toFixed(3)
    
    
    // 아덴이 차지 않는 스킬 제외 쿨감감
    let calcCdrPercentNoneCare = ((1 - ((1 - calcHaste * 0.0214739 / 100) 
        * (1 - inputObj.etcObj.gemCheckFnc.excludedGemAvg / 100) 
        * (1 - inputObj.engObj.cdrPercent)
        * (1 - inputObj.arkgridObj.cdrPercent)))
        / (1 + inputObj.bangleObj.skillCool)).toFixed(3)

    // Only 케어 스킬 쿨감
    let calcCdrPercentOnlyCare = ((1 - ((1 - calcHaste * 0.0214739 / 100) 
        * (1 - inputObj.etcObj.gemCheckFnc.careSkillAvg / 100) 
        * (1 - inputObj.engObj.cdrPercent))) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        / (1 + inputObj.bangleObj.skillCool)).toFixed(3)

    // 각성기 가치
    let calcAwakenIdentity = ((1 / ((1 - inputObj.engObj.awakencdrPercent) 
        * (1 - calcHaste * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent)))
        * coolDownValue - 1) 
        * 0.15 + 1; //각성기 가치

    // 특화 수급 계수
    let calcSpecialIdentity = ((calcSpecial)/30.2/100+1) 

    // 아덴 가동률
    let calcIdentityUptime = ((((20.05 
        * ((inputObj.accObj.identityUptime + inputObj.elixirObj.identityUptime + inputObj.arkgridObj.identityUptime) * calcSpecialIdentity) * calcAwakenIdentity) 
        / (1 - calcCdrPercentNoneCare)) / 100)).toFixed(4)

    // 초각성 가동률 계산을 위한 쿨감
    let calcHyperCdrPercent = (1 - ((1 - inputObj.arkObj.cdrPercent) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - calcHaste * 0.0214739 / 100))) 
        / (1 + inputObj.bangleObj.skillCool).toFixed(3)

    // 초각성 가동률
    let calcHyperUptime = ((24.45 / (1 - calcHyperCdrPercent)) / 100).toFixed(4)

    // 기준딜러 공격력 상승량
    let calcDefaultAtkBuff = ((120000 + finalAtkBuff * calcAtkBuffUptime)) / 120000 

    // 모든 걸 종합한 진짜 상시 버프력
    let calcAllTimeBuffv2 = calcDefaultAtkBuff 
    * (finalStigmaPer / 100 + 1) 
    * ((1.45 + evolutionBuff) / 1.45) 
    * inputObj.bangleObj.atkBuffPlus
    * inputObj.arkgridObj.atkBuffPlus
    * inputObj.arkgridObj.finalDamageBuff
    
    // 모든 걸 종합한 진짜 아덴 피증
    let calcIdentityBuffv2 = ((13 * enlightBuffResult) 
        * damageBuff 
        * calcStatDamageBuff) / 100 + 1 // 아덴 피증
        * inputObj.arkgridObj.finalDamageBuff
    
    // 모든 걸 종합한 진짜 초각 피증
    let calcHyperBuffv2 = (10 
        * ((inputObj.accObj.damageBuff + inputObj.bangleObj.damageBuff + inputObj.arkgridObj.damageBuff) / 100 + 1)) 
        / 100 + 1 // 초각 피증
        * inputObj.arkgridObj.finalDamageBuff

    // 모든 걸 종합한 진짜 풀 버프력
    let calcFullBuffv2 = ((calcAllTimeBuffv2 * calcIdentityBuffv2 * calcHyperBuffv2) - 1) * 100 * inputObj.arkgridObj.finalDamageBuff
    
    // 가동률 기반 평균 아덴 딜증
    let calcAvgIdentityBuff = (((calcAllTimeBuffv2 * calcIdentityBuffv2) - calcAllTimeBuffv2) * 100) * calcIdentityUptime

    // 가동률 기반 평균 초각 딜증
    let calcAvgHyperBuff = (((calcAllTimeBuffv2 * calcHyperBuffv2) - calcAllTimeBuffv2) * 100) * calcHyperUptime

    // 가동률 기반 종합 버프력
    let calcTotalAvgBuff = ((calcAllTimeBuffv2 - 1) * 100) + calcAvgIdentityBuff + calcAvgHyperBuff

    // 풀버프 가동률
    let calcDoubleBuffUptime = calcIdentityUptime * calcHyperUptime

    // 아덴 가동률
    let calcOnlyIdentityUptime = calcIdentityUptime * (1 - calcHyperUptime)

    // 초각 가동률
    let calcOnlyHyperUptime = calcHyperUptime * (1 - calcIdentityUptime)

    // 버프 가동률 
    let calcNoBuffUptime = (1 - calcIdentityUptime) * (1 - calcHyperUptime)

    // 모든 걸 종합한 진짜 풀 버프력
    let calcDoubleBuffPower = (allTimeBuff / inputObj.arkgridObj.finalDamageBuff)
     * (calcIdentityBuffv2 / inputObj.arkgridObj.finalDamageBuff)
     * (calcHyperBuffv2 / inputObj.arkgridObj.finalDamageBuff)
     * inputObj.defaultObj.estherSupport
     * inputObj.arkgridObj.finalDamageBuff

    // 아덴 버프력
    let calcOnlyIdentityPower = (allTimeBuff / inputObj.arkgridObj.finalDamageBuff)
    * (calcIdentityBuffv2 / inputObj.arkgridObj.finalDamageBuff)
    * inputObj.arkgridObj.finalDamageBuff

    // 초각 버프력
    let calcOnlyHyperPower = (allTimeBuff / inputObj.arkgridObj.finalDamageBuff)
    * (calcHyperBuffv2 / inputObj.arkgridObj.finalDamageBuff)
    * inputObj.arkgridObj.finalDamageBuff
    
    let calcNoBuffPower = allTimeBuff
    

    let calcAvgBuffPower = ((calcDoubleBuffUptime * calcDoubleBuffPower) + (calcOnlyIdentityUptime * calcOnlyIdentityPower) + (calcOnlyHyperUptime * calcOnlyHyperPower) + (calcNoBuffUptime * calcNoBuffPower)) * calcDefaultAtkBuff
    let calcSupportBuffPower = calcAvgBuffPower * inputObj.arkObj.leapBuff//** 4.185) * 29.5
    let calcSupportCarePower = (((finalCarePower / ((1 - calcCdrPercentOnlyCare)))) / 100 + 1)
    let calcSupportUtilityPower = finalUtilityPower / 100 + 1

    let calcSupportCombinedPower = (calcSupportBuffPower ** 0.935) * (calcSupportCarePower ** 0.035) * (calcSupportUtilityPower ** 0.03)
    let supportSpecPoint = ((calcSupportCombinedPower ** 4.268) * 69.127) * inputObj.arkgridObj.coreValue


    /* **********************************************************************************************************************
     * name		              :	  서폿 팔찌 효율 계산식
     * version                :   2.0
     * description            :   서폿 팔찌 효율 계산을 위한 변수 및 계산식 작성
     * USE_TN                 :   사용
     *********************************************************************************************************************** */

    let totalHealth_MinusBangle = Number(((
        inputObj.etcObj.healthStatus - inputObj.bangleObj.health
        + inputObj.hyperObj.statHp 
        + inputObj.elixirObj.statHp 
        + inputObj.accObj.statHp
        + inputObj.arkObj.statHp 
        + inputObj.arkgridObj.statHP) 
        * inputObj.defaultObj.hpActive * 1.07).toFixed(0));

    let finalSpecial_MinusBangle = Math.min(inputObj.defaultObj.statusSpecial, 1200)
    let calcHaste_MinusBangle = (inputObj.defaultObj.statusHaste + finalSpecial_MinusBangle) * 0.75
    let calcSpecial_MinusBangle = (inputObj.defaultObj.statusHaste + finalSpecial_MinusBangle) * 0.25

    let totalAtk3 = ((minusBangleStat * minusBangleWeaponAtk / 6) ** 0.5) * attackBonus //팔찌 제외 기본 공격력

    // 팔찌 제외 아공강
    let atkBuff_MinusBangle = (1 
        + ((inputObj.accObj.atkBuff
             + inputObj.elixirObj.atkBuff 
             + inputObj.hyperObj.atkBuff 
             + inputObj.gemObj.atkBuff 
             + inputObj.arkgridObj.atkBuff) / 100))

    //  팔찌 제외 최종 공증
    let finalAtkBuff_MinusBangle = (totalAtk3 * 0.22 * atkBuff_MinusBangle)

     // 팔찌 제외 아피강
    let damageBuff_MinusBangle = (inputObj.accObj.damageBuff 
        + inputObj.gemObj.damageBuff 
        + inputObj.arkgridObj.damageBuff) / 100 + 1
    
    // 팔찌 제외 초각 밸류
    let hyperBuff_MinusBangle = (10 
        * ((inputObj.accObj.damageBuff 
        + inputObj.arkgridObj.damageBuff) / 100 + 1)) / 100 + 1 // 초각성
    
    // 팔찌 제외 특화 딜증
    let statDamageBuff_MinusBangle = ((calcSpecial_MinusBangle) / 20.791) / 100 + 1 // 팔찌 제외 특화 딜증
    let finalDamageBuff_MinusBangle = ((13 * enlightBuffResult) * damageBuff_MinusBangle * statDamageBuff_MinusBangle) / 100 + 1 // 팔찌 제외 최종 피증
    
    // 팔찌 제외 케어력
    let carePower_MinusBangle = (1 
        + (inputObj.engObj.carePower 
            + inputObj.accObj.carePower 
            + inputObj.elixirObj.carePower 
            + (inputObj.arkgridObj.carePower / 100))) // 케어력

    // 팔찌 제외 최종 캐어력
    let finalCarePower_MinusBangle = (((totalHealth_MinusBangle * 0.3) * carePower_MinusBangle) / 330000) * 100
    
    // 팔찌 제외 상시 피증
    let allTimeBuff_MinusBangle = (finalStigmaPer / 100 + 1) 
    * 1.0965 
    * inputObj.arkgridObj.atkBuffPlus 
    * inputObj.arkgridObj.finalDamageBuff

    // 팔찌 제외 스킬A 지속시간 (천상, 신분, 해그)
    let duration_A_MinusBangle = inputObj.supportSkillObj.atkBuffADuration

    // 팔찌 제외 스킬A 쿨감
    let cd_A_MinusBangle = (inputObj.supportSkillObj.atkBuffACool) 
        * (1 - (calcHaste_MinusBangle) * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - inputObj.gemObj.atkBuffACdr / 100)

    // 팔찌 제외 스킬B 지속시간 (음진, 천축, 해우물)
    let duration_B_MinusBangle = inputObj.supportSkillObj.atkBuffBDuration 

    // 팔찌 제외 스킬B 쿨감
    let cd_B_MinusBangle = (inputObj.supportSkillObj.atkBuffBCool) 
        * (1 - (calcHaste_MinusBangle) * 0.0214739 / 100) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - inputObj.gemObj.atkBuffBCdr / 100)

    // 팔찌 제외 스킬 가동률
    let t_buff_MinusBangle = duration_A_MinusBangle + duration_B_MinusBangle;
    let t_cycle_MinusBangle = Math.max(duration_A_MinusBangle + duration_B_MinusBangle, cd_A_MinusBangle, cd_B_MinusBangle);
    let atkBuffUptime_MinusBangle = t_buff_MinusBangle / t_cycle_MinusBangle;

    // 팔찌 제외 쿨감
    let cdrPercentNoneCare_MinusBangle = ((1 - ((1 - calcHaste_MinusBangle * 0.0214739 / 100) 
    * (1 - inputObj.etcObj.gemCheckFnc.excludedGemAvg / 100) 
    * (1 - inputObj.engObj.cdrPercent)
    * (1 - inputObj.arkgridObj.cdrPercent)))).toFixed(3)
    
    // 노아덴 스킬 제외 쿨감
    let cdrPercentOnlyCare_MinusBangle = ((1 - ((1 - calcHaste_MinusBangle * 0.0214739 / 100) 
    * (1 - inputObj.etcObj.gemCheckFnc.careSkillAvg / 100) 
    * (1 - inputObj.engObj.cdrPercent)
    * (1 - inputObj.arkgridObj.cdrPercent)))).toFixed(3)
    
    // 팔찌 제외 아덴 가동률
    let awakenIdentity_MinusBangle = ((1 / ((1 - inputObj.engObj.awakencdrPercent) 
    * (1 - calcHaste_MinusBangle * 0.0214739 / 100) 
    * (1 - inputObj.engObj.cdrPercent)))
    * coolDownValue - 1) 
    * 0.15 + 1; //각성기 가치

    // 팔찌 제외 특화 딜증
    let specialIdentity_MinusBangle = ((calcSpecial_MinusBangle) / 30.2 / 100 + 1)

    // 팔찌 제외 아덴 가동률
    let identityUptime_MinusBangle = (((20.05 
        * ((inputObj.accObj.identityUptime + inputObj.elixirObj.identityUptime + inputObj.arkgridObj.identityUptime) * specialIdentity_MinusBangle) * awakenIdentity_MinusBangle)
         / (1 - cdrPercentNoneCare_MinusBangle)) / 100).toFixed(4)

    // 초각성 가동률 계산을 위한 쿨감
    let hyperCdrPercent_MinusBangle = (1 - ((1 - inputObj.arkObj.cdrPercent) 
        * (1 - inputObj.engObj.cdrPercent) 
        * (1 - inputObj.arkgridObj.cdrPercent)
        * (1 - (calcHaste_MinusBangle) * 0.0214739 / 100))).toFixed(3) 

    // 초각성 가동률
    let hyperUptime_MinusBangle = ((24.45 / (1 - hyperCdrPercent_MinusBangle)) / 100).toFixed(4)

    //기준딜러 공증 상승량
    let defaultAtkBuff_MinusBangle = ((120000 + finalAtkBuff_MinusBangle * atkBuffUptime_MinusBangle)) / 120000

    //상시 버프력
    let allTimeBuffv2_MinusBangle = defaultAtkBuff_MinusBangle 
        * (finalStigmaPer / 100 + 1) 
        * ((1.45 + evolutionBuff) / 1.45)
        * inputObj.arkgridObj.atkBuffPlus
        * inputObj.arkgridObj.finalDamageBuff
        
    // 아덴 피증
    let identityBuffv2_MinusBangle = ((13 * enlightBuffResult) 
        * damageBuff_MinusBangle
        * statDamageBuff_MinusBangle) / 100 + 1
        * inputObj.arkgridObj.finalDamageBuff
    
    // 초각 피증
    let hyperBuffv2_MinusBangle = (10 
        * ((inputObj.accObj.damageBuff + inputObj.arkgridObj.damageBuff) / 100 + 1)) 
        / 100 + 1 // 초각 피증
        * inputObj.arkgridObj.finalDamageBuff
    
    let fullBuffv2_MinusBangle = ((allTimeBuffv2_MinusBangle * identityBuffv2_MinusBangle * hyperBuffv2_MinusBangle) - 1) * 100 // 풀버프력

    // 가동률 기반 평균 아덴 딜증
    let avgIdentityBuff_MinusBangle = (((allTimeBuffv2_MinusBangle * identityBuffv2_MinusBangle) - allTimeBuffv2_MinusBangle) * 100) * identityUptime_MinusBangle 
    let avgHyperBuff_MinusBangle = (((allTimeBuffv2_MinusBangle * hyperBuffv2_MinusBangle) - allTimeBuffv2_MinusBangle) * 100) * hyperUptime_MinusBangle // 가동률 기반 평균 초각 딜증
    let totalAvgBuff_MinusBangle = ((allTimeBuffv2_MinusBangle - 1) * 100) + avgIdentityBuff_MinusBangle + avgHyperBuff_MinusBangle // 가동률 기반 종합 버프력

    // 풀버프 가동률
    let doubleBuffUptime_MinusBangle = identityUptime_MinusBangle * hyperUptime_MinusBangle 

    //아덴 가동률
    let onlyIdentityUptime_MinusBangle = identityUptime_MinusBangle * (1 - hyperUptime_MinusBangle)

    //초각 가동률
    let onlyHyperUptime_MinusBangle = hyperUptime_MinusBangle * (1 - identityUptime_MinusBangle)

    //버프 가동률
    let noBuffUptime_MinusBangle = (1 - identityUptime_MinusBangle) * (1 - hyperUptime_MinusBangle)

    // 최종 풀 버프력
    let doubleBuffPower_MinusBangle = (allTimeBuff_MinusBangle / inputObj.arkgridObj.finalDamageBuff) 
        * (identityBuffv2_MinusBangle / inputObj.arkgridObj.finalDamageBuff) 
        * (hyperBuffv2_MinusBangle / inputObj.arkgridObj.finalDamageBuff)
        * inputObj.defaultObj.estherSupport
        * inputObj.arkgridObj.finalDamageBuff
    
    // 최종 아덴 버프력력
    let onlyIdentityPower_MinusBangle = (allTimeBuff_MinusBangle / inputObj.arkgridObj.finalDamageBuff) 
        * (identityBuffv2_MinusBangle / inputObj.arkgridObj.finalDamageBuff)
        * inputObj.arkgridObj.finalDamageBuff
    
    // 최종 초각 버프력
    let onlyHyperPower_MinusBangle = (allTimeBuff_MinusBangle / inputObj.arkgridObj.finalDamageBuff) 
        * (hyperBuffv2_MinusBangle / inputObj.arkgridObj.finalDamageBuff)
        * inputObj.arkgridObj.finalDamageBuff

    let noBuffPower_MinusBangle = allTimeBuff_MinusBangle

    let avgBuffPower_MinusBangle = ((doubleBuffUptime_MinusBangle * doubleBuffPower_MinusBangle) + (onlyIdentityUptime_MinusBangle * onlyIdentityPower_MinusBangle) + (onlyHyperUptime_MinusBangle * onlyHyperPower_MinusBangle) + (noBuffUptime_MinusBangle * noBuffPower_MinusBangle)) * defaultAtkBuff_MinusBangle
    let supportBuffPower_MinusBangle = avgBuffPower_MinusBangle * inputObj.arkObj.leapBuff //** 4.185) * 29.5
    let supportCarePower_MinusBangle = (((finalCarePower_MinusBangle / ((1 - cdrPercentOnlyCare_MinusBangle)))) / 100 + 1)

    let supportCombinedPower_MinusBangle= (supportBuffPower_MinusBangle ** 0.935) * (supportCarePower_MinusBangle ** 0.035) * (calcSupportUtilityPower ** 0.03)
    let supportSpecPoint_MinusBangle = ((supportCombinedPower_MinusBangle ** 4.268) * 69.127) * inputObj.arkgridObj.coreValue
    let supportBangleValue = Math.max(((supportSpecPoint - supportSpecPoint_MinusBangle) / supportSpecPoint_MinusBangle * 100) / 1.52, 0)
    if (supportBangleValue < 0.02){
        supportBangleValue = 0
    }
    


    /* **********************************************************************************************************************
     * name		              :	  스펙포인트 값 저장
     * version                :   2.0
     * description            :   db저장 및 외부 반환을 위한 값 저장
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    function tierName() {
        let nextTierValue = 0;
        let nowTierValue = 0;
        let tierIndex = 0;
        let tierNameArray = ['브론즈', '실버', '골드', '다이아몬드', '마스터', '그랜드마스터','에스더'];
        let tierNameEngArray = ['bronze', 'silver', 'gold', 'diamond', 'master', 'grandmaster','esther'];
        if (inputObj.etcObj.supportCheck !== "서폿") {
            if ((lastFinalValue / 2020) >= 4600) {
                nextTierValue = 0;
                nowTierValue = 0;
                tierIndex = 6;
            } else if ((lastFinalValue / 2020) >= 4000) {
                nextTierValue = 4600;
                nowTierValue = 4000;
                tierIndex = 5;
            } else if ((lastFinalValue / 2020) >= 3300) {
                nextTierValue = 4000;
                nowTierValue = 3300;
                tierIndex = 4;
            } else if ((lastFinalValue / 2020) >= 2500) {
                nextTierValue = 3300;
                nowTierValue = 2500;
                tierIndex = 3;
            } else if ((lastFinalValue / 2020) >= 2000) {
                nextTierValue = 2500;
                nowTierValue = 2000;
                tierIndex = 2;
            } else if ((lastFinalValue / 2020) >= 1400) {
                nextTierValue = 2000;
                nowTierValue = 1400;
                tierIndex = 1;
            } else if ((lastFinalValue / 2020) < 1400) {
                nextTierValue = 1400;
                nowTierValue = 1;
                tierIndex = 0;
            }


        } else {
            if (supportSpecPoint >= 4600) {
                nextTierValue = 0;
                nowTierValue = 0;
                tierIndex = 6;
            } else if (supportSpecPoint >= 4000) {
                nextTierValue = 4600;
                nowTierValue = 4000;
                tierIndex = 5;
            } else if (supportSpecPoint >= 3300) {
                nextTierValue = 4000;
                nowTierValue = 3300;
                tierIndex = 4;
            } else if (supportSpecPoint >= 2500) {
                nextTierValue = 3300;
                nowTierValue = 2500;
                tierIndex = 3;
            } else if (supportSpecPoint >= 2000) {
                nextTierValue = 2500;
                nowTierValue = 2000;
                tierIndex = 2;
            } else if (supportSpecPoint >= 1400) {
                nextTierValue = 2000;
                nowTierValue = 1400;
                tierIndex = 1;
            } else if (supportSpecPoint < 1400) {
                nextTierValue = 1400;
                nowTierValue = 1;
                tierIndex = 0;
            }
        }
        let result = {
            tierNameEng: tierNameEngArray[tierIndex],
            tierNameKor: tierNameArray[tierIndex],
            nextTierNameEng: tierNameEngArray[tierIndex + 1],
            nextTierNameKor: tierNameArray[tierIndex + 1],
            nextTierValue: nextTierValue,
            nowTierValue: nowTierValue
        };
        return result;
    }

    /* **********************************************************************************************************************
     * name		              :	  스펙포인트 값 저장
     * version                :   2.0
     * description            :   db저장 및 외부 반환을 위한 값 저장
     * USE_TN                 :   사용
     *********************************************************************************************************************** */
    // 딜러
    highTierSpecPointObj.dealerAttackPowResult = totalAtk
    highTierSpecPointObj.dealerEngResult = (inputObj.engObj.finalDamagePer * 100 - 100)
    highTierSpecPointObj.dealerEvloutionResult = ((evolutionDamageResult - 1) * 100)
    highTierSpecPointObj.dealerEnlightResult = ((enlightResult - 1) * 100)
    highTierSpecPointObj.dealerLeapResult = ((inputObj.arkObj.leapDamage - 1) * 100)
    highTierSpecPointObj.dealerBangleResult = bangleValue
    highTierSpecPointObj.dealerExlixirValue = elixirValue
    highTierSpecPointObj.dealerHyperValue = hyperValue
    highTierSpecPointObj.dealerAccValue = accValue
    // 서폿
    highTierSpecPointObj.supportFinalAtkBuff = finalAtkBuff;
    highTierSpecPointObj.supportAvgBuffPower = (avgBuffPower - 1) * 100;
    highTierSpecPointObj.supportStigmaResult = finalStigmaPer;
    highTierSpecPointObj.supportAllTimeBuff = (allTimeBuffv2 - 1) * 100;
    highTierSpecPointObj.supportFullBuff = fullBuffv2;
    highTierSpecPointObj.supportTotalAvgBuff = totalAvgBuff;
    highTierSpecPointObj.supportIdentityUptime = identityUptime * 100;
    highTierSpecPointObj.supportHyperUptime = hyperUptime * 100;
    highTierSpecPointObj.supportFullBuffUptime = identityUptime * hyperUptime * 100;
    highTierSpecPointObj.supportBangleResult = supportBangleValue;
    highTierSpecPointObj.supportCarePowerResult = (supportCarePower-1)*100*0.5;
    highTierSpecPointObj.supportUtilityPower = finalUtilityPower
    highTierSpecPointObj.supportTotalStatus = (inputObj.defaultObj.haste + inputObj.defaultObj.special);
    highTierSpecPointObj.supportgemsCoolAvg = (cdrPercent * 100);
    // 최종 스펙 포인트
    //highTierSpecPointObj.dealerlastFinalValue = (lastFinalValue / 202000).toFixed(2) //딜러 스펙포인트
    //highTierSpecPointObj.supportSpecPoint = (supportSpecPoint / 100).toFixed(2) //서폿 스펙포인트
    //highTierSpecPointObj.supportSpecPoint = (supportSpecPoint).toFixed(2) //서폿 스펙포인트
    // 스펙포인트 db저장 통합
    if (!(inputObj.etcObj.supportCheck == "서폿")) {   // 딜러
        //highTierSpecPointObj.completeSpecPoint = lastFinalValue / 2020
        highTierSpecPointObj.completeSpecPoint = lastFinalValue / 2020
    } else if (inputObj.etcObj.supportCheck == "서폿") {
        //highTierSpecPointObj.completeSpecPoint = supportSpecPoint
        highTierSpecPointObj.completeSpecPoint = supportSpecPoint
    }
    highTierSpecPointObj.supportSpecPoint = isNaN(highTierSpecPointObj.supportSpecPoint) ? 0 : highTierSpecPointObj.supportSpecPoint;

    highTierSpecPointObj.tierInfoObj = tierName();

    //console.log(highTierSpecPointObj.completeSpecPoint)
    return highTierSpecPointObj
}