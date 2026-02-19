"use client";

import Image from "next/image";
import { BookReview } from "@/types/book";
import { getHoursAgo } from "@/lib/utils/time";

interface Props {
  review: BookReview;
  align: "left" | "right";
}

export default function ReviewCard({ review, align }: Props) {
  const colorMap = {
    pink: "var(--color-card-pink)",
    yellow: "var(--color-card-yellow)",
    blue: "var(--color-card-blue)",
    purple: "var(--color-card-purple)",
  };

  return (
    <div
      className={`w-[250px] h-[280px] rounded-2xl p-6 mb-10 flex flex-col justify-between ${
        align === "left" ? "mr-auto" : "ml-auto"
      }`}
      style={{
        background: colorMap[review.cardColor],
      }}
    >
      <p className="text-h2_m leading-relaxed">{review.content}</p>

      <div className="flex items-center gap-3">
        <Image
          src={review.authorProfileImage}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="text-h3_m text-primary-dark">
            {review.authorNickname}
          </span>
          <span className="text-body_m text-gray-text2">
            {getHoursAgo(review.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
