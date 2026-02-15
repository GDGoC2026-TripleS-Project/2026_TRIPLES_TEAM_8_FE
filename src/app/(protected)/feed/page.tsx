"use client";

import { useMemo, useState } from "react";
import { mockFeedBooks } from "@/lib/mock/feed.mock";
import { FeedBook, CategoryType } from "@/types/feed";

import FeedSearchBar from "@/components/feed/FeedSearchBar";
import FeedCategoryTabs from "@/components/feed/FeedCategoryTabs";
import FeedList from "@/components/feed/FeedList";
import FeedPagination from "@/components/feed/FeedPagination";

const PAGE_SIZE = 5;

export default function FeedPage() {
  const [books] = useState<FeedBook[]>(mockFeedBooks);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  // 필터링
  const filteredBooks = useMemo(() => {
    let result = books;

    if (selectedCategory !== "ALL") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (search) {
      result = result.filter((b) => b.title.includes(search));
    }

    return result;
  }, [books, selectedCategory, search]);

  const paginatedBooks = filteredBooks.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);

  return (
    <div className="px-6 pt-4 pb-10">
      {/* 검색바 */}
      <FeedSearchBar
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(0);
        }}
      />

      {/* 카테고리 탭 */}
      <FeedCategoryTabs
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setPage(0);
        }}
      />

      {/* 리스트 */}
      <FeedList books={paginatedBooks} />

      {/* 페이지네이션 */}
      <FeedPagination current={page} total={totalPages} onChange={setPage} />
    </div>
  );
}
