import { apiFetch } from "./fetcher";
import { MeResponse, MyReviewResponse } from "@/types/user";

export async function fetchMe() {
  return apiFetch<MeResponse>("/api/users/me");
}

export async function updateNickname(nickname: string) {
  return apiFetch<MeResponse>("/api/users/me", {
    method: "PUT",
    body: JSON.stringify({ nickname }),
  });
}

export async function deleteAccount() {
  return apiFetch("/api/users/me", {
    method: "DELETE",
  });
}

export async function fetchMyReviews() {
  const res = await apiFetch<MyReviewResponse>("/api/users/me/reviews");
  return res.data;
}
