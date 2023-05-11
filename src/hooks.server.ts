import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const logger = (async ({ event, resolve }) => {
  const start = Date.now();
  const response = resolve(event);
  const elapsedTime = Date.now() - start;

  console.log(`${event.request.method} ${event.url.pathname} (${elapsedTime}ms)`)

  return response;
}) satisfies Handle;

export const handle = sequence(logger);
