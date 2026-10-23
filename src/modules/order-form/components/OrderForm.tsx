import { useState, type FormEvent } from "react";
import type { Order, OrderInput } from "@/domain";

// Only order-form renders this. It stays inside the module until a second surface
// needs it. See docs/architecture.md > "Module-owned components".
export function OrderForm({
  order,
  saving,
  onSubmit,
}: {
  order: Order | null;
  saving: boolean;
  onSubmit: (input: OrderInput) => void;
}) {
  const [item, setItem] = useState(order?.item ?? "");
  const [qty, setQty] = useState(String(order?.qty ?? 1));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: FormEvent) => {
    event.preventDefault();
    // No schema library in this project, so the checks are inline. Enable the Zod
    // add-on and this becomes a single orderFormSchema.safeParse call.
    const next: Record<string, string> = {};
    if (!item.trim()) next.item = "Item is required";
    const parsedQty = Number(qty);
    if (!Number.isInteger(parsedQty) || parsedQty < 1) next.qty = "Qty must be at least 1";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setErrors({});
    onSubmit({ item: item.trim(), qty: parsedQty });
  };

  return (
    <form onSubmit={submit}>
      <p>
        <label htmlFor="item">Item</label>
        <input id="item" value={item} onChange={(event) => setItem(event.target.value)} />
        {errors.item ? <span role="alert">{errors.item}</span> : null}
      </p>
      <p>
        <label htmlFor="qty">Qty</label>
        <input id="qty" type="number" min={1} value={qty} onChange={(event) => setQty(event.target.value)} />
        {errors.qty ? <span role="alert">{errors.qty}</span> : null}
      </p>
      <button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save order"}
      </button>
    </form>
  );
}
