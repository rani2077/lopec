/* **********************************************************************************************************************
 * function name		:	officialCombatCalculator(combatObj, extractObj)
 * description			: 	시뮬레이터 전투력 obj와 오리진 obj를 사용하여 인겜 전투력을 계산해냄
 *********************************************************************************************************************** */

let cacheCollectStat = null;
let cacheCollectStatSupport = null;
let cacheCollectHealthSupport = null;

export async function officialCombatCalculator(combatObj, extractObj) {
    //console.log("공식전투력", combatObj);
    //console.log("오리진obj", extractObj);

    let originCombat = extractObj.defaultObj.combatPower; // 인게임 전투력

    let baseAttackBonus = (extractObj.etcObj.gemAttackBonus + extractObj.etcObj.abilityAttackBonus) / 100 + 1;

    let weaponAtk = ((extractObj.defaultObj.weaponAtk +
        extractObj.hyperObj.weaponAtkPlus +
        extractObj.elixirObj.weaponAtkPlus +
        extractObj.accObj.weaponAtkPlus +
        extractObj.arkgridObj.weaponAtkPlus +
        extractObj.bangleObj.weaponAtkPlus) *
        (extractObj.arkObj.weaponAtkPer + (extractObj.accObj.weaponAtkPer / 100) + (extractObj.arkgridObj.weaponAtkPer / 100)))

        
    let originBasePoint = originCombat /
        1.0077 /
        combatObj.dealer.arkgridGem /
        combatObj.dealer.arkgridCore /
        combatObj.dealer.weaponQuality /
        combatObj.dealer.stats /
        combatObj.dealer.level /
        combatObj.dealer.karma /
        combatObj.dealer.hyper /
        combatObj.dealer.gem /
        combatObj.dealer.esther /
        combatObj.dealer.engraving /
        combatObj.dealer.elixir /
        combatObj.dealer.card /
        combatObj.dealer.bangle /
        combatObj.dealer.ark /
        combatObj.dealer.accessory;

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
        combatObj.dealer.accessory *
        combatObj.dealer.ark *
        combatObj.dealer.bangle *
        combatObj.dealer.card *
        combatObj.dealer.elixir *
        combatObj.dealer.engraving *
        combatObj.dealer.esther *
        combatObj.dealer.gem *
        combatObj.dealer.hyper *
        combatObj.dealer.karma *
        combatObj.dealer.level *
        combatObj.dealer.stats *
        combatObj.dealer.weaponQuality *
        combatObj.dealer.arkgridGem *
        combatObj.dealer.arkgridCore *
        1.0077;

    //console.log("인게임 전투력", originCombat)
    //console.log("계산 전투력", Math.ceil(calcCombat * 100) / 100)

/* **********************************************************************************************************************
 * function name		:	서폿 계산식
 * description			: 	시뮬레이터 전투력 obj와 오리진 obj를 사용하여 인겜 전투력을 계산해냄
 *********************************************************************************************************************** */

    let originHealth = extractObj.defaultObj.maxHp
    let calcHealth = Number(((extractObj.etcObj.RealHealthStauts + 
        extractObj.hyperObj.statHp + 
        extractObj.elixirObj.statHp +
         extractObj.bangleObj.statHp + 
         extractObj.accObj.statHp + 
         extractObj.arkObj.statHp +
         extractObj.arkgridObj.statHP) * 
         extractObj.defaultObj.hpActive * 1.07).toFixed(0));

    if (!cacheCollectHealthSupport) {
        cacheCollectHealthSupport = originHealth - calcHealth
    }

    let calcTotalHealth = calcHealth + cacheCollectHealthSupport

    let calcCareCombat = calcTotalHealth  * 12 / 10000 *
    combatObj.sup_defense.accessory *
    combatObj.sup_defense.bangle *
    combatObj.sup_defense.elixir *
    combatObj.sup_defense.engraving *
    combatObj.sup_defense.arkgridCore

    let originAttackCombat = extractObj.defaultObj.combatPower - calcCareCombat
    //console.log("originAttackCombat", originAttackCombat)

    let originBaseAttack = originAttackCombat /
    combatObj.sup_attack.accessory /
    combatObj.sup_attack.ark /
    combatObj.sup_attack.bangle /
    combatObj.sup_attack.card /
    combatObj.sup_attack.elixir /
    combatObj.sup_attack.engraving /
    combatObj.sup_attack.esther /
    combatObj.sup_attack.gem /
    combatObj.sup_attack.hyper /
    combatObj.sup_attack.karma /
    combatObj.sup_attack.level /
    combatObj.sup_attack.stats /
    combatObj.sup_attack.arkgridCore /
    combatObj.sup_attack.arkgridGem

    let originAtkSupport = Math.floor(originBaseAttack * 1000000 / 124);
    let originTotalStatSupport = (((originAtkSupport / baseAttackBonus) ** 2) * 6) / weaponAtk;
    let calcBaseStatSupport = ((extractObj.etcObj.armorStatus +
        extractObj.etcObj.expeditionStats +
        extractObj.hyperObj.str +
        extractObj.elixirObj.str +
        extractObj.elixirObj.dex +
        extractObj.elixirObj.int +
        extractObj.bangleObj.str +
        extractObj.bangleObj.dex +
        extractObj.bangleObj.int) *
        extractObj.etcObj.avatarStats);

    if (!cacheCollectStatSupport) {
        cacheCollectStatSupport = originTotalStatSupport - calcBaseStatSupport
    }

    let calcTotalStatSupport = calcBaseStatSupport + cacheCollectStatSupport

    let calcBaseAttack = (((calcTotalStatSupport * weaponAtk / 6) ** 0.5) * baseAttackBonus) * 124 / 1000000
    let calcAttackCombat = calcBaseAttack *
        combatObj.sup_attack.accessory *
        combatObj.sup_attack.ark *
        combatObj.sup_attack.bangle *
        combatObj.sup_attack.card *
        combatObj.sup_attack.elixir *
        combatObj.sup_attack.engraving *
        combatObj.sup_attack.esther *
        combatObj.sup_attack.gem *
        combatObj.sup_attack.hyper *
        combatObj.sup_attack.karma *
        combatObj.sup_attack.level *
        combatObj.sup_attack.stats *
        combatObj.sup_attack.arkgridCore *
        combatObj.sup_attack.arkgridGem

    let calcCombatSupport = calcAttackCombat + calcCareCombat
    
    console.log("실제 전투력", originCombat)
    console.log("계산 전투력", Math.ceil(calcCombatSupport * 100) / 100)

    let result = {
        dealer: Math.ceil(calcCombat * 100) / 100,
        support: Math.ceil(calcCombatSupport * 100) / 100
    }
    return result;
};
