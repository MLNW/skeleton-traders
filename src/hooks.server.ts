import { login } from '$lib/server/api';
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
    const response = await login({ fetch, token });
    if (response.status === 401) {
      throw redirect(307, '/logout');
    }

    event.locals.user = { ...response.data };
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

  const start = Date.now();
  const response = await fetch(request);
  const elapsedTime = Date.now() - start;
  console.log(`${request.method} ${request.url} -> ${response.status} (${elapsedTime}ms) `);

  if (event.route.id !== '/login' && response.status === 401) {
    console.log('Token is invalid or expired, redirecting to /logout');
    throw redirect(307, '/logout');
  }

  return response;
};
