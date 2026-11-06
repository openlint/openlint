import { oas } from '@openlint/ruleset-spectral-oas';
export default {
  extends: oas,
  overrides: [
    {
      files: ['**#/info'],
      rules: {
        'info-contact': 'off',
        'info-description': 'off',
      },
    },
  ],
};
