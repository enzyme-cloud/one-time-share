<?php

Route::get('/', 'HomeController@index')->name('home');
Route::get('/view/{uuid}/{fetch_code}', 'ViewController@index')->name('view');
Route::get('/how-it-works', 'HowItWorksController@index')->name('how-it-works');
