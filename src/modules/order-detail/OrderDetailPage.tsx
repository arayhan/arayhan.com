"use client";

import Link from "next/link";
import { useOrderDetail } from "./order-detail.query";
import { canSubmit, totalCents } from "@/domain";

export function OrderDetailPage({ orderId }: { orderId: string }) {
  const { order, transactions, loading } = useOrderDetail(orderId);

  if (loading) return <p>Loading order…</p>;
  if (!order) return <p>No order {orderId}.</p>;

  return (
    <>
      <h3>
        {order.item} × {order.qty}
      </h3>
      <p>
        Status: {order.status}
        {canSubmit(order) ? " — ready to submit" : null}
      </p>
      <p>
        <Link href={`/order/${order.id}/edit`}>Edit</Link>
      </p>

      <h4>Transactions</h4>
      {transactions.length === 0 ? (
        <p>None yet.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.kind} — {(transaction.amountCents / 100).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <p>Net: {(totalCents(transactions) / 100).toFixed(2)}</p>
    </>
  );
}
