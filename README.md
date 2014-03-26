angular-serializer
==================

Proof of concept for angular/angular.js#6039

### Usage

1. Add ```linclark.serializer``` as a dependency
2. Add a Content-Type header to your request.

```
  $http({
    method: 'POST',
    url: 'destination',
    data: {
      "user": {
        "email": "test.serializer@example.com",
        "password": "foobar"
      }
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
```

Currently, only x-www-form-urlencoded is supported, and only for serialization of requests, not deserialization of responses.
