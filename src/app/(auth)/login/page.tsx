"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";
import { getMe } from "@/lib/api/auth.api";

export default function LoginCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setToken = useAuthStore((s) => s.setToken);
  const setEmail = useOnboardingStore((s) => s.setEmail);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) return;

    localStorage.setItem("accessToken", token);
    setToken(token);

    const fetchMe = async () => {
      try {
        const res = await getMe();

        if (res.success) {
          setEmail(res.data.email);
        }

        router.replace("/onboarding/nickname");
      } catch (error) {
        console.error("유저 정보 조회 실패", error);
      }
    };

    fetchMe();
  }, [searchParams, router, setToken, setEmail]);

  return <div>로그인 처리중...</div>;
}
