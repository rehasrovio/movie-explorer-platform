import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getActorById } from "../api/actors";
import { Actor } from "../types/actor";
import { Loading } from "../components/common/Loading";
import { ErrorState } from "../components/common/ErrorState";
import { NotFoundPage } from "./NotFoundPage";

export const ActorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActor = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getActorById(parseInt(id));
        setActor(data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError("not_found");
        } else {
          setError(err.message || "Failed to load actor");
        }
      } finally {
        setLoading(false);
      }
    };

    loadActor();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error === "not_found" || (!actor && !loading)) {
    return <NotFoundPage />;
  }

  if (error || !actor) {
    return <ErrorState message={error || "Failed to load actor"} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {actor.name}
          </h1>

          {actor.movies && actor.movies.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Movies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actor.movies.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movies/${movie.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900">{movie.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {movie.releaseYear} • Rating: {movie.rating.toFixed(1)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No movies found for this actor.</p>
          )}
        </div>
      </div>
    </div>
  );
};
