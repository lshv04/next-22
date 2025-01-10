import Fetch from '@/components/Fetch';
import React from 'react';

const NowPlaying: React.FC = () => {
  return (
    <div  className='bord mt-24 container mx-auto px-4  '>
      <h1 className=' text-2xl text-white text-center'>Now Playing</h1>
      <p className='m-4 text-white text-center'>Explore movies playing now on cinema</p>
      <Fetch endpoint="now_playing" />
    </div>
  );
};

export default NowPlaying;
