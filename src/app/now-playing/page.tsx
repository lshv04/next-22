import Fetch from '@/components/Fetch';
import React from 'react';

const NowPlaying: React.FC = () => {
  return (
    <div style={{ padding: '20px' }} className='bord'>
      <h1>Now Playing</h1>
      <p>Explore os filmes atualmente em exibição nos cinemas.</p>
      <Fetch/>
    </div>
  );
};

export default NowPlaying;
