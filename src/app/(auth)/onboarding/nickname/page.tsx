"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/common/Button";

export default function OnboardingNicknamePage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 닉네임 유효성 검사 (2-10자)
  const isValid = nickname.length >= 2 && nickname.length <= 10;

  const showError = nickname.length > 0 && !isValid;

  const handleNext = () => {
    if (!isValid) return;

    // TODO: POST /api/login/onboarding (readerType, testResultCode, email)
    router.push("/home");
  };

  return (
    <div className="h-screen flex flex-col bg-white px-6 pt-14 pb-10">
      {/* 상단 타이틀 */}
      <h1 className="text-primary-dark text-h1_m mb-6">
        G.read에서 사용할
        <br />
        닉네임을 입력해주세요
      </h1>

      {/* 입력 영역 */}
      <div className="relative">
        <input
          type="text"
          value={nickname}
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => setNickname(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-[50px] px-4 rounded-xl outline-none bg-gray-bg
            text-gray-text1 text-h2_m
            transition-colors
            ${
              showError
                ? "border border-system-error"
                : isFocused
                  ? "border border-gray-text1"
                  : "border none"
            }
          `}
        />

        {/* clear 버튼 */}
        {nickname.length > 0 && (
          <button
            type="button"
            onClick={() => setNickname("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Image
              src="/common/icon-x.svg"
              alt="clear"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {/* 에러 메시지 */}
      {showError && (
        <p className="text-system-error text-body_m mt-2">
          ⚠ 닉네임은 2~10자로 입력해주세요
        </p>
      )}

      {/* 하단 버튼 */}
      <div className="mt-auto">
        <Button onClick={handleNext} disabled={!isValid} className="w-full">
          다음
        </Button>
      </div>
    </div>
  );
}
