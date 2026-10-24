import type { Role } from "@/domain/portfolio";

export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <ul>
      {roles.map((role) => (
        <li
          key={`${role.company}-${role.years}`}
          className="grid gap-x-6 gap-y-0.5 border-b border-rule py-3.5 sm:grid-cols-(--grid-role) sm:items-baseline"
        >
          <span className="font-mono text-xs text-mute">{role.years}</span>
          <span className="font-semibold">{role.company}</span>
          <span className="text-mute">{role.title}</span>
        </li>
      ))}
    </ul>
  );
}
