import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-expedia-card border border-expedia-border rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}
