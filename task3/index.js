import fs from 'fs';
import split from 'split';
import csv from 'csvtojson';

const fileToRead = './csv/nodejs.csv';
const fileToWrite = './text/text.txt';

const readable = fs.createReadStream(fileToRead);
const writable = fs.createWriteStream(fileToWrite);

function onError(e) {
  console.log(e);
}

const toFloat = (item) => parseFloat(item.replace(/,/g, '.'));

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

