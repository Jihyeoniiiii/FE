import BackButton from "@/components/BackButton";
import ItemContainer from "@/components/inventory/ItemContainer";
import Image from "next/image";
import React from "react";

const InventoryPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <BackButton>인벤토리</BackButton>
      <div className="flex h-[calc(100vh-550px)] justify-center items-center">
        <Image
          src="/assets/images/cat.svg"
          alt="Cat"
          width={170}
          height={170}
        />
      </div>
      <ItemContainer />
    </div>
  );
};

export default InventoryPage;
