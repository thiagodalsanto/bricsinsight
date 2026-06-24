/**
 * GeoInsight — Painel de Filtros
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Permite filtrar por:
 * - Região
 * - Faixa de população
 * - Idioma
 * - Moeda
 * - Busca por nome
 */

import { useState, useCallback } from 'react';
import { FilterState, GlobalStats } from '@/types/countries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { X, Filter } from 'lucide-react';

interface FilterPanelProps {
  stats: GlobalStats | null;
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

export function FilterPanel({
  stats,
  filters,
  onFiltersChange,
  onReset,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionToggle = useCallback(
    (region: string) => {
      const newRegions = filters.regions.includes(region)
        ? filters.regions.filter((r) => r !== region)
        : [...filters.regions, region];
      onFiltersChange({ regions: newRegions });
    },
    [filters.regions, onFiltersChange]
  );

  const handleLanguageToggle = useCallback(
    (language: string) => {
      const newLanguages = filters.languages.includes(language)
        ? filters.languages.filter((l) => l !== language)
        : [...filters.languages, language];
      onFiltersChange({ languages: newLanguages });
    },
    [filters.languages, onFiltersChange]
  );

  const handleCurrencyToggle = useCallback(
    (currency: string) => {
      const newCurrencies = filters.currencies.includes(currency)
        ? filters.currencies.filter((c) => c !== currency)
        : [...filters.currencies, currency];
      onFiltersChange({ currencies: newCurrencies });
    },
    [filters.currencies, onFiltersChange]
  );

  const handlePopulationChange = useCallback(
    (value: number[]) => {
      onFiltersChange({ populationRange: [value[0], value[1]] });
    },
    [onFiltersChange]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      onFiltersChange({ searchQuery: query });
    },
    [onFiltersChange]
  );

  if (!stats) return null;

  const topLanguages = Object.entries(stats.languageDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([lang]) => lang);

  const topCurrencies = Object.entries(stats.currencyDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([curr]) => curr);

  const hasActiveFilters =
    filters.regions.length > 0 ||
    filters.languages.length > 0 ||
    filters.currencies.length > 0 ||
    filters.searchQuery !== '' ||
    filters.populationRange[0] > 0 ||
    filters.populationRange[1] < Infinity;

  const maxPopulation = stats.topCountriesByPopulation[0]?.population || 1000000000;
  const currentMin = Math.max(0, filters.populationRange[0]);
  const currentMax = Math.min(maxPopulation, filters.populationRange[1]);

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={hasActiveFilters ? 'default' : 'outline'}
        className="w-full justify-start gap-2"
      >
        <Filter className="w-4 h-4" />
        Filtros
        {hasActiveFilters && (
          <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
            {filters.regions.length + filters.languages.length + filters.currencies.length}
          </span>
        )}
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <Card className="p-6 space-y-6 animate-slide-up">
          {/* Search */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider">Buscar</Label>
            <Input
              placeholder="Nome do país, capital..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Regions */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider">Regiões</Label>
            <div className="grid grid-cols-2 gap-2">
              {stats.regions.map((region) => (
                <label
                  key={region.region}
                  className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
                >
                  <Checkbox
                    checked={filters.regions.includes(region.region)}
                    onCheckedChange={() => handleRegionToggle(region.region)}
                  />
                  <span className="text-sm">{region.region}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {region.countryCount}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Population Range */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider">
              População: {currentMin.toLocaleString()} - {currentMax.toLocaleString()}
            </Label>
            <Slider
              min={0}
              max={maxPopulation}
              step={10000000}
              value={[currentMin, currentMax]}
              onValueChange={handlePopulationChange}
              className="w-full"
            />
          </div>

          {/* Currencies */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider">Moedas</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {topCurrencies.map((curr) => (
                <label
                  key={curr}
                  className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
                >
                  <Checkbox
                    checked={filters.currencies.includes(curr)}
                    onCheckedChange={() => handleCurrencyToggle(curr)}
                  />
                  <span className="text-sm font-mono">{curr}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              onClick={onReset}
              variant="outline"
              className="w-full gap-2 text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
              Limpar Filtros
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
