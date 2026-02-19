import { BookDetail, BookReviewResponse } from "@/types/book";

export const mockBookDetail: BookDetail = {
  id: 1,
  title: "왜 나는 너를 사랑하는가",
  author: "알랭 드 보통",
  publisher: "청미래",
  keyword1: "사랑",
  keyword2: "가볍게_읽기_좋은",
  reviewCount: 24,
};

export const mockBookReviews: BookReviewResponse = {
  reviews: [
    {
      reviewId: 1,
      authorId: 1,
      authorNickname: "숨어버린 고양이",
      authorProfileImage: "/onboarding/type-a.svg",
      content:
        " 조용히 끝까지 읽히는 책이다. 큰 사건이나 극적 전개는 없지만 일상의 감정과 생각이 담담하게 이어진다. 과장되지 않은 문장들이 오히려오래 남아, 책을 덮은 뒤 여운이 남는다.",
      createdAt: "2026-02-16T10:00:00",
      cardColor: "pink",
    },
    {
      reviewId: 2,
      authorId: 2,
      authorNickname: "책벌레",
      authorProfileImage: "/onboarding/type-b.svg",
      content:
        "잔잔한 여운이 남는 책입니다. 큰 사건이나 극적 전개는 없지만 일상의 감정과 생각이 담담하게 이어진다. 과장되지 않은 문장들이 오히려오래 남아, 책을 덮은 뒤 여운이 남는다.",
      createdAt: "2026-02-16T08:30:00",
      cardColor: "blue",
    },
    {
      reviewId: 3,
      authorId: 3,
      authorNickname: "문학소녀",
      authorProfileImage: "/onboarding/type-c.svg",
      content:
        "생각보다 가볍게 읽히지만 깊이가 있다. 큰 사건이나 극적 전개는 없지만 일상의 감정과 생각이 담담하게 이어진다. 과장되지 않은 문장들이 오히려오래 남아, 책을 덮은 뒤 여운이 남는다.",
      createdAt: "2026-02-15T23:10:00",
      cardColor: "purple",
    },
    {
      reviewId: 4,
      authorId: 4,
      authorNickname: "밤독서",
      authorProfileImage: "/onboarding/type-d.svg",
      content:
        "담백한 문장이 오히려 인상적이었다. 큰 사건이나 극적 전개는 없지만 일상의 감정과 생각이 담담하게 이어진다. 과장되지 않은 문장들이 오히려오래 남아, 책을 덮은 뒤 여운이 남는다.",
      createdAt: "2026-02-15T20:00:00",
      cardColor: "yellow",
    },
    {
      reviewId: 5,
      authorId: 5,
      authorNickname: "활자중독",
      authorProfileImage: "/onboarding/type-e.svg",
      content:
        "사랑이라는 감정을 다시 생각하게 된다. 큰 사건이나 극적 전개는 없지만 일상의 감정과 생각이 담담하게 이어진다. 과장되지 않은 문장들이 오히려오래 남아, 책을 덮은 뒤 여운이 남는다.",
      createdAt: "2026-02-15T18:00:00",
      cardColor: "pink",
    },
  ],
  totalElements: 5,
  totalPages: 1,
  currentPage: 0,
};
