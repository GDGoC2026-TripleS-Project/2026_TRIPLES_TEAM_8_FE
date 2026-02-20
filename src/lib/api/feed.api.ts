import { apiFetch } from "./fetcher";
import { FeedBook } from "@/types/feed";

export async function fetchFeed(): Promise<{
  majorCode: number[];
  books: FeedBook[];
}> {
  const res = await apiFetch<{
    data: {
      majorCode: number[];
      books: FeedBook[];
    };
  }>("/api/feed", { method: "GET" });

  return res.data;
}

export async function fetchExploreFeed(category: string): Promise<FeedBook[]> {
  const res = await apiFetch<{ data: FeedBook[] }>(
    `/api/feed/explore?category=${category}`,
    { method: "GET" },
  );

  return res.data;
}
