/**
 * GeoInsight — Tipos para dados da REST Countries API
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 */

export interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { common: string; official: string }>;
  };
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: Record<string, { name: string; symbol: string }>;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  capital?: string[];
  altSpellings?: string[];
  region: string;
  subregion?: string;
  languages?: Record<string, string>;
  translations?: Record<string, { official: string; common: string }>;
  latlng?: [number, number];
  landlocked?: boolean;
  borders?: string[];
  area?: number;
  demonyms?: Record<string, { f: string; m: string }>;
  flag?: string;
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  population?: number;
  gini?: Record<string, number>;
  fifa?: string;
  timezones?: string[];
  continents?: string[];
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  startOfWeek?: string;
  capitalInfo?: {
    latlng?: [number, number];
  };
  postalCode?: {
    format?: string;
    regex?: string;
  };
}

export interface DerivedCountryData extends CountryData {
  populationDensity?: number;
  languageCount?: number;
  currencyCount?: number;
}

export interface RegionStats {
  region: string;
  countryCount: number;
  totalPopulation: number;
  totalArea: number;
  averagePopulation: number;
  averageArea: number;
  averageDensity: number;
  countries: DerivedCountryData[];
}

export interface GlobalStats {
  totalCountries: number;
  totalPopulation: number;
  totalArea: number;
  totalRegions: number;
  uniqueCurrencies: number;
  uniqueLanguages: number;
  averagePopulation: number;
  averageArea: number;
  averageDensity: number;
  regions: RegionStats[];
  topCountriesByPopulation: DerivedCountryData[];
  topCountriesByArea: DerivedCountryData[];
  languageDistribution: Record<string, number>;
  currencyDistribution: Record<string, number>;
}

export interface FilterState {
  regions: string[];
  populationRange: [number, number];
  languages: string[];
  currencies: string[];
  searchQuery: string;
}
