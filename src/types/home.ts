export interface HomeReview {
  bookId: number;
  reviewId: number;
  category: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  bookTitle: string;

  // 🔥 UI용 확장 필드 (백엔드에 아직 없더라도 mock에서 사용)
  reviewColor?: "GRAY" | "PINK" | "YELLOW" | "BLUE" | "PURPLE";
  profileImage?: string;
}

export interface HomeRecommendResponse {
  nickname: string;
  readerType: string | null;
  reviews: HomeReview[];
}
