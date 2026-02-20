"use client";

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const PAGE_GROUP_SIZE = 5;

export default function FeedPagination({ current, total, onChange }: Props) {
  if (total <= 1) return null;

  const currentGroup = Math.floor(current / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE, total);

  const isFirstGroup = startPage === 0;
  const isLastGroup = endPage >= total;

  const pages = [];
  for (let i = startPage; i < endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      {/* 이전 그룹 버튼 */}
      <button
        disabled={isFirstGroup}
        onClick={() => !isFirstGroup && onChange(startPage - 1)}
        className={`w-10 h-10 rounded-lg flex items-center justify-center
          ${
            isFirstGroup
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
      >
        {"<"}
      </button>

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-9 h-9 rounded-lg
            ${
              current === page
                ? "bg-primary-dark text-white text-h3_m"
                : "bg-transparent hover:bg-gray-100 text-h3_m"
            }`}
        >
          {page + 1}
        </button>
      ))}

      {/* 다음 그룹 버튼 */}
      <button
        disabled={isLastGroup}
        onClick={() => !isLastGroup && onChange(endPage)}
        className={`w-9 h-9 rounded-lg flex items-center justify-center
          ${
            isLastGroup
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-primary-sand text-primary-dark hover:opacity-80"
          }`}
      >
        {">"}
      </button>
    </div>
  );
}
