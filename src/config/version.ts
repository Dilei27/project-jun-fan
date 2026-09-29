import packageJson from '../../package.json';

/** Build identity comes from package.json until release metadata is canonical. */
export const buildVersion = packageJson.version;
export const versionSource = 'package.json' as const;

/** Product release identity remains unresolved across the existing tags/UI. */
export const currentVersionLabel = 'UNKNOWN' as const;
