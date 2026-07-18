import { notFound } from 'next/navigation';

/** Any path that matches no real route lands on the styled locale 404. */
export default function CatchAllNotFound() {
  notFound();
}
