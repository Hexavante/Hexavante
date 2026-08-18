import { createAuthClient } from "better-auth/client";
import { getApiUrl } from "./api-url";

export const API_URL = getApiUrl();

export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: {
    credentials: "include",
  },
});
