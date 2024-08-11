import { useCallback } from 'react';

export function useNavigate() {
  const navigate = useCallback((route) => {
    if (route) {
      window.location.href = route;
    }
  }, []);

  return navigate;
}