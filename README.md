# 📝 Todo List

Next.js + Tanstack Query 기반의 간단한 투두리스트 프로젝트입니다.  
심플하고 직관적인 UI를 통해 편리하게 할 일을 관리할 수 있습니다.

## 🚀 주요 구현 기능

![image](https://github.com/user-attachments/assets/ccb56068-3ca3-4e7b-ace3-7fe53d5d7862)

- 투두 CRUD (추가, 수정, 삭제, 완료 체크)
- 낙관적 업데이트 적용
- 투두 필터링 기능 (전체, 남은 할 일, 완료한 일)
- 에러/로딩 UI 분기 처리
- 반응형 UI

## 📌 주요 기술 스택

- **Next.js (App Router)**
- **TypeScript**
- **Tanstack Query**
- **TailwindCSS**
- **json-server**

## 📂 프로젝트 구조

```bash
src/
├── apis/            // API 통신 관련 함수 폴더
├── app/
│   ├── layout.tsx
│   └── page.tsx     // 메인 페이지
├── components/      // UI 컴포넌트 폴더
├── hooks/           // 커스텀 훅 폴더
├── providers/       // Tanstack Query, Toastify provider 관리 폴더
├── types/           // 타입 정의 폴더
└── utils/           // 유틸 함수 폴더
```
