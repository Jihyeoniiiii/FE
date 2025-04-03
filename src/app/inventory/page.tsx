import BackButton from "@/components/BackButton";
import ItemContainer from "@/components/inventory/ItemContainer";
import Image from "next/image";
import React from "react";

const InventoryPage = () => {
  return (
    <div>
      <BackButton>인벤토리</BackButton>
      <div className="flex justify-center py-14">
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
