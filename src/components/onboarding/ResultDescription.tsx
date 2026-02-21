import Image from "next/image";

interface Props {
  lines: string[];
}

// 설명 라인 + 줄 이미지
export default function ResultDescription({ lines }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {lines.map((line, index) => (
        <div key={index} className="flex flex-col items-center">
          <p className="text-primary-dark text-h3_m text-center">{line}</p>

          {/* 마지막 줄 제외하고 라인 이미지 */}
          <Image
            src="/onboarding/img-line.svg"
            alt="line"
            width={300}
            height={8}
            className="mt-1"
          />
        </div>
      ))}
    </div>
  );
}
