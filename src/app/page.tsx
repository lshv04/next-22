import React from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
}

const Home = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNTk3MzI3MC40OTcsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kfVuDqRlx14idyE30RImdK6_keO1OTPbrxoVtuUUq40',
    },
  };

  const res = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    options
  );

  const data = await res.json();
  const movies: Movie[] = data.results;

  // Filter the most popular movie
  const mostPopularMovie = movies.reduce((prev, current) =>
    prev.popularity > current.popularity ? prev : current
  );

  return (
    <div
      style={{
        position: 'relative',
        zIndex: -1, // Ensures it's below the navbar
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mostPopularMovie.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opacity dark overlay
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1, // Ensures content is above the overlay
          padding: '20px',
        }}
      >
        <h1>Most Popular Movie</h1>
        <h2>{mostPopularMovie.title}</h2>
        <p>{mostPopularMovie.overview}</p>
        <p>Popularity: {mostPopularMovie.popularity}</p>
      </div>
    </div>
  );
};

export default Home;
