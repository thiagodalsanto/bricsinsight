/**
 * GeoInsight — Componentes de Gráficos
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Gráficos com Recharts:
 * - População por região (BarChart)
 * - Top 10 países (BarChart)
 * - Distribuição de idiomas (PieChart)
 * - Área vs População (ScatterChart)
 */

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { GlobalStats, DerivedCountryData } from '@/types/countries';

interface ChartsProps {
  stats: GlobalStats | null;
}

const COLORS = [
  '#00D9FF',
  '#0099FF',
  '#0066FF',
  '#0052CC',
  '#003D99',
  '#00B8E6',
  '#0088CC',
  '#006699',
];

const tooltipStyle = {
  backgroundColor: '#1A1F3A',
  border: '1px solid #2A3050',
  borderRadius: '0.65rem',
};

const labelStyle = { color: '#F0F2FF' };

export function PopulationByRegionChart({ stats }: ChartsProps) {
  if (!stats) return null;

  const data = stats.regions.map((region) => ({
    name: region.region,
    population: region.totalPopulation,
    countries: region.countryCount,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">População por Região</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3050" />
          <XAxis dataKey="name" stroke="#8B92B0" angle={-45} textAnchor="end" height={80} />
          <YAxis stroke="#8B92B0" />
          <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
          <Bar dataKey="population" fill="#00D9FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function Top10CountriesChart({ stats }: ChartsProps) {
  if (!stats) return null;

  const data = stats.topCountriesByPopulation.map((country) => ({
    name: country.name.common,
    population: country.population || 0,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Top 10 Países Mais Populosos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3050" />
          <XAxis type="number" stroke="#8B92B0" />
          <YAxis dataKey="name" type="category" stroke="#8B92B0" width={120} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
          <Bar dataKey="population" fill="#0099FF" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function LanguageDistributionChart({ stats }: ChartsProps) {
  if (!stats) return null;

  const data = Object.entries(stats.languageDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({
      name,
      value,
    }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Top Idiomas (Países)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} (${value})`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function AreaVsPopulationChart({ stats }: ChartsProps) {
  if (!stats) return null;

  const data = stats.topCountriesByArea.slice(0, 20).map((country) => ({
    name: country.name.common,
    area: country.area || 0,
    population: country.population || 0,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Área vs População (Top 20)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3050" />
          <XAxis
            dataKey="area"
            name="Área (km²)"
            stroke="#8B92B0"
            scale="log"
            type="number"
          />
          <YAxis
            dataKey="population"
            name="População"
            stroke="#8B92B0"
            scale="log"
            type="number"
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            cursor={{ fill: 'rgba(0, 217, 255, 0.1)' }}
          />
          <Scatter name="Países" data={data} fill="#00D9FF" />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
}
