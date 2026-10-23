"use client";

import { useRouter } from "next/navigation";
import { useOrderForm } from "./order-form.query";
import { OrderForm } from "./components/OrderForm";

/** One page for both create and edit — `orderId` is what tells them apart. */
export function OrderFormPage({ orderId }: { orderId?: string }) {
  const router = useRouter();
  const { order, loading, saving, save, mode } = useOrderForm(orderId);

  if (loading) return <p>Loading order…</p>;
  if (mode === "edit" && !order) return <p>No order {orderId}.</p>;

  return (
    <>
      <h3>{mode === "edit" ? "Edit order" : "New order"}</h3>
      <OrderForm
        order={order}
        saving={saving}
        onSubmit={(input) => {
          void save(input).then((saved) => router.push(`/order/${saved.id}`));
        }}
      />
    </>
  );
}
