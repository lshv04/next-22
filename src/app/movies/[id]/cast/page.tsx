"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Tipagem para os membros do elenco
interface CastMember {
  id: number;
  name: string;
  character: string;
}

// Tipagem para os dados da API
interface ApiResponse {
  cast: CastMember[];
}

const CastPage: React.FC = () => {
  const { id } = useParams(); // Captura o parâmetro 'id'
  const [cast, setCast] = useState<CastMember[]>([]); // Estado para armazenar o elenco
  const [loading, setLoading] = useState<boolean>(true); // Estado para controle do carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros

  // Configuração para a API
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNTk3MzI3MC40OTcsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kfVuDqRlx14idyE30RImdK6_keO1OTPbrxoVtuUUq40',
    },
  };

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cast data');
        }
        const data: ApiResponse = await response.json(); // Tipagem do retorno da API
        console.log('Fetched Cast Data:', data); // Exibe os dados no console
        setCast(data.cast); // Salva o elenco no estado
      } catch (err: unknown) {
        // Tratamento de erro
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchCast();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-40">
      <h1>Movie Cast</h1>
      <p>Movie ID: {id}</p>
      <ul>
        {cast.map((member) => (
          <li key={member.id}>
            <strong>{member.name}</strong> as {member.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastPage;
