import { OrderFormPage } from "../../../modules/order-form";

// Wrapped rather than re-exported: a Next page component's props must match
// PageProps, and OrderFormPage takes an optional orderId of its own.
export default function Page() {
  return <OrderFormPage />;
}
