import { fetchShip } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'max-age=60'
  });

  return {
    ship: await fetchShip({ fetch, symbol: params.id })
  };
};
