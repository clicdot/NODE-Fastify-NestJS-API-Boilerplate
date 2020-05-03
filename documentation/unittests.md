# Unit Tests

The ability to run different Unit Tests was left intentionally open.

NestJS uses Jest to run Unit Tests and e2e tests. However, Unit Tests using TAP was added. TAP unit tests can be found under the _**tests**_ folder.

TAP uses a helper to bootstrap the unit tests.

```javascript
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

    const { response, data } = JSON.parse(res.payload);

    assert.equal(response.code, 200, 'Success');
    assert.equal(data, 'Hello World!');
  });
});
```

_**test('root test', (assert) => {**_ represents the test suite.

_**assert.test('/api/v1/test/cat (Get)', async (assert) => {**_ represent the unit test.

_**assert.plan(1);**_ indicates how many tests exits inside the suite.
