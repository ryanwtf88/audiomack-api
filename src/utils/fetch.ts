import { generateSignedUrl } from "./oauth.js";

export async function signedFetch(url: string, options: RequestInit = {}): Promise<any> {
    const method = (options.method || "GET") as string;

    // Split URL and query params for signing
    const [baseUrl, queryStr] = url.split("?");
    const additionalParams: Record<string, string> = {};
    if (queryStr) {
        new URLSearchParams(queryStr).forEach((value: string, key: string) => {
            additionalParams[key] = value;
        });
    }

    const signedUrl = generateSignedUrl(method, baseUrl, additionalParams);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 seconds timeout

    try {
        const res = await fetch(signedUrl, {
            ...options,
            headers: {
                ...options.headers,
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            throw new Error(`Audiomack API error: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw new Error('Request timeout - Audiomack API took too long to respond');
        }
        throw error;
    }
}
