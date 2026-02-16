export type ReviewColor = "GRAY" | "PINK" | "YELLOW" | "BLUE" | "PURPLE";

export interface CreateReviewRequest {
  reviewColor: ReviewColor;
  reviewContent: string;
}

export interface CreateReviewResponse {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: {
    bookId: number;
    reviewId: number;
    reviewColor: ReviewColor;
    reviewContent: string;
    createdAt: string;
    nickname: string;
    profileId: number;
  };
}
