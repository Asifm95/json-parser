export const nullx = str => {
  return str && str.startsWith('null') ? [null, str.slice(4)] : null
}
