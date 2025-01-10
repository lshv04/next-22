import Fetch from '@/components/Fetch';
import React from 'react';

const TopRated: React.FC = () => {
  return (
    <div  className='bord mt-20 container mx-auto px-4'>
      <h1>Top rated</h1>
      <p>Explore os filmes mais bem avaliados.</p>
      <Fetch endpoint="top_rated" />
    </div>
  );
};

export default TopRated;
