import React, { ReactNode } from 'react'

interface ListContainerProps {
    children?: ReactNode;
}

const ListContainer: React.FC<ListContainerProps> = ({ children })  => {
  return (
    <div className="absolute w-full px-9 py-6 bg-white rounded-2xl top-70 bottom-0 overflow-y-auto">
        {children}
    </div>
  )
}

export default ListContainer