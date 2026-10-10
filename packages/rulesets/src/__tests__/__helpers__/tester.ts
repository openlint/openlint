import { serveAssets } from '@openlint/openlint-test-utils';
import { IRuleResult, OpenLint, Document, RulesetDefinition } from '@openlint/openlint-core';
import { httpAndFileResolver } from '@openlint/openlint-ref-resolver';
import oasRuleset from '../../oas/index';
import aasRuleset from '../../asyncapi/index';
import arazzoRuleset from '../../arazzo/index';

type Ruleset = typeof oasRuleset & typeof aasRuleset;
export type RuleName = keyof Ruleset['rules'];

type Scenario = ReadonlyArray<
  Readonly<{
    name: string;
    document: Record<string, unknown> | Document<any, any>;
    errors: ReadonlyArray<Partial<IRuleResult>>;
    mocks?: Record<string, Record<string, unknown>>;
  }>
>;

export default (ruleName: RuleName, tests: Scenario): void => {
  describe(`Rule ${ruleName}`, () => {
    const concurrent = tests.every(test => test.mocks === void 0 || Object.keys(test.mocks).length === 0);
    for (const testCase of tests) {
      (concurrent ? it.concurrent : it)(testCase.name, async () => {
        if (testCase.mocks !== void 0) {
          serveAssets(testCase.mocks);
        }

        const s = createWithRules([ruleName]);
        const doc = testCase.document instanceof Document ? testCase.document : JSON.stringify(testCase.document);
        const errors = await s.run(doc);
        expect(errors.filter(({ code }) => code === ruleName)).toEqual(
          testCase.errors.map(error => expect.objectContaining(error) as unknown),
        );
      });
    }
  });
};

export function createWithRules(rules: (keyof Ruleset['rules'])[]): OpenLint {
  const s = new OpenLint({ resolver: httpAndFileResolver });

  s.setRuleset({
    extends: [
      [aasRuleset as RulesetDefinition, 'off'],
      [oasRuleset as RulesetDefinition, 'off'],
      [arazzoRuleset as RulesetDefinition, 'off'],
    ],
    rules: rules.reduce<Record<string, boolean>>((obj, name) => {
      obj[name] = true;
      return obj;
    }, {}),
  });

  return s;
}
