import { asyncapi } from '@openlint/ruleset-spectral-asyncapi';
import { oas } from '@openlint/ruleset-spectral-oas';
export default {
  extends: [oas, asyncapi],
};
