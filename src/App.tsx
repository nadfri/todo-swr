import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Todos from './components/Todos/Todos';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage/ErrorPage';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Todos />} />
            <Route path='*' element={<ErrorPage notFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
