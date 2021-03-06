<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <title>OTS &#8212; Secure credential sharing.</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto:400,900" rel="stylesheet">
    <link rel="stylesheet" href="{{ elixir('css/main.css') }}" integrity="{{ integrity('css/main.css') }}" crossorigin="anonymous">

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">
</head>
<body class="Body">

    <div class="Container">
        <div class="Container__inner">
            @yield('content')
        </div>
    </div>

    <div id="js-flash" class="Flash">
        <div class="Layout-quick">
            <div class="Layout__row">
                <div id="js-flash-content" class="Layout__column-quick Layout__column--text-center">
                    Something went wrong, please try again later.
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/sjcl/1.0.6/sjcl.min.js" integrity="sha384-uUk05Hm5S/G7X2TUGZj9GIX4zH0Z/Enc47TkjSCCJCoR0jOdAVlEWvstJgRdF/AG" crossorigin="anonymous"></script>
    <script src="{{ elixir('js/main.js') }}" integrity="{{ integrity('js/main.js') }}" crossorigin="anonymous"></script>
</body>
</html>
