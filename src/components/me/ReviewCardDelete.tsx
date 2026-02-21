"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReviewData } from "@/types/review";
import { deleteReview } from "@/lib/api/review.api";

import Image from "next/image";
import ConfirmModal from "@/components/common/ConfirmModal";

interface Props {
  review: ReviewData;
  align?: "left" | "right";
  onDeleted?: (reviewId: number) => void;
}

export default function ReviewCard({ review, align, onDeleted }: Props) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorMap: Record<string, string> = {
    GRAY: "bg-gray-bg",
    PINK: "bg-card-pink",
    YELLOW: "bg-card-yellow",
    BLUE: "bg-card-blue",
    PURPLE: "bg-card-purple",
  };

  const bgColor = colorMap[review.reviewColor] ?? "bg-gray-bg";

  const handleCardClick = () => {
    router.push(`/books/${review.bookId}`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteReview(review.reviewId);

      // 🔥 부모에게 삭제 알림
      onDeleted?.(review.reviewId);

      setShowDeleteModal(false);
    } catch (e) {
      console.error("Delete Error", e);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgoText = () => {
    if (review.createdTimeAgo === undefined || review.createdTimeAgo === null)
      return "";

    if (review.createdTimeAgo < 1) return "방금 전";
    if (review.createdTimeAgo < 24) return `${review.createdTimeAgo}시간 전`;

    const days = Math.floor(review.createdTimeAgo / 24);
    return `${days}일 전`;
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`
          relative
          w-[250px] min-h-[280px]
          rounded-2xl p-6 mb-10
          flex flex-col justify-between
          cursor-pointer transition-transform hover:scale-105
          ${bgColor}
          ${align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : ""}
        `}
      >
        <p className="text-h2_m leading-relaxed whitespace-pre-line">
          {review.reviewContent}
        </p>

        <div className="flex items-center gap-3 mt-6">
          <Image
            src="/common/icon-user-circle.svg"
            alt="user"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <span className="text-h3_sb text-primary-dark">
              {review.nickname}
            </span>

            <span className="text-body_m text-gray-text2">
              · {getTimeAgoText()}
            </span>
          </div>
        </div>

        {/* 삭제 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteModal(true);
          }}
          className="absolute bottom-9 right-6"
        >
          <Image
            src="/common/icon-trash.svg"
            alt="trash"
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* 삭제 모달 */}
      {showDeleteModal && (
        <ConfirmModal
          title="기록 삭제"
          description="이 문학 기록을 지울까요?"
          cancelText="취소"
          confirmText="삭제"
          loading={loading}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
