export const commaParser = str => {
  let match
  return str.startsWith(',')
    ? ((match = str.match(/^,/)), match ? [match[0], str.slice(1)] : null)
    : null
}

export const spaceParser = str => {
  let spaceLength
  return str.startsWith(' ')
    ? ((spaceLength = str.match(/^\s*/)[0].length),
      spaceLength > 0
        ? [str.slice(0, spaceLength), str.slice(spaceLength)]
        : null)
    : null
}
export const colonParser = str => {
  return (match = str.match(/^:/)), match ? [match, str.replace(re, '')] : null
}
