"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  // Adicione outras propriedades conforme necessário
}

const Fetch: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNTk3MzI3MC40OTcsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kfVuDqRlx14idyE30RImdK6_keO1OTPbrxoVtuUUq40',
          },
        };

        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
          options
        );
        console.log('Fetch Response:', response.data); // Exibe o resultado completo no console
        setMovies(response.data.results || []);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Now Playing Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fetch;
