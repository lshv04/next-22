import Fetch from '@/components/Fetch';
import React from 'react';

const Popular: React.FC = () => {
  return (
    <div  className='bord mt-20'>
      <h1>Popular</h1>
      <p>Explore os filmes Populares.</p>
      <Fetch endpoint="popular" />
    </div>
  );
};

export default Popular;
