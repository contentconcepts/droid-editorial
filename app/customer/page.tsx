import type { Metadata } from "next";
import Link from "next/link";
import { DASHBOARD_SECTIONS } from "@/lib/data";
import { MessageBoardPreview } from "@/components/MessageBoardPreview";

export const metadata: Metadata = {
  title: "Customer Dashboard · Editorial Workflow",
  description: "Customer experience with live job tracking, messaging, and secure file delivery.",
};

const customerStats = [
  { label: "Active jobs", value: "4", accent: "bg-indigo-100 text-indigo-700" },
  { label: "Awaiting payment", value: "1", accent: "bg-rose-100 text-rose-700" },
  { label: "Delivered", value: "12", accent: "bg-teal-100 text-teal-700" },
];

export default function CustomerDashboardPage() {
  const sections = DASHBOARD_SECTIONS.customer;

  return (
    <div className="space-y-12 py-16">
      <header className="space-y-4 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-2 text-slate-600 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-semibold text-slate-900">Customer workspace</h1>
          <Link
            href="/#quote"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Create new job
            <span aria-hidden>→</span>
          </Link>
        </div>
        <p className="text-sm text-slate-500">
          Review quotes, monitor status changes, collaborate with editors, and access final deliverables, all behind secure authentication.
        </p>
        <dl className="grid gap-4 sm:grid-cols-3">
          {customerStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</dt>
              <dd
                className={`mt-2 text-2xl font-semibold ${stat.accent}`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Experience highlights</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <header>
                <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{section.description}</p>
              </header>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {section.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Upcoming deliveries</h2>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Job ID</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Delivery ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="transition hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">SE0123082025</td>
                <td className="px-6 py-4">Substantive Editing</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">In Progress</span>
                </td>
                <td className="px-6 py-4 text-right">22 Sep, 18:00 IST</td>
              </tr>
              <tr className="transition hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">PR0220082025</td>
                <td className="px-6 py-4">Proofreading</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">Awaiting Payment</span>
                </td>
                <td className="px-6 py-4 text-right">Pending</td>
              </tr>
              <tr className="transition hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">RW0322052025</td>
                <td className="px-6 py-4">Rewriting</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs text-teal-700">Delivered</span>
                </td>
                <td className="px-6 py-4 text-right">12 Sep, 09:00 UTC</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <MessageBoardPreview />
    </div>
  );
}
