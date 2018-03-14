export const serializer = str => {
  return str.replace(/\s(?=("[^"]*"|[^"])*$)/gm, '')
}
