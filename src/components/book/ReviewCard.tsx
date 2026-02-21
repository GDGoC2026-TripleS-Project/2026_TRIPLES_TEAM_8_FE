"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HomeReview } from "@/types/home";

interface Props {
  review: HomeReview;
  align?: "left" | "right";
}

export default function ReviewCard({ review, align }: Props) {
  const router = useRouter();

  const colorMap: Record<string, string> = {
    GRAY: "bg-gray-bg",
    PINK: "bg-card-pink",
    YELLOW: "bg-card-yellow",
    BLUE: "bg-card-blue",
    PURPLE: "bg-card-purple",
  };

  const bgColor =
    review.reviewColor && colorMap[review.reviewColor]
      ? colorMap[review.reviewColor]
      : "bg-gray-bg";

  const handleClick = () => {
    router.push(`/books/${review.bookId}`);
  };

  const getTimeAgoText = () => {
    if (!review.createdTimeAgo) return "";

    if (review.createdTimeAgo < 1) return "방금 전";
    if (review.createdTimeAgo < 24) return `${review.createdTimeAgo}시간 전`;

    const days = Math.floor(review.createdTimeAgo / 24);
    return `${days}일 전`;
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-[250px] min-h-[280px]
        rounded-2xl p-6 mb-10
        flex flex-col justify-between
        cursor-pointer transition-transform hover:scale-105
        ${bgColor}
        ${align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : ""}
      `}
    >
      {/* 리뷰 내용 */}
      <p className="text-h2_m leading-relaxed whitespace-pre-line">
        {review.reviewContent}
      </p>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 mt-6">
        <Image
          src={`/api/profile/image/${review.profileId}`}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <div className="flex flex-col gap-1">
          <span className="text-h3_sb text-primary-dark">
            {review.nickname}
          </span>

          <span className="text-body_m text-gray-text2">
            {getTimeAgoText()}
          </span>
        </div>
      </div>
    </div>
  );
}
