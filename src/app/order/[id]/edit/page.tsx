import { OrderFormPage } from "../../../../modules/order-form";

export default function Page({ params }: { params: { id: string } }) {
  return <OrderFormPage orderId={params.id} />;
}
