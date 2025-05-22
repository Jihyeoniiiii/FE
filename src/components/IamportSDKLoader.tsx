'use client';

import { useEffect } from 'react';

const IamportSDKLoader = () => {
  useEffect(() => {
    const iamportScript = document.createElement('script');
    iamportScript.src = 'https://cdn.iamport.kr/v1/iamport.js';
    iamportScript.type = 'text/javascript';
    iamportScript.async = true;
    document.head.appendChild(iamportScript);

    iamportScript.onerror = () => {
      console.error('아임포트 SDK 로드 실패');
    };

    return () => {
      if (document.head.contains(iamportScript)) {
        document.head.removeChild(iamportScript);
      }
    };
  }, []);

  return null;
};

export default IamportSDKLoader;