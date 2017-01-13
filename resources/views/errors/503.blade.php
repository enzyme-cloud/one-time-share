@extends('layouts._base')

@section('content')
    <div class="Layout-quick">
        @include('partials._header')

        <div class="Layout__row-quick">
            <div class="Layout__column-quick Layout__column--text-center">
                <div class="Results">
                    <h2>503</h2>
                    <p>Be right back</p>
                </div>
            </div>
        </div>

        @include('partials._footer')
    </div>
@stop
