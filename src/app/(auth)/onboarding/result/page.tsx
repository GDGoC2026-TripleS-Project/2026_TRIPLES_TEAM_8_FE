"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/common/Button";
import ResultDescription from "@/components/onboarding/ResultDescription";
import {
  mockOnboardingResult,
  OnboardingResult,
} from "@/lib/mock/onboardingResult.mock";

// 카테고리 코드 → 한글 매핑
const CATEGORY_MAP: Record<number, string> = {
  1: "시",
  2: "소설",
  3: "창작",
};

export default function OnboardingResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<OnboardingResult | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // API 연동 시, readerType, testResultCode를 query 또는 body로 전달 예정
        const res = await fetch("/api/login/onboarding");

        if (!res.ok) {
          throw new Error("API Error");
        }

        const data = await res.json();

        setResult(data.data);
      } catch (error) {
        console.error("결과 API 실패 → mock fallback", error);

        // 실패 시, fallback
        setResult(mockOnboardingResult);
      }
    };

    fetchResult();
  }, []);

  if (!result) return null;

  const { readerType, readerTitle, descriptionLines, recommendedCategoryCode } =
    result;

  const imageFileName = readerType.toLowerCase().replace("_", "-");

  return (
    <div className="h-screen flex flex-col bg-white px-6 pt-20 pb-10 items-center">
      {/* 유형 이미지 */}
      <Image
        src={`/onboarding/${imageFileName}.svg`}
        alt={readerType}
        width={300}
        height={300}
        priority
      />

      {/* 제목 영역 */}
      <div className="flex items-center gap-2 mt-8 mb-4">
        <Image
          src="/onboarding/quotes-front.svg"
          alt="quote-front"
          width={30}
          height={30}
        />

        <h2 className="text-primary-dark text-h1_m">{readerTitle} 독자</h2>

        <Image
          src="/onboarding/quotes-back.svg"
          alt="quote-back"
          width={30}
          height={30}
        />
      </div>

      {/* 설명 */}
      <ResultDescription lines={descriptionLines} />

      {/* 추천 카테고리 */}
      <div className="mt-8 flex justify-center">
        <div className="w-[200px] h-[40px] bg-primary-sand rounded-xl px-4 flex items-center justify-center gap-2">
          <span>📚</span>
          <span className="text-primary-dark text-h3_m">
            추천 카테고리 : {CATEGORY_MAP[recommendedCategoryCode]}
          </span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-auto w-full">
        <Button
          onClick={() => router.push("/onboarding/nickname")}
          className="w-full"
        >
          닉네임 설정
        </Button>
      </div>
    </div>
  );
}
