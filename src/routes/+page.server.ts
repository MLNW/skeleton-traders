import { fetchShips } from '$lib/server/api';

export const load = async ({ fetch, url }) => {
  const page = +(url.searchParams.get('page') || 1);
  const limit = +(url.searchParams.get('limit') || 5);
  return {
    stream: {
      ships: fetchShips({ fetch, page, limit })
    }
  };
};
