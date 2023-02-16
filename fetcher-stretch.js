const request = require('request');
const fs = require('fs');
const readline = require('readline');

const url = process.argv[2];
const path = process.argv[3];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function downloadFile(url, path) {
  request.get(url, (err, res, body) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.writeFile(path, body, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
    });
  });
}

fs.access(path, fs.constants.F_OK, (err) => {
  if (!err) {
    rl.question(`${path} already exists. Do you want to overwrite it? (Y/n) `, (answer) => {
      if (answer.toLowerCase() !== 'y') {
        console.log('Aborting...');
        rl.close();
        return;
      }

      downloadFile(url, path);
      rl.close();
    });
  } else {
    downloadFile(url, path);
  }
});


