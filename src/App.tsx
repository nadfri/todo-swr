import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Todos from '@/components/Todos/Todos';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import TodoPage from './components/TodoPage/TodoPage';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Todos />} />
            <Route path='todos' element={<Todos />} />
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
