"use client";
import Spinner from "@/components/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Tipagem para os membros do elenco
interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null; // Adicionado profile_path
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
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_BEARER}`,
    },
    next: { revalidate: 1800 },
  };

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cast data");
        }
        const data: ApiResponse = await response.json(); // Tipagem do retorno da API
        console.log("Fetched Cast Data:", data); // Exibe os dados no console
        setCast(data.cast); // Salva o elenco no estado
      } catch (err: unknown) {
        // Tratamento de erro
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchCast();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center my-24">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-40 container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Movie Cast</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cast.map((member) => (
          <div
            key={member.id}
            className=" bg-gray-300 shadow-md rounded-lg text-center"
          >
            {member.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                className="w-full h-auto rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-32 bg-gray-300 flex items-center justify-center rounded-md mb-4">
                <span className="text-sm text-gray-600">No Image</span>
              </div>
            )}
            <h3 className="font-bold">{member.name}</h3>
            <p className="text-sm text-gray-600 pb-2">as {member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastPage;
