# Twine Client Library

This library enables users to interact with their Twine Realtime service from their client-side code.

## Installation

Install the `twine-client-lib` NPM package:

```bash
npm install twine-client-lib
```

and then require the module:

```js
import Twine from "twine-client-lib";
```

## Initialization

To configure the client, use the `Twine` constructor:

```js
const host = 'https://your-twine-domain.com';
const twineClient = new TwineClientLibrary(host);
```

Once the constructor has been invoked, a connection is established with your Twine server.

## Usage

### The connect & disconnect methods

Your `twine-client-lib` instance will automatically connect with the server, but if you need to manually connect/disconnect the `connect` and disconnect` methods will do just that:

```js
disconnectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  twine.disconnect();
  setTimeout(() => {
    twine.connect();
  }, 10000)
});
```

### subscribe

The `subscribe` method takes a single `room_id` (string) as an argument and subscribes the user to this room on the twine server.

```js
dropdown.addEventListener('change', () => {
  const selected = dropdown.value;
  twineClient.subscribe(selected);
});
```

### unsubscribe

The `unsubscribe` method takes a single `room_id` (string) as an argument and unsubscribes the user to this room on the twine server.

```js
dropdown.addEventListener('change', () => {
  const selected = dropdown.value;
  twineClient.unsubscribe(selected);
});
```

## listenOn

The `listenOn` method takes a single `room_id` (string) and a callback function as arguments. The method will then listen for incoming messages to the `room_id` specified. When a message arrives that matches the `room_id` passed to `listenOn`, the `callback` function will be invoked. 

```js
twineClient.listenOn("room A", (data) => {
  console.log(data)
  // code will be executed everytime an event with a matching `room_id` occurs
});
```