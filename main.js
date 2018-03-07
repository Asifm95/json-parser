var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8');

// function parseJson(json) {
//   console.log('Null parser', nullParser(json));
//   console.log('Boolean parser', booleanParser(json));
// }
const nullParser = str => {
  const re = /^null/gi;
  let match = str.match(re);
  return match ? [null, str.replace(/^null/, '')] : null;
};
const booleanParser = str => {
  const re = /^true|false/;
  let match = str.match(re);
  return match ? [match[0] ? true : false, str.replace(re, '')] : false;
};
const numberParser = str => {
  const re = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
  let match = str.match(re);
  return match[0] ? [parseFloat(match[0]), str.replace(re, '')] : null;
};
const stringParser = str => {
  str = str.toString();
  const re = /[\n|"']/;
  let slashTest = re.test(str);
  return slashTest ? ['Error'] : str;
};
const commaParser = str => {
  const re = /,/;
  let match = str.match(re);
  return match ? [match[0], str.replace(re, '')] : null;
};
const spaceParser = str => {
  const re = /\s/;
  let match = str.match(re);
  return match ? [match[0], str.replace(re, '')] : null;
};
const colonParser = str => {
  const re = /^:/;
  let match = str.match(re);
  return match ? [match[0], str.replace(re, '')] : null;
};
// console.log(nullParser(contents));
console.log(colonParser(contents));
