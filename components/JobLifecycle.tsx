import { JOB_STATUSES } from "@/lib/data";

export function JobLifecycle() {
  return (
    <section className="space-y-6">
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-violet-600">Lifecycle</p>
        <h2 className="text-3xl font-semibold text-slate-900">Operational status pipeline</h2>
        <p className="mt-2 text-sm text-slate-500">
          Status transitions are automated, webhook-driven, and fully audit logged. Managers can request changes, looping the job back to <span className="text-indigo-700">In Progress</span> as required.
        </p>
      </div>
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {JOB_STATUSES.map((status, index) => (
          <li
            key={status.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
              <span>Stage {index + 1}</span>
              <span className="text-indigo-700">{status.label}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{status.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
