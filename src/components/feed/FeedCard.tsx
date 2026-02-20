"use client";

import { FeedBook } from "@/types/feed";
import { KEYWORD_COLOR_MAP } from "@/lib/utils/keywordColorMap";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  book: FeedBook;
}

export default function FeedCard({ book }: Props) {
  const router = useRouter();

  const cleanKeyword1 = book.keyword1.replace("#", "");
  const cleanKeyword2 = book.keyword2.replace("#", "");

  const color1 = KEYWORD_COLOR_MAP[cleanKeyword1] ?? "var(--kw-light)";
  const color2 = KEYWORD_COLOR_MAP[cleanKeyword2] ?? color1;

  return (
    <div
      onClick={() => router.push(`/books/${book.bookId}`)}
      className="flex gap-4 py-6 border-b border-stroke cursor-pointer"
    >
      {/* 썸네일 */}
      <div
        className="w-[90px] h-[120px] rounded-md"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
        }}
      />

      {/* 정보 */}
      <div className="flex-1">
        <h3 className="text-primary-dark text-h2_m">{book.title}</h3>

        <p className="text-gray-text2 text-h3_m mt-2">
          {book.author} · {book.publisher}
        </p>

        <div className="flex items-center gap-1 text-primary-dark text-h3_m mt-4">
          <Image
            src="/common/icon-comment.svg"
            alt="comment"
            width={14}
            height={14}
          />
          이 책의 리뷰 ({book.reviewCount})
        </div>

        <div className="flex gap-2 mt-4">
          <span className="h-[24px] px-3 py-1 text-body_m rounded-full border border-stroke">
            {book.keyword1}
          </span>
          <span className="h-[24px] px-3 py-1 text-body_m rounded-full border border-stroke">
            {book.keyword2}
          </span>
        </div>
      </div>
    </div>
  );
}
