# es-dep-kit

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> ECMAScript 2015+/CommonJS module dependencies helpers kit

## Install

    npm install --save es-dep-kit

## Usage

```js
import { esDepKit, esDepKitAsync } from 'es-dep-kit';

esDepKit('unicorns'); // unicorns
esDepKitAsync('unicorns')
  .then(result => console.log(result)); // unicorns
```

## API

### esDepKit(input, [options])

### esDepKitAsync(input, [options])

Return a promise that resolves to `result`.

#### input

*Required*  
Type: `String`

Lorem ipsum.

#### options

##### foo

Type: `Boolean`  
Default: `false`

Lorem ipsum.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/es-dep-kit
[npm-image]: https://img.shields.io/npm/v/es-dep-kit.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/es-dep-kit
[travis-image]: https://img.shields.io/travis/iamstarkov/es-dep-kit.svg?style=flat-square&label=unix

[appveyor-url]: https://ci.appveyor.com/project/iamstarkov/es-dep-kit
[appveyor-image]: https://img.shields.io/appveyor/ci/iamstarkov/es-dep-kit.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/iamstarkov/es-dep-kit
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/es-dep-kit.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/es-dep-kit
[depstat-image]: https://david-dm.org/iamstarkov/es-dep-kit.svg?style=flat-square
