"use client";

import Image from "next/image";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose?: () => void;
}

export default function ReviewCompleteModal({ open, onClose }: Props) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col justify-between">
      {/* 중앙 컨텐츠 */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <Image
          src="/common/img-complete.svg"
          alt="complete"
          width={350}
          height={200}
          className="mb-10"
        />

        <h2 className="text-h1_sb text-primary-dark mb-4">기록 작성 완료</h2>

        <p className="text-h3_m text-gray-text2 leading-relaxed">
          이 문학이 당신의 색으로 남았어요
          <br />
          그리드에서 다양한 색의 문학을 더 만나보세요!
        </p>
      </div>

      {/* 하단 버튼 */}
      <div className="px-6 pb-10">
        <Button
          className="w-full"
          onClick={() => {
            router.push("/feed");
            onClose?.();
          }}
        >
          도서 찾기 피드
        </Button>
      </div>
    </div>
  );
}
