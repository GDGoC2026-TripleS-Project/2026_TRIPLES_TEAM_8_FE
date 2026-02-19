# 2026_TRIPLES_TEAM_8_FE

대학 연합 프로젝트 **TripleS FE 8팀** 레포지토리입니다.
도서 탐색 및 리뷰 기반 서비스 **Gread**의 프론트엔드 개발을 담당합니다.

---

## 📁 파일 구조

```bash
src
├── app
│   ├── (auth)                # 로그인 / 온보딩 (네비게이션 제외)
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── onboarding
│   │       ├── page.tsx
│   │       └── result
│   │           └── page.tsx
│   │
│   ├── (public)              # 비회원 접근 가능 (상단 네비게이션 포함)
│   │   ├── page.tsx           # 홈
│   │   ├── feed
│   │   │   └── page.tsx       # 도서 찾기 피드
│   │   ├── ranking
│   │   │   └── page.tsx
│   │   └── books
│   │       └── [bookId]
│   │           └── page.tsx   # 도서 상세
│   │
│   ├── (protected)           # 로그인 필요 (상단 네비게이션 포함)
│   │   ├── me
│   │   │   └── page.tsx       # 마이페이지
│   │   └── feed
│   │       └── my
│   │           └── page.tsx   # 내 피드
│   │
│   ├── (no-nav)              # 네비게이션 제외 페이지
│   │   └── books
│   │       └── [bookId]
│   │           └── review
│   │               └── new
│   │                   └── page.tsx   # 리뷰 작성
│   │
│   ├── layout.tsx            # 루트 레이아웃
│   └── global.css            # 글로벌 스타일 / 디자인 시스템
│
├── components
│   ├── layout                # 공통 레이아웃 컴포넌트
│   │   ├── TopNavBar.tsx
│   │   └── MenuDrawer.tsx
│   │
│   ├── home
│   │   └── HomeScreen.tsx
│   ├── feed
│   │   └── FeedScreen.tsx
│   ├── book
│   │   └── BookDetailScreen.tsx
│   ├── ranking
│   │   └── RankingScreen.tsx
│   ├── me
│   │   └── MyPageScreen.tsx
│   └── review
│       └── ReviewWriteScreen.tsx
│
├── lib
│   ├── api                   # API 호출 로직
│   ├── auth                  # 인증 관련 로직
│   └── utils                 # 공용 유틸
│
├── store                     # 상태 관리 (Zustand)
├── types                     # 전역 타입 정의
├── mocks                     # Mock 데이터
│
public
└── common
```

---

## 🛠 개발 스택

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables (디자인 시스템 기반)
- **State Management**: Zustand
- **Package Manager**: pnpm
- **Deployment**: Vercel
- **Lint / Format**: ESLint, Prettier

---

## 🎨 스타일 시스템

- `global.css`에서 CSS 변수로 컬러 / radius / typography 관리
- Tailwind `theme.extend`에 토큰 매핑하여 유틸 클래스로 사용
- 공통 UI(네비게이션)는 Route Group 기반 레이아웃으로 관리

---

## 👥 프론트엔드 팀원

- **@jeongbam** (Frontend)

---

## 🔀 Git / PR 규칙

### 브랜치 전략

- `main` : 배포용
- `develop` : 개발 통합 브랜치
- `feature/*` : 기능 단위 개발 브랜치

### 커밋 메시지 컨벤션

```
feat: 도서 찾기 피드 UI 구현
fix: 네비게이션 hover 스타일 수정
refactor: MenuDrawer 컴포넌트 구조 개선
chore: 패키지 의존성 정리
```

---

## 🚀 실행 방법

```bash
pnpm install
pnpm dev
```

---
