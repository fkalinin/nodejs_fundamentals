var fs = require('fs')
var split = require('split');
var csv = require('csvtojson');

var fileToRead = './csv/nodejs.csv';
var fileToWrite = './text/text.txt';

var readable = fs.createReadStream(fileToRead);
var writable = fs.createWriteStream(fileToWrite);

function onError(e) {
  console.log(e);
}

function toFloat(item) {
  return parseFloat(item.replace(/,/g, '.'));
}

readable
  .pipe(split(/(\n)/))
  .on('error', onError)
  .pipe(csv({
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
    delimiter: ';',
    includeColumns: /(book|author|price)/,
    colParser: {
      price: toFloat
    }
  }))
  .pipe(writable)
  .on('error', onError);

