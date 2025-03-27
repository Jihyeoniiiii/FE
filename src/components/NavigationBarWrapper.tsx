'use client';

import NavigationBar from '@/components/ui/NavigationBar';
import { usePathname } from 'next/navigation';

const NavigationBarWrapper = () => {
  const pathname = usePathname();
  const hidePaths = ["/landing", "/welcome", "/funding/register"];
  const shouldHideFooter = hidePaths.includes(pathname);

  return (
    <div>
      {!shouldHideFooter && <NavigationBar />}
    </div>
  )
};

export default NavigationBarWrapper;