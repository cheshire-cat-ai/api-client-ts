# Cheshire Cat AI API Client

API Client made in TypeScript to communicate with the [Cheshire Cat AI](https://github.com/cheshire-cat-ai/core).

The package provides a class to interface with the Cheshire Cat python server.

Every endpoint is a CancelablePromise, it means you can cancel the request if you want.

## Installation

```bash
npm install ccat-api
# OR
yarn add ccat-api
# OR
pnpm i ccat-api
```

## Getting started

To set up the client, you must import the `CatClient` class:

```ts
import { CatClient } from 'ccat-api'

// The current keys refer to the CCAT Core .env file:
// API_KEY, CORE_HOST, CORE_PORT, CORE_USE_SECURE_PROTOCOLS
const cat = new CatClient({
    baseUrl: 'localhost', // The same of CORE_HOST
    authKey: 'YOUR_AUTH_KEY', // The same of API_KEY, default to ''
    port: '1865', // The same of the CORE_PORT, default to ''
    secure: false, // The same of the CORE_USE_SECURE_PROTOCOLS, default to false
    instant: true, // If you want to instantly initialize the websocket and the API client, default to true
    timeout: 10000, // Timeout in ms for the endpoints, default to 10000
    wsPath: 'ws' // Websocket path to use to communicate with the CCat, default to 'ws'
})
```

Then you can configure the LLM like this:

```ts
// It is a cancelable promise
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
