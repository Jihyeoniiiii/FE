"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const RecipientCompletePage = () => {
    const router = useRouter();

  return (
    <div className='flex flex-col min-h-[calc(100vh-8rem)] justify-center items-center text-secondary gap-6'>
        <div className="flex flex-col justify-center items-center">
            <p>수혜자 등록이 완료되었습니다.</p>
            <p>서류 검토가 완료되면</p>
            <p>안내해드리겠습니다!</p>
        </div>
        <div>
            <Button variant="soft" size="none" className='text-xs py-1 px-2'>제출서류 확인</Button>
        </div>
        <div className='flex gap-4'>
            <Button variant="gray" className="px-6" onClick={() => router.back()}>등록 취소</Button>
            <Button className="px-7" onClick={() => router.push("/")}>홈으로</Button>
        </div>
    </div>
  )
}

export default RecipientCompletePage