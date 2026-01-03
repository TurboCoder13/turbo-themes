import { vi } from 'vitest';

// Avoid outbound fetches during happy-dom runs
vi.stubGlobal(
  'fetch',
  vi.fn(
    async () =>
      // eslint-disable-next-line no-undef
      new Response('', { status: 200, statusText: 'OK' })
  )
);

// Pretend CSS links load successfully without hitting the network
const linkProto = HTMLLinkElement.prototype as unknown as {
  _loadFromUrl?: () => void;
};

linkProto._loadFromUrl = function mockLoad() {
  // Simulate async load to mirror browser behavior
  // eslint-disable-next-line no-undef
  queueMicrotask(() => {
    this.onload?.(new Event('load'));
  });
};
