import type { ReleaseIt, ReleaseItConventionalPluginType } from './get-release-it-config';

import { logger } from './logger';

export const getConventionConfigTypes = (
  releaseItConfig: ReleaseIt,
): ReleaseItConventionalPluginType[] | null => {
  if (releaseItConfig?.plugins?.['@release-it/conventional-changelog']?.types) {
    logger.info('Found custom types.');
    return releaseItConfig.plugins['@release-it/conventional-changelog'].types;
  }

  let preset = 'conventionalcommits';
  if (releaseItConfig?.plugins?.['@release-it/conventional-changelog']?.preset) {
    preset = releaseItConfig.plugins['@release-it/conventional-changelog'].preset;
    logger.info(`Found preset: ${preset}.`);
  } else {
    logger.info(`Did not find a preset, defaulting to: ${preset}.`);
  }

  if (preset === 'conventionalcommits') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('conventional-changelog-conventionalcommits').DEFAULT_COMMIT_TYPES;
  }

  return null;
};
