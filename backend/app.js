require('dotenv').config();
// const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const auth = require('./middlewares/auth');
const {
  validateLogin,
  validateCreateUser,
} = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
//  useCreateIndex: true,
//  useFindAndModify: false,
});

app.use(cors);

/* app.use(cors({
  origin: ['https://expressmesto.students.nomoredomains.xyz',
    'http://expressmesto.students.nomoredomains.xyz'], // домен фронтенда
  credentials: true, // для того, чтобы CORS поддерживал кроссдоменные куки
})); */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
