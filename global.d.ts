// global.d.ts
interface Navigator {
  standalone?: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface Window {
  addEventListener(
    type: "beforeinstallprompt",
    listener: (event: BeforeInstallPromptEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: "beforeinstallprompt",
    listener: (event: BeforeInstallPromptEvent) => void,
    options?: boolean | EventListenerOptions
  ): void;
}
