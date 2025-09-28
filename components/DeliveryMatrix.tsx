import { DELIVERY_WINDOWS } from "@/lib/data";

const SERVICE_NAMES: Record<string, string> = {
  proofreading: "Proofreading",
  substantive: "Substantive Editing",
  rewriting: "Rewriting",
};

export function DeliveryMatrix() {
  return (
    <section className="space-y-6">
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-teal-600">Delivery</p>
        <h2 className="text-3xl font-semibold text-slate-900">Guaranteed turnaround windows</h2>
        <p className="mt-2 text-sm text-slate-500">
          Delivery timers begin as soon as Razorpay confirms payment. Managers and editors receive automated alerts for approaching deadlines.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {Object.entries(DELIVERY_WINDOWS).map(([service, windows]) => (
          <article
            key={service}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{SERVICE_NAMES[service]}</h3>
            <table className="mt-4 w-full text-left text-sm text-slate-700">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="pb-2">Words</th>
                  <th className="pb-2 text-right">Delivery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {windows.map((window) => (
                  <tr key={`${window.min}-${window.max}`}
                      className="transition hover:bg-slate-50">
                    <td className="py-2 text-slate-800">
                      {window.min.toLocaleString()} – {window.max.toLocaleString()}
                    </td>
                    <td className="py-2 text-right text-indigo-700">{window.hours} hours</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        ))}
      </div>
    </section>
  );
}
