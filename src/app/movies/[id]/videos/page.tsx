"use client";

import Spinner from '@/components/Spinner';
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
    next: { revalidate: 1800 },
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
    return (
      <div className="flex justify-center my-24">
        <Spinner />
      </div>
    );
  }


  if (error) {
    return (
      <div className="mt-40">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="mt-40 container mx-auto p-4  text-white">
      <h1 className="text-2xl font-bold mb-4 text-center ">Videos Page</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="p-2 flex justify-between border flex-col border-gray-300 rounded-lg shadow-md lg:hover:shadow-lg transition-shadow"
          >
            <div className='bord'>
            <h3 className="text-lg font-semibold mb-2">{video.name}</h3>
            <p className="text-sm text-gray-400">Type: {video.type}</p>
            <p className="text-sm text-gray-400">Site: {video.site}</p>
            </div>
            <div className='bord'>
            <a
              href={`https://www.youtube.com/watch?v=${video.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Watch on {video.site}
            </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
