export const formatDate = (date) => {
  if (!date || date.length == 0) return "";
  const now = new Date();
  const _date = new Date(date);

  const differenceInTime = now.getTime() - _date.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  if (differenceInDays <= 7) return Math.ceil(differenceInDays) + "일 전";

  return (
    _date.getFullYear() +
    "년 " +
    (_date.getMonth() + 1) +
    "월 " +
    _date.getDate() +
    "일"
  );
};
