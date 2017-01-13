@extends('layouts._base')

@section('content')
    <div class="Layout-quick">
        @include('partials._header')

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--text-center">
                <div class="Results">
                    <h2>404</h2>
                    <p>Page not found</p>
                </div>
            </div>
        </div>

        @include('partials._footer')
    </div>
@stop
