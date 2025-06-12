"use client";

import Cat from "@/components/Cat";
import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import { useCat } from "@/hooks/useCat";

export default function Home() {
  const {
    data: catInfo,
    isPending: isCatPending,
    isError: isCatError,
  } = useCat();

  if (isCatPending) {
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col py-10">...Loading</div>
    </div>;
  }
  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-90">
        <div className="flex flex-col py-10">
          <ProgressBar
            catInfo={catInfo}
            isCatPending={isCatPending}
            isCatError={isCatError}
          />
        </div>

        <div className="relative flex justify-center items-center">
          <Cat level={catInfo?.level} />
        </div>

        <BottomMenu />
      </div>
    </div>
  );
}
