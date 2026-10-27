// src/utils/api.js

export const API_URL = import.meta.env.VITE_API_URL || "https://kodivian-website-8.onrender.com";
export const FALLBACK_URL = "https://kodivian-website-8.onrender.com";

// Silent pre-warming ping so the Render container wakes up while the user is filling the form
let hasPrewarmed = false;
export const prewarmBackend = () => {
  if (hasPrewarmed) return;
  hasPrewarmed = true;

  try {
    const urls = [API_URL];
    if (API_URL !== FALLBACK_URL) {
      urls.push(FALLBACK_URL);
    }

    urls.forEach((url) => {
      fetch(`${url}/api/health`, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
      }).catch(() => {
        // Silent catch for pre-warming
      });
    });
  } catch (e) {
    // Ignore pre-warm errors
  }
};

/**
 * Resilient submit handler:
 * - Attempts primary API URL
 * - If local development / connection refused, smoothly falls back to production Render backend
 * - Guarantees the form never hangs indefinitely
 */
export const submitFormData = async (endpoint, data, timeoutMs = 25000) => {
  const primaryUrl = API_URL;
  const isLocal = primaryUrl.includes("localhost") || primaryUrl.includes("127.0.0.1");

  const sendWithTimeout = async (baseUrl) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const resData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(resData?.detail || resData?.error || `Server responded with ${response.status}`);
      }
      return resData;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  try {
    return await sendWithTimeout(primaryUrl);
  } catch (primaryErr) {
    // If running against localhost or if primary failed, fallback to production backend
    if (isLocal && primaryUrl !== FALLBACK_URL) {
      console.warn(`[API] Primary (${primaryUrl}) unreachable, falling back to ${FALLBACK_URL}`);
      return await sendWithTimeout(FALLBACK_URL);
    }
    throw primaryErr;
  }
};
