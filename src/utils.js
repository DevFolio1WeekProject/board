const pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const formatDate = (date, isShowTime) => {
  if (!date || date.length == 0) return "";
  const now = new Date();
  const _date = new Date(date);

  const differenceInTime = now.getTime() - _date.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  if (differenceInDays < 1)
    return (
      "오늘 " +
      ((_date.getHours() < 10 ? pad(_date.getHours(), 2) : _date.getHours()) +
        ":" +
        (_date.getMinutes() < 10
          ? pad(_date.getMinutes(), 2)
          : _date.getMinutes()) +
        ":" +
        (_date.getSeconds() < 10
          ? pad(_date.getSeconds(), 2)
          : _date.getSeconds()))
    );
  else if (differenceInDays >= 1 && differenceInDays < 4)
    return Math.ceil(differenceInDays) + "일 전";

  return (
    _date.getFullYear() +
    "년 " +
    (_date.getMonth() + 1) +
    "월 " +
    _date.getDate() +
    "일" +
    (isShowTime
      ? " " +
        (_date.getHours() < 10 ? pad(_date.getHours(), 2) : _date.getHours()) +
        ":" +
        (_date.getMinutes() < 10
          ? pad(_date.getMinutes(), 2)
          : _date.getMinutes()) +
        ":" +
        (_date.getSeconds() < 10
          ? pad(_date.getSeconds(), 2)
          : _date.getSeconds())
      : "")
  );
};
