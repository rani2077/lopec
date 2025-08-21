/* ==========================================================================
   # 설정 (Configuration)
   - 각 페이즈의 관문 정보 등 고정적인 데이터를 정의합니다.
   ========================================================================== */
const PHASE_CONFIG = {
  "4막": {
    bossId: "4",
    gates: [
      { name: "1관", maxHp: 1000 },
      { name: "2관", maxHp: 1000 }
    ],
  },
  "종막": {
    bossId: "5",
    gates: [
      { name: "1관", maxHp: 1000 },
      { name: "2관", maxHp: 1000 },
      { name: "히든", maxHp: 1000 }
    ],
  }
};
const API_BASE_URL = "https://api.lopec.kr/api";


/* ==========================================================================
   # API 연동 및 데이터 변환 (Data Fetching & Transformation)
   ========================================================================== */
async function fetchDashboardData() {
  try {
    const response = await fetch(`${API_BASE_URL}/raid/progress`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('[API 응답] 현황판 데이터:', data);

    return data;
  } catch (error) {
    console.error("현황판 데이터 로딩 실패:", error);
    return null; // 실패 시 null 반환
  }
}

async function transformApiData(phase, apiData) {
  const phaseConfig = PHASE_CONFIG[phase];
  if (!apiData || !apiData.parties) return null;

  const allTeamsData = apiData.parties;

  // 모든 파티의 모든 progress 항목에서 가장 최신의 updatedAt 시간을 찾음
  let latestTimestamp = 0;
  allTeamsData.forEach(party => {
    party.progress.forEach(p => {
      const currentTimestamp = new Date(p.updatedAt).getTime();
      if (currentTimestamp > latestTimestamp) {
        latestTimestamp = currentTimestamp;
      }
    });
  });
  const lastUpdatedAt = latestTimestamp > 0 ? new Date(latestTimestamp).toISOString() : new Date().toISOString();


  const transformedTeams = allTeamsData.map(partyData => {
    const viewBossId = parseInt(phaseConfig.bossId, 10);
    const viewGates = phaseConfig.gates;
    
    // 파티의 최종 진행 상황 찾기 (가장 높은 boss, 그 다음 높은 gate)
    const latestProgress = partyData.progress.reduce((latest, current) => {
        if (!latest) return current;
        const latestBoss = parseInt(latest.boss, 10);
        const currentBoss = parseInt(current.boss, 10);
        if (currentBoss > latestBoss) return current;
        if (currentBoss < latestBoss) return latest;
        
        const latestGate = parseInt(latest.gate, 10);
        const currentGate = parseInt(current.gate, 10);
        return currentGate > latestGate ? current : latest;
    }, null);

    const teamBossId = latestProgress ? parseInt(latestProgress.boss, 10) : 0;
    
    let progress = [];
    let isAllCleared = false;
    let clearedAt = null;

    if (teamBossId > viewBossId) {
      // ** 현재 보는 페이즈보다 앞서나간 팀 **
      isAllCleared = true;
      // 현재 보는 페이즈의 마지막 관문 클리어 시간 찾기
      const phaseClearProgress = partyData.progress.find(p => parseInt(p.boss, 10) === viewBossId && parseInt(p.gate, 10) === viewGates.length && p.hp === 0);
      clearedAt = phaseClearProgress ? phaseClearProgress.updatedAt : null;
      for (let i = 0; i < viewGates.length; i++) {
        progress.push({ gateIndex: i, currentHp: 0 });
      }
    } else if (teamBossId < viewBossId) {
      // ** 현재 보는 페이즈보다 뒤쳐진 팀 **
      isAllCleared = false;
      progress = [];
      clearedAt = null;
    } else { // teamBossId === viewBossId
      // ** 현재 보는 페이즈와 동일한 단계의 팀 **
      const latestGateInView = partyData.progress
        .filter(p => parseInt(p.boss, 10) === viewBossId)
        .reduce((latest, current) => {
            if (!latest) return current;
            return parseInt(current.gate, 10) > parseInt(latest.gate, 10) ? current : latest;
        }, null);
        
      if (latestGateInView) {
          const currentGateNum = parseInt(latestGateInView.gate, 10);
          const currentHp = latestGateInView.hp;
          // 이전 관문들은 모두 클리어 처리
          for (let i = 1; i < currentGateNum; i++) {
              progress.push({ gateIndex: i - 1, currentHp: 0 });
          }
          // 현재 관문 진행도 추가
          progress.push({ gateIndex: currentGateNum - 1, currentHp: currentHp });
      }
      
      const lastGateProgress = progress.length > 0 ? progress[progress.length - 1] : null;
      isAllCleared = progress.length === viewGates.length && lastGateProgress && lastGateProgress.currentHp === 0;
      if(isAllCleared){
          const finalGateClear = partyData.progress.find(p => parseInt(p.boss, 10) === viewBossId && parseInt(p.gate, 10) === viewGates.length);
          clearedAt = finalGateClear ? finalGateClear.updatedAt : null;
      }
    }

    return {
      name: partyData.partyName,
      averageLopec: partyData.averageScore,
      isAllCleared: isAllCleared,
      clearedAt: clearedAt,
      members: partyData.members.map(memberData => ({
        name: memberData.name,
        lopec: memberData.score,
        characterUrl: "#", // 캐릭터 URL은 현재 데이터에 없으므로 임시 처리
        streamUrl: memberData.url,
      })),
      progress: progress,
    };
  });
  
  return {
    lastUpdatedAt: lastUpdatedAt, // 계산된 가장 최신 시간으로 교체
    gates: phaseConfig.gates,
    teams: transformedTeams,
  };
}


/* ==========================================================================
   # 전역 변수 및 DOM 요소 (Global Variables & DOM Elements)
   ========================================================================== */
let currentApiData = null; // API 데이터를 저장할 전역 변수

const contentEl = document.getElementById("content");
const lastUpdatedEl = document.getElementById("lastUpdated");
const phaseButtons = Array.from(document.querySelectorAll(".phase-btn"));
const overlay = document.getElementById('overlay');
const reportProgressBtn = document.getElementById('reportProgressBtn');
const registerTeamBtn = document.getElementById('registerTeamBtn');
const closeBtn = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const tabProgress = document.getElementById('tab-progress');
const tabRegister = document.getElementById('tab-register');
const phaseSelect = document.getElementById('phaseSelect');
const teamNameSelect = document.getElementById('teamNameSelect');
const gateSelect = document.getElementById('gateSelect');
const lineSelect = document.getElementById('lineSelect');
const submitProgress = document.getElementById('submitProgress');
const submitRegister = document.getElementById('submitRegister');
const membersGrid = document.getElementById('membersGrid');
const registerTeamNameInput = document.getElementById('registerTeamNameInput');
const progressHint = document.getElementById('progressHint');

// New elements for registration flow
const confirmNoticeBtn = document.getElementById('confirmNoticeBtn');
const confirmNoticeContainer = document.getElementById('confirmNoticeContainer');
const teamNameField = document.getElementById('teamNameField');
const membersField = document.getElementById('membersField');
const submitRegisterField = document.getElementById('submitRegisterField');

// Correction Modal Elements
const correctionBtn = document.getElementById('correctionBtn');
const correctionOverlay = document.getElementById('correctionOverlay');
const correctionModalClose = document.getElementById('correctionModalClose');
const inquiryLink = document.getElementById('inquiryLink');


/* ==========================================================================
   # 렌더링: 메인 (Main Rendering)
   ========================================================================== */
async function renderPhase(phase, forceRefetch = false) {
  for (const btn of phaseButtons) {
    btn.classList.toggle("active", btn.dataset.phase === phase);
  }
  contentEl.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--muted);">데이터를 불러오는 중입니다...</div>';

  if (!currentApiData || forceRefetch) {
    currentApiData = await fetchDashboardData();
  }

  const data = await transformApiData(phase, currentApiData);

  if (!data || !data.teams) {
    contentEl.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--muted);">데이터를 불러오는데 실패했거나, 아직 데이터가 없습니다.</div>';
    lastUpdatedEl.textContent = '';
    return;
  }
  
  if (data.lastUpdatedAt) {
    const date = new Date(data.lastUpdatedAt);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    lastUpdatedEl.textContent = `마지막 업데이트: ${yyyy}.${mm}.${dd}. ${hh}:${mi}`;
  }

  contentEl.innerHTML = '';
  const { gates, teams } = data;
  
  const boardBody = document.createElement('div');
  boardBody.className = 'board-body';
  const yHead = document.createElement('div');
  yHead.className = 'y-head';
  boardBody.appendChild(yHead);
  boardBody.appendChild(buildAxis(gates));
  contentEl.appendChild(boardBody);

  const rows = document.createElement('div');
  rows.className = 'rows';
  teams.sort((a, b) => compareTeamsByProgress(a, b, gates));

  // 클리어 순위 계산
  const clearedTeams = teams
    .filter(team => team.isAllCleared && team.clearedAt)
    .sort((a, b) => new Date(a.clearedAt).getTime() - new Date(b.clearedAt).getTime());
  
  const clearRankMap = new Map();
  clearedTeams.forEach((team, index) => {
    clearRankMap.set(team.name, index + 1);
  });

  teams.forEach((team, index) => {
    const clearRank = clearRankMap.get(team.name);
    rows.appendChild(buildRowGroup(team, gates, index + 1, clearRank));
  });
  contentEl.appendChild(rows);
}


/* ==========================================================================
   # 렌더링: 컴포넌트 (Component Rendering)
   ========================================================================== */

function buildAxis(gates) {
  const axis = document.createElement('div');
  axis.className = 'axis';
  const gateLabels = document.createElement('div');
  gateLabels.className = 'gate-labels';
  gateLabels.style.gridTemplateColumns = `repeat(${gates.length}, 1fr)`;
  for (const gate of gates) {
    const label = document.createElement('div');
    label.style.textAlign = 'center';
    label.style.color = 'var(--muted)';
    label.style.fontWeight = '700';
    label.textContent = gate.name;
    gateLabels.appendChild(label);
  }
  axis.appendChild(gateLabels);
  return axis;
}

function buildRowGroup(team, gates, rank, clearRank) {
  const group = document.createElement('div');
  group.className = 'row-group';

  const row = document.createElement('div');
  row.className = 'row';
  
  const name = document.createElement('div');
  name.className = 'team-name';
  name.textContent = `${rank}. ${team.name}`;
  const lopecSpan = document.createElement('span');
  lopecSpan.className = 'team-lopec';
  lopecSpan.textContent = 'L' + (team.averageLopec ? team.averageLopec.toFixed(2) : '????.??');
  name.appendChild(lopecSpan);
  row.appendChild(name);

  const track = document.createElement('div');
  track.className = 'track';
  const totalSegments = gates.length;
  let labelGateIndex = 0;
  let labelPercentInGate = 0;

  if (team.isAllCleared) {
    const clearedAll = document.createElement('div');
    clearedAll.className = 'progress cleared';
    clearedAll.style.width = '100%';
    track.appendChild(clearedAll);
  } else {
    const segmentWidth = 100 / totalSegments;
    let clearedCount = 0;
    for (let i = 0; i < totalSegments; i++) {
      const gateProgress = getGateProgress(team, i, gates);
      if (gateProgress.percent >= 100) {
        clearedCount++;
      } else {
        break;
      }
    }
    
    if (clearedCount > 0) {
      const clearedSpan = document.createElement('div');
      clearedSpan.className = 'progress cleared';
      clearedSpan.style.width = (clearedCount * segmentWidth + 0.1) + '%';
      track.appendChild(clearedSpan);
    }

    const currentGateIndex = clearedCount;
    if (currentGateIndex < totalSegments) {
      const currentProgress = getGateProgress(team, currentGateIndex, gates);
      labelGateIndex = currentGateIndex;
      labelPercentInGate = currentProgress.percent;

      if (labelPercentInGate > 0) {
        const segFill = document.createElement('div');
        segFill.className = 'progress';
        if (clearedCount > 0) segFill.classList.add('no-left-radius');
        segFill.style.left = (currentGateIndex * segmentWidth) + '%';
        segFill.style.width = (labelPercentInGate / 100) * segmentWidth + '%';
        track.appendChild(segFill);
      }
    } else {
        labelGateIndex = totalSegments - 1;
        labelPercentInGate = 100;
    }
  }

  for (let i = 1; i < totalSegments; i++) {
    const divider = document.createElement('div');
    divider.className = 'gate-divider';
    divider.style.left = (i / totalSegments) * 100 + '%';
    track.appendChild(divider);
  }

  const dot = document.createElement('div');
  dot.className = 'dot';
  const tag = document.createElement('div');
  tag.className = 'tag';

  if (team.isAllCleared && team.clearedAt) {
    dot.style.left = '100%';
    dot.classList.add('cleared');

    const clearTime = new Date(team.clearedAt);
    const mm = String(clearTime.getMonth() + 1).padStart(2, '0');
    const dd = String(clearTime.getDate()).padStart(2, '0');
    const hh = String(clearTime.getHours()).padStart(2, '0');
    const mi = String(clearTime.getMinutes()).padStart(2, '0');

    if (clearRank) {
      tag.textContent = `${mm}.${dd}. ${hh}:${mi}. ${clearRank}${getOrdinalSuffix(clearRank)} 클리어`;
    } else {
      tag.textContent = `${mm}.${dd}. ${hh}:${mi} 클리어`;
    }
  } else {
    const dotLeft = (labelGateIndex / totalSegments) * 100 + (labelPercentInGate / 100) * (100 / totalSegments);
    dot.style.left = dotLeft + '%';
    const currentGateInfo = getGateProgress(team, labelGateIndex, gates);
    const remainingLines = Math.max(0, Math.round(currentGateInfo.currentHp));

    if (labelPercentInGate === 0) {
      // 첫 관문 시작 전이면 "입장 전", 그 외에는 이전 관문 클리어로 표시
      tag.textContent = labelGateIndex === 0 ? '입장 전' : `${gates[labelGateIndex - 1].name} 클리어`;
    } else {
      tag.textContent = `${gates[labelGateIndex].name} ${remainingLines}줄`;
    }
  }
  dot.appendChild(tag);
  track.appendChild(dot);
  row.appendChild(track);

  const membersPanel = document.createElement('div');
  membersPanel.className = 'row-members';
  const list = document.createElement('div');
  list.className = 'member-list';
  const header = document.createElement('div');
  header.className = 'member-header';
  header.innerHTML = '<div>닉네임</div><div>점수</div><div>상세</div>';
  list.appendChild(header);

  if (team.members && team.members.length > 0) {
    for (const member of team.members) {
      const nameEl = document.createElement('div');
      nameEl.className = 'member-name';
      nameEl.textContent = member.name;

      const lopecEl = document.createElement('div');
      lopecEl.className = 'member-lopec';
      lopecEl.textContent = member.lopec.toFixed(2);

      const actionsEl = document.createElement('div');
      actionsEl.className = 'member-actions';
      
      const charBtn = document.createElement('button');
      charBtn.className = 'btn-char';
      charBtn.textContent = '캐릭터 정보';
      charBtn.onclick = () => window.open(`https://lopec.kr/search/search.html?headerCharacterName=${encodeURIComponent(member.name)}`, '_blank');
      actionsEl.appendChild(charBtn);

      if (member.streamUrl) {
        const streamBtn = document.createElement('button');
        streamBtn.className = 'btn-watch';
        streamBtn.textContent = '방송 보러가기';
        streamBtn.onclick = () => window.open(member.streamUrl, '_blank');
        actionsEl.appendChild(streamBtn);
      }
      
      const rowContents = document.createDocumentFragment();
      rowContents.appendChild(nameEl);
      rowContents.appendChild(lopecEl);
      rowContents.appendChild(actionsEl);
      const divider = document.createElement('div');
      divider.className = 'member-divider';
      rowContents.appendChild(divider);
      list.appendChild(rowContents);
    }
  }
  membersPanel.appendChild(list);

  group.appendChild(row);
  group.appendChild(membersPanel);

  row.style.cursor = 'pointer';
  row.addEventListener('click', () => {
    group.classList.toggle('open');
  });

  return group;
}


/* ==========================================================================
   # 유틸리티 (Utilities)
   ========================================================================== */

function getOrdinalSuffix(i) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

function compareTeamsByProgress(teamA, teamB, gates) {
  const calcScore = (team) => {
    if (team.isAllCleared) {
      if (team.clearedAt) {
        // 1순위: 클리어 시간이 있는 팀 (시간이 이를수록 점수가 높음)
        return 1e15 - new Date(team.clearedAt).getTime();
      } else {
        // 2순위: 클리어는 했지만 시간 정보가 없는 팀 (다음 페이즈 진행 등)
        return 1e14;
      }
    }
    // 3순위: 클리어하지 못한 팀
    let score = 0;
    let prevGateCleared = true;
    for (let i = 0; i < gates.length; i++) {
      if (!prevGateCleared) break;
      const progress = getGateProgress(team, i, gates);
      score += (i * 1000) + progress.percent; 
      if (progress.percent < 100) {
        prevGateCleared = false;
      }
    }
    return score;
  };

  const progressDiff = calcScore(teamB) - calcScore(teamA);
  if (progressDiff !== 0) {
    return progressDiff;
  }

  // 동일 진도일 경우, 평균 점수가 높은 순으로 정렬
  return teamB.averageLopec - teamA.averageLopec;
}

function getGateProgress(team, gateIndex, gates) {
  const gateInfo = gates[gateIndex];
  const progress = team.progress.find(p => p.gateIndex === gateIndex);

  if (!progress) {
    return { percent: 0, currentHp: gateInfo.maxHp };
  }
  
  const percent = Math.max(0, 100 - (progress.currentHp / gateInfo.maxHp * 100));
  return { percent: Math.min(100, percent), currentHp: progress.currentHp };
}


/* ==========================================================================
   # 모달 (Modal Logic)
   ========================================================================== */

async function handleProgressSubmit(e) {
  e.preventDefault();
  const reportData = {
    partyName: teamNameSelect.value,
    boss: phaseSelect.value === '4막' ? "4" : "5",
    gate: gateSelect.value.replace('관', '').replace('히든', '3'),
    hp: lineSelect.value === 'clear' ? 0 : parseInt(lineSelect.value, 10),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/raid/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    if (!response.ok) throw new Error('진도 제보에 실패했습니다.');

    alert('진도 제보가 성공적으로 등록되었습니다.');
    overlay.classList.remove('open');
    renderPhase(phaseSelect.value, true); // 강제 새로고침
  } catch (error) {
    alert(error.message);
  }
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const members = [];
  const memberInputs = membersGrid.querySelectorAll('input');
  for (let i = 0; i < 8; i++) {
    const nameInput = memberInputs[i * 2];
    const urlInput = memberInputs[i * 2 + 1];
    members.push({
      name: nameInput.value.trim(),
      url: urlInput.value.trim() || null,
    });
  }

  const reportData = {
    partyName: registerTeamNameInput.value.trim(),
    members: members,
  };

  console.log('[공격대 등록] 전송될 데이터:', reportData);

  try {
    const response = await fetch(`${API_BASE_URL}/raid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('로펙에 검색된 이력이 존재하는 캐릭터만 등록이 가능합니다. 공대원을 확인해주세요.');
      }
      throw new Error('공격대 등록에 실패했습니다.');
    }

    alert('공격대 등록이 성공적으로 완료되었습니다.');
    overlay.classList.remove('open');
    renderPhase(document.querySelector('.phase-btn.active').dataset.phase, true); // 강제 새로고침
  } catch (error) {
    alert(error.message);
  }
}

function setupModal() {
  // --- [임시] 진도 제보 기능 비활성화 ---
  // 정식 오픈 시 아래 블록을 주석해제하고, 그 아래 '임시' 블록을 삭제하세요.
  /*
  reportProgressBtn.addEventListener('click', () => {
    overlay.classList.add('open');
    modalTitle.textContent = '진도 현황 제보';
    tabProgress.style.display = 'block';
    tabRegister.style.display = 'none';
    populateTeamNameOptions();
    populateGateOptions();
    populateLineOptions();
    validateForms();
  });
  */
  // --- [임시] 비활성화 처리용 코드 ---
  reportProgressBtn.classList.add('disabled');
  reportProgressBtn.addEventListener('click', () => {
    alert('진도 제보는 2025.08.20. 오전 10시부터 가능합니다.');
  });
  // ------------------------------------
  
  registerTeamBtn.addEventListener('click', () => {
    overlay.classList.add('open');
    modalTitle.textContent = '공격대 등록 제보';
    tabProgress.style.display = 'none';
    tabRegister.style.display = 'block';

    // 등록 폼 초기 상태 설정
    teamNameField.style.display = 'none';
    membersField.style.display = 'none';
    submitRegisterField.style.display = 'none';
    confirmNoticeContainer.style.display = 'block';

    validateForms();
  });

  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });

  // Correction Modal
  correctionBtn.addEventListener('click', () => {
    correctionOverlay.classList.add('open');
  });
  correctionModalClose.addEventListener('click', () => {
    correctionOverlay.classList.remove('open');
  });
  correctionOverlay.addEventListener('click', (e) => {
    if (e.target === correctionOverlay) {
      correctionOverlay.classList.remove('open');
    }
  });

  // Registration notice confirmation
  confirmNoticeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // form submit 방지
    teamNameField.style.display = 'grid';
    membersField.style.display = 'grid';
    submitRegisterField.style.display = 'block';
    confirmNoticeContainer.style.display = 'none';
  });


  phaseSelect.addEventListener('change', () => { populateGateOptions(); populateLineOptions(); validateForms(); });
  teamNameSelect.addEventListener('change', validateForms);
  gateSelect.addEventListener('change', () => { populateLineOptions(); validateForms(); });
  lineSelect.addEventListener('change', validateForms);

  buildMembersGrid();

  const registrationInputs = [registerTeamNameInput, ...membersGrid.querySelectorAll('input')];
  registrationInputs.forEach(input => input.addEventListener('input', validateForms));

  submitProgress.addEventListener('click', handleProgressSubmit);
  submitRegister.addEventListener('click', handleRegisterSubmit);
}

function populateTeamNameOptions() {
  teamNameSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.textContent = '공격대를 선택하세요';
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  teamNameSelect.appendChild(placeholder);

  if (currentApiData && currentApiData.parties) {
    const teamNames = currentApiData.parties.map(team => team.partyName).sort();
    for (const name of teamNames) {
      const opt = document.createElement('option');
      opt.textContent = name;
      opt.value = name;
      teamNameSelect.appendChild(opt);
    }
  }
}

function populateGateOptions() {
  const phase = phaseSelect.value;
  gateSelect.innerHTML = '';
  const gates = PHASE_CONFIG[phase].gates.map(g => g.name);
  for (const g of gates) {
    const opt = document.createElement('option');
    opt.textContent = g; opt.value = g; gateSelect.appendChild(opt);
  }
}

function populateLineOptions() {
  lineSelect.innerHTML = '';
  const phase = phaseSelect.value;
  const gateName = gateSelect.value;
  const gateInfo = PHASE_CONFIG[phase].gates.find(g => g.name === gateName);
  const maxLines = gateInfo ? gateInfo.maxHp : 300;
  
  for (let i = maxLines; i >= 1; i--) {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = `${i}줄`;
    lineSelect.appendChild(opt);
  }
  const clearOpt = document.createElement('option');
  clearOpt.value = 'clear';
  clearOpt.textContent = '클리어';
  lineSelect.appendChild(clearOpt);
}

function buildMembersGrid() {
  membersGrid.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const nick = document.createElement('input');
    nick.className = 'input';
    nick.placeholder = '닉네임';
    const url = document.createElement('input');
    url.className = 'input';
    url.placeholder = '스트리밍 URL (선택)';
    membersGrid.appendChild(nick);
    membersGrid.appendChild(url);
  }
}

function validateForms() {
  // '진도 제보' 탭 유효성 검사
  const teamSelected = teamNameSelect.value;
  const phaseSelected = phaseSelect.value;
  const gateSelected = gateSelect.value;
  const lineSelected = lineSelect.value;
  const allProgressFieldsSelected = teamSelected && phaseSelected && gateSelected && lineSelected;
  
  let isProgressValid = true;
  progressHint.style.display = 'none';

  if (allProgressFieldsSelected && currentApiData && currentApiData.parties) {
    const selectedTeamData = currentApiData.parties.find(team => team.partyName === teamSelected);
    if (selectedTeamData) {
      // Find latest progress
      const latestProgress = selectedTeamData.progress.reduce((latest, current) => {
        if (!latest) return current;
        const latestBoss = parseInt(latest.boss, 10);
        const currentBoss = parseInt(current.boss, 10);
        if (currentBoss > latestBoss) return current;
        if (currentBoss < latestBoss) return latest;
        const latestGate = parseInt(latest.gate, 10);
        const currentGate = parseInt(current.gate, 10);
        return currentGate > latestGate ? current : latest;
      }, null);
      
      if(latestProgress) {
        const currentBoss = parseInt(latestProgress.boss, 10);
        const currentGate = parseInt(latestProgress.gate, 10);
        const currentHp = parseInt(latestProgress.hp, 10);
        
        const selectedBoss = phaseSelected === '4막' ? 4 : 5;
        const selectedGate = parseInt(gateSelected.replace('관', '').replace('히든', '3'), 10);
        const selectedHp = lineSelected === 'clear' ? 0 : parseInt(lineSelected, 10);

        const currentScore = currentBoss * 10000 + currentGate * 1000 + (500 - currentHp);
        const selectedScore = selectedBoss * 10000 + selectedGate * 1000 + (500 - selectedHp);

        if (selectedScore < currentScore) {
          isProgressValid = false;
          progressHint.textContent = '현재 진도보다 낮은 진도는 제보할 수 없습니다.';
          progressHint.style.display = 'block';
        }
      }
    }
  }
  
  submitProgress.disabled = !(allProgressFieldsSelected && isProgressValid);
  
  // '공격대 등록' 탭 유효성 검사
  const teamNameFilled = registerTeamNameInput && registerTeamNameInput.value.trim().length > 0;
  
  const memberInputs = Array.from(membersGrid.querySelectorAll('input'));
  
  const nicknameInputs = memberInputs.filter((_, index) => index % 2 === 0);
  const allNicknamesFilled = nicknameInputs.length === 8 && nicknameInputs.every(input => input.value.trim().length > 0);

  // 조건 3: 특정 플랫폼 URL이 한 칸 이상 채워져야 함
  const urlInputs = memberInputs.filter((_, index) => index % 2 === 1);
  const atLeastOneValidUrl = urlInputs.some(input => {
    const value = input.value.trim();
    if (value.length === 0) return false;
    
    const validPlatforms = ["chzzk.naver.com", "youtube.com", "sooplive.co.kr"];
    return validPlatforms.some(platform => value.includes(platform));
  });

  submitRegister.disabled = !(teamNameFilled && allNicknamesFilled && atLeastOneValidUrl);
}


/* ==========================================================================
   # 초기화 (Initialization)
   ========================================================================== */
function initialize() {
  // 문의하러 가기 링크 설정
  inquiryLink.href = "https://open.kakao.com/o/sxzCU2Mh";

  // --- [임시] 진도 제보 버튼 비활성화 (initialize에서 삭제) ---
  
  for (const btn of phaseButtons) {
    btn.addEventListener('click', () => renderPhase(btn.dataset.phase));
  }
  setupModal();
  renderPhase('4막'); // 첫 화면 로딩
}

// 스크립트 실행 시작
initialize();
