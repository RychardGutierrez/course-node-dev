const fs = require('node:fs/promises');
const path = require('node:path');
const picoColor = require('picocolors');

const folder = process.argv[2] ?? '.';

async function ls(folder) {
  let files = [];
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error(picoColor.red(`Something went wrong`));
    process.exit(1);
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let fileStats = null;
    try {
      fileStats = await fs.stat(filePath); // status -> information of file
    } catch (error) {
      console.log(picoColor.red(`Something went wrong with path ${filePath}`));
      process.exit(1);
    }

    const isDirectory = fileStats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const fileSize = isDirectory ? '' : fileStats.size;
    const fileModified = fileStats.mtime.toLocaleString();

    return `${fileType}  ${file.padEnd(20)} ${fileSize
      .toString()
      .padStart(10)} ${fileModified}`;
  });

  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach((fileInfo) => console.log(picoColor.green(fileInfo)));
}

ls(folder);
