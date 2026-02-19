"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding.store";
import StepIndicator from "@/components/common/StepIndicator";
import ChoiceCard from "@/components/onboarding/ChoiceCard";

// bit 값 타입
type BitValue = 0 | 1;

// 질문 타입
interface Question {
  question: string;
  options: {
    label: string;
    bitValue: BitValue;
  }[];
}

// bit 조합
const READER_TYPE_MAP: Record<string, string> = {
  "000": "TYPE_A",
  "001": "TYPE_B",
  "010": "TYPE_C",
  "011": "TYPE_D",
  "100": "TYPE_E",
  "101": "TYPE_F",
  "110": "TYPE_G",
  "111": "TYPE_H",
};

export default function OnboardingTestPage() {
  const router = useRouter();

  const { setAnswers: setStoreAnswers, setTestResult } = useOnboardingStore();

  // 질문 데이터
  const questions: Question[] = [
    {
      question: "Q1. 문학에서 더 끌리는 쪽은?",
      options: [
        { label: "현실을 잠시 벗어나는 이야기", bitValue: 0 },
        { label: "지금 우리가 사는 세상의 이야기", bitValue: 1 },
      ],
    },
    {
      question: "Q2. 글을 읽을 때 더 오래 머무는 건?",
      options: [
        { label: "한 사람의 생각과 감정", bitValue: 0 },
        { label: "사람들 사이의 이야기", bitValue: 1 },
      ],
    },
    {
      question: "Q3. 좋은 글이라고 느끼는 순간은?",
      options: [
        { label: "조용히 읽다 여운이 남을 때", bitValue: 0 },
        { label: "누군가의 목소리가 들리는 듯할 때", bitValue: 1 },
      ],
    },
  ];

  const TOTAL = questions.length;

  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setLocalAnswers] = useState<(BitValue | null)[]>(
    Array(TOTAL).fill(null),
  );

  const currentAnswer = answers[currentStep];

  // 선택 처리
  const handleSelect = (bitValue: BitValue) => {
    const updated = [...answers];
    updated[currentStep] = bitValue;
    setLocalAnswers(updated);
  };

  // 다음
  const goNext = () => {
    if (currentStep < TOTAL - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 이전
  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 제출 (testResultCode, readerType 계산)
  const handleSubmit = () => {
    if (answers.includes(null)) return;

    const testResultCode = answers.join("");
    const readerType = READER_TYPE_MAP[testResultCode];

    setStoreAnswers(answers as BitValue[]);
    setTestResult(testResultCode, readerType);

    router.push("/onboarding/result");
  };

  return (
    <div className="h-screen flex flex-col bg-white px-6 pt-20 pb-10">
      {/* 상단 인디케이터 */}
      <div className="flex justify-center mb-14">
        <StepIndicator current={currentStep} total={TOTAL} />
      </div>

      {/* 질문 */}
      <h2 className="text-primary-dark text-h2_sb text-center mb-20">
        {questions[currentStep].question}
      </h2>

      {/* 선택지 */}
      <div className="flex flex-col gap-8 flex-1">
        {questions[currentStep].options.map((option, index) => (
          <ChoiceCard
            key={index}
            label={option.label}
            selected={currentAnswer === option.bitValue}
            onSelect={() => handleSelect(option.bitValue)}
          />
        ))}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-between mt-8">
        {/* 이전 버튼 */}
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="
  w-[120px] h-[50px] rounded-xl
  bg-primary-sand text-primary-dark
  disabled:bg-gray-bg disabled:text-gray-text2
  disabled:cursor-not-allowed
"
        >
          이전
        </button>

        {/* 마지막 단계면 제출 */}
        {currentStep === TOTAL - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={currentAnswer === null}
            className="
  w-[120px] h-[50px] rounded-xl
  bg-primary-dark text-white
  disabled:bg-gray-bg disabled:text-gray-text2
  disabled:cursor-not-allowed
"
          >
            제출
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={currentAnswer === null}
            className="
  w-[120px] h-[50px] rounded-xl
  bg-primary-dark text-white
  disabled:bg-gray-bg disabled:text-gray-text2
  disabled:cursor-not-allowed
"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
