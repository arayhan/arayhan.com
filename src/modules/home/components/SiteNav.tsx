const links = [
  { href: "#shipped", label: "Shipped" },
  { href: "#roles", label: "Roles" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav({ timezone }: { timezone: string }) {
  return (
    <nav aria-label="Sections" className="flex items-center justify-between gap-3 font-mono text-xs text-mute">
      <a href="#main" className="font-medium text-ink">
        arayhan
      </a>
      <ul className="hidden gap-5 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="transition-colors duration-200 hover:text-ink">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <span>Depok · {timezone}</span>
    </nav>
  );
}
