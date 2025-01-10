"use client";

import GoldenStarBadge from "@/components/GoldenStarBadge";
import Spinner from "@/components/Spinner";
import Link from "next/link";

import React, { useState, useEffect } from "react";

interface MovieDetailsProps {
  params: Promise<{
    id: number;
  }>;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
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
        console.log(data); // Debug log
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center my-24">
        <Spinner />
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="mt-40">
        <h1>Error</h1>
        <p>Could not load movie details.</p>
      </div>
    );
  }

  return (
    <div className="mt-20 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Poster Image */}
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Movie Information */}
        <div className="md:col-span-2">
          <div className="bord flex md:flex-row flex-col justify-between items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl ">
                <strong>{movieDetails.title}</strong>
              </h2>
            </div>

            <div>
              <div className="bord flex flex-row items-center gap-2">
                <GoldenStarBadge grade={movieDetails.vote_average} />
                <p>
                  <strong>Vote Count:</strong> {movieDetails.vote_count}
                </p>
              </div>
            </div>
          </div>

          <p>
            <strong>Description:</strong> {movieDetails.overview}
          </p>

          {/* Grid for Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bord">
            <div className="bord flex flex-col gap-4">
              <p>
                <strong>Run time:</strong> <br />
                {movieDetails.runtime}
              </p>
              <p>
                <strong>Original Language:</strong> <br />
                {movieDetails.original_language.toUpperCase()}
              </p>
              <p>
                <strong>Status:</strong> <br />
                {movieDetails.status}
              </p>
              <p>
                <strong>Origin Country:</strong> <br />
                {movieDetails.production_countries
                  ?.map((country: any) => country.name)
                  .join(", ")}
              </p>
            </div>
            <div className="bord flex flex-col gap-4">
              <p>
                <strong>Release Date:</strong> <br />{" "}
                {movieDetails.release_date}
              </p>

              <p>
                <strong>Budget:</strong> <br /> $
                {movieDetails.budget.toLocaleString()}
              </p>

              <p>
                <strong>Revenue:</strong> <br /> $
                {movieDetails.revenue.toLocaleString()}
              </p>
              <p>
                <strong>Homepage:</strong> <br />
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {movieDetails.homepage}
                </a>
              </p>
            </div>
          </div>
          <div className="bord my-4">
            <Link
              href={`${id}/cast`}
              className="inline-flex items-center bg-red-500 rounded-full  px-6 py-2 transition-transform duration-300 lg:hover:scale-110"
            >
              <p className="text-xl font-bold text-gray-800">Cast</p>
            </Link>
            <Link
              href={`${id}/videos`}
              className="inline-flex items-center bg-red-500 rounded-full  px-6 py-2 transition-transform duration-300 lg:hover:scale-110"
            >
              <p className="text-xl font-bold text-gray-800">Videos</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
