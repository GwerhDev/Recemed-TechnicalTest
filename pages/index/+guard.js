import { render } from 'vike/abort';

export const guard = async (pageContext) => {
  const cookieHeader = pageContext?.headers?.cookie || '';
  const userData = cookieHeader
    .split('; ')
    .find(row => row.startsWith('user-data='))
    ?.split('=')[1] || null;

  if (!userData) {
    // Redirige al login si no se encuentra el userData
    throw render('/login');
  }
};
