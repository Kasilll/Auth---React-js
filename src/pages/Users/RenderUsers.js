import React from 'react';
import './RenderUsers.scss';
import { Input } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Select, MenuItem } from '@material-ui/core';

export default function RenderUsers({ users, setUsers }) {
  // опечатка
  const [searcUeser, setSeacUeser] = React.useState('');
  // опечатка
  const userSorDescending = [...users];
  const userSortAscending = [...users];

  // !FIXME: Эти операции выполняются при каждом ререндере и никуда не сохраняют результат
  // нужно сделать функции, которые будут вызваны по необходиимости
  // тогда создавать два дополнительых массива выше тоже не нужно
  // опечатка
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
            {/* лучше сделать label отдельный, чем недоступный MenuItem
                глянь в доке Material, там прям с примерами
            */}
            <MenuItem disabled>сортировка</MenuItem>
            <MenuItem
              onClick={() => {
                setUsers(userSortAscending);
              }}
              value={1}
            >
              {/* зачем тут пустые строки */} По возрастанию{' '}
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
          // это можно выделить в отдельную функцию/переменную
          .filter(el => {
            if (searcUeser === '') {
              return el;
            } else if (el.username.toLowerCase().includes(searcUeser.toLowerCase())) {
              return el;
            }
          })
          // нет сообщения, если массив пустой (никого нет или не найдено)
          .map((el, id) => (
            // использовать индексы массива в key не рекомендуется
            // лучше возьми id самого элемента
            // это можно сделать отдельным компонентом
            // для списков в MaterialUI есть подходящие компоненты
            // опечатка
            <Box key={id} className="users__cantainer" component="span" display="block" p={2} m={1} bgcolor="gray">
              <span>{el.id}</span>
              <span>{el.username}</span>
            </Box>
          ))}
      </div>
    </div>
  );
}
