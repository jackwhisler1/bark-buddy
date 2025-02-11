import { getNavigate } from "./navigation";

const apiClient = async (url: string, options: RequestInit = {}) => {
  const fullUrl = `https://frontend-take-home-service.fetch.com${url}`;
  const navigate = getNavigate();

  const response = await fetch(fullUrl, {
    ...options,
    credentials: "include",
  });

  if (!response.ok) {
    // If unauthorized, redirect to login
    if (response.status === 401) {
      navigate("/login");
      throw new Error(`API Error: ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      return response.json(); // Parse as JSON
    } else {
      return response.text(); // Return as plain text
    }
  }

  // Return the response data when the status is OK
  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return response.json(); // Parse as JSON
  } else {
    return response.text(); // Return as plain text
  }
};

export default apiClient;
