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
