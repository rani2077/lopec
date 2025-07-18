/* **********************************************************************************************************************
 * function name		:	officialCombatCalculator(combatObj, extractObj)
 * description			: 	시뮬레이터 전투력 obj와 오리진 obj를 사용하여 인겜 전투력을 계산해냄
 *********************************************************************************************************************** */

let cacheCollectStat = null;
export async function officialCombatCalculator(combatObj, extractObj) {
    //console.log("공식전투력", combatObj);
    //console.log("오리진obj", extractObj);

    let originCombat = extractObj.defaultObj.combatPower; // 인게임 전투력
    let baseAttackBonus = (extractObj.etcObj.gemAttackBonus + extractObj.etcObj.abilityAttackBonus) / 100 + 1;
    let weaponAtk = ((extractObj.defaultObj.weaponAtk +
        extractObj.hyperObj.weaponAtkPlus +
        extractObj.elixirObj.weaponAtkPlus +
        extractObj.accObj.weaponAtkPlus +
        extractObj.bangleObj.weaponAtkPlus) *
        (extractObj.arkObj.weaponAtkPer + (extractObj.accObj.weaponAtkPer / 100)))
    let originBasePoint = originCombat /
        1.0077 /
        combatObj.weaponQuality /
        combatObj.stats /
        combatObj.level /
        combatObj.karma /
        combatObj.hyper /
        combatObj.gem /
        combatObj.esther /
        combatObj.engraving /
        combatObj.elixir /
        combatObj.card /
        combatObj.bangle /
        combatObj.ark /
        combatObj.accessory;
    //console.log("원래 베이스 포인트", originBasePoint);
    let originAtk = Math.floor(originBasePoint * 1000000 / 288);
    let originTotalStat = (((originAtk / baseAttackBonus) ** 2) * 6) / weaponAtk;
    let calcBaseStat = ((extractObj.etcObj.armorStatus +
        extractObj.etcObj.expeditionStats +
        extractObj.hyperObj.str +
        extractObj.elixirObj.str +
        extractObj.elixirObj.dex +
        extractObj.elixirObj.int +
        extractObj.bangleObj.str +
        extractObj.bangleObj.dex +
        extractObj.bangleObj.int) *
        extractObj.etcObj.avatarStats);

    if (!cacheCollectStat) {
        cacheCollectStat = originTotalStat - calcBaseStat
    }
    //console.log("실제 스탯", originTotalStat);
    //console.log("계산 스탯1", calcBaseStat)
    //console.log("계산 스탯2", calcBaseStat + cacheCollectStat);

    let calcTotalStat = calcBaseStat + cacheCollectStat
    let calcBasePoint = (((calcTotalStat * weaponAtk / 6) ** 0.5) * baseAttackBonus) * 288 / 1000000
    let calcCombat = calcBasePoint *
        combatObj.accessory *
        combatObj.ark *
        combatObj.bangle *
        combatObj.card *
        combatObj.elixir *
        combatObj.engraving *
        combatObj.esther *
        combatObj.gem *
        combatObj.hyper *
        combatObj.karma *
        combatObj.level *
        combatObj.stats *
        combatObj.weaponQuality *
        1.0077;

    //console.log("인게임 전투력", originCombat)
    //console.log("계산 전투력", calcCombat)
    let result = Math.ceil(calcCombat * 100) / 100;
    return result;
};