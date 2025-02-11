import apiClient from "./apiClient";
import { Dog } from "../types";

export const fetchDogs = async (
  filters: any,
  query?: string,
  page?: string
) => {
  let searchParams = new URLSearchParams(query || "");
  if (page) {
    searchParams.set("next", page || searchParams.get("next"));
  }

  // Build the search parameters based on filters
  if (!query) {
    if (filters.breeds?.length > 0) {
      filters.breeds.forEach((breed: string) =>
        searchParams.append("breeds", breed)
      );
    }
    if (filters.zipCodes?.length > 0) {
      filters.zipCodes.forEach((zipCode: string) =>
        searchParams.append("zipCodes", zipCode)
      );
    }
    if (filters.ageMin !== undefined) {
      searchParams.append("ageMin", filters.ageMin.toString());
    }
    if (filters.ageMax !== undefined) {
      searchParams.append("ageMax", filters.ageMax.toString());
    }
    if (filters.distance !== undefined) {
      searchParams.append("distance", filters.distance.toString());
    }
    searchParams.append("sort", filters.sort);
    searchParams.append("size", "24");
  }

  const finalQueryString = searchParams.toString();

  try {
    // Fetch the search results with the constructed query string
    const searchResults = await apiClient(`/dogs/search?${finalQueryString}`);

    // Fetch dog details based on the resulting IDs from the search
    const dogDetails = await apiClient("/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchResults.resultIds),
    });

    // Return the details and pagination
    return {
      dogs: dogDetails,
      pagination: {
        next: searchResults.next?.replace("/dogs/search?", ""),
        prev: searchResults.prev?.replace("/dogs/search?", ""),
      },
    };
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return { dogs: [], pagination: { next: null, prev: null } }; // Ensure consistent return type
  }
};
