export const commaParser = str => {
  return str && str.startsWith(',')
    ? ((match = str.match(/^,/)), match ? [match[0], str.slice(1)] : null)
    : null
}

export const spaceParser = str => {
  return (str && str.startsWith(' ')) || (str && str.startsWith('\n'))
    ? ((match = str.match(/^\s+|\s+$/)),
      match && match[0] ? [match[0], str.replace(/^\s+|\s+$/, '')] : null)
    : null
}
export const colonParser = str => {
  return (match = str.match(/^:/)), match ? [match, str.slice(1)] : null
}
