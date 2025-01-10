import Fetch from '@/components/Fetch';
import React from 'react';

const TopRated: React.FC = () => {
  return (
    <div  className='bord mt-24 container mx-auto px-4'>
      <h1 className=' text-2xl text-white text-center'>Top rated</h1>
      <p className='m-4 text-white text-center'>Explore os filmes mais bem avaliados.</p>
      <Fetch endpoint="top_rated" />
    </div>
  );
};

export default TopRated;
