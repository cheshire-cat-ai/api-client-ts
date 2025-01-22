"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  AcceptedMemoryTypes: () => AcceptedMemoryTypes,
  AcceptedPluginTypes: () => AcceptedPluginTypes,
  ApiError: () => ApiError,
  CancelError: () => CancelError,
  CancelablePromise: () => CancelablePromise,
  CatClient: () => CatClient,
  WebSocketState: () => WebSocketState,
  default: () => index_default,
  isMessageResponse: () => isMessageResponse,
  isTokenResponse: () => isTokenResponse
});
module.exports = __toCommonJS(index_exports);

// api/client.ts
var import_isomorphic_ws = __toESM(require("isomorphic-ws"));

// api/core/BaseHttpRequest.ts
var BaseHttpRequest = class {
  constructor(config) {
    this.config = config;
  }
};

// api/core/request.ts
var import_axios = __toESM(require("axios"));
var import_form_data = __toESM(require("form-data"));

// api/core/ApiError.ts
var ApiError = class extends Error {
  url;
  status;
  statusText;
  body;
  request;
  constructor(request2, response, message) {
    super(message);
    this.name = "ApiError";
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request2;
  }
};

// api/core/CancelablePromise.ts
var CancelError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CancelError";
  }
  get isCancelled() {
    return true;
  }
};
var CancelablePromise = class {
  #isResolved;
  #isRejected;
  #isCancelled;
  #cancelHandlers;
  #promise;
  #resolve;
  #reject;
  constructor(executor) {
    this.#isResolved = false;
    this.#isRejected = false;
    this.#isCancelled = false;
    this.#cancelHandlers = [];
    this.#promise = new Promise((resolve2, reject) => {
      this.#resolve = resolve2;
      this.#reject = reject;
      const onResolve = (value) => {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#isResolved = true;
        if (this.#resolve) this.#resolve(value);
      };
      const onReject = (reason) => {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#isRejected = true;
        if (this.#reject) this.#reject(reason);
      };
      const onCancel = (cancelHandler) => {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#cancelHandlers.push(cancelHandler);
      };
      Object.defineProperty(onCancel, "isResolved", {
        get: () => this.#isResolved
      });
      Object.defineProperty(onCancel, "isRejected", {
        get: () => this.#isRejected
      });
      Object.defineProperty(onCancel, "isCancelled", {
        get: () => this.#isCancelled
      });
      return executor(onResolve, onReject, onCancel);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(onFulfilled, onRejected) {
    return this.#promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this.#promise.catch(onRejected);
  }
  finally(onFinally) {
    return this.#promise.finally(onFinally);
  }
  cancel() {
    if (this.#isResolved || this.#isRejected || this.#isCancelled) {
      return;
    }
    this.#isCancelled = true;
    if (this.#cancelHandlers.length) {
      try {
        for (const cancelHandler of this.#cancelHandlers) {
          cancelHandler();
        }
      } catch (error) {
        console.warn("Cancellation threw an error", error);
        return;
      }
    }
    this.#cancelHandlers.length = 0;
    if (this.#reject) this.#reject(new CancelError("Request aborted"));
  }
  get isCancelled() {
    return this.#isCancelled;
  }
};

// api/core/request.ts
var isDefined = (value) => {
  return value !== void 0 && value !== null;
};
var isString = (value) => {
  return typeof value === "string";
};
var isStringWithValue = (value) => {
  return isString(value) && value !== "";
};
var isBlob = (value) => {
  return typeof value === "object" && typeof value.type === "string" && typeof value.stream === "function" && typeof value.arrayBuffer === "function" && typeof value.constructor === "function" && typeof value.constructor.name === "string" && /^(Blob|File)$/.test(value.constructor.name) && /^(Blob|File)$/.test(value[Symbol.toStringTag]);
};
var isFormData = (value) => {
  return value instanceof import_form_data.default;
};
var isSuccess = (status) => {
  return status >= 200 && status < 300;
};
var base64 = (str) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str).toString("base64");
  }
};
var getQueryString = (params) => {
  const qs = [];
  const append = (key, value) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };
  const process = (key, value) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          process(key, v);
        });
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };
  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });
  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
};
var getUrl = (config, options) => {
  const encoder = config.ENCODE_PATH || encodeURI;
  const path = options.url.replace("{api-version}", config.VERSION).replace(/{(.*?)}/g, (substring, group) => {
    if (options.path?.hasOwnProperty(group)) {
      return encoder(String(options.path[group]));
    }
    return substring;
  });
  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};
var getFormData = (options) => {
  if (options.formData) {
    const formData = new import_form_data.default();
    const process = (key, value) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };
    Object.entries(options.formData).filter(([_, value]) => isDefined(value)).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => process(key, v));
      } else {
        process(key, value);
      }
    });
    return formData;
  }
  return void 0;
};
var resolve = async (options, resolver) => {
  if (typeof resolver === "function") {
    return resolver(options);
  }
  return resolver;
};
var getHeaders = async (config, options, formData) => {
  const [token, username, password, additionalHeaders] = await Promise.all([
    resolve(options, config.TOKEN),
    resolve(options, config.USERNAME),
    resolve(options, config.PASSWORD),
    resolve(options, config.HEADERS)
  ]);
  const formHeaders = typeof formData?.getHeaders === "function" && formData?.getHeaders() || {};
  const headers = Object.entries({
    Accept: "application/json",
    ...additionalHeaders,
    ...options.headers,
    ...formHeaders
  }).filter(([_, value]) => isDefined(value)).reduce((headers2, [key, value]) => ({
    ...headers2,
    [key]: String(value)
  }), {});
  if (isStringWithValue(token)) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    headers["Authorization"] = `Basic ${credentials}`;
  }
  if (options.body !== void 0) {
    if (options.mediaType) {
      headers["Content-Type"] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers["Content-Type"] = options.body.type || "application/octet-stream";
    } else if (isString(options.body)) {
      headers["Content-Type"] = "text/plain";
    } else if (!isFormData(options.body)) {
      headers["Content-Type"] = "application/json";
    }
  }
  return headers;
};
var getRequestBody = (options) => {
  if (options.body) {
    return options.body;
  }
  return void 0;
};
var sendRequest = async (config, options, url, body, formData, headers, onCancel, axiosClient) => {
  const source = import_axios.default.CancelToken.source();
  const requestConfig = {
    url,
    headers,
    data: body ?? formData,
    method: options.method,
    withCredentials: config.WITH_CREDENTIALS,
    withXSRFToken: config.CREDENTIALS === "include" ? config.WITH_CREDENTIALS : false,
    cancelToken: source.token
  };
  onCancel(() => source.cancel("The user aborted a request."));
  try {
    return await axiosClient.request(requestConfig);
  } catch (error) {
    const axiosError = error;
    if (axiosError.response) {
      return axiosError.response;
    }
    throw error;
  }
};
var getResponseHeader = (response, responseHeader) => {
  if (responseHeader) {
    const content = response.headers[responseHeader];
    if (isString(content)) {
      return content;
    }
  }
  return void 0;
};
var getResponseBody = (response) => {
  if (response.status !== 204) {
    return response.data;
  }
  return void 0;
};
var catchErrorCodes = (options, result) => {
  const errors = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...options.errors
  };
  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }
  if (!result.ok) {
    const errorStatus = result.status ?? "unknown";
    const errorStatusText = result.statusText ?? "unknown";
    const errorBody = (() => {
      try {
        return JSON.stringify(result.body, null, 2);
      } catch (e) {
        return void 0;
      }
    })();
    throw new ApiError(
      options,
      result,
      `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`
    );
  }
};
var request = (config, options, axiosClient = import_axios.default) => {
  return new CancelablePromise(async (resolve2, reject, onCancel) => {
    try {
      const url = getUrl(config, options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options, formData);
      if (!onCancel.isCancelled) {
        const response = await sendRequest(config, options, url, body, formData, headers, onCancel, axiosClient);
        const responseBody = getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);
        const result = {
          url,
          ok: isSuccess(response.status),
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody
        };
        catchErrorCodes(options, result);
        resolve2(result.body);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// api/core/AxiosHttpRequest.ts
var AxiosHttpRequest = class extends BaseHttpRequest {
  constructor(config) {
    super(config);
  }
  /**
   * Request method
   * @param options The request options from the service
   * @returns CancelablePromise<T>
   * @throws ApiError
   */
  request(options) {
    return request(this.config, options);
  }
};

// api/services/AuthHandlerService.ts
var AuthHandlerService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Get Auth Handler Settings
   * Get the list of the AuthHandlers
   * @returns SettingsResponse Successful Response
   * @throws ApiError
   */
  getAuthHandlerSettings() {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth_handler/settings"
    });
  }
  /**
   * Get Auth Handler Setting
   * Get the settings of a specific AuthHandler
   * @param authHandlerName
   * @returns Setting Successful Response
   * @throws ApiError
   */
  getAuthHandlerSetting(authHandlerName) {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth_handler/settings/{auth_handler_name}",
      path: {
        "auth_handler_name": authHandlerName
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Upsert Authenticator Setting
   * Upsert the settings of a specific AuthHandler
   * @param authHandlerName
   * @param requestBody
   * @returns Setting Successful Response
   * @throws ApiError
   */
  upsertAuthenticatorSetting(authHandlerName, requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/auth_handler/settings/{auth_handler_name}",
      path: {
        "auth_handler_name": authHandlerName
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/services/EmbedderService.ts
var EmbedderService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Get Embedders Settings
   * Get the list of the Embedders
   * @returns SettingsResponse Successful Response
   * @throws ApiError
   */
  getEmbeddersSettings() {
    return this.httpRequest.request({
      method: "GET",
      url: "/embedder/settings"
    });
  }
  /**
   * Get Embedder Settings
   * Get settings and schema of the specified Embedder
   * @param languageEmbedderName
   * @returns Setting Successful Response
   * @throws ApiError
   */
  getEmbedderSettings(languageEmbedderName) {
    return this.httpRequest.request({
      method: "GET",
      url: "/embedder/settings/{languageEmbedderName}",
      path: {
        "languageEmbedderName": languageEmbedderName
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Upsert Embedder Setting
   * Upsert the Embedder setting
   * @param languageEmbedderName
   * @param requestBody
   * @returns Setting Successful Response
   * @throws ApiError
   */
  upsertEmbedderSetting(languageEmbedderName, requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/embedder/settings/{languageEmbedderName}",
      path: {
        "languageEmbedderName": languageEmbedderName
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/services/LlmService.ts
var LlmService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Get LLMs Settings
   * Get the list of the Large Language Models
   * @returns SettingsResponse Successful Response
   * @throws ApiError
   */
  getLlmsSettings() {
    return this.httpRequest.request({
      method: "GET",
      url: "/llm/settings"
    });
  }
  /**
   * Get Llm Settings
   * Get settings and schema of the specified Large Language Model
   * @param languageModelName
   * @returns Setting Successful Response
   * @throws ApiError
   */
  getLlmSettings(languageModelName) {
    return this.httpRequest.request({
      method: "GET",
      url: "/llm/settings/{languageModelName}",
      path: {
        "languageModelName": languageModelName
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Upsert LLM Setting
   * Upsert the Large Language Model setting
   * @param languageModelName
   * @param requestBody
   * @returns Setting Successful Response
   * @throws ApiError
   */
  upsertLlmSetting(languageModelName, requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/llm/settings/{languageModelName}",
      path: {
        "languageModelName": languageModelName
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/services/MemoryService.ts
var MemoryService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Recall Memories From Text
   * Search k memories similar to given text.
   * @param text Find memories similar to this text.
   * @param k How many memories to return.
   * @returns MemoryRecall Successful Response
   * @throws ApiError
   */
  recallMemoriesFromText(text, k = 100) {
    return this.httpRequest.request({
      method: "GET",
      url: "/memory/recall",
      query: {
        "text": text,
        "k": k
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Get Collections
   * Get list of available collections
   * @returns CollectionsList Successful Response
   * @throws ApiError
   */
  getCollections() {
    return this.httpRequest.request({
      method: "GET",
      url: "/memory/collections"
    });
  }
  /**
   * Wipe Collections
   * Delete and create all collections
   * @returns DeleteResponse Successful Response
   * @throws ApiError
   */
  wipeCollections() {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/memory/collections"
    });
  }
  /**
   * Wipe Single Collection
   * Delete and recreate a collection
   * @param collectionId
   * @returns DeleteResponse Successful Response
   * @throws ApiError
   */
  wipeSingleCollection(collectionId) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/memory/collections/{collection_id}",
      path: {
        "collection_id": collectionId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Delete Point In Memory
   * Delete specific point in memory
   * @param collectionId
   * @param memoryId
   * @returns DeleteResponse Successful Response
   * @throws ApiError
   */
  deletePointInMemory(collectionId, memoryId) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/memory/collections/{collection_id}/points/{memory_id}",
      path: {
        "collection_id": collectionId,
        "memory_id": memoryId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Wipe Memory Points By Metadata
   * Delete points in memory by filter
   * @param collectionId
   * @param requestBody
   * @returns DeleteResponse Successful Response
   * @throws ApiError
   */
  wipeMemoryPoints(collectionId, requestBody) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/memory/collections/{collection_id}/points",
      path: {
        "collection_id": collectionId
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Get Conversation History
   * Get the specified user's conversation history from working memory
   * @returns any Successful Response
   * @throws ApiError
   */
  getConversationHistory() {
    return this.httpRequest.request({
      method: "GET",
      url: "/memory/conversation_history"
    });
  }
  /**
   * Wipe Conversation History
   * Delete the specified user's conversation history from working memory
   * @returns DeleteResponse Successful Response
   * @throws ApiError
   */
  wipeConversationHistory() {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/memory/conversation_history"
    });
  }
};

// api/services/PluginsService.ts
var PluginsService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * List Available Plugins
   * List both installed and registry plugins
   * @param query
   * @returns PluginsList Successful Response
   * @throws ApiError
   */
  listAvailablePlugins(query) {
    return this.httpRequest.request({
      method: "GET",
      url: "/plugins",
      query: {
        "query": query
      }
    });
  }
  /**
   * Install Plugin
   * Install a new plugin from a zip file
   * @param formData
   * @returns FileResponse Successful Response
   * @throws ApiError
   */
  installPlugin(formData) {
    return this.httpRequest.request({
      method: "POST",
      url: "/plugins/upload",
      formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Install Plugin From Registry
   * Install a new plugin from external repository
   * @param requestBody
   * @returns FileResponse Successful Response
   * @throws ApiError
   */
  installPluginFromRegistry(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/plugins/upload/registry",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Toggle Plugin
   * Enable or disable a single plugin
   * @param pluginId
   * @returns any Successful Response
   * @throws ApiError
   */
  togglePlugin(pluginId) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/plugins/toggle/{plugin_id}",
      path: {
        "plugin_id": pluginId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Get Plugin Details
   * Returns information on a single plugin
   * @param pluginId
   * @returns Plugin Successful Response
   * @throws ApiError
   */
  getPluginDetails(pluginId) {
    return this.httpRequest.request({
      method: "GET",
      url: "/plugins/{plugin_id}",
      path: {
        "plugin_id": pluginId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Delete Plugin
   * Physically remove a plugin
   * @param pluginId
   * @returns DeleteResponse Successful Response
   * @throws ApiError
   */
  deletePlugin(pluginId) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/plugins/{plugin_id}",
      path: {
        "plugin_id": pluginId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Get Plugins Settings
   * Returns the settings of all the plugins
   * @returns SettingsResponse Successful Response
   * @throws ApiError
   */
  getPluginsSettings() {
    return this.httpRequest.request({
      method: "GET",
      url: "/plugins/settings"
    });
  }
  /**
   * Get Plugin Settings
   * Returns the settings of a specific plugin
   * @param pluginId
   * @returns any Successful Response
   * @throws ApiError
   */
  getPluginSettings(pluginId) {
    return this.httpRequest.request({
      method: "GET",
      url: "/plugins/settings/{plugin_id}",
      path: {
        "plugin_id": pluginId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Upsert Plugin Settings
   * Updates the settings of a specific plugin
   * @param pluginId
   * @param requestBody
   * @returns Setting Successful Response
   * @throws ApiError
   */
  upsertPluginSettings(pluginId, requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/plugins/settings/{plugin_id}",
      path: {
        "plugin_id": pluginId
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/services/RabbitHoleService.ts
var RabbitHoleService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Upload File
   * Upload a file containing text (.txt, .md, .pdf, etc.). File content will be extracted and segmented into chunks.
   * Chunks will be then vectorized and stored into documents memory.
   * @param formData
   * @returns FileResponse Successful Response
   * @throws ApiError
   */
  uploadFile(formData) {
    return this.httpRequest.request({
      method: "POST",
      url: "/rabbithole",
      formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Upload URL
   * Upload a URL. Website content will be extracted and segmented into chunks.
   * Chunks will be then vectorized and stored into documents memory.
   * @param requestBody
   * @returns WebResponse Successful Response
   * @throws ApiError
   */
  uploadUrl(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/rabbithole/web",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Upload Memory
   * Upload a memory json file to the cat memory
   * @param formData
   * @returns any Successful Response
   * @throws ApiError
   */
  uploadMemory(formData) {
    return this.httpRequest.request({
      method: "POST",
      url: "/rabbithole/memory",
      formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Get Allowed Mimetypes
   * Retrieve the allowed mimetypes that can be ingested by the Rabbit Hole
   * @returns any Successful Response
   * @throws ApiError
   */
  getAllowedMimetypes() {
    return this.httpRequest.request({
      method: "GET",
      url: "/rabbithole/allowed-mimetypes"
    });
  }
};

// api/services/SettingsService.ts
var SettingsService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Get Settings
   * Get the entire list of settings available in the database
   * @param search The setting to search
   * @returns SettingsResponse Successful Response
   * @throws ApiError
   */
  getSettings(search = "") {
    return this.httpRequest.request({
      method: "GET",
      url: "/settings",
      query: {
        "search": search
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Create Setting
   * Create a new setting in the database
   * @param requestBody
   * @returns Setting Successful Response
   * @throws ApiError
   */
  createSetting(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/settings",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Get Setting
   * Get the a specific setting from the database
   * @param settingId
   * @returns Setting Successful Response
   * @throws ApiError
   */
  getSetting(settingId) {
    return this.httpRequest.request({
      method: "GET",
      url: "/settings/{settingId}",
      path: {
        "settingId": settingId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Delete Setting
   * Delete a specific setting in the database
   * @param settingId
   * @returns any Successful Response
   * @throws ApiError
   */
  deleteSetting(settingId) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/settings/{settingId}",
      path: {
        "settingId": settingId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Update Setting
   * Update a specific setting in the database if it exists
   * @param settingId
   * @param requestBody
   * @returns Setting Successful Response
   * @throws ApiError
   */
  updateSetting(settingId, requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/settings/{settingId}",
      path: {
        "settingId": settingId
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/services/StatusService.ts
var StatusService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Home
   * Server status
   * @returns Status Successful Response
   * @throws ApiError
   */
  home() {
    return this.httpRequest.request({
      method: "GET",
      url: "/"
    });
  }
  /**
   * Message With Cat
   * Get a response from the Cat
   * @param requestBody
   * @returns CatMessage Successful Response
   * @throws ApiError
   */
  messageWithCat(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/message",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/services/UserAuthService.ts
var UserAuthService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Get Available Permissions
   * Returns all available resources and permissions.
   * @returns AuthPermission Successful Response
   * @throws ApiError
   */
  getAvailablePermissions() {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/available-permissions"
    });
  }
  /**
   * Auth Token
   * Endpoint called from client to get a JWT from local identity provider.
   * This endpoint receives username and password as form-data, validates credentials and issues a JWT.
   * @param requestBody
   * @returns JWTResponse Successful Response
   * @throws ApiError
   */
  authToken(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/token",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/services/UsersService.ts
var UsersService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  /**
   * Create User
   * @param requestBody
   * @returns UserResponse Successful Response
   * @throws ApiError
   */
  createUser(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/users/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Read Users
   * @param skip
   * @param limit
   * @returns UserResponse Successful Response
   * @throws ApiError
   */
  readUsers(skip, limit = 100) {
    return this.httpRequest.request({
      method: "GET",
      url: "/users/",
      query: {
        "skip": skip,
        "limit": limit
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Read User
   * @param userId
   * @returns UserResponse Successful Response
   * @throws ApiError
   */
  readUser(userId) {
    return this.httpRequest.request({
      method: "GET",
      url: "/users/{user_id}",
      path: {
        "user_id": userId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Update User
   * @param userId
   * @param requestBody
   * @returns UserResponse Successful Response
   * @throws ApiError
   */
  updateUser(userId, requestBody) {
    return this.httpRequest.request({
      method: "PUT",
      url: "/users/{user_id}",
      path: {
        "user_id": userId
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`
      }
    });
  }
  /**
   * Delete User
   * @param userId
   * @returns UserResponse Successful Response
   * @throws ApiError
   */
  deleteUser(userId) {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/users/{user_id}",
      path: {
        "user_id": userId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
};

// api/CCatAPI.ts
var CCatAPI = class {
  authHandler;
  embedder;
  llm;
  memory;
  plugins;
  rabbitHole;
  settings;
  status;
  userAuth;
  users;
  request;
  constructor(config, HttpRequest = AxiosHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "1.6.2",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH
    });
    this.authHandler = new AuthHandlerService(this.request);
    this.embedder = new EmbedderService(this.request);
    this.llm = new LlmService(this.request);
    this.memory = new MemoryService(this.request);
    this.plugins = new PluginsService(this.request);
    this.rabbitHole = new RabbitHoleService(this.request);
    this.settings = new SettingsService(this.request);
    this.status = new StatusService(this.request);
    this.userAuth = new UserAuthService(this.request);
    this.users = new UsersService(this.request);
  }
};

// api/utils.ts
var AcceptedMemoryTypes = [
  "application/json"
];
var AcceptedPluginTypes = [
  "application/zip",
  "application/x-tar"
];
var WebSocketState = /* @__PURE__ */ ((WebSocketState2) => {
  WebSocketState2[WebSocketState2["CONNECTING"] = 0] = "CONNECTING";
  WebSocketState2[WebSocketState2["OPEN"] = 1] = "OPEN";
  WebSocketState2[WebSocketState2["CLOSING"] = 2] = "CLOSING";
  WebSocketState2[WebSocketState2["CLOSED"] = 3] = "CLOSED";
  return WebSocketState2;
})(WebSocketState || {});
var isTokenResponse = (value) => {
  return !!(value && typeof value === "object" && "content" in value && "type" in value && value.type !== "error");
};
var isMessageResponse = (value) => {
  return !!(value && typeof value === "object" && ("text" in value || "audio" in value || "image" in value) && "user_id" in value && "who" in value && "type" in value && value.type !== "error");
};

// api/client.ts
var CatClient = class {
  config;
  apiClient;
  ws;
  connectedHandler;
  disconnectedHandler;
  messageHandler;
  errorHandler;
  explicitlyClosed = false;
  retried = 0;
  /**
   * Initialize the class with the specified settings
   * @param settings The settings to pass
   */
  constructor(settings) {
    this.config = {
      secure: false,
      instant: true,
      timeout: 1e4,
      port: 1865,
      userId: "user",
      ...settings
    };
    if (this.config.instant) this.init();
  }
  initWebSocket() {
    const wsConfig = this.config.ws = {
      delay: 3e3,
      retries: 3,
      ...this.config.ws
    };
    const userId = this.config.userId ?? "user";
    const url = this.url.replace(/http/g, "ws");
    const query = this.config.credential ? `?token=${this.config.credential}` : "";
    this.ws = new import_isomorphic_ws.default(`${url}/ws/${userId}${query}`);
    this.ws.onopen = () => {
      this.retried = 0;
      this.connectedHandler?.();
    };
    this.ws.onclose = () => {
      if (!this.explicitlyClosed) {
        this.retried += 1;
        if (wsConfig.retries < 0 || this.retried < wsConfig.retries) {
          setTimeout(() => this.initWebSocket(), wsConfig.delay);
        } else wsConfig.onFailed?.({
          name: "FailedRetry",
          description: `Failed to connect WebSocket after ${wsConfig.retries} retries.`
        });
      }
      this.disconnectedHandler?.();
    };
    this.ws.onmessage = (event) => {
      if (typeof event.data != "string") return;
      const data = JSON.parse(event.data);
      if (isMessageResponse(data)) {
        this.messageHandler?.(data);
        return;
      } else if (isTokenResponse(data)) {
        this.messageHandler?.(data);
        return;
      }
      this.errorHandler?.(data);
    };
    this.ws.onerror = (event) => {
      this.errorHandler?.({
        name: "SocketError",
        description: "Something went wrong while connecting to the server"
      }, event);
    };
  }
  /**
   * Resets the current `CatClient` instance.
   * @returns The updated `CatClient` instance.
   */
  reset() {
    this.retried = 0;
    this.close();
    this.ws = void 0;
    this.apiClient = void 0;
    return this;
  }
  /**
   * Initialize the WebSocket and the API Client
   * @returns The current `CatClient` class instance
   */
  init() {
    if (!this.ws && !this.apiClient) {
      this.initWebSocket();
      this.apiClient = new CCatAPI({
        BASE: `${this.url}`,
        HEADERS: {
          ...this.config.credential ? {
            "access_token": this.config.credential,
            "Authorization": `Bearer ${this.config.credential}`
          } : {},
          "user_id": this.config.userId ?? "user"
        }
      });
    }
    return this;
  }
  /**
   * Sends a message to the Cat through the WebSocket connection.
   * @param msg The message to send to the Cat.
   * @param userId The ID of the user sending the message. Defaults to "user".
   * @throws If the message does not contain text, audio or image.
   * @returns The `CatClient` instance.
   */
  send(msg, userId) {
    if (this.ws?.readyState !== import_isomorphic_ws.default.OPEN) {
      this.errorHandler?.({
        name: "SocketClosed",
        description: "The connection to the server was closed"
      });
      return this;
    }
    if ("text" in msg || "audio" in msg || "image" in msg) {
      const jsonMessage = JSON.stringify({
        ...msg,
        user_id: userId ?? (this.config.userId ?? "user")
      });
      this.ws.send(jsonMessage);
    } else throw new Error("The message argument must contain either text, audio or image.");
    return this;
  }
  /**
   * @returns The API Client
   */
  get api() {
    return this.apiClient;
  }
  /**
   * Setter for the authentication key or token used by the client. This will also reset the client.
   * @param key The authentication key or token to be set.
   */
  set credential(key) {
    this.config.credential = key;
    this.reset().init();
  }
  /**
   * Setter for the user ID used by the client. This will also reset the client.
   * @param user The user ID to be set.
   */
  set userId(user) {
    this.config.userId = user;
    this.reset().init();
  }
  /**
   * Closes the WebSocket connection.
   * @returns The `CatClient` instance.
   */
  close() {
    this.ws?.close();
    this.explicitlyClosed = true;
    return this;
  }
  /**
   * Returns the current state of the WebSocket connection.
   * @returns The WebSocketState enum value representing the current state of the WebSocket connection.
   */
  get socketState() {
    return this.ws?.readyState ?? 3 /* CLOSED */;
  }
  /**
   * Calls the handler when the WebSocket is connected 
   * @param handler The function to call
   * @returns The current `CatClient` class instance
   */
  onConnected(handler) {
    this.connectedHandler = handler;
    return this;
  }
  /**
   * Calls the handler when the WebSocket is disconnected
   * @param handler The function to call
   * @returns The current `CatClient` class instance
   */
  onDisconnected(handler) {
    this.disconnectedHandler = handler;
    return this;
  }
  /**
   * Calls the handler when a new message arrives from the WebSocket
   * @param handler The function to call
   * @returns The current `CatClient` class instance
   */
  onMessage(handler) {
    this.messageHandler = handler;
    return this;
  }
  /**
   * Calls the handler when the WebSocket catches an exception
   * @param handler The function to call
   * @returns The current `CatClient` class instance
   */
  onError(handler) {
    this.errorHandler = handler;
    return this;
  }
  get url() {
    return `http${this.config.secure ? "s" : ""}://
            ${this.config.host}
            ${this.config.port ? `:${this.config.port}` : ""}
            `.replace(/\s/g, "");
  }
};

// index.ts
var index_default = CatClient;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AcceptedMemoryTypes,
  AcceptedPluginTypes,
  ApiError,
  CancelError,
  CancelablePromise,
  CatClient,
  WebSocketState,
  isMessageResponse,
  isTokenResponse
});
