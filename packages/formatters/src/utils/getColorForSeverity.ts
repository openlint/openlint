import { DiagnosticSeverity } from '@stoplight/types';

type SeverityColor = 'red' | 'yellow' | 'blue' | 'white';

const SEVERITY_COLORS: Record<DiagnosticSeverity, SeverityColor> = {
  [DiagnosticSeverity.Error]: 'red',
  [DiagnosticSeverity.Warning]: 'yellow',
  [DiagnosticSeverity.Information]: 'blue',
  [DiagnosticSeverity.Hint]: 'white',
};

export function getColorForSeverity(severity: DiagnosticSeverity): SeverityColor {
  return SEVERITY_COLORS[severity];
}
