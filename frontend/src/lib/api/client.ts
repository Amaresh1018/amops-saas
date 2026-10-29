import createClient from "openapi-fetch";
import type { paths } from "./schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
});

/**
 * Configure authorization token on client headers
 */
export function setAuthToken(token: string | null) {
  if (token) {
    apiClient.use({
      onRequest({ request }) {
        request.headers.set("Authorization", `Bearer ${token}`);
        return request;
      },
    });
  }
}
