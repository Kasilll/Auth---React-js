import React from 'react';
import './RenderUsers.scss';
import { Input } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Select, MenuItem } from '@material-ui/core';

export default function RenderUsers({ users, setUsers }) {
	const [ searcUeser, setSeacUeser ] = React.useState('');
	const userSorDescending = [ ...users ];
	const userSortAscending = [ ...users ];

	userSorDescending.sort((a, b) => (a.id > b.id ? 1 : -1)); // сортировка по убыванию
	userSortAscending.sort((a, b) => (a.id < b.id ? 1 : -1)); // сортировка по возрастанию

	function handleSearcUser(e) {
		setSeacUeser(e.target.value);
		console.log(e.target.value);
	}
	return (
		<div className="users">
			<div className="wrapper__users">
				<div className="users__input">
					<Select displayEmpty>
						<MenuItem disabled>сортировка</MenuItem>
						<MenuItem
							onClick={() => {
								setUsers(userSortAscending);
							}}
							value={1}
						>
							{' '}
							По возрастанию{' '}
						</MenuItem>
						<MenuItem
							onClick={() => {
								setUsers(userSorDescending);
							}}
							value={1}
						>
							По убыванию{' '}
						</MenuItem>
					</Select>
					<Input value={searcUeser} onChange={handleSearcUser} placeholder="поиск" />
				</div>

				{users
					.filter((el) => {
						if (searcUeser === '') {
							return el;
						} else if (el.username.toLowerCase().includes(searcUeser.toLowerCase())) {
							return el;
						}
					})
					.map((el, id) => (
						<Box
							key={id}
							className="users__cantainer"
							component="span"
							display="block"
							p={2}
							m={1}
							bgcolor="gray"
						>
							<span>{el.id}</span>
							<span>{el.username}</span>
						</Box>
					))}
			</div>
		</div>
	);
}
