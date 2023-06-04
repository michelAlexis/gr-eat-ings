import { useRef } from 'react';

export function useFocus<T extends { focus: () => void } = HTMLInputElement>(initValue: T | null = null) {
  const htmlElRef = useRef(initValue);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus] as const;
}
