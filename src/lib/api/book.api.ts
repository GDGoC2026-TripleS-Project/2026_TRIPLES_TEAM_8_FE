import { BookDetail, BookReviewResponse } from "@/types/book";

export async function fetchBookDetail(bookId: number): Promise<BookDetail> {
  const res = await fetch(`/api/books/${bookId}`);

  if (!res.ok) {
    throw new Error("Book Detail API Error");
  }

  return res.json();
}

export async function fetchBookReviews(
  bookId: number,
): Promise<BookReviewResponse> {
  const res = await fetch(`/api/books/${bookId}/reviews`);

  if (!res.ok) {
    throw new Error("Book Reviews API Error");
  }

  return res.json();
}
