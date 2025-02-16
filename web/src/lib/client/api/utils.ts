export async function postJson<TReturn>(url: string, body: unknown) {
    const r = await fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
    });
    return (await r.json()) as TReturn;
}

export type StreamProps<T> = {
    url: string;
    onmessage: (v: T) => void;
    onerror?: (err: unknown) => void;
    signal?: AbortSignal;
};
export async function streamJson<T>(props: StreamProps<T>) {
    try {
        const response = await fetch(props.url, { signal: props.signal });
        if (!response.body) throw new Error('Error fetching stream');
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            props.onmessage(JSON.parse(value));
        }
    } catch (err) {
        console.error(err);
        props.onerror?.(err);
    }
}
