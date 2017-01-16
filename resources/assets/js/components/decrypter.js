import Q from 'qoob';
import request from 'superagent';
import flash from '../lib/flash.js';

/**
 * Create and start the decrypter component.
 */
const _decrypter = function _decrypter() {
  const already_destroyed = Q.head(Q.val(Q.first('#js-secret-destroyed'))) === 'yes';

  // Let's jump out early if this secret has already been destroyed.
  if (already_destroyed) {
    return;
  }

  const decrypt_form       = Q.first('#js-decrypt-form');
  const decrypted_data_box = Q.first('#js-decrypted-data-box');
  const decrypted_results  = Q.first('#js-decrypted-results');
  const password_el        = Q.first('#js-password');
  const decrypt_btn_el     = Q.first('#js-decrypt-data-btn');
  const decrypt_btn_value  = Q.html(decrypt_btn_el);
  const token              = Q.head(Q.val(Q.first('#js-secret-token')));
  const fetch_code         = Q.head(Q.val(Q.first('#js-fetch-code')));
  const spinner_el         = Q.make('div');

  // Is the URL pre-signed?
  const url_hash = window.location.hash;
  const password_pre_signed = url_hash.length > 0;

  let in_progress = false;
  let cached_encrypted_data = undefined;

  /*
   |----------------------------------------------------------------------------
   | showFailure
   |----------------------------------------------------------------------------
   | Alerts the user to a failure during the decryption process.
  */
  let showFailure = function showFailure() {
    Q.removeClass(decrypt_btn_el, 'Form__button--disabled');
    Q.html(decrypt_btn_el, decrypt_btn_value);
    Q.removeAttr(decrypt_btn_el, 'disabled');

    flash('Decryption failed, please try again.');

    in_progress = false;
  };

  /*
   |----------------------------------------------------------------------------
   | attemptDecryption
   |----------------------------------------------------------------------------
   | Given the `password` and `encrypted_data`, attempts to decrypt the payload.
   | Assuming no exceptions are thrown, places the results in decrypted_results
   | and shows the results.
  */
  let attemptDecryption = function attemptDecryption(password, encrypted_data) {
    const DATA = sjcl
      .decrypt(password, encrypted_data)
      .replace(/(?:\r\n|\r|\n)/g, '<br />');

    Q.html(decrypted_results, DATA);
    Q.hide(decrypt_form);
    Q.show(decrypted_data_box);
  };

  /*
   |----------------------------------------------------------------------------
   | startDecrypt
   |----------------------------------------------------------------------------
   | Requests the server for the encrypted payload and attempts to decrypt
   | the payload using the value found in the password_el element. If a
   | server request has already been made once before, it will use the
   | cached encrypted data instead.
  */
  let startDecrypt = function startDecrypt() {
    if (in_progress) {
      return;
    } else {
      in_progress = true;
    }

    const password = Q.head(Q.val(password_el));

    Q.addClass(spinner_el, 'Spinner');
    Q.addClass(decrypt_btn_el, 'Form__button--disabled');
    Q.html(decrypt_btn_el, '');
    Q.attr(decrypt_btn_el, 'disabled', 'disabled');
    Q.append(decrypt_btn_el, spinner_el);

    // If this is the first time entering a PIN code, make the network request
    // so the server knows the destroy the payload.
    if (cached_encrypted_data === undefined) {
      request
        .get('/api/secrets/' + token + '/' + fetch_code)
        .then(res => {
          const response = JSON.parse(res.text);

          cached_encrypted_data = atob(response.payload);

          attemptDecryption(password, cached_encrypted_data);
        })
        .catch(err => {
          showFailure();
        });
    } else {
      // If attempting the PIN for a second/third/etc time, used the cached
      // network response as the server will no longer have the payload.
      try {
        attemptDecryption(password, cached_encrypted_data);
      } catch (e) {
        showFailure();
      }
    }
  };

  /*
   |----------------------------------------------------------------------------
   | Decrypt button pressed
   |----------------------------------------------------------------------------
   | Manually starts the decryption process.
  */
  Q.on(decrypt_btn_el, 'click', e => {
    startDecrypt();
  });

  /*
   |----------------------------------------------------------------------------
   | Pre-signed URL
   |----------------------------------------------------------------------------
   | If we have a pre-signed URL, automatically start the decryption process
   | given the base64 encoded password hash located in the URL.
  */
  if (password_pre_signed) {
    const password = url_hash.substring(1);

    Q.val(password_el, atob(password));

    startDecrypt();
  }
};

/**
 * Bootstrap this component.
 */
const bootstrap = function bootstrap() {
  Q.documentReady(() => {
    _decrypter();
  });
};

/**
 * Default export.
 */
export default bootstrap;
