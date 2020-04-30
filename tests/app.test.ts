'use strict';

import { test } from 'tap';
import { build } from './helper';

test('root test', (assert) => {
  const app = build(assert);

  assert.plan(1);

  assert.test('/ (Get)', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/'
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 404, 'Not Found');
  });
});
