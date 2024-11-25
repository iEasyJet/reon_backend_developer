export const ERR_SERVER = 'На сервере произошла ошибка';
export const USER_DELETED = 'Пользователь удален';

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
export const ERR_CE_USER =
  'Пользователь с таким логином и паролем уже существует';

/* NotFoundError */
export const ERR_NFE_USER = 'Ошибка при удалении пользователя с переданным id';
export const ERR_NFE_WRONG_ROUTE = 'Такого пути запроса не существует';

/* Unauthorized */
export const ERR_NOAUTH = 'Неправильный логин или пароль';

/* Forbidden */
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_USER =
  'У Вас нет прав для удаления пользователя. Права есть только у администратора';
export const ERR_FORBIDDEN_NO_RIGHTS_FOR_ARCHIVE_USER =
  'У Вас нет прав для архивации пользователя. Права есть только у администратора';
