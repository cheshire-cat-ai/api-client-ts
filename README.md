<a href="https://github.com/cheshire-cat-ai/api-client-ts">
  <img alt="GitHub Stars" src="https://img.shields.io/github/stars/cheshire-cat-ai/api-client-ts?logo=github&style=flat-square">
</a>
<a href="https://discord.gg/bHX5sNFCYU">
  <img alt="Discord Server" src="https://img.shields.io/discord/1092359754917089350?logo=discord&style=flat-square">
</a>
<a href="https://npmjs.com/package/ccat-api">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/ccat-api?logo=npm&style=flat-square">
</a>
<a href="https://npmjs.com/package/ccat-api">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/ccat-api?logo=npm&style=flat-square">
</a>
<a href="https://bundlephobia.com/package/ccat-api">
  <img alt="Bundle Size" src="https://img.shields.io/bundlephobia/minzip/ccat-api?logo=npm&style=flat-square">
</a>

# Cheshire Cat AI API Client

API Client made in TypeScript to communicate with the [Cheshire Cat AI](https://github.com/cheshire-cat-ai/core).\
The package provides a class to interface with the Cheshire Cat AI backend.\
It can be used both in Browser and NodeJS environments.

Every endpoint is a `CancelablePromise`, which means you can cancel the request if you want.

## Installation

```bash
npm i ccat-api
# OR
yarn add ccat-api
# OR
pnpm i ccat-api
# OR
bun i ccat-api
```

## Getting started

To set up the client, you must first import the `CatClient` class:

```ts
import { CatClient } from 'ccat-api'

const cat = new CatClient({
    host: 'localhost',
    userId: 'user',
    //... other settings
})

cat.send('Hello from a user!') // this will send a message to the /ws/user

cat.userId = 'new_user'

cat.send('Hello from a new user!') // this will send a message to the /ws/new_user
```

## Client settings

**CCAT_API_KEY**, **CCAT_CORE_HOST**, **CCAT_CORE_PORT** and **CCAT_CORE_USE_SECURE_PROTOCOLS** refer to the CCAT Core [.env file](https://github.com/cheshire-cat-ai/core/blob/main/.env.example).

| **Property**   | **Type** | **Default**  | **Description**                                                                  |
|:--------------:|:--------:|:------------:|:--------------------------------------------------------------------------------:|
| **host**       | string   | **Required** | The same of **CCAT_CORE_HOST**                                                   |
| **credential** | string   | undefined    | The same of **CCAT_API_KEY** or the JWT token                                    |
| **port**       | number   | 1865         | The same of the **CCAT_CORE_PORT**                                               |
| **secure**     | boolean  | false        | The same of the **CCAT_CORE_USE_SECURE_PROTOCOLS**                               |
| **user**       | string   | 'user'       | The user ID to use for the WebSocket and the API client                          |
| **instant**    | boolean  | true         | Instantly initialize the WebSocket and the API client, or later with **.init()** |
| **timeout**    | number   | 10000        | Timeout for the endpoints, in milliseconds                                       |
| **ws**         | string   | undefined    | An object of type [WebSocketSettings](#websocket-settings)                       |

### WebSocket settings

| **Property** | **Type** | **Default** | **Description**                                           |
|:------------:|:--------:|:-----------:|:---------------------------------------------------------:|
| **retries**  | number   | 3           | The maximum number of retries before calling **onFailed** |
| **delay**    | number   | 3000        | The delay for reconnect, in milliseconds                  |
| **onFailed** | function | undefined   | The function to call after failing all the retries        |

Then, for example, you can configure the LLM like this:

```ts
cat.api.llm.upsertLlmSetting('LLMOpenAIConfig', {
    openai_api_key: 'OPEN_API_KEY'
})
```

To send a message to the cat, you can:

```ts
cat.send('Hello my friend!')
```

You can listen to the WebSocket events:

```ts
cat.onConnected(() => {
    console.log('Socket connected')
}).onMessage(msg => {
    console.log(msg)
}).onError((err, e) => {
    console.error(err, e)
}).onDisconnected(() => {
    console.log('Socket disconnected')
})
```

For example, you can get the list of plugins like this:

```ts
cat.api.plugins.listAvailablePlugins().then(plugins => {
    console.log(plugins)
})
```

## Credits

Made for the [Cheshire Cat AI](https://github.com/cheshire-cat-ai) organization.

This was possible thanks to [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen).
