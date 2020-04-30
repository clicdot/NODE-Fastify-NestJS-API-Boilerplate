'use strict';

import { test } from 'tap';
import { build } from '../../helper';

test('root test', (assert) => {
  const app = build(assert);

  assert.plan(1);

  assert.test('/api/ping (Get)', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/ping'
    });

    const { response, data } = JSON.parse(res.payload);

    assert.equal(response.code, 200, 'Success');
    assert.deepEqual(data, {
      hello: 'world'
    });
  });
});
