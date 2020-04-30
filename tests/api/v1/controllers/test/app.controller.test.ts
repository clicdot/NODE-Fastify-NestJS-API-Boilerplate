'use strict';

import { test } from 'tap';
import { build } from '../../../../helper';

test('root test', (assert) => {
  const app = build(assert);

  assert.plan(1);

  assert.test('/api/v1/test/cat (Get)', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/test/cat'
    });

    assert.equal(res.statusCode, 200, 'Success');
    assert.equal(res.body, 'Hello World!');
  });
});
