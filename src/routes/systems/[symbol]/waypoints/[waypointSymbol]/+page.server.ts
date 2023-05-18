import { fetchWaypoint } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  return {
    waypoint: await fetchWaypoint({
      fetch,
      systemSymbol: params.symbol,
      waypointSymbol: params.waypointSymbol
    })
  };
};
