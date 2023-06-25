# Cheshire Cat AI API Client

API Client made in TypeScript to communicate with the [Cheshire Cat AI](https://github.com/cheshire-cat-ai/core).\
The package provides a class to interface with the Cheshire Cat Python Server.\
It can be used both in Browser or NodeJS environment.

Every endpoint is a `CancelablePromise`, it means you can cancel the request if you want.

## Installation

```bash
npm install ccat-api
# OR
yarn add ccat-api
# OR
pnpm i ccat-api
```

## Getting started

To set up the client, you must first import the `CatClient` class:

```ts
import { CatClient } from 'ccat-api'

const cat = new CatClient({
    baseUrl: 'localhost'
})
```

## Settings properties

**API_KEY**, **CORE_HOST**, **CORE_PORT** and **CORE_USE_SECURE_PROTOCOLS** refer to the CCAT Core [.env file](https://github.com/cheshire-cat-ai/core/blob/main/.env.example).

| **Property** | **Type** | **Default**  | **Description**                                                                            |
|:------------:|:--------:|:------------:|:------------------------------------------------------------------------------------------:|
| **baseUrl**  | string   | **Required** | The same of **CORE_HOST**                                                                  |
| **authKey**  | string   | ''           | The same of **API_KEY**                                                                    |
| **port**     | string   | '1865'       | The same of the **CORE_PORT**                                                              |
| **wsPath**   | string   | ws           | Websocket path to use to communicate with the CCat                                         |
| **instant**  | boolean  | true         | Instantly initialize the websocket and the API client, or later with **.init()**           |
| **secure**   | boolean  | false        | The same of the **CORE_USE_SECURE_PROTOCOLS**                                              |
| **timeout**  | number   | 10000        | Timeout in **ms** for the endpoints                                                        |

Then, for example, you can configure the LLM like this:

```ts
cat.api.settingsLargeLanguageModel.upsertLlmSetting({
    languageModelName: 'LLMOpenAIConfig',
    requestBody: {
        openai_api_key: 'OPEN_API_KEY'
    }
})
```

To send a message to the cat, you can:

```ts
cat.send('Hello my friend!')
```

You can listen to the websocket events:

```ts
cat.onConnected(() => {
    console.log('Socket connected')
}).onMessage(msg => {
    console.log(msg)
}).onError(err => {
    console.log(err)
}).onClosed(() => {
    console.log('Socket closed')
})
```

## Credits

Made for the [Cheshire Cat AI](https://github.com/cheshire-cat-ai) organization.

This was possible thanks to [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen).
