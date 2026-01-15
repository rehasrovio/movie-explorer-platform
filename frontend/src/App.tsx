import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { MoviesPage } from "./pages/MoviesPage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import { ActorDetailPage } from "./pages/ActorDetailPage";
import { DirectorDetailPage } from "./pages/DirectorDetailPage";
import { WatchLaterPage } from "./pages/WatchLaterPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/actors/:id" element={<ActorDetailPage />} />
        <Route path="/directors/:id" element={<DirectorDetailPage />} />
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
