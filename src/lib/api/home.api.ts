import { HomeRecommendResponse } from "@/types/home";

export async function fetchHomeRecommend(): Promise<HomeRecommendResponse> {
  const res = await fetch("/api/home/recommend");

  if (!res.ok) {
    throw new Error("Home Recommend API Error");
  }

  const json = await res.json();
  return json.data;
}
