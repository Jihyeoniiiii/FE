"use client";

import useCheckPwa from '@/hooks/useCheckPwa';
import { useEffect, useState } from 'react';

declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  interface Window {
    addEventListener(type: 'beforeinstallprompt', listener: (event: BeforeInstallPromptEvent) => void, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: 'beforeinstallprompt', listener: (event: BeforeInstallPromptEvent) => void, options?: boolean | EventListenerOptions): void;
  }
}

const InstallPromptHandler = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isPwa = useCheckPwa();

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (isPwa) {
    return null;
  }

  if (!isPwa) {
    return (
      <button
        onClick={handleInstallClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        홈 화면에 추가하기
      </button>
    );
  }
};

export default InstallPromptHandler;