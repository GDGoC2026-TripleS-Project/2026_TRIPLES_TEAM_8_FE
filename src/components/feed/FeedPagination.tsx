interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function FeedPagination({ current, total, onChange }: Props) {
  return (
    <div className="flex justify-center gap-3 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={
            current === i
              ? "w-8 h-8 rounded-md bg-primary-dark text-white"
              : "w-8 h-8 rounded-md bg-gray-bg"
          }
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
