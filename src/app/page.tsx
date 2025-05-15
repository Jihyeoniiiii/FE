"use client";

import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import NavigationBar from "@/components/ui/NavigationBar";
import axiosInstance from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const fetchCatInfo = async () => {
    const { data } = await axiosInstance.get("/api/v1/cat");
    console.log(data.data);
    return data.data;
  };

  const { data: catInfo } = useQuery({
    queryKey: ["cat"],
    queryFn: fetchCatInfo,
  });

  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-[8rem]">
        <div className="flex flex-col py-5">
          {catInfo && <ProgressBar catData={catInfo} />}
        </div>
        <div className="flex justify-center">
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
