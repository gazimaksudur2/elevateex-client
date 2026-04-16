import { useEffect, useState } from "react";

const TrustedBy = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch("sponsors.json")
      .then((res) => res.json())
      .then((data) => setSponsors(data))
      .catch(() => {});
  }, []);

  if (!sponsors?.length) return null;

  return (
    <section className="py-12 bg-white border-y border-surface-100">
      <div className="section-container">
        <p className="text-center text-sm font-medium text-surface-400 uppercase tracking-wider mb-8">
          Trusted by leading organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {sponsors.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <img src={s?.logo_url} alt={s?.company_name} className="w-8 h-8 object-contain" />
              <span className="text-sm font-semibold text-surface-600">{s?.company_name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
