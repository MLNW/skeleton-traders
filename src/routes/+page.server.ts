import { fetchShips } from '$lib/server/api';

export const load = async ({ fetch }) => {
  return {
    ships: await fetchShips({ fetch, limit: 10 })
  };
};
