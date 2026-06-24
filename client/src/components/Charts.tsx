/**
 * BRICSInsights — Componentes de Gráficos
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Gráficos com Recharts:
 * - População por região (BarChart)
 * - Top 5 países (BarChart)
 * - Distribuição de idiomas (BarChart)
 * - Área vs População (ScatterChart)
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { GlobalStats } from '@/types/countries';

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

export function PopulationByRegionChart({ stats }: ChartsProps) {
  if (!stats || stats.regions.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">População por Região</h3>
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Sem dados disponíveis
        </div>
      </Card>
    );
  }

  const data = stats.regions.map((region) => ({
    name: region.region,
    population: region.totalPopulation,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">População por Região</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 40, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3050" />
          <XAxis 
            dataKey="name" 
            stroke="#8B92B0" 
            angle={-45} 
            textAnchor="end" 
            height={80}
          />
          <YAxis stroke="#8B92B0" />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1A1F3A',
              border: '2px solid #00D9FF',
              borderRadius: '0.5rem',
            }}
            formatter={(value: any) => value.toLocaleString()}
          />
          <Bar dataKey="population" fill="#00D9FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function Top10CountriesChart({ stats }: ChartsProps) {
  if (!stats || stats.topCountriesByPopulation.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Países Mais Populosos</h3>
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Sem dados disponíveis
        </div>
      </Card>
    );
  }

  const data = stats.topCountriesByPopulation.map((country) => ({
    name: country.name.common,
    population: country.population || 0,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Países Mais Populosos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 0, left: -40, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3050" />
          <XAxis type="number" stroke="#8B92B0" />
          <YAxis dataKey="name" type="category" stroke="#8B92B0" width={140} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1A1F3A',
              border: '2px solid #00D9FF',
              borderRadius: '0.5rem',
            }}
            formatter={(value: any) => value.toLocaleString()}
          />
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
      name: name.toUpperCase(),
      value,
    }));

  if (data.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Idiomas por Países</h3>
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Sem dados disponíveis
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Idiomas por Países</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3050" />
          <XAxis type="number" stroke="#8B92B0" />
          <YAxis dataKey="name" type="category" stroke="#8B92B0" width={40} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1A1F3A',
              border: '2px solid #00D9FF',
              borderRadius: '0.5rem',
            }}
            formatter={(value: any) => `${value} país(es)`}
          />
          <Bar dataKey="value" fill="#0066FF" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const density = data.area > 0 ? (data.population / data.area).toFixed(1) : 'N/A';
    return (
      <div
        style={{
          backgroundColor: '#1A1F3A',
          border: '2px solid #00D9FF',
          borderRadius: '0.5rem',
          padding: '8px',
        }}
      >
        <p style={{ color: '#00D9FF', fontSize: '12px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
          {data.name}
        </p>
        <p style={{ color: '#0099FF', fontSize: '12px', margin: '2px 0' }}>
          Área: {(data.area).toLocaleString()} km²
        </p>
        <p style={{ color: '#0099FF', fontSize: '12px', margin: '2px 0' }}>
          População: {(data.population).toLocaleString()}
        </p>
        <p style={{ color: '#F0F2FF', fontSize: '12px', margin: '2px 0' }}>
          Densidade: {density} hab/km²
        </p>
      </div>
    );
  }
  return null;
};

export function AreaVsPopulationChart({ stats }: ChartsProps) {
  if (!stats) return null;

  const data = stats.topCountriesByPopulation.map((country) => ({
    name: country.name.common,
    area: country.area || 0,
    population: country.population || 0,
  }));

  if (data.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Área vs População</h3>
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Sem dados disponíveis
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Área vs População</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3050" />
          <XAxis
            dataKey="area"
            name="Área (km²)"
            stroke="#8B92B0"
            type="number"
            scale="log"
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            dataKey="population"
            name="População"
            stroke="#8B92B0"
            type="number"
            scale="log"
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip
            content={<CustomScatterTooltip />}
            cursor={{ fill: 'rgba(0, 217, 255, 0.1)' }}
          />
          <Scatter name="Países" data={data} fill="#00D9FF" />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
}
