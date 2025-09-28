import { INTEGRATIONS } from "@/lib/data";

export function IntegrationShowcase() {
  return (
    <section className="space-y-6">
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-sky-600">Integrations</p>
        <h2 className="text-3xl font-semibold text-slate-900">Connected for payments, notifications, and storage</h2>
        <p className="mt-2 text-sm text-slate-500">
          External services run through secured platform adapters with health monitoring and alerting surfaced to admins.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {INTEGRATIONS.map((integration) => (
          <article
            key={integration.name}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">{integration.name}</h3>
            <p className="mt-3 text-sm text-slate-600">{integration.summary}</p>
            <footer className="mt-6 text-xs text-slate-500">
              Observability hooks stream into admin dashboards for proactive incident response.
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
