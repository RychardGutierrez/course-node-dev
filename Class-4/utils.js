import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJSON = (pathJson) => {
  const result = require(pathJson);
  return result;
};
