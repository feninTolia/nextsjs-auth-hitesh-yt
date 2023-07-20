'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log('email', email);
      await axios.post('/api/users/forgotpassword', { email });
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-4xl mb-16">Forgot Password</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="flex flex-col gap-2">
          Enter your email
          <input
            className="p-2 text-black mb-4"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>

        <button
          type="submit"
          className="border p-2 rounded-lg mt-12 bg-gray-500 hover:bg-gray-600 transition-all"
        >
          Send Email
        </button>
      </form>
      <Link href={'/login'} className="text-blue-300 mt-4">
        Go to Login
      </Link>
    </div>
  );
};

export default ForgotPassword;
