<?php

Route::post('secrets', 'SecretsController@store');
Route::get('secrets/{uuid}/{fetch_code}', 'SecretsController@view');
