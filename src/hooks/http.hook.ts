export const useHttp = () => {
    const request = async (
        url: string,
        method = "GET",
        body: any = null,
        headers: any = { "Content-Type": "application/json" }
    ) => {
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                const error = await response.json();
                return error;
                // throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (e) {
            throw e;
        }
    };

    return { request };
};
