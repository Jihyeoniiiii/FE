import Image from "next/image";

const FriendPageHeader = () => {
  return (
    <div className="px-4 md:px-10 flex justify-between items-center">
      <h1 className="text-2xl text-secondary font-semibold opacity-80">친구</h1>
      <Image
        height={25}
        width={40}
        alt="돋보기"
        src="/assets/icons/search.svg"
        className="pl-3"
      />
    </div>
  );
};

export default FriendPageHeader;
