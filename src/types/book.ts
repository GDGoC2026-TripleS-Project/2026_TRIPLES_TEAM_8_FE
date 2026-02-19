export interface BookDetail {
  id: number;
  title: string;
  author: string;
  publisher: string;
  keyword1: string;
  keyword2: string;
  reviewCount: number;
}

export type ReviewCardColor = "pink" | "yellow" | "blue" | "purple";

export interface BookReview {
  reviewId: number;
  authorId: number;
  authorNickname: string;
  authorProfileImage: string;
  content: string;
  createdAt: string;
  cardColor: ReviewCardColor;
}

export interface BookReviewResponse {
  reviews: BookReview[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
