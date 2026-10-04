import oasDocumentSchema from '/.tmp/openlint/functions-variant-2/custom-functions/oasDocumentSchema.js';
import oasExample from '/.tmp/openlint/functions-variant-2/custom-functions/oasExample.js';
import oasOp2xxResponse from '/.tmp/openlint/functions-variant-2/custom-functions/oasOp2xxResponse.js';
export default {
  documentationUrl: 'https://openlint.org/docs/reference/openapi-rules.md',
  rules: {
    'operation-2xx-response': {
      description: 'Operation must have at least one `2xx` response.',
      recommended: true,
      type: 'style',
      given:
        "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
      then: {
        field: 'responses',
        function: oasOp2xxResponse,
      },
    },
  },
};
