/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import contract from 'neat-contract';
import pathIsAbsolute from 'path-is-absolute';
import pathIsRelative from 'is-relative-path';

// isNotNil :: a -> Boolean
const isNotNil = R.complement(R.isNil);

// _isLocalFile :: String -> Boolean
const _isLocalFile = R.pipe(
  contract('path', String),
  R.either(pathIsAbsolute, pathIsRelative)
);

// _isModule :: String -> Boolean
const _isModule = R.pipe(
  contract('path', String),
  R.complement(_isLocalFile)
);

// _requested :: Object -> String
const _requested = R.prop('requested');

// _resolved :: Object -> String
const _resolved = R.prop('resolved');

// _from :: Object -> String
const _from = R.prop('from');

// requestedModule :: Object -> Boolean
const isEntry = R.unary(R.pipe(
  contract('dep', Object),
  _requested,
  R.isNil
));

// requestedModule :: Object -> Boolean
const requestedModule = R.unary(R.pipe(
  contract('dep', Object),
  _requested,
  R.ifElse(isNotNil, _isModule, R.F)
));

// requestedLocalFile :: Object -> Boolean
const requestedLocalFile = R.unary(R.pipe(
  contract('dep', Object),
  _requested,
  R.ifElse(isNotNil, _isLocalFile, R.F)
));

// inNodeModules :: Object -> Boolean
const inNodeModules = R.unary(R.pipe(
  contract('dep', Object),
  _resolved,
  R.ifElse(isNotNil, R.test(/node_modules/), R.F)
));

// requestedFromNodeModules :: Object -> Boolean
const requestedFromNodeModules = R.unary(R.pipe(
  contract('dep', Object),
  _from,
  R.ifElse(isNotNil, R.test(/node_modules/), R.F)
));

// resolved :: Object -> Boolean
const resolved = R.unary(R.pipe(
  contract('dep', Object),
  _resolved,
  isNotNil
));

// notResolved :: Object -> Boolean
const notResolved = R.unary(R.pipe(
  contract('dep', Object),
  _resolved,
  R.isNil
));

// isThirdParty :: Object -> Boolean
const isThirdParty = R.cond([
  [isEntry, R.F],
  [requestedModule, requestedFromNodeModules],
  [requestedLocalFile, R.either(requestedFromNodeModules, inNodeModules)],
]);

export default {
  _requested,
  _resolved,
  _from,
  isEntry,
  requestedModule,
  requestedLocalFile,
  inNodeModules,
  requestedFromNodeModules,
  resolved,
  notResolved,
  isThirdParty,
};
