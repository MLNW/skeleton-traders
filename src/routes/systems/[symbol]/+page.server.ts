import { fetchSystem } from '$lib/server/api';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  return {
    system: await fetchSystem({ fetch, symbol: params.symbol })
  };
};
