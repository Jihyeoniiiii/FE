import BackButton from "@/components/BackButton";
import Cat from "@/components/Cat";
import ItemContainer from "@/components/inventory/ItemContainer";

import React from "react";

const InventoryPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <BackButton>인벤토리</BackButton>
      <div className="flex h-[calc(100vh-550px)] justify-center items-center ">
        <Cat level={1} />
      </div>
      <ItemContainer />
    </div>
  );
};

export default InventoryPage;
