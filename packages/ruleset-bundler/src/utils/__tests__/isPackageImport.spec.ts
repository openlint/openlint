import { isPackageImport } from '../isPackageImport';

describe('isPackageImport util', () => {
  it.each([
    'nimma/legacy',
    'nimma',
    'lodash',
    'lodash/get',
    'lodash/get.js',
    '@stoplight/path',
    '@openlint/openlint-core',
    '@openlint/openlint-core/dist/file.js',
  ])('given valid %s package import, should return true', input => {
    expect(isPackageImport(input)).toBe(true);
  });

  it.each(['', '/nimma/legacy', 'path', 'https://esm.sh/@openlint/openlint-core'])(
    'given invalid %s import, should return false',
    input => {
      expect(isPackageImport(input)).toBe(false);
    },
  );
});
