import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { menuItems } from "@/lib/menuItems";
import Link from "next/link";

const TopMenu = () => {
  return (
    <>
      <div className="flex justify-end pt-6 pr-5">
        <Image
          className="cursor-pointer"
          src={"/assets/icons/info.svg"}
          alt="Inform"
          width={20}
          height={20}
        />
      </div>
      <div className="flex pt-3 px-7 sm:pt-3 sm:px-10 md:pt-5 md:px-16 justify-between">
        {menuItems.map((item) => (
          <Link key={item.id} href={`/${item.alt.toLowerCase()}`}>
            <div className="flex flex-col items-center gap-2" key={item.id}>
              <Button variant="ghost" size="sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                />
              </Button>
              <span className="font-semibold text-xs text-secondary">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TopMenu;
