import type { RulesetDefinition } from '@openlint/openlint-core';
import shared from './shared';

export { ruleset as default };

const ruleset: RulesetDefinition = {
  extends: shared,
};
