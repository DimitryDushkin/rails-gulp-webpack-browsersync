Rails + super front-end project stub
=====


To start live compilation of static files
```
cd front
npm install
node_modules/.bin/gulp watch
```

And start rails server in other console:
```
cd ../back
bundle install
rails s

open http://localhost:3000
```

These great techs await you:
 * Rails 4
 * SLIM
 * gulp
 * webpack
 * LESS
 * Coffeescript
 * SVG icons
 * Browsersync

Important note
=====

Sprockets here is 2.12.3 version, because in Sprockets 3.0 `.self.` is added to all files what breaks reloading of CSS without whole page refresh.

I will try to avoid this limitation in the future .

Also `config.assets.digest = false` is set in `./back/config/environments/development.rb` to disable changing static files' names via Sprockets what's also needed for reloading CSS with page refresh.
