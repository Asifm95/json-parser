let fs = require('fs');
let contents = fs.readFileSync('input.json', 'utf8');

const parseJson = json => {
  console.log('Parsed value', valueParser(json));
};

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
  const re = /true|false/;
  let match = str.match(re);
  return match
    ? [match[0] === 'true' ? true : false, str.replace(re, '')]
    : null;
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
  if (str[0] === '"') {
    str = str.toString();
    const reQuote = /("([^"]|"")*")/;
    let match = str.match(reQuote);
    if (match[0] != undefined) {
      const re = /[\n|"']/;
      let slashTest = re.test(match[0].slice(1, -1));
      console.log(
        'In string parser',
        slashTest ? null : [match[0], str.replace(match[0], '')]
      );
      return slashTest
        ? null
        : [match[0].replace(/"/g, ''), str.replace(match[0], '')];
    }
  } else {
    console.log('In string parser', null);
    return null;
  }
};

const commaParser = str => {
  const re = /^,/;
  let match = str.match(re);
  return match ? [match, str.replace(re, '')] : null;
};

const spaceParser = str => {
  const re = /^\s*/;
  let spaceLength = str.match(re)[0].length;
  console.log(
    'In space parser',
    spaceLength > 0 ? [str.slice(0, spaceLength), str.slice(spaceLength)] : null
  );
  return spaceLength > 0
    ? [str.slice(0, spaceLength), str.slice(spaceLength)]
    : null;
};

const colonParser = str => {
  const re = /^:/;
  let match = str.match(re);
  return match ? [match, str.replace(re, '')] : null;
};

const arrayParser = str => {
  array = [];
  if (str[0] === '[') {
    str = str.substring(1);
    if (str[0] === '[') {
      for (let i = 0; i < str.length; i++) {
        if (str[i] === '[' && str[i + 1] === ']') {
          array.push([]);
        }
      }
      return array;
    }
    while (str != ']') {
      let whiteCatcher = spaceParser(str);
      if (whiteCatcher) {
        str = whiteCatcher[1];
      }
      let value = valueParser(str);
      if (value != undefined) {
        array.push(value[0]);
        str = value[1];
      }
    }
  }
  console.log('In array parser', array);
  return array;
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

const factoryParser = p => {
  let out;
  return function(text) {
    for (let i = 0; i < p.length; i++) {
      out = p[i](text);
      if (out != null) {
        return out;
      }
    }
    return null;
  };
};

let valueParser = factoryParser(parsers);
parseJson(contents);
