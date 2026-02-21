"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import BackHeader from "@/components/common/BackHeader";
import Button from "@/components/common/Button";
import ReviewCompleteModal from "@/components/review/ReviewCompleteModal";

import { createReview } from "@/lib/api/review.api";
import { fetchBookDetail } from "@/lib/api/book.api";

import { ReviewColor } from "@/types/review";
import { BookDetail } from "@/types/book";

const COLOR_OPTIONS: {
  label: string;
  value: ReviewColor;
  bg: string;
}[] = [
  { label: "gray", value: "GRAY", bg: "bg-gray-bg" },
  { label: "pink", value: "PINK", bg: "bg-card-pink" },
  { label: "yellow", value: "YELLOW", bg: "bg-card-yellow" },
  { label: "blue", value: "BLUE", bg: "bg-card-blue" },
  { label: "purple", value: "PURPLE", bg: "bg-card-purple" },
];

export default function ReviewWritePage() {
  const { bookId } = useParams<{ bookId: string }>();
  const router = useRouter();

  const [book, setBook] = useState<BookDetail | null>(null);

  const [selectedColor, setSelectedColor] = useState<ReviewColor>("PINK");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const isValid = content.length >= 10 && content.length <= 100;

  /* 책 정보 로딩 */
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBookDetail(Number(bookId));
        setBook(data);
      } catch (e) {
        console.error("Book Load Error", e);
      }
    }
    load();
  }, [bookId]);

  /* 리뷰 등록 */
  const handleSubmit = async () => {
    if (!isValid || loading) {
      setError(true);
      return;
    }

    try {
      setLoading(true);

      const res = await createReview(Number(bookId), {
        reviewColor: selectedColor,
        reviewContent: content,
      });

      if (res.success) {
        setShowComplete(true);
      }
    } catch (e) {
      console.error("Review Create Error", e);
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <>
      <BackHeader title={book.title} />
      <div className="px-6 pt-[70px] pb-[100px]">
        {/* 색상 선택 */}
        <div className="mt-4">
          <p className="text-h2_m mb-6">기록 메모지의 색상을 선택해주세요.</p>

          <div className="flex gap-4">
            {COLOR_OPTIONS.map((c) => (
              <div
                key={c.value}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => setSelectedColor(c.value)}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${c.bg}
                  ${
                    selectedColor === c.value
                      ? "border-2 border-primary-dark"
                      : ""
                  }`}
                />
                <span className="text-h3_m">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 텍스트 입력 */}
        <div className="mt-14">
          <p className="text-h2_m mb-4">이 문학이 남긴 색을 적어보세요</p>

          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError(false);
            }}
            className={`w-full h-[160px] rounded-xl p-4 text-h3_m resize-none outline-none border
              ${error && !isValid ? "border-system-error" : "border-stroke"}`}
            placeholder="간단한 한 문장도 좋아요."
            maxLength={100}
          />

          <div className="flex justify-between mt-1 text-body_m text-gray-text1">
            <span>10자 이상</span>
            <span>{content.length}/100</span>
          </div>

          {error && !isValid && (
            <p className="text-system-error text-body_m mt-2">
              ⚠ 10자 이상 입력해주세요
            </p>
          )}
        </div>
        {/* 유의사항 */}
        <div className="mt-8 bg-gray-bg rounded-xl p-4 text-gray-text2 space-y-3">
          <p className="text-body_sb">기록 작성 시 유의사항</p>
          <ul className="list-disc list-inside space-y-1 text-body_m">
            <li>줄거리 요약보다, 읽은 뒤 느낌을 적어주세요.</li>
            <li>스포일러는 가급적 피해주세요.</li>
            <li>다른 독자의 취향을 존중해주세요.</li>
          </ul>
          <p className="text-body_sb">
            아래와 같은 경우, 신고 또는 숨김 처리될 수 있어요.
          </p>
          <ul className="list-disc list-inside space-y-1 text-body_m">
            <li>책 내용과 무관하거나 서비스 취지와 맞지 않는 내용</li>
            <li>타인을 불쾌하게 하는 표현</li>
            <li>광고 또는 반복적인 홍보</li>
          </ul>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="fixed bottom-6 left-0 w-full px-6">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full"
        >
          {loading ? "등록 중..." : "리뷰 등록"}
        </Button>
      </div>
      <ReviewCompleteModal
        open={showComplete}
        onClose={() => {
          setShowComplete(false);
          router.push("/feed");
        }}
      />
    </>
  );
}
