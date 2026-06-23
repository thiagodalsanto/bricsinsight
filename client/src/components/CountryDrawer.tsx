/**
 * GeoInsight — Drawer de Detalhes do País
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Exibe informações detalhadas:
 * - Bandeira e nome
 * - Capital, região, população
 * - Idiomas, moedas
 * - Vizinhos
 * - Coordenadas
 */

import { DerivedCountryData } from '@/types/countries';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Users, MapPin, DollarSign, MessageCircle, Compass } from 'lucide-react';

interface CountryDrawerProps {
  country: DerivedCountryData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CountryDrawer({ country, isOpen, onClose }: CountryDrawerProps) {
  if (!country) return null;

  const formatNumber = (num: number | undefined) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-2xl">
        <DrawerHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{country.flags?.svg || '🌍'}</span>
            <div>
              <DrawerTitle className="text-3xl">{country.name.common}</DrawerTitle>
              <DrawerDescription className="text-base">{country.name.official}</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="px-6 pb-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Capital */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Capital
              </div>
              <p className="text-lg font-medium">{country.capital?.[0] || 'N/A'}</p>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Globe className="w-4 h-4" />
                Região
              </div>
              <p className="text-lg font-medium">{country.region}</p>
            </div>

            {/* Population */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Users className="w-4 h-4" />
                População
              </div>
              <p className="text-lg font-mono font-medium text-accent">
                {formatNumber(country.population)}
              </p>
            </div>

            {/* Area */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Compass className="w-4 h-4" />
                Área
              </div>
              <p className="text-lg font-mono font-medium">
                {formatNumber(country.area)} km²
              </p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Density */}
          {country.populationDensity && (
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Densidade Populacional
              </div>
              <p className="text-lg font-mono font-medium text-accent">
                {country.populationDensity.toFixed(2)} hab/km²
              </p>
            </div>
          )}

          {/* Languages */}
          {country.languages && Object.keys(country.languages).length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                Idiomas
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(country.languages).map(([code, name]) => (
                  <Badge key={code} variant="secondary" className="font-mono">
                    {name} ({code})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Currencies */}
          {country.currencies && Object.keys(country.currencies).length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                Moedas
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(country.currencies).map(([code, data]) => (
                  <Badge key={code} variant="secondary" className="font-mono">
                    {code} - {data.symbol}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Borders */}
          {country.borders && country.borders.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Países Vizinhos
              </div>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <Badge key={border} variant="outline" className="font-mono">
                    {border}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Coordinates */}
          {country.latlng && (
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Coordenadas
              </div>
              <p className="text-sm font-mono text-muted-foreground">
                {country.latlng[0].toFixed(4)}°, {country.latlng[1].toFixed(4)}°
              </p>
            </div>
          )}

          {/* Timezones */}
          {country.timezones && country.timezones.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fusos Horários
              </div>
              <div className="flex flex-wrap gap-2">
                {country.timezones.map((tz) => (
                  <Badge key={tz} variant="outline" className="font-mono text-xs">
                    {tz}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
