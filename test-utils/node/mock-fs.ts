// the root __mocks__/fs.ts swaps fs for memfs, so the tests never touch the disk
vi.mock('fs');
