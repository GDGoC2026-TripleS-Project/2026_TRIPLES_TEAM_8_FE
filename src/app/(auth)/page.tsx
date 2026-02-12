"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { mockGoogleLoginResponse } from "@/lib/mock/auth.mock";

export default function AuthEntryPage() {
  const router = useRouter();

  const handleGuestStart = () => {
    router.push("/home");
  };

  const handleGoogleLogin = async () => {
    // 현재는 mock 처리
    console.log(mockGoogleLoginResponse);

    router.push("/onboarding");
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
