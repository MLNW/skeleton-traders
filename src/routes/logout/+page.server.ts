import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
  cookies.delete('token', { path: '/' });

  redirect(303, '/login');
};

export const actions = {
  default: ({ cookies }) => {
    cookies.delete('token', { path: '/' });

    redirect(303, '/login');
  }
};
