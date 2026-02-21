"use client";

import { CategoryType } from "@/types/feed";

interface Props {
  selected: CategoryType;
  onSelect: (cat: CategoryType) => void;
}

const CATEGORY_LIST: CategoryType[] = [
  "전체",
  "창작",
  "에세이",
  "유머",
  "저널리즘",
];

export default function FeedCategoryTabs({ selected, onSelect }: Props) {
  return (
    <div className="flex px-2 gap-8 mb-6 text-h2_sb">
      {CATEGORY_LIST.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={
            selected === cat
              ? "text-primary-dark border-b-2 border-primary-warm"
              : "text-gray-text2"
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
