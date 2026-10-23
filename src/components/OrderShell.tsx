import type { ReactNode } from "react";

// Rendered by all three order surfaces (list, detail, form) through the shared
// app/order/layout.tsx, so it is NOT owned by any one of them — that second
// consumer is exactly what moves a component down to src/components/.
// See docs/architecture.md > "Module-owned components".
export function OrderShell({ children }: { children: ReactNode }) {
  return (
    <section>
      <h2>Orders</h2>
      {children}
    </section>
  );
}
