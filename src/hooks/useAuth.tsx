
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/auth';

export const useAuth = (requiredAuth = false, redirectPath = '/login') => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (requiredAuth && !isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, requiredAuth, redirectPath]);

  return { isAuthenticated };
};
