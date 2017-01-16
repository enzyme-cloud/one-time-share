import encrypter from './encrypter.js';
import decrypter from './decrypter.js';
import textSelect from './text-select.js';

/**
 * Bootstraps the various components.
 */
const bootstrap = function bootstrap() {
  encrypter();
  decrypter();
  textSelect();
};

/**
 * Default export.
 */
export default bootstrap;
