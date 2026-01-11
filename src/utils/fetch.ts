import { generateOAuthHeader } from "./oauth";

export async function signedFetch(url: string, options: any = {}): Promise<any> {
    const method = options.method || "GET";
    const authHeader = generateOAuthHeader(method, url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 seconds timeout

    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: authHeader,
            },
            signal: controller.signal, // Pass the signal to the fetch request
        });

        clearTimeout(timeoutId); // Clear the timeout if fetch completes before timeout

        if (!res.ok) {
            throw new Error(`Audiomack API error: ${res.status} ${res.statusText} `);
        }

        return res.json();
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw new Error('Request timeout - Audiomack API took too long to respond');
        }
        throw error;
    }
}
