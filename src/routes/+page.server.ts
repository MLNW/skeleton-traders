import { fetchShip, fetchShips } from '$lib/server/api';

export const load = async ({ fetch }) => {
  return {
    stream: {
      ships: fetchShips({ fetch, limit: 5 }),
      // TODO: Remove as this is only a demonstration of a failure
      ship: fetchShip({ fetch, symbol: 'MLNOTW-2' })
    }
  };
};
