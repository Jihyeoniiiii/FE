import MyFundList from "@/components/recipient/MyFundList";
import UserInform from "@/components/recipient/UserInform";
import React from "react";

const RecipientProfilePage = () => {
  return (
    <div>
      <div className="flex flex-col py-20 gap-10">
        <UserInform />
        <MyFundList />
      </div>
    </div>
  );
};

export default RecipientProfilePage;