// var json = '{"player": "Dexter", "score": 500}';
var json = '123 is not null, and null is good.';
function parseJson(json) {
  console.log(nullParser(json));
}
function nullParser(str) {
  const re = /null/gi;
  let match = str.match(re).map(x => null);
  let remaining = str.replace(/null/gi, '');
  return [match, remaining];
}
parseJson(json);
