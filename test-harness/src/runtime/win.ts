import Shell from 'node-powershell';
import type { SpawnFn } from './types.ts';

import { normalizeLineEndings, stripDeprecationWarnings } from '../utils.ts';

export { normalizeLineEndings, applyReplacements } from '../utils.ts';

const r = /(.*)LASTEXITCODE=(.*)/s;

export const spawnNode: SpawnFn = async (command, env, cwd) => {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
    inputEncoding: 'utf8',
    outputEncoding: 'utf8',
  });

  const winCommand = command.replace(/\/binaries\/(openlint\.exe|openlint)/, '/binaries/openlint.exe');
  const wrappedCommand = `cd '${cwd}';${winCommand};echo LASTEXITCODE=$LASTEXITCODE`;
  const finalCommand = `$env:NODE_NO_WARNINGS=1; powershell -Command "& { ${wrappedCommand} }"`;

  await ps.addCommand(finalCommand);

  try {
    const stdOut = await ps.invoke();
    const splitted = r.exec(stdOut);

    if (splitted === null) {
      throw new Error('No LASTEXITCODE has been found in the output.');
    }

    return {
      stderr: '',
      stdout: normalizeLineEndings(stripDeprecationWarnings(splitted[1])),
      status: Number.parseInt(splitted[2]),
    };
  } catch (err) {
    return {
      stderr: normalizeLineEndings(
        stripDeprecationWarnings(err instanceof Error ? err.message.replace(r, '$1') : String(err)),
      ),
      stdout: '',
      status: 1,
    };
  } finally {
    await ps.dispose();
  }
};
