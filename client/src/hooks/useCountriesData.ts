/**
 * GeoInsight — Hooks para dados de países
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Gerencia dados da REST Countries API com cache via TanStack Query
 * Calcula dados derivados: densidade, idiomas únicos, etc.
 */

import { useQuery } from '@tanstack/react-query';
import {
  CountryData,
  DerivedCountryData,
  GlobalStats,
  RegionStats,
} from '@/types/countries';

const API_BASE_URL = 'https://api.restcountries.com/countries';
const API_KEY = 'rc_live_6a8abcad9efa434ba77c77f3d388ee6c';

/**
 * Calcula dados derivados para um país
 */
function enrichCountryData(country: CountryData): DerivedCountryData {
  const area = country.area || 0;
  const population = country.population || 0;
  const density = area > 0 ? population / area : 0;

  return {
    ...country,
    populationDensity: density,
    languageCount: Object.keys(country.languages || {}).length,
    currencyCount: Object.keys(country.currencies || {}).length,
  };
}

/**
 * Fetch todos os países usando fetch nativo
 */
async function fetchAllCountries(): Promise<DerivedCountryData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/v5`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const countries = result?.data?.objects || [];

    return countries
      .map((country: any) => enrichCountryData(normalizeCountryData(country)))
      .filter((c: DerivedCountryData) => c.cca3);
  } catch (error) {
    console.warn('Erro ao buscar países da API, usando dados mock:', error);
    const { mockCountries } = await import('@/lib/mockData');
    return mockCountries.map((country: CountryData) => enrichCountryData(country));
  }
}

/**
 * Normaliza dados da API v5 para o formato esperado
 */
function normalizeCountryData(country: any): CountryData {
  const codes = country.codes || {};
  const names = country.names || {};
  const commonName = names.common || 'Unknown';
  const officialName = names.official || commonName;
  const area = country.area?.kilometers || country.area || 0;

  return {
    name: {
      common: commonName,
      official: officialName,
    },
    cca2: codes.alpha_2 || '',
    cca3: codes.alpha_3 || '',
    region: country.region || 'Unknown',
    subregion: country.subregion,
    capital: country.capitals || [],
    area: area,
    population: country.population,
    languages: country.languages || {},
    currencies: country.currencies || {},
    flags: { svg: country.flag || '🌍' },
    latlng: country.coordinates,
    timezones: country.timezones || [],
    borders: country.borders || [],
  };
}

/**
 * Calcula estatísticas globais a partir dos dados de países
 */
function calculateGlobalStats(countries: DerivedCountryData[]): GlobalStats {
  const regionMap = new Map<string, DerivedCountryData[]>();
  const languageCount = new Map<string, number>();
  const currencyCount = new Map<string, number>();

  let totalPopulation = 0;
  let totalArea = 0;

  countries.forEach((country) => {
    totalPopulation += country.population || 0;
    totalArea += country.area || 0;

    // Regiões
    const region = country.region || 'Unknown';
    if (!regionMap.has(region)) {
      regionMap.set(region, []);
    }
    regionMap.get(region)!.push(country);

    // Idiomas
    Object.keys(country.languages || {}).forEach((lang) => {
      languageCount.set(lang, (languageCount.get(lang) || 0) + 1);
    });

    // Moedas
    Object.keys(country.currencies || {}).forEach((curr) => {
      currencyCount.set(curr, (currencyCount.get(curr) || 0) + 1);
    });
  });

  // Construir RegionStats
  const regions: RegionStats[] = Array.from(regionMap.entries()).map(
    ([region, regionCountries]) => {
      const regionPopulation = regionCountries.reduce((sum, c) => sum + (c.population || 0), 0);
      const regionArea = regionCountries.reduce((sum, c) => sum + (c.area || 0), 0);
      return {
        region,
        countryCount: regionCountries.length,
        totalPopulation: regionPopulation,
        totalArea: regionArea,
        averagePopulation: regionCountries.length > 0 ? regionPopulation / regionCountries.length : 0,
        averageArea: regionCountries.length > 0 ? regionArea / regionCountries.length : 0,
        averageDensity: regionArea > 0 ? regionPopulation / regionArea : 0,
        countries: regionCountries,
      };
    }
  );

  const topCountriesByPopulation = [...countries]
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 10);

  const topCountriesByArea = [...countries]
    .sort((a, b) => (b.area || 0) - (a.area || 0))
    .slice(0, 10);

  return {
    totalCountries: countries.length,
    totalPopulation,
    totalArea,
    totalRegions: regionMap.size,
    uniqueLanguages: languageCount.size,
    uniqueCurrencies: currencyCount.size,
    averageDensity: totalArea > 0 ? totalPopulation / totalArea : 0,
    averagePopulation: countries.length > 0 ? totalPopulation / countries.length : 0,
    averageArea: countries.length > 0 ? totalArea / countries.length : 0,
    regions,
    languageDistribution: Object.fromEntries(languageCount),
    currencyDistribution: Object.fromEntries(currencyCount),
    topCountriesByPopulation,
    topCountriesByArea,
  };
}

/**
 * Hook principal: busca e cacheia dados de países
 */
export function useGlobalStats() {
  const { data: countries, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 60, // 1 hora
    gcTime: 1000 * 60 * 60 * 24, // 24 horas
  });

  const stats = countries ? calculateGlobalStats(countries) : null;

  return {
    countries: countries || [],
    data: stats,
    isLoading,
    error,
  };
}

/**
 * Hook para buscar um país específico
 */
export function useCountry(cca3: string) {
  const { countries } = useGlobalStats();
  const country = countries.find((c) => c.cca3 === cca3);
  return country;
}

/**
 * Hook para buscar países por região
 */
export function useCountriesByRegion(region: string) {
  const { countries } = useGlobalStats();
  return countries.filter((c) => c.region === region);
}
