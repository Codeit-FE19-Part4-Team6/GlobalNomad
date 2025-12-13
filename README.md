# GlobalNomad
GlobalNomad는 여행·체험 예약 및 일정 관리 서비스입니다.

---

### 프로젝트 정보

- **프로젝트 기간**: 2025.12.20 ~ 2025.1.22
- **발표일**: 2025.1.21 (수) 13:00 ~ 16:00
- **팀명**: Team 6 (19기 Part4)

---

## 🧩 프로젝트 목표 및 학습 목표

### **프로젝트 목표**

1. 여행·체험 일정 등록, 조회, 수정 기능 구현
2. 외부 SDK를 활용한 지도, 주소 검색, 캘린더 기능 연동
3. React Query 기반 상태 관리 및 안정적 데이터 처리
4. 사용자 편의를 고려한 직관적 UI/UX 설계
5. Styled Components와 Next.js를 활용한 SPA 구현 및 UI 통일성 유지

### **학습 목표**

- Next.js 기반 SPA/SSR 구조 이해 및 구현 능력 강화
- TypeScript 활용으로 안정적 코드 작성
- Styled Components를 통한 UI 일관성 유지 및 컴포넌트화 경험
- Git/GitHub 기반 협업 및 코드 리뷰 경험
- Vercel 배포 및 AWS S3 연동 경험
- 외부 SDK 활용 및 API 연동 경험

---

## ✨ 주요 기능

* 회원가입 / 로그인
* 메인 페이지 (배너, 검색)
* 체험 상세
* 마이페이지
* 예약 내역
* 후기 작성
* 내 체험 관리
* 등록 / 수정 기능

---

## 🛠 기술 스택

### Frontend

* React
* TypeScript
* React Query / Zustand
* React Hook Form
* 외부 SDK/API: Calendar SDK, 주소 검색 SDK, 지도 SDK, OAuth

### 스타일링

* Tailwind

### 기타

* Kakao Map API
* Vercel (배포)

---

## 📂 폴더 구조
예시
```text
src/
 ┣ api/
 ┣ assets/
 ┣ components/
 ┣ hooks/
 ┣ pages/
 ┣ styles/
 ┣ types/
 ┗ utils/
```

---

## ▶ 실행 방법

```bash
npm install
npm run dev
```

---

## 🌿 브랜치 전략

* main : 배포 / 제출용 브랜치
* develop : 통합 개발 브랜치
* feat/* : 기능 단위 개발 브랜치
* fix/* : 버그 수정 브랜치

---

## 📝 커밋 컨벤션

```
feat: 기능 추가
fix: 버그 수정
refactor: 리팩토링
style: 코드 포맷 수정
docs: 문서 수정
chore: 설정 및 환경 작업
```

---

## 🔀 PR 규칙

* PR은 develop 브랜치로만 생성
* 하나의 PR에는 하나의 기능만 포함
* 코드 리뷰 후 merge 진행

---

## 👥 팀원 소개

| 이름  | 역할       |
| --- | -------- |
| 이윤지 | 메인 페이지   |
| 양정훈 | 로그인 / 인증 |
| 정우연 | 로그인 / 인증 |
| 최수빈 | 로그인 / 인증 |

---

## 📌 협업 규칙

* ESLint / Prettier 규칙 준수
* main 브랜치 직접 push 금지
* 모든 변경 사항은 PR로 공유

---

## 📄 기타

* 노션 / 피그마 / API 문서 링크
