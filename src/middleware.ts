import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/parties/:partyId/boards',
    '/api/:path*',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api)(.*)', '/parties/create'],
};
