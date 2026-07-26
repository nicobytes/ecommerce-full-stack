import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

const trustProxyHeaders =
  process.env['TRUST_PROXY_HEADERS'] === 'true'
    ? (['x-forwarded-host', 'x-forwarded-proto'] as const)
    : undefined;

const angularApp = new AngularAppEngine(
  trustProxyHeaders ? { trustProxyHeaders: [...trustProxyHeaders] } : undefined,
);

export const reqHandler = createRequestHandler(async (req) => {
  const res = await angularApp.handle(req);
  return res ?? new Response('Page not found.', { status: 404 });
});

export default { fetch: reqHandler };
