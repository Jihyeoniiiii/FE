import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FundingData } from "@/lib/api/funding";

interface MyFundItemProps {
  type: "ongoing" | "completed";
  fundingItem: FundingData;
}

const MyFundItem: React.FC<MyFundItemProps> = ({ type, fundingItem }) => {
  const router = useRouter();

  const handleReviewWrite = (fundingId: number) => {
    router.push(`/review/write/${fundingId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  };

  return (
    <>
      {type === "ongoing" && (
        <div
          className="flex justify-between items-center text-xs text-secondary gap-3 cursor-pointer"
          onClick={() => router.push(`/funding/${fundingItem.id}`)}>
          <Image
            src={
              fundingItem.fundingImages?.[0]?.fileUrl ||
              "/assets/images/study.png"
            }
            alt={fundingItem.title}
            width={70}
            height={30}
            className="rounded-xl w-[60px] h-[60px]"
          />
          <div className="flex flex-col w-0 flex-1">
            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
              {fundingItem.title}
            </span>
            <span className="text-gray text-[10px]">
              {formatDate(fundingItem.createdAt)}
            </span>
          </div>
          <span className="">{fundingItem.goalAmount}</span>
        </div>
      )}
      {type === "completed" && (
        <div className="flex justify-between items-center text-xs text-secondary gap-3">
          <Image
            src={
              fundingItem.fundingImages?.[0]?.fileUrl ||
              "/assets/images/study.png"
            }
            alt={fundingItem.title}
            width={70}
            height={30}
            className="rounded-xl"
          />
          <div className="flex flex-col w-0 flex-1">
            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
              {fundingItem.title}
            </span>
            <span className="text-gray text-[10px]">
              {formatDate(fundingItem.createdAt)}
            </span>
          </div>
          <span className="">{fundingItem.goalAmount}</span>
          <Button
            variant="soft"
            className="p-2.5 border-1 border-primary text-primary text-[11px]"
            onClick={() => handleReviewWrite(fundingItem.id)}>
            후기
            <br />
            작성
          </Button>
        </div>
      )}
    </>
  );
};

export default MyFundItem;
