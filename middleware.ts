// export { withAuth } from 'next-auth/middleware'
export { auth as middleware } from './lib/auth'
//! Using the authorize fx of auth.ts

export const config = { matcher: '/((?!api|_next/static|_next/image|fonts|favicon.ico).*)' }