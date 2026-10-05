import type { Plugin } from 'rollup';

export const stdin = (input: string, name = '<stdin>'): Plugin => ({
  name: '@openlint-openlint/stdin',
  resolveId: id => (id === name ? id : null),
  load: id => (id === name ? input : null),
});
