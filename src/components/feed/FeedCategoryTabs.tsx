"use client";

import { CategoryType } from "@/types/feed";

interface Props {
  selected: CategoryType;
  onSelect: (cat: CategoryType) => void;
}

const CATEGORY_MAP: Record<CategoryType, string> = {
  ALL: "전체",
  CREATIVE: "창작",
  ESSAY: "에세이",
  SPEECH: "스피치",
  JOURNALISM: "저널리즘",
  HUMOR: "유머",
};

export default function FeedCategoryTabs({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-6 mb-6 text-h2_sb">
      {Object.keys(CATEGORY_MAP).map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat as CategoryType)}
          className={`
            pb-1 border-b-2 transition-colors
            ${
              selected === cat
                ? "text-primary-dark border-primary-warm"
                : "text-gray-text2 border-transparent"
            }
          `}
        >
          {CATEGORY_MAP[cat as CategoryType]}
        </button>
      ))}
    </div>
  );
}
