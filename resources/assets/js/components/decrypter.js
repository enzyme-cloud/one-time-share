import flash from '../lib/flash.js'

export default ({ Q, request }) => {
  // Let's jump out early if this secret has already been destroyed.
  const ALREADY_DESTROYED = Q.head(Q.val(Q.first('#js-secret-destroyed'))) === 'yes'
  if (ALREADY_DESTROYED) {
    return;
  }

  const DECRYPT_FORM       = Q.first('#js-decrypt-form')
  const DECRYPTED_DATA_BOX = Q.first('#js-decrypted-data-box')
  const DECRYPTED_RESULTS  = Q.first('#js-decrypted-results')
  const PASSWORD_EL        = Q.first('#js-password')
  const DECRYPT_BTN_EL     = Q.first('#js-decrypt-data-btn')
  const DECRYPT_BTN_VALUE  = Q.html(DECRYPT_BTN_EL)
  const TOKEN              = Q.head(Q.val(Q.first('#js-secret-token')))
  const FETCH_CODE         = Q.head(Q.val(Q.first('#js-fetch-code')))
  const SPINNER_EL         = Q.make('div')

  // Is the URL pre-signed?
  const URL_HASH = window.location.hash
  const PASSWORD_PRE_SIGNED = URL_HASH.length > 0

  let in_progress = false
  let cached_encrypted_data = undefined

  /*
   |----------------------------------------------------------------------------
   | showFailure
   |----------------------------------------------------------------------------
   | Alerts the user to a failure during the decryption process.
  */
  let showFailure = function showFailure() {
    Q.removeClass(DECRYPT_BTN_EL, 'Form__button--disabled')
    Q.html(DECRYPT_BTN_EL, DECRYPT_BTN_VALUE)
    Q.removeAttr(DECRYPT_BTN_EL, 'disabled')

    flash('Decryption failed, please try again.')

    in_progress = false
  }

  /*
   |----------------------------------------------------------------------------
   | attemptDecryption
   |----------------------------------------------------------------------------
   | Given the `password` and `encrypted_data`, attempts to decrypt the payload.
   | Assuming no exceptions are thrown, places the results in DECRYPTED_RESULTS
   | and shows the results.
  */
  let attemptDecryption = function attemptDecryption(password, encrypted_data) {
    const DATA = sjcl
      .decrypt(password, encrypted_data)
      .replace(/(?:\r\n|\r|\n)/g, '<br />')

    Q.html(DECRYPTED_RESULTS, DATA)
    Q.hide(DECRYPT_FORM)
    Q.show(DECRYPTED_DATA_BOX)
  }

  /*
   |----------------------------------------------------------------------------
   | startDecrypt
   |----------------------------------------------------------------------------
   | Requests the server for the encrypted payload and attempts to decrypt
   | the payload using the value found in the PASSWORD_EL element. If a
   | server request has already been made once before, it will use the
   | cached encrypted data instead.
  */
  let startDecrypt = function startDecrypt() {
    if (in_progress) {
      return
    } else {
      in_progress = true
    }

    const PASSWORD = Q.head(Q.val(PASSWORD_EL))

    Q.addClass(SPINNER_EL, 'Spinner')
    Q.addClass(DECRYPT_BTN_EL, 'Form__button--disabled')
    Q.html(DECRYPT_BTN_EL, '')
    Q.attr(DECRYPT_BTN_EL, 'disabled', 'disabled')
    Q.append(DECRYPT_BTN_EL, SPINNER_EL)

    // If this is the first time entering a PIN code, make the network request
    // so the server knows the destroy the payload.
    if (cached_encrypted_data === undefined) {
      request
        .get('/api/secrets/' + TOKEN + '/' + FETCH_CODE)
        .then(res => {
          const RESPONSE = JSON.parse(res.text)

          cached_encrypted_data = atob(RESPONSE.payload)

          attemptDecryption(PASSWORD, cached_encrypted_data)
        })
        .catch(err => {
          showFailure()
        })
    } else {
      // If attempting the PIN for a second/third/etc time, used the cached
      // network response as the server will no longer have the payload.
      try {
        attemptDecryption(PASSWORD, cached_encrypted_data)
      } catch (e) {
        showFailure()
      }
    }
  }

  /*
   |----------------------------------------------------------------------------
   | Decrypt button pressed
   |----------------------------------------------------------------------------
   | Manually starts the decryption process.
  */
  Q.on(DECRYPT_BTN_EL, 'click', (e) => {
    startDecrypt()
  })

  /*
   |----------------------------------------------------------------------------
   | Pre-signed URL
   |----------------------------------------------------------------------------
   | If we have a pre-signed URL, automatically start the decryption process
   | given the base64 encoded password hash located in the URL.
  */
  if (PASSWORD_PRE_SIGNED) {
    const PASSWORD = URL_HASH.substring(1)

    Q.val(PASSWORD_EL, atob(PASSWORD))

    startDecrypt()
  }
}
