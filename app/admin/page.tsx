import type { Metadata } from "next";
import { DASHBOARD_SECTIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Tools · Editorial Workflow",
  description: "Administration suite for provisioning, compliance, and platform health monitoring.",
};

const integrationHealth = [
  { name: "Razorpay", status: "Operational", response: "212 ms", uptime: "99.99%" },
  { name: "Secure storage", status: "Operational", response: "145 ms", uptime: "99.95%" },
  { name: "Resend email", status: "Minor delays", response: "480 ms", uptime: "98.90%" },
];

export default function AdminDashboardPage() {
  const sections = DASHBOARD_SECTIONS.admin;

  return (
    <div className="space-y-12 py-16">
      <header className="space-y-4 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Admin control centre</h1>
        <p className="text-sm text-slate-500">
          Provision accounts, enforce governance, and keep integrations healthy across the editorial platform.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{section.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {section.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Integration status</h2>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-50 text-left uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Response</th>
                <th className="px-6 py-3">30-day uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {integrationHealth.map((integration) => (
                <tr key={integration.name} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{integration.name}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs text-teal-700">
                      {integration.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{integration.response}</td>
                  <td className="px-6 py-4">{integration.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Governance checklist</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
            <span className="text-slate-700">Verify quarterly access reviews with digitally signed approval trail.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
            <span className="text-slate-700">Export audit logs covering job downloads, role changes, and payment updates.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
            <span className="text-slate-700">Confirm storage retention policies align with contractual SLAs.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
