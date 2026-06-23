/**
 * GeoInsight — Hook para sincronizar filtros com URL
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Permite:
 * - Persistência de filtros na URL
 * - Compartilhamento de dashboards
 * - Navegação com back/forward
 */

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'wouter';
import { FilterState } from '@/types/countries';

const DEFAULT_FILTERS: FilterState = {
  regions: [],
  populationRange: [0, Infinity],
  languages: [],
  currencies: [],
  searchQuery: '',
};

/**
 * Codifica filtros em string de query
 */
function encodeFilters(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.regions.length > 0) {
    params.set('regions', filters.regions.join(','));
  }

  if (filters.populationRange[0] > 0 || filters.populationRange[1] < Infinity) {
    params.set('pop', `${filters.populationRange[0]},${filters.populationRange[1]}`);
  }

  if (filters.languages.length > 0) {
    params.set('langs', filters.languages.join(','));
  }

  if (filters.currencies.length > 0) {
    params.set('curr', filters.currencies.join(','));
  }

  if (filters.searchQuery) {
    params.set('q', filters.searchQuery);
  }

  return params.toString();
}

/**
 * Decodifica string de query em filtros
 */
function decodeFilters(queryString: string): Partial<FilterState> {
  const params = new URLSearchParams(queryString);
  const filters: Partial<FilterState> = {};

  const regions = params.get('regions');
  if (regions) {
    filters.regions = regions.split(',');
  }

  const pop = params.get('pop');
  if (pop) {
    const [min, max] = pop.split(',').map(Number);
    filters.populationRange = [min, max];
  }

  const langs = params.get('langs');
  if (langs) {
    filters.languages = langs.split(',');
  }

  const curr = params.get('curr');
  if (curr) {
    filters.currencies = curr.split(',');
  }

  const q = params.get('q');
  if (q) {
    filters.searchQuery = q;
  }

  return filters;
}

/**
 * Hook para sincronizar filtros com URL
 */
export function useFiltersSync() {
  const [location, setLocation] = useLocation();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializa filtros a partir da URL
  useEffect(() => {
    const queryString = location.split('?')[1] || '';
    const decodedFilters = decodeFilters(queryString);
    setFilters((prev) => ({ ...prev, ...decodedFilters }));
    setIsInitialized(true);
  }, []);

  // Atualiza URL quando filtros mudam
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      const queryString = encodeFilters(updated);
      const newLocation = queryString ? `/?${queryString}` : '/';
      setLocation(newLocation);
      return updated;
    });
  }, [setLocation]);

  // Reset de filtros
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setLocation('/');
  }, [setLocation]);

  return {
    filters,
    updateFilters,
    resetFilters,
    isInitialized,
  };
}

/**
 * Hook para filtrar países baseado no estado de filtros
 */
export function useFilteredCountries(
  countries: any[] | undefined,
  filters: FilterState
) {
  return useMemo(() => {
    if (!countries) return [];

    return countries.filter((country) => {
      // Filtro por região
      if (filters.regions.length > 0 && !filters.regions.includes(country.region)) {
        return false;
      }

      // Filtro por população
      const population = country.population || 0;
      if (population < filters.populationRange[0] || population > filters.populationRange[1]) {
        return false;
      }

      // Filtro por idioma
      if (filters.languages.length > 0) {
        const countryLanguages = country.languages ? Object.values(country.languages) : [];
        const hasLanguage = filters.languages.some((lang) =>
          countryLanguages.some((cl) => (cl as string).toLowerCase().includes(lang.toLowerCase()))
        );
        if (!hasLanguage) return false;
      }

      // Filtro por moeda
      if (filters.currencies.length > 0) {
        const countryCurrencies = country.currencies ? Object.keys(country.currencies) : [];
        const hasCurrency = filters.currencies.some((curr) =>
          countryCurrencies.includes(curr.toUpperCase())
        );
        if (!hasCurrency) return false;
      }

      // Filtro por busca
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const name = country.name.common.toLowerCase();
        const official = country.name.official.toLowerCase();
        const capital = (country.capital?.[0] || '').toLowerCase();
        if (!name.includes(query) && !official.includes(query) && !capital.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [countries, filters]);
}
