"use client"
import { useParams } from 'next/navigation';

const CastPage = () => {
  const { id } = useParams(); // Captura o parâmetro 'id'

  return (
    <div className='mt-40'>
      <h1>Movie Cast</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
};

export default CastPage;
