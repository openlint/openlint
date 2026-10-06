import type { DocumentInventory } from '../documentInventory';
import type { Ruleset } from '../ruleset/ruleset';
import { IOpenLintDiagnostic } from '../types';

export interface IRunnerInternalContext {
  ruleset: Ruleset;
  documentInventory: DocumentInventory;
  results: IOpenLintDiagnostic[];
  promises: Array<Promise<void>>;
}
