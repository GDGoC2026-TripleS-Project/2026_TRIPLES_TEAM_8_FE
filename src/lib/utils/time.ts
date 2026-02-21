export function getHoursAgo(dateString: string) {
  const now = new Date();
  const created = new Date(dateString);

  const diffMs = now.getTime() - created.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "방금 전";

  return `${diffHours}시간 전`;
}
