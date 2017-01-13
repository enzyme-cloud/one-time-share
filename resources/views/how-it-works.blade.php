@extends('layouts._base')

@section('content')
    <div class="Layout-quick">
        @include('partials._header')

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--text-center Layout__column--md-6 Layout__column--md-offset-3">
                <h3>How it works</h3>
            </div>
        </div>

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--md-6 Layout__column--md-offset-3">
                <p><b>1. Encryption</b></p>
                <p>OTS generates a unique password using <a href="https://developer.mozilla.org/en/docs/Web/API/RandomSource/getRandomValues">window.crypto.getRandomValues</a> which is used to encrypt the data locally in the browser using the <a href="https://github.com/bitwiseshiftleft/sjcl">SJCL</a> library. The encrypted payload is then base64 encoded and sent to the server, which responds with a unique URL tied to the payload.</p>
                <p>This payload is now known as a "secret". All secrets will be automatically destroyed by the server 12 hours after their creation if they are not decrypted.</p>
            </div>
        </div>

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--md-6 Layout__column--md-offset-3">
                <p><b>2. Sharing</b></p>
                <p>The unique URL and password need to be shared with the intended recipient. This can be done in a number of ways such as a phone call, text message, skype, email etc. As each secret can only be decrypted once before it's destroyed, traces of the unique URL or password discovered down the track by third parties will not be of any use.</p>
            </div>
        </div>

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--md-6 Layout__column--md-offset-3">
                <p><b>3. Decryption</b></p>
                <p>After visiting the unique URL and entering the password, OTS will make a server request for the encrypted payload. When the server receives this request it will respond with the base64 encoded payload and destroy the database copy. The browser will then decode the payload and decrypt it using the provided password.</p>
            </div>
        </div>

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--md-6 Layout__column--md-offset-3">
                <p class="util-notice"><b>Note:</b> the server has no knowledge of the password, so entering an incorrect password will cause the payload to be destroyed by the server after the request is made by the browser. This is considered a security feature as it will give the recipient/sender reason to assume that the data has possibly been compromised - assuming the intended recipient never entered a password at the unique URL and the page is reporting that the secret no longer exists when visited. Remember however that a secret can only be viewed/decrypted once, so if they recipient has entered the correct password at the unique URL, they will be presented with the decrypted data and all subsequent visits to the page will report the secret as non-existent. Always verify with the recipient they received the data.</p>
            </div>
        </div>

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--md-6 Layout__column--md-offset-3">
                <p><b>Pre-signed URL's</b></p>
                <p>A URL including the decryption password can be obtained after you've encrypted some data using OTS. When opened by the recipient, it will automatically enter the correct password and decrypt the data for them. This is useful if you know the recipient will immediately view the link once you've sent it to them and don't want the added complexity of a password.</p>
            </div>
        </div>

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--md-6 Layout__column--md-offset-3">
                <p><b>Synopsis</b></p>
                <p>All encryption and decryption happens in the browser and the server will only ever get the encrypted payload. The payloads are known as secrets and can only be viewed once before they are destroyed. The system will also destroy any secrets 12 hours after they've been created if they have not been viewed.</p>
            </div>
        </div>

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--md-6 Layout__column--md-offset-3">
                <p><b>Worst case scenario</b></p>
                <p><i>If an attacker gains access to the server:</i> they'll have access to all encrypted secrets within a 12 hour period that have not been viewed/decrypted yet.</p>
                <p>As SJCL employs PBKDF2 to strengthen the passwords with salt and a default factor of 1000, it will take a reasonably long time to crack each secret.</p>
                <p>OTS is best used with short turn-around times. Encrypt your data and get the recipient to decrypt it as soon as possible. This will prevent secrets from lingering on the system.</p>
            </div>
        </div>

        @include('partials._footer')
    </div>
@stop
