import { defineMiddleware } from 'astro:middleware';

// Correção do login do Keystatic em produção (Vercel).
// O Keystatic não lê os cabeçalhos de proxy da Vercel e acaba montando o
// endereço de retorno (redirect_uri) como "localhost", o que quebra o login
// com o GitHub. Este interceptador reescreve o endereço usando o host público
// real (x-forwarded-host) só nas rotas de OAuth do Keystatic.
// Ref.: https://github.com/Thinkmill/keystatic/issues/1022
export const onRequest = defineMiddleware(async (context, next) => {
  const isOAuthRoute =
    context.url.pathname.includes('/github/oauth/') ||
    context.url.pathname.includes('/github/login');

  if (isOAuthRoute) {
    const forwardedHost = context.request.headers.get('x-forwarded-host');
    const forwardedProto = context.request.headers.get('x-forwarded-proto');

    if (forwardedHost && forwardedProto) {
      const correctUrl = new URL(context.url);
      correctUrl.protocol = forwardedProto;
      correctUrl.host = forwardedHost;

      const newRequest = new Request(correctUrl.toString(), {
        method: context.request.method,
        headers: context.request.headers,
        body: context.request.body,
        // @ts-ignore - necessário para body em requisições stream
        duplex: 'half',
      });

      Object.defineProperty(context, 'url', { value: correctUrl, writable: false });
      Object.defineProperty(context, 'request', { value: newRequest, writable: false });
    }
  }

  return next();
});
