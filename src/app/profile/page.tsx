'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log('Logout response', response);
      toast.success('Logout successfully');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Profile</h1>
      <hr />
      <h2>ProfilePage</h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 border p-2 rounded-lg mb-4 mt-4"
        onClick={onLogout}
      >
        Logout
      </button>
      <Toaster />
    </div>
  );
};

export default ProfilePage;
