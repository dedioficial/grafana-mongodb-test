## Data setup

Use this folder to place the data to be returned by the server.
Name the file as the resource endpoint, like the example below.

| File name        | Endpoint                          |
| ---------------- | --------------------------------- |
| `./data/user.js` | `http://localhost:3001/data/user` |

```JS
// ./data/user.js
const user = {
    name: 'John Doe',
    age: 30
}

module.exports = user;
```
