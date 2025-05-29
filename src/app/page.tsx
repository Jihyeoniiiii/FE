"use client";

import Cat from "@/components/Cat";
import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import { catStore } from "@/store/catStore";

export default function Home() {
  const catInfo = catStore((state) => state.catData);

  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-[8rem]">
        <div className="flex flex-col py-5">
          {catInfo && <ProgressBar catData={catInfo} />}
        </div>

        <div className="relative flex justify-center items-center">
          <Cat />
        </div>

        <BottomMenu />
      </div>
    </div>
  );
}
