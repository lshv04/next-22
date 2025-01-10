"use client"

import { useParams } from 'next/navigation';

type Params = {
  id: string;
};

const VideosPage = () => {
  const params = useParams<Params>();
  const { id } = params;

  return (
    <div className='mt-40'>
      <h1>Videos Page</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
};

export default VideosPage;
