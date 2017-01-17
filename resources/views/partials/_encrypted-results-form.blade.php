<div id="js-encrypted-results-form" class="util-hidden Layout__row-quick Layout__column--text-center">
    <div class="Layout__column-quick Layout__column--text-center">
        <div class="Results">
            <div class="Layout__row-quick Layout__column--text-center">
                <div class="Layout__column-quick">
                    <div class="Form">
                        <p class="util-label">Short url</p>
                        <input id="js-encrypted-data-url-short" type="text" class="js-text-select Form__input" readonly>
                    </div>
                </div>
            </div>
            <div class="Layout__row-quick Layout__column--text-center">
                <div class="Layout__column-quick">
                    <div class="Form">
                        <p class="util-label">Full url</p>
                        <input id="js-encrypted-data-url" type="text" class="js-text-select Form__input" readonly>
                    </div>
                </div>
            </div>
            <div class="Layout__row-quick Layout__column--text-center">
                <div class="Layout__column-quick">
                    <div class="Form">
                        <p class="util-label">Password</p>
                        <input id="js-encrypted-data-password" type="text" class="js-text-select Form__input" readonly>
                    </div>
                </div>
            </div>
            <div class="Layout__row-quick Layout__column--text-center">
                <div class="Layout__column-quick">
                    <p>Use the password above to decrypt the data at the provided URL. The encrypted data will be automatically destroyed in 12 hours.</p>
                </div>
            </div>
            <div class="Layout__row-quick Layout__column--text-center">
                <div class="Layout__column-quick">
                    <hr>
                </div>
            </div>
            <div class="Form">
                <div id="js-pre-signed-url-btn-box" class="Layout__row Layout__column--text-center">
                    <div class="Layout__column-quick">
                        <button id="js-pre-signed-url-btn" class="Form__button">Get pre-signed url</button>
                    </div>
                </div>
                <div id="js-pre-signed-url-box" class="Layout__row Layout__row--bottoms Layout__column--text-center util-hidden">
                    <div class="Layout__column-quick Layout__column--xs-12">
                        <div class="Form">
                            <p class="util-label">Pre-signed URL</p>
                            <input id="js-pre-signed-url" type="text" class="js-text-select Form__input" readonly>
                        </div>
                    </div>
                    <div class="Layout__column-quick Layout__column--xs-12">
                        <p class="util-notice">The pre-signed url will automatically decrypt the payload when it is visited – only the recipient should open this url.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
