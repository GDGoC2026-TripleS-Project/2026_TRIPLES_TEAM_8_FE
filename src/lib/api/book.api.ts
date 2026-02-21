import { apiFetch } from "@/lib/api/fetcher";
import { BookDetail, BookReview } from "@/types/book";

export async function fetchBookDetail(id: number): Promise<BookDetail> {
  const res = await apiFetch<{ data: BookDetail }>(`/api/books/${id}`, {
    method: "GET",
  });

  return res.data;
}

export async function fetchBookReviews(id: number): Promise<BookReview[]> {
  const res = await apiFetch<{ data: BookReview[] }>(
    `/api/books/${id}/reviews`,
    { method: "GET" },
  );

  return res.data;
}
