export type SpawnFn = (
  command: string,
  env: Record<string, string>,
  cwd: string,
) => Promise<{
  stdout: string;
  stderr: string;
  status: number;
}>;
