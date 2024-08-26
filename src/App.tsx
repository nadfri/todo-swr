import { Route, Routes } from 'react-router-dom';
import Todos from './components/Todos/Todos';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';

export default function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Todos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
