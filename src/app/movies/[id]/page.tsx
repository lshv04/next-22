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
  
  const [id, setId] = useState<number | null>(null);   /*   necessario para páginas usando router do next */  
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
        console.log(data);
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
      <p>id do filme: {id}</p>
      <p>Título: {movieDetails.title}</p>
      <p>Descrição: {movieDetails.overview}</p>
    </div>
  );
};

export default MovieDetails;
