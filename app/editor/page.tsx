import type { Metadata } from "next";
import { DASHBOARD_SECTIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Editor Workspace · Editorial Workflow",
  description: "Focused queue for editors to deliver revisions and manage feedback loops.",
};

const queue = [
  {
    jobId: "SE0524092025",
    title: "Executive thought leadership article",
    dueIn: "18h",
    status: "In Progress",
    service: "Substantive Editing",
  },
  {
    jobId: "PR1123082025",
    title: "Graduate application essay",
    dueIn: "30h",
    status: "Changes Requested",
    service: "Proofreading",
  },
];

export default function EditorDashboardPage() {
  const sections = DASHBOARD_SECTIONS.editor;

  return (
    <div className="space-y-12 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Editor workspace</h1>
        <p className="text-sm text-slate-500">
          Prioritised queues, countdown timers, and version-controlled submissions keep focus on quality delivery.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Active queue</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {queue.map((item) => (
            <article key={item.jobId} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
                  <span>{item.jobId}</span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">{item.status}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.service}</p>
              </div>
              <footer className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Due in {item.dueIn}</span>
                <button className="rounded-full border border-indigo-200 px-4 py-1 text-indigo-700 transition hover:border-indigo-300">
                  Open workspace
                </button>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Workflow tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{section.description}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {section.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-teal-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Recent feedback</h2>
        <ul className="mt-4 space-y-4 text-sm text-slate-600">
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            Manager requested tone adjustments on <span className="font-medium text-slate-900">PR1123082025</span>. Deadline extended by 12 hours.
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            Customer acknowledged receipt of <span className="font-medium text-slate-900">SE0524092025</span> revision draft.
          </li>
        </ul>
      </section>
    </div>
  );
}
