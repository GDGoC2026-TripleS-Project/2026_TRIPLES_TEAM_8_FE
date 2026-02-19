"use client";

export const dynamic = "force-dynamic";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StepIndicator from "@/components/common/StepIndicator";
import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import Button from "@/components/common/Button";
import { apiFetch } from "@/lib/api/fetcher";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { setToken } = useAuthStore();
  const { setEmail } = useOnboardingStore();

  const TOTAL = 3;

  // 로그인 callback 처리
  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    const fetchToken = async () => {
      try {
        const res = await apiFetch<{
          success: boolean;
          data: {
            accessToken: string;
            refreshToken: string;
            email: string;
          };
        }>("/api/login/callback", {
          method: "POST",
          body: JSON.stringify({ code }),
        });

        if (!res.success) return;

        const { accessToken, email } = res.data;

        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
        setEmail(email);
      } catch (error) {
        console.error("로그인 콜백 실패", error);
      }
    };

    fetchToken();
  }, [searchParams, setToken, setEmail]);

  // 슬라이드 로직
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* 상단 인디케이터 */}
      <div className="pt-20 pb-14 flex justify-center">
        <StepIndicator current={currentIndex} total={TOTAL} />
      </div>

      {/* 슬라이드 영역 */}
      <div
        ref={containerRef}
        className="flex flex-1 overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        <OnboardingSlide
          title="문학을 고르는 새로운 방식"
          description="읽고 싶은 순간을 위한 북 큐레이션 서비스"
          image="/onboarding/img-cards01.svg"
          imageWidth={400}
          imageHeight={400}
          priority
        />

        <OnboardingSlide
          title="취향은 보이지 않지만"
          description="그리드는 당신의 독서 결을 색으로 나타내요"
          image="/onboarding/img-cards02.svg"
          imageWidth={260}
          imageHeight={260}
        />

        <OnboardingSlide
          title="당신의 문학을 찾아보세요!"
          description="그리드가 당신의 취향을 분석해 책을 추천해드려요"
          image="/common/logo.svg"
          imageWidth={160}
          imageHeight={160}
        />
      </div>

      {/* 하단 버튼 */}
      {currentIndex === TOTAL - 1 && (
        <div className="pb-10 px-6">
          <Button
            onClick={() => router.push("/onboarding/nickname")}
            className="w-full"
          >
            닉네임 설정
          </Button>
        </div>
      )}
    </div>
  );
}
