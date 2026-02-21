import { apiFetch } from "./fetcher";
import {
  RankingResponse,
  MyRankingResponse,
  RankingUser,
} from "@/types/ranking";

// TOP 5 랭킹 조회
export async function fetchTopRanking(): Promise<RankingUser[]> {
  const res = await apiFetch<RankingResponse>("/api/reviews/ranking");

  return res.data;
}

// 내 랭킹 조회
export async function fetchMyRanking(): Promise<RankingUser> {
  const res = await apiFetch<MyRankingResponse>("/api/reviews/ranking/me");

  return res.data;
}
