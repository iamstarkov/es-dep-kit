/* eslint-disable no-multi-spaces */
import test from 'ava';
import { esDepUnit as dep } from 'es-dep-unit';
import kit from './index';

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

const cases = [
  entry,
  file, fileExtra,
  folder, folderExtra,
  pkg, pkgExtra,
  pkgFile, pkgFileExtra,
  nestedPkg, nestedPkgExtra,
  nestedPkgFile, nestedPkgFileExtra,
];

test('isEntry', t => {
  const expected = [
    true,         // entry
    false, false, // file
    false, false, // folder
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

test('requestedModule', t => {
  const expected = [
    false,        // entry
    false, false, // file
    false, false, // folder
    true,  true,  // pkg
    false, false, // pkgFile
    true,  true,  // nestedPkg
    false, false, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.requestedModule(cases[i]), expected[i]);
  });
});
test('requestedModule: empty input', t => t.throws(() => { kit.requestedModule(); }, TypeError));
test('requestedModule: invalid input', t => t.throws(() => { kit.requestedModule(2); }, TypeError));

test('requestedLocalFile', t => {
  const expected = [
    false,        // entry
    true,  true,  // file
    true,  true,  // folder
    false, false, // pkg
    true,  true,  // pkgFile
    false, false, // nestedPkg
    true,  true,  // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.requestedLocalFile(cases[i]), expected[i]);
  });
});
test('requestedLocalFile: empty input', t => t.throws(() => { kit.requestedLocalFile(); }, TypeError));
test('requestedLocalFile: invalid input', t => t.throws(() => { kit.requestedLocalFile(2); }, TypeError));

test('inNodeModules', t => {
  const expected = [
    false,        // entry
    false, false, // file
    false, false, // folder
    true,  false, // pkg
    true,  false, // pkgFile
    true,  false, // nestedPkg
    true,  false, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.inNodeModules(cases[i]), expected[i]);
  });
});
test('inNodeModules: empty input', t => t.throws(() => { kit.inNodeModules(); }, TypeError));
test('inNodeModules: invalid input', t => t.throws(() => { kit.inNodeModules(2); }, TypeError));

test('requestedFromNodeModules', t => {
  const expected = [
    false,        // entry
    false, false, // file
    false, false, // folder
    false, false, // pkg
    true,  true,  // pkgFile
    true,  true,  // nestedPkg
    true,  true,  // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.requestedFromNodeModules(cases[i]), expected[i]);
  });
});
test('requestedFromNodeModules: empty input', t => t.throws(() => { kit.requestedFromNodeModules(); }, TypeError)); // eslint-disable-line
test('requestedFromNodeModules: invalid input', t => t.throws(() => { kit.requestedFromNodeModules(2); }, TypeError)); // eslint-disable-line

test('resolved', t => {
  const expected = [
    true,       // entry
    true, false, // file
    true, false, // folder
    true, false, // pkg
    true, false, // pkgFile
    true, false, // nestedPkg
    true, false, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.resolved(cases[i]), expected[i]);
  });
});
test('resolved: empty input', t => t.throws(() => { kit.resolved(); }, TypeError));
test('resolved: invalid input', t => t.throws(() => { kit.resolved(2); }, TypeError));

test('not resolved', t => {
  const expected = [
    false,       // entry
    false, true, // file
    false, true, // folder
    false, true, // pkg
    false, true, // pkgFile
    false, true, // nestedPkg
    false, true, // nestedPkgFile
  ];
  expected.forEach((item, i) => {
    t.is(kit.notResolved(cases[i]), expected[i]);
  });
});
test('notResolved: empty input', t => t.throws(() => { kit.notResolved(); }, TypeError));
test('notResolved: invalid input', t => t.throws(() => { kit.notResolved(2); }, TypeError));

test('isThirdParty', t => {
  const expected = [
    false,        // entry
    false, false, // file
    false, false, // folder
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
