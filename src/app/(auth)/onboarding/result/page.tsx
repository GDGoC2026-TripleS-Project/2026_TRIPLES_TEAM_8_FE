"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/common/Button";
import ResultDescription from "@/components/onboarding/ResultDescription";
import { useOnboardingStore } from "@/store/onboarding.store";

const CATEGORY_MAP: Record<number, string> = {
  1: "시",
  2: "소설",
  3: "창작",
};

export default function OnboardingResultPage() {
  const router = useRouter();
  const { resultData, reset } = useOnboardingStore();

  if (!resultData) return null;

  const { readerType, readerTitle, descriptionLines, recommendedCategoryCode } =
    resultData;

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
        <Button onClick={() => router.push("/home")} className="w-full">
          그리드 시작
        </Button>
      </div>
    </div>
  );
}
