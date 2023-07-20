'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ResetPassword = () => {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [paswords, setPasswords] = useState({
    confirmPassword: '',
    password: '',
  });

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (paswords.password === paswords.confirmPassword) {
        await axios.post('/api/users/resetpassword', {
          token,
          password: paswords.password,
        });
      } else {
        console.log('Password not equal');
      }

      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-4xl mb-16">Create New Password</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="password">New Password</label>
        <input
          className="p-2 text-black mb-4"
          type="text"
          id="password"
          value={paswords.password}
          onChange={(e) =>
            setPasswords({ ...paswords, password: e.target.value })
          }
          placeholder="Password"
        />

        <label htmlFor="confirmPassword">Confirm password </label>
        <input
          className="p-2 text-black mb-4"
          type="text"
          id="confirmPassword"
          value={paswords.confirmPassword}
          onChange={(e) =>
            setPasswords({ ...paswords, confirmPassword: e.target.value })
          }
          placeholder="Confirm password"
        />
        <button
          type="submit"
          className="border p-2 rounded-lg mt-12 bg-gray-500 hover:bg-gray-600 transition-all"
        >
          Confirm
        </button>
      </form>
      <h2 className="mt-10 p-2 bg-yellow-500 text-black">
        {token ? `${token}` : 'NO TOKEN'}
      </h2>
    </div>
  );
};

export default ResetPassword;
