import React from 'react';
import { trustedClients, ClientPartner } from '../../content/clients';

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-10 bg-slate-50/70 border-b border-slate-200" aria-label="Trusted Enterprise Clients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
            Trusted by teams building what comes next
          </p>
        </div>

        {/* Clean client/logo monogram strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-center">
          {trustedClients.map((client: ClientPartner) => (
            <div
              key={client.id}
              className="flex flex-col items-center justify-center p-3.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors text-center group"
            >
              <span className="text-[11px] font-mono font-semibold text-slate-800 tracking-tight group-hover:text-[#0047BA] transition-colors">
                {client.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                {client.sector}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            [CMS CLIENT STRIP: Client partners and sector designations are managed in CMS database]
          </span>
        </div>
      </div>
    </section>
  );
};
