'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Response succsess', response.data);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log('Signup failed', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{loading ? 'Loading' : 'Login'}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 text-black mb-4"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 text-black mb-4"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="border p-2 rounded-lg mb-4 "
        disabled={buttonDisabled}
      >
        {buttonDisabled ? 'No login' : 'Login'}
      </button>
      <Link href={'/signup'}>Visit signup page</Link>
    </div>
  );
};

export default LoginPage;
