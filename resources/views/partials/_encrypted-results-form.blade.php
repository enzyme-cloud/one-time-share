<div id="js-encrypted-results-form" class="util-hidden Layout__row-quick Layout__column--text-center">
    <div class="Layout__column-quick Layout__column--text-center">
        <div class="Results">
            <div class="Layout__row-quick Layout__column--text-center">
                <div class="Layout__column-quick">
                    <p class="util-label">Short url: <a id="js-encrypted-data-url-short" href="#" target="_blank">{{-- Will be placed here via JS --}}</a></p>
                    <p><a id="js-encrypted-data-url" href="#" target="_blank">{{-- Will be placed here via JS --}}</a></p>
                </div>
            </div>
            <div class="Layout__row-quick Layout__column--text-center">
                <div class="Layout__column-quick">
                    <p class="util-label">Password</p>
                    <div id="js-encrypted-data-password">
                        {{-- Will be placed here via JS --}}
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
                        <p class="util-label">Pre-signed URL</p>
                        <p><a id="js-pre-signed-url" href="#" target="_blank">{{-- Will be placed here via JS --}}</a></p>
                    </div>
                    <div class="Layout__column-quick Layout__column--xs-12">
                        <p class="util-notice">The pre-signed url will automatically decrypt the payload when it is visited – only the recipient should open this url.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
