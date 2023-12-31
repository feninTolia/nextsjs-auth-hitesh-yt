'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-yellow-500 text-black">
        {token ? `${token}` : 'NO TOKEN'}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email verified</h2>
          <Link href={'/login'} className="text-blue-500">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-600">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
