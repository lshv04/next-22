"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Params = {
  id: string;
};

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

type ApiResponse = {
  results: Video[];
};

const VideosPage = () => {
  const params = useParams<Params>();
  const { id } = params;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNTk3MzI3MC40OTcsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kfVuDqRlx14idyE30RImdK6_keO1OTPbrxoVtuUUq40',
    },
  };

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log('API Response:', data); // Exibe as informações no console
        setVideos(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]);

  if (loading) {
    return <h2 className="mt-40">Loading...</h2>;
  }

  if (error) {
    return (
      <div className="mt-40">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="mt-40">
      <h1>Videos Page</h1>
      <p>Movie ID: {id}</p>
      <h2>Videos:</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <strong>{video.name}</strong> ({video.type}) - {video.site}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideosPage;
