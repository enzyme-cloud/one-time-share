@extends('layouts._base')

@section('content')
    <div class="Layout-quick">
        @include('partials._header')
        @include('partials._encrypt-form')
        @include('partials._encrypted-results-form')
        @include('partials._footer')
    </div>
@stop
