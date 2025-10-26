let keywordList = [
    "</FONT> 힘 <FONT color='#FFD200'>",
    "</FONT> 민첩 <FONT color='#FFD200'>",
    "</FONT> 지능 <FONT color='#FFD200'>",
    "</FONT> 공격력 <FONT color='#FFD200'>",
    "</FONT> 무기 공격력 <FONT color='#FFD200'>",
    "</FONT> 탈출의 달인 <FONT color='#FFD200'>",
    "</FONT> 회피의 달인 <FONT color='#FFD200'>",
    "</FONT> 마나 <FONT color='#FFD200'>",
    "</FONT> 생명의 축복 <FONT color='#FFD200'>",
    "</FONT> 자원의 축복 <FONT color='#FFD200'>",
    "</FONT> 방랑자 <FONT color='#FFD200'>",
    "</FONT> 무력화 <FONT color='#FFD200'>",
    "</FONT> 물약 중독 <FONT color='#FFD200'>",
    "</FONT> 폭발물 달인 <FONT color='#FFD200'>",
    "</FONT> 행운 (질서) <FONT color='#FFD200'>",
    "</FONT> 회심 (질서) <FONT color='#FFD200'>",
    "</FONT> 달인 (질서) <FONT color='#FFD200'>",
    "</FONT> 강맹 (질서) <FONT color='#FFD200'>",
    "</FONT> 칼날 방패 (질서) <FONT color='#FFD200'>",
    "</FONT> 선봉대 (질서) <FONT color='#FFD200'>",
    "</FONT> 선각자 (질서) <FONT color='#FFD200'>",
    "</FONT> 진군 (질서) <FONT color='#FFD200'>",
    "</FONT> 신념 (질서) <FONT color='#FFD200'>",
    "</FONT> 보스 피해 <FONT color='#FFD200'>",
    "</FONT> 각성기 피해 <FONT color='#FFD200'>",
    "</FONT> 보호막 강화 <FONT color='#FFD200'>",
    "</FONT> 회복 강화 <FONT color='#FFD200'>",
    "</FONT> 최대 생명력 <FONT color='#FFD200'>",
    "</FONT> 받는 피해 감소 <FONT color='#FFD200'>",
    "</FONT> 물리 방어력 <FONT color='#FFD200'>",
    "</FONT> 마법 방어력 <FONT color='#FFD200'>",
    "</FONT> 치명타 피해 <FONT color='#FFD200'>",
    "</FONT> 추가 피해 <FONT color='#FFD200'>",
    "</FONT> 아이덴티티 획득 <FONT color='#FFD200'>",
    "</FONT> 아군 강화 <FONT color='#FFD200'>",
    "</FONT> 행운 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 회심 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 달인 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 강맹 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 칼날 방패 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 선봉대 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 선각자 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 진군 (혼돈) <FONT color='#FFD200'>",
    "</FONT> 신념 (혼돈) <FONT color='#FFD200'>"
];


// 악세서리 상중하 구분 필터

let grindingFilter = [

    "추가 피해 +0.39%:low",
    "추가 피해 +0.90%:middle",
    "추가 피해 +1.50%:high",
    "추가 피해 +0.48%:low",
    "추가 피해 +1.09%:middle",
    "추가 피해 +1.82%:high",
    "추가 피해 +0.70%:low",
    "추가 피해 +1.60%:middle",
    "추가 피해 +2.60%:high",

    "적에게 주는 피해 +0.30%:low",
    "적에게 주는 피해 +0.69%:middle",
    "적에게 주는 피해 +1.15%:high",
    "적에게 주는 피해 +0.37%:low",
    "적에게 주는 피해 +0.84%:middle",
    "적에게 주는 피해 +1.40%:high",
    "적에게 주는 피해 +0.55%:low",
    "적에게 주는 피해 +1.20%:middle",
    "적에게 주는 피해 +2.00%:high",

    "낙인력 +1.20%:low",
    "낙인력 +2.76%:middle",
    "낙인력 +4.60%:high",
    "낙인력 +1.48%:low",
    "낙인력 +3.36%:middle",
    "낙인력 +5.60%:high",
    "낙인력 +2.15%:low",
    "낙인력 +4.80%:middle",
    "낙인력 +8.00%:high",

    "세레나데, 신앙, 조화 게이지 획득량 +0.90%:low",
    "세레나데, 신앙, 조화 게이지 획득량 +2.07%:middle",
    "세레나데, 신앙, 조화 게이지 획득량 +3.45%:high",
    "세레나데, 신앙, 조화 게이지 획득량 +1.48%:low",
    "세레나데, 신앙, 조화 게이지 획득량 +3.36%:middle",
    "세레나데, 신앙, 조화 게이지 획득량 +5.60%:high",
    "세레나데, 신앙, 조화 게이지 획득량 +1.60%:low",
    "세레나데, 신앙, 조화 게이지 획득량 +3.60%:middle",
    "세레나데, 신앙, 조화 게이지 획득량 +6.00%:high",

    "무기 공격력 +0.46%:low",
    "무기 공격력 +1.04%:middle",
    "무기 공격력 +1.72%:high",
    "무기 공격력 +0.56%:low",
    "무기 공격력 +1.26%:middle",
    "무기 공격력 +2.10%:high",
    "무기 공격력 +0.80%:low",
    "무기 공격력 +1.80%:middle",
    "무기 공격력 +3.00%:high",

    "공격력 +0.24%:low",
    "공격력 +0.54%:middle",
    "공격력 +0.89%:high",
    "공격력 +0.29%:low",
    "공격력 +0.66%:middle",
    "공격력 +1.09%:high",
    "공격력 +0.40%:low",
    "공격력 +0.95%:middle",
    "공격력 +1.55%:high",

    "파티원 회복 효과 +0.54%:low",
    "파티원 회복 효과 +1.21%:middle",
    "파티원 회복 효과 +2.01%:high",
    "파티원 회복 효과 +0.65%:low",
    "파티원 회복 효과 +1.47%:middle",
    "파티원 회복 효과 +2.45%:high",
    "파티원 회복 효과 +0.95%:low",
    "파티원 회복 효과 +2.10%:middle",
    "파티원 회복 효과 +3.50%:high",

    "파티원 보호막 효과 +0.54%:low",
    "파티원 보호막 효과 +1.21%:middle",
    "파티원 보호막 효과 +2.01%:high",
    "파티원 보호막 효과 +0.65%:low",
    "파티원 보호막 효과 +1.47%:middle",
    "파티원 보호막 효과 +2.45%:high",
    "파티원 보호막 효과 +0.95%:low",
    "파티원 보호막 효과 +2.10%:middle",
    "파티원 보호막 효과 +3.50%:high",

    "치명타 적중률 +0.24%:low",
    "치명타 적중률 +0.54%:middle",
    "치명타 적중률 +0.89%:high",
    "치명타 적중률 +0.29%:low",
    "치명타 적중률 +0.66%:middle",
    "치명타 적중률 +1.09%:high",
    "치명타 적중률 +0.40%:low",
    "치명타 적중률 +0.95%:middle",
    "치명타 적중률 +1.55%:high",

    "치명타 피해 +0.61%:low",
    "치명타 피해 +1.38%:middle",
    "치명타 피해 +2.30%:high",
    "치명타 피해 +0.74%:low",
    "치명타 피해 +1.70%:middle",
    "치명타 피해 +2.82%:high",
    "치명타 피해 +1.10%:low",
    "치명타 피해 +2.40%:middle",
    "치명타 피해 +4.00%:high",

    "아군 공격력 강화 효과 +0.76%:low",
    "아군 공격력 강화 효과 +1.72%:middle",
    "아군 공격력 강화 효과 +2.88%:high",
    "아군 공격력 강화 효과 +0.92%:low",
    "아군 공격력 강화 효과 +2.12%:middle",
    "아군 공격력 강화 효과 +3.52%:high",
    "아군 공격력 강화 효과 +1.35%:low",
    "아군 공격력 강화 효과 +3.00%:middle",
    "아군 공격력 강화 효과 +5.00%:high",

    "아군 피해량 강화 효과 +1.14%:low",
    "아군 피해량 강화 효과 +2.58%:middle",
    "아군 피해량 강화 효과 +4.32%:high",
    "아군 피해량 강화 효과 +1.38%:low",
    "아군 피해량 강화 효과 +3.18%:middle",
    "아군 피해량 강화 효과 +5.28%:high",
    "아군 피해량 강화 효과 +2.00%:low",
    "아군 피해량 강화 효과 +4.50%:middle",
    "아군 피해량 강화 효과 +7.50%:high",

    "무기 공격력 +32:low",
    "무기 공격력 +75:middle",
    "무기 공격력 +155:high",
    "무기 공격력 +57:low",
    "무기 공격력 +147:middle",
    "무기 공격력 +285:high",
    "무기 공격력 +195:low",
    "무기 공격력 +480:middle",
    "무기 공격력 +960:high",

    "공격력 +14:low",
    "공격력 +33:middle",
    "공격력 +68:high",
    "공격력 +24:low",
    "공격력 +61:middle",
    "공격력 +118:high",
    "공격력 +80:low",
    "공격력 +195:middle",
    "공격력 +390:high",

    "최대 생명력 +719:low",
    "최대 생명력 +1654:middle",
    "최대 생명력 +2756:high",
    "최대 생명력 +992:low",
    "최대 생명력 +2253:middle",
    "최대 생명력 +3755:high",
    "최대 생명력 +1300:low",
    "최대 생명력 +3250:middle",
    "최대 생명력 +6500:high",

    "최대 마나 +5:low",
    "최대 마나 +10:middle",
    "최대 마나 +17:high",
    "최대 마나 +6:low",
    "최대 마나 +13:middle",
    "최대 마나 +21:high",
    "최대 마나 +15:middle",
    "최대 마나 +30:high",

    "상태이상 공격 지속시간 +0.15%:low",
    "상태이상 공격 지속시간 +0.35%:middle",
    "상태이상 공격 지속시간 +0.58%:high",
    "상태이상 공격 지속시간 +0.19%:low",
    "상태이상 공격 지속시간 +0.42%:middle",
    "상태이상 공격 지속시간 +0.70%:high",
    "상태이상 공격 지속시간 +0.20%:low",
    "상태이상 공격 지속시간 +0.50%:middle",
    "상태이상 공격 지속시간 +1.00%:high",

    "전투 중 생명력 회복량 +50:high",
    "전투 중 생명력 회복량 +5:low",
    "전투 중 생명력 회복량 +13:middle",
    "전투 중 생명력 회복량 +21:high",
    "전투 중 생명력 회복량 +8:low",
    "전투 중 생명력 회복량 +17:middle",
    "전투 중 생명력 회복량 +28:high",
    "전투 중 생명력 회복량 +10:low",
    "전투 중 생명력 회복량 +25:middle",







]



// 액세서리 옵션명 축약 매핑
export const accessoryAbbreviationMap = {
    "추가 피해 +0.39%": "추피",
    "추가 피해 +0.90%": "추피",
    "추가 피해 +1.50%": "추피",
    "추가 피해 +0.48%": "추피",
    "추가 피해 +1.09%": "추피",
    "추가 피해 +1.82%": "추피",
    "추가 피해 +0.70%": "추피",
    "추가 피해 +1.60%": "추피",
    "추가 피해 +2.60%": "추피",

    "적에게 주는 피해 +0.30%": "적주피",
    "적에게 주는 피해 +0.69%": "적주피",
    "적에게 주는 피해 +1.15%": "적주피",
    "적에게 주는 피해 +0.37%": "적주피",
    "적에게 주는 피해 +0.84%": "적주피",
    "적에게 주는 피해 +1.40%": "적주피",
    "적에게 주는 피해 +0.55%": "적주피",
    "적에게 주는 피해 +1.20%": "적주피",
    "적에게 주는 피해 +2.00%": "적주피",

    "낙인력 +1.20%": "낙인력",
    "낙인력 +2.76%": "낙인력",
    "낙인력 +4.60%": "낙인력",
    "낙인력 +1.48%": "낙인력",
    "낙인력 +3.36%": "낙인력",
    "낙인력 +5.60%": "낙인력",
    "낙인력 +2.15%": "낙인력",
    "낙인력 +4.80%": "낙인력",
    "낙인력 +8.00%": "낙인력",

    "세레나데, 신앙, 조화 게이지 획득량 +0.90%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +2.07%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +3.45%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +1.48%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +3.36%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +5.60%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +1.60%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +3.60%": "아덴 회복",
    "세레나데, 신앙, 조화 게이지 획득량 +6.00%": "아덴 회복",

    "무기 공격력 +0.46%": "무공%",
    "무기 공격력 +1.04%": "무공%",
    "무기 공격력 +1.72%": "무공%",
    "무기 공격력 +0.56%": "무공%",
    "무기 공격력 +1.26%": "무공%",
    "무기 공격력 +2.10%": "무공%",
    "무기 공격력 +0.80%": "무공%",
    "무기 공격력 +1.80%": "무공%",
    "무기 공격력 +3.00%": "무공%",

    "공격력 +0.24%": "공격력%",
    "공격력 +0.54%": "공격력%",
    "공격력 +0.89%": "공격력%",
    "공격력 +0.29%": "공격력%",
    "공격력 +0.66%": "공격력%",
    "공격력 +1.09%": "공격력%",
    "공격력 +0.40%": "공격력%",
    "공격력 +0.95%": "공격력%",
    "공격력 +1.55%": "공격력%",

    "파티원 회복 효과 +0.54%": "회복 효과%",
    "파티원 회복 효과 +1.21%": "회복 효과%",
    "파티원 회복 효과 +2.01%": "회복 효과%",
    "파티원 회복 효과 +0.65%": "회복 효과%",
    "파티원 회복 효과 +1.47%": "회복 효과%",
    "파티원 회복 효과 +2.45%": "회복 효과%",
    "파티원 회복 효과 +0.95%": "회복 효과%",
    "파티원 회복 효과 +2.10%": "회복 효과%",
    "파티원 회복 효과 +3.50%": "회복 효과%",

    "파티원 보호막 효과 +0.54%": "보호막 효과%",
    "파티원 보호막 효과 +1.21%": "보호막 효과%",
    "파티원 보호막 효과 +2.01%": "보호막 효과%",
    "파티원 보호막 효과 +0.65%": "보호막 효과%",
    "파티원 보호막 효과 +1.47%": "보호막 효과%",
    "파티원 보호막 효과 +2.45%": "보호막 효과%",
    "파티원 보호막 효과 +0.95%": "보호막 효과%",
    "파티원 보호막 효과 +2.10%": "보호막 효과%",
    "파티원 보호막 효과 +3.50%": "보호막 효과%",

    "치명타 적중률 +0.24%": "치적%",
    "치명타 적중률 +0.54%": "치적%",
    "치명타 적중률 +0.89%": "치적%",
    "치명타 적중률 +0.29%": "치적%",
    "치명타 적중률 +0.66%": "치적%",
    "치명타 적중률 +1.09%": "치적%",
    "치명타 적중률 +0.40%": "치적%",
    "치명타 적중률 +0.95%": "치적%",
    "치명타 적중률 +1.55%": "치적%",

    "치명타 피해 +1.70%": "치피%",
    "치명타 피해 +2.82%": "치피%",
    "치명타 피해 +1.10%": "치피%",
    "치명타 피해 +2.40%": "치피%",
    "치명타 피해 +4.00%": "치피%",

    "아군 공격력 강화 효과 +0.76%": "아공강",
    "아군 공격력 강화 효과 +1.72%": "아공강",
    "아군 공격력 강화 효과 +2.88%": "아공강",
    "아군 공격력 강화 효과 +0.92%": "아공강",
    "아군 공격력 강화 효과 +2.12%": "아공강",
    "아군 공격력 강화 효과 +3.52%": "아공강",
    "아군 공격력 강화 효과 +1.35%": "아공강",
    "아군 공격력 강화 효과 +3.00%": "아공강",
    "아군 공격력 강화 효과 +5.00%": "아공강",

    "아군 피해량 강화 효과 +1.14%": "아피강",
    "아군 피해량 강화 효과 +2.58%": "아피강",
    "아군 피해량 강화 효과 +4.32%": "아피강",
    "아군 피해량 강화 효과 +1.38%": "아피강",
    "아군 피해량 강화 효과 +3.18%": "아피강",
    "아군 피해량 강화 효과 +5.28%": "아피강",
    "아군 피해량 강화 효과 +2.00%": "아피강",
    "아군 피해량 강화 효과 +4.50%": "아피강",
    "아군 피해량 강화 효과 +7.50%": "아피강",

    "무기 공격력 +32": "무공+",
    "무기 공격력 +75": "무공+",
    "무기 공격력 +155": "무공+",
    "무기 공격력 +57": "무공+",
    "무기 공격력 +147": "무공+",
    "무기 공격력 +285": "무공+",
    "무기 공격력 +195": "무공+",
    "무기 공격력 +480": "무공+",
    "무기 공격력 +960": "무공+",

    "공격력 +14": "공격력+",
    "공격력 +33": "공격력+",
    "공격력 +68": "공격력+",
    "공격력 +24": "공격력+",
    "공격력 +61": "공격력+",
    "공격력 +118": "공격력+",
    "공격력 +80": "공격력+",
    "공격력 +195": "공격력+",
    "공격력 +390": "공격력+",

    "최대 생명력 +719": "최생",
    "최대 생명력 +1654": "최생",
    "최대 생명력 +2756": "최생",
    "최대 생명력 +992": "최생",
    "최대 생명력 +2253": "최생",
    "최대 생명력 +3755": "최생",
    "최대 생명력 +1300": "최생",
    "최대 생명력 +3250": "최생",
    "최대 생명력 +6500": "최생",

    "최대 마나 +5": "마나",
    "최대 마나 +10": "마나",
    "최대 마나 +17": "마나",
    "최대 마나 +6": "마나",
    "최대 마나 +13": "마나",
    "최대 마나 +21": "마나",
    "최대 마나 +15": "마나",
    "최대 마나 +30": "마나",

    "상태이상 공격 지속시간 +0.15%": "상태이상",
    "상태이상 공격 지속시간 +0.35%": "상태이상",
    "상태이상 공격 지속시간 +0.58%": "상태이상",
    "상태이상 공격 지속시간 +0.19%": "상태이상",
    "상태이상 공격 지속시간 +0.42%": "상태이상",
    "상태이상 공격 지속시간 +0.70%": "상태이상",
    "상태이상 공격 지속시간 +0.20%": "상태이상",
    "상태이상 공격 지속시간 +0.50%": "상태이상",
    "상태이상 공격 지속시간 +1.00%": "상태이상",

    "전투 중 생명력 회복량 +50": "생회",
    "전투 중 생명력 회복량 +5": "생회",
    "전투 중 생명력 회복량 +13": "생회",
    "전투 중 생명력 회복량 +21": "생회",
    "전투 중 생명력 회복량 +8": "생회",
    "전투 중 생명력 회복량 +17": "생회",
    "전투 중 생명력 회복량 +28": "생회",
    "전투 중 생명력 회복량 +10": "생회",
    "전투 중 생명력 회복량 +25": "생회",
};


// 2차전직

let arkFilter = [
    { name: "창술 수련", initial: "고기", finalDamagePer: 6.4, criticalChancePer: 15, healthPer: 2.5 },
    { name: "고독한 기사", initial: "고기", finalDamagePer: 6.4, criticalChancePer: 15, healthPer: 2.5 }, //언제 개지랄 날지 모르니 예비
    { name: "철옹성", initial: "전태", finalDamagePer: 6.4, healthPer: 2.5 },
    { name: "강인한 육체", initial: "비기", moveSpeed: 20, atkSpeed: 20, finalDamagePer: 6, criticalChancePer: 63.2, healthPer: 2.2 },
    { name: "광기", initial: "광기", moveSpeed: 15, atkSpeed: 15, finalDamagePer: 6, criticalChancePer: 33.2, healthPer: 2.2 },
    { name: "중력 갑옷", initial: "분망", finalDamagePer: 6.4, criticalChancePer: 18, healthPer: 2.3 },
    { name: "중력 충격", initial: "중수", finalDamagePer: 6.4, criticalChancePer: 30, healthPer: 2.3 },
    { name: "빛의 기사", initial: "빛의 기사", finalDamagePer: 6, healthPer: 2.2 },
    { name: "해방자", initial: "서폿", stigmaPer: 10, healthPer: 2.2 },
    { name: "신성한 의무", initial: "심판자", criFinalDamagePer: 8, finalDamagePer: 6, healthPer: 2.1 },
    { name: "신성 보호", initial: "서폿", stigmaPer: 10, healthPer: 2.1 },
    { name: "지치지 않는 힘", initial: "처단", criticalChancePer: 10, moveSpeed: 20, atkSpeed: 20, finalDamagePer: 6, criticalChancePer: 30, healthPer: 2.2 },
    { name: "끝나지 않는 분노", initial: "포식", criticalChancePer: 10, moveSpeed: 20, atkSpeed: 20, finalDamagePer: 6, criticalChancePer: 30, healthPer: 2.2 },
    { name: "기력 회복", initial: "체술", criticalChancePer: 10, moveSpeed: 1, atkSpeed: 1, finalDamagePer: 6, healthPer: 2.3 },
    { name: "속도 강화", initial: "충단", criticalChancePer: 10, moveSpeed: 1, atkSpeed: 20, finalDamagePer: 6, healthPer: 2.3 },
    { name: "강력한 체술", initial: "초심", criticalChancePer: 30, moveSpeed: 16, atkSpeed: 20.8, criticalDamagePer: 35, finalDamagePer: 6, healthPer: 2.2 },
    { name: "강력한 오의", initial: "오의", criticalChancePer: 30, moveSpeed: 16, atkSpeed: 20.8, finalDamagePer: 6, healthPer: 2.2 },
    { name: "세맥타통", initial: "세맥", moveSpeed: 1, atkSpeed: 10, atkPer: 6, finalDamagePer: 6, healthPer: 2.1 },
    { name: "역천지체", initial: "역천", moveSpeed: 1, atkSpeed: 15, atkPer: 6, finalDamagePer: 6, healthPer: 2.1 },
    { name: "절제", initial: "절제", criticalChancePer: 10, criFinalDamagePer: 8, criticalChancePer: 20, finalDamagePer: 6, healthPer: 2.2 },
    { name: "절정", initial: "절정", criticalChancePer: 10, moveSpeed: 15, atkSpeed: 15, criFinalDamagePer: 8, criticalChancePer: 20, finalDamagePer: 6, healthPer: 2.2 },
    { name: "일격필살", initial: "일격", criticalChancePer: 30, finalDamagePer: 6, healthPer: 2.2 },
    { name: "오의난무", initial: "난무", criticalChancePer: 30, atkSpeed: 8, finalDamagePer: 6, healthPer: 2.2 },
    { name: "권왕파천무", initial: "권왕", atkSpeed: 20, finalDamagePer: 6, criticalChancePer: 15, healthPer: 2.3 },
    { name: "수라의 길", initial: "수라", moveSpeed: 15, finalDamagePer: 6, healthPer: 2.3 },
    { name: "전술 탄환", initial: "전탄", criticalChancePer: 34, finalDamagePer: 6, healthPer: 2.0 },
    { name: "핸드 거너", initial: "핸건", criticalChancePer: 10, moveSpeed: 8, atkSpeed: 8, skillCool: 5, finalDamagePer: 6, healthPer: 2.0 },
    { name: "죽음의 습격", initial: "죽습", finalDamagePer: 6, healthPer: 2.1 },
    { name: "두 번째 동료", initial: "두동", moveSpeed: 8, finalDamagePer: 6, criticalChancePer: 40, healthPer: 2.1 },
    { name: "포격 강화", initial: "포강", atkSpeed: 4, finalDamagePer: 6.4, criticalChancePer: 40, healthPer: 2.1 },
    { name: "화력 강화", initial: "화강", finalDamagePer: 6.4, healthPer: 2.1 },
    { name: "진화의 유산", initial: "유산", moveSpeed: 30, atkSpeed: 15, atkPer: 6, finalDamagePer: 6, healthPer: 2.0 },
    { name: "아르데타인의 기술", initial: "기술", moveSpeed: 29.2, atkPer: 6, finalDamagePer: 6, healthPer: 2.0 },
    { name: "피스메이커", initial: "피메", criticalChancePer: 10, atkSpeed: 16, finalDamagePer: 6, healthPer: 2.0 },
    { name: "사냥의 시간", initial: "사시", criticalChancePer: 10, finalDamagePer: 6, healthPer: 2.0 },
    { name: "황후의 은총", initial: "황후", criticalChancePer: 10, moveSpeed: 30, atkSpeed: 19.2, criticalChancePer: 33, finalDamagePer: 6, healthPer: 2.1 },
    { name: "황제의 칙령", initial: "황제", criticalChancePer: 10, criticalChancePer: 37.6, finalDamagePer: 6, healthPer: 2.1 },
    { name: "넘치는 교감", initial: "교감", moveSpeed: 10, atkSpeed: 10, finalDamagePer: 6.4, criticalChancePer: 11.8, healthPer: 2.1 },
    { name: "상급 소환사", initial: "상소", moveSpeed: 1, atkSpeed: 1, finalDamagePer: 6.4, criticalChancePer: 27.8, healthPer: 2.1 },
    { name: "구원의 선물", initial: "서폿", stigmaPer: 10, healthPer: 2.0 },
    { name: "진실된 용맹", initial: "진실된 용맹", healthPer: 2.0 },
    { name: "점화", initial: "점화", finalDamagePer: 6, criticalChancePer: 30, criticalDamagePer: 55, healthPer: 2.1 },
    { name: "환류", initial: "환류", finalDamagePer: 6, healthPer: 2.1 },
    { name: "버스트 강화", initial: "버스트", criticalChancePer: 10, moveSpeed: 22.8, atkSpeed: 32.8, finalDamagePer: 6, healthPer: 2.2 },
    { name: "신속한 일격", initial: "잔재", criticalChancePer: 10, moveSpeed: 24.8, atkSpeed: 24.8, finalDamagePer: 6, healthPer: 2.2 },
    { name: "멈출 수 없는 충동", initial: "충동", moveSpeed: 20, finalDamagePer: 6, healthPer: 2.1 },
    { name: "완벽한 억제", initial: "억제", moveSpeed: 30, finalDamagePer: 6, healthPer: 2.1 },
    { name: "달의 소리", initial: "달소", criticalChancePer: 10, moveSpeed: 30, atkSpeed: 12, finalDamagePer: 6.4, criticalChancePer: 37, healthPer: 2.0 },
    { name: "피냄새", initial: "갈증", criticalChancePer: 10, moveSpeed: 10, atkSpeed: 10, finalDamagePer: 6.4, criticalChancePer: 43, healthPer: 2.0 },
    { name: "영혼친화력", initial: "만월", moveSpeed: 39.2, atkSpeed: 10, finalDamagePer: 6, criticalChancePer: 34, healthPer: 2.1 },
    { name: "그믐의 경계", initial: "그믐", moveSpeed: 29.2, atkSpeed: 20, finalDamagePer: 6, healthPer: 2.1 },
    { name: "해의 조화", initial: "서폿", stigmaPer: 10, healthPer: 2.0 },
    { name: "회귀", initial: "회귀", healthPer: 2.0 },
    { name: "질풍노도", initial: "질풍", criticalChancePer: 10, criticalDamagePer: 102.08, finalDamagePer: 6, healthPer: 2.1 },
    { name: "이슬비", initial: "이슬비", criticalChancePer: 10, finalDamagePer: 6, healthPer: 2.1 },
    { name: "야성", initial: "야성", healthPer: 2.1 },
    { name: "환수 각성", initial: "환각", healthPer: 2.1 },

    { name: "핸드거너", initial: "핸건", criticalChancePer: 10, moveSpeed: 8, atkSpeed: 8, skillCool: 5, finalDamagePer: 6 },
    { name: "강화 무기", initial: "전탄", criticalChancePer: 34, finalDamagePer: 6 },
    { name: "전투 태세", initial: "전태", finalDamagePer: 6 },
    { name: "광전사의 비기", initial: "비기", moveSpeed: 20, atkSpeed: 20, finalDamagePer: 6, criticalChancePer: 63.2 },
    { name: "분노의 망치", initial: "분망", finalDamagePer: 6.4, criticalChancePer: 18 },
    { name: "중력 수련", initial: "중수", finalDamagePer: 6.4, criticalChancePer: 30 },
    { name: "심판자", initial: "심판자", criFinalDamagePer: 8, finalDamagePer: 6 },
    { name: "축복의 오라", initial: "서폿", stigmaPer: 10 },
    { name: "처단자", initial: "처단", criticalChancePer: 10, moveSpeed: 20, atkSpeed: 20, finalDamagePer: 6, criticalChancePer: 30 },
    { name: "포식자", initial: "포식", criticalChancePer: 10, moveSpeed: 20, atkSpeed: 20, finalDamagePer: 6, criticalChancePer: 30 },
    { name: "극의: 체술", initial: "체술", criticalChancePer: 10, finalDamagePer: 6 },
    { name: "충격 단련", initial: "충단", criticalChancePer: 10, atkSpeed: 20, finalDamagePer: 6 },
    { name: "초심", initial: "초심", criticalChancePer: 30, moveSpeed: 16, atkSpeed: 20.8, finalDamagePer: 6 },
    { name: "오의 강화", initial: "오의", criticalChancePer: 30, moveSpeed: 16, atkSpeed: 20.8, finalDamagePer: 6 },
    { name: "절실한 구원", initial: "서폿", stigmaPer: 10 },
    { name: "버스트", initial: "버스트", criticalChancePer: 10, moveSpeed: 22.8, atkSpeed: 32.8, finalDamagePer: 6 },
    { name: "잔재된 기운", initial: "잔재", criticalChancePer: 10, moveSpeed: 24.8, atkSpeed: 24.8, finalDamagePer: 6 },
    { name: "깔쯩", initial: "갈증", criticalChancePer: 10, moveSpeed: 10, atkSpeed: 10, finalDamagePer: 6.4, criticalChancePer: 43 },
    { name: "만월의 집행자", initial: "만월", moveSpeed: 39.2, atkSpeed: 10, finalDamagePer: 6, criticalChancePer: 34 },
    { name: "만개", initial: "서폿", stigmaPer: 10 },

]


// pow:힘, dex:민첩 , int:지능 중복표기는 힘>민첩>지능 순서로
export let bangleJobFilter = [

    { job: "워로드", stats: "str" },
    { job: "버서커", stats: "str" },
    { job: "디스트로이어", stats: "str" },
    { job: "홀리나이트", stats: "str" },
    { job: "발키리", stats: "str" },
    { job: "슬레이어", stats: "str" },
    { job: "인파이터", stats: "str" },
    { job: "배틀마스터", stats: "str" },
    { job: "기공사", stats: "str" },
    { job: "창술사", stats: "str" },
    { job: "스트라이커", stats: "str" },
    { job: "브레이커", stats: "str" },
    { job: "데빌헌터", stats: "dex" },
    { job: "호크아이", stats: "dex" },
    { job: "블래스터", stats: "dex" },
    { job: "스카우터", stats: "dex" },
    { job: "건슬링어", stats: "dex" },
    { job: "아르카나", stats: "int" },
    { job: "서머너", stats: "int" },
    { job: "바드", stats: "int" },
    { job: "소서리스", stats: "int" },
    { job: "블레이드", stats: "dex" },
    { job: "데모닉", stats: "dex" },
    { job: "리퍼", stats: "dex" },
    { job: "소울이터", stats: "dex" },
    { job: "도화가", stats: "int" },
    { job: "기상술사", stats: "int" },
    { job: "환수사", stats: "int" },

]





let engravingImg = [

    "없음^https://placehold.co/30",
    "각성^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_113.png",
    "강령술^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_29.png",
    "강화 방패^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_239.png",
    "결투의 대가^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_224.png",
    "구슬동자^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_18.png",
    "굳은 의지^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_44.png",
    "급소 타격^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_168.png",
    "기습의 대가^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_148.png",
    "긴급구조^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_238.png",
    "달인의 저력^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_147.png",
    "돌격대장^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_210.png",
    "마나 효율 증가^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_166.png",
    "마나의 흐름^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_63.png",
    "바리케이드^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_170.png",
    "번개의 분노^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_191.png",
    "부러진 뼈^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_94.png",
    "분쇄의 주먹^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_83.png",
    "불굴^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_66.png",
    "선수필승^https://cdn-lostark.game.onstove.com/efui_iconatlas/achieve/achieve_08_62.png",
    "속전속결^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_236.png",
    "슈퍼 차지^https://cdn-lostark.game.onstove.com/efui_iconatlas/achieve/achieve_06_14.png",
    "승부사^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_136.png",
    "시선 집중^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_234.png",
    "실드 관통^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_89.png",
    "아드레날린^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_235.png",
    "안정된 상태^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_105.png",
    "약자 무시^https://cdn-lostark.game.onstove.com/efui_iconatlas/achieve/achieve_04_30.png",
    "에테르 포식자^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_74.png",
    "여신의 가호^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_229.png",
    "예리한 둔기^https://cdn-lostark.game.onstove.com/efui_iconatlas/achieve/achieve_03_40.png",
    "원한^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_71.png",
    "위기 모면^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_162.png",
    "저주받은 인형^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_237.png",
    "전문의^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_237.png",
    "정기 흡수^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_65.png",
    "정밀 단도^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_239.png",
    "중갑 착용^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_46.png",
    "질량 증가^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_231.png",
    "최대 마나 증가^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_122.png",
    "추진력^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_232.png",
    "타격의 대가^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_233.png",
    "탈출의 명수^https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_10.png",
    "폭발물 전문가^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_121.png",
    "이동속도 감소^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_221.png",
    "공격속도 감소^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_220.png",
    "방어력 감소^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_219.png",
    "공격력 감소^https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_218.png",
]

export let engravingFilter = [
    , { name: "각성", short: "각성", }
    , { name: "강령술", short: "강령", }
    , { name: "강화 방패", short: "강화방패", }
    , { name: "결투의 대가", short: "결대", }
    , { name: "구슬동자", short: "구동", }
    , { name: "굳은 의지", short: "굳은 의지", }
    , { name: "급소 타격", short: "급타", }
    , { name: "기습의 대가", short: "기습", }
    , { name: "긴급구조", short: "긴급구조", }
    , { name: "달인의 저력", short: "달저", }
    , { name: "돌격대장", short: "돌대", }
    , { name: "마나 효율 증가", short: "마효증", }
    , { name: "마나의 흐름", short: "마흐", }
    , { name: "바리케이드", short: "바리", }
    , { name: "번개의 분노", short: "번분", }
    , { name: "부러진 뼈", short: "부뼈", }
    , { name: "분쇄의 주먹", short: "분쇄의주먹", }
    , { name: "불굴", short: "불굴", }
    , { name: "선수필승", short: "선필", }
    , { name: "속전속결", short: "속속", }
    , { name: "슈퍼 차지", short: "슈차", }
    , { name: "승부사", short: "승부사", }
    , { name: "시선 집중", short: "시집", }
    , { name: "실드 관통", short: "실드관통", }
    , { name: "아드레날린", short: "아드", }
    , { name: "안정된 상태", short: "안상", }
    , { name: "약자 무시", short: "약무", }
    , { name: "에테르 포식자", short: "에포", }
    , { name: "여신의 가호", short: "가호", }
    , { name: "예리한 둔기", short: "예둔", }
    , { name: "원한", short: "원한", }
    , { name: "위기 모면", short: "위모", }
    , { name: "저주받은 인형", short: "저받", }
    , { name: "전문의", short: "전문의", }
    , { name: "정기 흡수", short: "정흡", }
    , { name: "정밀 단도", short: "정단", }
    , { name: "중갑 착용", short: "중갑", }
    , { name: "질량 증가", short: "질증", }
    , { name: "최대 마나 증가", short: "최마증", }
    , { name: "추진력", short: "추진력", }
    , { name: "타격의 대가", short: "타대", }
    , { name: "탈출의 명수", short: "탈출", }
    , { name: "폭발물 전문가", short: "폭전", }
    , { name: "이동속도 감소", short: "이속감", }
    , { name: "공격속도 감소", short: "공속감", }
    , { name: "방어력 감소", short: "방감", }
    , { name: "공격력 감소", short: "공감", }
]



//전투력 계산식 악세서리 필터 딜러
let dealerAccessoryFilter = [
    // SP = 딜러특옵 / Support = 서폿기본 / SupportSP = 서폿특옵 / Duel = 딜러서폿 공용 특옵 / Z = 무효 / PUB = 딜러공용옵션 / DuelPub = 딜러서폿 공용 공옵
    "</img>추가 피해 +0.39%:SPlow:AddDamagePer:0.39",
    "</img>추가 피해 +0.90%:SPmiddle:AddDamagePer:0.9",
    "</img>추가 피해 +1.50%:SPhigh:AddDamagePer:1.5",
    "</img>추가 피해 +0.48%:SPlow:AddDamagePer:0.48",
    "</img>추가 피해 +1.09%:SPmiddle:AddDamagePer:1.09",
    "</img>추가 피해 +1.82%:SPhigh:AddDamagePer:1.82",
    "</img>추가 피해 +0.70%:SPlow:AddDamagePer:0.7",
    "</img>추가 피해 +1.60%:SPmiddle:AddDamagePer:1.6",
    "</img>추가 피해 +2.60%:SPhigh:AddDamagePer:2.6",

    "</img>적에게 주는 피해 +0.30%:SPlow:FinalDamagePer:0.30",
    "</img>적에게 주는 피해 +0.69%:SPmiddle:FinalDamagePer:0.69",
    "</img>적에게 주는 피해 +1.15%:SPhigh:FinalDamagePer:1.15",
    "</img>적에게 주는 피해 +0.37%:SPlow:FinalDamagePer:0.37",
    "</img>적에게 주는 피해 +0.84%:SPmiddle:FinalDamagePer:0.84",
    "</img>적에게 주는 피해 +1.40%:SPhigh:FinalDamagePer:1.4",
    "</img>적에게 주는 피해 +0.55%:SPlow:FinalDamagePer:0.55",
    "</img>적에게 주는 피해 +1.20%:SPmiddle:FinalDamagePer:1.2",
    "</img>적에게 주는 피해 +2.00%:SPhigh:FinalDamagePer:2.0",

    "</img>세레나데, 신앙, 조화 게이지 획득량 +0.90%:Supportlow:IdentityUptime:0.009",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +2.07%:Supportmiddle:IdentityUptime:0.0207",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +3.45%:Supporthigh:IdentityUptime:0.0345",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +1.48%:Supportlow:IdentityUptime:0.0148",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +3.36%:Supportmiddle:IdentityUptime:0.0336",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +5.60%:Supporthigh:IdentityUptime:0.056",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +1.60%:Supportlow:IdentityUptime:0.016",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +3.60%:Supportmiddle:IdentityUptime:0.036",
    "</img>세레나데, 신앙, 조화 게이지 획득량 +6.00%:Supporthigh:IdentityUptime:0.06",

    "</img>낙인력 +2.15%:SupportSPlow:StigmaPer:2.15",
    "</img>낙인력 +4.80%:SupportSPmiddle:StigmaPer:4.8",
    "</img>낙인력 +8.00%:SupportSPhigh:StigmaPer:8.0",

    "</img>최대 생명력 +1300:Zlow",
    "</img>최대 생명력 +3250:Zmiddle",
    "</img>최대 생명력 +6500:Zhigh",
    "</img>공격력 +80:PUBlow:AtkPlus:80",
    "</img>공격력 +195:PUBmiddle:AtkPlus:195",
    "</img>공격력 +390:PUBhigh:AtkPlus:390",
    "</img>무기 공격력 +195:DuelPublow:WeaponAtkPlus:195",
    "</img>무기 공격력 +480:DuelPubmiddle:WeaponAtkPlus:480",
    "</img>무기 공격력 +960:DuelPubhigh:WeaponAtkPlus:960",
    "</img>최대 마나 +6:Zlow",
    "</img>최대 마나 +15:Zmiddle",
    "</img>최대 마나 +30:Zhigh",
    "</img>상태이상 공격 지속시간 +0.20%:Zlow",
    "</img>상태이상 공격 지속시간 +0.50%:Zmiddle",
    "</img>상태이상 공격 지속시간 +1.00%:Zhigh",
    "</img>전투 중 생명력 회복량 +10:Zlow",
    "</img>전투 중 생명력 회복량 +25:Zmiddle",
    "</img>전투 중 생명력 회복량 +50:Zhigh",
    "</img>공격력 +0.40%:SPlow:AtkPer:0.4",
    "</img>공격력 +0.95%:SPmiddle:AtkPer:0.95",
    "</img>공격력 +1.55%:SPhigh:AtkPer:1.55",
    "</img>무기 공격력 +0.80%:Duellow",
    "</img>무기 공격력 +1.80%:Duelmiddle",
    "</img>무기 공격력 +3.00%:Duelhigh",
    "</img>파티원 회복 효과 +0.95%:Supportlow",
    "</img>파티원 회복 효과 +2.10%:Supportmiddle",
    "</img>파티원 회복 효과 +3.50%:Supporthigh",
    "</img>파티원 보호막 효과 +0.95%:Supportlow",
    "</img>파티원 보호막 효과 +2.10%:Supportmiddle",
    "</img>파티원 보호막 효과 +3.50%:Supporthigh",
    "</img>치명타 적중률 +0.40%:SPlow",
    "</img>치명타 적중률 +0.95%:SPmiddle",
    "</img>치명타 적중률 +1.55%:SPhigh",
    "</img>치명타 피해 +1.10%:SPlow",
    "</img>치명타 피해 +2.40%:SPmiddle",
    "</img>치명타 피해 +4.00%:SPhigh",
    "</img>아군 공격력 강화 효과 +1.35%:SupportSPlow:AtkBuff:1.35",
    "</img>아군 공격력 강화 효과 +3.00%:SupportSPmiddle:AtkBuff:3",
    "</img>아군 공격력 강화 효과 +5.00%:SupportSPhigh:AtkBuff:5",
    "</img>아군 피해량 강화 효과 +2.00%:SupportSPlow",
    "</img>아군 피해량 강화 효과 +4.50%:SupportSPmiddle",
    "</img>아군 피해량 강화 효과 +7.50%:SupportSPhigh",
]



let calAccessoryFilter = [
    { name: "추가 피해  +0.39%", attr: "AddDamagePer", value: 0.39 },
    { name: "추가 피해  +0.90%", attr: "AddDamagePer", value: 0.9 },
    { name: "추가 피해  +1.50%", attr: "AddDamagePer", value: 1.5 },
    { name: "추가 피해  +0.48%", attr: "AddDamagePer", value: 0.48 },
    { name: "추가 피해  +1.09%", attr: "AddDamagePer", value: 1.09 },
    { name: "추가 피해  +1.82%", attr: "AddDamagePer", value: 1.82 },
    { name: "추가 피해  +0.70%", attr: "AddDamagePer", value: 0.7 },
    { name: "추가 피해  +1.60%", attr: "AddDamagePer", value: 1.6 },
    { name: "추가 피해  +2.60%", attr: "AddDamagePer", value: 2.6 },

    { name: "적에게 주는 피해  +0.30%", attr: "FinalDamagePer", value: 0.3 },
    { name: "적에게 주는 피해  +0.69%", attr: "FinalDamagePer", value: 0.69 },
    { name: "적에게 주는 피해  +1.15%", attr: "FinalDamagePer", value: 1.15 },
    { name: "적에게 주는 피해  +0.37%", attr: "FinalDamagePer", value: 0.37 },
    { name: "적에게 주는 피해  +0.84%", attr: "FinalDamagePer", value: 0.84 },
    { name: "적에게 주는 피해  +1.40%", attr: "FinalDamagePer", value: 1.4 },
    { name: "적에게 주는 피해  +0.55%", attr: "FinalDamagePer", value: 0.55 },
    { name: "적에게 주는 피해  +1.20%", attr: "FinalDamagePer", value: 1.2 },
    { name: "적에게 주는 피해  +2.00%", attr: "FinalDamagePer", value: 2.0 },

    { name: "무기 공격력  +32", attr: "WeaponAtkPlus", value: 32 },
    { name: "무기 공격력  +75", attr: "WeaponAtkPlus", value: 75 },
    { name: "무기 공격력  +155", attr: "WeaponAtkPlus", value: 155 },
    { name: "무기 공격력  +57", attr: "WeaponAtkPlus", value: 57 },
    { name: "무기 공격력  +147", attr: "WeaponAtkPlus", value: 147 },
    { name: "무기 공격력  +285", attr: "WeaponAtkPlus", value: 285 },
    { name: "무기 공격력  +195", attr: "WeaponAtkPlus", value: 195 },
    { name: "무기 공격력  +480", attr: "WeaponAtkPlus", value: 480 },
    { name: "무기 공격력  +960", attr: "WeaponAtkPlus", value: 960 },

    { name: "무기 공격력  +0.46%", attr: "WeaponAtkPer", value: 0.46 },
    { name: "무기 공격력  +1.04%", attr: "WeaponAtkPer", value: 1.04 },
    { name: "무기 공격력  +1.72%", attr: "WeaponAtkPer", value: 1.72 },
    { name: "무기 공격력  +0.56%", attr: "WeaponAtkPer", value: 0.56 },
    { name: "무기 공격력  +1.26%", attr: "WeaponAtkPer", value: 1.26 },
    { name: "무기 공격력  +2.10%", attr: "WeaponAtkPer", value: 2.1 },
    { name: "무기 공격력  +0.80%", attr: "WeaponAtkPer", value: 0.8 },
    { name: "무기 공격력  +1.80%", attr: "WeaponAtkPer", value: 1.8 },
    { name: "무기 공격력  +3.00%", attr: "WeaponAtkPer", value: 3.0 },

    { name: "  공격력  +14", attr: "AtkPlus", value: 14 },
    { name: "  공격력  +33", attr: "AtkPlus", value: 33 },
    { name: "  공격력  +68", attr: "AtkPlus", value: 68 },
    { name: "  공격력  +24", attr: "AtkPlus", value: 24 },
    { name: "  공격력  +61", attr: "AtkPlus", value: 61 },
    { name: "  공격력  +118", attr: "AtkPlus", value: 118 },
    { name: "  공격력  +80", attr: "AtkPlus", value: 80 },
    { name: "  공격력  +195", attr: "AtkPlus", value: 195 },
    { name: "  공격력  +390", attr: "AtkPlus", value: 390 },

    { name: "공격력  +0.24%", attr: "AtkPer", value: 0.24 },
    { name: "공격력  +0.54%", attr: "AtkPer", value: 0.54 },
    { name: "공격력  +0.89%", attr: "AtkPer", value: 0.89 },
    { name: "공격력  +0.29%", attr: "AtkPer", value: 0.29 },
    { name: "공격력  +0.66%", attr: "AtkPer", value: 0.66 },
    { name: "공격력  +1.09%", attr: "AtkPer", value: 1.09 },
    { name: "공격력  +0.40%", attr: "AtkPer", value: 0.4 },
    { name: "공격력  +0.95%", attr: "AtkPer", value: 0.95 },
    { name: "공격력  +1.55%", attr: "AtkPer", value: 1.55 },

    { name: "치명타 적중률  +0.24%", attr: "CriticalChancePer", value: 0.24 },
    { name: "치명타 적중률  +0.54%", attr: "CriticalChancePer", value: 0.54 },
    { name: "치명타 적중률  +0.89%", attr: "CriticalChancePer", value: 0.89 },
    { name: "치명타 적중률  +0.29%", attr: "CriticalChancePer", value: 0.29 },
    { name: "치명타 적중률  +0.66%", attr: "CriticalChancePer", value: 0.66 },
    { name: "치명타 적중률  +1.09%", attr: "CriticalChancePer", value: 1.09 },
    { name: "치명타 적중률  +0.40%", attr: "CriticalChancePer", value: 0.4 },
    { name: "치명타 적중률  +0.95%", attr: "CriticalChancePer", value: 0.95 },
    { name: "치명타 적중률  +1.55%", attr: "CriticalChancePer", value: 1.55 },

    { name: "치명타 피해  +0.61%", attr: "CriticalDamagePer", value: 0.61 },
    { name: "치명타 피해  +1.38%", attr: "CriticalDamagePer", value: 1.38 },
    { name: "치명타 피해  +2.30%", attr: "CriticalDamagePer", value: 2.3 },
    { name: "치명타 피해  +0.74%", attr: "CriticalDamagePer", value: 0.74 },
    { name: "치명타 피해  +1.70%", attr: "CriticalDamagePer", value: 1.7 },
    { name: "치명타 피해  +2.82%", attr: "CriticalDamagePer", value: 2.82 },
    { name: "치명타 피해  +1.10%", attr: "CriticalDamagePer", value: 1.1 },
    { name: "치명타 피해  +2.40%", attr: "CriticalDamagePer", value: 2.4 },
    { name: "치명타 피해  +4.00%", attr: "CriticalDamagePer", value: 4.0 },

    { name: "세레나데, 신앙, 조화 게이지 획득량  +0.90%", attr: "IdentityUptime", value: 0.009 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +2.07%", attr: "IdentityUptime", value: 0.0207 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +3.45%", attr: "IdentityUptime", value: 0.0345 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +1.48%", attr: "IdentityUptime", value: 0.0148 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +3.36%", attr: "IdentityUptime", value: 0.0336 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +5.60%", attr: "IdentityUptime", value: 0.056 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +1.60%", attr: "IdentityUptime", value: 0.016 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +3.60%", attr: "IdentityUptime", value: 0.036 },
    { name: "세레나데, 신앙, 조화 게이지 획득량  +6.00%", attr: "IdentityUptime", value: 0.06 },

    { name: "낙인력  +1.20%", attr: "StigmaPer", value: 1.2 },
    { name: "낙인력  +2.76%", attr: "StigmaPer", value: 2.76 },
    { name: "낙인력  +4.60%", attr: "StigmaPer", value: 4.6 },
    { name: "낙인력  +1.48%", attr: "StigmaPer", value: 1.48 },
    { name: "낙인력  +3.36%", attr: "StigmaPer", value: 3.36 },
    { name: "낙인력  +5.60%", attr: "StigmaPer", value: 5.6 },
    { name: "낙인력  +2.15%", attr: "StigmaPer", value: 2.15 },
    { name: "낙인력  +4.80%", attr: "StigmaPer", value: 4.8 },
    { name: "낙인력  +8.00%", attr: "StigmaPer", value: 8.0 },

    { name: "아군 공격력 강화 효과  +0.76%", attr: "AtkBuff", value: 0.76 },
    { name: "아군 공격력 강화 효과  +1.72%", attr: "AtkBuff", value: 1.72 },
    { name: "아군 공격력 강화 효과  +2.88%", attr: "AtkBuff", value: 2.88 },
    { name: "아군 공격력 강화 효과  +0.92%", attr: "AtkBuff", value: 0.92 },
    { name: "아군 공격력 강화 효과  +2.12%", attr: "AtkBuff", value: 2.12 },
    { name: "아군 공격력 강화 효과  +3.52%", attr: "AtkBuff", value: 3.52 },
    { name: "아군 공격력 강화 효과  +1.35%", attr: "AtkBuff", value: 1.35 },
    { name: "아군 공격력 강화 효과  +3.00%", attr: "AtkBuff", value: 3.0 },
    { name: "아군 공격력 강화 효과  +5.00%", attr: "AtkBuff", value: 5.0 },

    { name: "아군 피해량 강화 효과  +1.14%", attr: "DamageBuff", value: 1.14 },
    { name: "아군 피해량 강화 효과  +2.58%", attr: "DamageBuff", value: 2.58 },
    { name: "아군 피해량 강화 효과  +4.32%", attr: "DamageBuff", value: 4.32 },
    { name: "아군 피해량 강화 효과  +1.38%", attr: "DamageBuff", value: 1.38 },
    { name: "아군 피해량 강화 효과  +3.18%", attr: "DamageBuff", value: 3.18 },
    { name: "아군 피해량 강화 효과  +5.28%", attr: "DamageBuff", value: 7.5 },
    { name: "아군 피해량 강화 효과  +2.00%", attr: "DamageBuff", value: 2.0 },
    { name: "아군 피해량 강화 효과  +4.50%", attr: "DamageBuff", value: 4.5 },
    { name: "아군 피해량 강화 효과  +7.50%", attr: "DamageBuff", value: 7.5 },

    { name: "파티원 보호막 효과  +0.54%", attr: "CarePower", value: 0.0054 },
    { name: "파티원 보호막 효과  +1.21%", attr: "CarePower", value: 0.0121 },
    { name: "파티원 보호막 효과  +2.01%", attr: "CarePower", value: 0.0201 },
    { name: "파티원 보호막 효과  +0.65%", attr: "CarePower", value: 0.0065 },
    { name: "파티원 보호막 효과  +1.47%", attr: "CarePower", value: 0.0147 },
    { name: "파티원 보호막 효과  +2.45%", attr: "CarePower", value: 0.0245 },
    { name: "파티원 보호막 효과  +0.95%", attr: "CarePower", value: 0.0095 },
    { name: "파티원 보호막 효과  +2.10%", attr: "CarePower", value: 0.021 },
    { name: "파티원 보호막 효과  +3.50%", attr: "CarePower", value: 0.035 },

    { name: "파티원 회복 효과  +0.54%", attr: "CarePower", value: 0.0054 },
    { name: "파티원 회복 효과  +1.21%", attr: "CarePower", value: 0.0121 },
    { name: "파티원 회복 효과  +2.01%", attr: "CarePower", value: 0.0201 },
    { name: "파티원 회복 효과  +0.65%", attr: "CarePower", value: 0.0065 },
    { name: "파티원 회복 효과  +1.47%", attr: "CarePower", value: 0.0147 },
    { name: "파티원 회복 효과  +2.45%", attr: "CarePower", value: 0.0245 },
    { name: "파티원 회복 효과  +0.95%", attr: "CarePower", value: 0.0095 },
    { name: "파티원 회복 효과  +2.10%", attr: "CarePower", value: 0.021 },
    { name: "파티원 회복 효과  +3.50%", attr: "CarePower", value: 0.035 },

    { name: "최대 생명력  +719", attr: "StatHp", value: 719 },
    { name: "최대 생명력  +1654", attr: "StatHp", value: 1654 },
    { name: "최대 생명력  +2756", attr: "StatHp", value: 2756 },
    { name: "최대 생명력  +992", attr: "StatHp", value: 992 },
    { name: "최대 생명력  +2253", attr: "StatHp", value: 2253 },
    { name: "최대 생명력  +3755", attr: "StatHp", value: 3755 },
    { name: "최대 생명력  +1300", attr: "StatHp", value: 1300 },
    { name: "최대 생명력  +3250", attr: "StatHp", value: 3250 },
    { name: "최대 생명력  +6500", attr: "StatHp", value: 6500 },

    { name: "최대 마나  +5", attr: "UtilityPower", value: 0.008 },
    { name: "최대 마나  +10", attr: "UtilityPower", value: 0.016 },
    { name: "최대 마나  +17", attr: "UtilityPower", value: 0.027 },
    { name: "최대 마나  +6", attr: "UtilityPower", value: 0.0096 },
    { name: "최대 마나  +13", attr: "UtilityPower", value: 0.021 },
    { name: "최대 마나  +21", attr: "UtilityPower", value: 0.034 },
    { name: "최대 마나  +15", attr: "UtilityPower", value: 0.024 },
    { name: "최대 마나  +30", attr: "UtilityPower", value: 0.048 },


]

// [딜러 : PUB = 유효 공용옵션 / SP1 = 특옵 1순위 / SP2 = 특옵 2순위 / DuelPuB = 서폿과 공용인 유효 공용옵션]
// [서폿 : SupPub = 유효 공용옵션 / DuelPub = 딜러와 공요인 유효 공용옵션 / Sup1 = 특옵 1순위 / Sup2 = 특옵 2순위 / Sup3 = 특옵3순위]
let elixirFilter = [

    "> 공격력 :pub",
    "> 무기 공격력 :DuelPub",
    "> 힘 :DuelPub",
    "> 민첩 :pub",
    "> 지능 :DuelPub",
    "> 행운 :sp",
    "> 강맹 :sp",
    "> 칼날방패 :sp",
    "> 선봉대 (질서) :sp1",
    "> 선봉대 (혼돈) :sp1",
    "> 선각자 (질서) :Sup1",
    "> 선각자 (혼돈) :Sup1",
    "> 진군 (질서) :Sup2",
    "> 진군 (혼돈) :Sup2",
    "> 신념 (질서) :Sup2",
    "> 신념 (혼돈) :Sup2",
    "> 회심 (질서) :sp1",
    "> 회심 (혼돈) :sp1",
    "> 달인 (질서) :sp1",
    "> 달인 (혼돈) :sp1",
    "> 보스 피해 :sp2",
    "> 치명타 피해 :sp2",
    "> 추가 피해 :sp2",
    "> 탈출의 달인 :zero",
    "> 회피의 달인 :zero",
    "> 마나 :SupPub",
    "> 생명의 축복 :zero",
    "> 자원의 축복 :zero",
    "> 방랑자 :zero",
    "> 무력화 :zero",
    "> 물약 중독 :zero",
    "> 폭발물 달인 :zero",
    "> 각성기 피해 :zero",
    "> 보호막 강화 :SupPub",
    "> 회복 강화 :zero",
    "> 최대 생명력 :SupPub",
    "> 받는 피해 감소 :zero",
    "> 물리 방어력 :zero",
    "> 마법 방어력 :zero",
    "> 아이덴티티 획득 :zero",
    "> 아군 강화 :Sup3",
]




let cardPointFilter = [
    '알고 보면:1',
    '너는 계획이 다 있구나:1',
    '에어가이츠 계획:1',
    '남겨진 바람의 절벽:2',
    '창의 달인:2',
    '몰아치는 뇌전의 가호:2',
    '세상을 구하는 빛:2',
    '카제로스의 군단장:2',
    '날랜 뇌전의 숨결:2',
    '굳센 대지의 숨결:2',
    '몰아치는 뇌전의 가호:2',
    '잠재우는 대지의 가호:2'
]




// 접두사 [딜러 : z = 무효 / P = 1티어 옵션 / L = 3티어 옵션 / F = 4티어 옵션 / DuelP = 1티어지만 서폿과 공용 옵션 / Duel = 2티어지만 서폿과 공용 옵션 / DuelL = 3티어지만 서폿과 공용 옵션] 
//        [서폿 : SpP = 1티어 옵션 / SpM =  2티어 옵션 / SpL = 3티어 옵션 / Sp = 4티어 옵션 / Duel = 딜러와 공용 옵션]
//        secondCheck의 경우 secondCheck명이 없는 경우 출력되도록 한다
let bangleFilter = [
    { name: "공격 및 이동 속도가", option: "3%", tier: "Flow1", initial: "공이속 +3%", atkSpeed: 3, moveSpeed: 3, finalDamagePer: 1.0 },
    { name: "공격 및 이동 속도가", option: "4%", tier: "Flow2", initial: "공이속 +4%", atkSpeed: 4, moveSpeed: 4, finalDamagePer: 1.2 },
    { name: "공격 및 이동 속도가", option: "5%", tier: "Fmiddle", initial: "공이속 +5%", atkSpeed: 5, moveSpeed: 5, finalDamagePer: 1.5 },
    { name: "공격 및 이동 속도가", option: "6%", tier: "Fhigh", initial: "공이속 +6%", atkSpeed: 6, moveSpeed: 6, finalDamagePer: 1.9 },

    { name: "치명타 적중률이", option: "2.6%", tier: "Plow1", initial: "치적 +2.6% | 치명타 주는 피해 +1.5%", criticalChancePer: 2.6, criFinalDamagePer: 1.5, finalDamagePer: 3.18 },
    { name: "치명타 적중률이", option: "3.4%", tier: "Plow2", initial: "치적 +3.4% | 치명타 주는 피해 +1.5%", criticalChancePer: 3.4, criFinalDamagePer: 1.5, finalDamagePer: 3.78 },
    { name: "치명타 적중률이", option: "4.2%", tier: "Pmiddle", initial: "치적 +4.2% | 치명타 주는 피해 +1.5%", criticalChancePer: 4.2, criFinalDamagePer: 1.5, finalDamagePer: 4.35 },
    { name: "치명타 적중률이", option: "5%", tier: "Phigh", initial: "치적 +5.0% | 치명타 주는 피해 +1.5%", criticalChancePer: 5, criFinalDamagePer: 1.5, finalDamagePer: 4.91 },

    { name: "치명타 피해가", option: "5.2%", tier: "Plow1", initial: "치피 +5.2% | 치명타 주는 피해 +1.5%", criticalDamagePer: 5.2, criFinalDamagePer: 1.5, finalDamagePer: 3.18 },
    { name: "치명타 피해가", option: "6.8%", tier: "Plow2", initial: "치피 +6.8% | 치명타 주는 피해 +1.5%", criticalDamagePer: 6.8, criFinalDamagePer: 1.5, finalDamagePer: 3.78 },
    { name: "치명타 피해가", option: "8.4%", tier: "Pmiddle", initial: "치피 +8.4% | 치명타 주는 피해 +1.5%", criticalDamagePer: 8.4, criFinalDamagePer: 1.5, finalDamagePer: 4.36 },
    { name: "치명타 피해가", option: "10%", tier: "Phigh", initial: "치피 +10.0% | 치명타 주는 피해 +1.5%", criticalDamagePer: 10, criFinalDamagePer: 1.5, finalDamagePer: 4.93 },

    { name: "적에게 주는 피해가", option: "1.5%", tier: "low1", initial: "적에게 주는 피해 +1.5%", secondCheck: "증가하며, 무력화 상태의 적에게 주는 피해가", finalDamagePer: 1.5 },
    { name: "적에게 주는 피해가", option: "2%", tier: "low2", initial: "적에게 주는 피해 +2%", secondCheck: "증가하며, 무력화 상태의 적에게 주는 피해가", finalDamagePer: 2 },
    { name: "적에게 주는 피해가", option: "2.5%", tier: "middle", initial: "적에게 주는 피해 +2.5%", secondCheck: "증가하며, 무력화 상태의 적에게 주는 피해가", finalDamagePer: 2.5 },
    { name: "적에게 주는 피해가", option: "3%", tier: "high", initial: "적에게 주는 피해 +3%", secondCheck: "증가하며, 무력화 상태의 적에게 주는 피해가", finalDamagePer: 3 },

    { name: "증가하며, 무력화 상태의 적에게 주는 피해가", option: "3.5%", tier: "zlow1", initial: "적주피 +1.5% | 무력화 적 피해량 +3.5%", finalDamagePer: 1.5 },
    { name: "증가하며, 무력화 상태의 적에게 주는 피해가", option: "4%", tier: "zlow2", initial: "적주피 +2% | 무력화 적 피해량 +4%", finalDamagePer: 2 },
    { name: "증가하며, 무력화 상태의 적에게 주는 피해가", option: "4.5%", tier: "zmiddle", initial: "적주피 +2.5% | 무력화 적 피해량 +4.5%", finalDamagePer: 2.5 },
    { name: "증가하며, 무력화 상태의 적에게 주는 피해가", option: "5%", tier: "zhigh", initial: "적주피 +3% | 무력화 적 피해량 +5%", finalDamagePer: 3 },

    { name: "증가하지만, 적에게 주는 피해가", option: "4%", tier: "Plow1", initial: "쿨 +2% | 적에게 주는 피해 +4.0%", skillCool: 0.02, finalDamagePer: 1.96 },
    { name: "증가하지만, 적에게 주는 피해가", option: "4.5%", tier: "Plow2", initial: "쿨 +2% | 적에게 주는 피해 +4.5%", skillCool: 0.02, finalDamagePer: 2.45 },
    { name: "증가하지만, 적에게 주는 피해가", option: "5%", tier: "Pmiddle", initial: "쿨 +2% | 적에게 주는 피해 +5.0%", skillCool: 0.02, finalDamagePer: 2.94 },
    { name: "증가하지만, 적에게 주는 피해가", option: "5.5%", tier: "Phigh", initial: "쿨 +2% | 적에게 주는 피해 +5.5%", skillCool: 0.02, finalDamagePer: 3.43 },

    { name: "추가 피해가", option: "2%", tier: "Plow1", initial: "추피 +2.0% | 악마&대악마 피해량 +2.5%", addDamagePer: 2, devilDamagePer: 2.5 },
    { name: "추가 피해가", option: "2.5%", tier: "Plow2", initial: "추피 +2.5% | 악마&대악마 피해량 +2.5%", addDamagePer: 2.5, devilDamagePer: 2.5 },
    { name: "추가 피해가", option: "3%", tier: "Pmiddle", initial: "추피 +3.0% | 악마&대악마 피해량 +2.5%", addDamagePer: 3, devilDamagePer: 2.5  },
    { name: "추가 피해가", option: "3.5%", tier: "Phigh", initial: "추피 +3.5% | 악마&대악마 피해량 +2.5%", addDamagePer: 3.5, devilDamagePer: 2.5  },

    { name: "공격 적중 시 매 초마다 10초 동안 무기 공격력이", option: "1000", tier: "DuelLlow1", initial: "공격 적중 시 무공 1000, 공이속 1% 증가", finalDamagePer: 1.9, weaponAtkPlus: 0, weaponAtkBonus: 6000 },
    { name: "공격 적중 시 매 초마다 10초 동안 무기 공격력이", option: "1160", tier: "DuelLlow2", initial: "공격 적중 시 무공 1160, 공이속 1% 증가", finalDamagePer: 1.9, weaponAtkPlus: 0, weaponAtkBonus: 6960 },
    { name: "공격 적중 시 매 초마다 10초 동안 무기 공격력이", option: "1320", tier: "DuelLmiddle", initial: "공격 적중 시 무공 1320, 공이속 1% 증가", finalDamagePer: 1.9, weaponAtkPlus: 0, weaponAtkBonus: 7920 },
    { name: "공격 적중 시 매 초마다 10초 동안 무기 공격력이", option: "1480", tier: "DuelLhigh", initial: "공격 적중 시 무공 1480, 공이속 1% 증가", finalDamagePer: 1.9, weaponAtkPlus: 0, weaponAtkBonus: 8880 },

    { name: "무기 공격력이", option: "6300", tier: "DuelPlow1", initial: "무공 6300 증가 | 조건부 무공 1800 증가", weaponAtkPlus: 8100 },
    { name: "무기 공격력이", option: "7200", tier: "DuelPlow2", initial: "무공 7200 증가 | 조건부 무공 2000 증가", weaponAtkPlus: 9200 },
    { name: "무기 공격력이", option: "8100", tier: "DuelPmiddle", initial: "무공 8100 증가 | 조건부 무공 2200 증가", weaponAtkPlus: 10300 },
    { name: "무기 공격력이", option: "9000", tier: "DuelPhigh", initial: "무공 9000 증가 | 조건부 무공 2400 증가", weaponAtkPlus: 11400 },

    { name: "무기 공격력이", option: "6000", tier: "Duellow1", initial: "무공 6000 증가 | 스택당 무공 120 증가", weaponAtkPlus: 6000, weaponAtkBonus: 1020 },
    { name: "무기 공격력이", option: "6900", tier: "Duellow2", initial: "무공 6900 증가 | 스택당 무공 130 증가", weaponAtkPlus: 6900, weaponAtkBonus: 1105 },
    { name: "무기 공격력이", option: "7800", tier: "Duelmiddle", initial: "무공 7800 증가 | 스택당 무공 140 증가", weaponAtkPlus: 7800, weaponAtkBonus: 1190 },
    { name: "무기 공격력이", option: "8700", tier: "Duelhigh", initial: "무공 8700 증가 | 스택당 무공 150 증가", weaponAtkPlus: 8700, weaponAtkBonus: 1275 },

    { name: "백어택 스킬이 적에게 주는 피해가", option: "2%", tier: "low1", initial: "백어택 스킬 피해 +2.0%", finalDamagePer: 2 },
    { name: "백어택 스킬이 적에게 주는 피해가", option: "2.5%", tier: "low2", initial: "백어택 스킬 피해 +2.5%", finalDamagePer: 2.5 },
    { name: "백어택 스킬이 적에게 주는 피해가", option: "3%", tier: "middle", initial: "백어택 스킬 피해 +3.0%", finalDamagePer: 3 },
    { name: "백어택 스킬이 적에게 주는 피해가", option: "3.5%", tier: "high", initial: "백어택 스킬 피해 +3.5%", finalDamagePer: 3.5 },

    { name: "헤드어택 스킬이 적에게 주는 피해가", option: "2%", tier: "low1", initial: "헤드어택 스킬 피해 +2.0%", finalDamagePer: 2 },
    { name: "헤드어택 스킬이 적에게 주는 피해가", option: "2.5%", tier: "low2", initial: "헤드어택 스킬 피해 +2.5%", finalDamagePer: 2.5 },
    { name: "헤드어택 스킬이 적에게 주는 피해가", option: "3%", tier: "middle", initial: "헤드어택 스킬 피해 +3.0%", finalDamagePer: 3 },
    { name: "헤드어택 스킬이 적에게 주는 피해가", option: "3.5%", tier: "high", initial: "헤드어택 스킬 피해 +3.5%", finalDamagePer: 3.5 },

    { name: "방향성 공격이 아닌 스킬이 적에게 주는 피해가", option: "2%", tier: "low1", initial: "타대 스킬 피해 +2.0%", finalDamagePer: 2 },
    { name: "방향성 공격이 아닌 스킬이 적에게 주는 피해가", option: "2.5%", tier: "low2", initial: "타대 스킬 피해 +2.5%", finalDamagePer: 2.5 },
    { name: "방향성 공격이 아닌 스킬이 적에게 주는 피해가", option: "3%", tier: "middle", initial: "타대 스킬 피해 +3.0%", finalDamagePer: 3 },
    { name: "방향성 공격이 아닌 스킬이 적에게 주는 피해가", option: "3.5%", tier: "high", initial: "타대 스킬 피해 +3.5%", finalDamagePer: 3.5 },

    { name: "추가 피해", option: "+2.50%", tier: "Llow1", initial: "추가 피해 +2.5%", addDamagePer: 2.5 },
    { name: "추가 피해", option: "+3.00%", tier: "Llow2", initial: "추가 피해 +3.0%", addDamagePer: 3 },
    { name: "추가 피해", option: "+3.50%", tier: "Lmiddle", initial: "추가 피해 +3.5%", addDamagePer: 3.5 },
    { name: "추가 피해", option: "+4.00%", tier: "Lhigh", initial: "추가 피해 +4.0%", addDamagePer: 4 },

    { name: "아군 공격력 강화 효과", option: "+3.00%", tier: "SpLlow1", initial: "아군 공격력 강화 +3.0%", atkBuff: 3 },
    { name: "아군 공격력 강화 효과", option: "+4.00%", tier: "SpLlow2", initial: "아군 공격력 강화 +4.0%", atkBuff: 4 },
    { name: "아군 공격력 강화 효과", option: "+5.00%", tier: "SpLmiddle", initial: "아군 공격력 강화 +5.0%", atkBuff: 5 },
    { name: "아군 공격력 강화 효과", option: "+6.00%", tier: "SpLhigh", initial: "아군 공격력 강화 +6.0%", atkBuff: 6 },

    { name: "아군 피해량 강화 효과", option: "+4.50%", tier: "SpLlow1", initial: "아군 피해량 강화 +4.5%", damageBuff: 4.5 },
    { name: "아군 피해량 강화 효과", option: "+6.00%", tier: "SpLlow2", initial: "아군 피해량 강화 +6.0%", damageBuff: 6 },
    { name: "아군 피해량 강화 효과", option: "+7.50%", tier: "SpLmiddle", initial: "아군 피해량 강화 +7.5%", damageBuff: 7.5 },
    { name: "아군 피해량 강화 효과", option: "+9.00%", tier: "SpLhigh", initial: "아군 피해량 강화 +9.0%", damageBuff: 9 },

    { name: "치명타 적중률", option: "+2.60%", tier: "low1", initial: "치명타 적중률 +2.60%", criticalChancePer: 2.6, finalDamagePer: 1.75 },
    { name: "치명타 적중률", option: "+3.40%", tier: "low2", initial: "치명타 적중률 +3.40%", criticalChancePer: 3.4, finalDamagePer: 2.38 },
    { name: "치명타 적중률", option: "+4.20%", tier: "middle", initial: "치명타 적중률 +4.20%", criticalChancePer: 4.2, finalDamagePer: 2.944 },
    { name: "치명타 적중률", option: "+5.00%", tier: "high", initial: "치명타 적중률 +5.00%", criticalChancePer: 5, finalDamagePer: 3.5 },

    { name: "치명타 피해", option: "+5.20%", tier: "low1", initial: "치명타 피해 +5.2%", criticalDamagePer: 5.2, finalDamagePer: 1.75 },
    { name: "치명타 피해", option: "+6.80%", tier: "low2", initial: "치명타 피해 +6.8%", criticalDamagePer: 6.8, finalDamagePer: 2.38 },
    { name: "치명타 피해", option: "+8.40%", tier: "middle", initial: "치명타 피해 +8.4%", criticalDamagePer: 8.4, finalDamagePer: 2.95 },
    { name: "치명타 피해", option: "+10.00%", tier: "high", initial: "치명타 피해 +10.0%", criticalDamagePer: 10, finalDamagePer: 3.51 },

    { name: "무기 공격력", option: "+6300", tier: "Duellow1", initial: "무기 공격력 +6300", weaponAtkPlus: 6300 },
    { name: "무기 공격력", option: "+7200", tier: "Duellow2", initial: "무기 공격력 +7200", weaponAtkPlus: 7200 },
    { name: "무기 공격력", option: "+8100", tier: "Duelmiddle", initial: "무기 공격력 +8100", weaponAtkPlus: 8100 },
    { name: "무기 공격력", option: "+9000", tier: "Duelhigh", initial: "무기 공격력 +9000", weaponAtkPlus: 9000 },

    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "1.5%", tier: "SpMlow1", initial: "방깎 1.5% | 아공강 +1.5%", atkBuff: 1.5, atkBuffPlus: 0.75, finalDamagePer: 0.75 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "1.8%", tier: "SpMlow2", initial: "방깎 1.8% | 아공강 +2.0%", atkBuff: 2, atkBuffPlus: 0.99, finalDamagePer: 0.99 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "2.1%", tier: "SpMmiddle", initial: "방깎 2.1% | 아공강 +2.5%", atkBuff: 2.5, atkBuffPlus: 1.21, finalDamagePer: 1.21 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "2.5%", tier: "SpMhigh", initial: "방깎 2.5% | 아공강 +3.0%", atkBuff: 3, atkBuffPlus: 1.43, finalDamagePer: 1.43 },

    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "1.5%", tier: "SpPlow1", initial: "치명타 저항 -1.5% | 아공강 +1.5%", criticalChanceMinus: 1.5, atkBuff: 1.5, atkBuffPlus: 1.0875, finalDamagePer: 1.0875 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "1.8%", tier: "SpPlow2", initial: "치명타 저항 -1.8% | 아공강 +2.0%", criticalChanceMinus: 1.8, atkBuff: 2, atkBuffPlus: 1.305, finalDamagePer: 1.305 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "2.1%", tier: "SpPmiddle", initial: "치명타 저항 -2.1% | 아공강 +2.5%", criticalChanceMinus: 2.1, atkBuff: 2.5, atkBuffPlus: 1.5225, finalDamagePer: 1.5225 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "2.5%", tier: "SpPhigh", initial: "치명타 저항 -2.5% | 아공강 +3.0%", criticalChanceMinus: 2.5, atkBuff: 3, atkBuffPlus: 1.76, finalDamagePer: 1.76 },

    { name: "파티 효과로 보호 효과(보호막, 생명력 회복, 받는 피해 감소)가 적용된 대상이 5초 동안 적에게 주는 피해가", option: "0.7%", tier: "SpMlow1", initial: "보호 대상 피해량 +0.7% | 아공강 +1.5%", shieldBuff: 0.7, atkBuff: 1.5, atkBuffPlus: 0.7, finalDamagePer: 0.7 },
    { name: "파티 효과로 보호 효과(보호막, 생명력 회복, 받는 피해 감소)가 적용된 대상이 5초 동안 적에게 주는 피해가", option: "0.9%", tier: "SpMlow2", initial: "보호 대상 피해량 +0.9% | 아공강 +2.0%", shieldBuff: 0.9, atkBuff: 2, atkBuffPlus: 0.9, finalDamagePer: 0.9 },
    { name: "파티 효과로 보호 효과(보호막, 생명력 회복, 받는 피해 감소)가 적용된 대상이 5초 동안 적에게 주는 피해가", option: "1.1%", tier: "SpMmiddle", initial: "보호 대상 피해량 +1.1% | 아공강 +2.5%", shieldBuff: 1.1, atkBuff: 2.5, atkBuffPlus: 1.1, finalDamagePer: 1.1 },
    { name: "파티 효과로 보호 효과(보호막, 생명력 회복, 받는 피해 감소)가 적용된 대상이 5초 동안 적에게 주는 피해가", option: "1.3%", tier: "SpMhigh", initial: "보호 대상 피해량 +1.3% | 아공강 +3.0%", shieldBuff: 1.3, atkBuff: 3, atkBuffPlus: 1.3, finalDamagePer: 1.3 },

    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 피해 저항을", option: "3%", tier: "SpMlow1", initial: "치명타 피해 저항 -3.0% | 아공강 +1.5%", criticalDamageMinus: 3, atkBuff: 1.5, atkBuffPlus: 1.0875, finalDamagePer: 1.0875 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 피해 저항을", option: "3.6%", tier: "SpMlow2", initial: "치명타 피해 저항 -3.6% | 아공강 +2.0%", criticalDamageMinus: 3.6, atkBuff: 2, atkBuffPlus: 1.305, finalDamagePer: 1.305 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 피해 저항을", option: "4.2%", tier: "SpMmiddle", initial: "치명타 피해 저항 -4.2% | 아공강 +2.5%", criticalDamageMinus: 4.2, atkBuff: 2.5, atkBuffPlus: 1.5225, finalDamagePer: 1.5225 },
    { name: "몬스터에게 공격 적중 시 8초 동안 대상의 치명타 피해 저항을", option: "4.8%", tier: "SpMhigh", initial: "치명타 피해 저항 -4.8% | 아공강 +3.0%", criticalDamageMinus: 4.8, atkBuff: 3, atkBuffPlus: 1.74, finalDamagePer: 1.74 },

    { name: "시드 등급 이하 몬스터에게 주는 피해량이", option: "3%", tier: "zlow1", initial: "시드 이하 몬스터에게 주는 피해량 +3%" },
    { name: "시드 등급 이하 몬스터에게 주는 피해량이", option: "4%", tier: "zlow2", initial: "시드 이하 몬스터에게 주는 피해량 +4%" },
    { name: "시드 등급 이하 몬스터에게 주는 피해량이", option: "5%", tier: "zmiddle", initial: "시드 이하 몬스터에게 주는 피해량 +5%" },
    { name: "시드 등급 이하 몬스터에게 주는 피해량이", option: "6%", tier: "zhigh", initial: "시드 이하 몬스터에게 주는 피해량 +6%" },
    { name: "시드 등급 이하 몬스터에게 받는 피해량이", option: "4%", tier: "zlow1", initial: "시드 이하 몬스터에게 받는 피해량 +4%" },
    { name: "시드 등급 이하 몬스터에게 받는 피해량이", option: "6%", tier: "zlow2", initial: "시드 이하 몬스터에게 받는 피해량 +6%" },
    { name: "시드 등급 이하 몬스터에게 받는 피해량이", option: "8%", tier: "zmiddle", initial: "시드 이하 몬스터에게 받는 피해량 +8%" },
    { name: "시드 등급 이하 몬스터에게 받는 피해량이", option: "10%", tier: "zhigh", initial: "시드 이하 몬스터에게 받는 피해량 +10%" },
    { name: "물리 방어력 +4000", option: null, tier: "zlow1", initial: "물리 방어력 +4000" },
    { name: "물리 방어력 +5000", option: null, tier: "zlow2", initial: "물리 방어력 +5000" },
    { name: "물리 방어력 +6000", option: null, tier: "zmiddle", initial: "물리 방어력 +6000" },
    { name: "물리 방어력 +7000", option: null, tier: "zhigh", initial: "물리 방어력 +7000" },
    { name: "마법 방어력 +4000", option: null, tier: "zlow1", initial: "마법 방어력 +4000" },
    { name: "마법 방어력 +5000", option: null, tier: "zlow2", initial: "마법 방어력 +5000" },
    { name: "마법 방어력 +6000", option: null, tier: "zmiddle", initial: "마법 방어력 +6000" },
    { name: "마법 방어력 +7000", option: null, tier: "zhigh", initial: "마법 방어력 +7000" },
    { name: "최대 생명력 +8400", option: null, tier: "zlow1", initial: "최대 생명력 +8400", statHp: 8400 },
    { name: "최대 생명력 +11200", option: null, tier: "zlow2", initial: "최대 생명력 +11200", statHp: 11200 },
    { name: "최대 생명력 +14000", option: null, tier: "zmiddle", initial: "최대 생명력 +14000", statHp: 14000 },
    { name: "최대 생명력 +16800", option: null, tier: "zhigh", initial: "최대 생명력 +16800", statHp: 16800 },
    { name: "전투 중 생명력 회복량 +80", option: null, tier: "zlow1", initial: "전투 중 생명력 회복량 +80" },
    { name: "전투 중 생명력 회복량 +100", option: null, tier: "zlow2", initial: "전투 중 생명력 회복량 +100" },
    { name: "전투 중 생명력 회복량 +130", option: null, tier: "zmiddle", initial: "전투 중 생명력 회복량 +130" },
    { name: "전투 중 생명력 회복량 +160", option: null, tier: "zhigh", initial: "전투 중 생명력 회복량 +160" },
    { name: "전투자원 자연 회복량 +6.00%", option: null, tier: "zlow1", initial: "전투자원 자연 회복량 +6%" },
    { name: "전투자원 자연 회복량 +8.00%", option: null, tier: "zlow2", initial: "전투자원 자연 회복량 +8%" },
    { name: "전투자원 자연 회복량 +10.00%", option: null, tier: "zmiddle", initial: "전투자원 자연 회복량 +10%" },
    { name: "전투자원 자연 회복량 +12.00%", option: null, tier: "zhigh", initial: "전투자원 자연 회복량 +12%" },
    { name: "이동기 및 기상기 재사용 대기 시간이", option: "6%", tier: "zlow1", initial: "이동기 및 기상기 쿨감 +6%" },
    { name: "이동기 및 기상기 재사용 대기 시간이", option: "8%", tier: "zlow2", initial: "이동기 및 기상기 쿨감 +8%" },
    { name: "이동기 및 기상기 재사용 대기 시간이", option: "10%", tier: "zmiddle", initial: "이동기 및 기상기 쿨감 +10%" },
    { name: "이동기 및 기상기 재사용 대기 시간이", option: "12%", tier: "zhigh", initial: "이동기 및 기상기 쿨감 +12%" },
    { name: "공격 적중 시", option: "90", tier: "zlow1", initial: "공격 적중 시 90초간 경피면" },
    { name: "공격 적중 시", option: "80", tier: "zlow2", initial: "공격 적중 시 80초간 경피면" },
    { name: "공격 적중 시", option: "70", tier: "zmiddle", initial: "공격 적중 시 70초간 경피면" },
    { name: "공격 적중 시", option: "60", tier: "zhigh", initial: "공격 적중 시 60초간 경피면" },
    { name: "파티원 보호 및 회복 효과가", option: "2%", tier: "Splow1", initial: "보호 및 회복 효과 +2.0%", carePower: 0.02 },
    { name: "파티원 보호 및 회복 효과가", option: "2.5%", tier: "Splow2", initial: "보호 및 회복 효과 +2.5%", carePower: 0.025 },
    { name: "파티원 보호 및 회복 효과가", option: "3%", tier: "Spmiddle", initial: "보호 및 회복 효과 +3.0%", carePower: 0.03 },
    { name: "파티원 보호 및 회복 효과가", option: "3.5%", tier: "Sphigh", initial: "보호 및 회복 효과 +3.5%", carePower: 0.035 },
    //아래로 3T 옵션
    { name: "최대 생명력 +5500", option: null, tier: "zlow1", initial: "최대 생명력 +5500", statHp: 5500 },
    { name: "최대 생명력 +7300", option: null, tier: "zlow2", initial: "최대 생명력 +7300", statHp: 7300 },
    { name: "최대 생명력 +9100", option: null, tier: "zmiddle", initial: "최대 생명력 +9100", statHp: 9100 },
    { name: "최대 생명력 +11000", option: null, tier: "zhigh", initial: "최대 생명력 +11000", statHp: 11000 },
    { name: "최대 마나 +150", option: null, tier: "zlow1", initial: "최대 마나 +150" },
    { name: "최대 마나 +200", option: null, tier: "zlow2", initial: "최대 마나 +200" },
    { name: "최대 마나 +250", option: null, tier: "zmiddle", initial: "최대 마나 +250" },
    { name: "최대 마나 +300", option: null, tier: "zhigh", initial: "최대 마나 +300" },
    { name: "물리 방어력 +500", option: null, tier: "zlow1", initial: "물리 방어력 +500" },
    { name: "물리 방어력 +1200", option: null, tier: "zlow2", initial: "물리 방어력 +1200" },
    { name: "물리 방어력 +2500", option: null, tier: "zmiddle", initial: "물리 방어력 +2500" },
    { name: "물리 방어력 +4000", option: null, tier: "zhigh", initial: "물리 방어력 +4000" },
    { name: "] 기상기 사용 후 4초 동안 인내가", option: "100", tier: "zlow1", initial: "오뚝이" },
    { name: "] 기상기 사용 후 4초 동안 인내가", option: "130", tier: "zlow2", initial: "오뚝이" },
    { name: "] 기상기 사용 후 4초 동안 인내가", option: "160", tier: "zmiddle", initial: "오뚝이" },
    { name: "] 기상기 사용 후 4초 동안 인내가", option: "200", tier: "zhigh", initial: "오뚝이" },
    { name: "] 이동기 사용 후 4초 동안 신속이", option: "50", tier: "zlow1", initial: "돌진" },
    { name: "] 이동기 사용 후 4초 동안 신속이", option: "65", tier: "zlow2", initial: "돌진" },
    { name: "] 이동기 사용 후 4초 동안 신속이", option: "80", tier: "zmiddle", initial: "돌진" },
    { name: "] 이동기 사용 후 4초 동안 신속이", option: "100", tier: "zhigh", initial: "돌진" },
    { name: "] 이동기 사용 후 4초 동안 제압이", option: "50", tier: "zlow1", initial: "강타" },
    { name: "] 이동기 사용 후 4초 동안 제압이", option: "65", tier: "zlow2", initial: "강타" },
    { name: "] 이동기 사용 후 4초 동안 제압이", option: "80", tier: "zmiddle", initial: "강타" },
    { name: "] 이동기 사용 후 4초 동안 제압이", option: "100", tier: "zhigh", initial: "강타" },
    { name: "] 기본 공격 적중 후 4초 동안 숙련이", option: "100", tier: "zlow1", initial: "타격" },
    { name: "] 기본 공격 적중 후 4초 동안 숙련이", option: "130", tier: "zlow2", initial: "타격" },
    { name: "] 기본 공격 적중 후 4초 동안 숙련이", option: "160", tier: "zmiddle", initial: "타격" },
    { name: "] 기본 공격 적중 후 4초 동안 숙련이", option: "200", tier: "zhigh", initial: "타격" },
    { name: "] 마나를 소모하는 스킬 사용 시 20% 확률로 마나를", option: "125", tier: "Splow1", initial: "마나회수" },
    { name: "] 마나를 소모하는 스킬 사용 시 20% 확률로 마나를", option: "150", tier: "Splow2", initial: "마나회수" },
    { name: "] 마나를 소모하는 스킬 사용 시 20% 확률로 마나를", option: "175", tier: "Spmiddle", initial: "마나회수" },
    { name: "] 마나를 소모하는 스킬 사용 시 20% 확률로 마나를", option: "200", tier: "Sphigh", initial: "마나회수" },
    { name: "] 몬스터에게 피격 시", option: "7%", tier: "zlow1", initial: "속공" },
    { name: "] 몬스터에게 피격 시", option: "10%", tier: "zlow2", initial: "속공" },
    { name: "] 몬스터에게 피격 시", option: "12%", tier: "zmiddle", initial: "속공" },
    { name: "] 몬스터에게 피격 시", option: "15%", tier: "zhigh", initial: "속공" },
    { name: "] 배틀 아이템 사용 후 8초 동안 무기 공격력이", option: "1300", tier: "zlow1", initial: "투자" },
    { name: "] 배틀 아이템 사용 후 8초 동안 무기 공격력이", option: "1600", tier: "zlow2", initial: "투자" },
    { name: "] 배틀 아이템 사용 후 8초 동안 무기 공격력이", option: "2200", tier: "zmiddle", initial: "투자" },
    { name: "] 배틀 아이템 사용 후 8초 동안 무기 공격력이", option: "3000", tier: "zhigh", initial: "투자" },
    { name: "] 생명력이", option: "10%", tier: "zlow1", initial: "반전" },
    { name: "] 생명력이", option: "15%", tier: "zlow2", initial: "반전" },
    { name: "] 생명력이", option: "20%", tier: "zmiddle", initial: "반전" },
    { name: "] 생명력이", option: "25%", tier: "zhigh", initial: "반전" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 주는 피해량이", option: "2%", tier: "zlow1", initial: "멸시" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 주는 피해량이", option: "3%", tier: "zlow2", initial: "멸시" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 주는 피해량이", option: "4%", tier: "zmiddle", initial: "멸시" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 주는 피해량이", option: "5%", tier: "zhigh", initial: "멸시" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 받는 피해량이", option: "3%", tier: "zlow1", initial: "무시" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 받는 피해량이", option: "5%", tier: "zlow2", initial: "무시" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 받는 피해량이", option: "7%", tier: "zmiddle", initial: "무시" },
    { name: "] 60레벨 이하 시드 등급 이하 몬스터에게 받는 피해량이", option: "10%", tier: "zhigh", initial: "무시" },
    { name: "전투 중 생명력 회복량 +40", option: null, tier: "zlow1" },
    { name: "전투 중 생명력 회복량 +50", option: null, tier: "zlow2" },
    { name: "전투 중 생명력 회복량 +65", option: null, tier: "zmiddle" },
    { name: "전투 중 생명력 회복량 +80", option: null, tier: "high" },
    { name: "] 기상기 사용 후 20초 동안 매 초마다 생명력을", option: "80", tier: "zlow1", initial: "회생" },
    { name: "] 기상기 사용 후 20초 동안 매 초마다 생명력을", option: "100", tier: "zlow2", initial: "회생" },
    { name: "] 기상기 사용 후 20초 동안 매 초마다 생명력을", option: "130", tier: "zmiddle", initial: "회생" },
    { name: "] 기상기 사용 후 20초 동안 매 초마다 생명력을", option: "160", tier: "zhigh", initial: "회생" },
    { name: "] 생명력이 50% 이하일 경우 몬스터에게 피격 시 30% 확률로 생명력을", option: "90", tier: "zlow1", initial: "긴급수혈" },
    { name: "] 생명력이 50% 이하일 경우 몬스터에게 피격 시 30% 확률로 생명력을", option: "80", tier: "zlow2", initial: "긴급수혈" },
    { name: "] 생명력이 50% 이하일 경우 몬스터에게 피격 시 30% 확률로 생명력을", option: "70", tier: "zmiddle", initial: "긴급수혈" },
    { name: "] 생명력이 50% 이하일 경우 몬스터에게 피격 시 30% 확률로 생명력을", option: "60", tier: "zhigh", initial: "긴급수혈" },
    { name: "] 생명력이 30% 이하에서 피격 시 5초 동안 회복 배틀 아이템의 회복량을", option: "4000", tier: "zlow1", initial: "응급처치" },
    { name: "] 생명력이 30% 이하에서 피격 시 5초 동안 회복 배틀 아이템의 회복량을", option: "5000", tier: "zlow2", initial: "응급처치" },
    { name: "] 생명력이 30% 이하에서 피격 시 5초 동안 회복 배틀 아이템의 회복량을", option: "6500", tier: "zmiddle", initial: "응급처치" },
    { name: "] 생명력이 30% 이하에서 피격 시 5초 동안 회복 배틀 아이템의 회복량을", option: "8000", tier: "zhigh", initial: "응급처치" },
    { name: "] 배틀 아이템 중 회복계열 사용 시", option: "12%", tier: "zlow1", initial: "앵콜" },
    { name: "] 배틀 아이템 중 회복계열 사용 시", option: "16%", tier: "zlow2", initial: "앵콜" },
    { name: "] 배틀 아이템 중 회복계열 사용 시", option: "20%", tier: "zmiddle", initial: "앵콜" },
    { name: "] 배틀 아이템 중 회복계열 사용 시", option: "25%", tier: "zhigh", initial: "앵콜" },
    { name: "쐐기 : 공격 적중 시 추가 피해가", option: "0.3%", tier: "low1", initial: "쐐기", addDamagePer: 1.2 },
    { name: "쐐기 : 공격 적중 시 추가 피해가", option: "0.35%", tier: "low2", initial: "쐐기", addDamagePer: 1.4 },
    { name: "쐐기 : 공격 적중 시 추가 피해가", option: "0.45%", tier: "middle", initial: "쐐기", addDamagePer: 1.8 },
    { name: "쐐기 : 공격 적중 시 추가 피해가", option: "0.5%", tier: "high", initial: "쐐기", addDamagePer: 2 },
    { name: "망치 : 공격 적중 시 치명타 피해량이", option: "6%", tier: "low1", initial: "망치", criticalDamagePer: 6, finalDamagePer: 2.2 },
    { name: "망치 : 공격 적중 시 치명타 피해량이", option: "8%", tier: "low2", initial: "망치", criticalDamagePer: 8, finalDamagePer: 2.9 },
    { name: "망치 : 공격 적중 시 치명타 피해량이", option: "10%", tier: "middle", initial: "망치", criticalDamagePer: 10, finalDamagePer: 3.6 },
    { name: "망치 : 공격 적중 시 치명타 피해량이", option: "12%", tier: "high", initial: "망치", criticalDamagePer: 12, finalDamagePer: 4.3 },
    { name: "순환 : 10초 간격으로 스킬 피해", option: "2.5%", tier: "low1", initial: "순환", finalDamagePer: 2.5, criticalChancePer: 1.4, criticalDamagePer: 2 },
    { name: "순환 : 10초 간격으로 스킬 피해", option: "3%", tier: "low2", initial: "순환", finalDamagePer: 3.1, criticalChancePer: 1.7, criticalDamagePer: 2.7 },
    { name: "순환 : 10초 간격으로 스킬 피해", option: "3.5%", tier: "middle", initial: "순환", finalDamagePer: 3.75, criticalChancePer: 2, criticalDamagePer: 3.4 },
    { name: "순환 : 10초 간격으로 스킬 피해", option: "4%", tier: "high", initial: "순환", finalDamagePer: 4.4, criticalChancePer: 2.4, criticalDamagePer: 4 },
    { name: "열정 : 몬스터에게 주는 피해가", option: "2.5%", tier: "low1", initial: "열정", finalDamagePer: 2.5 },
    { name: "열정 : 몬스터에게 주는 피해가", option: "3%", tier: "low2", initial: "열정", finalDamagePer: 3 },
    { name: "열정 : 몬스터에게 주는 피해가", option: "3.5%", tier: "middle", initial: "열정", finalDamagePer: 3.5 },
    { name: "열정 : 몬스터에게 주는 피해가", option: "4%", tier: "high", initial: "열정", finalDamagePer: 4 },
    { name: "냉정 : 몬스터에게 주는 피해가", option: "2.5%", tier: "low1", initial: "냉정", finalDamagePer: 2.5 },
    { name: "냉정 : 몬스터에게 주는 피해가", option: "3%", tier: "low2", initial: "냉정", finalDamagePer: 3 },
    { name: "냉정 : 몬스터에게 주는 피해가", option: "3.5%", tier: "middle", initial: "냉정", finalDamagePer: 3.5 },
    { name: "냉정 : 몬스터에게 주는 피해가", option: "4%", tier: "high", initial: "냉정", finalDamagePer: 4 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 스킬 적중 시 아이덴티티 게이지 획득량이", option: "3%", tier: "zlow1", initial: "깨달음" },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 스킬 적중 시 아이덴티티 게이지 획득량이", option: "4%", tier: "zlow2", initial: "깨달음" },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 스킬 적중 시 아이덴티티 게이지 획득량이", option: "5%", tier: "zmiddle", initial: "깨달음" },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 스킬 적중 시 아이덴티티 게이지 획득량이", option: "6%", tier: "zhigh", initial: "깨달음" },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "1.5%", tier: "SpMlow1", initial: "비수", atkBuffPlus: 0.92 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "1.8%", tier: "SpMlow2", initial: "비수", atkBuffPlus: 1.14 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "2.1%", tier: "SpMmiddle", initial: "비수", atkBuffPlus: 1.35 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 방어력을", option: "2.5%", tier: "SpMhigh", initial: "비수", atkBuffPlus: 1.61 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "1.5%", tier: "SpPlow1", initial: "약점 노출", criticalChanceMinus: 1.5, atkBuff: 1.2 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "1.8%", tier: "SpPlow2", initial: "약점 노출", criticalChanceMinus: 1.8, atkBuff: 1.5 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "2.1%", tier: "SpPmiddle", initial: "약점 노출", criticalChanceMinus: 2.1, atkBuff: 1.77 },
    { name: "] 몬스터에게 공격 적중 시 8초 동안 대상의 치명타 저항을", option: "2.5%", tier: "SpPhigh", initial: "약점 노출", criticalChanceMinus: 2.5, atkBuff: 2.12 },
    { name: "응원 : 몬스터에게 공격 적중 시 주는 피해가", option: "0.7%", tier: "SpMlow1", initial: "응원", shieldBuff: 0.7, atkBuffPlus: 0.7 },
    { name: "응원 : 몬스터에게 공격 적중 시 주는 피해가", option: "0.9%", tier: "SpMlow2", initial: "응원", shieldBuff: 0.9, atkBuffPlus: 0.9 },
    { name: "응원 : 몬스터에게 공격 적중 시 주는 피해가", option: "1.1%", tier: "SpMmiddle", initial: "응원", shieldBuff: 1.1, atkBuffPlus: 1.1 },
    { name: "응원 : 몬스터에게 공격 적중 시 주는 피해가", option: "1.3%", tier: "SpMhigh", initial: "응원", shieldBuff: 1.3, atkBuffPlus: 1.3 },
    { name: "정기 : 무기 공격력이", option: "160", tier: "zlow1", initial: "수확" },
    { name: "정기 : 무기 공격력이", option: "190", tier: "zlow2", initial: "수확" },
    { name: "정기 : 무기 공격력이", option: "220", tier: "zmiddle", initial: "수확" },
    { name: "정기 : 무기 공격력이", option: "250", tier: "zhigh", initial: "수확" },
    { name: "] 보상 효과가", option: "8", tier: "zlow1", initial: "보상" },
    { name: "] 보상 효과가", option: "7", tier: "zlow2", initial: "보상" },
    { name: "] 보상 효과가", option: "6", tier: "zmiddle", initial: "보상" },
    { name: "] 보상 효과가", option: "5", tier: "zhigh", initial: "보상" },
    { name: "무기 공격력 +1300", option: null, tier: "Llow1", initial: "무기 공격력 +1300", weaponAtkPlus: 1300 },
    { name: "무기 공격력 +1600", option: null, tier: "Llow2", initial: "무기 공격력 +1600", weaponAtkPlus: 1600 },
    { name: "무기 공격력 +1900", option: null, tier: "Lmiddle", initial: "무기 공격력 +1900", weaponAtkPlus: 1900 },
    { name: "무기 공격력 +2200", option: null, tier: "Lhigh", initial: "무기 공격력 +2200", weaponAtkPlus: 2200 },
    { name: "] 몬스터에게 공격 적중 시 주는 피해가", option: "1.5%", tier: "low1", initial: "우월", finalDamagePer: 1.5 },
    { name: "] 몬스터에게 공격 적중 시 주는 피해가", option: "2%", tier: "low2", initial: "우월", finalDamagePer: 2 },
    { name: "] 몬스터에게 공격 적중 시 주는 피해가", option: "2.5%", tier: "middle", initial: "우월", finalDamagePer: 2.5 },
    { name: "] 몬스터에게 공격 적중 시 주는 피해가", option: "3%", tier: "high", initial: "우월", finalDamagePer: 3 },
    { name: "] 몬스터에게 공격 적중 시 치명타 피해량이", option: "4%", tier: "low1", initial: "습격", criticalDamagePer: 4, finalDamagePer: 1.38 },
    { name: "] 몬스터에게 공격 적중 시 치명타 피해량이", option: "6%", tier: "low2", initial: "습격", criticalDamagePer: 6, finalDamagePer: 2.2 },
    { name: "] 몬스터에게 공격 적중 시 치명타 피해량이", option: "8%", tier: "middle", initial: "습격", criticalDamagePer: 8, finalDamagePer: 2.9 },
    { name: "] 몬스터에게 공격 적중 시 치명타 피해량이", option: "10%", tier: "high", initial: "습격", criticalDamagePer: 10, finalDamagePer: 3.6 },
    { name: "] 몬스터에게 공격 적중 시 치명타 적중이", option: "2%", tier: "low1", initial: "정밀", criticalChancePer: 2, finalDamagePer: 1.3 },
    { name: "] 몬스터에게 공격 적중 시 치명타 적중이", option: "3%", tier: "low2", initial: "정밀", criticalChancePer: 3, finalDamagePer: 2 },
    { name: "] 몬스터에게 공격 적중 시 치명타 적중이", option: "4%", tier: "middle", initial: "정밀", criticalChancePer: 4, finalDamagePer: 2.7 },
    { name: "] 몬스터에게 공격 적중 시 치명타 적중이", option: "5%", tier: "high", initial: "정밀", criticalChancePer: 5, finalDamagePer: 3.4 },
    { name: "] 치명타 적중 시", option: "2%", tier: "Llow1", initial: "상처악화" },
    { name: "] 치명타 적중 시", option: "3%", tier: "Llow2", initial: "상처악화" },
    { name: "] 치명타 적중 시", option: "5%", tier: "middle", initial: "상처악화" },
    { name: "] 치명타 적중 시", option: "7%", tier: "high", initial: "상처악화" },
    { name: "] 몬스터에게 공격 적중 시 일정 확률로 10초 동안 '분개' 효과를 획득한다.", option: "23", tier: "zlow1", initial: "분개" },
    { name: "] 몬스터에게 공격 적중 시 일정 확률로 10초 동안 '분개' 효과를 획득한다.", option: "20", tier: "zlow2", initial: "분개" },
    { name: "] 몬스터에게 공격 적중 시 일정 확률로 10초 동안 '분개' 효과를 획득한다.", option: "17", tier: "zmiddle", initial: "분개" },
    { name: "] 몬스터에게 공격 적중 시 일정 확률로 10초 동안 '분개' 효과를 획득한다.", option: "14", tier: "zhigh", initial: "분개" },
    { name: "] 백어택으로 주는 피해가", option: "2.5%", tier: "low1", initial: "기습", finalDamagePer: 2.5 },
    { name: "] 백어택으로 주는 피해가", option: "3%", tier: "low2", initial: "기습", finalDamagePer: 3 },
    { name: "] 백어택으로 주는 피해가", option: "3.5%", tier: "middle", initial: "기습", finalDamagePer: 3.5 },
    { name: "] 백어택으로 주는 피해가", option: "4%", tier: "high", initial: "기습", finalDamagePer: 4 },
    { name: "] 헤드어택으로 주는 피해가", option: "2.5%", tier: "low1", initial: "결투", finalDamagePer: 2.5 },
    { name: "] 헤드어택으로 주는 피해가", option: "3%", tier: "low2", initial: "결투", finalDamagePer: 3 },
    { name: "] 헤드어택으로 주는 피해가", option: "3.5%", tier: "middle", initial: "결투", finalDamagePer: 3.5 },
    { name: "] 헤드어택으로 주는 피해가", option: "4%", tier: "high", initial: "결투", finalDamagePer: 4 },
    { name: "만기 도래 : 각성기 제외 일반 스킬의 치명타 피해량이", option: "20%", tier: "zlow1", initial: "적립" },
    { name: "만기 도래 : 각성기 제외 일반 스킬의 치명타 피해량이", option: "30%", tier: "zlow2", initial: "적립" },
    { name: "만기 도래 : 각성기 제외 일반 스킬의 치명타 피해량이", option: "40%", tier: "zmiddle", initial: "적립" },
    { name: "만기 도래 : 각성기 제외 일반 스킬의 치명타 피해량이", option: "50%", tier: "zhigh", initial: "적립" }

];


// 블럭각인
export let engravingCalFilter = [

    { job: "일격", block: ['결투의 대가', '마나 효율 증가', '추진력', '타격의 대가', '바리케이드', '추진력', '달인의 저력', '시선 집중'] },
    { job: "고기", block: ['기습의 대가', '타격의 대가', '속전속결', '달인의 저력', '추진력', '시선 집중'] },
    { job: "전태", block: ['기습의 대가', '결투의 대가', '타격의 대가', '속전속결', '달인의 저력', '추진력', '시선 집중'] },
    { job: "비기", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "광기", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '안정된 상태', '바리케이드', '추진력', '시선 집중'] },
    { job: "분망", block: ['기습의 대가', '타격의 대가', '속전속결', '달인의 저력', '추진력'] },
    { job: "중수", block: ['기습의 대가', '타격의 대가', '속전속결', '달인의 저력', '추진력', '시선 집중'] },
    { job: "심판자", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "빛의 기사", block: [''] },
    { job: "처단", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "포식", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "체술", block: ['결투의 대가', '마나 효율 증가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "충단", block: ['결투의 대가', '마나 효율 증가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "초심", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "오의", block: ['결투의 대가', '타격의 대가', '속전속결', '기습의 대가', '슈퍼 차지', '마나 효율 증가', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "세맥", block: ['결투의 대가', '마나 효율 증가', '타격의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '추진력', '시선 집중'] },
    { job: "역천", block: ['결투의 대가', '마나 효율 증가', '타격의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "절제", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "절정", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "난무", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '마나 효율 증가', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "권왕", block: ['마나 효율 증가', '기습의 대가', '속전속결', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "수라", block: ['기습의 대가', '마나 효율 증가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "전탄", block: ['결투의 대가', '타격의 대가', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "핸건", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '기습의 대가', '달인의 저력', '바리케이드', '시선 집중'] },
    { job: "죽습", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "두동", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "포강", block: ['결투의 대가', '기습의 대가', '슈퍼 차지', '달인의 저력', '추진력', '시선 집중'] },
    { job: "화강", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "유산", block: ['결투의 대가', '마나 효율 증가', '속전속결', '슈퍼 차지', '기습의 대가', '달인의 저력', '추진력', '시선 집중'] },
    { job: "기술", block: ['결투의 대가', '기습의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "피메", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "사시", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "황후", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '추진력', '시선 집중'] },
    { job: "황제", block: ['결투의 대가', '기습의 대가', '슈퍼 차지', '속전속결', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "교감", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "상소", block: ['결투의 대가', '기습의 대가', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "진실된 용맹", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '마나 효율 증가'] },
    { job: "점화", block: ['결투의 대가', '기습의 대가', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "환류", block: ['결투의 대가', '기습의 대가', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "버스트", block: ['결투의 대가', '마나 효율 증가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "잔재", block: ['결투의 대가', '타격의 대가', '속전속결', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "충동", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중', '마나 효율 증가'] },
    { job: "억제", block: ['결투의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "달소", block: ['결투의 대가', '마나 효율 증가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '추진력', '시선 집중'] },
    { job: "갈증", block: ['결투의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '마나 효율 증가', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "만월", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "그믐", block: ['결투의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "회귀", block: ['결투의 대가', '기습의 대가', '타격의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "질풍", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '추진력', '시선 집중'] },
    { job: "이슬비", block: ['결투의 대가', '기습의 대가', '속전속결', '슈퍼 차지', '달인의 저력', '바리케이드', '추진력', '시선 집중'] },
    { job: "야성", block: [''] },
    { job: "환각", block: [''] }

]


// 각인 등급 레벨별 강력함
// finalDamagePer:적에게 주는 피해 , criticalChancePer:치명타 적중률, criticalDamage:치명타 피해량, atkPer: 공격력
export let engravingCheckFilter = [
    { name: '결투의 대가', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '결투의 대가', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },



    { name: '기습의 대가', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '기습의 대가', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '달인의 저력', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '달인의 저력', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '돌격대장', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '돌격대장', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '마나 효율 증가', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '마나 효율 증가', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '바리케이드', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '바리케이드', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '속전속결', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '속전속결', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '슈퍼 차지', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '슈퍼 차지', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },

    { name: '시선 집중', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '시선 집중', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '아드레날린', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 5, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 5.75, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 6.5, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 7.25, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 8, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 9.5, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 11, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 12.5, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 14, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 15.5, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 17, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 18.5, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '아드레날린', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 20, criticalDamagePer: 0, atkPer: 5.4, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '안정된 상태', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '안정된 상태', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '에테르 포식자', grade: "영웅", level: 0, finalDamagePer: 9, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "영웅", level: 1, finalDamagePer: 9.675, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "영웅", level: 2, finalDamagePer: 10.35, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "영웅", level: 3, finalDamagePer: 11.025, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "전설", level: 0, finalDamagePer: 11.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "전설", level: 1, finalDamagePer: 12.375, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "전설", level: 2, finalDamagePer: 13.05, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "전설", level: 3, finalDamagePer: 13.725, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "유물", level: 0, finalDamagePer: 14.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "유물", level: 1, finalDamagePer: 15.075, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "유물", level: 2, finalDamagePer: 15.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "유물", level: 3, finalDamagePer: 16.425, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '에테르 포식자', grade: "유물", level: 4, finalDamagePer: 17.1, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '예리한 둔기', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 30, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 32, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 34, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 36, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 36, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 48, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 40, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 42, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 44, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 46, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 48, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 50, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '예리한 둔기', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 52, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '원한', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '원한', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '저주받은 인형', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '저주받은 인형', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '정밀 단도', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 12, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 12.75, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 13.5, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 14.25, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 15, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 15.75, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 16.5, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 17.25, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 18, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 18.75, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 19.5, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 20.25, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '정밀 단도', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 21, criticalDamagePer: -6, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '질량 증가', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '질량 증가', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -10, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '추진력', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '추진력', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


    { name: '타격의 대가', grade: "영웅", level: 0, finalDamagePer: 10, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "영웅", level: 1, finalDamagePer: 10.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "영웅", level: 2, finalDamagePer: 11.50, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "영웅", level: 3, finalDamagePer: 12.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "전설", level: 0, finalDamagePer: 13, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "전설", level: 1, finalDamagePer: 13.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "전설", level: 2, finalDamagePer: 14.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "전설", level: 3, finalDamagePer: 15.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "유물", level: 0, finalDamagePer: 16, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "유물", level: 1, finalDamagePer: 16.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "유물", level: 2, finalDamagePer: 17.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "유물", level: 3, finalDamagePer: 18.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '타격의 대가', grade: "유물", level: 4, finalDamagePer: 19, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },





    //서폿 각인

    { name: '각성', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: -0.06 },
    { name: '각성', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: -0.045 },
    { name: '각성', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: -0.03 },
    { name: '각성', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: -0.015 },
    { name: '각성', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '각성', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '각성', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '각성', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '각성', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '각성', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0.015 },
    { name: '각성', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 0.6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0.03 },
    { name: '각성', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 0.65, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0.045 },
    { name: '각성', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 0.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 18, cdrPercent: 0, awakencdrPercent: 0.06 },

    { name: '위기 모면', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 1.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 2.5, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 3.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '위기 모면', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 3.8, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 18, cdrPercent: 0, awakencdrPercent: 0 },

    { name: '전문의', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.24, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.25, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.26, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.27, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.28, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.29, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.30, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.31, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.32, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 0.55, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.33, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 0.6, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.34, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 0.65, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.35, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '전문의', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 0.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0.36, utilityPower: 0, cdrPercent: 0, awakencdrPercent: 0 },

    { name: '중갑 착용', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 0.55, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 0.6, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 0.65, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '중갑 착용', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 0.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 18, cdrPercent: 0, awakencdrPercent: 0 },


    { name: '급소 타격', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 0.55, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 0.6, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 0.65, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '급소 타격', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 0.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 18, cdrPercent: 0, awakencdrPercent: 0 },

    { name: '폭발물 전문가', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 0.55, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 0.6, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 0.65, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '폭발물 전문가', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 0.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 18, cdrPercent: 0, awakencdrPercent: 0 },


    { name: '마나의 흐름', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 0, cdrPercent: 0.04, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 3, cdrPercent: 0.04, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 5, cdrPercent: 0.04, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 7, cdrPercent: 0.04, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.04, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.0475, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.055, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.0625, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.07, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 2.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.0775, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 3.5, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.085, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 4.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.0925, awakencdrPercent: 0 },
    { name: '마나의 흐름', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 10, cdrPercent: 0.1, awakencdrPercent: 0 },


    { name: '최대 마나 증가', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 0.55, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 0.6, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 0.65, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '최대 마나 증가', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 0.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 18, cdrPercent: 0, awakencdrPercent: 0 },


    { name: '구슬동자', grade: "영웅", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "영웅", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 12.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "영웅", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "영웅", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 13.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "전설", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "전설", level: 1, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 14.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "전설", level: 2, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "전설", level: 3, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 15.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "유물", level: 0, finalDamagePer: 0, engBonusPer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "유물", level: 1, finalDamagePer: 0, engBonusPer: 1.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 16.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "유물", level: 2, finalDamagePer: 0, engBonusPer: 2.5, riticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "유물", level: 3, finalDamagePer: 0, engBonusPer: 3.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 17.5, cdrPercent: 0, awakencdrPercent: 0 },
    { name: '구슬동자', grade: "유물", level: 4, finalDamagePer: 0, engBonusPer: 3.8, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, utilityPower: 18, cdrPercent: 0, awakencdrPercent: 0 },


    { name: '공격속도 감소', grade: "고대", level: 0, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '이동속도 감소', grade: "고대", level: 0, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '공격력 감소', grade: "고대", level: 0, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },


]


export let stoneCheckFilter = [

    { name: '결투의 대가', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '결투의 대가', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '결투의 대가', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '결투의 대가', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '기습의 대가', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '기습의 대가', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '기습의 대가', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '기습의 대가', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '달인의 저력', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '달인의 저력', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '달인의 저력', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '달인의 저력', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '돌격대장', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '돌격대장', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '돌격대장', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '돌격대장', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '마나 효율 증가', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '마나 효율 증가', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '마나 효율 증가', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '마나 효율 증가', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '바리케이드', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '바리케이드', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '바리케이드', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '바리케이드', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '속전속결', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '속전속결', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '속전속결', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '속전속결', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '슈퍼 차지', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '슈퍼 차지', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '슈퍼 차지', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '슈퍼 차지', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '아드레날린', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 2.88, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '아드레날린', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 3.6, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '아드레날린', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 4.98, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '아드레날린', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 5.7, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '안정된 상태', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '안정된 상태', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '안정된 상태', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '안정된 상태', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '에테르 포식자', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '에테르 포식자', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '에테르 포식자', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '에테르 포식자', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '예리한 둔기', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 7.5, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '예리한 둔기', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 9.4, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '예리한 둔기', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 13.2, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '예리한 둔기', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 15, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '원한', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '원한', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '원한', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '원한', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '저주받은 인형', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '저주받은 인형', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '저주받은 인형', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '저주받은 인형', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '정밀 단도', level: 1, finalDamagePer: 3, criticalChancePer: 3, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '정밀 단도', level: 2, finalDamagePer: 3.75, criticalChancePer: 3.75, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '정밀 단도', level: 3, finalDamagePer: 5.25, criticalChancePer: 5.25, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '정밀 단도', level: 4, finalDamagePer: 6, criticalChancePer: 6, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '질량 증가', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '질량 증가', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '질량 증가', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '질량 증가', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '추진력', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '추진력', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '추진력', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '추진력', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '타격의 대가', level: 1, finalDamagePer: 3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '타격의 대가', level: 2, finalDamagePer: 3.75, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '타격의 대가', level: 3, finalDamagePer: 5.25, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },
    { name: '타격의 대가', level: 4, finalDamagePer: 6, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, engBonusPer: 0, cdrPercent: 0, awakencdrPercent: 0, carePower: 0, utilityPower: 0 },

    { name: '공격속도 감소', level: -1, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -2, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '공격속도 감소', level: -2, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -4, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '공격속도 감소', level: -3, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: -6, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },

    { name: '이동속도 감소', level: -1, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: -2, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '이동속도 감소', level: -2, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: -4, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '이동속도 감소', level: -3, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: -6, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },

    { name: '공격력 감소', level: -1, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: -2, atkSpeed: 0, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '공격력 감소', level: -2, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: -4, atkSpeed: 0, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },
    { name: '공격력 감소', level: -3, engBonusPer: 0, finalDamagePer: 0, criticalChancePer: 0, criticalDamagePer: 0, atkPer: -6, atkSpeed: 0, moveSpeed: 0, carePower: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0 },



    ////서폿



    { name: '각성', level: 1, engBonusPer: 0.2, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0.06, utilityPower: 0, carePower: 0 },
    { name: '각성', level: 2, engBonusPer: 0.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0.075, utilityPower: 0, carePower: 0 },
    { name: '각성', level: 3, engBonusPer: 0.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0.1050, utilityPower: 0, carePower: 0 },
    { name: '각성', level: 4, engBonusPer: 0.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0.12, utilityPower: 0, carePower: 0 },

    { name: '위기 모면', level: 1, engBonusPer: 0.2, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },
    { name: '위기 모면', level: 2, engBonusPer: 0.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },
    { name: '위기 모면', level: 3, engBonusPer: 0.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },
    { name: '위기 모면', level: 4, engBonusPer: 0.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },

    { name: '전문의', level: 1, engBonusPer: 0.2, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0.04 },
    { name: '전문의', level: 2, engBonusPer: 0.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0.05 },
    { name: '전문의', level: 3, engBonusPer: 0.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0.07 },
    { name: '전문의', level: 4, engBonusPer: 0.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0.08 },

    { name: '중갑 착용', level: 1, engBonusPer: 0.2, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.2, carePower: 0 },
    { name: '중갑 착용', level: 2, engBonusPer: 0.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.3, carePower: 0 },
    { name: '중갑 착용', level: 3, engBonusPer: 0.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.4, carePower: 0 },
    { name: '중갑 착용', level: 4, engBonusPer: 0.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.5, carePower: 0 },

    { name: '급소 타격', level: 1, engBonusPer: 0.2, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.2, carePower: 0 },
    { name: '급소 타격', level: 2, engBonusPer: 0.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.3, carePower: 0 },
    { name: '급소 타격', level: 3, engBonusPer: 0.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.4, carePower: 0 },
    { name: '급소 타격', level: 4, engBonusPer: 0.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.5, carePower: 0 },

    { name: '마나의 흐름', level: 1, engBonusPer: 1.1, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.2, carePower: 0 },
    { name: '마나의 흐름', level: 2, engBonusPer: 1.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.3, carePower: 0 },
    { name: '마나의 흐름', level: 3, engBonusPer: 1.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.4, carePower: 0 },
    { name: '마나의 흐름', level: 4, engBonusPer: 1.7, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.5, carePower: 0 },

    { name: '최대 마나 증가', level: 1, engBonusPer: 0.2, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.2, carePower: 0 },
    { name: '최대 마나 증가', level: 2, engBonusPer: 0.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.3, carePower: 0 },
    { name: '최대 마나 증가', level: 3, engBonusPer: 0.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.4, carePower: 0 },
    { name: '최대 마나 증가', level: 4, engBonusPer: 0.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0.5, carePower: 0 },

    { name: '폭발물 전문가', level: 1, engBonusPer: 0.2, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },
    { name: '폭발물 전문가', level: 2, engBonusPer: 0.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },
    { name: '폭발물 전문가', level: 3, engBonusPer: 0.4, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },
    { name: '폭발물 전문가', level: 4, engBonusPer: 0.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 0, carePower: 0 },

    { name: '구슬동자', level: 1, engBonusPer: 0.9, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 17, carePower: 0 },
    { name: '구슬동자', level: 2, engBonusPer: 1.1, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 19, carePower: 0 },
    { name: '구슬동자', level: 3, engBonusPer: 1.3, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 21, carePower: 0 },
    { name: '구슬동자', level: 4, engBonusPer: 1.5, criticalChancePer: 0, criticalDamagePer: 0, atkPer: 0, atkSpeed: 0, moveSpeed: 0, finalDamagePer: 0, cdrPercent: 0, awakencdrPercent: 0, utilityPower: 23, carePower: 0 },
]


export let elixirCalFilter = [

    { name: "> 공격력 ", atkPlus: [122, 253, 383, 575, 767] },
    { name: "> 받는 피해 감소 ", atkBonus: [122, 253, 383, 575, 767] },

    { name: "> 무기 공격력 ", weaponAtkPlus: [236, 488, 740, 1110, 1480] },

    // { name:"> 치명타 피해 ",criticalDamagePer:[1.12,2.31,3.5,5.25,7],finalDamagePer:[0.38,0.79,1.2,1.8,2.4]},
    // { name:"> 추가 피해 ",addDamagePer:[0.49,1.02,1.55,2.32,3.1],finalDamagePer:[0.38,0.79,1.2,1.8,2.4]},

    { name: "> 치명타 피해 ", finalDamagePer: [0.38, 0.79, 1.2, 1.8, 2.4] },
    { name: "> 추가 피해 ", finalDamagePer: [0.38, 0.79, 1.2, 1.8, 2.4] },


    { name: "> 강맹 (질서) ", atkPer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 달인 (질서) ", atkPer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 선봉대 (질서) ", atkPer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 칼날 방패 (질서) ", atkPer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 행운 (질서) ", atkPer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 회심 (질서) ", atkPer: [0.23, 0.47, 0.72, 1.08, 1.44] },

    { name: "> 보스 피해 ", finalDamagePer: [0.38, 0.79, 1.2, 1.8, 2.4] },

    { name: "> 강맹 (혼돈) ", finalDamagePer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 달인 (혼돈) ", finalDamagePer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 선봉대 (혼돈) ", finalDamagePer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 칼날 방패 (혼돈) ", finalDamagePer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 행운 (혼돈) ", finalDamagePer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 회심 (혼돈) ", finalDamagePer: [0.23, 0.47, 0.72, 1.08, 1.44] },
    { name: "> 선각자 (혼돈) ", carePower: [0.0024, 0.0047, 0.0072, 0.0108, 0.0144] },

    { name: "> 힘 ", str: [864, 1782, 2700, 4050, 5400] },
    { name: "> 민첩 ", dex: [864, 1782, 2700, 4050, 5400] },
    { name: "> 지능 ", int: [864, 1782, 2700, 4050, 5400] },


    { name: "> 선각자 (질서) ", atkBuff: [0.64, 1.32, 2, 3, 4] },
    { name: "> 선각자 (질서) ", statHp: [800, 1650, 2500, 3750, 5000] },
    { name: "> 진군 (질서) ", atkBuff: [0.64, 1.32, 2, 3, 4] },
    { name: "> 신념 (질서) ", atkBuff: [0.64, 1.32, 2, 3, 4] },

    { name: "> 아군 강화 ", atkBuff: [0.96, 1.98, 3, 4.5, 6] },
    { name: "> 아이덴티티 획득 ", identityUptime: [0.064, 0.132, 0.02, 0.03, 0.04] },

    { name: "> 회복 강화 ", carePower: [0.0067, 0.0138, 0.021, 0.0315, 0.042] },
    { name: "> 보호막 강화 ", carePower: [0.0067, 0.0138, 0.021, 0.0315, 0.042] },

    { name: "> 최대 생명력 ", statHp: [2720, 5610, 8500, 12750, 17000] },

    { name: "> 무력화 ", utilityPower: [0.024, 0.05, 0.075, 0.112, 0.15] },
    { name: "> 마나 ", utilityPower: [0.024, 0.05, 0.075, 0.112, 0.15] }



]

export let arkCalFilter = [
    //{name:"끝없는 마나",level:1,skillCool:7},
    //{name:"끝없는 마나",level:2,skillCool:14},
    //
    //{name:"금단의 주문",level:1,evolutionDamage:0},
    //{name:"금단의 주문",level:2,evolutionDamage:0},
    //
    //{name:"예리한 감각",level:1,evolutionDamage:0, criticalChancePer:4},
    //{name:"예리한 감각",level:2,evolutionDamage:0, criticalChancePer:8},
    //
    //{name:"한계 돌파",level:1,evolutionDamage:0},
    //{name:"한계 돌파",level:2,evolutionDamage:0},
    //{name:"한계 돌파",level:3,evolutionDamage:0},
    //
    //{name:"최적화 훈련",level:1,evolutionDamage:0,skillCool:4},
    //{name:"최적화 훈련",level:2,evolutionDamage:0,skillCool:8},
    //
    //{name:"축복의 여신",level:1,moveSpeed:3,atkSpeed:3},
    //{name:"축복의 여신",level:2,moveSpeed:6,atkSpeed:6},
    //{name:"축복의 여신",level:3,moveSpeed:9,atkSpeed:9},

    //// 여기부터 3티어

    //{name:"무한한 마력",level:1,evolutionDamage:0,skillCool:7},
    //{name:"무한한 마력",level:2,evolutionDamage:0,skillCool:14},
    //
    //{name:"혼신의 강타",level:1,evolutionDamage:0, criticalChancePer:12},
    //{name:"혼신의 강타",level:2,evolutionDamage:0, criticalChancePer:24},
    //
    //{name:"일격",level:1,criticalDamagePer:16, criticalChancePer:10},
    //{name:"일격",level:2,criticalDamagePer:32, criticalChancePer:20},
    //
    //{name:"파괴 전차",level:1,evolutionDamage:0, atkSpeed:4},
    //{name:"파괴 전차",level:2,evolutionDamage:0, atkSpeed:8},
    //
    //{name:"타이밍 지배",level:1,evolutionDamage:0, skillCool:5},
    //{name:"타이밍 지배",level:2,evolutionDamage:0, skillCool:10},

    { name: "정열의 춤사위", level: 1, evolutionDamage: 0, evolutionBuff: 7 },
    { name: "정열의 춤사위", level: 2, evolutionDamage: 0, evolutionBuff: 14 },

    //// 여기부터 4티어


    { name: "입식 타격가", level: 1, evolutionDamage: 0, stigmaPer: 10 },
    { name: "입식 타격가", level: 2, evolutionDamage: 0, stigmaPer: 20 },

    { name: "마나 용광로", level: 1, evolutionDamage: 0, stigmaPer: 10 },
    { name: "마나 용광로", level: 2, evolutionDamage: 0, stigmaPer: 20 },

    { name: "안정된 관리자", level: 1, stigmaPer: 10 },
    { name: "안정된 관리자", level: 2, stigmaPer: 20 },

    //{name:"인파이팅",level:1,evolutionDamage:0},
    //{name:"인파이팅",level:2,evolutionDamage:0},

    //// 여기서부터 깨달음

    { name: "전술 훈련", level: 1, criticalChancePer: 1.6 },
    { name: "전술 훈련", level: 2, criticalChancePer: 3.2 },
    { name: "전술 훈련", level: 3, criticalChancePer: 4.8 },
    { name: "전술 훈련", level: 4, criticalChancePer: 6.4 },
    { name: "전술 훈련", level: 5, criticalChancePer: 8 },

    { name: "분노 자극", level: 1, criticalDamagePer: 3 },
    { name: "분노 자극", level: 2, criticalDamagePer: 6 },
    { name: "분노 자극", level: 3, criticalDamagePer: 9 },
    { name: "분노 자극", level: 4, criticalDamagePer: 12 },
    { name: "분노 자극", level: 5, criticalDamagePer: 15 },

    { name: "영역 강화", level: 1, criticalChancePer: 2 },
    { name: "영역 강화", level: 2, criticalChancePer: 4 },
    { name: "영역 강화", level: 3, criticalChancePer: 6 },
    { name: "영역 강화", level: 4, criticalChancePer: 8 },
    { name: "영역 강화", level: 5, criticalChancePer: 10 },

    { name: "징벌 강화", level: 1, criticalChancePer: 1 },
    { name: "징벌 강화", level: 2, criticalChancePer: 2 },
    { name: "징벌 강화", level: 3, criticalChancePer: 3 },
    { name: "징벌 강화", level: 4, criticalChancePer: 4 },
    { name: "징벌 강화", level: 5, criticalChancePer: 5 },

    { name: "열성", level: 1, criticalDamagePer: 4.8 },
    { name: "열성", level: 2, criticalDamagePer: 9.6 },
    { name: "열성", level: 3, criticalDamagePer: 14.4 },
    { name: "열성", level: 4, criticalDamagePer: 19.2 },
    { name: "열성", level: 5, criticalDamagePer: 24 },

    { name: "날카로운 타격", level: 1, criticalChancePer: 1, criticalDamagePer: 4 },
    { name: "날카로운 타격", level: 2, criticalChancePer: 2, criticalDamagePer: 8 },
    { name: "날카로운 타격", level: 3, criticalChancePer: 3, criticalDamagePer: 12 },
    { name: "날카로운 타격", level: 4, criticalChancePer: 4, criticalDamagePer: 16 },
    { name: "날카로운 타격", level: 5, criticalChancePer: 5, criticalDamagePer: 20 },

    { name: "치명적인 투지", level: 1, criticalChancePer: 2 },
    { name: "치명적인 투지", level: 2, criticalChancePer: 4 },
    { name: "치명적인 투지", level: 3, criticalChancePer: 6 },
    { name: "치명적인 투지", level: 4, criticalChancePer: 8 },
    { name: "치명적인 투지", level: 5, criticalChancePer: 10 },

    { name: "치명적인 체술", level: 1, criticalDamagePer: 3 },
    { name: "치명적인 체술", level: 2, criticalDamagePer: 6 },
    { name: "치명적인 체술", level: 3, criticalDamagePer: 9 },
    { name: "치명적인 체술", level: 4, criticalDamagePer: 12 },
    { name: "치명적인 체술", level: 5, criticalDamagePer: 15 },

    { name: "공수래", level: 1, criticalChancePer: 0.8 },
    { name: "공수래", level: 2, criticalChancePer: 1.6 },
    { name: "공수래", level: 3, criticalChancePer: 2.4 },
    { name: "공수래", level: 4, criticalChancePer: 3.2 },
    { name: "공수래", level: 5, criticalChancePer: 4 },

    { name: "날카로운 기공", level: 1, criticalDamagePer: 4 },
    { name: "날카로운 기공", level: 2, criticalDamagePer: 8 },
    { name: "날카로운 기공", level: 3, criticalDamagePer: 12 },
    { name: "날카로운 기공", level: 4, criticalDamagePer: 16 },
    { name: "날카로운 기공", level: 5, criticalDamagePer: 20 },

    { name: "치명적인 베기", level: 1, criticalDamagePer: 4 },
    { name: "치명적인 베기", level: 2, criticalDamagePer: 8 },
    { name: "치명적인 베기", level: 3, criticalDamagePer: 12 },
    { name: "치명적인 베기", level: 4, criticalDamagePer: 16 },
    { name: "치명적인 베기", level: 5, criticalDamagePer: 20 },

    { name: "전환 난무", level: 1, criticalChancePer: 0.8 },
    { name: "전환 난무", level: 2, criticalChancePer: 1.6 },
    { name: "전환 난무", level: 3, criticalChancePer: 2.4 },
    { name: "전환 난무", level: 4, criticalChancePer: 3.2 },
    { name: "전환 난무", level: 5, criticalChancePer: 4 },

    { name: "체술 강화", level: 1, criticalChancePer: 1.2 },
    { name: "체술 강화", level: 2, criticalChancePer: 2.4 },
    { name: "체술 강화", level: 3, criticalChancePer: 3.6 },
    { name: "체술 강화", level: 4, criticalChancePer: 4.8 },
    { name: "체술 강화", level: 5, criticalChancePer: 6 },

    { name: "치명적인 오의", level: 1, criticalDamagePer: 4 },
    { name: "치명적인 오의", level: 2, criticalDamagePer: 8 },
    { name: "치명적인 오의", level: 3, criticalDamagePer: 12 },
    { name: "치명적인 오의", level: 4, criticalDamagePer: 16 },
    { name: "치명적인 오의", level: 5, criticalDamagePer: 20 },

    { name: "퀵 드로우", level: 1, criticalChancePer: 1 },
    { name: "퀵 드로우", level: 2, criticalChancePer: 2 },
    { name: "퀵 드로우", level: 3, criticalChancePer: 3 },
    { name: "퀵 드로우", level: 4, criticalChancePer: 4 },
    { name: "퀵 드로우", level: 5, criticalChancePer: 5 },

    { name: "페일 노트", level: 1, criticalDamagePer: 4 },
    { name: "페일 노트", level: 2, criticalDamagePer: 8 },
    { name: "페일 노트", level: 3, criticalDamagePer: 12 },
    { name: "페일 노트", level: 4, criticalDamagePer: 16 },
    { name: "페일 노트", level: 5, criticalDamagePer: 20 },

    { name: "신속 포격", level: 1, criticalDamagePer: 4 },
    { name: "신속 포격", level: 2, criticalDamagePer: 8 },
    { name: "신속 포격", level: 3, criticalDamagePer: 12 },
    { name: "신속 포격", level: 4, criticalDamagePer: 16 },
    { name: "신속 포격", level: 5, criticalDamagePer: 20 },

    { name: "급소 전문가", level: 1, criticalChancePer: 1.2 },
    { name: "급소 전문가", level: 2, criticalChancePer: 2.4 },
    { name: "급소 전문가", level: 3, criticalChancePer: 3.6 },
    { name: "급소 전문가", level: 4, criticalChancePer: 4.8 },
    { name: "급소 전문가", level: 5, criticalChancePer: 6 },

    { name: "저격수의 의지", level: 1, criticalDamagePer: 1 },
    { name: "저격수의 의지", level: 2, criticalDamagePer: 2 },
    { name: "저격수의 의지", level: 3, criticalDamagePer: 3 },
    { name: "저격수의 의지", level: 4, criticalDamagePer: 4 },
    { name: "저격수의 의지", level: 5, criticalDamagePer: 5 },

    { name: "황제의 자비", level: 1, criticalChancePer: 1.6 },
    { name: "황제의 자비", level: 2, criticalChancePer: 3.2 },
    { name: "황제의 자비", level: 3, criticalChancePer: 4.8 },
    { name: "황제의 자비", level: 4, criticalChancePer: 6.4 },
    { name: "황제의 자비", level: 5, criticalChancePer: 8 },

    { name: "교감 강화", level: 1, criticalChancePer: 2 },
    { name: "교감 강화", level: 2, criticalChancePer: 4 },
    { name: "교감 강화", level: 3, criticalChancePer: 6 },
    { name: "교감 강화", level: 4, criticalChancePer: 9 },
    { name: "교감 강화", level: 5, criticalChancePer: 12 },

    { name: "고대 기운 강화", level: 1, criticalDamagePer: 4 },
    { name: "고대 기운 강화", level: 2, criticalDamagePer: 8 },
    { name: "고대 기운 강화", level: 3, criticalDamagePer: 12 },
    { name: "고대 기운 강화", level: 4, criticalDamagePer: 16 },
    { name: "고대 기운 강화", level: 5, criticalDamagePer: 20 },

    { name: "곡예사", level: 1, criticalDamagePer: 3 },
    { name: "곡예사", level: 2, criticalDamagePer: 6 },
    { name: "곡예사", level: 3, criticalDamagePer: 9 },
    { name: "곡예사", level: 4, criticalDamagePer: 12 },
    { name: "곡예사", level: 5, criticalDamagePer: 15 },

    { name: "단련", level: 1, criticalChancePer: 1 },
    { name: "단련", level: 2, criticalChancePer: 2 },
    { name: "단련", level: 3, criticalChancePer: 3 },
    { name: "단련", level: 4, criticalChancePer: 4 },
    { name: "단련", level: 5, criticalChancePer: 5 },


    //서폿 깨달음

    //홀나 메인노드
    { name: "신성 해방", level: 1, enlightenmentBuff: 0.1 },
    { name: "신성 해방", level: 2, enlightenmentBuff: 0.15 },
    { name: "신성 해방", level: 3, enlightenmentBuff: 0.2 },
    //홀나 낙인력
    { name: "빠른 구원", level: 1, stigmaPer: 0 },
    { name: "빠른 구원", level: 2, stigmaPer: 1 },
    { name: "빠른 구원", level: 3, stigmaPer: 2 },
    { name: "빠른 구원", level: 4, stigmaPer: 3 },
    { name: "빠른 구원", level: 5, stigmaPer: 4 },

    { name: "빛의 흔적", level: 1, stigmaPer: 0 },
    { name: "빛의 흔적", level: 2, stigmaPer: 1 },
    { name: "빛의 흔적", level: 3, stigmaPer: 2 },
    { name: "빛의 흔적", level: 4, stigmaPer: 3 },
    { name: "빛의 흔적", level: 5, stigmaPer: 4 },


    //바드 메인노드
    { name: "세레나데 코드", level: 1, enlightenmentBuff: 0.1 },
    { name: "세레나데 코드", level: 2, enlightenmentBuff: 0.15 },
    { name: "세레나데 코드", level: 3, enlightenmentBuff: 0.2 },
    //바드 낙인력
    { name: "포용의 세레나데", level: 1, stigmaPer: 0 },
    { name: "포용의 세레나데", level: 2, stigmaPer: 1 },
    { name: "포용의 세레나데", level: 3, stigmaPer: 2 },
    { name: "포용의 세레나데", level: 4, stigmaPer: 3 },
    { name: "포용의 세레나데", level: 5, stigmaPer: 4 },

    { name: "낙인의 세레나데", level: 1, stigmaPer: 0 },
    { name: "낙인의 세레나데", level: 2, stigmaPer: 1 },
    { name: "낙인의 세레나데", level: 3, stigmaPer: 2 },
    { name: "낙인의 세레나데", level: 4, stigmaPer: 3 },
    { name: "낙인의 세레나데", level: 5, stigmaPer: 4 },


    //도화가 메인노드
    { name: "묵법 : 접무", level: 1, enlightenmentBuff: 0.1 },
    { name: "묵법 : 접무", level: 2, enlightenmentBuff: 0.15 },
    { name: "묵법 : 접무", level: 3, enlightenmentBuff: 0.2 },

    //도화가 낙인력
    { name: "오누이", level: 1, stigmaPer: 0 },
    { name: "오누이", level: 2, stigmaPer: 1 },
    { name: "오누이", level: 3, stigmaPer: 2 },
    { name: "오누이", level: 4, stigmaPer: 3 },
    { name: "오누이", level: 5, stigmaPer: 4 },

    { name: "낙인 강화", level: 1, stigmaPer: 0 },
    { name: "낙인 강화", level: 2, stigmaPer: 1 },
    { name: "낙인 강화", level: 3, stigmaPer: 2 },
    { name: "낙인 강화", level: 4, stigmaPer: 3 },
    { name: "낙인 강화", level: 5, stigmaPer: 4 },

    //발키리 메인노드
    { name: "해방의 날개", level: 1, enlightenmentBuff: 0.1 },
    { name: "해방의 날개", level: 2, enlightenmentBuff: 0.15 },
    { name: "해방의 날개", level: 3, enlightenmentBuff: 0.2 },


    //발키리 낙인력
    { name: "해방자의 흔적", level: 1, stigmaPer: 0 },
    { name: "해방자의 흔적", level: 2, stigmaPer: 1 },
    { name: "해방자의 흔적", level: 3, stigmaPer: 2 },
    { name: "해방자의 흔적", level: 4, stigmaPer: 3 },
    { name: "해방자의 흔적", level: 5, stigmaPer: 4 },

    { name: "빛의 검기", level: 1, stigmaPer: 0 },
    { name: "빛의 검기", level: 2, stigmaPer: 1 },
    { name: "빛의 검기", level: 3, stigmaPer: 2 },
    { name: "빛의 검기", level: 4, stigmaPer: 3 },
    { name: "빛의 검기", level: 5, stigmaPer: 4 },




    //도약
    { name: "잠재력 해방", level: 1, cdrPercent: 0.02 },
    { name: "잠재력 해방", level: 2, cdrPercent: 0.04 },
    { name: "잠재력 해방", level: 3, cdrPercent: 0.06 },
    { name: "잠재력 해방", level: 4, cdrPercent: 0.08 },
    { name: "잠재력 해방", level: 5, cdrPercent: 0.1 },




]




export let classGemFilter = [
    {
        class: "광기",
        skill: [
            { name: "오버드라이브", per: 0.176 },
            { name: "피니쉬 스트라이크", per: 0.137 },
            { name: "헬 블레이드", per: 0.12 },
            { name: "소드 스톰", per: 0.077 },
            { name: "템페스트 슬래쉬", per: 0.044 },
            { name: "브레이브 슬래쉬", per: 0.044 },
            { name: "레드 더스트", per: 0.044 },
            { name: "마운틴 크래쉬", per: 0.044 },
            { name: "보정치", per: -0.088 },

        ],
    },
    {
        class: "파브 광기",
        skill: [
            { name: "오버드라이브", per: 0.176 },
            { name: "피니쉬 스트라이크", per: 0.137 },
            { name: "헬 블레이드", per: 0.12 },
            { name: "소드 스톰", per: 0.077 },
            { name: "파워 브레이크", per: 0.044 },
            { name: "템페스트 슬래쉬", per: 0.044 },
            { name: "레드 더스트", per: 0.044 },
            { name: "마운틴 크래쉬", per: 0.044 },
            { name: "보정치", per: -0.088 },

        ],
    },
    {
        class: "러쉬 광기",
        skill: [
            { name: "오버드라이브", per: 0.15 },
            { name: "피니쉬 스트라이크", per: 0.13 },
            { name: "헬 블레이드", per: 0.11 },
            { name: "소드 스톰", per: 0.08 },
            { name: "다크 러쉬", per: 0.07 },
            { name: "파워 브레이크", per: 0.058 },
            { name: "템페스트 슬래쉬", per: 0.058 },
            { name: "레드 더스트", per: 0.058 },
            { name: "마운틴 크래쉬", per: 0.058 },
            { name: "보정치", per: -0.174 },

        ],
    },
    {
        class: "러쉬 광기2",
        skill: [
            { name: "다크 러쉬", per: 0.27 },
            { name: "피니쉬 스트라이크", per: 0.11 },
            { name: "오버드라이브", per: 0.11 },
            { name: "헬 블레이드", per: 0.10 },
            { name: "마운틴 크래쉬", per: 0.05 },
            { name: "파워 브레이크", per: 0.05 },
            { name: "레드 더스트", per: 0.05 },
            { name: "보정치", per: -0.05 },

        ],
    },
    {
        class: "7겁 광기",
        skill: [
            { name: "오버드라이브", per: 0.175 },
            { name: "피니쉬 스트라이크", per: 0.144 },
            { name: "헬 블레이드", per: 0.135 },
            { name: "템페스트 슬래쉬", per: 0.077 },
            { name: "브레이브 슬래쉬", per: 0.05 },
            { name: "레드 더스트", per: 0.05 },
            { name: "마운틴 크래쉬", per: 0.03 },
        ],
    },
    {
        class: "7겁 파브 광기",
        skill: [
            { name: "오버드라이브", per: 0.175 },
            { name: "피니쉬 스트라이크", per: 0.144 },
            { name: "헬 블레이드", per: 0.135 },
            { name: "템페스트 슬래쉬", per: 0.067 },
            { name: "파워 브레이크", per: 0.06 },
            { name: "레드 더스트", per: 0.05 },
            { name: "마운틴 크래쉬", per: 0.03 },
        ],
    },
    {
        class: "휠윈드 광기",
        skill: [
            { name: "오버드라이브", per: 0.175 },
            { name: "피니쉬 스트라이크", per: 0.144 },
            { name: "헬 블레이드", per: 0.135 },
            { name: "휠윈드", per: 0.067 },
            { name: "파워 브레이크", per: 0.06 },
            { name: "레드 더스트", per: 0.05 },
            { name: "마운틴 크래쉬", per: 0.03 },
        ],
    },
    {
        class: "6겁 광기",
        skill: [
            { name: "오버드라이브", per: 0.180 },
            { name: "피니쉬 스트라이크", per: 0.149 },
            { name: "헬 블레이드", per: 0.140 },
            { name: "템페스트 슬래쉬", per: 0.082 },
            { name: "브레이브 슬래쉬", per: 0.055 },
            { name: "레드 더스트", per: 0.055 },
        ],
    },
    {
        class: "비기",
        skill: [
            { name: "블러디 러쉬", per: 0.264 },
            { name: "오버드라이브", per: 0.183 },
            { name: "피니쉬 스트라이크", per: 0.11 },
            { name: "헬 블레이드", per: 0.087 },
            { name: "레드 더스트", per: 0.041 },

        ],
    },
    {
        class: "중수",
        skill: [
            { name: "중력 가중 스킬", per: 0.626 },
            { name: "퍼펙트 스윙", per: 0.067 },
            { name: "사이즈믹 해머", per: 0.07 },
            { name: "어스 웨이브", per: 0.047 },
            { name: "어스 이터", per: 0.02 },

        ],
    },
    {
        class: "붕쯔 중수",
        skill: [
            { name: "중력 가중 스킬", per: 0.85 },
            { name: "퍼펙트 스윙", per: 0.04 },
            { name: "사이즈믹 해머", per: 0.03 },

        ],
    },
    {
        class: "분망",
        skill: [
            { name: "퍼펙트 스윙", per: 0.286 },
            { name: "풀 스윙", per: 0.112 },
            { name: "어스 이터", per: 0.078 },
            { name: "사이즈믹 해머", per: 0.11 },
        ],
    },
    {
        class: "어스 분망",
        skill: [
            { name: "퍼펙트 스윙", per: 0.286 },
            { name: "어스 웨이브", per: 0.112 },
            { name: "어스 이터", per: 0.078 },
            { name: "사이즈믹 해머", per: 0.11 },
        ],
    },
    {
        class: "전태",
        skill: [
            { name: "가디언의 낙뢰", per: 0.219 },
            { name: "리프 어택", per: 0.175 },
            { name: "방패 돌진", per: 0.135 },
            { name: "방패 밀치기", per: 0.126 },
            { name: "방패 격동", per: 0.073 },
        ],
    },
    {
        class: "버캐 채용 전태",
        skill: [
            { name: "가디언의 낙뢰", per: 0.207 },
            { name: "리프 어택", per: 0.163 },
            { name: "방패 돌진", per: 0.123 },
            { name: "방패 밀치기", per: 0.114 },
            { name: "방패 격동", per: 0.061 },
            { name: "버스트 캐넌", per: 0.06 },

        ],
    },
    {
        class: "고기",
        skill: [
            { name: "버스트 캐넌", per: 0.257 },
            { name: "차지 스팅거", per: 0.264 },
            { name: "스피어 샷", per: 0.108 },
            { name: "대쉬 어퍼 파이어", per: 0.066 },
            { name: "카운터 스피어", per: 0.046 },
            { name: "파이어 불릿", per: 0.025 },
            { name: "라이징 스피어", per: 0.025 },
            { name: "보정치", per: -0.025 },

        ],
    },
    {
        class: "5겁 고기",
        skill: [
            { name: "버스트 캐넌", per: 0.262 },
            { name: "차지 스팅거", per: 0.269 },
            { name: "스피어 샷", per: 0.113 },
            { name: "대쉬 어퍼 파이어", per: 0.071 },
            { name: "카운터 스피어", per: 0.051 },
            { name: "파이어 불릿", per: 0.051 },
            { name: "보정치", per: -0.051 },

        ],
    },
    {
        class: "노차징 고기",
        skill: [
            { name: "스피어 샷", per: 0.355 },
            { name: "버스트 캐넌", per: 0.15 },
            { name: "대쉬 어퍼 파이어", per: 0.12 },
            { name: "라이징 스피어", per: 0.09},
            { name: "카운터 스피어", per: 0.051 },
            { name: "파이어 불릿", per: 0.051 },
            { name: "보정치", per: -0.051 },

        ],
    },
    {
        class: "심판자",
        skill: [
            { name: "신성검", per: 0.105 },
            { name: "집행자의 검", per: 0.10 },
            { name: "질주 베기", per: 0.087 },
            { name: "섬광 베기", per: 0.068 },
            { name: "정의 집행", per: 0.054 },
            { name: "처단", per: 0.077 },
            { name: "섬광 찌르기", per: 0.058 },


        ],
    },
    {
        class: "포식",
        skill: [
            { name: "브루탈 임팩트", per: 0.171 },
            { name: "볼케이노 이럽션", per: 0.132 },
            { name: "길로틴", per: 0.132 },
            { name: "페이탈 소드", per: 0.088 },
            { name: "퓨리어스 클로", per: 0.091 },
            { name: "파이널 블로", per: 0.056 },
            { name: "퍼니싱 드로", per: 0.056 },
            { name: "마운틴 클리브", per: 0.056 },
            { name: "보정치", per: -0.112 },

        ],
    },
    {
        class: "허리케인 포식", // 질서의 해 소용돌이
        skill: [
            { name: "브루탈 임팩트", per: 0.16 },
            { name: "허리케인 소드", per: 0.15 },
            { name: "길로틴", per: 0.116 },
            { name: "볼케이노 이럽션", per: 0.10 },

            { name: "파이널 블로", per: 0.056 },
            { name: "퓨리어스 클로", per: 0.056 },
            { name: "페이탈 소드", per: 0.056 },
            { name: "퍼니싱 드로", per: 0.056 },
            { name: "마운틴 클리브", per: 0.056 },
            { name: "보정치", per: -0.168 },
        ],
    },
    {
        class: "허리케인 포식2", // 질서의 별 파괴의 바람
        skill: [
            { name: "브루탈 임팩트", per: 0.185 },
            { name: "길로틴", per: 0.126 },
            { name: "볼케이노 이럽션", per: 0.115 },
            { name: "허리케인 소드", per: 0.10},
            
            { name: "파이널 블로", per: 0.056 },
            { name: "퓨리어스 클로", per: 0.056 },
            { name: "페이탈 소드", per: 0.056 },
            { name: "퍼니싱 드로", per: 0.056 },
            { name: "마운틴 클리브", per: 0.056 },
            { name: "보정치", per: -0.168 },
        ],
    },
    {
        class: "마운틴 포식",
        skill: [
            { name: "브루탈 임팩트", per: 0.171 },
            { name: "볼케이노 이럽션", per: 0.132 },
            { name: "길로틴", per: 0.132 },
            { name: "퓨리어스 클로", per: 0.091 },
            { name: "마운틴 클리브", per: 0.078 },
            { name: "파이널 블로", per: 0.066 },
        ],
    },
    {
        class: "크블 포식",
        skill: [
            { name: "브루탈 임팩트", per: 0.179 },
            { name: "볼케이노 이럽션", per: 0.148 },
            { name: "길로틴", per: 0.144 },
            { name: "크루얼 피어스", per: 0.09 },
            { name: "마운틴 클리브", per: 0.09 },
            { name: "퓨리어스 클로", per: 0.097 },
            { name: "크로스 블레이드", per: 0.07 },
            { name: "퍼니싱 드로", per: 0.07 },
            { name: "보정치", per: -0.07 },

        ],
    },
    {
        class: "처단",
        skill: [
            { name: "블러드러스트", per: 0.284 },
            { name: "브루탈 임팩트", per: 0.152 },
            { name: "볼케이노 이럽션", per: 0.118 },
            { name: "길로틴", per: 0.099 },
            { name: "퓨리어스 클로", per: 0.058 },

        ],
    },
    {
        class: "격노폭발 처단",
        skill: [
            { name: "블러드러스트", per: 0.45 },
            { name: "브루탈 임팩트", per: 0.30 },
        ],
    },
    {
        class: "오의",
        skill: [
            { name: "오의 : 창룡패황권", per: 0.311 },
            { name: "오의 : 화룡천상", per: 0.178 },
            { name: "오의 : 나선경", per: 0.071 },
            { name: "오의 : 폭쇄진", per: 0.164 },
            { name: "오의 : 풍신초래", per: 0.164 },
            { name: "보정치", per: -0.164 },
        ],
    },
    {
        class: "밸패 오의",
        skill: [
            { name: "오의 : 창룡패황권", per: 0.311 },
            { name: "오의 : 화룡천상", per: 0.178 },
            { name: "오의 : 풍신초래", per: 0.164 },
            { name: "오의 : 폭쇄진", per: 0.071 },
            { name: "오의 : 나선경", per: 0.071 },
            { name: "보정치", per: -0.071 },
        ],
    },
    {
        class: "3오의",
        skill: [
            { name: "오의 : 창룡패황권", per: 0.311 },
            { name: "오의 : 화룡천상", per: 0.178 },
            { name: "오의 : 폭쇄진", per: 0.164 },
            { name: "내공연소", per: 0.071 },
        ],
    },
    {
        class: "초심",
        skill: [
            { name: "방천격", per: 0.228 },
            { name: "내공연소", per: 0.156 },
            { name: "선풍용류각", per: 0.133 },
            { name: "뇌명각", per: 0.062 },
            { name: "섬열란아", per: 0.093 },

        ],
    },
    {
        class: "세맥",
        skill: [
            { name: "벽력장", per: 0.161 },
            { name: "난화격", per: 0.152 },
            { name: "낙영장", per: 0.123 },
            { name: "여래신장", per: 0.117 },
            { name: "환영격", per: 0.067 },
            { name: "기공장", per: 0.053 },
            { name: "풍뢰일광포", per: 0.053 },
            { name: "보정치", per: -0.053 },
        ],
    },
    {
        class: "5멸 세맥",
        skill: [
            { name: "벽력장", per: 0.173 },
            { name: "난화격", per: 0.20 },
            { name: "낙영장", per: 0.174 },
            { name: "여래신장", per: 0.132 },
            { name: "기공장", per: 0.10 },
            { name: "풍뢰일광포", per: 0.10 },
            { name: "환영격", per: 0.10 },
            { name: "보정치", per: -0.20 },

        ],
    },
    {
        class: "역천",
        skill: [
            { name: "난화격", per: 0.143 },
            { name: "여래신장", per: 0.103 },
            { name: "기공장", per: 0.096 },
            { name: "섬열파", per: 0.096 },
            { name: "벽력장", per: 0.067 },
            { name: "풍뢰일광포", per: 0.1 },
            { name: "환영격", per: 0.073 },
            { name: "보정치", per: -0.096 },
        ],
    },
    {
        class: "5겁 역천",
        skill: [
            { name: "난화격", per: 0.1564 },
            { name: "여래신장", per: 0.1164 },
            { name: "기공장", per: 0.1094 },
            { name: "섬열파", per: 0.1094 },
            { name: "풍뢰일광포", per: 0.1134 },
            { name: "환영격", per: 0.0864 },
            { name: "보정치", per: -0.1094 },
        ],
    },
    {
        class: "무공탄 역천",
        skill: [
            { name: "섬열파", per: 0.2164 },
            { name: "무공탄", per: 0.1164 },
            { name: "풍뢰일광포", per: 0.1134 },
            { name: "여래신장", per: 0.1094 },
            { name: "기공장", per: 0.0864 },
        ],
    },
    {
        class: "무공탄 역천2",
        skill: [
            { name: "무공탄", per: 0.24 },
            { name: "섬열파", per: 0.20},
            { name: "여래신장", per: 0.11 },
            { name: "풍뢰일광포", per: 0.10 },
            { name: "기공장", per: 0.08 },
        ],
    },
    {
        class: "섬열파 역천",
        skill: [
            { name: "섬열파", per: 0.30 },
            { name: "풍뢰일광포", per: 0.11 },
            { name: "여래신장", per: 0.10 },
            { name: "기공장", per: 0.08 },
            { name: "무공탄", per: 0.052 },
        ],
    },
    {
        class: "번천 역천",
        skill: [
            { name: "난화격", per: 0.143 },
            { name: "여래신장", per: 0.103 },
            { name: "번천장", per: 0.096 },
            { name: "섬열파", per: 0.096 },
            { name: "벽력장", per: 0.067 },
            { name: "풍뢰일광포", per: 0.1 },
            { name: "환영격", per: 0.073 },
            { name: "보정치", per: -0.096 },
        ],
    },
    {
        class: "절정",
        skill: [
            { name: "적룡포", per: 0.19 },
            { name: "굉열파", per: 0.102 },
            { name: "반월섬", per: 0.031 },
            { name: "유성강천", per: 0.08 },
            { name: "사두룡격", per: 0.062 },
            { name: "맹룡열파", per: 0.091 },

        ],
    },
    {
        class: "절제",
        skill: [
            { name: "반월섬", per: 0.131 },
            { name: "연환섬", per: 0.088 },
            { name: "선풍참혼", per: 0.096 },
            { name: "청룡출수", per: 0.08 },
            { name: "열공참", per: 0.045 },
            { name: "회선창", per: 0.045 },
            { name: "일섬각", per: 0.045 },
            { name: "맹룡열파", per: 0.07 },
            { name: "보정치", per: -0.09 },

        ],
    },
    {
        class: "콤보 절제",
        skill: [
            { name: "선풍참혼", per: 0.13 },
            { name: "이연격", per: 0.12 },
            { name: "맹룡열파", per: 0.11 },
            { name: "반월섬", per: 0.10 },
            { name: "연환섬", per: 0.095 },
            { name: "열공참", per: 0.095 },
            { name: "회선창", per: 0.06 },
            { name: "청룡출수", per: 0.06 },
            { name: "보정치", per: -0.155 },
        ],
    },
    {
        class: "충단",
        skill: [
            { name: "죽음의 선고", per: 0.172 },
            { name: "파쇄격", per: 0.149 },
            { name: "풍신권", per: 0.138 },
            { name: "진 용출권", per: 0.1 },
            { name: "연환파신권", per: 0.1 },
            { name: "초신성 폭발", per: 0.117 },
            { name: "심판", per: 0.064 },
            { name: "보정치", per: -0.1 },

        ],
    },
    {
        class: "체술",
        skill: [
            { name: "철포난격", per: 0.131 },
            { name: "난타연권", per: 0.129 },
            { name: "폭렬권", per: 0.101 },
            { name: "용의 강림", per: 0.05 },
            { name: "일망 타진", per: 0.042 },
            { name: "죽음의 선고", per: 0.032 },
            { name: "파쇄격", per: 0.032 },
            { name: "진 용출권", per: 0.032 },
            { name: "보정치", per: -0.064 },
        ],
    },
    {
        class: "심판 체술",
        skill: [
            { name: "철포난격", per: 0.142 },
            { name: "난타연권", per: 0.137 },
            { name: "폭렬권", per: 0.109 },
            { name: "용의 강림", per: 0.058 },
            { name: "죽음의 선고", per: 0.039 },
            { name: "파쇄격", per: 0.039 },
            { name: "진 용출권", per: 0.039 },
            { name: "보정치", per: -0.078 },
            // 총합: 0.485
        ],
    },
    {
        class: "4겁 체술",
        skill: [
            { name: "철포난격", per: 0.1515 },
            { name: "난타연권", per: 0.147 },
            { name: "폭렬권", per: 0.119 },
            { name: "용의 강림", per: 0.068 },
        ],
    },
    {
        class: "5겁 체술",
        skill: [
            { name: "철포난격", per: 0.1515 },
            { name: "난타연권", per: 0.147 },
            { name: "폭렬권", per: 0.119 },
            { name: "용의 강림", per: 0.068 },
            { name: "일망 타진", per: 0.068 },
        ],
    },
    {
        class: "도약 체술",
        skill: [
            { name: "용의 강림", per: 0.2 },
            { name: "난타연권", per: 0.11 },
            { name: "철포난격", per: 0.10 },
            { name: "폭렬권", per: 0.06 },
            { name: "일망 타진", per: 0.05 },
        ],
    },
    {
        class: "일격",
        skill: [
            { name: "오의 : 뇌호격", per: 0.193 },
            { name: "방천격", per: 0.024 },
            { name: "오의 : 호왕출현", per: 0.134 },
            { name: "오의 : 풍신초래", per: 0.134 },
            { name: "보정치", per: -0.134 },
        ],
    },
    {
        class: "풍신 일격",
        skill: [
            { name: "오의 : 풍신초래", per: 0.193 },
            { name: "방천격", per: 0.024 },
            { name: "오의 : 호왕출현", per: 0.134 },
        ],
    },
    {
        class: "호왕 폭쇄 일격",
        skill: [
            { name: "오의 : 호왕출현", per: 0.193 },
            { name: "방천격", per: 0.024 },
            { name: "오의 : 폭쇄진", per: 0.134 },
        ],
    },
    {
        class: "4멸 일격",
        skill: [
            { name: "오의 : 뇌호격", per: 0.193 },
            { name: "방천격", per: 0.024 },
            { name: "오의 : 호왕출현", per: 0.067 },
            { name: "오의 : 풍신초래", per: 0.067 },
        ],
    },
    {
        class: "무한풍신 일격",
        skill: [
            { name: "오의 : 풍신초래", per: 0.55 },
        ],
    },
    {
        class: "난무",
        skill: [
            { name: "오의 : 풍신초래", per: 0.234 },
            { name: "오의 : 호왕출현", per: 0.215 },
            { name: "오의 : 폭쇄진", per: 0.136 },
            { name: "오의 : 뇌호격", per: 0.116 },
            { name: "방천격", per: 0.063 },
        ],
    },
    {
        class: "권왕",
        skill: [
            { name: "파천섬광", per: 0.23 },
            { name: "권왕십이식", per: 0.327 },
            { name: "천기심권", per: 0.077 },
            { name: "유성 낙하", per: 0.059 },
            { name: "연의붕권", per: 0.059 },
            { name: "징벌의 파도", per: 0.059 },
            { name: "보정치", per: -0.118 },
        ],
    },
    {
        class: "진파천 권왕",
        skill: [
            { name: "파천섬광", per: 0.35 },
            { name: "권왕십이식", per: 0.33 },
            { name: "징벌의 파도", per: 0.06 },
        ],
    },
    {
        class: "3겁 권왕",
        skill: [
            { name: "파천섬광", per: 0.2595 },
            { name: "권왕십이식", per: 0.3565 },
            { name: "징벌의 파도", per: 0.077 },
            { name: "천기심권", per: 0.077 },
            { name: "보정치", per: -0.077 },
        ],
    },
    {
        class: "수라",
        skill: [
            { name: "수라결 기본 공격", per: 0.473 },
            { name: "파천섬광", per: 0.122 },
            { name: "진 파공권", per: 0.054 },
            { name: "유성 낙하", per: 0.05 },
            { name: "청월난무", per: 0.05 },
            { name: "비상격", per: 0.05 },
            { name: "보정치", per: -0.05 },

        ],
    },
    {
        class: "4겁 수라",
        skill: [
            { name: "수라결 기본 공격", per: 0.483 },
            { name: "파천섬광", per: 0.132 },
            { name: "진 파공권", per: 0.064 },
            { name: "비상격", per: 0.06 },
            { name: "유성낙하", per: 0.06 },
            { name: "징벌의 파도", per: 0.06 },
            { name: "보정치", per: -0.12 },
        ],
    },
    {
        class: "6겁 수라",
        skill: [
            { name: "수라결 기본 공격", per: 0.473 },
            { name: "파천섬광", per: 0.122 },
            { name: "진 파공권", per: 0.054 },
            { name: "유성 낙하", per: 0.05 },
            { name: "청월난무", per: 0.05 },
            { name: "비상격", per: 0.05 },
        ],
    },
    {
        class: "전탄",
        skill: [
            { name: "심판의 날", per: 0.18 },
            { name: "샷건 연사", per: 0.155 },
            { name: "종말의 전조", per: 0.087 },
            { name: "최후의 만찬", per: 0.113 },
            { name: "샷건의 지배자", per: 0.11 },
            { name: "조준 사격", per: 0.051 },
            { name: "데스페라도", per: 0.051 },
            { name: "원샷원킬", per: 0.051 },
            { name: "보정치", per: -0.102 },
        ],
    },
    {
        class: "7멸 핸건",
        skill: [
            { name: "데스페라도", per: 0.17 },
            { name: "이퀄리브리엄", per: 0.089 },
            { name: "퀵 샷", per: 0.067 },
            { name: "메테오 스트림", per: 0.083 },
            { name: "잔혹한 추적자", per: 0.061 },
            { name: "AT02 유탄", per: 0.049 },
            { name: "데스파이어", per: 0.045 },

        ],
    },
    {
        class: "핸건",
        skill: [
            { name: "데스페라도", per: 0.161 },
            { name: "이퀄리브리엄", per: 0.079 },
            { name: "퀵 샷", per: 0.082 },
            { name: "메테오 스트림", per: 0.086 },
            { name: "잔혹한 추적자", per: 0.067 },
            { name: "AT02 유탄", per: 0.04 },

        ],
    },
    {
        class: "포강",
        skill: [
            { name: "포격 스킬", per: 0.399 },
            { name: "미사일 폭격", per: 0.059 },
            { name: "공중 폭격", per: 0.053 },
            { name: "중력 폭발", per: 0.033 },
            { name: "고압열탄", per: 0.029 },

        ],
    },
    {
        class: "에필 5겁 포강",
        skill: [
            { name: "포격 스킬", per: 0.405 },
            { name: "미사일 폭격", per: 0.053 },
            { name: "중력 폭발", per: 0.033 },
            { name: "공중 폭격", per: 0.053 },
            { name: "고압열탄", per: 0.053 },
        ],
    },
        {
        class: "에필 포강",
        skill: [
            { name: "포격 스킬", per: 0.405 },
            { name: "중력 폭발", per: 0.033 },
            { name: "미사일 폭격", per: 0.053 },
            { name: "공중 폭격", per: 0.053 },
            { name: "고압열탄", per: 0.053 },
            { name: "보정치", per: -0.053 },
        ],
    },
    {
        class: "화강",
        skill: [
            { name: "고압열탄", per: 0.139 },
            { name: "미사일 폭격", per: 0.139 },
            { name: "공중 폭격", per: 0.129 },
            { name: "포탑 소환", per: 0.064 },
            { name: "다연장로켓포", per: 0.064 },
            { name: "화염방사기", per: 0.064 },
            { name: "보정치", per: -0.064 },

        ],
    },
    {
        class: "죽습",
        skill: [
            { name: "실버호크 스킬", per: 0.23 },
            { name: "스나이프", per: 0.198 },
            { name: "호크 샷", per: 0.087 },
            { name: "차징 샷", per: 0.08 },
            { name: "샤프 슈터", per: 0.075 },
            { name: "블레이드 스톰", per: 0.032 },
            { name: "애로우 해일", per: 0.032 },
            { name: "보정치", per: -0.032 },
        ],
    },
    {
        class: "지뢰 죽습",
        skill: [
            { name: "실버호크 스킬", per: 0.22 },
            { name: "스나이프", per: 0.188 },
            { name: "호크 샷", per: 0.077 },
            { name: "차징 샷", per: 0.07 },
            { name: "샤프 슈터", per: 0.065 },
            { name: "크레모아 지뢰", per: 0.082 },
        ],
    },
    {
        class: "두동",
        skill: [
            { name: "실버호크 스킬", per: 0.216 },
            { name: "스나이프", per: 0.158 },
            { name: "호크 샷", per: 0.094 },
            { name: "차징 샷", per: 0.093 },
            { name: "샤프 슈터", per: 0.079 },
            { name: "애로우 해일", per: 0.056 },

        ],
    },
    {
        class: "지뢰 두동",
        skill: [
            { name: "실버호크 스킬", per: 0.216 },
            { name: "스나이프", per: 0.158 },
            { name: "호크 샷", per: 0.094 },
            { name: "차징 샷", per: 0.093 },
            { name: "샤프 슈터", per: 0.079 },
            { name: "크레모아 지뢰", per: 0.056 },

        ],
    },
    {
        class: "블스 두동",
        skill: [
            { name: "실버호크 스킬", per: 0.216 },
            { name: "스나이프", per: 0.158 },
            { name: "호크 샷", per: 0.094 },
            { name: "차징 샷", per: 0.093 },
            { name: "샤프 슈터", per: 0.079 },
            { name: "블레이드 스톰", per: 0.056 },

        ],
    },
    {
        class: "기술",
        skill: [
            { name: "에너지 버스터", per: 0.20 },
            { name: "명령 : 베이비 드론", per: 0.118 },
            { name: "명령 : 레이드 미사일", per: 0.097 },
            { name: "아발란체", per: 0.049 },
            { name: "어나힐레이션 모드", per: 0.073 },
            { name: "명령 : 카펫", per: 0.074 },
            { name: "명령 : 플레어 빔", per: 0.074 },
            { name: "전술 사격", per: 0.074 },
            { name: "보정치", per: -0.148 },

        ],
    },
    {
        class: "5겁 기술",
        skill: [
            { name: "에너지 버스터", per: 0.21225 },
            { name: "명령 : 베이비 드론", per: 0.13025 },
            { name: "명령 : 레이드 미사일", per: 0.010925 },
            { name: "어나힐레이션 모드", per: 0.08525 },
            { name: "명령 : 카펫", per: 0.074 },
            { name: "명령 : 플레어 빔", per: 0.074 },
            { name: "전술 사격", per: 0.074 },
            { name: "보정치", per: -0.148 },

        ],
    },
    {
        class: "유산",
        skill: [
            { name: "싱크 스킬", per: 0.6853 },
        ],
    },
    {
        class: "피메",
        skill: [
            { name: "마탄의 사수", per: 0.161 },
            { name: "절멸의 탄환", per: 0.121 },
            { name: "포커스 샷", per: 0.139 },
            { name: "타겟 다운", per: 0.108 },
            { name: "대재앙", per: 0.062 },
            { name: "레인 오브 불릿", per: 0.059 },
            { name: "샷건 연사", per: 0.039 },
            { name: "퍼펙트 샷", per: 0.039 },
            { name: "보정치", per: -0.039 },

        ],
    },
    {
        class: "6M 피메",
        skill: [
            { name: "마탄의 사수", per: 0.171 },
            { name: "절멸의 탄환", per: 0.131 },
            { name: "포커스 샷", per: 0.149 },
            { name: "타겟 다운", per: 0.118 },
            { name: "레인 오브 불릿", per: 0.069 },
            { name: "샷건 연사", per: 0.049 },

        ],
    },
    {
        class: "사시",
        skill: [
            { name: "로즈 블로섬", per: 0.395 },
            { name: "포커스 샷", per: 0.133 },
            { name: "대재앙", per: 0.07 },
            { name: "퍼펙트 샷", per: 0.045 },
            { name: "타겟 다운", per: 0.09 },
            { name: "레인 오브 불릿", per: 0.065 },
            { name: "스파이럴 플레임", per: 0.038 },
        ],
    },
    {
        class: "6겁 사시",
        skill: [
            { name: "로즈 블로섬", per: 0.40 },
            { name: "포커스 샷", per: 0.141 },
            { name: "대재앙", per: 0.075 },
            { name: "퍼펙트 샷", per: 0.058 },
            { name: "타겟 다운", per: 0.095 },
            { name: "레인 오브 불릿", per: 0.07 },
        ],
    },
    {
        class: "레오불 사시",
        skill: [
            { name: "로즈 블로섬", per: 0.395 },
            { name: "포커스 샷", per: 0.133 },
            { name: "레인 오브 불릿", per: 0.11 },
            { name: "타겟 다운", per: 0.09 },
            { name: "대재앙", per: 0.07 },
            { name: "스파이럴 플레임", per: 0.038 },
        ],
    },
    {
        class: "황후",
        skill: [
            { name: "시크릿 가든", per: 0.206 },
            { name: "셀레스티얼 레인", per: 0.167 },
            { name: "세렌디피티", per: 0.068 },
            { name: "포 카드", per: 0.104 },

        ],
    },
    {
        class: "황제",
        skill: [
            { name: "다크 리저렉션", per: 0.167 },
            { name: "이보크", per: 0.152 },
            { name: "셀레스티얼 레인", per: 0.101 },
            { name: "언리미티드 셔플", per: 0.089 },
            { name: "황제", per: 0.163 },
        ],
    },
    {
        class: "또황",
        skill: [
            { name: "다크 리저렉션", per: 0.167 },
            { name: "이보크", per: 0.160 },
            { name: "언리미티드 셔플", per: 0.045 },
            { name: "황제", per: 0.300 },
        ],
    },
    {
        class: "체크메이트 황제",
        skill: [
            { name: "체크메이트", per: 0.27 },
            { name: "황제", per: 0.16 },
            { name: "이보크", per: 0.15 },
            { name: "다크 리저렉션", per: 0.12 },
        ],
    },
    {
        class: "스파인플라워 황제",
        skill: [
            { name: "황제", per: 0.163 },
            { name: "다크 리저렉션", per: 0.167 },
            { name: "이보크", per: 0.152 },
            { name: "언리미티드 셔플", per: 0.101 },
            { name: "댄싱 오브 스파인플라워", per: 0.089 },
        ],
    },
    {
        class: "교감",
        skill: [
            { name: "고대의 창", per: 0.114 },
            { name: "마리린", per: 0.164 },
            { name: "대지 붕괴", per: 0.07 },
            { name: "마력의 질주", per: 0.033 },
            { name: "엘씨드", per: 0.132 },
            { name: "파우루", per: 0.139 },
            { name: "슈르디", per: 0.032 },
        ],
    },
    {
        class: "상소",
        skill: [
            { name: "고대의 정령 스킬", per: 0.51 },
            { name: "대지 붕괴", per: 0.052 },
            { name: "마력의 질주", per: 0.029 },
            { name: "고대의 창", per: 0.09 },

        ],
    },
    {
        class: "고창 상소",
        skill: [
            { name: "고대의 창", per: 0.75 },

        ],
    },
    {
        class: "점화",
        skill: [
            { name: "종말의 날", per: 0.282 },
            { name: "익스플로전", per: 0.158 },
            { name: "천벌", per: 0.152 },
            { name: "숭고한 해일", per: 0.079 },
            { name: "아이스 애로우", per: 0.079 },
            { name: "인페르노", per: 0.056 },
            { name: "엘리멘탈 리액트", per: 0.056 },
            { name: "보정치", per: -0.135 },

        ],
    },
    {
        class: "7딜 환류",
        skill: [
            { name: "리버스 그래비티", per: 0.146 },
            { name: "아이스 애로우", per: 0.117 },
            { name: "엘리멘탈 리액트", per: 0.118 },
            { name: "인페르노", per: 0.088 },
            { name: "숭고한 해일", per: 0.088 },
            { name: "천벌", per: 0.083 },
            { name: "혹한의 부름", per: 0.083 },
            { name: "블레이즈", per: 0.059 },
            { name: "보정치", per: -0.083 },
        ],
    },
    {
        class: "환류",
        skill: [
            { name: "리버스 그래비티", per: 0.145 },
            { name: "아이스 애로우", per: 0.10 },
            { name: "엘리멘탈 리액트", per: 0.12 },
            { name: "종말의 날", per: 0.11 },
            { name: "숭고한 해일", per: 0.011 },
            { name: "천벌", per: 0.11 },
            { name: "블레이즈", per: 0.11 },
            { name: "인페르노", per: 0.11 },
            { name: "보정치", per: -0.22 },
        ],
    },
    {
        class: "충동",
        skill: [
            { name: "악마 스킬", per: 0.704 },
        ],
    },
    {
        class: "억제",
        skill: [
            { name: "크루얼 커터", per: 0.135 },
            { name: "그라인드 체인", per: 0.114 },
            { name: "스피닝 웨폰", per: 0.109 },
            { name: "피어스 쏜", per: 0.058 },
            { name: "데시메이트", per: 0.053 },
        ],
    },
    {
        class: "반사멸 억모닉",
        skill: [
            { name: "크루얼 커터", per: 0.135 },
            { name: "데몰리션", per: 0.114 },
            { name: "그라인드 체인", per: 0.109 },
            { name: "피어스 쏜", per: 0.109 },
            { name: "스피닝 웨폰", per: 0.109 },
            { name: "쓰러스트 임팩트", per: 0.058 },
            { name: "샤펀 컷", per: 0.058 },
            { name: "데시메이트", per: 0.053 },
            { name: "보정치", per: -0.276 },
        ],
    },
    {
        class: "사멸 억모닉",
        skill: [
            { name: "크루얼 커터", per: 0.125 },
            { name: "데몰리션", per: 0.114 },
            { name: "쓰러스트 임팩트", per: 0.084 },
            { name: "샤펀 컷", per: 0.063 },
            { name: "데시메이트", per: 0.058 },
            { name: "라이징 클로", per: 0.025 },
        ],
    },
    {
        class: "잠식 억모닉",
        skill: [
            { name: "데몬 비전", per: 0.25 },
            { name: "데시메이트", per: 0.19 },
            { name: "피어스 쏜", per: 0.19 },
            { name: "제노사이드", per: 0.10 },
            { name: "데몬 그랩", per: 0.03 },
            { name: "라이징 클로", per: 0.03 },
            { name: "보정치", per: -0.03 },
        ],
    },
    {
        class: "서징스톰 억제",
        skill: [
            { name: "크루얼 커터", per: 0.135 },
            { name: "그라인드 체인", per: 0.114 },
            { name: "스피닝 웨폰", per: 0.109 },
            { name: "피어스 쏜", per: 0.055 },
            { name: "데시메이트", per: 0.055 },
            { name: "보정치", per: -0.055 },
        ],
    },
    {
        class: "갈증",
        skill: [
            { name: "레이지 스피어", per: 0.171 },
            { name: "라스트 그래피티", per: 0.152 },
            { name: "댄싱 오브 퓨리", per: 0.129 },
            { name: "사일런트 스매셔", per: 0.097 },
            { name: "쉐도우 스톰", per: 0.078 },

        ],
    },
    {
        class: "달소",
        skill: [
            { name: "레이지 스피어", per: 0.215 },
            { name: "댄싱 오브 퓨리", per: 0.143 },
            { name: "라스트 그래피티", per: 0.168 },
        ],
    },
    {
        class: "잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.191 },
            { name: "소울 앱소버", per: 0.13 },
            { name: "데스 센텐스", per: 0.108 },
            { name: "보이드 스트라이크", per: 0.098 },
            { name: "트윈 쉐도우", per: 0.08 },
            { name: "어스 슬래쉬", per: 0.065 },
            { name: "터닝 슬래쉬", per: 0.059 },
            // 합계: 0.731
        ],
    },
    {
        class: "8딜 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.191 },
            { name: "데스 센텐스", per: 0.13 },
            { name: "트윈 쉐도우", per: 0.10 },
            { name: "소울 앱소버", per: 0.08 },
            { name: "터닝 슬래쉬", per: 0.06 },
            { name: "블리츠 러시", per: 0.065 },
            { name: "보이드 스트라이크", per: 0.05 },
            { name: "어스 슬래쉬", per: 0.055 },
            // 합계: 0.731
        ],
    },
    {
        class: "블리츠 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.191 },
            { name: "소울 앱소버", per: 0.13 },
            { name: "데스 센텐스", per: 0.108 },
            { name: "블리츠 러시", per: 0.098 },
            { name: "트윈 쉐도우", per: 0.08 },
            { name: "어스 슬래쉬", per: 0.065 },
            { name: "터닝 슬래쉬", per: 0.059 },

        ],
    },
    {
        class: "어슬 작열 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.205 },
            { name: "소울 앱소버", per: 0.143 },
            { name: "데스 센텐스", per: 0.112 },
            { name: "보이드 스트라이크", per: 0.113 },
            { name: "트윈 쉐도우", per: 0.095 },
            { name: "어스 슬래쉬", per: 0.063 },
            { name: "터닝 슬래쉬", per: 0.063 },
            { name: "보정치", per: -0.063 },
        ],
    },
    {
        class: "어슬 작열 블리츠 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.205 },
            { name: "소울 앱소버", per: 0.143 },
            { name: "데스 센텐스", per: 0.112 },
            { name: "블리츠 러시", per: 0.113 },
            { name: "트윈 쉐도우", per: 0.095 },
            { name: "어스 슬래쉬", per: 0.063 },
        ],
    },
    {
        class: "어슬 작열 슈차 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.205 },
            { name: "소울 앱소버", per: 0.143 },
            { name: "데스 센텐스", per: 0.112 },
            { name: "블리츠 러시", per: 0.113 },
            { name: "보이드 스트라이크", per: 0.095 },
            { name: "어스 슬래쉬", per: 0.063 },
        ],
    },
    {
        class: "슈차 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.165 },
            { name: "소울 앱소버", per: 0.159 },
            { name: "데스 센텐스", per: 0.107 },
            { name: "보이드 스트라이크", per: 0.129 },
            { name: "블리츠 러시", per: 0.237 },
            { name: "어스 슬래쉬", per: 0.056 },

        ],
    },
    {
        class: "슈차 터닝 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.17 },
            { name: "소울 앱소버", per: 0.164 },
            { name: "터닝 슬래쉬", per: 0.087 },
            { name: "보이드 스트라이크", per: 0.129 },
            { name: "블리츠 러시", per: 0.242 },
            { name: "어스 슬래쉬", per: 0.061 },

        ],
    },
    {
        class: "슈차 문라 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.1672 },
            { name: "소울 앱소버", per: 0.1612 },
            { name: "문라이트 소닉", per: 0.0963 },
            { name: "보이드 스트라이크", per: 0.1312 },
            { name: "블리츠 러시", per: 0.2392 },
            { name: "어스 슬래쉬", per: 0.0582 },

        ],
    },
    {
        class: "슈차 7멸 잔재",
        skill: [
            { name: "블레이드 버스트", per: 0.1552 },
            { name: "소울 앱소버", per: 0.1492 },
            { name: "데스 센텐스", per: 0.0972 },
            { name: "보이드 스트라이크", per: 0.1192 },
            { name: "블리츠 러시", per: 0.2272 },
            { name: "어스 슬래쉬", per: 0.056 },
            { name: "터닝 슬래쉬", per: 0.049 },
            { name: "보정치", per: -0.015 },
        ],
    },
    {
        class: "버스트",
        skill: [
            { name: "블레이드 버스트", per: 0.576 },
            { name: "블리츠 러시", per: 0.072 },
            { name: "블레이드 댄스", per: 0.058 },
            { name: "보이드 스트라이크", per: 0.058 },
            { name: "터닝 슬래쉬", per: 0.046 },
            { name: "어스 슬래쉬", per: 0.031 },
            { name: "보정치", per: -0.058 },

        ],
    },
    {
        class: "만월",
        skill: [
            { name: "길로틴 스윙", per: 0.276 },
            { name: "베스티지", per: 0.196 },
            { name: "소울 시너스", per: 0.176 },
        ],
    },
    {
        class: "그믐",
        skill: [
            { name: "길로틴 스윙", per: 0.165 },
            { name: "리탈 스피닝", per: 0.13 },
            { name: "베스티지", per: 0.09 },
            { name: "소울 시너스", per: 0.08 },
            { name: "하베스트", per: 0.07 },

        ],
    },
    {
        class: "2사신 그믐",
        skill: [
            { name: "길로틴 스윙", per: 0.195 },
            { name: "베스티지", per: 0.138 },
            { name: "리탈 스피닝", per: 0.136 },
            { name: "루나틱 엣지", per: 0.057 },
            { name: "러스트 네일", per: 0.057 },
            { name: "하베스트", per: 0.063 },

        ],
    },
    {
        class: "광월야 그믐",
        skill: [
            { name: "길로틴 스윙", per: 0.2 },
            { name: "베스티지", per: 0.15 },
            { name: "소울 시너스", per: 0.14 },
            { name: "리탈 스피닝", per: 0.07 },
            { name: "데스 위핑", per: 0.07 },
            { name: "보정치", per: -0.07 },


        ],
    },
    {
        class: "이슬비",
        skill: [
            { name: "뙤약볕", per: 0.12 },
            { name: "싹쓸바람", per: 0.112 },
            { name: "소용돌이", per: 0.085 },
            { name: "여우비 스킬", per: 0.07 },
            { name: "소나기", per: 0.072 },
            { name: "날아가기", per: 0.055 },
            { name: "센바람", per: 0.055 },
            { name: "보정치", per: -0.055 },

        ],
    },
    {
        class: "7겁 이슬비",
        skill: [
            { name: "뙤약볕", per: 0.113 },
            { name: "싹쓸바람", per: 0.104 },
            { name: "소용돌이", per: 0.077 },
            { name: "여우비 스킬", per: 0.062 },
            { name: "소나기", per: 0.064 },
            { name: "날아가기", per: 0.047 },
            { name: "센바람", per: 0.047 },
        ],
    },
    {
        class: "질풍",
        skill: [
            { name: "바람송곳", per: 0.158 },
            { name: "칼바람", per: 0.158 },
            { name: "몰아치기", per: 0.086 },
            { name: "회오리 걸음", per: 0.054 },
            { name: "여우비 스킬", per: 0.041 },
            { name: "싹쓸바람", per: 0.05 },
            { name: "소용돌이", per: 0.05 },
            { name: "마주바람", per: 0.05 },
            { name: "뙤약볕", per: 0.05 },
            { name: "보정치", per: -0.1 },

        ],
    },
    {
        class: "6멸 질풍",
        skill: [
            { name: "바람송곳", per: 0.158 },
            { name: "칼바람", per: 0.158 },
            { name: "몰아치기", per: 0.086 },
            { name: "회오리 걸음", per: 0.054 },
            { name: "여우비 스킬", per: 0.041 },
            { name: "싹쓸바람", per: 0.05 },
            { name: "소용돌이", per: 0.05 },
            { name: "마주바람", per: 0.05 },
            { name: "뙤약볕", per: 0.05 },
            { name: "보정치", per: -0.15 },

        ],
    },
    {
        class: "5멸 질풍",
        skill: [
            { name: "바람송곳", per: 0.178 },
            { name: "칼바람", per: 0.178 },
            { name: "몰아치기", per: 0.096 },
            { name: "싹쓸바람", per: 0.06 },
            { name: "소용돌이", per: 0.06 },
            { name: "뙤약볕", per: 0.06 },
            { name: "회오리 걸음", per: 0.059 },
            { name: "보정치", per: -0.12 },
        ],
    },
    {
        class: "야성",
        skill: [
            { name: "둔갑 금술 스킬", per: 0.301 },
            { name: "여우 꼬리물기", per: 0.095 },
            { name: "여우 불꽃", per: 0.122 },
            { name: "여우 구슬", per: 0.074 },
            { name: "바위 곰", per: 0.114 },
            { name: "슈웅 곰", per: 0.136 },
            { name: "여우 폴짝", per: 0.136 },
            { name: "보정치", per: -0.136 },
        ],
    },
    {
        class: "데이터 없음",
        skill: [
            { name: "기타", per: 1 },
        ],
    },
];

export let arkgridCoreFilter = {
    "분망": {
        mainCore: [
            "질서의 해 코어 : 특이점",
            "질서의 해 코어 : 차원 붕괴",
            "질서의 해 코어 : 어스 웨이브",
            "질서의 달 코어 : 완벽한 제어",
            "질서의 달 코어 : 중력 강화",
            "질서의 달 코어 : 중력 질주"
        ],
        starCore: [
            "질서의 별 코어 : 끊어진 사슬",
            "질서의 별 코어 : 몰아치는 해방",
            "질서의 별 코어 : 무모한 한방",
        ],
    },
    "중수": {
        mainCore: [
            "질서의 해 코어 : 중력 역전",
            "질서의 해 코어 : 중력 파괴",
            "질서의 해 코어 : 그라비티 코어",
            "질서의 달 코어 : 사건의 지평선",
            "질서의 달 코어 : 중력 순환",
            "질서의 달 코어 : 몰아치는 중력",
        ],
        starCore: [
            "질서의 별 코어 : 붕괴",
            "질서의 별 코어 : 바위 칼날",
            "질서의 별 코어 : 대지 부수기",
        ],
    },
    
    "고기": {
        mainCore: [
            "질서의 해 코어 : 전술 제어",
            "질서의 해 코어 : 창술",
            "질서의 해 코어 : 종전",
            "질서의 달 코어 : 방어 전술",
            "질서의 달 코어 : 스트라이크 포인트",
            "질서의 달 코어 : 랜스 차지",
        ],
        starCore: [
            "질서의 별 코어 : 방어 포격",
            "질서의 별 코어 : 확정된 포격",
            "질서의 별 코어 : 크로스 랜스",
        ],
    },
    "전태": {
        mainCore: [
            "질서의 해 코어 : 방패 연계",
            "질서의 해 코어 : 연속 돌진",
            "질서의 해 코어 : 천둥",
            "질서의 달 코어 : 방패술",
            "질서의 달 코어 : 함성 돌진",
            "질서의 달 코어 : 번개폭풍",
        ],
        starCore: [
            "질서의 별 코어 : 방패 타격",
            "질서의 별 코어 : 전차 돌진진",
            "질서의 별 코어 : 광역 낙뢰",
        ],
    },
    "비기": {
        mainCore: [
            "질서의 해 코어 : 콤비네이션",
            "질서의 해 코어 : 오버 파워",
            "질서의 해 코어 : 파워 코어",
            "질서의 달 코어 : 피의 순환",
            "질서의 달 코어 : 오버 버스트",
            "질서의 달 코어 : 브레이크 대시",
        ],
        starCore: [
            "질서의 별 코어 : 분쇄 폭풍",
            "질서의 별 코어 : 오버플로우",
            "질서의 별 코어 : 브레이크 아웃",
        ],
    },
    "광기": {
        mainCore: [
            "질서의 해 코어 : 다크 파워",
            "질서의 해 코어 : 파워드라이브",
            "질서의 해 코어 : 홀드 엣지",
            "질서의 달 코어 : 어둠의 격류",
            "질서의 달 코어 : 래피드 슬래쉬",
            "질서의 달 코어 : 사이클론 슬래쉬",
        ],
        starCore: [
            "질서의 별 코어 : 광란",
            "질서의 별 코어 : 연참",
            "질서의 별 코어 : 지옥 뒤집기",
        ],
    },
    "심판자": {
        mainCore: [
            "질서의 해 코어 : 신의 권능",
            "질서의 해 코어 : 성스러운 일격",
            "질서의 해 코어 : 신의 계시",
            "질서의 달 코어 : 빛의 참격",
            "질서의 달 코어 : 천상의 검",
            "질서의 달 코어 : 단죄",
        ],
        starCore: [
            "질서의 별 코어 : 참하는 검",
            "질서의 별 코어 : 신성한 검",
            "질서의 별 코어 : 찬란한 검",
        ],
    },
    "처단": {
        mainCore: [
            "질서의 해 코어 : 단두대",
            "질서의 해 코어 : 분노압축",
            "질서의 해 코어 : 격노폭발",
            "질서의 달 코어 : 단죄의 칼날",
            "질서의 달 코어 : 힘의 응축",
            "질서의 달 코어 : 교차된 힘",
        ],
        starCore: [
            "질서의 별 코어 : 처형",
            "질서의 별 코어 : 분쇄",
            "질서의 별 코어 : 신중한 강타",
        ],
    },
    "포식": {
        mainCore: [
            "질서의 해 코어 : 차오르는 분노",
            "질서의 해 코어 : 예측불가",
            "질서의 해 코어 : 회오리",
            "질서의 달 코어 : 코어 임팩트",
            "질서의 달 코어 : 분노격화",
            "질서의 달 코어 : 소용돌이",
        ],
        starCore: [
            "질서의 별 코어 : 즉결 처형",
            "질서의 별 코어 : 마무리 일격",
            "질서의 별 코어 : 파괴의 바람",
        ],
    },
    "빛의 기사": {
        mainCore: [
            "질서의 해 코어 : 종언",
            "질서의 해 코어 : 기원",
            "질서의 해 코어 : 속삭이는 검",
            "질서의 달 코어 : 종언의 기사",
            "질서의 달 코어 : 빛의 안식",
            "질서의 달 코어 : 눈부신 정의",
        ],
        starCore: [
            "질서의 별 코어 : 진정한 종언",
            "질서의 별 코어 : 성휘의 집행",
            "질서의 별 코어 : 강화된 정의",
        ],
    },
    "초심": {
        mainCore: [
            "질서의 해 코어 : 연격강타",
            "질서의 해 코어 : 극의귀원",
            "질서의 해 코어 : 삼문 개방",
            "질서의 달 코어 : 초강풍각",
            "질서의 달 코어 : 귀원화신",
            "질서의 달 코어 : 초순환",
        ],
        starCore: [
            "질서의 별 코어 : 극선풍각",
            "질서의 별 코어 : 파천격",
            "질서의 별 코어 : 용류 강화",
        ],
    },
    "오의": {
        mainCore: [
            "질서의 해 코어 : 패황불패",
            "질서의 해 코어 : 화룡순환",
            "질서의 해 코어 : 오기강체",
            "질서의 달 코어 : 패황지도",
            "질서의 달 코어 : 화룡진천",
            "질서의 달 코어 : 심안",
        ],
        starCore: [
            "질서의 별 코어 : 창풍극의",
            "질서의 별 코어 : 폭룡천상",
            "질서의 별 코어 : 패황권",
        ],
    },
    "충단": {
        mainCore: [
            "질서의 해 코어 : 충격 폭주",
            "질서의 해 코어 : 충격파",
            "질서의 해 코어 : 충격 억제",
            "질서의 달 코어 : 충격 강화",
            "질서의 달 코어 : 대지 연타",
            "질서의 달 코어 : 기력 절약",
        ],
        starCore: [
            "질서의 별 코어 : 오브 폭발",
            "질서의 별 코어 : 지면 분쇄",
            "질서의 별 코어 : 역발산",
        ],
    },
    "체술": {
        mainCore: [
            "질서의 해 코어 : 대지 붕괴",
            "질서의 해 코어 : 반복 도약",
            "질서의 해 코어 : 투지 억제",
            "질서의 달 코어 : 투지 강화",
            "질서의 달 코어 : 치명적인 도약",
            "질서의 달 코어 : 상시 강화",
        ],
        starCore: [
            "질서의 별 코어 : 대지 파괴",
            "질서의 별 코어 : 흑룡의 도약",
            "질서의 별 코어 : 연격",
        ],
    },
    "역천": {
        mainCore: [
            "질서의 해 코어 : 기강결",
            "질서의 해 코어 : 기류탄화",
            "질서의 해 코어 : 맹공",
            "질서의 달 코어 : 금강진체",
            "질서의 달 코어 : 열파전조",
            "질서의 달 코어 : 회기진천공",
        ],
        starCore: [
            "질서의 별 코어 : 천화난무",
            "질서의 별 코어 : 진혼섬포",
            "질서의 별 코어 : 번천귀류",
        ],
    },
    "세맥": {
        mainCore: [
            "질서의 해 코어 : 임독양맥 타통",
            "질서의 해 코어 : 대회전",
            "질서의 해 코어 : 적수공권",
            "질서의 달 코어 : 귀환결",
            "질서의 달 코어 : 소주천",
            "질서의 달 코어 : 순섬보",
        ],
        starCore: [
            "질서의 별 코어 : 벽파장공",
            "질서의 별 코어 : 운기폭",
            "질서의 별 코어 : 쌍파연격",
        ],
    },
    "절정": {
        mainCore: [
            "질서의 해 코어 : 적룡의 기운",
            "질서의 해 코어 : 적룡연격",
            "질서의 해 코어 : 연가 창식",
            "질서의 달 코어 : 일점 집중",
            "질서의 달 코어 : 집중 강화",
            "질서의 달 코어 : 청룡기",
        ],
        starCore: [
            "질서의 별 코어 : 진화의 끝",
            "질서의 별 코어 : 한 점 돌파",
            "질서의 별 코어 : 창의 바람",
        ],
    },
    "절제": {
        mainCore: [
            "질서의 해 코어 : 질풍연격",
            "질서의 해 코어 : 연가일섬",
            "질서의 해 코어 : 맹룡오격",
            "질서의 달 코어 : 맹룡의 기운",
            "질서의 달 코어 : 비기승화",
            "질서의 달 코어 : 연환 타격",
        ],
        starCore: [
            "질서의 별 코어 : 이중 비기",
            "질서의 별 코어 : 환영",
            "질서의 별 코어 : 연격 난무",
        ],
    },
    "일격": {
        mainCore: [
            "질서의 해 코어 : 호령",
            "질서의 해 코어 : 광폭",
            "질서의 해 코어 : 풍신",
            "질서의 달 코어 : 천뢰포효",
            "질서의 달 코어 : 호뢰진",
            "질서의 달 코어 : 풍진천뢰",
        ],
        starCore: [
            "질서의 별 코어 : 뇌호극권",
            "질서의 별 코어 : 쌍극광폭진",
            "질서의 별 코어 : 섬풍뢰참",
        ],
    },
    "난무": {
        mainCore: [
            "질서의 해 코어 : 광파섬",
            "질서의 해 코어 : 산군",
            "질서의 해 코어 : 외공",
            "질서의 달 코어 : 풍뢰보",
            "질서의 달 코어 : 뇌호파천",
            "질서의 달 코어 : 파한오의",
        ],
        starCore: [
            "질서의 별 코어 : 신왕화신",
            "질서의 별 코어 : 초극뇌연격",
            "질서의 별 코어 : 파극권",
        ],
    },
    "권왕": {
        mainCore: [
            "질서의 해 코어 : 진 권왕",
            "질서의 해 코어 : 파천경",
            "질서의 해 코어 : 충전된 충격",
            "질서의 달 코어 : 권왕태세",
            "질서의 달 코어 : 진 파천섬광",
            "질서의 달 코어 : 충격 충전",
        ],
        starCore: [
            "질서의 별 코어 : 권왕십이식",
            "질서의 별 코어 : 파천 돌파",
            "질서의 별 코어 : 포스 건틀릿",
        ],
    },
    "수라": {
        mainCore: [
            "질서의 해 코어 : 파천기",
            "질서의 해 코어 : 수라안",
            "질서의 해 코어 : 그림자 주먹",
            "질서의 달 코어 : 개 파천섬광",
            "질서의 달 코어 : 수라결",
            "질서의 달 코어 : 종횡무진",
        ],
        starCore: [
            "질서의 별 코어 : 전천극",
            "질서의 별 코어 : 수라",
            "질서의 별 코어 : 징벌",
        ],
    },
    "전탄": {
        mainCore: [
            "질서의 해 코어 : 블러드 하운드",
            "질서의 해 코어 : 데드 샷",
            "질서의 해 코어 : 샷건 오버로드",
            "질서의 달 코어 : 산탄강화",
            "질서의 달 코어 : 무결점 조준",
            "질서의 달 코어 : 광란의 해결사",
        ],
        starCore: [
            "질서의 별 코어 : 탄환 폭발",
            "질서의 별 코어 : 아이언 사이트",
            "질서의 별 코어 : 지배자의 탄환",
        ],
    },
    "핸건": {
        mainCore: [
            "질서의 해 코어 : 섀도우 불릿",
            "질서의 해 코어 : 히든 팽",
            "질서의 해 코어 : 데드 토스",
            "질서의 달 코어 : 하늘의 지배자",
            "질서의 달 코어 : 긴박한 해결사",
            "질서의 달 코어 : 이터널 리볼버",
        ],
        starCore: [
            "질서의 별 코어 : 불릿 샤워",
            "질서의 별 코어 : 실버 불릿",
            "질서의 별 코어 : 끝없는 나선",
        ],
    },
    "포강": {
        mainCore: [
            "질서의 해 코어 : 폭격",
            "질서의 해 코어 : 슛 앤 스쿳",
            "질서의 해 코어 : 포화 전차",
            "질서의 달 코어 : 래피드 탱크",
            "질서의 달 코어 : 과열된 포탄",
            "질서의 달 코어 : 세이프 존",
        ],
        starCore: [
            "질서의 별 코어 : 시 오브 파이어",
            "질서의 별 코어 : 타임 온 타겟",
            "질서의 별 코어 : 초토화",
        ],
    },
    "화강": {
        mainCore: [
            "질서의 해 코어 : 탄약 수집가",
            "질서의 해 코어 : 데몬 파이어",
            "질서의 해 코어 : 점핑맨",
            "질서의 달 코어 : 질풍 포병",
            "질서의 달 코어 : 무한 연소",
            "질서의 달 코어 : 도약의 순간",
        ],
        starCore: [
            "질서의 별 코어 : 아이언 샤워",
            "질서의 별 코어 : 웰던맨",
            "질서의 별 코어 : 오토 락온",
        ],
    },
    "죽습": {
        mainCore: [ 
            "질서의 해 코어 : TA-09 피어싱 애로우",
            "질서의 해 코어 : ATB-07 니들레인",
            "질서의 해 코어 : TA-12 버스팅 애로우",
            "질서의 달 코어 : HSU-98 버드 스트라이크",
            "질서의 달 코어 : HSU-21 실버 레인",
            "질서의 달 코어 : HSU-13 특제 고폭약",
        ],
        starCore: [
            "질서의 별 코어 : HSU-04 자동 제어 스코프",
            "질서의 별 코어 : HSU-17 일렉트릭 노바",
            "질서의 별 코어 : HSU-31 블록버스터",
        ],
    },
    "두동": {
        mainCore: [
            "질서의 해 코어 : ATB-03 볼트 랩터",
            "질서의 해 코어 : TA-64 리퍼 볼트",
            "질서의 해 코어 : ATB-19 스톰리피터",
            "질서의 달 코어 : HSU-99 버드 스톰",
            "질서의 달 코어 : HSU-08 고강도 케이블",
            "질서의 달 코어 : HSU-37 연사 보조기",
        ],
        starCore: [
            "질서의 별 코어 : HSU-06 레이저사이트",
            "질서의 별 코어 : HSU-57 근력 보조 장갑",
            "질서의 별 코어 : HSU-22 사지 안정기",
        ],
    },
    "기술": {
        mainCore: [
            "질서의 해 코어 : 퀀텀 오퍼레이티브",
            "질서의 해 코어 : 에이전트 SMG",
            "질서의 해 코어 : 펄스 노바",
            "질서의 달 코어 : 대용량 배터리",
            "질서의 달 코어 : 불릿 템페스트",
            "질서의 달 코어 : 에너지 아포칼립스",
        ],
        starCore: [
            "질서의 별 코어 : 배터리 출력 강화",
            "질서의 별 코어 : 소각 집행",
            "질서의 별 코어 : 제로백 버스트",
        ],
    },
    "유산": {
        mainCore: [
            "질서의 해 코어 : 아스트라 슈트",
            "질서의 해 코어 : 봄버 슈트",
            "질서의 해 코어 : 카터 슈트",
            "질서의 달 코어 : 퍼펙트 싱크",
            "질서의 달 코어 : 자폭 모듈",
            "질서의 달 코어 : 어썰트 타이탄",
        ],
        starCore: [
            "질서의 별 코어 : 초감각 동기화",
            "질서의 별 코어 : 제로 - 카운트 다운",
            "질서의 별 코어 : 코어 리액터 증폭",
        ],
    },
    "피메": {
        mainCore: [
            "질서의 해 코어 : 티거 미스트리스",
            "질서의 해 코어 : 연회의 잔향",
            "질서의 해 코어 : 트루 에임",
            "질서의 달 코어 : 제너럴리스트",
            "질서의 달 코어 : 체인지 암즈",
            "질서의 달 코어 : 방패 조준",
        ],
        starCore: [
            "질서의 별 코어 : 올라운더",
            "질서의 별 코어 : 블로우 백",
            "질서의 별 코어 : 핀포인트",
        ],
    },
    "사시": {
        mainCore: [
            "질서의 해 코어 : 미드나잇 로즈",
            "질서의 해 코어 : 무법지대",
            "질서의 해 코어 : 유단자",
            "질서의 달 코어 : 철갑파쇄탄",
            "질서의 달 코어 : 불릿 무빙",
            "질서의 달 코어 : 건법",
        ],
        starCore: [
            "질서의 별 코어 : 정밀 타격",
            "질서의 별 코어 : 풀 매거진",
            "질서의 별 코어 : 힐 스트라이크",
        ],
    },
    "진실된 용맹": {
        mainCore: [
            "질서의 해 코어 : 불굴의 세레나데",
            "질서의 해 코어 : 템페스트 리프레인",
            "질서의 해 코어 : 쇼크 루프",
            "질서의 달 코어 : 기원의 세레나데",
            "질서의 달 코어 : 세컨드 임팩트",
            "질서의 달 코어 : 조화의 연주",
        ],
        starCore: [
            "질서의 별 코어 : 음파 강화",
            "질서의 별 코어 : 사운드 블리츠",
            "질서의 별 코어 : 듀얼 쇼크",
        ],
    },
    "교감": {
        mainCore: [
            "질서의 해 코어 : 정령 결속",
            "질서의 해 코어 : 강화 폭주",
            "질서의 해 코어 : 기초 훈련",
            "질서의 달 코어 : 결속 증폭",
            "질서의 달 코어 : 폭주 집중",
            "질서의 달 코어 : 강풍 진화",
        ],
        starCore: [
            "질서의 별 코어 : 증폭 공명",
            "질서의 별 코어 : 명령 각성",
            "질서의 별 코어 : 전술 명령",
        ],
    },
    "상소": {
        mainCore: [
            "질서의 해 코어 : 힘의 계승",
            "질서의 해 코어 : 고대의 유산",
            "질서의 해 코어 : 힘의 순환",
            "질서의 달 코어 : 힘의 집중",
            "질서의 달 코어 : 오쉬의 지원",
            "질서의 달 코어 : 정령의 고리",
        ],
        starCore: [
            "질서의 별 코어 : 힘의 균형",
            "질서의 별 코어 : 창세의 힘",
            "질서의 별 코어 : 정령 인도자",
        ],
    },
    "황후": {
        mainCore: [
            "질서의 해 코어 : 엣지 오브 페이트",
            "질서의 해 코어 : 인피니티 덱",
            "질서의 해 코어 : 루인 서브셋",
            "질서의 달 코어 : 엣지 콤보",
            "질서의 달 코어 : 체인 드로우",
            "질서의 달 코어 : 루인 풀셋",
        ],
        starCore: [
            "질서의 별 코어 : 스트림 오브 엣지",
            "질서의 별 코어 : 페이탈 핸드",
            "질서의 별 코어 : 루인 마이너셋",
        ],
    },
    "황제": {
        mainCore: [
            "질서의 해 코어 : 하이 템포",
            "질서의 해 코어 : 노말 인핸스",
            "질서의 해 코어 : 임팩트 메이트",
            "질서의 달 코어 : 황제의 심장",
            "질서의 달 코어 : 스택 홀드",
            "질서의 달 코어 : 다크 메이트",
        ],
        starCore: [
            "질서의 별 코어 : 다크 콜렉션",
            "질서의 별 코어 : 셔플 댄스",
            "질서의 별 코어 : 스피드 메이트",
        ],
    },
    "점화": {
        mainCore: [
            "질서의 해 코어 : 마력의 촉매",
            "질서의 해 코어 : 불완전 연소",
            "질서의 해 코어 : 종말의 시작",
            "질서의 달 코어 : 점화의 문장",
            "질서의 달 코어 : 연소 가속",
            "질서의 달 코어 : 반복된 종말",
        ],
        starCore: [
            "질서의 별 코어 : 원소의 잔향",
            "질서의 별 코어 : 삼중 파동",
            "질서의 별 코어 : 종말의 시",
        ],
    },
    "환류": {
        mainCore: [
            "질서의 해 코어 : 편향",
            "질서의 해 코어 : 순환",
            "질서의 해 코어 : 응축",
            "질서의 달 코어 : 직류",
            "질서의 달 코어 : 교류",
            "질서의 달 코어 : 와류",
        ],
        starCore: [
            "질서의 별 코어 : 화뇌",
            "질서의 별 코어 : 무결",
            "질서의 별 코어 : 청뢰",
        ],
    },
    "버스트": {
        mainCore: [
            "질서의 해 코어 : 블레이드 버스트",
            "질서의 해 코어 : 소드 리셋",
            "질서의 해 코어 : 블레이드 러시",
            "질서의 달 코어 : 버스트 코어",
            "질서의 달 코어 : 데스티니 코어",
            "질서의 달 코어 : 데스 블리츠",
        ],
        starCore: [
            "질서의 별 코어 : 일격",
            "질서의 별 코어 : 쾌도난마",
            "질서의 별 코어 : 얼음과 불의 검",
        ],
    },
    "잔재": {
        mainCore: [
            "질서의 해 코어 : 아츠 마스터",
            "질서의 해 코어 : 집중의 일격",
            "질서의 해 코어 : 일섬",
            "질서의 달 코어 : 아츠 코어",
            "질서의 달 코어 : 리차지",
            "질서의 달 코어 : 블레이드 웨이브",
        ],
        starCore: [
            "질서의 별 코어 : 기본기",
            "질서의 별 코어 : 잠깐의 기다림",
            "질서의 별 코어 : 죽음의 검기",
        ],
    },
    "충동": {
        mainCore: [
            "질서의 해 코어 : 블러드 매서커",
            "질서의 해 코어 : 이터널 블러드",
            "질서의 해 코어 : 샤프 피어싱",
            "질서의 달 코어 : 블러디 리프",
            "질서의 달 코어 : 고어 블리딩",
            "질서의 달 코어 : 레디 피어싱",
        ],
        starCore: [
            "질서의 별 코어 : 피의 폭발",
            "질서의 별 코어 : 치명적인 할퀴기",
            "질서의 별 코어 : 혼돈의 악마",
        ],
    },
    "억제": {
        mainCore: [
            "질서의 해 코어 : 서프레서",
            "질서의 해 코어 : 서징 스톰",
            "질서의 해 코어 : 매시브 컨슘",
            "질서의 달 코어 : 트리니티 코어",
            "질서의 달 코어 : 듀얼 코어",
            "질서의 달 코어 : 서브 스톰",
        ],
        starCore: [
            "질서의 별 코어 : 잠식 해방",
            "질서의 별 코어 : 죽음의 부메랑",
            "질서의 별 코어 : 파괴 광선",
        ],
    },
    "달소": {
        mainCore: [
            "질서의 해 코어 : 달의 향기",
            "질서의 해 코어 : 달의 악몽",
            "질서의 해 코어 : 두 개의 달",
            "질서의 달 코어 : 페르소나",
            "질서의 달 코어 : 나이트메어",
            "질서의 달 코어 : 더블 코어",
        ],
        starCore: [
            "질서의 별 코어 : 할루시네이션",
            "질서의 별 코어 : 암살자의 그림자",
            "질서의 별 코어 : 데스 루프",
        ],
    },
    "갈증": {
        mainCore: [
            "질서의 해 코어 : 갈증의 악몽",
            "질서의 해 코어 : 치명적인 발걸음",
            "질서의 해 코어 : 피의 갈증",
            "질서의 달 코어 : 치명적 악몽",
            "질서의 달 코어 : 라스트 스피어",
            "질서의 달 코어 : 출혈독",
        ],
        starCore: [
            "질서의 별 코어 : 급습 악몽",
            "질서의 별 코어 : 치명적 연계",
            "질서의 별 코어 : 다가오는 죽음",
        ],
    },
    "만월": {
        mainCore: [
            "질서의 해 코어 : 아더 디멘션",
            "질서의 해 코어 : 래피드 데스",
            "질서의 해 코어 : 망자의 발걸음",
            "질서의 달 코어 : 이계의 힘",
            "질서의 달 코어 : 영속자",
            "질서의 달 코어 : 소울 코어",
        ],
        starCore: [
            "질서의 별 코어 : 이계의 지배자",
            "질서의 별 코어 : 수확의 밤",
            "질서의 별 코어 : 빙의",
        ],
    },
    "그믐": {
        mainCore: [
            "질서의 해 코어 : 다크 문",
            "질서의 해 코어 : 사신의 부름",
            "질서의 해 코어 : 살귀의 밤",
            "질서의 달 코어 : 크레센트",
            "질서의 달 코어 : 광월야",
            "질서의 달 코어 : 강탈자",
        ],
        starCore: [
            "질서의 별 코어 : 그믐의 지배자",
            "질서의 별 코어 : 사신의 힘",
            "질서의 별 코어 : 잠식된 경계",
        ],
    },
    "회귀": {
        mainCore: [
            "질서의 해 코어 : 파죽지세",
            "질서의 해 코어 : 일필휘지",
            "질서의 해 코어 : 묵법화",
            "질서의 달 코어 : 조화의 완성",
            "질서의 달 코어 : 명필",
            "질서의 달 코어 : 정월 대보름",
        ],
        starCore: [
            "질서의 별 코어 : 끝없는 파죽",
            "질서의 별 코어 : 재빠른 붓",
            "질서의 별 코어 : 쏟아지는 두루미",
        ],
    },
    "질풍": {
        mainCore: [
            "질서의 해 코어 : 비연참",
            "질서의 해 코어 : 기류 조절",
            "질서의 해 코어 : 바람의 칼날",
            "질서의 달 코어 : 우산의 춤",
            "질서의 달 코어 : 상승기류",
            "질서의 달 코어 : 쾌속",
        ],
        starCore: [
            "질서의 별 코어 : 휘몰아치기",
            "질서의 별 코어 : 일점돌파",
            "질서의 별 코어 : 강풍일섬",
        ],
    },
    "이슬비": {
        mainCore: [
            "질서의 해 코어 : 싸라기눈",
            "질서의 해 코어 : 마른 하늘에 날벼락",
            "질서의 해 코어 : 해와 바람",
            "질서의 달 코어 : 비바람이 치던 바다",
            "질서의 달 코어 : 가랑비",
            "질서의 달 코어 : 뜨거운 햇볕",
        ],
        starCore: [
            "질서의 별 코어 : 눈에 돌넣기",
            "질서의 별 코어 : 우르릉 쾅쾅쾅",
            "질서의 별 코어 : 나그네의 외투를 벗긴건",
        ],
    },
    "야성": {
        mainCore: [
            "질서의 해 코어 : 변신술사!",
            "질서의 해 코어 : 곰이 될 운명!",
            "질서의 해 코어 : 여우가 될 운명!",
            "질서의 달 코어 : 금술",
            "질서의 달 코어 : 센 곰",
            "질서의 달 코어 : 센 여우",
        ],
        starCore: [
            "질서의 별 코어 : 돌격 곰 여우",
            "질서의 별 코어 : 필살 곰",
            "질서의 별 코어 : 별빛 여우",
        ],
    },
    "환각": {
        mainCore: [
            "질서의 해 코어 : 무한 각성",
            "질서의 해 코어 : 곰 주먹",
            "질서의 해 코어 : 까마귀의 왕",
            "질서의 달 코어 : 환수 해방",
            "질서의 달 코어 : 빙글빙글",
            "질서의 달 코어 : 까마귀 내려온다",
        ],
        starCore: [
            "질서의 별 코어 : 환영 곰",
            "질서의 별 코어 : 붕붕 펀치",
            "질서의 별 코어 : 까마귀 대난투",
        ],
    },
    "서폿": {
        mainCore: [
            "질서의 해 코어 : 천상의 대리인",
            "질서의 해 코어 : 진정한 정의",
            "질서의 해 코어 : 빛의 축복",
            "질서의 해 코어 : 빛의 은총",
            "질서의 해 코어 : 성스러운 맹약",
            "질서의 해 코어 : 빛이 생명을 새긴다",
            "질서의 해 코어 : 세라픽 엑센트",
            "질서의 해 코어 : 브레이브 엑센트",
            "질서의 해 코어 : 아리아 엑센트",
            "질서의 해 코어 : 햇살의 품",
            "질서의 해 코어 : 몽글몽글",
            "질서의 해 코어 : 해님이 지켜줘요",
            "질서의 달 코어 : 천상의 결의",
            "질서의 달 코어 : 신성한 대의",
            "질서의 달 코어 : 성전",
            "질서의 달 코어 : 빛의 서사",
            "질서의 달 코어 : 구원의 서약",
            "질서의 달 코어 : 여명이 세상을 깨우는 순간",
            "질서의 달 코어 : 세라픽 펄스",
            "질서의 달 코어 : 브레이브 펄스",
            "질서의 달 코어 : 아리아 펄스",
            "질서의 달 코어 : 따뜻한 해",
            "질서의 달 코어 : 환영문짝",
            "질서의 달 코어 : 달이 내린 예언",
        ],
        starCore: [
            "질서의 별 코어 : 수호의 기도",
            "질서의 별 코어 : 폭발의 기도",
            "질서의 별 코어 : 빛의 기도",
            "질서의 별 코어 : 수호의 선고",
            "질서의 별 코어 : 수호의 륜",
            "질서의 별 코어 : 성휘의 재",
            "질서의 별 코어 : 풍요의 바람",
            "질서의 별 코어 : 사운드 플러드",
            "질서의 별 코어 : 벅샷 가속",
            "질서의 별 코어 : 붓 콩콩",
            "질서의 별 코어 : 차원의 문",
            "질서의 별 코어 : 먹물 뿌리기",
        ]
    },
};

const DEALER_GROUP1_VALUE = { 
   "유물" : {10: 1.015, 14: 1.04, 17: 1.075, 18: 1.0767, 19: 1.0783, 20: 1.08},
   "고대" : {10: 1.015, 14: 1.04, 17: 1.085, 18: 1.0867, 19: 1.0883, 20: 1.09}
};

const DEALER_GROUP2_VALUE = {
    "유물" : {10: 1.01, 14: 1.025, 17: 1.045, 18: 1.0467, 19: 1.0483, 20: 1.05},
    "고대" : {10: 1.01, 14: 1.025, 17: 1.055, 18: 1.0567, 19: 1.0583, 20: 1.06}
};

const SUPPORT_GROUP1_VALUE = {
    "유물" : {10: 1.012, 14: 1.012, 17: 1.078, 18: 1.0798, 19: 1.081, 20: 1.0822},
    "고대" : {10: 1.012, 14: 1.012, 17: 1.09, 18: 1.0918, 19: 1.093, 20: 1.0942}
};

const SUPPORT_GROUP2_VALUE = {
    "유물" : {10: 1, 14: 1.006, 17: 1.021, 18: 1.022, 19: 1.023, 20: 1.024},
    "고대" : {10: 1, 14: 1.006, 17: 1.03, 18: 1.031, 19: 1.032, 20: 1.033}
};


export let arkgridCoreValues = {
    dealer: {
        group1: DEALER_GROUP1_VALUE,
        group2: DEALER_GROUP2_VALUE
    },
    support: {
        group1: SUPPORT_GROUP1_VALUE,
        group2: SUPPORT_GROUP2_VALUE
    }
};


export const chaosCoreValues = {
    "혼돈의 해 코어 : 현란한 공격" : {
        10: {finalDamagePer : 1.005},
        14: {finalDamagePer : 1.01},
        17: {
            "유물" : {finalDamagePer : 1.026},
            "고대" : {finalDamagePer : 1.037}
        },
        18: {
            "유물" : {finalDamagePer : 1.0276},
            "고대" : {finalDamagePer : 1.0386}
        },
        19: {
            "유물" : {finalDamagePer : 1.0292},
            "고대" : {finalDamagePer : 1.0402}
        },
        20: {
            "유물" : {finalDamagePer : 1.0308},
            "고대" : {finalDamagePer : 1.0419}
        }
    },
    "혼돈의 해 코어 : 안정적인 공격" : {
        10: {addDamagePer : 0},
        14: {addDamagePer : 0.7},
        17: {
            "유물" : {addDamagePer : 2.1},
            "고대" : {addDamagePer : 3.5}
        },
        18: {
            "유물" : {addDamagePer : 2.33},
            "고대" : {addDamagePer : 3.73}
        },
        19: {
            "유물" : {addDamagePer : 2.56},
            "고대" : {addDamagePer : 3.96}
        },
        20: {
            "유물" : {addDamagePer : 2.78},
            "고대" : {addDamagePer : 4.19}
        }
    },
    "혼돈의 해 코어 : 재빠른 공격" : {
        10: {finalDamagePer : 1},
        14: {finalDamagePer : 1.005},
        17: {
            "유물" : {finalDamagePer : 1.015},
            "고대" : {finalDamagePer : 1.025}
        },
        18: {
            "유물" : {finalDamagePer : 1.0168},
            "고대" : {finalDamagePer : 1.027}
        },
        19: {
            "유물" : {finalDamagePer : 1.0185},
            "고대" : {finalDamagePer : 1.0286}
        },
        20: {
            "유물" : {finalDamagePer : 1.02},
            "고대" : {finalDamagePer : 1.03}
        }
    },
    "혼돈의 해 코어 : 신념의 강화" : {
        10: { identityUptime: 0.006},
        14: { identityUptime: 0.006, damageBuff: 0.7},
        17: {
            "유물" : { identityUptime: 0.02, damageBuff: 1.9},
            "고대" : { identityUptime: 0.024, damageBuff: 3.5}
        },
        18: {
            "유물" : { identityUptime: 0.02, damageBuff: 2.1},
            "고대" : { identityUptime: 0.024, damageBuff: 3.7}
        },
        19: {
            "유물" : { identityUptime: 0.02, damageBuff: 2.3},
            "고대" : { identityUptime: 0.024, damageBuff: 3.9}
        },
        20: {
            "유물" : { identityUptime: 0.02, damageBuff: 2.5},
            "고대" : { identityUptime: 0.024, damageBuff: 4.1}
        }
    },
    "혼돈의 해 코어 : 흐르는 마나" : {
        10: { utilityPower: 0.09},
        14: { utilityPower: 0.09, cdrPercent: 0.004},
        17: {
            "유물" : { utilityPower: 0.384, cdrPercent: 0.012},
            "고대" : { utilityPower: 0.48, cdrPercent: 0.02}
        },
        18: {
            "유물" : { utilityPower: 0.09, cdrPercent: 0.0133},
            "고대" : { utilityPower: 0.48, cdrPercent: 0.0213}
        },
        19: {
            "유물" : { utilityPower: 0.09, cdrPercent: 0.0146},
            "고대" : { utilityPower: 0.48, cdrPercent: 0.0226}
        },
        20: {
            "유물" : { utilityPower: 0.09, cdrPercent: 0.0159},
            "고대" : { utilityPower: 0.48, cdrPercent: 0.0239}
        }
    },
    "혼돈의 해 코어 : 불굴의 강화" : {
        10: { atkBuff: 0},
        14: { atkBuff: 0.55},
        17: {
            "유물" : { atkBuff: 1.65},
            "고대" : { atkBuff: 2.75}
        },
        18: {
            "유물" : { atkBuff: 1.8},
            "고대" : { atkBuff: 2.9}
        },
        19: {
            "유물" : { atkBuff: 1.95},
            "고대" : { atkBuff: 3.05}
        },
        20: {
            "유물" : { atkBuff: 2.1},
            "고대" : { atkBuff: 3.2}
        }
    },
    "혼돈의 달 코어 : 불타는 일격" : {
        10: { finalDamagePer: 1.005},
        14: { finalDamagePer: 1.01},
        17: {
            "유물" : { finalDamagePer: 1.025},
            "고대" : { finalDamagePer: 1.035}
        },
        18: {
            "유물" : { finalDamagePer: 1.0267},
            "고대" : { finalDamagePer: 1.0368}
        },
        19: {
            "유물" : { finalDamagePer: 1.0283},
            "고대" : { finalDamagePer: 1.0384}
        },
        20: {
            "유물" : { finalDamagePer: 1.03},
            "고대" : { finalDamagePer: 1.04}
        }
    },
    "혼돈의 달 코어 : 흡수의 일격" : {
        10: { finalDamagePer: 1},
        14: { finalDamagePer: 1.005},
        17: {
            "유물" : { finalDamagePer: 1.015},
            "고대" : { finalDamagePer: 1.025}
        },
        18: {
            "유물" : { finalDamagePer: 1.0166},
            "고대" : { finalDamagePer: 1.0266}
        },
        19: {
            "유물" : { finalDamagePer: 1.0182},
            "고대" : { finalDamagePer: 1.0282}
        },
        20: {
            "유물" : { finalDamagePer: 1.0198},
            "고대" : { finalDamagePer: 1.0298}
        }
    },
    "혼돈의 달 코어 : 부수는 일격" : {
        10: { finalDamagePer: 1},
        14: { finalDamagePer: 1.00445},
        17: {
            "유물" : { finalDamagePer: 1.01334},
            "고대" : { finalDamagePer: 1.0222}
        },
        18: {
            "유물" : { finalDamagePer: 1.01477},
            "고대" : { finalDamagePer: 1.02366}
        },
        19: {
            "유물" : { finalDamagePer: 1.01621},
            "고대" : { finalDamagePer: 1.0251}
        },
        20: {
            "유물" : { finalDamagePer: 1.01765},
            "고대" : { finalDamagePer: 1.02654}
        }
    },
    "혼돈의 달 코어 : 낙인의 흔적" : {
        10: { finalDamageBuff: 1.001},
        14: { finalDamageBuff: 1.001, stigmaPer: 1.2},
        17: {
            "유물" : { finalDamageBuff: 1.003, stigmaPer: 3.6},
            "고대" : { finalDamageBuff: 1.005, stigmaPer: 4.8}
        },
        18: {
            "유물" : { finalDamageBuff: 1.003, stigmaPer: 4.0},
            "고대" : { finalDamageBuff: 1.005, stigmaPer: 5.2}
        },
        19: {
            "유물" : { finalDamageBuff: 1.003, stigmaPer: 4.4},
            "고대" : { finalDamageBuff: 1.005, stigmaPer: 5.6}
        },
        20: {
            "유물" : { finalDamageBuff: 1.003, stigmaPer: 4.8},
            "고대" : { finalDamageBuff: 1.005, stigmaPer: 6.0}
        }
    },
    "혼돈의 달 코어 : 강철의 흔적" : {
        10: { atkBuffPlus: 1.001, finalDamagePer: 1.001},
        14: { atkBuffPlus: 1.001, finalDamagePer: 1.001},
        17: {
            "유물" : { atkBuffPlus: 1.003, finalDamagePer: 1.003},
            "고대" : { atkBuffPlus: 1.005, finalDamagePer: 1.005}
        },
        18: {
            "유물" : { atkBuffPlus: 1.003, finalDamagePer: 1.003},
            "고대" : { atkBuffPlus: 1.005, finalDamagePer: 1.005}
        },
        19: {
            "유물" : { atkBuffPlus: 1.003, finalDamagePer: 1.003},
            "고대" : { atkBuffPlus: 1.005, finalDamagePer: 1.005}
        },
        20: {
            "유물" : { atkBuffPlus: 1.003, finalDamagePer: 1.003},
            "고대" : { atkBuffPlus: 1.005, finalDamagePer: 1.005}
        }
    },
    "혼돈의 달 코어 : 치명적인 흔적" : {
        10: { atkBuffPlus: 1.00108, finalDamagePer: 1.00108},
        14: { atkBuffPlus: 1.00108, finalDamagePer: 1.00108},
        17: {
            "유물" : { atkBuffPlus: 1.00326, finalDamagePer: 1.00326},
            "고대" : { atkBuffPlus: 1.00543, finalDamagePer: 1.00543}
        },
        18: {
            "유물" : { atkBuffPlus: 1.00326, finalDamagePer: 1.00326},
            "고대" : { atkBuffPlus: 1.00543, finalDamagePer: 1.00543}
        },
        19: {
            "유물" : { atkBuffPlus: 1.00326, finalDamagePer: 1.00326},
            "고대" : { atkBuffPlus: 1.00543, finalDamagePer: 1.00543}
        },
        20: {
            "유물" : { atkBuffPlus: 1.00326, finalDamagePer: 1.00326},
            "고대" : { atkBuffPlus: 1.00543, finalDamagePer: 1.00543}
        }
    },
    "혼돈의 별 코어 : 공격" : {
        10: { atkPlus: 900},
        14: { atkPlus: 900, atkPer: 0.55},
        17: {
            "유물" : { atkPlus: 2700, atkPer : 1.65},
            "고대" : { atkPlus: 3600, atkPer : 2.2}
        },
        18: {
            "유물" : { atkPlus: 2700, atkPer: 1.81},
            "고대" : { atkPlus: 3600, atkPer: 2.36}
        },
        19: {
            "유물" : { atkPlus: 2700, atkPer: 1.97},
            "고대" : { atkPlus: 3600, atkPer: 2.52}
        },
        20: {
            "유물" : { atkPlus: 2700, atkPer: 2.13},
            "고대" : { atkPlus: 3600, atkPer: 2.68}
        }
    },
    "혼돈의 별 코어 : 무기" : {
        10: { weaponAtkPlus: 1300},
        14: { weaponAtkPlus: 1300, weaponAtkPer: 0.75},
        17: {
            "유물" : { weaponAtkPlus: 3900, weaponAtkPer : 2.25},
            "고대" : { weaponAtkPlus: 5200, weaponAtkPer : 3}
        },
        18: {
            "유물" : { weaponAtkPlus: 3900, weaponAtkPer: 2.48},
            "고대" : { weaponAtkPlus: 5200, weaponAtkPer: 3.23}
        },
        19: {
            "유물" : { weaponAtkPlus: 3900, weaponAtkPer: 2.71},
            "고대" : { weaponAtkPlus: 5200, weaponAtkPer: 3.46}
        },
        20: {
            "유물" : { weaponAtkPlus: 3900, weaponAtkPer: 2.94},
            "고대" : { weaponAtkPlus: 5200, weaponAtkPer: 3.69}
        }
    },
    "혼돈의 별 코어 : 구원" : {
        10: { carePower: 0.012 },
        14: { carePower: 0.024 },
        17: {
            "유물" : { carePower: 0.048},
            "고대" : { carePower: 0.072}
        },
        18: {
            "유물" : { carePower: 0.052},
            "고대" : { carePower: 0.076}
        },
        19: {
            "유물" : { carePower: 0.056},
            "고대" : { carePower: 0.08}
        },
        20: {
            "유물" : { carePower: 0.06},
            "고대" : { carePower: 0.084}
        }
    },
    "혼돈의 별 코어 : 생명" : {
        10: { health: 420},
        14: { health: 420, statHP: 900},
        17: {
            "유물" : { health: 1260, statHP: 2700},
            "고대" : { health: 1680, statHP: 3600}
        },
        18: {
            "유물" : { health: 1400, statHP: 2700},
            "고대" : { health: 1820, statHP: 3600}
        },
        19: {
            "유물" : { health: 1540, statHP: 2700},
            "고대" : { health: 1960, statHP: 3600}
        },
        20: {
            "유물" : { health: 1680, statHP: 2700},
            "고대" : { health: 2100, statHP: 3600}
        }
    },
    "혼돈의 별 코어 : 속도" : {
        10: { finalDamagePer: 1},
        14: { finalDamagePer: 1},
        17: {
            "유물" : { finalDamagePer: 1},
            "고대" : { finalDamagePer: 1.0108}
        },
        18: {
            "유물" : { finalDamagePer: 1.0099},
            "고대" : { finalDamagePer: 1.0117}
        },
        19: {
            "유물" : { finalDamagePer: 1.0108},
            "고대" : { finalDamagePer: 1.0126}
        },
        20: {
            "유물" : { finalDamagePer: 1.0117},
            "고대" : { finalDamagePer: 1.0135}
        }
    },
    "혼돈의 별 코어 : 방어" : {
        10: { finalDamagePer: 1},
        14: { finalDamagePer: 1},
        17: {
            "유물" : { finalDamagePer: 1},
            "고대" : { finalDamagePer: 1}
        },
        18: {
            "유물" : { finalDamagePer: 1},
            "고대" : { finalDamagePer: 1}
        },
        19: {
            "유물" : { finalDamagePer: 1},
            "고대" : { finalDamagePer: 1}
        },
        20: {
            "유물" : { finalDamagePer: 1},
            "고대" : { finalDamagePer: 1}
        }
    },
    
    
    
    
}






export {
    keywordList,
    grindingFilter,
    arkFilter,
    engravingImg,
    dealerAccessoryFilter,
    calAccessoryFilter,
    elixirFilter,
    cardPointFilter,
    bangleFilter,
};
