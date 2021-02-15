import React from 'react';
import Auth from './Auth';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './AuthScreen.scss';

export default function AuthScreen({ autchContext, setAutchContext, setUsers }) {
  return (
    <div>
      {!autchContext ? ( // если не авторизованы отображаем авторизацию
        <Auth setAutchContext={setAutchContext} setUsers={setUsers} />
      ) : (
        // для успешной авторизации было бы здорово сразу перенаправить пользователя на какой-нибудь полезный экран
        <div className="container">
          <CheckCircleOutlineIcon className="container__icon" bgcolor="green" />
        </div>
      )}
    </div>
  );
}
