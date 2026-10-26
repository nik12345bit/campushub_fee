const baseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
export class ApiError extends Error { constructor(message, status = 0) { super(message); this.name = "ApiError"; this.status = status; } }
export async function apiRequest(path, { method = "GET", body, signal, headers = {}, retries = 0 } = {}) {
  if (!baseUrl) throw new ApiError("API is not configured. Set VITE_API_BASE_URL in your .env file to enable server requests.");
  let attempt = 0;
  while (true) {
    try {
      const response = await fetch(`${baseUrl}${path.startsWith("/") ? path : `/${path}`}`, { method, signal, headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}), ...headers }, ...(body ? { body: JSON.stringify(body) } : {}) });
      if (!response.ok) { let message = `Request failed (${response.status})`; try { message = (await response.json()).message || message; } catch {} throw new ApiError(message, response.status); }
      if (response.status === 204) return null;
      return await response.json();
    } catch (error) {
      if (signal?.aborted) throw error;
      if (attempt++ >= retries || (error instanceof ApiError && error.status < 500)) throw error;
      await new Promise((resolve, reject) => { const id = setTimeout(resolve, 300 * (2 ** (attempt - 1))); signal?.addEventListener("abort", () => { clearTimeout(id); reject(signal.reason); }, { once: true }); });
    }
  }
}
