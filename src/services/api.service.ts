const BASE_API_URL = "http://localhost:3000";

type ApiResponse<T> = {
    data?: T;
    error?: {
        statusCode: number;
        message: string;
        path: string;
        timestamp: string;
    };
    pagination?: {
        total: number;
        pageSize: number;
        currentPage: number;
        lastPage: number;
        nextPage: number | null;
    };
};

type RequestConfig = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: object | FormData;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
};

export async function baseApiAction<T>(
    endpoint: string,
    config: RequestConfig = {},
): Promise<ApiResponse<T>> {
    const { method = "GET", body, headers = {}, params } = config;

    try {
        let url = `${BASE_API_URL}${endpoint}`;
        if (params) {
            const queryString = new URLSearchParams(
                Object.entries(params).map(([key, value]) => [key, String(value)])
            ).toString();
            url += `?${queryString}`;
        }

        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        };

        if (body && method !== "GET") {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.error || {
                    statusCode: response.status,
                    message: data.message ||  "An error occurred",
                    path: endpoint,
                    timestamp: new Date().toISOString(),
                },
            };
        }

        const isArray = Array.isArray(data);
        const responseData = isArray ? data : data.data;

        return {
            data: responseData,
            pagination: data.pagination
        }
    } catch (error) {
        return {
            error: {
                statusCode: 500,
                message: error instanceof Error ? error.message : "Network error",
                path: endpoint,
                timestamp: new Date().toISOString(),
            },
        };
    }
}

export const api = {
    get: <T>(endpoint: string, params?: Record<string, string | number | boolean>) =>
        baseApiAction<T>(endpoint, { method: "GET", params }),

    post: <T>(endpoint: string, body?: object) =>
        baseApiAction<T>(endpoint, { method: "POST", body }),

    put: <T>(endpoint: string, body?: object) =>
        baseApiAction<T>(endpoint, { method: "PUT", body }),

    patch: <T>(endpoint: string, body?: object) =>
        baseApiAction<T>(endpoint, { method: "PATCH", body }),

    delete: <T>(endpoint: string) =>
        baseApiAction<T>(endpoint, { method: "DELETE" }),
};