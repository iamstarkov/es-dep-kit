/* eslint-disable no-multi-spaces */
import test from 'ava';
import dep from 'es-dep-unit';
import kit from './index';

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

const cases = [
  entry,
  file, fileExtra,
  pkg, pkgExtra,
  pkgFile, pkgFileExtra,
  nestedPkg, nestedPkgExtra,
  nestedPkgFile, nestedPkgFileExtra,
];

test('isEntry', t => {
  const expected = [
    true,         // entry
    false, false, // file
    false, false, // pkg
    false, false, // pkgFile
    false, false, // nestedPkg
    false, false, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isEntry(cases[i]), expected[i]);
  });
});
test('isEntry: empty input', t => t.throws(() => { kit.isEntry(); }, TypeError));
test('isEntry: invalid input', t => t.throws(() => { kit.isEntry(2); }, TypeError));

test('isRequestedPackage', t => {
  const expected = [
    false,        // entry
    false, false, // file
    true,  true,  // pkg
    false, false, // pkgFile
    true,  true,  // nestedPkg
    false, false, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isRequestedPackage(cases[i]), expected[i]);
  });
});
test('isRequestedPackage: empty input', t => t.throws(() => { kit.isRequestedPackage(); }, TypeError)); // eslint-disable-line
test('isRequestedPackage: invalid input', t => t.throws(() => { kit.isRequestedPackage(2); }, TypeError)); // eslint-disable-line

test('isRequestedLocalFile', t => {
  const expected = [
    false,        // entry
    true,  true,  // file
    false, false, // pkg
    true,  true,  // pkgFile
    false, false, // nestedPkg
    true,  true,  // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isRequestedLocalFile(cases[i]), expected[i]);
  });
});
test('isRequestedLocalFile: empty input', t => t.throws(() => { kit.isRequestedLocalFile(); }, TypeError));  // eslint-disable-line
test('isRequestedLocalFile: invalid input', t => t.throws(() => { kit.isRequestedLocalFile(2); }, TypeError));  // eslint-disable-line

test('isResolvedInNM', t => {
  const expected = [
    false,        // entry
    false, false, // file
    true,  false, // pkg
    true,  false, // pkgFile
    true,  false, // nestedPkg
    true,  false, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isResolvedInNM(cases[i]), expected[i]);
  });
});
test('isResolvedInNM: empty input', t => t.throws(() => { kit.isResolvedInNM(); }, TypeError));
test('isResolvedInNM: invalid input', t => t.throws(() => { kit.isResolvedInNM(2); }, TypeError));

test('isRequestedFromNM', t => {
  const expected = [
    false,        // entry
    false, false, // file
    false, false, // pkg
    true,  true,  // pkgFile
    true,  true,  // nestedPkg
    true,  true,  // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isRequestedFromNM(cases[i]), expected[i]);
  });
});
test('isRequestedFromNM: empty input', t => t.throws(() => { kit.isRequestedFromNM(); }, TypeError)); // eslint-disable-line
test('isRequestedFromNM: invalid input', t => t.throws(() => { kit.isRequestedFromNM(2); }, TypeError)); // eslint-disable-line

test('is resolved', t => {
  const expected = [
    true,       // entry
    true, false, // file
    true, false, // pkg
    true, false, // pkgFile
    true, false, // nestedPkg
    true, false, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isResolved(cases[i]), expected[i]);
  });
});
test('isResolved: empty input', t => t.throws(() => { kit.isResolved(); }, TypeError));
test('isResolved: invalid input', t => t.throws(() => { kit.isResolved(2); }, TypeError));

test('is not resolved', t => {
  const expected = [
    false,       // entry
    false, true, // file
    false, true, // pkg
    false, true, // pkgFile
    false, true, // nestedPkg
    false, true, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isNotResolved(cases[i]), expected[i]);
  });
});
test('isNotResolved: empty input', t => t.throws(() => { kit.isNotResolved(); }, TypeError));
test('isNotResolved: invalid input', t => t.throws(() => { kit.isNotResolved(2); }, TypeError));

test('isThirdParty', t => {
  const expected = [
    false,        // entry
    false, false, // file
    false, false, // pkg
    true,  true,  // pkgFile
    true,  true,  // nestedPkg
    true,  true,  // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.isThirdParty(cases[i]), expected[i]);
  });
});
test('isThirdParty: empty input', t => t.throws(() => { kit.isThirdParty(); }, TypeError)); // eslint-disable-line
test('isThirdParty: invalid input', t => t.throws(() => { kit.isThirdParty(2); }, TypeError)); // eslint-disable-line
