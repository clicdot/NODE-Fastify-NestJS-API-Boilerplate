# Routes

We rely on routes for endpoint configuration when it comes to paths.

```javascript
export const v1Routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/test',
        module: TestModule,
      },
    ],
  },
];
```
