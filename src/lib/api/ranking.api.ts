import { RankingResponse, MyRankingResponse } from "@/types/ranking";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function fetchTopRanking(): Promise<RankingResponse> {
  const res = await fetch(`${BASE_URL}/api/reviews/ranking`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("Ranking API Error");

  return res.json();
}

export async function fetchMyRanking(): Promise<MyRankingResponse> {
  const res = await fetch(`${BASE_URL}/api/reviews/rankig/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("My Ranking API Error");

  return res.json();
}
