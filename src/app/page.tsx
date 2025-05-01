import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import NavigationBar from "@/components/ui/NavigationBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow min-h-[calc(100vh - 8rem)] pb-[8rem]">
        <div className="flex flex-col py-8">
          <ProgressBar now={35} />
        </div>
        <div className="flex justify-center py-20 sm:py-15 md:py-12">
          <Image
            src={"/assets/images/cat.svg"}
            alt="Cat"
            width={180}
            height={180}
          />
        </div>
        <BottomMenu />
      </div>
      <NavigationBar />
    </div>
  );
}
