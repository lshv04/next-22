"use client";

import React, { useState, useEffect } from "react";
import { genres } from "@/genres";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[]; 
  release_date: string;
}

interface FetchProps {
  endpoint: string;
}

const Fetch: React.FC<FetchProps> = ({ endpoint }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const options: RequestInit = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_BEARER}`,
          },
          next: { revalidate: 1800 },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetch Response:", data);
        setMovies(data.results || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Função para mapear IDs para nomes de gêneros
  const getGenreNames = (ids: number[]): string[] => {
    return ids.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "Unknown";
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full object-cover"
            />
            <div className="p-4">
              {/* Exibindo os nomes dos gêneros */}
              <p>
                <small>
                  {getGenreNames(movie.genre_ids).join(", ")}
                </small>
              </p>
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p><small>Release date: {movie.release_date}</small></p>
              <p className="text-sm text-gray-600 mt-2">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetch;
