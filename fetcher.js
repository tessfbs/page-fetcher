const request = require('request');
const fs = require('fs');
const { exit } = require('process');

const url = process.argv[2]; // URL argument
const path = process.argv[3]; // local file path argument

request.get(url,(error,response,body) => {
  if (error) {
    console.error(`Error downloading file: ${error.message}`);
    exit()
  } else {
    fs.writeFile(path, body, error => {
      if(error){
        console.log(`Error saving file: ${err.message}`);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
      }
    })
  }
})
