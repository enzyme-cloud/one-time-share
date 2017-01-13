const elixir = require('laravel-elixir')

elixir(mix => {
  mix
    .sass('main.scss')
    .browserify('main.js')
    .version([
      'css/main.css',
      'js/main.js',
    ])
    .copy('resources/assets/images', 'public/images')
    .browserSync({
      proxy: 'ots.dev',
    })
})
