import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { menuItems } from "@/lib/menuItems";
import Link from "next/link";

const TopMenu = () => {
  return (
    <div className="flex-none">
      <div className="flex justify-end h-[2.5rem] pt-1 pr-5">
        <Link href={"/about"}>
          <Image
            className="cursor-pointer"
            src={"/assets/icons/info.svg"}
            alt="Inform"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <div className="flex px-7 sm:pt-3 sm:px-10 md:pt-5 md:px-16 justify-between">
        {menuItems.map((item) => (
          <Link key={item.id} href={`/${item.alt.toLowerCase()}`}>
            <div className="flex flex-col items-center gap-2" key={item.id}>
              <Button variant="ghost" size="sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  style={{ width: "auto" }}
                />
              </Button>
              <span className="font-semibold text-xs text-secondary">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopMenu;
