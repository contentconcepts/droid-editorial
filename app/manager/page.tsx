import type { Metadata } from "next";
import { DASHBOARD_SECTIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Manager Console · Editorial Workflow",
  description: "Operations view to assign editors, review submissions, and maintain SLAs.",
};

const queue = [
  {
    jobId: "SE0424082025",
    service: "Substantive Editing",
    wordCount: "3,800",
    status: "Paid",
    due: "24h",
    editor: "Unassigned",
  },
  {
    jobId: "PR0821102025",
    service: "Proofreading",
    wordCount: "2,100",
    status: "In Progress",
    due: "12h",
    editor: "I. Chen",
  },
  {
    jobId: "RW1123092025",
    service: "Rewriting",
    wordCount: "7,600",
    status: "Changes Requested",
    due: "36h",
    editor: "S. Kapoor",
  },
];

const capacity = [
  { editor: "I. Chen", allocated: 3, capacity: 4 },
  { editor: "S. Kapoor", allocated: 2, capacity: 3 },
  { editor: "L. Mendes", allocated: 1, capacity: 2 },
];

export default function ManagerDashboardPage() {
  const sections = DASHBOARD_SECTIONS.manager;

  return (
    <div className="space-y-12 py-16">
      <header className="space-y-4 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Manager console</h1>
        <p className="text-sm text-slate-500">
          Monitor paid queues, match editors intelligently, and gate quality before customer delivery.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{section.description}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Assignment queue</h2>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-50 text-left uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Job ID</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Word count</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Due</th>
                <th className="px-6 py-3">Editor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue.map((item) => (
                <tr key={item.jobId} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.jobId}</td>
                  <td className="px-6 py-4">{item.service}</td>
                  <td className="px-6 py-4">{item.wordCount}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.due}</td>
                  <td className="px-6 py-4 text-slate-900">{item.editor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Editor capacity snapshot</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {capacity.map((slot) => (
            <article key={slot.editor} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{slot.editor}</h3>
              <p className="mt-2 text-sm text-slate-600">{slot.allocated} / {slot.capacity} jobs allocated</p>
              <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-teal-500"
                  style={{ width: `${(slot.allocated / slot.capacity) * 100}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Quality gate checklist</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {sections[1].highlights.map((item) => (
            <li key={item} className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                <span className="text-slate-700">{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
