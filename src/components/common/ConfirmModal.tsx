"use client";

interface Props {
  title: string;
  description: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  title,
  description,
  cancelText = "취소",
  confirmText = "확인",
  onCancel,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[80%] max-w-[340px] bg-white/80 rounded-2xl overflow-hidden">
        {/* 본문 */}
        <div className="px-4 py-6 text-center">
          <h3 className="text-h1_sb text-primary-dark">{title}</h3>
          <p className="mt-4 text-h2_m text-primary-dark">{description}</p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex border-t border-stroke">
          <button
            onClick={onCancel}
            className="flex-1 py-4 text-h2_sb text-system-blue"
          >
            {cancelText}
          </button>

          <div className="w-[1px] bg-stroke" />

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-4 text-h2_sb text-system-error"
          >
            {loading ? "삭제 중..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
