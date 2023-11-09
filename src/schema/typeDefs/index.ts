import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typesArray = loadFilesSync(path.join(__dirname), { extensions: ['graphql'] });

export default mergeTypeDefs(typesArray);
