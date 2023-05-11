import { PUBLIC_API_URL } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const logger = (async ({ event, resolve }) => {
  const start = Date.now();
  const response = resolve(event);
  const elapsedTime = Date.now() - start;

  console.log(`${event.request.method} ${event.url.pathname} (${elapsedTime}ms)`);

  return response;
}) satisfies Handle;

const authorize = (async ({ event, resolve }) => {
  const token = event.cookies.get('token');
  if (token) {
    const response = await fetch(`${PUBLIC_API_URL}/v2/my/agent`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const agent = (await response.json()).data;

    event.locals.user = { ...agent };
    if (event.url.pathname === '/login') {
      throw redirect(307, '/');
    }
  } else if (event.url.pathname !== '/login') {
    event.locals.user = {};
    throw redirect(307, '/login');
  }

  return resolve(event);
}) satisfies Handle;

export const handle = sequence(logger, authorize);

export const handleFetch = async ({ fetch, request, event }) => {
  const token = event.cookies.get('token');
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetch(request);
};
