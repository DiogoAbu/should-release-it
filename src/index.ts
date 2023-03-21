#!/usr/bin/env node

import minimist from 'minimist';

import { execAsync } from './utils/exec-async';
import { getPackageJson } from './utils/get-package.json';
import { getReleaseItConfig } from './utils/get-release-it-config';
import { logger } from './utils/logger';

const init = async () => {
  const argv = minimist(process.argv.slice(2));

  if (argv.silent) {
    logger.disable();
  }

  const currentVersion = (argv['current-version'] as string) || getPackageJson()?.version;
  if (!currentVersion) {
    logger.error('Could not find current version.');
    process.exitCode = 1;
    return;
  }

  const releaseItConfig = getReleaseItConfig({ dir: argv['release-it-dir'] });
  if (!releaseItConfig) {
    logger.error('Could not parse release-it config.');
    process.exitCode = 1;
    return;
  }

  // Get commit messages
  const { stdout, stderr, error } = await execAsync(`git log v${currentVersion}..HEAD --pretty=format:%s`);
  if (!stdout || stderr || error) {
    logger.log(`Could not find any commit message between v${currentVersion} and HEAD, releasing it as is`);
    process.exitCode = 0;
    return;
  }

  const messages = stdout.split('\n');

  // Parse release-it config file and get types that are not hidden
  const typesThatShouldRelease = releaseItConfig.plugins['@release-it/conventional-changelog'].types.reduce(
    (str, type) => {
      if (!type.hidden) {
        const separator = str.length ? '|' : '';
        str += `${separator}${type.type}`;
      }
      return str;
    },
    '',
  );

  // Build regex with types that should trigger a release
  const isReleaseRegex = new RegExp(`^(${typesThatShouldRelease})`);

  // Test commit messages
  const shouldRelease = messages.some((m) => {
    const isRelease = isReleaseRegex.test(m);
    logger.log(isRelease ? 'Should trigger a release:' : 'Should NOT trigger a release:', m);
    return isRelease;
  });

  if (!shouldRelease) {
    logger.log('No meaningful commits found, we should not release');
    process.exitCode = 1;
    return;
  }

  logger.log('Found at least one commit that require a release, we should release');
  process.exitCode = 0;
};

void init().catch((err) => {
  logger.error('Failed to run, let the release happen', err);
  process.exitCode = 0;
});
