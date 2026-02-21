export interface BookDetail {
  id: number;
  title: string;
  author: string;
  publisher: string;
  majorName: string;
  keyword1: string;
  keyword2: string;
  reviewCount: number;
}

export interface BookReview {
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

export interface BookReviewResponse {
  reviews: BookReview[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
