import { fetchSystem, fetchWaypoints } from '$lib/server/api';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, params, url, setHeaders }) => {
  const page = +(url.searchParams.get('page') || 1);
  const limit = +(url.searchParams.get('limit') || 20);

  setHeaders({
    'Cache-Control': 'max-age=300'
  });

  return {
    system: await fetchSystem({ fetch, symbol: params.symbol }),
    stream: {
      waypoints: fetchWaypoints({ fetch, systemSymbol: params.symbol, page, limit })
    }
  };
};
