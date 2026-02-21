import { apiFetch } from "./fetcher";
import { BookReview } from "@/types/book";
import { CreateReviewRequest, CreateReviewResponse } from "@/types/review";

// 리뷰 생성
export async function createReview(
  bookId: number,
  body: CreateReviewRequest,
): Promise<CreateReviewResponse> {
  return apiFetch<CreateReviewResponse>(`/api/books/${bookId}/reviews`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// 최신 리뷰 조회 (홈 화면)
export async function fetchLatestReviews(): Promise<BookReview[]> {
  const res = await apiFetch<{
    status: number;
    success: boolean;
    code: string;
    message: string;
    data: BookReview[];
  }>("/api/reviews/ranking/latest");

  return res.data;
}

// 리뷰 삭제 (마이페이지)
export async function deleteReview(reviewId: number) {
  return apiFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
}
