'use client';

import NavigationBar from '@/components/ui/NavigationBar';
import { usePathname } from 'next/navigation';

const NavigationBarWrapper = () => {
  const pathname = usePathname();
  const hidePaths = pathname === '/landing' || pathname === '/welcome';

  return !hidePaths ? <NavigationBar /> : null;
};

export default NavigationBarWrapper;