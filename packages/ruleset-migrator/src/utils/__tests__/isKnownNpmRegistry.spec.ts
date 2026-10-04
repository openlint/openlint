import { isKnownNpmRegistry } from '../isKnownNpmRegistry';

describe('isKnownNmRegistry util', () => {
  it.each([
    'https://unpkg.com/openlint-aws-apigateway-ruleset',
    'https://unpkg.com/openlint-aws-apigateway-ruleset/functions/draft4.js',
    'https://esm.sh/@openlint/openlint-core',
  ])('given recognized %s registry, should return true', input => {
    expect(isKnownNpmRegistry(input)).toBe(true);
  });

  it.each([
    'ftp://unpkg.com/openlint-aws-apigateway-ruleset',
    '/nimma/legacy',
    'https://baz.unpkg.com/openlint-aws-apigateway-ruleset',
  ])('given unrecognized %s entity, should return false', input => {
    expect(isKnownNpmRegistry(input)).toBe(false);
  });
});
