"use client";

import React, { useState, useEffect } from "react";
import { genres } from "@/genres";
import GoldenStarBadge from "../components/GoldenStarBadge";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average:number;
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
            className="bg-white shadow-md rounded-lg overflow-hidden bord flex justify-between items-center flex-col"
          >
            <div className="bord ">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full object-cover"
              />

              {/* Exibindo os nomes dos gêneros */}
              <p className="px-4">
                <small>{getGenreNames(movie.genre_ids).join(", ")}</small>
              </p>
              <h2 className="text-lg font-semibold bord px-4">{movie.title}</h2>
              <p className="px-4">
                <small>Release date: {movie.release_date}</small>
              </p>
              <p className="text-sm text-gray-600 mt-2 px-4">
                {movie.overview}
              </p>
            </div>
            <div className="flex  justify-between items-center w-full bord p-4">
              <div>
                <GoldenStarBadge grade={movie.vote_average} />
              </div>
              <div>Badge</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetch;
