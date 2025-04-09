import Image from 'next/image';
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

interface ReviewDataItem {
    id: string;
    photo: string;
    title: string;
}

interface MyFundItemProps {
    type: string;
    reviewItem: ReviewDataItem
}

const MyFundItem: React.FC<MyFundItemProps> = ({type, reviewItem}) => {
    const router = useRouter();

    const handleReviewWrite = (id: string) => {
        router.push(`/review/write/${id}`);
    }

  return (
    <>
        {type === "ongoing" &&
            <div className='flex justify-between items-center text-xs text-secondary gap-3'>
                <Image src="/assets/images/study.png" alt='Study' width={70} height={30} className='rounded-xl'/>
                <div className='flex flex-col w-0 flex-1'>
                    <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{reviewItem.title}</span>
                    <span className='text-gray text-[10px]'>2025.04.08</span>
                </div>
                <span className=''>40,000원</span>
                <Button variant="soft" className='p-2.5 border-1 border-primary text-primary text-[11px]' onClick={() => handleReviewWrite(reviewItem.id)}>후기<br />작성</Button>
            </div>
        }
        {type === "completed" &&
            <div className='flex justify-between items-center text-xs text-secondary gap-3'>
                <Image src="/assets/images/study.png" alt='Study' width={70} height={30} className='rounded-xl'/>
                <div className='flex flex-col w-0 flex-1'>
                    <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{reviewItem.title}</span>
                    <span className='text-gray text-[10px]'>2025.04.08</span>
                </div>
                <span className=''>40,000원</span>
                <Button variant="soft" className='p-2.5 border-1 border-primary text-primary text-[11px]'>후기<br />작성</Button>
            </div>
        }
    </>
  )
}

export default MyFundItem