"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { fetchMe, fetchMyReviews } from "@/lib/api/user.api";
import { READER_PROFILE_MAP } from "@/lib/utils/readerProfileMap";
import { BookReview } from "@/types/book";

import TopNavBar from "@/components/layout/TopNavBar";
import ReviewCardDelete from "@/components/me/ReviewCardDelete";
import Button from "@/components/common/Button";

export default function MyPage() {
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`;
  };

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
        {/* 전체 화면 영역 */}
        <div className="min-h-screen flex flex-col px-6 py-16 text-center">
          {/* 가운데 콘텐츠 */}
          <div className="flex-1 flex flex-col items-center mt-40">
            <Image
              src="/common/logo-circle.svg"
              alt="logo"
              width={100}
              height={100}
            />
            <p className="mt-8 text-h2_m text-primary">
              그리드 가입 후,
              <br />
              나만의 기록을 자유롭게 남겨봐요!
            </p>
            <p className="mt-2 text-h3_m text-primary-warm">
              기록이 머무는 당신만의 공간, G.read
            </p>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="pb-10">
            <Button
              onClick={handleGoogleLogin}
              className="w-full"
              leftIcon={
                <Image
                  src="/onboarding/icon-google.svg"
                  alt="google"
                  width={20}
                  height={20}
                />
              }
            >
              Google로 시작
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <TopNavBar />
      <div className="px-6 pb-20 pt-[80px]">
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
