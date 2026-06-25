/**
 * GeoInsight — Tabela de Países
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Exibe lista de países com:
 * - Ordenação (população, nome, área)
 * - Paginação
 * - Busca com debounce
 * - Clique para drill-down
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { DerivedCountryData } from '@/types/countries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface CountriesTableProps {
  countries: DerivedCountryData[];
  onCountrySelect: (country: DerivedCountryData) => void;
  isLoading?: boolean;
}

type SortKey = 'name' | 'population' | 'area' | 'density';
type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export function CountriesTable({
  countries,
  onCountrySelect,
  isLoading = false,
}: CountriesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('population');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  }, [sortKey, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [countries]);

  const sortedCountries = useMemo(() => {
    const sorted = [...countries].sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (sortKey) {
        case 'name':
          aVal = a.name.common.toLowerCase();
          bVal = b.name.common.toLowerCase();
          break;
        case 'population':
          aVal = a.population || 0;
          bVal = b.population || 0;
          break;
        case 'area':
          aVal = a.area || 0;
          bVal = b.area || 0;
          break;
        case 'density':
          aVal = a.populationDensity || 0;
          bVal = b.populationDensity || 0;
          break;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [countries, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedCountries.length / ITEMS_PER_PAGE);
  const paginatedCountries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCountries.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedCountries, currentPage]);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronsUpDown className="w-4 h-4 opacity-40" />;
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-accent" />
    ) : (
      <ChevronDown className="w-4 h-4 text-accent" />
    );
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">Carregando dados...</div>
      </Card>
    );
  }

  if (countries.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-muted-foreground">Nenhum país encontrado com os filtros aplicados</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead
                className="pl-6 cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  País
                  <SortIcon column="name" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-accent transition-colors text-right"
                onClick={() => handleSort('population')}
              >
                <div className="flex items-center justify-end gap-2">
                  População
                  <SortIcon column="population" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-accent transition-colors text-right"
                onClick={() => handleSort('area')}
              >
                <div className="flex items-center justify-end gap-2">
                  Área (km²)
                  <SortIcon column="area" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-accent transition-colors text-right"
                onClick={() => handleSort('density')}
              >
                <div className="flex items-center justify-end gap-2">
                  Densidade
                  <SortIcon column="density" />
                </div>
              </TableHead>
              <TableHead className="pr-6 text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCountries.map((country) => (
              <TableRow
                key={country.cca3}
                className="border-border hover:bg-card/50 transition-colors"
              >
                <TableCell className="pl-6 font-medium">
                  <div className="flex items-center gap-2">
                    {country.flags?.svg ? (
                      <img src={country.flags.svg} alt={country.name.common} className="w-6 h-4 object-cover rounded" />
                    ) : (
                      <span className="text-lg">🌍</span>
                    )}
                    {country.name.common}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {(country.population || 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {(country.area || 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {country.populationDensity?.toFixed(1) || 'N/A'}/km²
                </TableCell>
                <TableCell className="pr-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCountrySelect(country);
                    }}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
