import test from 'ava';
import { esDepKit, esDepKitAsync } from './index';

test('basic', t =>
  t.is(esDepKit('unicorns'), 'unicorns'));

test('empty input', t => t.throws(() => { esDepKit(); }, TypeError));
test('invalid input', t => t.throws(() => { esDepKit(2); }, TypeError));

test('async :: basic', async t => t.is(
  await esDepKitAsync('unicorns'),
  'unicorns'));

test('async :: empty input', t => t.throws(esDepKitAsync(), TypeError));
test('async :: invalid input', t => t.throws(esDepKitAsync(2), TypeError));
