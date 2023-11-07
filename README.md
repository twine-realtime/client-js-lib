# Twine Client Library

The `twine-client-library` package allows users to interact with their Twine Realtime service from their client-side code.

## Installation

Copy this code into your JavaScript code as an ES module package:

```js
import TwineClientLibrary from 'https://cdn.jsdelivr.net/npm/twine-client-library@1.0/+esm';
```

## Initialization

To configure the client, use the `TwineClientLibrary` constructor:

```js
const host = 'https://your-twine-domain.com';
const twineClient = new TwineClientLibrary(host);
```

Once the constructor has been invoked, a connection is established with your Twine server.

## Usage

### connect & disconnect

Your `twine-client-library` instance will automatically connect with the server, but if you need to manually connect/disconnect the `connect` and disconnect` methods will do just that:

```js
twineClient.connect();
```

```js
twineClient.disconnect();
```

```js
disconnectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  twineClient.disconnect();
  setTimeout(() => {
    twineClient.connect();
  }, 10000)
});
```

### subscribe

The `subscribe` method takes a single `room_id` (string) as an argument and subscribes the user to this room on the twine server.

```js
twineClient.subscribe(room);
```

```js
dropdown.addEventListener('change', () => {
  const room = dropdown.value;
  twineClient.subscribe(room);
});
```

### unsubscribe

The `unsubscribe` method takes a single `room_id` (string) as an argument and unsubscribes the user to this room on the twine server.

```js
twineClient.unsubscribe(room);
```

```js
dropdown.addEventListener('change', () => {
  const room = dropdown.value;
  twineClient.unsubscribe(room);
});
```

### listenOn

The `listenOn` method takes a `room_id` (string) and a callback function as arguments. The method will then listen for incoming messages to the `room_id` specified. When a message arrives that matches the `room_id` passed to `listenOn`, the `callback` function will be invoked. 

```js
twineClient.listenOn(room, callback);
```

```js
twineClient.listenOn("room A", (data) => {
  console.log(data)
  // code will be executed everytime an event with a matching `room_id` occurs
});
```