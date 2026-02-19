"use client";

import Image from "next/image";
import Button from "@/components/common/Button";

export default function AuthEntryPage() {
  const handleGuestStart = () => {
    window.location.href = "/home";
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`;
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen px-6 py-16">
      <div className="flex flex-col items-center gap-6 mt-24">
        <Image src="/common/logo.svg" alt="logo" width={160} height={80} />

        <p className="text-primary-dark text-h3_m">
          당신이 고른 색의 책, 지금의 취향
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          onClick={handleGoogleLogin}
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

        <button
          onClick={handleGuestStart}
          className="underline text-primary-dark text-body_m"
        >
          비회원으로 시작하기
        </button>
      </div>
    </div>
  );
}
