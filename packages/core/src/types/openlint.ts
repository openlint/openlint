import { IDiagnostic, JsonPath } from '@stoplight/types';
import type { JSONSchema7 } from 'json-schema';
import type { Resolver } from '@openlint/openlint-ref-resolver';

export interface IConstructorOpts {
  resolver?: Resolver;
}

export interface IRunOpts {
  ignoreUnknownFormat?: boolean;
}

export interface IOpenLintDiagnostic extends IDiagnostic {
  path: JsonPath;
  code: string | number;
  documentationUrl?: string;
}

export type IRuleResult = IOpenLintDiagnostic;

export interface IOpenLintFullResult {
  resolved: unknown;
  results: IRuleResult[];
}

// Alias kept to ease migration from `@stoplight/spectral-core`.
export type { IOpenLintFullResult as ISpectralFullResult, IOpenLintDiagnostic as ISpectralDiagnostic };

export interface IGivenNode {
  path: JsonPath;
  value: unknown;
}

export type JSONSchema = JSONSchema7;
