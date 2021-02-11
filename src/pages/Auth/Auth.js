import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './Auth.scss';
import { Link, Route, NavLink } from 'react-router-dom';

export default function Auth({ setAutchContext, setUsers }) {
	const [ userName, setUserName ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const [ userNameDirty, setUserNameDirty ] = React.useState(false);
	const [ passwordDirty, setPasswordDirty ] = React.useState(false);
	const [ userNameErorr, setUserNameErorr ] = React.useState('Поле не может быть пустым');
	const [ passwordErorr, setPasswordErorr ] = React.useState('Поле не может быть пустым');
	const [ formValid, setFormValid ] = React.useState(true);
	const [ conectServer, setConectServer ] = React.useState('');

	React.useEffect(
		() => {
			if (userNameErorr === '' && passwordErorr === '') {
				setFormValid(false);
			} else {
				setFormValid(true);
			}
		},
		[ userNameErorr, passwordErorr ]
	);

	function sendTokenInBakend(token, setUsers) {
		// получения юзеров
		fetch('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`
			}
		})
			.then((users) => users.json())
			.then((users) => setUsers(users));
	}

	function onBlurUserName() {
		// вариладация username после отвода мышки
		if (userName.length === 0) {
			setUserNameErorr('Поле не может быть пустым');
			setUserNameDirty(true);
		} else if (userName.length < 7) setUserNameErorr('user name должен быть больше 6 символов');
		else setUserNameErorr('');
	}
	function onBlurPassword() {
		//// вариладация пароля после отвода мышки
		if (password.length === 0) {
			setPasswordErorr('Поле не может быть пустым');
			setPasswordDirty(true);
		} else if (password.length < 9) setPasswordErorr('пароль должен быть больше 8 символов');
		else setPasswordErorr('');
	}
	function handlerChangeUserName(e) {
		//валедация username во время ввода
		setUserName(e.target.value);
		if (e.target.value.length < 7) {
			setUserNameErorr('user name должен быть больше 6 символов');
			setUserNameDirty(true);
		} else {
			setUserNameDirty(false);
			setUserNameErorr('');
		}
	}
	function handlerChangePassword(e) {
		///валедация password во время ввода
		setPassword(e.target.value);
		if (e.target.value.length < 9) {
			setPasswordErorr('пароль  должен быть больше 8 символов');
			setPasswordDirty(true);
		} else {
			setPasswordDirty(false);
			setPasswordErorr('');
		}
	}
	function handleSubmit(e) {
		// получнения токена
		e.preventDefault();
		setFormValid(true);
		fetch('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ username: `${userName}`, password: `${password}` })
		})
			.then((r) => r.json())
			.then((r) => {
				if (r.token) {
					setConectServer(true);
					setAutchContext(true);
					sendTokenInBakend(r.token, setUsers); // если успешно авторизовались, отправляем полученный токен
				} else {
					setConectServer('Введен неправильно логин или пароль');
					setFormValid(false);
				}
			});
	}
	return (
		<div className="container-auth">
			<div className="auth">
				<form className="auth__form" onSubmit={handleSubmit}>
					<h1>Авторизация</h1>
					{conectServer && <div style={{ color: 'red', fontSize: '18px' }}>{conectServer}</div>}
					<TextField
						className="outlined-basic"
						onBlur={() => onBlurUserName()}
						onChange={(e) => handlerChangeUserName(e)}
						value={userName}
						label="user name"
						variant="outlined"
					/>
					{userNameErorr &&
					userNameDirty && <div style={{ color: 'red', fontSize: '12px' }}>{userNameErorr}</div>}
					<TextField
						type="password"
						className="outlined-basic"
						onChange={handlerChangePassword}
						value={password}
						label="password"
						variant="outlined"
						onBlur={() => onBlurPassword()}
					/>
					{passwordErorr &&
					passwordDirty && <div style={{ color: 'red', fontSize: '12px' }}>{passwordErorr}</div>}

					<Button type="submit" variant="contained" color="secondary" disabled={formValid}>
						Войти
					</Button>
				</form>
			</div>
		</div>
	);
}
