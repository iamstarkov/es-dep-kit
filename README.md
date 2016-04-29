# es-dep-kit

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> ECMAScript 2015+/CommonJS module dependencies helpers kit

## Install

    npm install --save es-dep-kit

## API

Every function requires one `dep` argument — `Object` described by [es-dep-unit][es-dep-unit].

* `_requested` — returns `dep.requested`
* `_from` — returns `dep.from`
* `_resolved` — returns `dep.resolved`

* `isEntry` — true if `dep.requested` is `null`
* `isRequestedPackage` — true if `dep.requested` is not a local file
* `isRequestedLocalFile` — true if `dep.requested` is a local file
* `isResolvedInNM` — true if `dep.resolved` contains `node_modules`
* `isRequestedFromNM` — true if `dep.from` contains `node_modules`
* `isResolved` — true if `dep.resolved` is not `null`
* `isNotResolved` — true if `dep.resolved` is `null`
* `isThirdParty` — true if `dep` is not direct dependency: not local file and not `package` being requested from local file

## Usage

```js
import kit from 'es-dep-kit';
import { esDepUnit as dep } from 'es-dep-unit';

// arguments are `requested`, `from` and `resolved` respectively
// if string is relative path, it will be prepended with `process.cwd()`
const entry = dep(null, null, 'index.js');

const file      = dep('./file',       'index.js', 'file.js');
const fileExtra = dep('./file-extra', 'index.js', null);

const pkg      = dep('pkg',       'index.js', 'node_modules/pkg/index.js');
const pkgExtra = dep('pkg-extra', 'index.js', null);

const pkgFile      = dep('./pkg-file',       'node_modules/pkg/index.js', 'node_modules/pkg/file.js'); // eslint-disable-line
const pkgFileExtra = dep('./pkg-file-extra', 'node_modules/pkg/index.js', null);

const nestedPkg      = dep('nested-pkg',       'node_modules/pkg/index.js', 'node_modules/pkg/node_modules/nested-pkg/index.js'); // eslint-disable-line
const nestedPkgExtra = dep('nested-pkg-extra', 'node_modules/pkg/index.js', null);

const nestedPkgFile      = dep('./nested-pkg-file',       'node_modules/pkg/node_modules/nested-pkg/index.js', 'node_modules/pkg/node_modules/nested-pkg/file.js'); // eslint-disable-line
const nestedPkgFileExtra = dep('./nested-pkg-file-extra', 'node_modules/pkg/node_modules/nested-pkg/index.js', null); // eslint-disable-line

kit._requested(file); // ./file
kit._resolved(file);  // /Users/iamstarkov/projects/es-dep-kit/file.js
kit._from(file);      // /Users/iamstarkov/projects/es-dep-kit/index.js

kit.isEntry(entry); // true
kit.isEntry(file);  // false

kit.isRequestedPackage(file); // false
kit.isRequestedPackage(pkg);  // true

kit.isRequestedLocalFile(file);      // true
kit.isRequestedLocalFile(pkg);       // false
kit.isRequestedLocalFile(pkgFile);   // true
kit.isRequestedLocalFile(nestedPkg); // false

kit.isResolvedInNM(file);     // false
kit.isResolvedInNM(pkg);      // true
kit.isResolvedInNM(pkgExtra); // false

kit.isRequestedFromNM(file); // false
kit.isRequestedFromNM(pkg);  // false
kit.isRequestedFromNM(nestedPkg); // true

kit.isResolved(file); // true
kit.isNotResolved(fileExtra); // true

kit.isThirdParty(file); // false
kit.isThirdParty(pkg);  // false
kit.isThirdParty(pkgFile);       // true
kit.isThirdParty(nestedPkg);     // true
kit.isThirdParty(nestedPkgFile); // true
```

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
