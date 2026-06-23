/**
 * GeoInsight — Skeleton Loaders
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Componentes de carregamento com animação
 */

import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function KPICardSkeleton() {
  return (
    <Card className="p-6 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </Card>
  );
}

export function KPIGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <KPICardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border">
      <Skeleton className="h-8 w-8 rounded" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24 ml-auto" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-12" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24 ml-auto" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      {[...Array(5)].map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card className="p-6 space-y-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-64 w-full rounded" />
    </Card>
  );
}

export function ChartsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <ChartSkeleton key={i} />
      ))}
    </div>
  );
}
