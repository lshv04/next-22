"use client";

import GoldenStarBadge from "@/components/GoldenStarBadge";
import React, { useState, useEffect } from "react";

interface MovieDetailsProps {
  params: Promise<{
    id: number;
  }>;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_BEARER}`,
  },
  next: { revalidate: 1800 },
};

const MovieDetails = ({ params }: MovieDetailsProps) => {
  const [id, setId] = useState<number | null>(null);
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unwrapParams = async () => {
      const { id } = await params;
      setId(id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id === null) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await response.json();
        setMovieDetails(data);
        console.log(data); // Para debug
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-40">
        <h1>Carregando detalhes do filme...</h1>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="mt-40">
        <h1>Erro</h1>
        <p>Não foi possível carregar os detalhes do filme.</p>
      </div>
    );
  }

  return (
    <div className="mt-20 p-6">
      <h1 className="text-3xl font-bold mb-8">Detalhes do Filme</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Imagem do Poster */}
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Informações do Filme */}
        <div className="md:col-span-2">
          <div className="bord flex md:flex-row flex-col justify-between items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl ">
                <strong>{movieDetails.title}</strong>
              </h2>
            </div>

            <div>
              <div className="bord flex flex-row items-center gap-2">
                <GoldenStarBadge grade={movieDetails.vote_average} />
                <p>
                  <strong>Count :</strong> {movieDetails.vote_count}
                </p>
              </div>
            </div>
          </div>

          <p>
            <strong>Descrição:</strong> {movieDetails.overview}
          </p>

          {/* Novo Grid para as informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bord">
        
            <div className="bord flex flex-col gap-4">
              <p>
                <strong>Idioma original:</strong>{" "} <br/>
                {movieDetails.original_language.toUpperCase()}
              </p>
              <p>
                <strong>Status:</strong> <br/>
                {movieDetails.status}
              </p>
              <p>
                <strong>País de origem:</strong>{" "} <br/>
                {movieDetails.production_countries
                  ?.map((country: any) => country.name)
                  .join(", ")}
              </p>
              <p>
                <strong>Homepage:</strong>{" "} <br/>
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {movieDetails.homepage}
                </a>
              </p>
            </div>
            <div className="bord flex flex-col gap-4">
              <p>
                <strong>Data de lançamento:</strong> <br/> {movieDetails.release_date}
              </p>
              <p>
                <strong>Popularidade:</strong> <br/> {movieDetails.popularity}
              </p>
              <p>
                <strong>Orçamento:</strong> <br/> ${movieDetails.budget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
