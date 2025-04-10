import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface RecipientConfirmModalProps {
    onClose: () => void;
}

const RecipientConfirmModal: React.FC<RecipientConfirmModalProps> = ({ onClose }) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center bg-white rounded-2xl p-10 gap-5">
        <p>수혜자 등록을 진행하시겠습니까?</p>
        <div className="flex justify-end gap-4">
          <Button variant="gray" onClick={onClose}>취소</Button>
          <Button onClick={() => {
            router.push("/profile/recipient/complete");
            onClose();
          }}>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default RecipientConfirmModal;