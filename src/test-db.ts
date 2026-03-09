import { pool } from './db';

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Ошибка подключения к базе: ', err);
  } else {
    console.log('База работает! Время сервера: ', res.rows[0]);
  }
});