"use client";

import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import { catStore } from "@/store/catStore";
import Image from "next/image";

export default function Home() {
  const catInfo = catStore((state)=>state.catData)



  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-[8rem]">
        <div className="flex flex-col py-5">
          {catInfo && <ProgressBar catData={catInfo} />}
        </div>

        <div className="relative flex justify-center items-center">
          <div className="relative flex justify-center items-center w-[220px] h-[220px]">

            <Image
              src="/assets/images/cat.svg"
              alt="Cat"
              width={180}
              height={180}
              className="relative z-10"
            />


          </div>
        </div>

        <BottomMenu />
      </div>
    </div>
  );
}
