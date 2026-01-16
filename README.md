# GlobalNomad

체험 예약 플랫폼 - 다양한 활동과 체험을 검색하고 예약할 수 있는 서비스

## 프로젝트 소개

GlobalNomad는 사용자가 다양한 체험 활동을 탐색하고 예약할 수 있는 웹 애플리케이션입니다. 체험 제공자는 자신의 활동을 등록하고 관리할 수 있으며, 사용자는 원하는 체험을 검색하고 예약할 수 있습니다.

## 기술 스택

### Core

- **React** 19.2.3
- **TypeScript** 5.9.3 (Strict Mode)
- **Vite** 7.2.4

### 상태 관리 & 데이터 페칭

- **TanStack Query** 5.90.12 - 서버 상태 관리
- **Zustand** 5.0.9 - 클라이언트 상태 관리
- **Axios** 1.13.2 - HTTP 클라이언트

### 스타일링

- **Tailwind CSS** 4.1.18
- **tailwind-merge** - 클래스 병합
- **clsx** - 조건부 클래스

### 폼 & 검증

- **React Hook Form** 7.69.0

### 외부 서비스

- **Kakao Maps SDK** - 지도 표시
- **Kakao OAuth** - 소셜 로그인
- **react-daum-postcode** - 주소 검색

### 개발 도구

- **ESLint** + **Prettier** - 코드 품질
- **Husky** + **lint-staged** - Git Hooks
- **commitlint** - 커밋 메시지 규칙

## 주요 기능

### 사용자

- 회원가입 / 로그인 (이메일, Kakao OAuth)
- 체험 검색 및 필터링 (카테고리, 가격순)
- 체험 상세 정보 확인 (이미지, 지도, 리뷰)
- 체험 예약 및 예약 관리
- 예약 후 리뷰 작성

### 체험 제공자

- 체험 등록 / 수정 / 삭제
- 일정 및 시간대 관리
- 예약 현황 확인 및 상태 관리 (승인/거절)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 미리보기

```bash
npm run preview
```

### 린트 실행

```bash
npm run lint
```

## 프로젝트 구조

```
src/
├── apis/                # API 계층
│   ├── http.ts          # Axios 인스턴스 (토큰 자동 주입)
│   ├── auth/            # 인증 API
│   ├── activity.ts      # 체험 API
│   └── ...
│
├── components/          # 재사용 컴포넌트
│   └── common/
│       ├── Header/
│       ├── Footer/
│       ├── button/
│       ├── card/        # Compound Component Pattern
│       ├── modal/
│       ├── dropdown/
│       └── ...
│
├── pages/               # 페이지 컴포넌트
│   ├── MainPage.tsx
│   ├── ActivityDetailPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── MyPageLayout.tsx
│   └── ...
│
├── hooks/               # 커스텀 훅
│   ├── queries/         # TanStack Query 훅
│   └── ...
│
├── stores/              # Zustand 스토어
├── utils/               # 유틸리티 함수
├── types/               # TypeScript 타입
└── assets/              # 정적 자원
```

## 페이지 구성

| 경로                      | 페이지         | 설명                    |
| ------------------------- | -------------- | ----------------------- |
| `/`                       | MainPage       | 메인 페이지 (체험 목록) |
| `/activities/:id`         | ActivityDetail | 체험 상세 및 예약       |
| `/activities/create`      | CreateActivity | 체험 등록               |
| `/activities/edit/:id`    | EditActivity   | 체험 수정               |
| `/login`                  | Login          | 로그인                  |
| `/signup`                 | Signup         | 회원가입                |
| `/oauth/kakao`            | KakaoCallback  | Kakao OAuth 콜백        |
| `/mypage`                 | MyPageLayout   | 마이페이지              |
| `/mypage?tab=profile`     | MyProfile      | 프로필 관리             |
| `/mypage?tab=reservation` | Reservation    | 내 예약 목록            |
| `/mypage?tab=experiences` | MyExperiences  | 내 체험 관리            |
| `/mypage?tab=status`      | BookingStatus  | 예약 현황 (체험 제공자) |

## 커밋 컨벤션

```
Type: Subject

# Types
- Init: 초기 설정
- Feat: 새로운 기능
- Fix: 버그 수정
- Refactor: 코드 리팩토링
- Chore: 기타 변경사항
- Style: 스타일 변경
- Docs: 문서 수정
- Rename: 파일/폴더명 변경
- Remove: 파일/폴더 삭제

# Example
Feat: 로그인 페이지 UI 구현
```

## 환경 변수

```env
VITE_API_BASE_URL=https://sp-globalnomad-api.vercel.app/19-6
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key
VITE_KAKAO_JS_KEY=your_kakao_js_key
```

## 팀원

| 이름   | 역할     | GitHub                                         |
| ------ | -------- | ---------------------------------------------- |
| 이윤지 | Frontend | [@le2yunji](https://github.com/le2yunji)       |
| 정우연 | Frontend | [@jung518](https://github.com/jung518)         |
| 양정훈 | Frontend | [@didwjdgns99](https://github.com/didwjdgns99) |
| 최수빈 | Frontend | [@soobbliss](https://github.com/soobbliss)     |

## 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
