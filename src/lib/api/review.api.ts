// lib/api/review.api.ts

import { apiFetch } from "@/lib/api/fetcher";
import {
  CreateReviewRequest,
  CreateReviewResponse,
  ReviewData,
} from "@/types/review";

export async function createReview(
  bookId: number,
  body: CreateReviewRequest,
): Promise<CreateReviewResponse> {
  return apiFetch<CreateReviewResponse>(`/api/books/${bookId}/reviews`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function fetchLatestReviews(): Promise<ReviewData[]> {
  const res = await apiFetch<{
    status: number;
    success: boolean;
    code: string;
    message: string;
    data: ReviewData[];
  }>("/api/books/reviews/ranking/latest");

  return res.data;
}
