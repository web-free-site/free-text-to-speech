// IndexedDB cache for Piper model files with optional download progress
class ModelCache {
  constructor() {
    this.dbName = 'free-tts-model-cache';
    this.storeName = 'models';
    this.version = 1;
    this.db = null;
  }

  async init() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'url' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async get(url) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(url);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          const maxAge = 7 * 24 * 60 * 60 * 1000;
          if (Date.now() - result.timestamp < maxAge) {
            resolve(result.data);
            return;
          }
          this.delete(url);
        }
        resolve(null);
      };
    });
  }

  async set(url, data) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({
        url,
        data,
        timestamp: Date.now(),
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async delete(url) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(url);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

const cache = new ModelCache();

export async function cachedFetch(url, { onProgress } = {}) {
  const cachedData = await cache.get(url);
  if (cachedData) {
    if (onProgress) onProgress(1, 1);
    return new Response(cachedData);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} for ${url}`);
  }

  const contentLength = Number(response.headers.get('Content-Length')) || 0;
  const reader = response.body?.getReader();
  if (!reader) {
    const data = await response.arrayBuffer();
    await cache.set(url, data);
    if (onProgress) onProgress(1, 1);
    return new Response(data);
  }

  const chunks = [];
  let loaded = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    if (onProgress && contentLength > 0) {
      onProgress(loaded, contentLength);
    }
  }

  const data = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    data.set(chunk, offset);
    offset += chunk.length;
  }

  const buffer = data.buffer;
  await cache.set(url, buffer);
  if (onProgress) onProgress(loaded, contentLength || loaded);
  return new Response(buffer);
}

export default ModelCache;