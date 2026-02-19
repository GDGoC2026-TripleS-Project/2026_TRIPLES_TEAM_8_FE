"use client";

import { KEYWORD_COLOR_MAP } from "@/lib/utils/keywordColorMap";

interface Props {
  keywords?: string[] | null;
}

export default function GradientThumbnail({ keywords }: Props) {
  const safeKeywords = keywords ?? [];

  const color1 = KEYWORD_COLOR_MAP[safeKeywords[0]] ?? "var(--kw-light)";
  const color2 = KEYWORD_COLOR_MAP[safeKeywords[1]] ?? color1;

  return (
    <div
      className="w-[84px] h-[110px] rounded-md"
      style={{
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
      }}
    />
  );
}
