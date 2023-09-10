import { platform, release, arch, cpus, freemem, totalmem } from 'node:os';

console.log('Informations about op');

console.log('name sistem op', platform());
console.log('version sistem op', release());
console.log('architecture op', arch());
console.log('cpu', cpus());
console.log('free memory', freemem() / 1024 / 1024);
console.log('total memory', totalmem() / 1024 / 1024);
