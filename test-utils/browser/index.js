import { afterEach, beforeEach, vi } from 'vitest';
import { dirname, isURL } from '@stoplight/path';
import * as fs from 'fs';
import fetchMockLib from 'fetch-mock';

let fetchMock;

beforeEach(() => {
  fetchMock = fetchMockLib.createInstance();
  fetchMock.config.fetch = global.fetch;
  vi.stubGlobal('fetch', fetchMock.fetchHandler);
});

afterEach(() => {
  fetchMock.hardReset();
});

export function serveAssets(mocks) {
  for (const [uri, body] of Object.entries(mocks)) {
    if (!isURL(uri)) {
      fs.mkdirSync(dirname(uri), { recursive: true });
      fs.writeFileSync(uri, typeof body === 'string' ? body : JSON.stringify(body));
      continue;
    }

    for (const actualUrl of new Set([uri.replace(/([^/])\?/, '$1/?'), uri.replace(/([^/])\?/, '$1?')])) {
      fetchMock.route(actualUrl, {
        status: 200,
        body,
      });
    }
  }
}

export function mockResponses(mocks) {
  for (const [uri, responses] of Object.entries(mocks)) {
    for (const [code, body] of Object.entries(responses)) {
      for (const actualUrl of new Set([uri.replace(/([^/])\?/, '$1/?'), uri.replace(/([^/])\?/, '$1?')])) {
        fetchMock.route(actualUrl, {
          status: Number(code),
          body,
        });
      }
    }
  }
}
