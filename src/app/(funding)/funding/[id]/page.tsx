import { Avatar } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import 공부 from "@assets/images/study.png";
import 프로필 from "@assets/icons/profile.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

export const generateMetadata = () => {
  return {
    title: `채움 - 공부해서 사회에 보답하겠습니다.`,
    description: `채움 - 뭐 이런저런 사정이 있어서 이런 용품이 필요합니다..!`,
    openGraph: {
      title: `채움 - 공부해서 사회에 보답하겠습니다.`,
      description: `채움 - 뭐 이런저런 사정이 있어서 이런 용품이 필요합니다..!`,
      images: [
        {
          src: { 공부 },
          width: 100,
          height: 100,
          alt: "study",
        },
      ],
    },
  };
};
export default function FundingDetailCard() {
  return (
    <>
      <BackButton />
      <div className="flex flex-col px-2 ">
        <div className=" p-6 space-y-3">
          {/* Header */}
          <h2
            className="text-xl font-medium text-secondary"
            style={{ fontWeight: 500 }}>
            공부해서 사회에 보답하겠습니다.
          </h2>

          {/* Profile */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-13 w-13 bg-[#d8e6ff]">
                <div className="flex items-center justify-center h-full ">
                  <Image width="50" height="50" src={프로필} alt="프로필" />
                </div>
              </Avatar>
              <span className="font-medium text-secondary">김**</span>
            </div>
            <div
              className="flex items-center text-sm text-secondary"
              style={{ fontWeight: 300 }}>
              <CheckCircle className="h-4 w-4 mr-1 text-secondary" />
              <span>10 Feb</span>
            </div>
          </div>

          {/* Funding Goal */}
          <div className="space-y-2">
            <div className="flex items-center justify-center mb-4">
              <span className="text-secondary font-bold mr-2 text-2xl">
                목표 :
              </span>
              <span className="text-primary font-bold text-2xl">100,000원</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="font-medium text-secondary text-2xl">
                총 90,000원 모금
              </div>
              <Badge
                className=" bg-accent text-accent text-sm px-1"
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  fontWeight: 600,
                }}>
                오늘 마감
              </Badge>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden">
            <Image
              src={공부}
              alt="Student studying"
              width={350}
              height={200}
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Message */}
          <div className="my-8 h-33 bg-white p-4 rounded-xl">
            <p className="text-secondary">
              뭐 이런저런 사정이 있어서 이런 용품이 필요합니다..!
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Button className="w-80 py-6 text-lg rounded-xl">
              마음 나누기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
