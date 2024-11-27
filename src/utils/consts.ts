export const ERR_SERVER = 'На сервере произошла ошибка';
export const USER_DELETED = 'Пользователь удален';
export const BOARD_DELETED = 'Доска удалена';
export const TASK_DELETED = 'Задача удалена';
export const CREATE_ADMIN = 'Администратор создан!';
export const ADMIN_IS_HERE = 'Администратор уже есть в БД!';
/* CryptoJS */
export const ERR_CRYPTO_ENCRYPT_PASSWORD = 'Ошибка при шифровании пароля';
export const ERR_CRYPTO_DECRYPT_PASSWORD = 'Ошибка при дешифровании пароля';

/* DotEnv */
export const SIMPLE_SECRET_KEY_IS_NOT_DEFINED =
  'Отсутсвует переменная окружения SIMPLE_SECRET_KEY';
export const TOKEN_SECRET_KEY_IS_NOT_DEFINED =
  'Отсутсвует переменная окружения TOKEN_SECRET_KEY';

/* JWT */
export const ERR_JWT_VERIFY_TOKEN = 'Ошибка при дешифровании токена';
export const ERR_JWT_SIGN_TOKEN = 'Ошибка при шифровании токена';
export const ERR_JWT_PALOAD_IS_NOT_DEFINED =
  'Отсутсвует полезная нагрузка в JWT';

/* AUTH */
export const AUTH_HEADERS_IS_NOT_DEFINED = 'Отсутсвует заголовок authorization';

/* ValidationError */
export const ERR_VE = 'Переданы некорректные данные';

/* ConflictError */
export const ERR_CE = 'Данная сущность уже существует в базе данных';

/* NotFoundError */
export const ERR_NFE_USER = 'Ошибка при удалении пользователя с переданным id';
export const ERR_NFE_BOARD = 'Ошибка при удалении доски с переданным id';
export const ERR_NFE_USER_TOGGLE_STATUS =
  'Ошибка при смене статуса пользователя с переданным id';
export const ERR_NFE_BOARD_TOGGLE_STATUS =
  'Ошибка при смене статуса доски с переданным id';
export const ERR_NFE_BOARD_ADD_USERS =
  'Ошибка при добавлении пользователей к доске с переданным id';
export const ERR_NFE_BOARD_DELETE_USERS =
  'Ошибка при удалении пользователей к доске с переданным id';
export const ERR_NFE_BOARD_UPDATE =
  'Ошибка при обновлении доски с переданным id';
export const ERR_NFE_TASK_DELETE = 'Ошибка при удалении задачи с переданным id';
export const ERR_NFE_TASK_UPDATE =
  'Ошибка при обновлении задачи с переданным id';
export const ERR_NFE_TASK_ADD_USERS =
  'Ошибка при добавлении пользователей к задаче с переданным id';
export const ERR_NFE_TASK_DELETE_USERS =
  'Ошибка при удалении пользователей к задаче с переданным id';
export const ERR_NFE_WRONG_ROUTE = 'Такого пути запроса не существует';

/* Unauthorized */
export const ERR_NOAUTH = 'Неправильный логин или пароль';

/* Forbidden */
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_USER =
  'У Вас нет прав для удаления пользователя. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_ADD_USER =
  'У Вас нет прав для создания пользователя. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_TOGGLE_ARCHIVE_USER =
  'У Вас нет прав для смены статуса пользователя. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_CREATE_BOARD =
  'У вас нет прав для создания доски. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_BOARD =
  'У вас нет прав для удаления доски. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_TOGGLE_ARCHIVE_BOARD =
  'У Вас нет прав для смены статуса доски. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_ADD_USERS_TO_BOARD =
  'У Вас нет прав для добавления пользователей доски. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_USERS_FROM_BOARD =
  'У Вас нет прав для удаления пользователей доски. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_UPDATE_BOARD =
  'У Вас нет прав для обновления доски. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_UPDATE_TASK =
  'У Вас нет прав для обновления задачи. Так как Вы не являетесь отвественным за задачу';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_ADD_USERS_TO_TASK =
  'У Вас нет прав для добавления пользователей задачи. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_USERS_FROM_TASK =
  'У Вас нет прав для удаления пользователей задачи. Права есть только у администратора';
