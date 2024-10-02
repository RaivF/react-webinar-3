import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import useSelector from '../hooks/use-selector';
import RequireAuth from '../routing/require-auth';
import Article from './article';
import Basket from './basket';
import Login from './login';
import Main from './main';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  useAuth();
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />

        <Route
          path={'/profile'}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
