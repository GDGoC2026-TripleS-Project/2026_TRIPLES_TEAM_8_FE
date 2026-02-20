import { CreateReviewRequest, CreateReviewResponse } from "@/types/review";
import { BookReview } from "@/types/book";

export async function createReview(
  bookId: number,
  body: CreateReviewRequest,
): Promise<CreateReviewResponse> {
  const res = await fetch(`/api/books/${bookId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}` ← 추후 연결
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Review API Error");
  }

  return res.json();
}

export async function fetchLatestReviews(): Promise<BookReview[]> {
  const res = await fetch("/api/books/1/reviews/ranking/latest");

  if (!res.ok) {
    throw new Error("Latest Review API Error");
  }

  const json = await res.json();
  return json.data;
}
