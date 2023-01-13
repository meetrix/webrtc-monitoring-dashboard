import fs from 'fs';
import readline from 'readline';

async function appendLine(outputFileName, line) {
  // Each line in input.txt will be successively available here as `line`.
  try {
    return await fs.promises.appendFile(outputFileName, `${line}\n`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error occurred while reading directory!', err);
    return 'fail';
  }
}

async function processLineByLine() {
  const outputFileName = 'public/env-config.js';
  const inputFileName = '.env';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  if (fs.existsSync('public/env-config.js')) {
    await fs.promises.truncate(outputFileName, 0);
  }
  await appendLine(outputFileName, 'window._env_ = {');
  const fileStream = fs.createReadStream(inputFileName);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    const key = line.substring(0, line.indexOf('='));
    const value = line.substring(line.indexOf('=') + 1);
    await appendLine(outputFileName, `   ${key}: "${value}",`);
  }
  await appendLine(outputFileName, '}');
}

processLineByLine();
