export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface FetchLocation {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface SearchParams {
  breed: string;
  zip: string;
  ageMin: number;
  ageMax: number;
}
