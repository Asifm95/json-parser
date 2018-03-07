export const nullParser = str => {
  const re = /^null/;
  let match = str.match(re);
  return match ? [null, str.replace(/^null/, '')] : null;
};
export const booleanParser = str => {
  const re = /^true|false/;
  let match = str.match(re);
  return match ? [match[0] ? true : false, str.replace(re, '')] : false;
};
export const numberParser = str => {
  const re = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
  let match = str.match(re);
  return match[0] ? [parseFloat(match[0]), str.replace(re, '')] : null;
};
export const stringParser = str => {
  str = str.toString();
  const re = /[\n|"']/;
  let slashTest = re.test(str);
  return slashTest ? ['Error'] : str;
};
export const commaParser = str => {
  const re = /,/;
  let match = str.match(re);
  return match ? [match[0], str.replace(re, '')] : null;
};
export const spaceParser = str => {
  const re = /^\s/;
  let match = str.match(re);
  return match ? [match[0], str.replace(re, '')] : null;
};
export const colonParser = str => {
  const re = /^:/;
  let match = str.match(re);
  return match ? [match[0], str.replace(re, '')] : null;
};
export const arrayParser = () => {};
export const objectParser = () => {};
