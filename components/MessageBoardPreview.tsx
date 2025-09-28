import { MESSAGE_SAMPLE } from "@/lib/data";

export function MessageBoardPreview() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 pb-4 text-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-rose-600">Collaboration</p>
          <h2 className="text-2xl font-semibold">Job message board</h2>
        </div>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-rose-700">
          Notifications via Resend
        </span>
      </header>
      <ul className="space-y-4">
        {MESSAGE_SAMPLE.map((message) => (
          <li key={message.timestamp} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
              <span>{message.author}</span>
              <time>{message.timestamp}</time>
            </div>
            <p className="mt-2 text-slate-800">{message.content}</p>
          </li>
        ))}
      </ul>
      <footer className="mt-6 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Secure, job-scoped conversations keep context preserved for every revision cycle.</p>
        <button
          type="button"
          className="rounded-lg bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-400"
        >
          Open thread
        </button>
      </footer>
    </section>
  );
}
