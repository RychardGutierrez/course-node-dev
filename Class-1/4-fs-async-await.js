const fs = require('node:fs/promises');

(async () => {
  const text1 = await fs.readFile('file.txt', 'utf-8')
  console.log(text1);

  console.log('----------- another things -----------');

  console.log('read file 2');
  const text2 = await fs.readFile('file2.txt', 'utf-8')
console.log(text2);
})();
