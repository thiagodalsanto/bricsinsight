/**
 * GeoInsight — Hook para fetch e processamento de dados de países
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Implementa:
 * - Cache com React Query
 * - Cálculos derivados (densidade, idiomas, moedas)
 * - Agregações por região
 * - Distribuição de dados
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  CountryData,
  DerivedCountryData,
  GlobalStats,
  RegionStats,
} from '@/types/countries';

const API_BASE_URL = 'https://api.restcountries.com/v3.1';

/**
 * Calcula dados derivados para um país
 */
function enrichCountryData(country: CountryData): DerivedCountryData {
  const populationDensity = country.area && country.population
    ? Math.round((country.population / country.area) * 100) / 100
    : 0;

  const languageCount = country.languages ? Object.keys(country.languages).length : 0;
  const currencyCount = country.currencies ? Object.keys(country.currencies).length : 0;

  return {
    ...country,
    populationDensity,
    languageCount,
    currencyCount,
  };
}

/**
 * Fetch todos os países
 */
async function fetchAllCountries(): Promise<DerivedCountryData[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data.map((country: CountryData) => enrichCountryData(country));
  } catch (error) {
    console.warn('Erro ao buscar países da API, usando dados mock:', error);
    const { mockCountries } = await import('@/lib/mockData');
    return mockCountries.map((country: CountryData) => enrichCountryData(country));
  }
}

/**
 * Calcula estatísticas globais a partir dos dados de países
 */
function calculateGlobalStats(countries: DerivedCountryData[]): GlobalStats {
  const regions = new Map<string, DerivedCountryData[]>();
  const uniqueCurrencies = new Set<string>();
  const uniqueLanguages = new Set<string>();
  const languageDistribution: Record<string, number> = {};
  const currencyDistribution: Record<string, number> = {};

  // Agrupa por região e coleta moedas/idiomas
  countries.forEach((country) => {
    const region = country.region || 'Unknown';
    if (!regions.has(region)) {
      regions.set(region, []);
    }
    regions.get(region)!.push(country);

    // Coleta moedas
    if (country.currencies) {
      Object.entries(country.currencies).forEach(([code, data]) => {
        uniqueCurrencies.add(code);
        currencyDistribution[code] = (currencyDistribution[code] || 0) + 1;
      });
    }

    // Coleta idiomas
    if (country.languages) {
      Object.entries(country.languages).forEach(([code, name]) => {
        uniqueLanguages.add(name);
        languageDistribution[name] = (languageDistribution[name] || 0) + 1;
      });
    }
  });

  // Calcula estatísticas por região
  const regionStats: RegionStats[] = Array.from(regions.entries()).map(
    ([region, regionCountries]) => {
      const totalPopulation = regionCountries.reduce((sum, c) => sum + (c.population || 0), 0);
      const totalArea = regionCountries.reduce((sum, c) => sum + (c.area || 0), 0);
      const averagePopulation = totalPopulation / regionCountries.length;
      const averageArea = totalArea / regionCountries.length;
      const averageDensity = totalArea > 0 ? totalPopulation / totalArea : 0;

      return {
        region,
        countryCount: regionCountries.length,
        totalPopulation,
        totalArea,
        averagePopulation,
        averageArea,
        averageDensity,
        countries: regionCountries.sort((a, b) => (b.population || 0) - (a.population || 0)),
      };
    }
  );

  // Calcula estatísticas globais
  const totalPopulation = countries.reduce((sum, c) => sum + (c.population || 0), 0);
  const totalArea = countries.reduce((sum, c) => sum + (c.area || 0), 0);
  const averagePopulation = totalPopulation / countries.length;
  const averageArea = totalArea / countries.length;
  const averageDensity = totalArea > 0 ? totalPopulation / totalArea : 0;

  // Top 10 por população e área
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
    totalRegions: regions.size,
    uniqueCurrencies: uniqueCurrencies.size,
    uniqueLanguages: uniqueLanguages.size,
    averagePopulation,
    averageArea,
    averageDensity,
    regions: regionStats.sort((a, b) => b.totalPopulation - a.totalPopulation),
    topCountriesByPopulation,
    topCountriesByArea,
    languageDistribution,
    currencyDistribution,
  };
}

/**
 * Hook para fetch de todos os países com cache
 */
export function useAllCountries() {
  return useQuery({
    queryKey: ['countries', 'all'],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 60, // 1 hora
    gcTime: 1000 * 60 * 60 * 24, // 24 horas
  });
}

/**
 * Hook para estatísticas globais
 */
export function useGlobalStats() {
  const { data: countries, isLoading, error } = useAllCountries();

  const stats = countries ? calculateGlobalStats(countries) : null;

  return {
    data: stats,
    isLoading,
    error,
    countries,
  };
}

/**
 * Hook para buscar um país específico
 */
export function useCountryByCode(code: string) {
  return useQuery({
    queryKey: ['countries', 'byCode', code],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/alpha/${code}`);
      return enrichCountryData(response.data[0]);
    },
    enabled: !!code,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

/**
 * Hook para buscar países por região
 */
export function useCountriesByRegion(region: string) {
  return useQuery({
    queryKey: ['countries', 'byRegion', region],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/region/${region}`);
      return response.data.map((country: CountryData) => enrichCountryData(country));
    },
    enabled: !!region,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
