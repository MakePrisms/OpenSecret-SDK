/**
 * Storage abstraction for OpenSecret SDK.
 *
 * Consumers must provide a StorageProvider via configure({ storage })
 * before any other SDK usage. Browser apps can pass the bundled
 * `browserStorage` helper; non-browser consumers (React Native, Node,
 * Bun, CLI, MCP) implement the interface against their own backing store.
 */

export type StorageProvider = {
  persistent: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };
  session: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };
};

/**
 * Convenience StorageProvider that maps directly to window.localStorage and
 * window.sessionStorage. Uses getters so importing this module in a non-browser
 * environment is safe — `window` is only referenced if the provider is actually
 * passed to configure().
 */
export const browserStorage: StorageProvider = {
  get persistent() {
    return window.localStorage;
  },
  get session() {
    return window.sessionStorage;
  }
};

let _provider: StorageProvider | null = null;

export function setStorageProvider(provider: StorageProvider): void {
  _provider = provider;
}

export function getStorage(): StorageProvider {
  if (!_provider) {
    throw new Error(
      "OpenSecret SDK: no storage provider configured. " +
        "Call configure({ storage: ... }) before using the SDK. " +
        "Browser apps can pass the bundled `browserStorage` helper."
    );
  }
  return _provider;
}

export function resetStorage(): void {
  _provider = null;
}
