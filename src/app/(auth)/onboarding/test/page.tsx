"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding.store";
import StepIndicator from "@/components/common/StepIndicator";
import ChoiceCard from "@/components/onboarding/ChoiceCard";
import { postOnboarding } from "@/lib/api/auth.api";
import { READER_TYPE_MAP, PREFERENCE_TAG_MAP } from "@/lib/utils/readerType";

type BitValue = 0 | 1;

interface Question {
  question: string;
  options: {
    label: string;
    bitValue: BitValue;
  }[];
}

export default function OnboardingTestPage() {
  const router = useRouter();

  const { nickname, setAnswers, setTestResult, setResultData } =
    useOnboardingStore();

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

  const handleSelect = (bitValue: BitValue) => {
    const updated = [...answers];
    updated[currentStep] = bitValue;
    setLocalAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) return;

    const testResultCode = answers.join("");
    const readerType = READER_TYPE_MAP[testResultCode];
    const preferenceTags = PREFERENCE_TAG_MAP[readerType];

    try {
      const res = await postOnboarding({
        nickname,
        readerType,
        preferenceTags,
      });

      if (!res.success) throw new Error("온보딩 실패");

      setAnswers(answers as BitValue[]);
      setTestResult(testResultCode, readerType);
      setResultData(res.data);

      router.push("/onboarding/result");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white px-6 pt-20 pb-10">
      <div className="flex justify-center mb-14">
        <StepIndicator current={currentStep} total={TOTAL} />
      </div>

      <h2 className="text-primary-dark text-h2_sb text-center mb-20">
        {questions[currentStep].question}
      </h2>

      <div className="flex flex-col gap-8 flex-1">
        {questions[currentStep].options.map((option, index) => (
          <ChoiceCard
            key={index}
            label={option.label}
            selected={answers[currentStep] === option.bitValue}
            onSelect={() => handleSelect(option.bitValue)}
          />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep((p) => p - 1)}
          disabled={currentStep === 0}
          className="w-[120px] h-[50px] rounded-xl bg-primary-sand text-primary-dark"
        >
          이전
        </button>

        {currentStep === TOTAL - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answers[currentStep] === null}
            className="w-[120px] h-[50px] rounded-xl bg-primary-dark text-white"
          >
            제출
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep((p) => p + 1)}
            disabled={answers[currentStep] === null}
            className="w-[120px] h-[50px] rounded-xl bg-primary-dark text-white"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
