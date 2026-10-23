import { OrderDetailPage } from "../../../modules/order-detail";

export default function Page({ params }: { params: { id: string } }) {
  return <OrderDetailPage orderId={params.id} />;
}
