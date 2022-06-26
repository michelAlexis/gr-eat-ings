export function delay<T>(delay: number) {
  return (v: T) =>
    new Promise<T>((resolve) => {
      const timer = setTimeout(() => resolve(v), delay);
      return () => clearTimeout(timer);
    });
}
