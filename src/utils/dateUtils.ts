// 기부의 목표 날짜로부터 남은 날짜 계산
export const getRemainingDays = (endDateString: string): string => {
  if (!endDateString) {
    return "";
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(endDateString);
  deadline.setHours(0, 0, 0, 0);
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "오늘 마감";
  if (diffDays <= 3) return "마감 임박";
  return `${diffDays}일 남음`;
};

export function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // 밀리초 단위 차이
  const diffSec = Math.floor(diffMs / 1000); // 초 단위
  const diffMin = Math.floor(diffSec / 60); // 분 단위
  const diffHour = Math.floor(diffMin / 60); // 시간 단위
  const diffDay = Math.floor(diffHour / 24); // 일 단위

  if (diffMin < 1) return "방금 전"; // 1분 미만이면 "방금 전"
  if (diffMin < 60) return `${diffMin}분 전`; // 1시간 미만이면 "N분 전"
  if (diffHour < 24) return `${diffHour}시간 전`; // 24시간 미만이면 "N시간 전"
  return `${diffDay}일 전`; // 24시간 이상이면 "N일 전"
}
export function formatDonationDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-based
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const formattedTime = `${hours}:${minutes} ${period}`;
  return `${year}.${month}.${day} , ${formattedTime}`;
}

export function generateCalendarDays(currentDate: Date) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}
