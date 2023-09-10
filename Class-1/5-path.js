const path = require('node:path');

console.log(path.sep);

// join routers
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath);

const base = path.basename('/tmp/secret/password.txt');
console.log(base);

const extension = path.extname('/tmp/secret/password.txt');
console.log(extension);
