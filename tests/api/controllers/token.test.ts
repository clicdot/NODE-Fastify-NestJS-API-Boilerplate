'use strict';

import { test } from 'tap';
import { build } from '../../helper';

test('root test', (assert) => {
  const app = build(assert);

  assert.plan(1);

  assert.test('/api/auth/token (POST)', async (assert) => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/auth/token'
    });

    const { response, data } = JSON.parse(res.payload);

    assert.equal(response.code, 201, 'Success');
    assert.deepEqual(data, {
      hello: 'world'
    });
  });
});
