@extends('layouts._base')

@section('content')
    <div class="Layout-quick">
        @include('partials._header')

        <input id="js-secret-destroyed" type="hidden" value="{{ $destroyed ? 'yes' : 'no' }}">

        @if ($destroyed)
            @include('partials._destroyed-notice')
        @else
            @include('partials._decrypt-form')
        @endif

        @include('partials._footer')
    </div>
@stop
