import { fileURLToPath } from 'url';
import { dirname as getDirname } from 'path';

// Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = getDirname(__filename);

export { __dirname };