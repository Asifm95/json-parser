import { space } from './space.js'
export const nullx = str => {
  space(str) ? (str = space(str)[1]) : str
  return str && str.startsWith('null') ? [null, str.slice(4)] : null
}
