import Image from "next/image";
import React from "react";

const UserInform = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/assets/icons/woman-profile.png"
          alt="WomanProfile"
          width={115}
          height={115}
        />
        <div className="flex flex-col text-secondary opacity-80 justify-center items-center">
          <span>수혜자</span>
          <span className="text-sm">suhyeja@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default UserInform;
