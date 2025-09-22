/* ==========================================================================
   # 설정 (Configuration)
   - 각 페이즈의 관문 정보 등 고정적인 데이터를 정의합니다.
   ========================================================================== */
   const PHASE_CONFIG = {
    "4막": {
      bossId: "4",
      gates: [
        { name: "1관", maxHp: 300 },
        { name: "2관", maxHp: 450 }
      ],
    },
    "종막": {
      bossId: "5",
      gates: [
        { name: "1관", maxHp: 1000 },
        { name: "2관", maxHp: 999 },
        { name: "2-2", maxHp: 777 },
        { name: "2-3", maxHp: 777 }
      ],
    }
  };
  const API_BASE_URL = "https://api.lopec.kr/api";
  const REPORT_API_URL = "https://api.mococobot.kr/lopec";
  const REPORT_API_KEY = "E32189YR89321U89RYH98EWUHGFUG";
  // 동적 히든 게이트(2관-n) 표시/전송 플래그. 기본은 비활성(false)
  const DYNAMIC_HIDDEN_GATES = false;
  // 사전 노출용 최대 게이트 번호(종막). 0이면 비활성. 예: 5로 설정하면 2-3, 2-4까지 미리 노출
  const DYNAMIC_HIDDEN_MAX_GATE = 8;
  const REPORT_PROGRESS_OPEN_AT = '2025-08-20T10:00:00+09:00';
  
  // 비방으로 전환하여 별도 관리하는 공격대 목록
  const PRIVATE_PARTIES = [
    { name: "로구빛", gate: "2-2" },
  ];
  
  
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
  
  
    // 종막의 경우, 파티 데이터에서 관측된 최대 gate까지 헤더를 동적으로 확장
    const viewBossId = parseInt(phaseConfig.bossId, 10);
    let dynamicViewGates = DYNAMIC_HIDDEN_GATES ? getDynamicGatesForPhase(phase, apiData) : phaseConfig.gates;

    const transformedTeams = allTeamsData.map(partyData => {
      const privatePartyInfo = PRIVATE_PARTIES.find(p => p.name === partyData.partyName);
      const isPrivate = !!privatePartyInfo;
      const viewGates = dynamicViewGates;
      
      // 파티의 최종 진행 상황 찾기 (가장 높은 boss, 그 다음 높은 gate, gate 동일 시 updatedAt 최신)
      const latestProgress = partyData.progress.reduce((latest, current) => {
          if (!latest) return current;
          const latestBoss = parseInt(latest.boss, 10);
          const currentBoss = parseInt(current.boss, 10);
          if (currentBoss > latestBoss) return current;
          if (currentBoss < latestBoss) return latest;
          
          const latestGate = parseInt(latest.gate, 10);
          const currentGate = parseInt(current.gate, 10);
          if (currentGate > latestGate) return current;
          if (currentGate < latestGate) return latest;
          const latestTs = new Date(latest.updatedAt).getTime();
          const currentTs = new Date(current.updatedAt).getTime();
          return currentTs > latestTs ? current : latest;
      }, null);
  
      const teamBossId = latestProgress ? parseInt(latestProgress.boss, 10) : 0;
      
      let progress = [];
      let isAllCleared = false;
      let clearedAt = null;
  
      if (teamBossId > viewBossId) {
        // ** 현재 보는 페이즈보다 앞서나간 팀 **
        isAllCleared = true;
        // 현재 보는 페이즈의 마지막 관문 클리어 시간 찾기 (hp==0 중 가장 빠른 updatedAt)
        const phaseClearProgress = partyData.progress
          .filter(p => parseInt(p.boss, 10) === viewBossId && parseInt(p.gate, 10) === viewGates.length && parseInt(p.hp, 10) === 0)
          .reduce((latest, current) => {
            if (!latest) return current;
            return new Date(current.updatedAt).getTime() < new Date(latest.updatedAt).getTime() ? current : latest;
          }, null);
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
              const lg = parseInt(latest.gate, 10);
              const cg = parseInt(current.gate, 10);
              if (cg > lg) return current;
              if (cg < lg) return latest;
              // 동일 관문이면 updatedAt 최신 선택
              return new Date(current.updatedAt).getTime() > new Date(latest.updatedAt).getTime() ? current : latest;
          }, null);
          
        if (latestGateInView) {
            const currentGateNum = parseInt(latestGateInView.gate, 10);
            const currentHp = latestGateInView.hp;
            // 이전 관문들은 모두 클리어 처리
            for (let i = 1; i < currentGateNum; i++) {
                progress.push({ gateIndex: i - 1, currentHp: 0 });
            }
            // 현재 관문 진행도 추가
            progress.push({
              gateIndex: currentGateNum - 1,
              currentHp: currentHp
            });
        }
        
        const lastGateProgress = progress.length > 0 ? progress[progress.length - 1] : null;
        isAllCleared = progress.length === viewGates.length && lastGateProgress && lastGateProgress.currentHp === 0;
        if(isAllCleared){
            // 마지막 관문에서 hp==0인 기록 중 가장 빠른 updatedAt을 클리어 시간으로 사용
            const finalGateClear = partyData.progress
              .filter(p => parseInt(p.boss, 10) === viewBossId && parseInt(p.gate, 10) === viewGates.length && parseInt(p.hp, 10) === 0)
              .reduce((latest, current) => {
                if (!latest) return current;
                return new Date(current.updatedAt).getTime() < new Date(latest.updatedAt).getTime() ? current : latest;
              }, null);
            clearedAt = finalGateClear ? finalGateClear.updatedAt : null;
        }
      }
  
      // 팀 단위 최신 업데이트 시각(정렬 타이브레이커용)
      const teamLatestUpdatedAt = partyData.progress.reduce((maxTs, p) => {
        const ts = new Date(p.updatedAt).getTime();
        return isNaN(ts) ? maxTs : Math.max(maxTs, ts);
      }, 0);

      let privateGateName = null;
      // 비방 공대일 경우 '종막'에서 진도 강제 설정
      if (isPrivate && phase === '종막') {
        isAllCleared = false;
        clearedAt = null;
        privateGateName = privatePartyInfo.gate;
        const gateCfgs = PHASE_CONFIG['종막'].gates;
        const privateGateIndex = gateCfgs.findIndex(g => g.name === privateGateName);
        
        progress = [];
        // 이전 관문 모두 클리어 처리
        for (let i = 0; i < privateGateIndex; i++) {
            progress.push({ gateIndex: i, currentHp: 0 });
        }
        // 현재 관문 50% 진행으로 설정
        if(privateGateIndex !== -1){
            const gateMaxHp = gateCfgs[privateGateIndex].maxHp;
            progress.push({ gateIndex: privateGateIndex, currentHp: gateMaxHp / 2 });
        }
      }

      return {
        name: partyData.partyName,
        averageLopec: partyData.averageScore,
        isAllCleared: isAllCleared,
        clearedAt: clearedAt,
        latestUpdatedAt: teamLatestUpdatedAt,
        members: partyData.members.map(memberData => ({
          name: memberData.name,
          lopec: memberData.score,
          characterUrl: "#", // 캐릭터 URL은 현재 데이터에 없으므로 임시 처리
          streamUrl: memberData.url,
        })),
        progress: progress,
        isPrivate: isPrivate,
        privateGateName: privateGateName,
      };
    });
    
    return {
      lastUpdatedAt: lastUpdatedAt, // 계산된 가장 최신 시간으로 교체
      gates: dynamicViewGates,
      teams: transformedTeams,
    };
  }
  
  
  /* ==========================================================================
     # 전역 변수 및 DOM 요소 (Global Variables & DOM Elements)
     ========================================================================== */
  let currentApiData = null; // API 데이터를 저장할 전역 변수
  
  const contentEl = document.getElementById("content");
  
  const phaseButtons = Array.from(document.querySelectorAll(".phase-btn"));
  const overlay = document.getElementById('overlay');
  const reportProgressBtn = document.getElementById('reportProgressBtn');
  // const registerTeamBtn = document.getElementById('registerTeamBtn'); // 제거됨
  const closeBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const tabProgress = document.getElementById('tab-progress');
  const tabRegister = document.getElementById('tab-register');
  const phaseSelect = document.getElementById('phaseSelect');
  const teamNameSelect = document.getElementById('teamNameSelect');
  const teamNameSearch = document.getElementById('teamNameSearch');
  const teamNameSuggestions = document.getElementById('teamNameSuggestions');
  const gateSelect = document.getElementById('gateSelect');
  const lineSelect = document.getElementById('lineSelect');
  const submitProgress = document.getElementById('submitProgress');
  // const submitRegister = document.getElementById('submitRegister'); // 제거됨
  // const membersGrid = document.getElementById('membersGrid'); // 제거됨
  // const registerTeamNameInput = document.getElementById('registerTeamNameInput'); // 제거됨
  const progressHint = document.getElementById('progressHint');
  
  // New elements for registration flow
  // 등록 관련 요소 제거
  
  // Correction Modal Elements
  const correctionBtn = document.getElementById('correctionBtn');
  const correctionOverlay = document.getElementById('correctionOverlay');
  const correctionModalClose = document.getElementById('correctionModalClose');
  const inquiryLink = document.getElementById('inquiryLink');
  
  // Private Report Modal Elements
  const privateReportBtn = document.getElementById('privateReportBtn');
  const privateReportOverlay = document.getElementById('privateReportOverlay');
  const privateReportModalClose = document.getElementById('privateReportModalClose');
  const privateInquiryLink = document.getElementById('privateInquiryLink');
  
  // 중복 제출 및 중복 바인딩 방지 플래그
  let isSubmittingProgress = false;
  let modalSetupDone = false;
  let suggestionActiveIndex = -1;
  let suggestionListCache = [];

  // 제보 제한(클라이언트) 설정
  const REPORT_THROTTLE_MS = 30 * 1000; // 30초
  const REPORT_THROTTLE_KEY = 'lopec:report:throttleUntil';
  
  function getReportThrottleRemainingMs() {
    try {
      const raw = localStorage.getItem(REPORT_THROTTLE_KEY);
      const until = raw ? parseInt(raw, 10) : 0;
      if (Number.isNaN(until)) return 0;
      const now = Date.now();
      return Math.max(0, until - now);
    } catch (_) {
      return 0;
    }
  }
  
  function setReportThrottle() {
    try {
      const until = Date.now() + REPORT_THROTTLE_MS;
      localStorage.setItem(REPORT_THROTTLE_KEY, String(until));
      setTimeout(() => {
        try {
          const raw = localStorage.getItem(REPORT_THROTTLE_KEY);
          const stored = raw ? parseInt(raw, 10) : 0;
          if (!raw) return;
          if (!Number.isNaN(stored) && stored <= Date.now()) {
            localStorage.removeItem(REPORT_THROTTLE_KEY);
          }
        } catch (_) { /* noop */ }
      }, REPORT_THROTTLE_MS + 500);
    } catch (_) { /* localStorage unavailable */ }
  }

  // Helper: 팀 전체 최신 진도 (boss > gate > updatedAt)
  function getLatestProgressOverall(selectedTeamData) {
    if (!selectedTeamData || !Array.isArray(selectedTeamData.progress)) return null;
    return selectedTeamData.progress.reduce((latest, current) => {
      if (!latest) return current;
      const lb = parseInt(latest.boss, 10);
      const cb = parseInt(current.boss, 10);
      if (cb > lb) return current;
      if (cb < lb) return latest;
      const lg = parseInt(latest.gate, 10);
      const cg = parseInt(current.gate, 10);
      if (cg > lg) return current;
      if (cg < lg) return latest;
      return new Date(current.updatedAt).getTime() > new Date(latest.updatedAt).getTime() ? current : latest;
    }, null);
  }

  // Helper: 선택된 팀에 맞춰 페이즈/관문 옵션 동기화
  function syncPhaseAndGateWithTeam() {
    if (!currentApiData || !currentApiData.parties || !teamNameSelect || !teamNameSelect.value) return;
    const selectedTeamData = currentApiData.parties.find(t => t.partyName === teamNameSelect.value);
    const overall = getLatestProgressOverall(selectedTeamData);
    if (!overall) return;

    const latestBossNum = parseInt(overall.boss, 10);
    const latestGateNum = parseInt(overall.gate, 10);

    // 4막/종막 옵션 표시 제어: 보스가 5면 4막 숨김
    if (phaseSelect && phaseSelect.options) {
      Array.from(phaseSelect.options).forEach(opt => {
        if (opt.textContent === '4막') {
          opt.hidden = latestBossNum >= 5;
          opt.disabled = latestBossNum >= 5;
        }
        if (opt.textContent === '종막') {
          opt.hidden = false;
          opt.disabled = false;
        }
      });
    }

    // 현재 보스에 맞춰 자동 선택
    const desiredPhase = latestBossNum >= 5 ? '종막' : '4막';
    if (phaseSelect.value !== desiredPhase) {
      phaseSelect.value = desiredPhase;
    }

    // 관문 옵션: 현재 관문보다 낮은 값은 숨김
    populateGateOptions(latestGateNum);
    // 기본 선택을 현재 관문으로 설정
    const currentGateName = PHASE_CONFIG[desiredPhase].gates[latestGateNum - 1]?.name;
    if (currentGateName) {
      gateSelect.value = currentGateName;
    }

    // 줄 옵션/검증 갱신
    populateLineOptions();
    validateForms();
  }
  
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
      return;
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
    
    // 상위 10개 팀만 필터링
    const top10Teams = teams.slice(0, 10);
  
    // 클리어 순위 계산
    const clearedTeams = top10Teams
      .filter(team => team.isAllCleared && team.clearedAt)
      .sort((a, b) => new Date(a.clearedAt).getTime() - new Date(b.clearedAt).getTime());
    
    const clearRankMap = new Map();
    clearedTeams.forEach((team, index) => {
      clearRankMap.set(team.name, index + 1);
    });
  
    top10Teams.forEach((team, index) => {
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
    
    const rankSpan = document.createElement('span');
    rankSpan.className = 'team-rank';
    rankSpan.classList.add(`rank-${rank}`); // 순위별 클래스 추가
    rankSpan.textContent = `The ${rank}${getOrdinalSuffix(rank)}.`;
    
    const teamNameSpan = document.createElement('span');
    teamNameSpan.className = 'team-name-text';
    teamNameSpan.textContent = team.name;

    name.appendChild(rankSpan);
    name.appendChild(teamNameSpan);

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
        const currentGateName = gates[currentGateIndex].name;
        const isUnknownGate = currentGateName === '2-3';

        labelGateIndex = currentGateIndex;
        // 2-3 관문에 진입했다면(percent>0) 진행률을 50%로 고정
        labelPercentInGate = (isUnknownGate && currentProgress.percent > 0) ? 50 : currentProgress.percent;

        if (labelPercentInGate > 0) {
          const segFill = document.createElement('div');
          segFill.className = 'progress';
          if (team.isPrivate) segFill.classList.add('private'); // 비방 공대 클래스 추가
          if (isUnknownGate) segFill.classList.add('unknown-progress');
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
  
      tag.textContent = `${mm}.${dd}. ${hh}:${mi}. 클리어`;
    } else if (team.isPrivate) {
      const dotLeft = (labelGateIndex / totalSegments) * 100 + (labelPercentInGate / 100) * (100 / totalSegments);
      dot.style.left = dotLeft + '%';
      tag.textContent = `${team.privateGateName} - 비방 진행중`;
    } else {
      const dotLeft = (labelGateIndex / totalSegments) * 100 + (labelPercentInGate / 100) * (100 / totalSegments);
      dot.style.left = dotLeft + '%';
      const currentGateInfo = getGateProgress(team, labelGateIndex, gates);
      const remainingLines = Math.max(0, Math.round(currentGateInfo.currentHp));
      const currentGateName = gates[labelGateIndex].name;
  
      if (labelPercentInGate === 0) {
        // 첫 관문 시작 전이면 "입장 전", 그 외에는 이전 관문 클리어로 표시
        tag.textContent = labelGateIndex === 0 ? '입장 전' : `${gates[labelGateIndex - 1].name} 클리어`;
      } else if (currentGateName === '2-3') {
        tag.textContent = `2-3 ???줄`;
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
  
  function getGateNumberByName(gateName) {
    const phase = phaseSelect.value;
    const phaseConfig = PHASE_CONFIG[phase];
    if (!phaseConfig) return 0;
    const gateIndex = phaseConfig.gates.findIndex(g => g.name === gateName);
    return gateIndex !== -1 ? gateIndex + 1 : 0;
  }
  
  function compareTeamsByProgress(teamA, teamB, gates) {
    const getPosition = (team) => {
      // 클리어 여부 우선 확인
      let cleared = false;
      let gateIndex = -1;
      let hpInGate = 0;
      // 진행 중인 관문 탐색
      for (let i = 0; i < gates.length; i++) {
        const p = getGateProgress(team, i, gates);
        if (p.percent < 100) {
          gateIndex = i;
          hpInGate = p.currentHp;
          break;
        }
      }
      if (gateIndex === -1) {
        // 모든 관문 100% → 클리어
        cleared = true;
        gateIndex = gates.length;
        hpInGate = 0;
      }
      return { cleared, gateIndex, hpInGate };
    };

    const a = getPosition(teamA);
    const b = getPosition(teamB);

    // 1) 진도 비교: Gate 숫자 높은 팀 우선
    if (a.gateIndex !== b.gateIndex) return b.gateIndex - a.gateIndex;

    // 동일 관문 진입 시 비방 공대 특별 정렬 로직
    const aIsPrivate = teamA.isPrivate;
    const bIsPrivate = teamB.isPrivate;
    if (aIsPrivate !== bIsPrivate) {
      const currentGateMaxHp = gates[a.gateIndex].maxHp;
      // A가 비방, B가 일반 -> B가 관문을 시작했으면 B가 위, 아니면 A가 위
      if (aIsPrivate) {
        return (b.hpInGate < currentGateMaxHp) ? 1 : -1;
      }
      // B가 비방, A가 일반 -> A가 관문을 시작했으면 A가 위, 아니면 B가 위
      if (bIsPrivate) {
        return (a.hpInGate < currentGateMaxHp) ? -1 : 1;
      }
    }

    // HP 낮은 팀 우선
    if (a.hpInGate !== b.hpInGate) return a.hpInGate - b.hpInGate;
  
    // 3) 둘 다 클리어라면 clearedAt이 빠른 순
    if (a.cleared && b.cleared) {
      const aTime = teamA.clearedAt ? new Date(teamA.clearedAt).getTime() : Infinity;
      const bTime = teamB.clearedAt ? new Date(teamB.clearedAt).getTime() : Infinity;
      if (aTime !== bTime) return aTime - bTime; // 빠른 시간 우선
    }

    // 2) 동일 진도(클리어 아님 포함)일 경우 평균 점수 높은 팀
    const aLopec = typeof teamA.averageLopec === 'number' ? teamA.averageLopec : 0;
    const bLopec = typeof teamB.averageLopec === 'number' ? teamB.averageLopec : 0;
    if (aLopec !== bLopec) return bLopec - aLopec;

    return 0;
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

  // 동적 게이트 헤더 생성: 종막의 히든(2-2, 2-3, 2-4...)을 API 데이터에 맞춰 확장
  function getDynamicGatesForPhase(phase, apiData) {
    const phaseCfg = PHASE_CONFIG[phase];
    if (!phaseCfg) return [];
    // 4막은 정적
    if (phase !== '종막' || !apiData || !Array.isArray(apiData.parties)) {
      return phaseCfg.gates;
    }
    const bossId = parseInt(phaseCfg.bossId, 10);
    let maxGateObserved = 0;
    for (const party of apiData.parties) {
      if (!Array.isArray(party.progress)) continue;
      for (const p of party.progress) {
        if (parseInt(p.boss, 10) === bossId) {
          const g = parseInt(p.gate, 10);
          if (!isNaN(g)) maxGateObserved = Math.max(maxGateObserved, g);
        }
      }
    }
    const baseCount = phaseCfg.gates.length; // 최소 3 (1관, 2관, 히든(2-1))
    const forcedMax = typeof DYNAMIC_HIDDEN_MAX_GATE === 'number' ? DYNAMIC_HIDDEN_MAX_GATE : 0;
    const displayCount = Math.max(baseCount, maxGateObserved || 0, forcedMax || 0);
    const built = [];
    for (let i = 1; i <= displayCount; i++) {
      let name;
      if (i === 1) name = '1관';
      else if (i === 2) name = '2-1';
      else name = `2-${i - 1}`; // 3→2-2, 4→2-3 ...
      const maxHp = phaseCfg.gates[i - 1] ? phaseCfg.gates[i - 1].maxHp : 300;
      built.push({ name, maxHp });
    }
    return built;
  }
  
  
  /* ==========================================================================
     # 모달 (Modal Logic)
     ========================================================================== */
  
  // 등록 기능 제거됨
  
  function setupModal() {
    if (modalSetupDone) return; // 중복 바인딩 방지
    modalSetupDone = true;

    // 시간 기반 활성/비활성 제어
    const openReportModal = () => {
      overlay.classList.add('open');
      modalTitle.textContent = '진도 현황 제보';
      tabProgress.style.display = 'block';
      tabRegister.style.display = 'none';
      populateTeamNameOptions(teamNameSearch ? teamNameSearch.value : '');
      populateGateOptions();
      populateLineOptions();
      validateForms();
    };
    const alertBeforeOpen = () => {
      const openAt = new Date(REPORT_PROGRESS_OPEN_AT);
      const yyyy = String(openAt.getFullYear());
      const mm = String(openAt.getMonth() + 1).padStart(2, '0');
      const dd = String(openAt.getDate()).padStart(2, '0');
      const hh = String(openAt.getHours()).padStart(2, '0');
      const mi = String(openAt.getMinutes()).padStart(2, '0');
      alert(`진도 제보는 ${yyyy}.${mm}.${dd}. ${hh}:${mi}부터 가능합니다.`);
    };
    const setReportButtonState = () => {
      const isOpen = Date.now() >= Date.parse(REPORT_PROGRESS_OPEN_AT);
      if (isOpen) {
        reportProgressBtn.classList.remove('disabled');
        reportProgressBtn.onclick = openReportModal;
      } else {
        reportProgressBtn.classList.add('disabled');
        reportProgressBtn.onclick = alertBeforeOpen;
      }
    };
    setReportButtonState();
    const msUntilOpen = Date.parse(REPORT_PROGRESS_OPEN_AT) - Date.now();
    if (msUntilOpen > 0) {
      setTimeout(() => {
        setReportButtonState();
      }, msUntilOpen + 100);
    }


    // registerTeamBtn 관련 로직 제거됨
  
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
  
    // Private Report Modal
    if (privateReportBtn) {
      privateReportBtn.addEventListener('click', () => {
        privateReportOverlay.classList.add('open');
      });
      privateReportModalClose.addEventListener('click', () => {
        privateReportOverlay.classList.remove('open');
      });
      privateReportOverlay.addEventListener('click', (e) => {
        if (e.target === privateReportOverlay) {
          privateReportOverlay.classList.remove('open');
        }
      });
    }

    // 등록 안내 확인 로직 제거됨
  
  
    phaseSelect.addEventListener('change', () => { populateGateOptions(); populateLineOptions(); validateForms(); });
    teamNameSelect.addEventListener('change', () => { syncPhaseAndGateWithTeam(); });
    if (teamNameSearch) {
      teamNameSearch.addEventListener('input', () => {
        suggestionActiveIndex = -1;
        populateTeamNameOptions(teamNameSearch.value);
        renderTeamSuggestions();
        validateForms();
      });
      teamNameSearch.addEventListener('keydown', (e) => {
        const max = (suggestionListCache || []).length;
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          suggestionActiveIndex = Math.min((suggestionActiveIndex + 1), Math.max(0, max - 1));
          renderTeamSuggestions();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          suggestionActiveIndex = Math.max((suggestionActiveIndex - 1), 0);
          renderTeamSuggestions();
        } else if (e.key === 'Enter') {
          const visibleItems = Array.from(teamNameSuggestions.querySelectorAll('.item'));
          const idx = suggestionActiveIndex >= 0 ? suggestionActiveIndex : 0;
          const choice = visibleItems[idx] ? visibleItems[idx].textContent : null;
          if (choice) {
            teamNameSelect.value = choice;
            teamNameSearch.value = choice;
            if (teamNameSuggestions) teamNameSuggestions.style.display = 'none';
            populateLineOptions();
            validateForms();
          }
        } else if (e.key === 'Escape') {
          if (teamNameSuggestions) teamNameSuggestions.style.display = 'none';
        }
      });
      teamNameSearch.addEventListener('focus', () => {
        suggestionActiveIndex = -1;
        populateTeamNameOptions(teamNameSearch.value);
        renderTeamSuggestions();
      });
      document.addEventListener('click', (evt) => {
        if (!teamNameSuggestions) return;
        if (evt.target === teamNameSearch) return;
        if (!teamNameSuggestions.contains(evt.target)) {
          teamNameSuggestions.style.display = 'none';
        }
      });
    }
    gateSelect.addEventListener('change', () => { populateLineOptions(); validateForms(); });
    lineSelect.addEventListener('change', validateForms);
  
    // buildMembersGrid 및 등록 입력 검증 제거됨
  
    // 혹시 기존에 바인딩되어 있던 리스너가 있으면 제거 후 재바인딩
    submitProgress.removeEventListener('click', handleProgressSubmit);
    submitProgress.addEventListener('click', handleProgressSubmit);
  }
  
  function populateTeamNameOptions(filterText = '') {
    const normalizedFilter = filterText.trim().toLowerCase();
    const selectedBefore = teamNameSelect.value;
    teamNameSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.textContent = '공격대를 선택하세요';
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    teamNameSelect.appendChild(placeholder);

    if (currentApiData && currentApiData.parties) {
      let teamNames = currentApiData.parties.map(team => team.partyName);

      if (normalizedFilter.length > 0) {
        teamNames = teamNames.filter(n => n.toLowerCase().includes(normalizedFilter));
      }
      teamNames.sort();
      for (const name of teamNames) {
        const opt = document.createElement('option');
        opt.textContent = name;
        opt.value = name;
        teamNameSelect.appendChild(opt);
      }
      // 자동완성용 캐시 업데이트
      suggestionListCache = teamNames;
    }

    // 기존 선택 유지 시도 (필터로 사라졌다면 placeholder 유지)
    if (selectedBefore && Array.from(teamNameSelect.options).some(o => o.value === selectedBefore)) {
      teamNameSelect.value = selectedBefore;
    }
  }

  function renderTeamSuggestions() {
    if (!teamNameSuggestions || !teamNameSearch) return;
    const container = teamNameSuggestions;
    container.innerHTML = '';
    const keyword = teamNameSearch.value.trim().toLowerCase();
    const items = (suggestionListCache || []).slice(0, 100); // 안전 최대치
    const matches = keyword ? items.filter(n => n.toLowerCase().includes(keyword)) : items;

    const list = document.createElement('div');
    list.className = 'suggestion-list';
    list.setAttribute('role', 'listbox');

    if (matches.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = '일치하는 공격대가 없습니다';
      list.appendChild(empty);
    } else {
      matches.forEach((name, idx) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('role', 'option');
        item.setAttribute('data-index', String(idx));
        item.textContent = name;
        if (idx === suggestionActiveIndex) item.setAttribute('aria-selected', 'true');
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          teamNameSelect.value = name;
          teamNameSearch.value = name;
          container.style.display = 'none';
          populateLineOptions();
          validateForms();
        });
        list.appendChild(item);
      });
    }
    container.appendChild(list);
    // 입력이 유일하게 한 항목과 정확 일치하면 자동 확정
    const exact = matches.find(n => n.toLowerCase() === keyword);
    if (keyword && matches.length === 1 && exact) {
      teamNameSelect.value = matches[0];
      teamNameSearch.value = matches[0];
      container.style.display = 'none';
      populateLineOptions();
      validateForms();
      return;
    }
    container.style.display = matches.length > 0 ? 'block' : 'none';
  }
  
  function populateGateOptions(minGateNumber = 1) {
    const phase = phaseSelect.value;
    gateSelect.innerHTML = '';
    const gatesSource = DYNAMIC_HIDDEN_GATES ? getDynamicGatesForPhase(phase, currentApiData) : PHASE_CONFIG[phase].gates;
    const gates = gatesSource.map((g, idx) => ({ name: g.name, num: idx + 1 }));
    for (const g of gates) {
      if (g.num < minGateNumber) continue; // 현재 관문보다 낮은 값은 숨김
      const opt = document.createElement('option');
      opt.textContent = g.name; opt.value = g.name; gateSelect.appendChild(opt);
    }
  }
  
  function populateLineOptions() {
    lineSelect.innerHTML = '';
    const phase = phaseSelect.value;
    const gateName = gateSelect.value;

    // 2-3 관문은 '클리어'만 선택 가능
    if (phase === '종막' && gateName === '2-3') {
      const clearOpt = document.createElement('option');
      clearOpt.value = 'clear';
      clearOpt.textContent = '클리어';
      lineSelect.appendChild(clearOpt);
      validateForms();
      return;
    }

    const gatesSource = DYNAMIC_HIDDEN_GATES ? getDynamicGatesForPhase(phase, currentApiData) : PHASE_CONFIG[phase].gates;
    const gateInfo = gatesSource.find(g => g.name === gateName);
    const maxLines = gateInfo ? gateInfo.maxHp : 300;

    // 선택된 팀의 최신 진도를 반영하여 시작 줄 계산
    let startLine = maxLines;
    if (currentApiData && currentApiData.parties && teamNameSelect && teamNameSelect.value) {
      const selectedTeam = currentApiData.parties.find(p => p.partyName === teamNameSelect.value);
      if (selectedTeam && Array.isArray(selectedTeam.progress)) {
        // 해당 phase의 bossId
        const viewBossId = PHASE_CONFIG[phase].bossId;
        // 이 팀의 해당 boss에서 가장 최신 gate의 진행을 찾음
        const latestInPhase = selectedTeam.progress
          .filter(p => String(p.boss) === String(viewBossId))
          .reduce((latest, current) => {
            if (!latest) return current;
            const lg = parseInt(latest.gate, 10);
            const cg = parseInt(current.gate, 10);
            if (cg > lg) return current;
            if (cg < lg) return latest;
            // 동일 관문이면 updatedAt 최신 선택
            return new Date(current.updatedAt).getTime() > new Date(latest.updatedAt).getTime() ? current : latest;
          }, null);

        if (latestInPhase) {
          const latestGateNum = parseInt(latestInPhase.gate, 10);
          const selectedGateNum = getGateNumberByName(gateName);
          if (latestGateNum === selectedGateNum) {
            const currentHpNum = parseInt(latestInPhase.hp, 10);
            // 현재 줄보다 1 낮은 값부터 생성 (사용자의 실수 방지)
            startLine = Math.max(1, currentHpNum - 1);
          } else if (latestGateNum > selectedGateNum) {
            // 이미 다음 관문으로 넘어간 경우 → 이 관문은 클리어만 가능
            startLine = 1;
          } else {
            // 아직 이전 관문 중이면 이 관문의 최대치부터
            startLine = maxLines;
          }
        }
      }
    }

    for (let i = startLine; i >= 1; i--) {
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
  
  // buildMembersGrid 제거됨
  
  function validateForms() {
    // '진도 제보' 탭 유효성 검사
    const teamSelected = teamNameSelect.value;
    const phaseSelected = phaseSelect.value;
    const gateSelected = gateSelect.value;
    const lineSelected = lineSelect.value;
    const allProgressFieldsSelected = teamSelected && phaseSelected && gateSelected && lineSelected;
    
    let isProgressValid = true;
    progressHint.style.display = 'none';

    // 비방 공대 제보 차단
    if (teamSelected && PRIVATE_PARTIES.some(p => p.name === teamSelected)) {
      isProgressValid = false;
      progressHint.textContent = '비방 중인 공대는 제보할 수 없습니다.';
      progressHint.style.display = 'block';
    } else if (allProgressFieldsSelected && currentApiData && currentApiData.parties) {
      const selectedTeamData = currentApiData.parties.find(team => team.partyName === teamSelected);
      if (selectedTeamData) {
        // Find latest progress (boss > gate > updatedAt)
        const latestProgress = selectedTeamData.progress.reduce((latest, current) => {
          if (!latest) return current;
          const latestBoss = parseInt(latest.boss, 10);
          const currentBoss = parseInt(current.boss, 10);
          if (currentBoss > latestBoss) return current;
          if (currentBoss < latestBoss) return latest;
          const latestGate = parseInt(latest.gate, 10);
          const currentGate = parseInt(current.gate, 10);
          if (currentGate > latestGate) return current;
          if (currentGate < latestGate) return latest;
          return new Date(current.updatedAt).getTime() > new Date(latest.updatedAt).getTime() ? current : latest;
        }, null);
        
        if(latestProgress) {
          const currentBoss = parseInt(latestProgress.boss, 10);
          const currentGate = parseInt(latestProgress.gate, 10);
          const currentHp = parseInt(latestProgress.hp, 10);
          
          const selectedBoss = phaseSelected === '4막' ? 4 : 5;
          const selectedGate = getGateNumberByName(gateSelected);
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
    if (teamNameSearch && teamNameSearch.value.trim().length > 0 && !teamSelected) {
      submitProgress.disabled = true;
    }
    
    // '공격대 등록' 탭 제거에 따른 검증 로직 삭제
  }
  
  
  /* ==========================================================================
     # 초기화 (Initialization)
     ========================================================================== */
  function initialize() {
    renderPhase('종막'); // 첫 화면 로딩 시 '종막'을 바로 렌더링
  }
  
  // 스크립트 실행 시작
  document.addEventListener('DOMContentLoaded', () => {
    initialize();
  });
  