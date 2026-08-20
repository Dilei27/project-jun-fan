import { cp, mkdir, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const outputDirectory = 'out';

async function createDirectoryIndexes(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) {
      await createDirectoryIndexes(source);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html') || entry.name === 'index.html') {
      continue;
    }

    const routeDirectory = source.slice(0, -'.html'.length);
    await mkdir(routeDirectory, { recursive: true });
    await cp(source, join(routeDirectory, 'index.html'));
    console.log(`Prepared /${relative(outputDirectory, routeDirectory)}/`);
  }
}

await createDirectoryIndexes(outputDirectory);
