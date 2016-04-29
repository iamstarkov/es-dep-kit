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

// _isPackage :: String -> Boolean
const _isPackage = R.pipe(
  contract('path', String),
  R.complement(_isLocalFile)
);

// _requested :: Object -> String
const _requested = R.prop('requested');

// _from :: Object -> String
const _from = R.prop('from');

// _resolved :: Object -> String
const _resolved = R.prop('resolved');

// isEntry :: Object -> Boolean
const isEntry = R.unary(R.pipe(
  contract('dep', Object),
  _requested,
  R.isNil
));

// isRequestedPackage :: Object -> Boolean
const isRequestedPackage = R.unary(R.pipe(
  contract('dep', Object),
  _requested,
  R.ifElse(isNotNil, _isPackage, R.F)
));

// isRequestedLocalFile :: Object -> Boolean
const isRequestedLocalFile = R.unary(R.pipe(
  contract('dep', Object),
  _requested,
  R.ifElse(isNotNil, _isLocalFile, R.F)
));

// isResolvedInNM :: Object -> Boolean
const isResolvedInNM = R.unary(R.pipe(
  contract('dep', Object),
  _resolved,
  R.ifElse(isNotNil, R.test(/node_modules/), R.F)
));

// isRequestedFromNM :: Object -> Boolean
const isRequestedFromNM = R.unary(R.pipe(
  contract('dep', Object),
  _from,
  R.ifElse(isNotNil, R.test(/node_modules/), R.F)
));

// isResolved :: Object -> Boolean
const isResolved = R.unary(R.pipe(
  contract('dep', Object),
  _resolved,
  isNotNil
));

// isNotResolved :: Object -> Boolean
const isNotResolved = R.unary(R.pipe(
  contract('dep', Object),
  R.complement(isResolved)
));

// isThirdParty :: Object -> Boolean
const isThirdParty = R.cond([
  [isEntry, R.F],
  [isRequestedPackage, isRequestedFromNM],
  [isRequestedLocalFile, R.either(isRequestedFromNM, isResolvedInNM)],
]);

export default {
  _requested,
  _from,
  _resolved,
  isEntry,
  isRequestedPackage,
  isRequestedLocalFile,
  isResolvedInNM,
  isRequestedFromNM,
  isResolved,
  isNotResolved,
  isThirdParty,
};
