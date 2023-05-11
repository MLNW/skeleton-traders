import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const actions = {
  login: async ({ fetch, request, cookies }) => {
    const formData = await request.formData();
    const token = formData.get('token');

    const response = await fetch(`${PUBLIC_API_URL}/v2/my/agent`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw error(response.status, await response.json());
    }

    cookies.set('token', token);

    const agent = (await response.json()).data;

    return {
      agent
    };
  },
  register: async ({ fetch, request, cookies }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const faction = formData.get('faction');

    const response = await fetch('https://api.spacetraders.io/v2/register', {
      method: 'POST',
      body: JSON.stringify({ symbol: name, faction: faction }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw error(response.status, await response.json());
    }

    const agent = (await response.json()).data;

    cookies.set('token', data.token);

    return {
      agent
    };
  }
};
