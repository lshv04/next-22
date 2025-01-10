import Fetch from '@/components/Fetch';
import React from 'react';

const Upcoming: React.FC = () => {
  return (
    <div  className='bord mt-24 container mx-auto px-4'>
      <h1 className=' text-2xl text-white text-center'>Upcoming</h1>
      <p className='m-4 text-white text-center'>Explore os filmes embreve nos cinemas.</p>
      <Fetch endpoint="upcoming" />
    </div>
  );
};

export default Upcoming;
