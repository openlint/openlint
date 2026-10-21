import { describe, expect, it, vi, type Mock } from 'vitest';
import { DiagnosticSeverity } from '@stoplight/types';
import * as fs from 'fs';
import * as process from 'process';
import { Ruleset } from '@openlint/openlint-core';
import * as formatters from '@openlint/openlint-formatters';
import { OutputFormat } from '../config';
import { formatOutput, writeOutput } from '../output';

vi.mock('@openlint/openlint-formatters');
vi.mock('fs', async () => ({
  readFileSync: (await vi.importActual<typeof import('fs')>('fs')).readFileSync,
  promises: {
    writeFile: vi.fn().mockResolvedValue(void 0),
  },
}));
vi.mock('node:process');

describe('Output service', () => {
  describe('formatOutput', () => {
    it.each(['stylish', 'json', 'junit'])('calls %s formatter with given result', format => {
      const results = [
        {
          code: 'info-contact',
          path: ['info'],
          message: 'Info object should contain `contact` object.',
          severity: DiagnosticSeverity.Information,
          range: {
            start: {
              line: 2,
              character: 9,
            },
            end: {
              line: 6,
              character: 19,
            },
          },
          source: '/home/openlint/src/__tests__/__fixtures__/petstore.oas3.json',
        },
      ];

      const output = `value for ${format}`;
      (formatters[format as keyof typeof formatters] as Mock).mockReturnValueOnce(output);
      expect(
        formatOutput(results, format as OutputFormat, { failSeverity: DiagnosticSeverity.Error }, {} as Ruleset),
      ).toEqual(output);
    });
  });

  describe('writeOutput', () => {
    it('given outputFile, writes output to a specified path', async () => {
      const output = '{}';
      const outputFile = 'foo.json';
      expect(await writeOutput(output, outputFile)).toBeUndefined();
      expect(fs.promises.writeFile).toBeCalledWith(outputFile, output);
    });

    it('given <stdout>, print output to console', async () => {
      const output = '{}';
      const writeMock = vi.spyOn(process.stdout, 'write').mockImplementation((chunk: any, callback?: any) => {
        if (typeof callback === 'function') {
          callback();
        }
        return true;
      });

      expect(await writeOutput(output, '<stdout>')).toBeUndefined();
      expect(writeMock).toHaveBeenCalledWith(output, expect.any(Function));

      writeMock.mockRestore();
    });
  });
});
