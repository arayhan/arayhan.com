import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Rayhan</h1>
      <p>Scaffolded and ready. Run <code>/bootstrap-project</code> in Claude Code to fill in PRODUCT.md, PRD.md, and DESIGN.md.</p>
      <p><Link href="/order">Order surfaces example</Link> · <Link href="/transaction">Transactions</Link></p>
    </main>
  );
}
