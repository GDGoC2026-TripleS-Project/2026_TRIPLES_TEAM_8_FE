export type ReviewColor = "GRAY" | "PINK" | "YELLOW" | "BLUE" | "PURPLE";

export interface CreateReviewRequest {
  reviewColor: ReviewColor;
  reviewContent: string;
}

export interface ReviewData {
  reviewId: number;
  profileId: number;
  bookId: number;
  nickname: string;
  reviewColor: ReviewColor;
  reviewContent: string;
  createdAt: string;
  updatedAt: string;
  createdTimeAgo: number;
}

export interface CreateReviewResponse {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: ReviewData;
}
