'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

var inputString = '';

function outputReversed(input) {
  process.stdout.write(input.split('').reverse().join('') + '\n\n');
}

process.stdin.on('data', outputReversed);