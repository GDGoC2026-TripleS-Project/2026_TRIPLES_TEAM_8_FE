"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import TopNavBar from "@/components/layout/TopNavBar";
import ReviewCard from "@/components/book/ReviewCard";
import Button from "@/components/common/Button";

import { fetchHomeRecommend } from "@/lib/api/home.api";
import { fetchLatestReviews } from "@/lib/api/review.api";

import { mockHomeRecommend, mockLatestReviews } from "@/lib/mock/home.mock";

import { BaseReview } from "@/types/review";

// 홈
export default function HomePage() {
  const [nickname, setNickname] = useState<string>("방문자");
  const [readerType, setReaderType] = useState<string | null>(null);
  const [reviews, setReviews] = useState<BaseReview[]>([]);
  const [buttonActive, setButtonActive] = useState(false);

  // 데이터 로드 (accessToken 존재 여부로 로그인 판별)
  useEffect(() => {
    async function load() {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      try {
        if (token) {
          // 로그인 사용자 → 추천 API
          const data = await fetchHomeRecommend();

          setNickname(data.nickname);
          setReaderType(data.readerType);
          setReviews(data.reviews);
        } else {
          // 비회원 → 최근 리뷰 API
          const data = await fetchLatestReviews();
          setReviews(data);
        }
      } catch {
        // API 실패 시 mock fallback
        if (token) {
          setNickname(mockHomeRecommend.nickname);
          setReaderType(mockHomeRecommend.readerType);
          setReviews(mockHomeRecommend.reviews);
        } else {
          setReviews(mockLatestReviews);
        }
      }
    }

    load();
  }, []);

  // 새로운 추천 기록 버튼
  const handleRefresh = () => {
    setButtonActive(true);

    setTimeout(() => {
      setButtonActive(false);
    }, 1000);
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

                <h2 className="text-primary-dark text-h1_m">
                  {readerType ? `${readerType}` : "당신은 어떤 독자일까요?"}
                </h2>

                <Image
                  src="/onboarding/quotes-back.svg"
                  alt="quote-back"
                  width={24}
                  height={24}
                />
              </div>

              <p className="text-h3_m text-gray-text2 leading-relaxed">
                오늘의 기분에 가까운 문학을 <br />
                G.read에서 골라보세요
              </p>

              {!isLoggedIn && (
                <div className="mt-4">
                  <Button className="w-[200px] bg-gray-bg text-primary-dark">
                    G.read 회원가입
                  </Button>
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
              ? `${nickname} 님, 오늘의 기록 추천이에요!`
              : "사랑에 빠진 토끼 님, 오늘의 기록 추천이에요!"}
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
        <div className=" px-6">
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
      </div>
    </div>
  );
}
