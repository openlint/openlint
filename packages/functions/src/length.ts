import { createRulesetFunction, IFunctionResult } from '@openlint/openlint-core';
import { printValue } from '@openlint/openlint-runtime';
import { isPlainObject } from '@stoplight/json';

import { optionSchemas } from './optionSchemas';

export type Options =
  | {
      min: number;
    }
  | {
      max: number;
    }
  | {
      min: number;
      max: number;
    };

export default createRulesetFunction<unknown[] | Record<string, unknown> | string | number, Options>(
  {
    input: {
      type: ['array', 'object', 'string', 'number'],
    },
    options: optionSchemas.length,
  },
  function length(targetVal, opts) {
    let value: number;
    if (isPlainObject(targetVal)) {
      value = Object.keys(targetVal).length;
    } else if (Array.isArray(targetVal)) {
      value = targetVal.length;
    } else if (typeof targetVal === 'number') {
      value = targetVal;
    } else {
      value = (targetVal as string).length;
    }

    let results: IFunctionResult[] | undefined;

    if ('min' in opts && value < opts.min) {
      results = [
        {
          message: `#{{print("property")}}must be longer than ${printValue(opts.min)}`,
        },
      ];
    }

    if ('max' in opts && value > opts.max) {
      (results ??= []).push({
        message: `#{{print("property")}}must be shorter than ${printValue(opts.max)}`,
      });
    }

    return results;
  },
);
