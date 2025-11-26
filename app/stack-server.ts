import { StackServerApp } from '@stackframe/stack';

export const stackServer = new StackServerApp({
  tokenStore: 'nextjs-cookie',
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY!,
  urls: { signIn: '/sign-in' },
});
