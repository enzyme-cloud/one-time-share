<?php

Route::get('/', 'HomeController@index')
    ->name('home');

Route::get('/how-it-works', 'HowItWorksController@index')
    ->name('how-it-works');

Route::get('/view/{uuid}/{fetch_code}', 'ViewController@index')
    ->where([
        'uuid'       => '[a-zA-Z0-9]+',
        'fetch_code' => '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$',
    ])
    ->name('view');
