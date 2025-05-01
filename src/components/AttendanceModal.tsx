import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  totalDays: number;
}

export default function AttendanceModal({ isOpen, onClose, totalDays }: Props) {
  return (
    <div className={`absolute inset-0 bg-black/30 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}>
      <div className="flex flex-col bg-white rounded-2xl p-6 space-y-6 pt-6">
        <h1 className="flex justify-center items-start text-secondary text-xl font-semibold opacity-80">
          출석완료 !
        </h1>
        <div className="p-2 text-secondary">
          <p>{totalDays}일 동안 출석체크 해주셨네요.✨</p>
          <p>감사의 마음으로 오늘의 혜택🎁을 드립니다.</p>
        </div>
        <Button onClick={onClose}>close</Button>
      </div>
    </div>
  );
}
