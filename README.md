# JSON Parser

![Json parser](/src/assets/images/screenshot.gif )

##### JSON parser in JavaScript from scratch

![npm](https://img.shields.io/npm/v/npm.svg?style=for-the-badge)
![apm](https://img.shields.io/badge/Node-9.8.0-brightgreen.svg?&style=for-the-badge)
![apm](https://img.shields.io/apm/l/vim-mode.svg?style=for-the-badge)

##### Made with &#10084;

### Run

```
$ npm start
```

### JSON basic overview

JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.
www.json.org

### Data Types

Supported data types.

- Null
- Boolean
- Number
- String
- Object
- Array

### Value Parser

Value parser takes input from the json and returns the extracted value from factory parser.The return value can be any one of the data types. By checking the forst character of the text, identifies the appropriate parser and returns the value. If no value extracted then each sub parsers will return null.

```
import { data } from './src/modules/fileReader.js'
import { valueParser } from './src/modules/parsers.js'

const result = valueParser(data)
```

The above code shows the initial point of our json parser. The `valueParser` collects data from the `fileReader`.

### Factory parser

The factory parser method is constructed with a for loop and provides all sub parsers. So when the text is passed, the first character of the text will be checked by each parsers. If the input text is null then the factory parser returns null.

```
    if (text === null) return null
    for (let i = 0; i < keys.length; i++) {
        out = p[keys[i]](text)
    }
    return null

```

Then the next order of movement will be like `null`, `boolean`, `number` , `string`, `array`, `object`.
### Regex patterns

Sub parsers use regular expression for the extraction of value from the text.

```
export const colonRe = /^:/
export const commaRe = /^,/
export const numRe = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/
export const commaErrRe = /\,(?!\s*[\{\"\w])/g
export const spaceRe = /^\s+|\s+$/
export const stringRe = /^"(?:\\"|.)*?"/
export const regexTable = {
  '/\\\\/': '\\',
  '/\\//': '/',
  '/\\b/': '\b',
  '/\\f/': '\f',
  '/\\n/': '\n',
  '/\\r/': '\r',
  '/\\t/': '\t'
}
export const serializeRe = /\s(?=("[^"]*"|[^"])*$)/gm
export const validateRe = /[^ | \n]+$/

```

### Null parser

Checks if the string contains null value. If value matches then it returns an array with extracts value and remaining text as return.

```
str.startsWith('null') ? [null, str.slice(4)]
```

### Boolean parser

If the string contain boolean returns the boolean value along with the remaining string. Actually it check for characters that match the words true or false using regex.

### Number parser

Extracts valid json numbers from the string.
Number significance

- May conatain decimal
- Exponents (e | E)
- Digits between 0-9
- Positive or negative numbers
- Only finite are allowed

```
[parseFloat(match[0]), str.slice(match[0].length)]
```
### String parser

Extracts valid string from the text.

### Array parser

### Object parser

### Folder Strucuture

### Licence

##### The MIT License (MIT) See LICENSE

Copyright (c) 2018, Amal Shehu

