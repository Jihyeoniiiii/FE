import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

type FriendProps = {
  id: string;
  name: string;
  badge: string;
  commondonation: number;
  profile_img: string;
};

const FriendListCard = ({
  id,
  name,
  badge,
  commondonation,
  profile_img,
}: FriendProps) => {
  return (
    <div
      className="flex items-center justify-between p-3 border-b-3 border-white last:border-b-0">
      <div className="flex items-center">
        <Image
          src={profile_img || "/placeholder.svg"}
          alt={name}
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-secondary">{name}</h3>
            <span className=" bg-white ml-2 pt-0.5 px-2 rounded-xl text-xs text-secondary">
              {badge}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            함께한 기부: {commondonation}회
          </p>
        </div>
      </div>
      <Link key={id} href={`/friends/${id}`}>
        <Button
          variant="soft"
          className="rounded-full px-4 py-1 h-8 text-sm border-gray-200">
          보기
        </Button>
      </Link>
    </div>
  );
};

export default FriendListCard;
