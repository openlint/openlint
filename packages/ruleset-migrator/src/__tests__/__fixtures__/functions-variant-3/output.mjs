import _400response from '/.tmp/openlint/functions-variant-3/functions/400-response.js';
import import$0 from '/.tmp/openlint/functions-variant-3/functions/import.js';
import no from '/.tmp/openlint/functions-variant-3/functions/no-@.js';
import require$0 from '/.tmp/openlint/functions-variant-3/functions/require.js';
import uppercase from '/.tmp/openlint/functions-variant-3/functions/upper-case.js';
export default {
  rules: {
    rule: {
      given: '$',
      then: [
        {
          function: uppercase,
        },
        {
          function: no,
        },
        {
          function: _400response,
        },
        {
          function: import$0,
        },
        {
          function: require$0,
        },
      ],
    },
  },
};
