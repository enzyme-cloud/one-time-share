const elixir = require('laravel-elixir');

require('laravel-elixir-sri');

elixir(mix => {
  mix
    .sass('main.scss')
    .browserify('main.js')
    .version([
      'css/main.css',
      'js/main.js',
    ])
    .copy('resources/assets/images', 'public/images')
    .sri('css/main.css', null, {
      algorithms: ['sha384'],
    })
    .sri('js/main.js', null, {
      algorithms: ['sha384'],
    })
    .browserSync({
      proxy: 'one-time-share.dev',
    });
});
