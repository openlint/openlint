import { createRulesetFunction } from '@openlint/openlint-core';
import { safePointerToPath } from '@openlint/openlint-runtime';
import { decodePointer } from '@stoplight/json';

import { optionSchemas } from './optionSchemas';

export type Options = {
  reusableObjectsLocation: string;
};

export default createRulesetFunction<Record<string, unknown>, Options>(
  {
    input: {
      type: 'object',
    },
    options: optionSchemas.unreferencedReusableObject,
  },
  function unreferencedReusableObject(data, opts, { document, documentInventory }) {
    const graph = documentInventory.graph;
    if (graph === null) {
      throw new Error('unreferencedReusableObject requires dependency graph');
    }

    const normalizedSource = document.source ?? '';

    const defined = Object.keys(data).map(name => `${normalizedSource}${opts.reusableObjectsLocation}/${name}`);

    const decodedNodes = new Set(graph.overallOrder().map(n => decodePointer(n)));

    const orphans = defined.filter(defPath => !decodedNodes.has(defPath));

    return orphans.map(orphanPath => {
      return {
        message: 'Potential orphaned reusable object has been detected',
        path: safePointerToPath(orphanPath),
      };
    });
  },
);
