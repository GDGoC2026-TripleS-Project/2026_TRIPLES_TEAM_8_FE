"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/common/Button";
import ResultDescription from "@/components/onboarding/ResultDescription";
import { useOnboardingStore } from "@/store/onboarding.store";

const CATEGORY_MAP: Record<string, string> = {
  "811": "창작",
  "812": "창작",
  "813": "창작",
  "814": "에세이",
  "816": "에세이",
  "815": "저널리즘",
  "818": "저널리즘",
  "817": "유머",
};

export default function OnboardingResultPage() {
  const router = useRouter();
  const { resultData } = useOnboardingStore();

  if (!resultData) return null;

  const { readerType, readerTitle, descriptionLines, recommendedCategoryCode } =
    resultData;

  const imageFileName = readerType.toLowerCase().replace("_", "-");

  const categoryName = CATEGORY_MAP[recommendedCategoryCode] ?? "기타";

  return (
    <div className="flex flex-col bg-white px-6 pt-16 pb-20 items-center">
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

        <h2 className="text-primary-dark text-h1_m">{readerTitle}</h2>

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
            추천 카테고리 : {categoryName}
          </span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="w-full mt-10 mb-6">
        <Button onClick={() => router.push("/home")} className="w-full">
          그리드 시작
        </Button>
      </div>
    </div>
  );
}
