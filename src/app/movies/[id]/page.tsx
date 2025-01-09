interface MovieDetailsProps {
  params: {
    id: number;
  };
}

const MovieDetails =  async ({ params }: MovieDetailsProps) => {
  const {id} = await params;

  return (
    <div className="mt-40">
      <h1>Detalhes do Filme</h1>
      <p>id do filme : {id}</p>
    </div>
  );
};

export default MovieDetails;
