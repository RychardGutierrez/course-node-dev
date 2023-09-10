const fs = require('node:fs');

console.log('read file 1');
// const text = fs.readFileSync('file.txt', 'utf-8');
fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log(data);
});

console.log('----------- another things -----------');

console.log('read file 2');
// const text2 = fs.readFileSync('file2.txt', 'utf-8');
fs.readFile('file2.txt', 'utf-8', (err, data) => {
  console.log(data);
});
