import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { MoviesPage } from '@/app/pages/MoviesPage';
import { MovieDetailPage } from '@/app/pages/MovieDetailPage';
import { ActorProfilePage } from '@/app/pages/ActorProfilePage';
import { DirectorProfilePage } from '@/app/pages/DirectorProfilePage';
import { WatchLaterPage } from '@/app/pages/WatchLaterPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/actors/:id" element={<ActorProfilePage />} />
          <Route path="/directors/:id" element={<DirectorProfilePage />} />
          <Route path="/watch-later" element={<WatchLaterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
