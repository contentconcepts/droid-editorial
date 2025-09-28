import { ROLE_CAPABILITIES } from "@/lib/data";

export function RoleOverview() {
  return (
    <section className="space-y-6">
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-fuchsia-600">Roles</p>
        <h2 className="text-3xl font-semibold text-slate-900">Purpose-built experiences for every role</h2>
        <p className="mt-2 text-sm text-slate-500">
          Authentication is email + password per role. Permissions scope dashboard visibility, API access, and storage privileges.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ROLE_CAPABILITIES.map((role) => (
          <article
            key={role.role}
            className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <header>
              <h3 className="text-xl font-semibold text-slate-900">{role.role}</h3>
            </header>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {role.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
