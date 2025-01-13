import React from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
}

const Home = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNTk3MzI3MC40OTcsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kfVuDqRlx14idyE30RImdK6_keO1OTPbrxoVtuUUq40",
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );

  const data = await res.json();
  const movies: Movie[] = data.results;

  // Filter the most popular movie
  const mostPopularMovie = movies.reduce((prev, current) =>
    prev.popularity > current.popularity ? prev : current
  );

  return (
    <div className="">
      <div
        className="relative min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mostPopularMovie.poster_path})`,
          zIndex: -1,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-14">
          <div className="relative z-10 p-8 col-span-1 md:col-span-1 lg:col-span-1">
            <h1 className="text-4xl font-bold mb-4">Most Popular Movie:</h1>
            <h2 className="text-2xl font-semibold mb-2">
              {mostPopularMovie.title}
            </h2>
            <p className="mb-4">{mostPopularMovie.overview}</p>
          
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            {/* Outros conteúdos do grid */}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
