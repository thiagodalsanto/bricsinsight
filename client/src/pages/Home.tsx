/**
 * BRICSInsights — Global Economic Bloc Dashboard
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Dashboard interativo com:
 * - KPIs do BRICS
 * - Análises econômicas
 * - Gráficos comparativos
 * - Dados dos 5 membros
 * - Drawer de detalhes
 */

import { useState } from 'react';
import { useGlobalStats } from '@/hooks/useCountriesData';
import { useFiltersSync, useFilteredCountries } from '@/hooks/useFiltersSync';
import { DerivedCountryData } from '@/types/countries';
import { KPICard } from '@/components/KPICard';
import { FilterPanel } from '@/components/FilterPanel';
import { CountriesTable } from '@/components/CountriesTable';
import { CountryDrawer } from '@/components/CountryDrawer';
import {
  PopulationByRegionChart,
  Top10CountriesChart,
  LanguageDistributionChart,
  AreaVsPopulationChart,
} from '@/components/Charts';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Globe, Users, Flag, DollarSign, MessageCircle, Zap } from 'lucide-react';

export default function Home() {
  const { data: stats, isLoading, countries } = useGlobalStats();
  const { filters, updateFilters, resetFilters, isInitialized } = useFiltersSync();
  const filteredCountries = useFilteredCountries(countries, filters);
  const [selectedCountry, setSelectedCountry] = useState<DerivedCountryData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCountrySelect = (country: DerivedCountryData) => {
    setSelectedCountry(country);
    setIsDrawerOpen(true);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Zap className="w-12 h-12 text-accent mx-auto animate-glow-pulse" />
          <p className="text-muted-foreground">Sincronizando dados globais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold">BRICSInsights</h1>
                <p className="text-xs text-muted-foreground">Global Economic Bloc Dashboard</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-xs"
            >
              Resetar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 space-y-12">
        {/* KPIs Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Métricas Globais</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                icon={<Flag className="w-5 h-5" />}
                label="Total de Países"
                value={stats.totalCountries}
                variant="accent"
              />
              <KPICard
                icon={<Users className="w-5 h-5" />}
                label="População Mundial"
                value={(stats.totalPopulation / 1e9).toFixed(2)}
                unit="bilhões"
              />
              <KPICard
                icon={<Globe className="w-5 h-5" />}
                label="Regiões"
                value={stats.totalRegions}
              />
              <KPICard
                icon={<DollarSign className="w-5 h-5" />}
                label="Moedas Únicas"
                value={stats.uniqueCurrencies}
              />
              <KPICard
                icon={<MessageCircle className="w-5 h-5" />}
                label="Idiomas Únicos"
                value={stats.uniqueLanguages}
              />
              <KPICard
                icon={<Zap className="w-5 h-5" />}
                label="Densidade Média"
                value={stats.averageDensity.toFixed(1)}
                unit="hab/km²"
              />
              <KPICard
                icon={<Globe className="w-5 h-5" />}
                label="Área Total"
                value={(stats.totalArea / 1e6).toFixed(2)}
                unit="M km²"
              />
              <KPICard
                icon={<Users className="w-5 h-5" />}
                label="Pop. Média por País"
                value={(stats.averagePopulation / 1e6).toFixed(1)}
                unit="M"
              />
            </div>
          ) : null}
        </section>

        <Separator className="bg-border" />

        {/* Filters and Table */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              stats={stats}
              filters={filters}
              onFiltersChange={updateFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Table */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Países</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredCountries.length} de {countries?.length || 0} países
                </p>
              </div>
              <CountriesTable
                countries={filteredCountries}
                onCountrySelect={handleCountrySelect}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Charts Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Análises</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PopulationByRegionChart stats={stats} />
            <Top10CountriesChart stats={stats} />
            <LanguageDistributionChart stats={stats} />
            <AreaVsPopulationChart stats={stats} />
          </div>
        </section>
      </main>

      {/* Country Drawer */}
      <CountryDrawer
        country={selectedCountry}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
