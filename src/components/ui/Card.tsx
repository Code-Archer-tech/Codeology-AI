import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'subtle';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const base = 'bg-white rounded-lg transition-all duration-200';
  const variants = {
    default: 'border border-slate-200 shadow-2xs',
    elevated: 'border border-slate-200 shadow-sm hover:shadow-md',
    bordered: 'border border-slate-300',
    subtle: 'bg-slate-50 border border-slate-200/70',
  };

  return (
    <div className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={twMerge(clsx('p-5 sm:p-6 border-b border-slate-100', className))} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={twMerge(clsx('p-5 sm:p-6', className))} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(clsx('p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 rounded-b-lg', className))}
      {...props}
    >
      {children}
    </div>
  );
};
