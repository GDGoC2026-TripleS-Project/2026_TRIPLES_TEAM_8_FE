"use client";

import Image from "next/image";

interface Props {
  readerType: string;
}

export default function ReaderTitle({ readerType }: Props) {
  return (
    <div className="flex items-center gap-2 mt-8 mb-4">
      <Image
        src="/onboarding/quotes-front.svg"
        alt="front"
        width={30}
        height={30}
      />

      <h2 className="text-primary-dark text-h1_m">{readerType} 독자</h2>

      <Image
        src="/onboarding/quotes-back.svg"
        alt="back"
        width={30}
        height={30}
      />
    </div>
  );
}
