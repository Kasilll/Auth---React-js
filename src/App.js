import React from 'react';
import { Route, Link } from 'react-router-dom';
import Main from './pages/Main/Main';
import './App.scss';
import AuthScreen from './pages/Auth/AuthScreen';
import UsersScreen from './pages/Users/UsersScreen';

// состояние авторизации не сохранится при обновлении страницы
// хорошо бы его сохранять в localStorage или sessionStorage
function App() {
  const [autchContext, setAutchContext] = React.useState(false); // false если не авторизовались, true - авторизовались
  const [users, setUsers] = React.useState([]); // массив юзеров

  return (
    <div>
      {/* хедер можно вынести в отдельный компонент */}
      <div className="header">
        <div className="header__content">
          <Link to="/">
            <p>Главная</p>
          </Link>
          <Link to="/auth">
            <p>Авторизация</p>
          </Link>
          {/* обычно все роуты в нижнем регистре */}
          <Link to="/Users">
            <p>Пользователи</p>
          </Link>
        </div>
      </div>
      <Route exact path="/" component={Main} />
      <Route
        exact
        path="/auth"
        render={() => <AuthScreen autchContext={autchContext} setAutchContext={setAutchContext} setUsers={setUsers} />}
      />
      <Route exact path="/Users" component={() => <UsersScreen users={users} setUsers={setUsers} />} />
    </div>
  );
}

export default App;
