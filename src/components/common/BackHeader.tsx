"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
}

export default function BackHeader({ title }: Props) {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 border-b border-stroke">
      <div className="relative h-[60px] flex items-center px-6">
        {/* 왼쪽 back 아이콘 */}
        <Image
          src="/common/icon-back.svg"
          alt="back"
          width={30}
          height={30}
          className="cursor-pointer absolute left-6"
          onClick={() => router.back()}
        />

        {/* 가운데 타이틀 */}
        <h1 className="w-full text-center text-h2_sb truncate">{title}</h1>
      </div>
    </div>
  );
}
