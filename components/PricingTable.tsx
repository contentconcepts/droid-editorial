import { SERVICES } from "@/lib/data";

export function PricingTable() {
  return (
    <section className="space-y-6">
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-indigo-600">Pricing</p>
        <h2 className="text-3xl font-semibold text-slate-900">Transparent rates per service</h2>
        <p className="mt-2 text-sm text-slate-500">
          Currency switches automatically based on customer location. INR pricing shown for India, USD for the rest of the world.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300"
          >
            <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            <dl className="mt-4 space-y-3 text-sm text-slate-600">
              <div>
                <dt className="text-slate-500">Rate (USD)</dt>
                <dd className="text-lg font-semibold text-slate-900">${service.rateUSD.toFixed(3)} per word</dd>
              </div>
              <div>
                <dt className="text-slate-500">Rate (INR)</dt>
                <dd className="text-lg font-semibold text-slate-900">₹{service.rateINR.toFixed(2)} per word</dd>
              </div>
            </dl>
            <footer className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-700">
              Live countdown starts once payment webhook confirms status <span className="font-medium text-indigo-900">Paid</span>.
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
