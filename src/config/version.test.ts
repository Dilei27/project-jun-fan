import { describe, expect, it } from 'vitest';
import { buildVersion, currentVersionLabel, versionSource } from './version';

describe('Jun Fan version contract', () => {
  it('uses package.json as the build version source', () => {
    expect(buildVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(versionSource).toBe('package.json');
  });

  it('does not present an unresolved product release as current', () => {
    expect(currentVersionLabel).toBe('UNKNOWN');
  });
});
