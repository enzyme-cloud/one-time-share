/**
 * Get a cryptographically secure random integer between the given min and max.
 *
 * @param  {integer} min The minimum value.
 * @param  {integer} max The maximum value.
 * @return {integer}     The random value.
 */
const _getRandomInt = function _getRandomInt(min, max) {
  const byte_array = window.crypto.getRandomValues(new Uint8Array(1));
  const range = max - min + 1;
  const max_range = 256;

  if (byte_array[0] >= Math.floor(max_range / range) * range) {
    return _getRandomInt(min, max);
  }

  return min + (byte_array[0] % range);
}

/**
 * Get a cryptographically secure unique password of the given length.
 *
 * @param  {integer} max_chars How long the password should be.
 * @return {string}            The unique password.
 */
const getUniquePassword = function getUniquePassword(max_chars) {
  const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+';

  let password = '';

  for (let i = 0; i < max_chars; i++) {
    password += pool[_getRandomInt(0, pool.length - 1)];
  }

  return password;
};

/**
 * Default export.
 */
export default getUniquePassword;
