export function debounced<T>(initialValue: T, delayMs: number) {
    const value = $state({ current: initialValue, debounced: initialValue, debouncing: false});

    $effect(() => {
        const newValue = value.current;
        value.debouncing = true;

        const id = setTimeout(() => {
            value.debounced = newValue;
            value.debouncing = false;
        }, delayMs);

        return () => clearTimeout(id);
    });

    return value;
}
