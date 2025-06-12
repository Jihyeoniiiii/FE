import React, { ReactNode } from 'react'

interface ListContainerProps {
    type: "review" | "profile";
    children?: ReactNode;
}

const ListContainer: React.FC<ListContainerProps> = ({ type, children })  => {
  const topClass = type === "review" ? "top-63" : "top-70";

  return (
    <div className={`absolute w-full px-9 py-6 bg-white rounded-2xl ${topClass} bottom-0 overflow-y-auto`}>
        {children}
    </div>
  )
}

export default ListContainer