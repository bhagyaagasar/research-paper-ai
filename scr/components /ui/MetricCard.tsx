import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'alert' | 'success' | 'warning';
  className?: string;
}

export default function MetricCard({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default',
  className = '',
}: MetricCardProps) {
  const variantClasses = {
    default: 'border-border',
    alert: 'border-danger/30 bg-danger/5',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
  };

  const iconVariantClasses = {
    default: 'bg-primary/10 text-primary',
    alert: 'bg-danger/10 text-danger',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground';

  return (
    <div className={`
      bg-card border rounded-xl p-5 card-hover
      ${variantClasses[variant]}
      ${className}
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconVariantClasses[variant]}`}>
          <Icon size={18} />
        </div>
        {trend && trendValue && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon size={12} />
            {trendValue}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
        {subValue && (
          <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
        )}
        <p className="text-xs font-500 text-muted-foreground mt-2 uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}