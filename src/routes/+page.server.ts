import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
  const response = await fetch(`${PUBLIC_API_URL}/v2/my/agent`);
  if (!response.ok) {
    throw error(response.status, await response.json());
  }

  const agent = (await response.json()).data;

  return {
    agent
  };
};
