const fs = require('node:fs/promises');

const fs2 = require('fs');

// in the case that we need promise and the package not have this
// we can use the following code:
const { promisify } = require('node:util');

console.log('read file 1');
// const text = fs.readFileSync('file.txt', 'utf-8');
fs.readFile('file.txt', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

console.log('----------- another things -----------');

console.log('read file 2');
fs.readFile('file2.txt', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

console.log('----------- use promisify -----------');
const readFilePromise = promisify(fs2.readFile);

readFilePromise('file2.txt', 'utf-8').then((data) => {
  console.log(data);
});
