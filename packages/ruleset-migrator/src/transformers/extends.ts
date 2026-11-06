import { builders as b, namedTypes } from 'ast-types';
import * as path from '@stoplight/path';
import { Transformer, TransformerCtx } from '../types';
import { Ruleset } from '../validation/types';
import { assertArray } from '../validation';
import { process } from '../index';
import { isBasicRuleset } from '../utils/isBasicRuleset';

const BUILTIN_RULESETS: Record<string, Readonly<{ packageName: string; exportName: string }>> = {
  'openlint:openapi': { packageName: '@openlint/ruleset-openapi', exportName: 'oas' },
  'openlint:asyncapi': { packageName: '@openlint/ruleset-asyncapi', exportName: 'asyncapi' },
  'openlint:arazzo': { packageName: '@openlint/ruleset-arazzo', exportName: 'arazzo' },
  'spectral:oas': { packageName: '@openlint/ruleset-spectral-oas', exportName: 'oas' },
  'spectral:asyncapi': { packageName: '@openlint/ruleset-spectral-asyncapi', exportName: 'asyncapi' },
  'spectral:arazzo': { packageName: '@openlint/ruleset-spectral-arazzo', exportName: 'arazzo' },
};

export { transformer as default };

async function processExtend(
  ctx: TransformerCtx,
  name: string,
): Promise<namedTypes.ObjectExpression | namedTypes.Identifier> {
  const builtinRuleset = Object.hasOwn(BUILTIN_RULESETS, name) ? BUILTIN_RULESETS[name] : void 0;
  if (builtinRuleset !== void 0) {
    return ctx.tree.addImport(builtinRuleset.exportName, builtinRuleset.packageName);
  }

  const filepath = ctx.tree.resolveModule(name, ctx, 'ruleset');

  if (!(await isBasicRuleset(filepath, ctx.opts.fetch))) {
    return ctx.tree.addImport(`${path.basename(filepath, true)}_${path.extname(filepath)}`, filepath, true);
  }

  return await process(await ctx.read(filepath, ctx.opts.fs, ctx.opts.fetch), {
    ...ctx,
    filepath,
    tree: ctx.tree.fork(),
  });
}

const transformer: Transformer = function (hooks) {
  hooks.add([
    /^(\/overrides\/\d+)?\/extends$/,
    async (input, ctx): Promise<namedTypes.ArrayExpression | namedTypes.ObjectExpression | namedTypes.Identifier> => {
      const _extends = input as Ruleset['extends'];

      if (typeof _extends === 'string') {
        return processExtend(ctx, _extends);
      }

      assertArray(_extends);
      const extendedRulesets: (namedTypes.ArrayExpression | namedTypes.ObjectExpression | namedTypes.Identifier)[] = [];

      for (const ruleset of _extends) {
        if (typeof ruleset === 'string') {
          extendedRulesets.push(await processExtend(ctx, ruleset));
        } else {
          extendedRulesets.push(b.arrayExpression([await processExtend(ctx, ruleset[0]), b.literal(ruleset[1])]));
        }
      }

      return b.arrayExpression(extendedRulesets);
    },
  ]);
};
