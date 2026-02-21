import { apiFetch } from "@/lib/api/fetcher";
import { HomeRecommendResponse } from "@/types/home";

export async function fetchHomeRecommend(): Promise<HomeRecommendResponse> {
  const res = await apiFetch<{
    data: HomeRecommendResponse;
  }>("/api/home/recommend", {
    method: "GET",
  });

  return res.data;
}
