"use client";

import React, { useState, useEffect, useRef } from "react";
import { genres } from "@/genres";
import GoldenStarBadge from "../components/GoldenStarBadge";
import Link from "next/link";
import Spinner from "./Spinner";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
}

interface FetchProps {
  endpoint: string;
}

const Fetch: React.FC<FetchProps> = ({ endpoint }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchedPages = useRef<Set<number>>(new Set()); // Rastreamento de páginas já buscadas

  const fetchMovies = async (pageNumber: number) => {
    if (!hasMore || loading || fetchedPages.current.has(pageNumber)) return;

    try {
      setLoading(true);
      setError(null);

      const options: RequestInit = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_BEARER}`,
        },
        next: { revalidate: 1800 }, // Cache de 30 minutos
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=${pageNumber}`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetch Response:", data);

      // Atualiza os filmes sem duplicar IDs
      setMovies((prevMovies) => {
        const newMovies = data.results.filter(
          (movie: Movie) => !prevMovies.some((m) => m.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      fetchedPages.current.add(pageNumber); // Marca a página como carregada
      setHasMore(data.page < data.total_pages); // Verifica se há mais páginas
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const getGenreNames = (ids: number[]): string[] => {
    return ids.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "Unknown";
    });
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bord">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg overflow-hidden bord flex justify-between items-center flex-col"
          >
            <div className="bord">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full object-cover"
              />
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
            <div className="flex justify-between items-center w-full bord p-4">
              <div>
                <GoldenStarBadge grade={movie.vote_average} />
              </div>
              
              <Link
                href={`movies/${movie.id}`}
                className="inline-flex items-center bg-red-500 rounded-full px-3 py-1 transition-transform duration-300 lg:hover:scale-110"
              >
                <p className="text-lg font-bold text-gray-800">More</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      )}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default Fetch;
