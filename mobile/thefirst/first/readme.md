# The First 현황판: FE/BE 연동을 위한 API 명세

안녕하세요! 프론트엔드 프로토타입을 기반으로 백엔드 API 개발에 필요한 명세를 정리했습니다.
기능별로 티켓을 나누었으니, 확인 부탁드립니다.

---

## ✅ 티켓 1: 제보 데이터 수신 API (FE → BE)

사용자가 현황판에 '진도' 또는 '공격대'를 제보할 때 호출되는 API입니다.
총 2개의 엔드포인트가 필요합니다.

### 1. 진도 현황 제보

-   **Endpoint:** `POST /api/progress` (추천)
-   **Content-Type:** `application/json`
-   **설명:** 특정 공격대의 레이드 진행 상황을 업데이트합니다.
-   **Request Body (JSON):**

```json
{
  "RaidParty": "로아사랑단",
  "Boss": "4",
  "Gate": "1",
  "HP": "132"
}
```

-   **필드 설명:**
    -   `RaidParty` (string): 제보할 공격대의 이름 (DB에 존재하는 이름)
    -   `Boss` (string): 현재 진행 중인 막 정보. "4"는 4막, "5"는 종막을 의미합니다.
    -   `Gate` (string): 현재 진행 중인 관문 정보. "1"은 1관, "2"는 2관을 의미합니다. (종막의 히든 관문은 "3"으로 약속합니다.)
    -   `HP` (string): 보스의 남은 체력(줄 수). 만약 해당 관문을 클리어했다면 "0"으로 전송됩니다.


### 2. 공격대 등록 제보

-   **Endpoint:** `POST /api/teams` (추천)
-   **Content-Type:** `application/json`
-   **설명:** 새로운 공격대를 등록하거나, 기존 공격대의 멤버 정보를 업데이트합니다.
-   **Request Body (JSON):**

```json
{
  "RaidParty": "새로운공격대",
  "Member1_Name": "캡틴잭",
  "Member1_URL": "https://chzzk.naver.com/...",
  "Member2_Name": "후L1",
  "Member2_URL": "null",
  "Member3_Name": "태경",
  "Member3_URL": "https://chzzk.naver.com/...",
  "Member4_Name": "착해진쫀지",
  "Member4_URL": "null",
  "Member5_Name": "방울토마토라면",
  "Member5_URL": "https://chzzk.naver.com/...",
  "Member6_Name": "김뚜띠",
  "Member6_URL": "null",
  "Member7_Name": "홀리은가비",
  "Member7_URL": "https://chzzk.naver.com/...",
  "Member8_Name": "쁘허",
  "Member8_URL": "null"
}
```

-   **필드 설명:**
    -   `RaidParty` (string): 등록할 공격대의 전체 이름.
    -   `MemberX_Name` (string): X번째 멤버의 닉네임. **(8명 모두 필수)**
    -   `MemberX_URL` (string): X번째 멤버의 방송 URL. URL이 없는 경우, 문자열 `"null"`로 전송됩니다. **(최소 1개 이상 필수)**

---

## ✅ 티켓 2: 현황판 데이터 제공 API (BE → FE)

프론트엔드에서 현황판 페이지를 그리기 위해 호출하는 API입니다.
페이지 로딩 시 한 번 호출하여 모든 공격대의 모든 정보를 가져옵니다.

-   **Endpoint:** `GET /api/dashboard` (추천)
-   **설명:** 현황판에 표시될 모든 공격대의 목록과 상세 정보를 반환합니다.
-   **Response Body (JSON):**
    -   프론트엔드에서 사용 중인 데이터 구조에 맞춰 아래와 같은 형식으로 반환해주시면 가장 좋습니다.

```json
{
  "lastUpdatedAt": "2024-07-29T12:00:00Z",
  "teams": [
    {
      "RaidParty": "로아사랑단",
      "Boss": "5",
      "Gate": "1",
      "HP": "280",
      "Avg": 1672.50,
      "clear_Time_4": "2024-07-28T18:30:00Z",
      "clear_Time_5": null,
      "Members": [
        {
          "Member_Name": "캡틴잭",
          "Member_Lopec": "1675.00",
          "Member_URL": "https://chzzk.naver.com/..."
        },
        {
          "Member_Name": "후L1",
          "Member_Lopec": "1670.00",
          "Member_URL": "null"
        }
      ]
    },
    {
      "RaidParty": "산악회",
      "Boss": "4",
      "Gate": "2",
      "HP": "120",
      "Avg": 1678.13,
      "clear_Time_4": null,
      "clear_Time_5": null,
      "Members": [
        {
          "Member_Name": "멤버1",
          "Member_Lopec": "1680.00",
          "Member_URL": "..."
        }
      ]
    }
  ]
}
```

-   **필드 설명:**
    -   `lastUpdatedAt` (string): 서버에서 마지막으로 데이터가 업데이트된 시각 (ISO 8601 형식).
    -   `teams` (array): 전체 공격대 정보 객체들의 배열.
        -   `RaidParty` (string): 공격대 이름.
        -   `Boss` (string): 현재 공격대가 도전 중인 막 정보 ("4" 또는 "5").
        -   `Gate` (string): 현재 도전 중인 관문 정보 ("1", "2", "3"...).
        -   `HP` (string): 현재 도전 중인 관문의 남은 체력(줄 수).
        -   `Avg` (number): 공격대 평균 로펙 점수.
        -   `clear_Time_4` (string | null): 4막을 클리어한 시간 (ISO 8601 형식). 클리어하지 않았으면 `null`.
        -   `clear_Time_5` (string | null): 5막(종막)을 클리어한 시간. 클리어하지 않았으면 `null`.
        -   `Members` (array): 공격대 멤버 정보 객체들의 배열.
            -   `Member_Name` (string): 멤버 닉네임.
            -   `Member_Lopec` (string): 멤버 로펙 점수.
            -   `Member_URL` (string | "null"): 멤버 방송 URL. 없으면 문자열 `"null"`.