import * as core from '@openlint/openlint-core';
import * as formats from '@openlint/openlint-formats';
import * as functions from '@openlint/openlint-functions';
import * as parsers from '@openlint/openlint-parsers';
import * as refResolver from '@openlint/openlint-ref-resolver';
import * as rulesets from '@openlint/openlint-rulesets';
import * as runtime from '@openlint/openlint-runtime';
import type { Plugin, InputOptions } from 'rollup';

type Module = 'core' | 'formats' | 'functions' | 'parsers' | 'ref-resolver' | 'rulesets' | 'runtime';
type GlobalModules = Record<`@openlint/openlint-${Module}`, string>;
type Overrides = Record<keyof GlobalModules, Record<string, unknown>>;

const NAME = '@openlint-openlint/builtins';

function registerModule(
  instanceId: number,
  id: keyof GlobalModules,
  members: Record<string, unknown>,
  overrides: Partial<Overrides>,
): [string, string] {
  const actualOverrides = overrides[id];
  const instances = (globalThis[Symbol.for(NAME)] ??= {}) as Record<string, Partial<Overrides>>;
  const root = (instances[instanceId] ??= {});

  root[id] = actualOverrides ? { ...members, ...actualOverrides } : members;

  const m = `globalThis[Symbol.for('${NAME}')]['${instanceId}']['${id}']`;
  let code = '';
  for (const member of Object.keys(members)) {
    code += `export const ${member} = ${m}['${member}'];\n`;
  }

  return [id, code];
}

export const builtins = (overrides: Partial<Overrides> = {}): Plugin => {
  const instanceId = Math.round(Math.random() * 1_000_000);

  const modules = Object.fromEntries([
    registerModule(instanceId, '@openlint/openlint-core', core, overrides),
    registerModule(instanceId, '@openlint/openlint-formats', formats, overrides),
    registerModule(instanceId, '@openlint/openlint-functions', functions, overrides),
    registerModule(instanceId, '@openlint/openlint-parsers', parsers, overrides),
    registerModule(instanceId, '@openlint/openlint-ref-resolver', refResolver, overrides),
    registerModule(instanceId, '@openlint/openlint-rulesets', rulesets, overrides),
    registerModule(instanceId, '@openlint/openlint-runtime', runtime, overrides),
  ]) as GlobalModules;

  return {
    name: NAME,
    options(rawOptions): InputOptions {
      const external = rawOptions.external;

      if (typeof external === 'function') {
        return {
          ...rawOptions,
          external: (id, importer, isResolved) => !(id in modules) && external(id, importer, isResolved),
        };
      }

      return rawOptions;
    },
    resolveId(id): string | null {
      if (id in modules) {
        return id;
      }

      return null;
    },
    load(id): string | undefined {
      if (id in modules) {
        return modules[id] as string;
      }

      return;
    },
  };
};
