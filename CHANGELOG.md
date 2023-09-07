# ccat-api

## 0.7.3

### Patch Changes

- 34f7752: Added endpoint for allowed mimetypes

## 0.7.2

### Patch Changes

- af856df: Added user id argument in send method

## 0.7.1

### Patch Changes

- 16d1ae7: Added link property in JSON Schema

## 0.7.0

### Minor Changes

- 65e0659: Sync with new ccat's endpoints

  - Fixed typos
  - Added generic to PromptSettings
  - Improved endpoints response types

## 0.6.2

### Patch Changes

- 6e8b315: Now the port is a number

## 0.6.1

### Patch Changes

- c97d9b8: Fixed DefaultPromptSettings exported interface name

## 0.6.0

### Minor Changes

- ab329b4: Refactored models

  - Added new plugin settings endpoints

## 0.5.1

### Patch Changes

- 9400f12: Sync with Cheshire Cat Core

## 0.5.0

### Minor Changes

- 693df12: Added reset method

  - Updated error handling
  - Now api getter and websocket can be undefined
  - Added summary parameter in file and url upload

## 0.4.5

### Patch Changes

- 467c9fe: Sync with cat's backend:

  - Updated /memory/delete endpoint
  - Updated packages

## 0.4.4

### Patch Changes

- c5fe613: Changed AcceptedFileContentTypes -> AcceptedFileTypes

  - Added accepted memory types
  - Added accepted plugin types

## 0.4.3

### Patch Changes

- bf53aa8: Privatized unused code in services

  - Added AcceptedFileContentTypes const for file upload
  - Added enumator WebSocketState for .readyState

## 0.4.2

### Patch Changes

- 9cdfd68: Added possibility to put custom keys in PromptSettings (ex. for plugins)

  - Added documentation for client settings

## 0.4.1

### Patch Changes

- 7f7c81f:
  - Added setter to change auth key at runtime
  - Added getter to get the state of the websocket
  - PromptSettings passed in send() are now Partial

## 0.4.0

### Minor Changes

- b2b8832:
  - Switched from options to single arguments
  - Updated types to sync with backend

## 0.3.1

### Patch Changes

- 371d3bc: Fixed delete plugin endpoint

## 0.3.0

### Minor Changes

- ffec775:
  - Documented code
  - Fixed typos
  - Added WebSocket settings (delay, path, retries, onFailed)

## 0.2.3

### Patch Changes

- 41e6da6: Added delete plugin endpoint

## 0.2.2

### Patch Changes

- 850bd81:
  - Added types for websocket.
  - Added eslint.
  - Now throwing error codes instead of strings.

## 0.2.1

### Patch Changes

- 16b9513: - The default port is now '1865'
  - init() now returns the class instance

## 0.2.0

### Minor Changes

- 8a9a740:
  - Added missing types to services.
  - Fixed types for CatClient.
  - Exported models from index.

## 0.1.1

### Patch Changes

- ab42e0c: The authKey is now optional

## 0.1.0

### Minor Changes

- 8389485: Created the Cheshire Cat API Client.
