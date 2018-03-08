var fs = require('fs');
let contents = fs.readFileSync('input.json', 'utf8');

// function parseJson(json) {
//   console.log('Null parser', nullParser(json));
//   console.log('Boolean parser', booleanParser(json));
// }
const nullParser = str => {
  const re = /^null/;
  let match = str.match(re);
  console.log(
    'In null parser',
    str,
    match ? [null, str.replace(/^null/, '')] : null
  );

  return match ? [null, str.replace(/^null/, '')] : null;
};

const booleanParser = str => {
  const re = /^true|false/;
  let match = str.match(re);
  console.log(
    'In boolean parser',
    match ? [match[0] ? true : false, str.replace(re, '')] : null
  );
  return match ? [match[0] ? true : false, str.replace(re, '')] : null;
};

const numberParser = str => {
  const re = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
  let match = str.match(re);
  console.log(
    'In number parser',
    match ? [parseFloat(match[0]), str.replace(re, '')] : null
  );
  return match ? [parseFloat(match[0]), str.replace(re, '')] : null;
};

const stringParser = str => {
  if (str.startsWith('"') && str.endsWith('"')) {
    str = str.toString();
    const reQuote = /("([^"]|"")*")/;
    let match = str.match(reQuote);
    if (match[0] != null) {
      const re = /[\n|"']/;
      let slashTest = re.test(match[0].slice(1, -1));
      console.log(
        'In string parser',
        slashTest ? null : [match[0], str.replace(match[0], '')]
      );
      return slashTest ? null : [match[0], str.replace(match[0], '')];
    }
  } else return null;
};

const commaParser = str => {
  const re = /^,/;
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

const arrayParser = str => {
  console.log('In arrayParser', str);

  if (str[0] === '[') {
    let array = [];
    let i = 1;
    while (str[i] !== ']') {
      if (valueParser(str.slice(1, str.length - 1)) != null) {
        array.push(valueParser(str.slice(1, str.length - 1)));
      }
      i++;
    }
    return array;
  } else {
    return null;
  }
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
  objectParser
];

function factoryParser(p) {
  let out;
  return function(text) {
    for (let i = 0; i < p.length; i++) {
      out = p[i](text);
      if (out != null) {
        console.log('Factory', out);
        return out;
      }
    }
    return null;
  };
}

let valueParser = factoryParser(parsers);
valueParser(contents);
