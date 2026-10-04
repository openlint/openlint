import { unreferencedReusableObject } from '@openlint/openlint-functions';
import { createRulesetFunction, IFunctionResult } from '@openlint/openlint-core';
import { isObject } from './utils/isObject';

export default createRulesetFunction<{ components: Record<string, unknown> }, null>(
  {
    input: {
      type: 'object',
      properties: {
        components: {
          type: 'object',
        },
      },
      required: ['components'],
    },
    options: null,
  },
  function oasUnusedComponent(targetVal, opts, context) {
    const results: IFunctionResult[] = [];
    const componentTypes = [
      'schemas',
      'responses',
      'parameters',
      'examples',
      'requestBodies',
      'headers',
      'links',
      'callbacks',
    ];

    for (const type of componentTypes) {
      const value = targetVal.components[type];
      if (!isObject(value)) continue;

      const resultsForType = unreferencedReusableObject(
        value,
        { reusableObjectsLocation: `#/components/${type}` },
        context,
      );
      if (resultsForType !== void 0 && Array.isArray(resultsForType)) {
        results.push(...resultsForType);
      }
    }

    return results;
  },
);
