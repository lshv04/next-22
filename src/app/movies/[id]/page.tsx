"use client";

import React, { useState, useEffect } from 'react';

interface MovieDetailsProps {
  params: Promise<{
    id: number;
  }>;
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
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
        console.error('Erro ao buscar detalhes do filme:', error);
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
    <div className="mt-40">
      <h1>Detalhes do Filme</h1>
      <p><strong>ID do filme:</strong> {id}</p>
      <p><strong>Título:</strong> {movieDetails.title}</p>
      <p><strong>Descrição:</strong> {movieDetails.overview}</p>
      <p><strong>Data de lançamento:</strong> {movieDetails.release_date}</p>
      <p><strong>Popularidade:</strong> {movieDetails.popularity}</p>
      <p><strong>Nota média:</strong> {movieDetails.vote_average}</p>
      <p><strong>Contagem de votos:</strong> {movieDetails.vote_count}</p>
      <p><strong>Orçamento:</strong> ${movieDetails.budget.toLocaleString()}</p>
      <p><strong>Idioma original:</strong> {movieDetails.original_language.toUpperCase()}</p>
      <p><strong>Status:</strong> {movieDetails.status}</p>
      <p><strong>País de origem:</strong> {movieDetails.production_countries?.map((country: any) => country.name).join(', ')}</p>
      <p><strong>Homepage:</strong> <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">{movieDetails.homepage}</a></p>
      <div>
        <strong>Poster:</strong>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default MovieDetails;
