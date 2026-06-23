/**
 * GeoInsight — Componente KPI Card
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Exibe métricas globais com:
 * - Ícone + valor + label
 * - Efeito glow em hover
 * - Animação de entrada
 */

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface KPICardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  variant?: 'default' | 'accent';
}

export function KPICard({
  icon,
  label,
  value,
  unit,
  description,
  variant = 'default',
}: KPICardProps) {
  return (
    <Card
      className={`
        p-6 flex flex-col gap-3 animate-slide-up
        transition-all duration-200
        ${variant === 'accent'
          ? 'border-accent/50 bg-gradient-to-br from-card to-card/50 hover:border-accent hover:shadow-lg hover:shadow-cyan-500/20'
          : 'hover:border-accent/30 hover:shadow-lg hover:shadow-cyan-500/10'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
          {label}
        </span>
        <div className="text-accent text-xl opacity-70">{icon}</div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold font-mono text-accent">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      )}
    </Card>
  );
}
