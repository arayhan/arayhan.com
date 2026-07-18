import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip api routes, Next internals, and files with extensions (e.g. /cv/*.pdf)
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
