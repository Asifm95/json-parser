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
  return match ? [match[0] ? true : false, str.replace(re, '')] : null;
};
const numberParser = str => {
  const re = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
  let match = str.match(re);
  return match ? [parseFloat(match[0]), str.replace(re, '')] : null;
};
const stringParser = str => {
  str = str.toString();
  const re = /[\n|"']/;
  let slashTest = re.test(str);
  return slashTest ? ['Error'] : [str];
};
const commaParser = str => {
  const re = /,/;
  let match = str.match(re);
  return match ? [match, str.replace(re, '')] : null;
};
const spaceParser = str => {
  const re = /^\s/;
  let match = str.match(re);
  return match ? [match, str.replace(re, '')] : null;
};
const colonParser = str => {
  const re = /^:/;
  let match = str.match(re);
  return match ? [match, str.replace(re, '')] : null;
};
const arrayParser = () => {
  return null;
};
const objectParser = () => {
  return null;
};
const parsers = [
  nullParser,
  booleanParser,
  numberParser,
  stringParser,
  arrayParser,
  objectParser,
  commaParser,
  colonParser,
  spaceParser
];

function factoryParser(p) {
  return function(text) {
    for (let i = 0; i < p.length; i++) {
      console.log(p[i](text));
    }
  };
}
let valueParser = factoryParser(parsers);
// console.log(nullParser(contents));
valueParser('nullabc123');
