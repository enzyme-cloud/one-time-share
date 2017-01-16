import encrypter from './encrypter.js'
import decrypter from './decrypter.js'
import textSelect from './text-select.js'

export default (system) => {
  encrypter(system)
  decrypter(system)
  textSelect()
}
