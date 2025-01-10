import Fetch from '@/components/Fetch';
import React from 'react';

const Upcoming: React.FC = () => {
  return (
    <div  className='bord mt-20 container mx-auto px-4'>
      <h1>Upcoming</h1>
      <p>Explore os filmes embreve nos cinemas.</p>
      <Fetch endpoint="upcoming" />
    </div>
  );
};

export default Upcoming;
