import { create } from "zustand";

type BitValue = 0 | 1;

interface ResultData {
  readerType: string;
  readerTitle: string;
  descriptionLines: string[];
  recommendedCategoryCode: number;
}

interface OnboardingState {
  answers: BitValue[];
  testResultCode: string | null;
  readerType: string | null;

  nickname: string;
  email: string | null;

  resultData: ResultData | null;

  setAnswers: (answers: BitValue[]) => void;
  setTestResult: (testResultCode: string, readerType: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setResultData: (data: ResultData) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  answers: [],
  testResultCode: null,
  readerType: null,
  nickname: "",
  email: null,
  resultData: null,

  setAnswers: (answers) => set({ answers }),

  setTestResult: (testResultCode, readerType) =>
    set({
      testResultCode,
      readerType,
    }),

  setNickname: (nickname) => set({ nickname }),

  setEmail: (email) => set({ email }),

  setResultData: (data) => set({ resultData: data }),

  reset: () =>
    set({
      answers: [],
      testResultCode: null,
      readerType: null,
      nickname: "",
      email: null,
      resultData: null,
    }),
}));
