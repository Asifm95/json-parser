export const space = str => {
  let match
  return (str && str.startsWith(' ')) || (str && str.startsWith('\n'))
    ? ((match = str.match(/^\s+|\s+$/)),
      match && match[0] ? [match[0], str.replace(/^\s+|\s+$/, '')] : null)
    : null
}
