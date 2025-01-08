import Fetch from '@/components/Fetch';
import React from 'react';

const NowPlaying: React.FC = () => {
  return (
    <div  className='bord mt-20'>
      <h1>Now Playing</h1>
      <p>Explore os filmes atualmente em exibição nos cinemas.</p>
      <Fetch endpoint="now_playing" />
    </div>
  );
};

export default NowPlaying;
