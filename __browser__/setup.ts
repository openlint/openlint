import * as jestMock from 'jest-mock';
import '../test-utils/matchers';

// existing tests rely on the `jest` global for mocks and spies
(globalThis as Record<string, unknown>).jest = jestMock;
