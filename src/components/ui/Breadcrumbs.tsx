import React, { useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  className = '',
}) => {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  // Inject BreadcrumbList JSON-LD into the head
  useEffect(() => {
    const scriptId = 'breadcrumbs-jsonld';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: allItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.href ? `https://www.codeologyai.com${item.href}` : undefined,
      })),
    };

    scriptElement.textContent = JSON.stringify(jsonLd);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={`text-xs font-mono py-3.5 ${className}`}>
      <ol className="flex flex-wrap items-center space-x-1.5 sm:space-x-2 text-slate-500">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center space-x-1.5 sm:space-x-2">
              {index === 0 ? (
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="flex items-center hover:text-[#0047BA] transition-colors focus:outline-none focus:ring-1 focus:ring-[#0047BA] rounded px-1 cursor-pointer"
                  title="Return to Home"
                >
                  <Home className="w-3.5 h-3.5 mr-1" />
                  <span>Home</span>
                </button>
              ) : isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs"
                >
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => item.href && onNavigate(item.href)}
                  className="hover:text-[#0047BA] transition-colors focus:outline-none focus:ring-1 focus:ring-[#0047BA] rounded px-1 cursor-pointer"
                >
                  {item.label}
                </button>
              )}

              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
