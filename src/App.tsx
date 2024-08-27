import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Todos from './components/Todos/Todos';
import Header from './components/Header/Header';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import NotFound from './components/ErrorPage/NotFound';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Todos />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
