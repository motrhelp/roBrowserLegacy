import { describe, expect, it } from 'vitest';
import MemoryManager from 'Core/MemoryManager.js';

describe('MemoryManager', () => {
	it('cleans stale entries without requestIdleCallback support', async () => {
		const filename = 'safari-fallback-test.txt';
		MemoryManager.set(filename, new ArrayBuffer(1));

		expect(() => {
			MemoryManager.clean(null, Date.now() + 60_000);
		}).not.toThrow();

		await new Promise(resolve => {
			setTimeout(resolve, 10);
		});

		expect(MemoryManager.search(/^safari-fallback-test\.txt$/)).toEqual([]);
	});
});
