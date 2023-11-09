import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolversArray = loadFilesSync(path.join(__dirname), { extensions: ['js'] });

export default mergeResolvers(resolversArray);
