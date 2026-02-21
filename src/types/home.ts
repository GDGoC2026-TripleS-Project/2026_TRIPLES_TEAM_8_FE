export interface HomeReview {
  reviewId: number;
  profileId: number;
  bookId: number;
  nickname: string;
  reviewColor: "GRAY" | "PINK" | "YELLOW" | "BLUE" | "PURPLE";
  reviewContent: string;
  createdAt: string;
  updatedAt: string;
  createdTimeAgo: number;
}

export interface HomeRecommendResponse {
  nickname: string;
  readerType: string | null;
  readerTitle: string;
  reviews: HomeReview[];
}
