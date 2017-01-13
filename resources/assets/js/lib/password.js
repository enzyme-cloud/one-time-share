const POOL = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+'

let getRandomInt = function getRandomInt(min, max) {
  const BYTE_ARRAY = window.crypto.getRandomValues(new Uint8Array(1))
  const RANGE = max - min + 1
  const MAX_RANGE = 256

  if (BYTE_ARRAY[0] >= Math.floor(MAX_RANGE / RANGE) * RANGE) {
    return getRandomInt(min, max)
  }

  return min + (BYTE_ARRAY[0] % RANGE)
}

export default function(max_chars) {
  let password = ''

  for (let i = 0; i < max_chars; i++) {
    password += POOL[getRandomInt(0, POOL.length - 1)]
  }

  return password
}
