import { BookReview } from "./book";

export interface MeResponse {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: {
    id: number;
    email: string;
    nickname: string;
    readerType: string;
    readerTitle: string;
    reviewCount: number;
  };
}

export interface MyReviewResponse {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: BookReview[];
}
