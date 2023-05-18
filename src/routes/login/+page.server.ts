import { fetchFactions, login, register } from '$lib/server/api.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ fetch, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'max-age=3600'
  });

  return {
    stream: {
      // TODO: Handle pagination if there are ever more than 10 factions
      factions: fetchFactions({ fetch })
    }
  };
};

export const actions = {
  login: async ({ fetch, request, cookies }) => {
    const formData = await request.formData();
    const token = formData.get('token')?.toString();

    if (!token) {
      return fail(400, { message: 'Token is required' });
    }

    try {
      const response = await login({ fetch, token: token });
      cookies.set('token', token);

      return {
        agent: response.data
      };
    } catch (e) {
      let error: string = e.body.message;
      const searchFor = `: "${token}"`;
      if (error.endsWith(searchFor)) {
        error = error.split(searchFor)[0];
      }
      return fail(e.status, { login: { error } });
    }
  },
  register: async ({ fetch, request, cookies }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const faction = formData.get('faction');

    if (!name || !faction) {
      return fail(400, { message: 'Name and faction are required' });
    }

    try {
      const response = await register({
        fetch,
        name: name.toString(),
        faction: faction.toString()
      });
      const agent = response.data;

      cookies.set('token', agent.token);
      return { agent };
    } catch (e) {
      return fail(e.status, { register: { error: e.body.message } });
    }
  }
};
