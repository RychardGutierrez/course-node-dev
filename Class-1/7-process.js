// process object
console.log(process.argv);

process.on('exit', () => {
  // clean process
});

// current working directory
console.log(process.cwd());

// control process
// process.exit(1); // 0 or 1

// variables enviroment

console.log(process.env.TEST);
