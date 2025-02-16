import { NOT_FOUND } from "../response.utils";
import type { paths } from "./schemas/server/v2";

type SearchApiBarcodeProps = {
    barcode: string;
    fetch: typeof globalThis.fetch;
    request: Request;
};
export type ApiProductByBarcodeResponse = paths['/api/v2/product/{barcode}']['get']['responses']['200']['content']['application/json'];
export type ApiProduct = NonNullable<ApiProductByBarcodeResponse['product']>;
export async function searchApiByBarcode({ barcode, fetch, request }: SearchApiBarcodeProps) {
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
    const userAgent = request.headers.get('user-agent') ?? 'Chrome';
    // User-agent header according to api documentation
    const response = await fetch(url, {
        headers: {
            'user-agent': `Gr-eat-ings - ${userAgent} - Version 0.1 - www.gr-eat-ings.com`,
        },
        signal: request.signal,
    });
    if (!response.ok) {
        if (response.status === NOT_FOUND) {
            return null;
        }
        throw new Error(response.statusText);
    }
    const data = (await response.json()) as ApiProductByBarcodeResponse;
    return data.product ?? null;
}
