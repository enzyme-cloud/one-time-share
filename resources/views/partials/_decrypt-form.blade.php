<div id="js-decrypt-form">
    <div class="Form">
        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--text-center Layout__column--sm-6 Layout__column--sm-offset-3 Layout__column--md-4 Layout__column--md-offset-4">
                <p class="util-label">Enter password</p>
                <input id="js-password" class="Form__input" type="password">
            </div>
        </div>
    </div>

    <div class="Layout__row-quick">
        <div class="Layout__column-quick Layout__column--text-center">
            <input id="js-secret-token" type="hidden" value="{{ $uuid }}">
            <input id="js-fetch-code" type="hidden" value="{{ $fetch_code }}">
            <button id="js-decrypt-data-btn" class="Form__button">Decrypt data</button>
        </div>
    </div>
</div>

<div id="js-decrypted-data-box" class="util-hidden">
    <div class="Layout__row">
        <div class="Layout__column-quick Layout__column--text-center">
            <p class="util-label">Decrypted data</p>
        </div>
    </div>
    <div class="Layout__row-quick">
        <div class="Layout__column-quick">
            <div id="js-decrypted-results" class="Results">
                {{-- Will be placed here via JS --}}
            </div>
        </div>
    </div>
    <div class="Layout__row-quick">
        <div class="Layout__column-quick Layout__column--text-center">
            <p class="util-notice"><b>Note:</b> make sure you save the decrypted data above – it will be lost forever if you refresh or close this page.</p>
        </div>
    </div>
</div>
