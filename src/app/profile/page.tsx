'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState('');

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

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log('res', res.data);
    setData(res.data.data._id);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Profile</h1>
      <hr />
      <h2>ProfilePage</h2>
      <hr />
      {data ? <Link href={`/profile/${data}`}>Go to your profile</Link> : null}
      <button
        className="bg-blue-500 hover:bg-blue-700 border p-2 rounded-lg mb-4 mt-4"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
