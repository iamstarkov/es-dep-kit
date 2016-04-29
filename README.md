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
import kit from 'es-dep-kit';
import { esDepUnit as dep } from 'es-dep-unit';

// arguments are `requested`, `from` and `resolved` respectively
// is string is relative path, it concatenated with `process.cwd()`
const entry = dep(null, null, 'index.js');

const file      = dep('./file',       'index.js', 'file.js');
const fileExtra = dep('./file-extra', 'index.js', null);

const folder      = dep('./folder',       'index.js', 'folder/index.js');
const folderExtra = dep('./folder-extra', 'index.js', null);

const pkg      = dep('pkg',       'index.js', 'node_modules/pkg/index.js');
const pkgExtra = dep('pkg-extra', 'index.js', null);

const pkgFile      = dep('./pkg-file',       'node_modules/pkg/index.js', 'node_modules/pkg/file.js'); // eslint-disable-line
const pkgFileExtra = dep('./pkg-file-extra', 'node_modules/pkg/index.js', null);

const nestedPkg      = dep('nested-pkg',       'node_modules/pkg/index.js', 'node_modules/pkg/node_modules/nested-pkg/index.js'); // eslint-disable-line
const nestedPkgExtra = dep('nested-pkg-extra', 'node_modules/pkg/index.js', null);

const nestedPkgFile      = dep('./nested-pkg-file',       'node_modules/pkg/node_modules/nested-pkg/index.js', 'node_modules/pkg/node_modules/nested-pkg/file.js'); // eslint-disable-line
const nestedPkgFileExtra = dep('./nested-pkg-file-extra', 'node_modules/pkg/node_modules/nested-pkg/index.js', null); // eslint-disable-line

kit._requested(file); //
kit._resolved(); //
kit._from(); //
kit.isEntry(); //
kit.requestedModule(); //
kit.requestedLocalFile(); //
kit.inNodeModules(); //
kit.requestedFromNodeModules(); //
kit.resolved(); //
kit.notResolved(); //
kit.isThirdParty(); //
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

## Related

* [es-deps][es-deps] — ECMAScript 2015+/CommonJS module dependencies array
* [es-deps-from-string][es-deps-from-string] — ECMAScript 2015+/CommonJS module dependencies array from string
* [es-deps-resolved][es-deps-resolved] — ECMAScript 2015+/CommonJS module dependencies resolved array
* [es-dep-unit][es-dep-unit] — Constructor for ECMAScript 2015+/CommonJS dependency unit `Object { requested, from, resolved }`
* [es-deps-deep][es-deps-deep] — ECMAScript 2015+/CommonJS module dependencies resolved in depth

[es-deps]: https://github.com/iamstarkov/es-deps
[es-deps-from-string]: https://github.com/iamstarkov/es-deps-from-string
[es-deps-resolved]: https://github.com/iamstarkov/es-deps-resolved
[es-dep-unit]: https://github.com/iamstarkov/es-dep-unit
[es-deps-deep]: https://github.com/iamstarkov/es-deps-deep

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
