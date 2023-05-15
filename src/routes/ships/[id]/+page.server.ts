import { fetchShip } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  return {
    stream: {
      ship: fetchShip({ fetch, symbol: params.id })
    }
  };
};