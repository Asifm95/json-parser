// var json = '{"player": "Dexter", "score": 500}';
var json = '123 is not null, and null is good.';
var nullJson = 'null 123';
var booleanJson = 'true hello';
function parseJson(json) {
  console.log('Null parser', nullParser(json));
  console.log('Boolean parser', booleanParser(json));
}
function nullParser(str) {
  const re = /^null/gi;
  let match = str.match(re);
  return match ? [null, str.replace(/^null/, '')] : null;
}
function booleanParser(str) {
  const re = /^true|false/;
  let match = str.match(re);
  return match
    ? [match[0] ? true : false, str.replace(/^true|false/, '')]
    : false;
}
parseJson(nullJson);
parseJson(booleanJson);
