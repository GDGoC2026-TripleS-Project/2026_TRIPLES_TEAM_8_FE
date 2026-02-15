interface ChoiceCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

// 온보딩 테스트 선택 카드
export default function ChoiceCard({
  label,
  selected,
  onSelect,
}: ChoiceCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        w-full h-[120px] rounded-md border border-primary-dark
        flex items-center justify-center text-center px-10
        cursor-pointer transition-colors duration-200
        ${selected ? "bg-primary-warm" : "bg-primary-cream"}
      `}
    >
      <span className="text-h3_m text-primary-dark">{label}</span>
    </div>
  );
}
