import { parse } from '@iarna/toml';
import { cosmiconfigSync } from 'cosmiconfig';
import isPlainObject from 'lodash.isplainobject';

const searchPlaces = [
  'package.json',
  '.release-it.json',
  '.release-it.js',
  '.release-it.cjs',
  '.release-it.yaml',
  '.release-it.yml',
  '.release-it.toml',
];

const loaders = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '.toml': (_: unknown, content: string) => parse(content),
};

export const getReleaseItConfig = ({ dir = process.cwd() }: { dir?: string }): ReleaseIt | undefined => {
  const explorer = cosmiconfigSync('release-it', {
    searchPlaces,
    loaders,
  });

  const result = explorer.search(dir);
  return result && isPlainObject(result.config) ? result.config : undefined;
};

export interface ReleaseIt {
  plugins: Plugins;
}

export interface Plugins extends Record<string, ReleaseItConventionalPlugin> {}

export interface ReleaseItConventionalPlugin {
  preset: string;
  types: ReleaseItConventionalPluginType[];
}

export interface ReleaseItConventionalPluginType {
  type: string;
  section: string;
  hidden?: boolean;
}
