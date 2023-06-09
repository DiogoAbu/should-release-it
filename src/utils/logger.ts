import figures from 'figures';
import { Signale } from 'signale';

export const logger = new Signale({
  config: {
    displayLabel: false,
    displayTimestamp: true,
    underlineMessage: false,
  },
  disabled: false,
  interactive: false,
  scope: 'should-release-it',
  stream: [process.stdout],
  types: {
    log: {
      badge: figures.info,
      color: 'magenta',
      label: '',
      stream: [process.stdout],
    },
    success: {
      badge: figures.tick,
      color: 'green',
      label: '',
      stream: [process.stdout],
    },
    error: {
      badge: figures.cross,
      color: 'red',
      label: '',
      stream: [process.stderr],
    },
  },
});
