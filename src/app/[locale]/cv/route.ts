import { redirect } from 'next/navigation';

/** /en/cv → the CV PDF in public/. Keeps a stable, shareable /cv URL. */
export function GET() {
  redirect('/cv/CV-Ahmed-Rayhan-Primadedas.pdf');
}
