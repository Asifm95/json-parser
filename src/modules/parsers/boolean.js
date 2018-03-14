export const boolean = str => {
  return str != undefined && str.startsWith('false')
    ? [false, str.slice(5)]
    : str && str.startsWith('true') ? [true, str.slice(4)] : null
}
