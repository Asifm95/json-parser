import { contents } from './src/fileReader.js';
import * as parsers from './src/parsers.js';

const parseJson = json => {
  // Main parser definition
};
const factoryParser = function(parsers) {
  for (let i = 0; i < parsers.length; i++) {
    // parsers[i]();
  }
};
const valueParser = factoryParser(parsers);
console.log(parsers);
