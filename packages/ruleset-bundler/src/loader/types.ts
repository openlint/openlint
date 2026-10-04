import type { Ruleset } from '@openlint/openlint-core';
import type { Plugin } from 'rollup';
import type { IO } from '../types';

export type Loader = (rulesetFile: string, io: IO, plugins?: Plugin[]) => Promise<Ruleset>;
