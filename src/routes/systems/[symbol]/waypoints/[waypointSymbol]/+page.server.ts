import { fetchMarket, fetchWaypoint } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'max-age=300'
  });

  return {
    waypoint: await fetchWaypoint({
      fetch,
      systemSymbol: params.symbol,
      waypointSymbol: params.waypointSymbol
    }),
    market: await fetchMarket({
      fetch,
      systemSymbol: params.symbol,
      waypointSymbol: params.waypointSymbol
    }).catch(() => {
      return { data: {} };
    })
  };
};
