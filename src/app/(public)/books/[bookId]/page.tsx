"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import FeedCard from "@/components/feed/FeedCard";
import ReviewCard from "@/components/book/ReviewCard";
import BackHeader from "@/components/common/BackHeader";
import Button from "@/components/common/Button";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import ConfirmModal from "@/components/common/ConfirmModal";

import { fetchBookDetail, fetchBookReviews } from "@/lib/api/book.api";
import { BookDetail, BookReview } from "@/types/book";

export default function BookDetailPage() {
  const { bookId } = useParams();
  const router = useRouter();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const isLoggedIn = !!token;

  useEffect(() => {
    async function load() {
      try {
        const detail = await fetchBookDetail(Number(bookId));
        const reviewResponse = await fetchBookReviews(Number(bookId));

        setBook(detail);
        setReviews(reviewResponse);
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, [bookId]);

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    router.push(`/books/${bookId}/write`);
  };

  if (!book) return null;

  return (
    <>
      <div className="px-6 pt-[60px] pb-[100px]">
        <BackHeader title={book.title} />

        <FeedCard
          book={{
            bookId: book.id,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            majorName: book.majorName,
            keyword1: book.keyword1,
            keyword2: book.keyword2,
            reviewCount: book.reviewCount,
          }}
        />

        <div className="mt-4 mb-8">
          <h3 className="text-h2_sb text-primary-dark mb-3">✍ 독자 기록</h3>
        </div>

        <div>
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
              align={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        <ScrollTopButton />

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-0 w-full bg-white p-6 border-t border-stroke">
          <Button className="w-full" onClick={handleWriteClick}>
            기록 작성
          </Button>
        </div>
      </div>

      {/* 비회원 모달 */}
      {showLoginModal && (
        <ConfirmModal
          title="안내"
          description="그리드 회원만 이용 가능한 기능입니다."
          cancelText="확인"
          confirmText="회원가입"
          onCancel={() => setShowLoginModal(false)}
          onConfirm={() => {
            setShowLoginModal(false);
            router.push("/");
          }}
        />
      )}
    </>
  );
}
