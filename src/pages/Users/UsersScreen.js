import React from 'react';
import RenderUsers from './RenderUsers';
import './UserScreen.scss'

export default function UsersScreen({ users, setUsers }) {
	return (
		<div>
			{users[0] ? ( // если есть массив users рендерим его
				<RenderUsers users={users} setUsers={setUsers} />
			) : (
				<div className="container">
					<h1>Чтобы просматривать пользователей нужно сначала авторизоваться</h1>
				</div>
			)}
		</div>
	);
}
