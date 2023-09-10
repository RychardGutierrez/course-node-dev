const fs = require('node:fs');

const stats = fs.statSync('file.txt');

console.log(
  stats.isFile(), // if is a file
  stats.isDirectory(), // if is a directori
  stats.isSymbolicLink(), // if is a symbolick link
  stats.size // size in bits
);
