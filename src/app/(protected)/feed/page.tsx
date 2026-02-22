"use client";

import { useEffect, useState } from "react";
import { FeedBook, CategoryType } from "@/types/feed";
import { fetchFeed, fetchExploreFeed } from "@/lib/api/feed.api";

import TopNavBar from "@/components/layout/TopNavBar";
import FeedSearchBar from "@/components/feed/FeedSearchBar";
import FeedCategoryTabs from "@/components/feed/FeedCategoryTabs";
import FeedList from "@/components/feed/FeedList";
import FeedPagination from "@/components/feed/FeedPagination";

const PAGE_SIZE = 5;

const MAJOR_CODE_MAP: Record<number, CategoryType> = {
  "811": "창작",
  "812": "창작",
  "813": "창작",
  "814": "에세이",
  "816": "에세이",
  "815": "저널리즘",
  "818": "저널리즘",
  "817": "유머",
};

export default function FeedPage() {
  const [books, setBooks] = useState<FeedBook[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("전체");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");

  // 최초 로딩 + 책 로딩 동시에 처리
  useEffect(() => {
    async function loadInitial() {
      try {
        setIsLoading(true);

        let initialCategory: CategoryType = "전체";

        if (isLoggedIn) {
          const data = await fetchFeed();

          if (data.majorCode?.length > 0) {
            initialCategory = MAJOR_CODE_MAP[data.majorCode[0]] ?? "전체";
          }
        }

        // 카테고리 확정
        setSelectedCategory(initialCategory);

        // 확정된 카테고리로 explore 호출
        const booksData = await fetchExploreFeed(initialCategory);

        setBooks(booksData);
        setTotalPages(Math.ceil(booksData.length / PAGE_SIZE));
      } catch (e) {
        console.error("Feed Init Error", e);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitial();
  }, [isLoggedIn]);

  // 카테고리 변경 시
  useEffect(() => {
    if (isLoading) return;

    async function loadBooks() {
      try {
        const data = await fetchExploreFeed(selectedCategory);
        setBooks(data);
        setTotalPages(Math.ceil(data.length / PAGE_SIZE));
        setPage(0);
      } catch (e) {
        console.error("Feed Load Error", e);
      }
    }

    loadBooks();
  }, [selectedCategory]);

  const filteredBooks = books.filter((b) => b.title.includes(search));

  const paginatedBooks = filteredBooks.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  return (
    <div>
      <TopNavBar />

      <div className="px-6 pt-4 pb-20 pt-[90px]">
        <FeedSearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(0);
          }}
        />

        <FeedCategoryTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {isLoading ? (
          <div className="py-20 text-center">로딩 중...</div>
        ) : (
          <>
            <FeedList books={paginatedBooks} />

            <FeedPagination
              current={page}
              total={Math.ceil(filteredBooks.length / PAGE_SIZE)}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
