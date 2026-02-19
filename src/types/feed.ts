export type CategoryType =
  | "ALL"
  | "CREATIVE"
  | "ESSAY"
  | "SPEECH"
  | "JOURNALISM"
  | "HUMOR";

export interface FeedBook {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  category: Exclude<CategoryType, "ALL">;
  keywords: string[];
  reviewCount: number;
}
