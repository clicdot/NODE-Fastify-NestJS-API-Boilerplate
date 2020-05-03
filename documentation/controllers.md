# Controllers

The controllers follow a pattern for route considerations.

Generally, routes should not be inside the controller unless the route extends the controller set. Refer to [Router](./routes.md) for information on route configuration.

_**@Controller()**_ should remain empty as the route was already specified in the router.

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

Each controller should be wrapped in a module so the set can be configured for a route.

```text
- controller
    |_ New Controller
        |_ controller.module.ts
        |_ controller.controller.ts
        |_ Services
            |_ controller.service.ts
```
