import { render } from 'vike/abort';

export const guard = async (pageContext) => {
  const cookieHeader = pageContext?.headers?.cookie || "";
  const token = cookieHeader.split('; ').find(row => row.startsWith('token='))
                             ?.split('=')[1];

  if (!token) {
    throw render('/login');
  }
};
