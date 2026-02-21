import { BookReview } from "./book";

export interface HomeRecommendResponse {
  nickname: string;
  readerType: string | null;
  readerTitle: string;
  reviews: BookReview[];
}
