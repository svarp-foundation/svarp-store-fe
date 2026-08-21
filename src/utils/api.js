/**
 * Centralized API client — all backend requests go through here.
 * Handles headers, base URL, 401 token cleanup, and error catching.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token && token !== "null" && token !== "undefined") {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("auth:logout"));
      }
      return response;
    } catch (err) {
      if (err.name === "AbortError") throw err;
      console.error(`API Request Error [${endpoint}]:`, err);
      throw err;
    }
  },

  get(endpoint, signal) {
    return this.request(endpoint, { method: "GET", signal });
  },

  post(endpoint, data, signal) {
    return this.request(endpoint, {
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      signal,
    });
  },

  put(endpoint, data, signal) {
    return this.request(endpoint, {
      method: "PUT",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      signal,
    });
  },

  patch(endpoint, data, signal) {
    return this.request(endpoint, {
      method: "PATCH",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      signal,
    });
  },

  delete(endpoint, signal) {
    return this.request(endpoint, { method: "DELETE", signal });
  },
};

export default api;
