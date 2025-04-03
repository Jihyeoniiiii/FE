import React from "react";
import Link from "next/link";
import Image from "next/image";
import 공부 from "@assets/images/study.png";

type reviewDataProps = {
  id: string;
  photo: string;
  title: string;
};

const ReviewCard = ({ reviewData }: { reviewData: reviewDataProps }) => {

  return (
    <div className="flex flex-col pt-6 ">
      <Link href={`/review/${reviewData.id}`}>
        <Image
          src={reviewData.photo || 공부}
          alt="펀딩 프로젝트"
          width={150}
          height={100}
          className="w-full h-auto rounded-lg object-cover"
        />
        <p className="text-sm text-secondary mt-4 text-left">
          {reviewData.title.length > 13
            ? reviewData.title.slice(0, 13) + ".."
            : reviewData.title}
        </p>
      </Link>
    </div>
  );
};

export default ReviewCard;
