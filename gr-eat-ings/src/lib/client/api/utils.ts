export async function postJson<T>(url: string, body: unknown) {
    const r = await fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });
    return (await r.json()) as T;
}
