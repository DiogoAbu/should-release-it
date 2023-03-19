import path from 'path';

type PackageJSON = {
  version: string;
};

export const getPackageJson = (): PackageJSON | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require(path.join(process.cwd(), 'package.json'));

  return packageJson;
};
