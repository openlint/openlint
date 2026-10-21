import { vi } from 'vitest';

export const exit = vi.fn();
export const cwd = vi.fn();
export const on = vi.fn();

export const stdin = {
  fd: 0,
  isTTY: true,
};
export const stdout = {
  write: vi.fn(),
};

export const stderr = {
  write: vi.fn(),
};
