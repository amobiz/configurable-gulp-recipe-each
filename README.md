# gulp-ccr-each

Iterates each values and pass to sub tasks. A cascading configurable gulp recipe for [gulp-chef](https://github.com/gulp-cookery/gulp-chef).

## Install

``` bash
$ npm install --save-dev gulp-chef gulp-ccr-each
```

## Recipe

Stream Array (from [gulp-cheatsheet](https://github.com/osscafe/gulp-cheatsheet) p.2)

## Ingredients

* [merge-stream](https://github.com/grncdr/merge-stream)

## Type

[Stream Processor](https://github.com/gulp-cookery/gulp-chef#writing-stream-processor)

## API

### config.values

An array of values to iterate. Injecting each value to sub tasks via their "`config`" context. Configuration of sub task can interpolate the value using template of "`{{var}}`" syntax. Since the value being passed to sub task via the "`config`" context, value must be of type "`object`".

## Usage

``` javascript
var gulp = require('gulp');
var chef = require('gulp-chef');
var consolidate = require('gulp-consolidate').bind(null, 'nunjucks');

var meals = chef({
    'stream-array': {
        src: 'template/',
        dest: 'html/',
        each: {
            values: [{
                name: 'apple',
                title: 'Apple Cake',
                price: '25'
            }, {
                name: 'orange',
                title: 'Orange Cookie',
                price: '18'
            }],
            pipe: {
                '.consolidate': {
                    plugin: consolidate,
                    src: 'a.ejs',
                    options: {
                        title: '{{title}}',
                        price: '{{price}}'
                    }
                },
                '.rename': {
                    plugin: 'gulp-rename',
                    options: {
                        basename: '{{name}}',
                        extname: '.html'
                    },
                    spit: true
                }
            }
        }
    }
});

gulp.registry(meals);
```

## License
[MIT](https://opensource.org/licenses/MIT)

## Author
[Amobiz](https://github.com/amobiz)
