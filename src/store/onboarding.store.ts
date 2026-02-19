import { create } from "zustand";

type BitValue = 0 | 1;

interface OnboardingState {
  // test 단계
  answers: BitValue[];
  testResultCode: string | null;
  readerType: string | null;

  // nickname 단계
  nickname: string;

  // 로그인 단계에서 받아올 값
  email: string | null;

  // actions
  setAnswers: (answers: BitValue[]) => void;
  setTestResult: (testResultCode: string, readerType: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;

  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  answers: [],
  testResultCode: null,
  readerType: null,
  nickname: "",
  email: null,

  setAnswers: (answers) => set({ answers }),

  setTestResult: (testResultCode, readerType) =>
    set({
      testResultCode,
      readerType,
    }),

  setNickname: (nickname) => set({ nickname }),

  setEmail: (email) => set({ email }),

  reset: () =>
    set({
      answers: [],
      testResultCode: null,
      readerType: null,
      nickname: "",
      email: null,
    }),
}));
