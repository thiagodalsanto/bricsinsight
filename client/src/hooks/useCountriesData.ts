/**
 * BRICSInsights — Hooks para dados dos países do BRICS
 * Usa dados estáticos extraídos da REST Countries API v5
 */

import { useMemo } from 'react';
import {
  CountryData,
  DerivedCountryData,
  GlobalStats,
  RegionStats,
} from '@/types/countries';
import { bricsMembersData } from '@/lib/bricsMockData';

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
 * Calcula estatísticas globais do BRICS
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
 * Hook principal: retorna dados do BRICS
 */
export function useGlobalStats() {
  const countries = useMemo(() => {
    return bricsMembersData.map((c) => enrichCountryData(c));
  }, []);

  const stats = useMemo(() => {
    const result = calculateGlobalStats(countries);
    console.log('[BRICS] Stats calculadas:', {
      totalCountries: result.totalCountries,
      uniqueLanguages: result.uniqueLanguages,
      languageDistribution: result.languageDistribution,
      topCountriesByPopulation: result.topCountriesByPopulation.map(c => ({ name: c.name.common, pop: c.population, area: c.area })),
    });
    return result;
  }, [countries]);

  return {
    countries,
    data: stats,
    isLoading: false,
    error: null,
  };
}

/**
 * Hook para buscar um país específico
 */
export function useCountry(cca3: string) {
  const { countries } = useGlobalStats();
  const country = useMemo(() => {
    return countries.find((c) => c.cca3 === cca3);
  }, [countries, cca3]);
  return country;
}

/**
 * Hook para buscar países por região
 */
export function useCountriesByRegion(region: string) {
  const { countries } = useGlobalStats();
  return useMemo(() => {
    return countries.filter((c: DerivedCountryData) => c.region === region);
  }, [countries, region]);
}
