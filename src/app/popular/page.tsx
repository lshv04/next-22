import Fetch from '@/components/Fetch';
import React from 'react';

const Popular: React.FC = () => {
  return (
    <div  className='bord mt-24 container mx-auto px-4'>
      <h1 className=' text-2xl text-white text-center'>Popular</h1>
      <p className='m-4 text-white text-center'>Explore popular movies</p>
      <Fetch endpoint="popular" />
    </div>
  );
};

export default Popular;
