"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BaseReview } from "@/types/review";

interface Props {
  review: BaseReview;
  align?: "left" | "right";
}

export default function ReviewCard({ review, align }: Props) {
  const router = useRouter();

  const colorMap = {
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
        {review.content}
      </p>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 mt-6">
        <Image
          src={review.profileImage || "/common/default-profile.png"}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="flex flex-col gap-1">
          <span className="text-h3_sb text-primary-dark">
            {review.authorNickname}
          </span>
          <span className="text-body_m text-gray-text2">
            {/* · {getHoursAgo(review.createdAt)} */}
          </span>
        </div>
      </div>
    </div>
  );
}
