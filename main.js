// var json = '{"player": "Dexter", "score": 500}';
let json = 'Good morning th\\nis is a test %^&(*%^ string 111222.';
let nullJson = 'null 123';
let numberJson = 'true 30e4';
let booleanJson = 'true hello';
function parseJson(json) {
  console.log('Null parser', nullParser(json));
  console.log('Boolean parser', booleanParser(json));
}
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

// parseJson(nullJson);
// parseJson(booleanJson);
// console.log(numberParser(numberJson));
console.log(stringParser(json));
