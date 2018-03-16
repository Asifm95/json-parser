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

```Javascript
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
If the string does not contain double quotes as first character it will return null.
If the first character matches the requirement, it will check for the regex match.This will extract the valid string from the text.If match found then calls the `stringEnhancer` method. It will look in the regex table for line feeds, etc.
`
 '/\\\\/': '\\',
  '/\\//': '/',
  '/\\b/': '\b',
  '/\\f/': '\f',
  '/\\n/': '\n',
  '/\\r/': '\r',
  '/\\t/': '\t'`

  and return an array conatains the extractes part and the remaining text.

```

[stringEnhancer(match[0].slice(1, -1)), str.replace(match[0], '')]

```

### Array parser

Checks for text starts with `[`.

```

if (str != undefined && !str.startsWith('[')) {
    return null
  }

```

If contains, then it slices the first character and enters to the while loop which continues till the last character matches closing square bracket.Next it will eliminates the spaces, tabs and new line  till it matches a valid character.

```

space(str) ? (str = space(str)[1]) : str

```
Next checks the syntax. The `commaCheck` is a function that checks if the element is number and if there any space between number,If there it throws a syntax error. Then pass the text to value parser.

```

const factoryOut = valueParser(str)

```

 Now the array parser will be in the call stack and go for the value parser. When the valid value returns it updates the string and push the extracted value from the value parser.After that will be a `trailCheck`.Then the comma and space parsers helps to extract the next array element.

 ```

 array.push(factoryOut[0])
 str = factoryOut[1]

 ```

After a synatax validation it exits the array parser and returns the value.

```

return [array, str.slice(1)]

```

### Object parser

Object parser identifies object and it's key, values from the JSON. Like the same in array parser it checks for the first character.

```

if (str[0] !== '{') return null

```

 If it's valid a object it slices the first character and moves to the while condition.The loop will continues untill it reaches the end of object. ie, `}` character.

 ```

 while (str[0] != '}')

 ```

The parser contain multiple syntax checks and it if fails then throws an error message.

```

try {
      factory = stringx(str)
    } catch (error) {
      console.log(error)
    }

```
The try...catch conatins string parser statement in try block, and specifies a response, should an exception be thrown if one of the parsers fail. This makes exception handling more easier.

After extracting the key as the string, then after a syntax check it updates the `factory` variable. Then space parcer will remove the spaces and then the colon parser checks for colon and then the remaining part will be passed to a value parser.

```

colon(str) ? (str = colon(str)[1]) : str

```
If value found it will updates the `object` property (Already initialized with an empty object) with the key from the `stringParser` and the value from the `valueParser`.

```

let value = valueParser(str)
object[key] = value[0]
str = value[1]

```

### Folder Strucuture

```

├── main.js  (Initial hit)
├── package.json
├── README.md
└── src
    ├── assets                 (Contains mock json files )
    │   ├── bufferapp.json
    │   ├── choco.json
    │   ├── color-codes.json
    │   ├── gofundme.json
    │   ├── google-maps.json
    │   ├── grocery-list.json
    │   ├── input.json
    │   ├── ip.json
    │   ├── konfabulator-widget.json
    │   ├── nfl-lookout.json
    │   ├── reddit.json
    │   ├── twitter-sample.json
    │   └── youtube.json
    ├── core
    │   └── custom-loader.mjs  (Custom loader for esm)
    └── modules
        ├── exceptionHandlers  (Error handlers)
        │   └── errors.js
        ├── factory
        │   └── factory.js     (Factory function)
        ├── fileReader.js
        ├── parsers            (All parsers)
        │   ├── array.js
        │   ├── boolean.js
        │   ├── colon.js
        │   ├── comma.js
        │   ├── null.js
        │   ├── number.js
        │   ├── object.js
        │   ├── space.js
        │   └── string.js
        ├── parsers.js        (Composing parsers together)
        ├── regex
        │   └── rgx.js        (All regex patterns)
        └── util.js           (String serializer for test purpose)


```

### Licence

##### The MIT License (MIT) See LICENSE

Copyright (c) 2018, Amal Shehu

