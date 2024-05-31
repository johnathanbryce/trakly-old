import { useState } from 'react';
import { useRouter } from 'next/router';
import { useClerk } from '@clerk/clerk-react';

const useAuth = () => {
  //const { signIn, signOut, deleteUser } = useClerk();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // await signIn(email, password);
      setSuccess('Logged in successfully');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // await signOut();
      setSuccess('Logged out successfully');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // await deleteUser();
      setSuccess('Account deleted successfully');
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    deleteAccount,
    loading,
    error,
    success,
  };
};
