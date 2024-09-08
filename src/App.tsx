import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Home from '@/pages/Home/Home';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TodoPage from '@/pages/TodoPage/TodoPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';

export default function App() {
  
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='todos' element={<Home />} />
            <Route path='todos/:id' element={<TodoPage />} />
            <Route path='404' element={<ErrorPage notFound />} />
            <Route path='*' element={<ErrorPage notFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
