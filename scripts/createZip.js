import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

// Create output directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Create a write stream for the zip file
const output = fs.createWriteStream('dist/agromart-project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for warnings and errors
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// On close, log the total bytes written
archive.on('end', function() {
  console.log('Archive created successfully!');
  console.log('Total bytes:', archive.pointer());
});

// Pipe archive data to the output file
archive.pipe(output);

// Add directories with their contents
const directories = [
  'src',
  'public',
  'scripts'
];

// Add individual files
const files = [
  '.gitignore',
  'index.html',
  'package.json',
  'postcss.config.js',
  'README.md',
  'tailwind.config.js',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.ts'
];

// Add directories recursively
directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    archive.directory(dir, dir);
  }
});

// Add individual files
files.forEach(file => {
  if (fs.existsSync(file)) {
    archive.file(file);
  }
});

// Finalize the archive
archive.finalize();