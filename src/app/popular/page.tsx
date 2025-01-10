import Fetch from '@/components/Fetch';
import React from 'react';

const Popular: React.FC = () => {
  return (
    <div  className='bord mt-20 container mx-auto px-4'>
      <h1>Popular</h1>
      <p>Explore os filmes Populares.</p>
      <Fetch endpoint="popular" />
    </div>
  );
};

export default Popular;
