import Q from 'qoob';
import request from 'superagent';
import flash from '../lib/flash.js';
import getUniquePassword from '../lib/password.js';

/**
 * Create and start the encrypter component.
 */
const _encrypter = function _encrypter() {
  /*
   |----------------------------------------------------------------------------
   | encryption_settings
   |----------------------------------------------------------------------------
   | Settings passed to the SJCL encrypt function.
  */
  const encryption_settings = {
    iter: 20000, // Iterations.
    ks: 256,     // Key size.
    mode: "gcm"  // Cipher mode.
  };

  const plain_data_field         = Q.first('#js-plain-data-field');
  const encrypt_data_btn         = Q.first('#js-encrypt-data-btn');
  const encrypt_data_btn_value   = Q.html(encrypt_data_btn);
  const encrypt_form             = Q.first('#js-encrypt-form');
  const encrypted_results_form   = Q.first('#js-encrypted-results-form');
  const encrypted_data_url       = Q.first('#js-encrypted-data-url');
  const encrypted_data_url_short = Q.first('#js-encrypted-data-url-short');
  const encrypted_data_password  = Q.first('#js-encrypted-data-password');
  const pre_signed_url_btn_box   = Q.first('#js-pre-signed-url-btn-box');
  const pre_signed_url_btn       = Q.first('#js-pre-signed-url-btn');
  const pre_signed_url_box       = Q.first('#js-pre-signed-url-box');
  const pre_signed_url           = Q.first('#js-pre-signed-url');
  const spinner                  = Q.make('div');

  let in_progress = false;

  /*
   |----------------------------------------------------------------------------
   | Encrypt data button pressed
   |----------------------------------------------------------------------------
   | Starts the encryption process. This will generate a secure random password
   | and encrypt the users data using the SJCL. It will then store the
   | encrypted payload on the server and show the resulting URL's
   | and password to the user to make use of.
  */
  Q.on(encrypt_data_btn, 'click', e => {
    if (in_progress) {
      return;
    } else {
      in_progress = true;
    }

    const plain_data = Q.head(Q.val(plain_data_field));
    const password = getUniquePassword(18);
    const encrypted_data = sjcl.encrypt(password, plain_data, encryption_settings);
    const fetch_code = btoa(getUniquePassword(32));

    Q.addClass(spinner, 'Spinner');
    Q.addClass(encrypt_data_btn, 'Form__button--disabled');
    Q.html(encrypt_data_btn, '');
    Q.attr(encrypt_data_btn, 'disabled', 'disabled');
    Q.append(encrypt_data_btn, spinner);

    request
      .post('/api/secrets')
      .send({
        'payload': btoa(encrypted_data),
        'fetch_code': fetch_code,
      })
      .then(res => {
        const response = JSON.parse(res.text);

        // Fill in the various links.
        Q.val(encrypted_data_url, response.url);
        Q.val(encrypted_data_url_short, response.short);
        Q.val(pre_signed_url, response.url + '#' + btoa(password));
        Q.val(encrypted_data_password, password);

        Q.hide(encrypt_form);
        Q.show(encrypted_results_form);
      })
      .catch(err => {
        Q.removeClass(encrypt_data_btn, 'Form__button--disabled');
        Q.html(encrypt_data_btn, encrypt_data_btn_value);
        Q.removeAttr(encrypt_data_btn, 'disabled');

        flash('An error occured on the server, please try again later.');

        in_progress = false;
      });
  });

  /*
   |----------------------------------------------------------------------------
   | Pre-signed URL button pressed
   |----------------------------------------------------------------------------
   | Will reveal the pre-signed URL and warning to the user.
  */
  Q.on(pre_signed_url_btn, 'click', e => {
    Q.hide(pre_signed_url_btn_box);
    Q.show(pre_signed_url_box);
  });
};

/**
 * Bootstrap this component.
 */
const bootstrap = function bootstrap() {
  Q.documentReady(() => {
    _encrypter();
  });
};

/**
 * Default export.
 */
export default bootstrap;
