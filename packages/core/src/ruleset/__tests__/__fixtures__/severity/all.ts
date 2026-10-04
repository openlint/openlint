import shared from './shared';
import {RulesetDefinition} from "@openlint/openlint-core";

export default {
  extends: [[shared, 'all']],
  rules: {
    'description-matches-stoplight': 'off',
  },
} as RulesetDefinition;
