export interface PlacesResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Context {
  id: string;
  text: string;
  wikidata?: string;
  short_code?: ShortCode;
}

export enum ShortCode {
  Ar = 'ar',
  ArB = 'AR-B',
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  foursquare: string;
  landmark: boolean;
  address: string;
  category: string;
  maki?: string;
}
