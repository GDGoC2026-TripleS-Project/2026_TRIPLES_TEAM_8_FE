export type CategoryType = "전체" | "창작" | "에세이" | "저널리즘" | "유머";

export interface FeedBook {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  majorName: string;
  keyword1: string;
  keyword2: string;
  reviewCount: number;
}

export interface FeedResponse {
  content: FeedBook[];
  totalElements: number;
  totalPages: number;
}
