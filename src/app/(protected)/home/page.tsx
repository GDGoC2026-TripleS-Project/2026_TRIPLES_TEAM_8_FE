"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import TopNavBar from "@/components/layout/TopNavBar";
import ReviewCard from "@/components/book/ReviewCard";
import Button from "@/components/common/Button";

import { fetchHomeRecommend } from "@/lib/api/home.api";
import { fetchLatestReviews } from "@/lib/api/review.api";

import { BookReview } from "@/types/book";

export default function HomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("예비 그리더");
  const [readerType, setReaderType] = useState<string | null>(null);
  const [readerTitle, setReaderTitle] = useState<string | null>(null);
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    async function load() {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      try {
        if (token) {
          const data = await fetchHomeRecommend();

          setNickname(data.nickname);
          setReaderType(data.readerType);
          setReaderTitle(data.readerTitle);
          setReviews(data.reviews);
        } else {
          const data = await fetchLatestReviews();
          setReviews(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  const handleRefresh = async () => {
    setButtonActive(true);

    try {
      const data = await fetchHomeRecommend();
      setReviews(data.reviews);
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setButtonActive(false);
    }, 800);
  };

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");

  return (
    <div>
      <TopNavBar />
      <div className="pb-[30px]">
        {/* 독자 유형 영역 */}
        <div className="px-6 py-8 bg-gray-bg border-b border-stroke">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <Image
                  src="/onboarding/quotes-front.svg"
                  alt="quote-front"
                  width={24}
                  height={24}
                />

                <h2 className="text-primary-dark text-h2_sb">
                  {readerTitle ? readerTitle : "당신의 독자 유형은?"}
                </h2>

                <Image
                  src="/onboarding/quotes-back.svg"
                  alt="quote-back"
                  width={24}
                  height={24}
                />
              </div>

              {/* 설명 문구 */}
              <p className="text-h3_m text-gray-text2 leading-relaxed">
                {isLoggedIn ? (
                  <>
                    오늘의 기분에 가까운 문학을 <br />
                    G.read에서 골라보세요
                  </>
                ) : (
                  "회원이 되면 나만의 기록을 추천받을 수 있어요!"
                )}
              </p>

              {/* 🔥 비로그인일 때만 회원가입 버튼 */}
              {!isLoggedIn && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push("/")}
                    className="
          flex items-center gap-2
          px-6 py-3
          bg-white
          rounded-full
          shadow-sm
          text-primary-dark text-h3_sb
        "
                  >
                    G.read 회원가입
                    <Image
                      src="/common/icon-login.svg"
                      alt="login"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              )}
            </div>

            <Image
              src="/home/img-reading.svg"
              alt="reading"
              width={140}
              height={140}
            />
          </div>
        </div>

        {/* 추천 문구 */}
        <div className="mt-10 px-6">
          <h3 className="text-h2_sb">
            {isLoggedIn
              ? `${nickname} 님, 오늘의 추천 기록이에요!`
              : "오늘의 추천 기록이에요!"}
          </h3>

          <p className="text-body_m text-gray-text2 mt-2">
            📚 기록 메모 클릭시 해당 책으로 이동해요
          </p>
        </div>

        {/* 리뷰 가로 스크롤 */}
        <div className="flex gap-4 overflow-x-auto mt-6 pb-4 px-6 scrollbar-hide">
          {reviews.map((review) => (
            <div key={review.reviewId} className="min-w-[260px]">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* 새로운 추천 기록 버튼 */}
        {isLoggedIn && (
          <div className="px-6">
            <Button
              onClick={handleRefresh}
              className={`w-full transition-colors duration-300 ${
                buttonActive ? "bg-primary-light" : ""
              }`}
              leftIcon={
                <Image
                  src="/common/icon-again.svg"
                  alt="again"
                  width={20}
                  height={20}
                />
              }
            >
              새로운 추천 기록
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
