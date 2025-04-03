import Image from "next/image";
import BackButton from "@/components/BackButton";

export const generateMetadata = () => {
  return {
    title: `채움 -[리뷰] 공부해서 사회에 보답하겠습니다.`,
    description: `채움 - 리뷰 상세페이지`,
    openGraph: {
      title: `채움 -[리뷰] 공부해서 사회에 보답하겠습니다.`,
      description: `채움 - 리뷰 상세페이지`,
      images: [
        {
          src: "/assets/images/study.png",
          width: 100,
          height: 100,
          alt: "study",
        },
      ],
    },
  };
};

export default function ReviewDetailPage() {
  return (
    <>
      <BackButton />
      <div className="flex flex-col items-center px-2 text-secondary space-y-8">
        {/* 리뷰 카드 */}
        <div className="w-80 rounded-xl bg-white p-3 flex flex-col items-center my-6 shadow-md gap-y-2">
          <p className="text-center text-sm mb-3">
            이 게시글에 대한 리뷰입니다.
          </p>
          <Image
            src="/assets/images/study.png"
            alt="공부하는 모습"
            width={150}
            height={100}
            className="rounded-lg mb-2"
          />
          <p className="text-sm text-center">공부해서 사회에 보답하겠습니다.</p>
        </div>

        {/* 펀딩 후기 섹션 */}
        <div className="flex flex-col items-center w-80 space-y-8">
          {/* 제목 */}
          <div className="w-full border-b-2 border-gray-500 pb-2">
            <p className="text-lg text-secondary text-center">
              감격스러운 펀딩 완료 후기
            </p>
          </div>

          {/* 이미지 */}
          <Image
            src="/assets/images/study.png"
            alt="Student studying"
            width={350}
            height={200}
            className="w-full h-48 object-cover rounded-xl shadow-sm"
          />

          {/* 메시지 박스 */}
          <div className="bg-white p-5 rounded-xl shadow-md w-full h-auto text-center">
            <p>
              덕분에 필요한 물건을 구매할 수 있었습니다! 도와주신 분들 모두
              감사합니다!!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
