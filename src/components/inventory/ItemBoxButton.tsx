import React, { ReactNode } from 'react'
import { Button } from '../ui/button';

interface ItemBoxButtonProps {
  children?: ReactNode | ReactNode[];
}

const ItemBoxButton: React.FC<ItemBoxButtonProps> = ({ children }) => {
  return (
    <div>
        <Button variant="gray" size="none" className='flex justify-center w-25 h-25 rounded-2xl'>
            {children}
        </Button>
    </div>
  )
}

export default ItemBoxButton