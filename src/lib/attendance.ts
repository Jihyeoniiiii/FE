export function getSavedAttendance(): { date: string }[] {
  const saved = localStorage.getItem("attendanceRecords");
  return saved ? JSON.parse(saved) : [];
}

export function saveAttendance(records: { date: string }[]) {
  localStorage.setItem("attendanceRecords", JSON.stringify(records));
}
