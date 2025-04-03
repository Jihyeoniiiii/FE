import React, { ReactNode } from 'react'

interface MissionContainerProps {
    children?: ReactNode | ReactNode[];
}

const MissionContainer: React.FC<MissionContainerProps> = ({ children }) => {
  return (
    <div className='flex w-[90%] h-22 bg-white rounded-3xl'>
        {children}
    </div>
  )
}

export default MissionContainer