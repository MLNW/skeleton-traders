import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

type FetchFunction = typeof fetch;

type FetchOptions = {
  fetch: FetchFunction;
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: object;
  queryParams?: QueryParams;
};

type QueryParams = {
  [key: string]: string | number | boolean | undefined;
};

const constructUrl = (url: string, queryParams?: QueryParams) => {
  const urlWithParams = new URL(url);
  for (const key in queryParams) {
    const value = queryParams[key];
    if (value !== undefined) {
      urlWithParams.searchParams.append(key, value.toString());
    }
  }
  return urlWithParams.toString();
};

export const genericFetch = async ({
  fetch,
  url,
  method = 'GET',
  headers = {},
  body = undefined,
  queryParams = undefined
}: FetchOptions) => {
  const urlWithParams = constructUrl(url, queryParams);
  const response = await fetch(urlWithParams, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const reason = await response.json();
    throw error(response.status, { ...reason.error });
  }

  return response.json();
};

export const fetchAgent = async ({ fetch }: { fetch: FetchFunction }) => {
  return genericFetch({ fetch, url: `${PUBLIC_API_URL}/v2/my/agent` });
};

export const login = async ({ fetch, token }: { fetch: FetchFunction; token: string }) => {
  return genericFetch({
    fetch,
    url: `${PUBLIC_API_URL}/v2/my/agent`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const register = async ({
  fetch,
  name,
  faction
}: {
  fetch: FetchFunction;
  name: string;
  faction: string;
}) => {
  return genericFetch({
    fetch,
    url: `${PUBLIC_API_URL}/v2/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: { symbol: name, faction }
  });
};

export const fetchShips = async ({
  fetch,
  page,
  limit
}: {
  fetch: FetchFunction;
  page?: number;
  limit?: number;
}) => {
  return genericFetch({
    fetch,
    url: `${PUBLIC_API_URL}/v2/my/ships`,
    queryParams: { page, limit }
  });
};

export const fetchShip = async ({ fetch, symbol }: { fetch: FetchFunction; symbol: string }) => {
  return genericFetch({ fetch, url: `${PUBLIC_API_URL}/v2/my/ships/${symbol}` });
};

export const fetchFactions = async ({ fetch }: { fetch: FetchFunction }) => {
  return genericFetch({ fetch, url: `${PUBLIC_API_URL}/v2/factions` });
};
