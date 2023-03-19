import type { ExecException } from 'child_process';

import { exec } from 'child_process';

type ExecReturn = {
  stdout?: string;
  stderr?: string;
  error?: ExecException;
};

export const execAsync = async (command: string): Promise<ExecReturn> => {
  return await new Promise<ExecReturn>((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve({ error });
        return;
      }
      resolve({ stdout, stderr });
    });
  });
};
