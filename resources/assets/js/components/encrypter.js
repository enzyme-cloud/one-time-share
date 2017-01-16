import flash from '../lib/flash.js'
import getUniquePassword from '../lib/password.js'

export default ({ Q, request }) => {
  /*
   |----------------------------------------------------------------------------
   | ENCRYPTION_SETTINGS
   |----------------------------------------------------------------------------
   | Settings passed to the SJCL encrypt function.
  */
  const ENCRYPTION_SETTINGS = {
    iter: 20000, // Iterations.
    ks: 256,     // Key size.
    mode: "gcm"  // Cipher mode.
  }

  const PLAIN_DATA_FIELD         = Q.first('#js-plain-data-field')
  const ENCRYPT_DATA_BTN         = Q.first('#js-encrypt-data-btn')
  const ENCRYPT_DATA_BTN_VALUE   = Q.html(ENCRYPT_DATA_BTN)
  const ENCRYPT_FORM             = Q.first('#js-encrypt-form')
  const ENCRYPTED_RESULTS_FORM   = Q.first('#js-encrypted-results-form')
  const ENCRYPTED_DATA_URL       = Q.first('#js-encrypted-data-url')
  const ENCRYPTED_DATA_URL_SHORT = Q.first('#js-encrypted-data-url-short')
  const ENCRYPTED_DATA_PASSWORD  = Q.first('#js-encrypted-data-password')
  const PRE_SIGNED_URL_BTN_BOX   = Q.first('#js-pre-signed-url-btn-box')
  const PRE_SIGNED_URL_BTN       = Q.first('#js-pre-signed-url-btn')
  const PRE_SIGNED_URL_BOX       = Q.first('#js-pre-signed-url-box')
  const PRE_SIGNED_URL           = Q.first('#js-pre-signed-url')
  const SPINNER                  = Q.make('div')

  let in_progress = false

  /*
   |----------------------------------------------------------------------------
   | Encrypt data button pressed
   |----------------------------------------------------------------------------
   | Starts the encryption process. This will generate a secure random password
   | and encrypt the users data using the SJCL. It will then store the
   | encrypted payload on the server and show the resulting URL's
   | and password to the user to make use of.
  */
  Q.on(ENCRYPT_DATA_BTN, 'click', (e) => {
    if (in_progress) {
      return
    } else {
      in_progress = true
    }

    const PLAIN_DATA = Q.head(Q.val(PLAIN_DATA_FIELD))
    const PASSWORD = getUniquePassword(18)
    const ENCRYPTED_DATA = sjcl.encrypt(PASSWORD, PLAIN_DATA, ENCRYPTION_SETTINGS)
    const FETCH_CODE = btoa(sjcl.hash.sha256.hash(JSON.parse(ENCRYPTED_DATA).salt));

    Q.addClass(SPINNER, 'Spinner')
    Q.addClass(ENCRYPT_DATA_BTN, 'Form__button--disabled')
    Q.html(ENCRYPT_DATA_BTN, '')
    Q.attr(ENCRYPT_DATA_BTN, 'disabled', 'disabled')
    Q.append(ENCRYPT_DATA_BTN, SPINNER)

    request
      .post('/api/secrets')
      .send({
        'payload': btoa(ENCRYPTED_DATA),
        'fetch_code': FETCH_CODE,
      })
      .then(res => {
        const RESPONSE = JSON.parse(res.text)

        // Fill in the various links.
        Q.val(ENCRYPTED_DATA_URL, RESPONSE.url)
        Q.val(ENCRYPTED_DATA_URL_SHORT, RESPONSE.short)
        Q.val(PRE_SIGNED_URL, RESPONSE.url + '#' + btoa(PASSWORD))
        Q.val(ENCRYPTED_DATA_PASSWORD, PASSWORD)

        Q.hide(ENCRYPT_FORM)
        Q.show(ENCRYPTED_RESULTS_FORM)
      })
      .catch(err => {
        Q.removeClass(ENCRYPT_DATA_BTN, 'Form__button--disabled')
        Q.html(ENCRYPT_DATA_BTN, ENCRYPT_DATA_BTN_VALUE)
        Q.removeAttr(ENCRYPT_DATA_BTN, 'disabled')

        flash('An error occured on the server, please try again later.')

        in_progress = false
      })
  })

  /*
   |----------------------------------------------------------------------------
   | Pre-signed URL button pressed
   |----------------------------------------------------------------------------
   | Will reveal the pre-signed URL and warning to the user.
  */
  Q.on(PRE_SIGNED_URL_BTN, 'click', (e) => {
    Q.hide(PRE_SIGNED_URL_BTN_BOX)
    Q.show(PRE_SIGNED_URL_BOX)
  })
}
