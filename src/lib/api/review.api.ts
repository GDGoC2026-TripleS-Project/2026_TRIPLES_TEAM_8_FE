import { CreateReviewRequest, CreateReviewResponse } from "@/types/review";

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
