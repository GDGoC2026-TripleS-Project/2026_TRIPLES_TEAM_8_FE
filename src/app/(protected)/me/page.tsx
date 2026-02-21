"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { fetchMe, fetchMyReviews } from "@/lib/api/user.api";
import { READER_PROFILE_MAP } from "@/lib/utils/readerProfileMap";
import { BookReview } from "@/types/book";

import TopNavBar from "@/components/layout/TopNavBar";
import ReviewCardDelete from "@/components/me/ReviewCardDelete";

export default function MyPage() {
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    nickname: string;
    readerType: string;
    readerTitle: string;
    reviewCount: number;
  }>(null);

  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;

    async function load() {
      const me = await fetchMe();
      setUser(me.data);

      const myReviews = await fetchMyReviews();
      setReviews(myReviews);
    }

    load();
  }, [token]);

  if (!token) {
    return (
      <div>
        <TopNavBar />

        <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center">
          <Image src="/logo-circle.svg" alt="logo" width={120} height={120} />
          <p className="mt-8 text-h2_sb">
            그리드 가입 후 나만의 기록을 자유롭게 남겨봐요!
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-12 w-full bg-primary-dark text-white py-4 rounded-xl"
          >
            Google로 시작하기
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <TopNavBar />
      <div className="px-6 pb-20">
        <div className="flex flex-col items-center mt-10">
          <Image
            src={READER_PROFILE_MAP[user.readerType]}
            alt="profile"
            width={80}
            height={80}
          />

          <h2 className="mt-6 text-h2_sb text-primary-dark">{user.nickname}</h2>
          <p className="text-body_m text-gray-text1 mt-3">
            {user.readerTitle} · 작성한 문학 기록 {user.reviewCount}
          </p>

          <button
            onClick={() => router.push("/me/edit")}
            className="underline mt-4 text-body_m"
          >
            내 정보 수정
          </button>
        </div>

        <div className="mt-4 mb-8">
          <h3 className="bg-gray-bg py-3 px-2  rounded-xl text-h2_sb text-primary-dark mt-10 mb-2">
            ✍ 나의 문학 기록
          </h3>
        </div>

        <div className="mt-6 space-y-6">
          {reviews.map((r, index) => (
            <div key={r.reviewId} className="relative">
              <ReviewCardDelete
                review={r}
                align={index % 2 === 0 ? "left" : "right"}
                onDeleted={(id) =>
                  setReviews((prev) =>
                    prev.filter((item) => item.reviewId !== id),
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
