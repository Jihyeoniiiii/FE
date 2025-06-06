import Cat from "@/components/Cat";
import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-90">
        <div className="flex flex-col py-10">
          <ProgressBar />
        </div>

        <div className="relative flex justify-center items-center">
          <Cat />
        </div>

        <BottomMenu />
      </div>
    </div>
  );
}
