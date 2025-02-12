import apiClient from "./apiClient";

export const fetchDogs = async (
  filters: any,
  query?: string,
  pageNumber: number = 0 // Default to the first page
) => {
  // Prepare search parameters
  let searchParams = new URLSearchParams(query || "");

  // Set the pagination parameter
  const from = pageNumber * 24;
  searchParams.set("from", from.toString());

  // Assemble filters if it's the initial request
  if (filters.breeds?.length > 0) {
    filters.breeds.forEach((breed: string) =>
      searchParams.append("breeds", breed)
    );
  }

  if (filters.zipCode) {
    const zipCodes = new Set();
    zipCodes.add(filters.zipCode);

    if (filters.distance) {
      const locationData = await apiClient("/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Array.from(zipCodes)),
      });

      if (!locationData.length) throw new Error("Invalid ZIP Code");

      const { latitude, longitude } = locationData[0];
      const earthRadius = 3958.8; // Radius of the Earth in miles

      const latInRadians = latitude * (Math.PI / 180);
      const latOffset = filters.distance / earthRadius;
      const lonOffset =
        filters.distance / (earthRadius * Math.cos(latInRadians));

      // Calculate bounding box for nearby ZIP codes
      const boundingBox = {
        bottom_left: {
          lat: latitude - latOffset * (180 / Math.PI),
          lon: longitude - lonOffset * (180 / Math.PI),
        },
        top_right: {
          lat: latitude + latOffset * (180 / Math.PI),
          lon: longitude + lonOffset * (180 / Math.PI),
        },
      };

      const nearbyZipsResponse = await apiClient("/locations/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          geoBoundingBox: boundingBox,
          size: 100, // Fetch up to 100 ZIP codes
        }),
      });

      // Limit the number of ZIP codes to 50
      const maxZipCodes = 50;
      nearbyZipsResponse.results.forEach(
        (loc: { zip_code: string }, index: number) => {
          if (index < maxZipCodes) {
            zipCodes.add(loc.zip_code);
          }
        }
      );
    }

    Array.from(zipCodes).forEach((zipCode) =>
      searchParams.append("zipCodes", zipCode as string)
    );
  }

  // Append other filters
  if (filters.ageMin !== undefined) {
    searchParams.append("ageMin", filters.ageMin.toString());
  }
  if (filters.ageMax !== undefined) {
    searchParams.append("ageMax", filters.ageMax.toString());
  }
  if (filters.distance !== undefined) {
    searchParams.append("distance", filters.distance.toString());
  }
  searchParams.append("sort", filters.sort || "breed:asc");
  searchParams.append("size", "24");

  const finalQueryString = searchParams.toString();

  try {
    const searchResults = await apiClient(`/dogs/search?${finalQueryString}`);

    // Process dog details
    const dogDetails = await apiClient("/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchResults.resultIds),
    });

    // Return the results with pagination data
    return {
      dogs: dogDetails,
      pagination: {
        next: pageNumber + 1,
        prev: pageNumber > 0 ? pageNumber - 1 : null,
      },
      total: searchResults.total,
    };
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return { dogs: [], pagination: { next: null, prev: null }, total: 0 };
  }
};
