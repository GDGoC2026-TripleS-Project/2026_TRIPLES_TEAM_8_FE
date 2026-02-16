"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import FeedCard from "@/components/feed/FeedCard";
import ReviewCard from "@/components/book/ReviewCard";
import Button from "@/components/common/Button";
import ScrollTopButton from "@/components/common/ScrollTopButton";

import { fetchBookDetail, fetchBookReviews } from "@/lib/api/book.api";

import { mockBookDetail, mockBookReviews } from "@/lib/mock/book.mock";

import { BookDetail, BookReview } from "@/types/book";

export default function BookDetailPage() {
  const { bookId } = useParams();
  const router = useRouter();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [reviews, setReviews] = useState<BookReview[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const detail = await fetchBookDetail(Number(bookId));
        const reviewData = await fetchBookReviews(Number(bookId));

        setBook(detail);
        setReviews(reviewData.reviews);
      } catch {
        setBook(mockBookDetail);
        setReviews(mockBookReviews.reviews);
      }
    }

    load();
  }, [bookId]);

  if (!book) return null;

  return (
    <div className="px-6 pt-[60px] pb-[100px]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 border-b border-stroke">
        <div className="px-6 h-[60px] flex items-center gap-4">
          <Image
            src="/common/icon-back.svg"
            alt="back"
            width={30}
            height={30}
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <h1 className="text-h2_sb truncate">{book.title}</h1>
        </div>
      </div>

      {/* 🔥 FeedCard 재사용 */}
      <FeedCard
        book={{
          bookId: book.id,
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          category: "CREATIVE",
          keywords: [book.keyword1, book.keyword2],
          reviewCount: book.reviewCount,
        }}
      />

      {/* 독자 기록 */}
      <div className="mt-4 mb-8">
        <h3 className="text-h2_sb text-primary-dark mb-3">✍ 독자 기록</h3>
        <p className="text-h3_m text-primary-dark">
          다른 독자들은 이 문학을 이렇게 느꼈어요
        </p>
      </div>

      {/* 리뷰 교차 배치 */}
      <div>
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.reviewId}
            review={review}
            align={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>

      {/* 스크롤 버튼 */}
      <ScrollTopButton />

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-6 border-u border-stroke">
        <Button
          className="w-full"
          onClick={() => router.push(`/books/${bookId}/write`)}
        >
          기록 작성
        </Button>
      </div>
    </div>
  );
}
