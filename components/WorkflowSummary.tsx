import { WORKFLOW_STEPS } from "@/lib/data";

export function WorkflowSummary() {
  return (
    <section className="space-y-6">
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-amber-600">Workflow</p>
        <h2 className="text-3xl font-semibold text-slate-900">End-to-end editorial journey</h2>
        <p className="mt-2 text-sm text-slate-500">
          Each phase triggers automated emails, dashboard updates, and audit logs. Customers always know who has ownership of the next step.
        </p>
      </div>
      <div className="space-y-4">
        {WORKFLOW_STEPS.map((step, index) => (
          <article
            key={step.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <header className="flex flex-col gap-2 text-slate-900 md:flex-row md:items-center md:justify-between">
              <span className="text-sm uppercase tracking-wide text-indigo-600">Phase {index + 1}</span>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
            </header>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {step.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-teal-500" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
