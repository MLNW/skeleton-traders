import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
  const response = await fetch(`${PUBLIC_API_URL}/v2/factions`);
  if (!response.ok) {
    throw error(502, 'SpaceTrader API is not available!');
  }
  // TODO: Handle pagination if there are ever more than 10 factions
  const factions = (await response.json()).data;

  return {
    factions
  };
};
