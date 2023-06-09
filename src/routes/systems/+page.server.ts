import { fetchSystems } from '$lib/server/api';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, url, setHeaders }) => {
  const page = +(url.searchParams.get('page') || 1);
  const limit = +(url.searchParams.get('limit') || 10);

  setHeaders({
    'Cache-Control': 'max-age=300'
  });

  return {
    stream: {
      systems: fetchSystems({ fetch, page, limit })
    }
  };
};
