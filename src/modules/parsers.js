import { factory } from './factory/factory.js'
import { nullx } from './parsers/null.js'
import { boolean } from './parsers/boolean.js'
import { number } from './parsers/number.js'
import { stringx } from './parsers/string.js'
import { array } from './parsers/array.js'
import { object } from './parsers/object.js'

export const parsers = {
  nullx,
  boolean,
  number,
  stringx,
  array,
  object
}
export const valueParser = factory(parsers)
