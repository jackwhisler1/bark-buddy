const apiClient = async (url: string, options: RequestInit = {}) => {
  const fullUrl = `https://frontend-take-home-service.fetch.com${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    credentials: "include", // Include cookies
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const contentType = response.headers.get("Content-Type");

  if (contentType?.includes("application/json")) {
    return response.json(); // Parse as JSON
  } else {
    return response.text(); // Return as plain text
  }
};

export default apiClient;
