<?php

Route::post('secrets', 'SecretsController@store');

Route::get('secrets/{uuid}/{fetch_code}', 'SecretsController@view')
    ->where([
        'uuid'       => '[a-zA-Z0-9]+',
        'fetch_code' => '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$',
    ]);
