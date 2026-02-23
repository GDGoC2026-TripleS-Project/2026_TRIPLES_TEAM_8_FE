import { apiFetch } from "./fetcher";
import { OnboardingRequest, OnboardingResponse } from "@/types/onboarding";

export interface MeResponse {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: {
    id: number;
    email: string;
    nickname: string;
    readerType: string | null;
    reviewCount: number;
  };
}

export function postOnboarding(body: OnboardingRequest) {
  return apiFetch<OnboardingResponse>("/api/user/onboarding", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export const getMe = () => {
  return apiFetch<MeResponse>("/api/users/me", {
    method: "GET",
  });
};

export async function logout() {
  return apiFetch("/api/login/logout", {
    method: "POST",
  });
}

export async function deleteAccount() {
  return apiFetch("/api/login/withdraw", {
    method: "DELETE",
  });
}
