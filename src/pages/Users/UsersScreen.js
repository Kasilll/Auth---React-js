import React from 'react';
import RenderUsers from './RenderUsers';
import './UserScreen.scss';

export default function UsersScreen({ users, setUsers }) {
  return (
    <div>
      {/* а если массив пуст, то мы увидим сообщение, что мы не авторизованы? */}
      {users[0] ? ( // если есть массив users рендерим его
        <RenderUsers users={users} setUsers={setUsers} />
      ) : (
        <div className="container">
          {/* Для текстов в MaterialUI есть компоненты */}
          <h1>Чтобы просматривать пользователей нужно сначала авторизоваться</h1>
        </div>
      )}
    </div>
  );
}
