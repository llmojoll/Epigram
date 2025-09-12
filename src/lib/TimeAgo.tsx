// 시간 차이를 계산하는 유틸 함수
export const timeAgo = (dateString: string) => {
  const now = new Date();
  const updated = new Date(dateString);
  const diff = now.getTime() - updated.getTime(); // 밀리초 차이

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return '방금 전';
};
