// debounce.ts
export const debounce = (
  callback: () => void,
  delay: number,
  timerIdRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  if (timerIdRef.current) {
    clearTimeout(timerIdRef.current);
  }

  timerIdRef.current = setTimeout(() => {
    callback();
  }, delay);
};
