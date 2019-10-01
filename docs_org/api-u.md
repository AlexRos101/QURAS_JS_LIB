---
id: api-u
title: Utility
---

The utility module is exposed as:

```js
import QurasLib from 'quras-js'
QurasLib.u.reverseHex(hexstring)

import { u } from 'quras-js'
u.reverseHex(hexstring)
```

The utility module contains:

- Format manipulation methods
- Hashing methods
- Utility classes

## Classes

### StringStream

StringStream is a simple stream object that allows us to read a hexstring byte by byte. It is not an actual stream but fakes the stream interface for better manipulation. It stores the whole string and a pointer to keep track of the current position on the string.

It is used in serializing and deserializing a transaction object. The ScriptBuilder class for smart contracts inherits from StringStream.

```js
import QurasLib from 'quras-js'
const ss = new QurasLib.u.StringStream('abcdefgh')
ss.read(1) // 'ab'
ss.read(2) // 'cdef'
ss.isEmpty() // false
ss.read(1) // 'gh'
ss.isEmpty() // true
ss.str // 'abcdefgh'
```

### Fixed8

Fixed8 is a class based off bignumber.js for storage and accurate calculations of values. It is extended to have helper methods for converting between decimal and hex representation.

```js
import QurasLib from 'quras-js'
const a = new QurasLib.u.Fixed8(1)
a.toHex()        // '0000000005f5e100'
a.toReverseHex() // '00e1f50500000000'

const b = QurasLib.u.Fixed8.fromHex('0000000005f5e100') // 1

import {u} from 'quras-js'
const c = new u.Fixed8('2')
const d = u.Fixed8.fromReverseHex('00e1f50500000000')
```

## Methods

### Format

While most of the methods in QurasLib takes in strings and outputs strings, the underlying logic requires a lot of format conversions.

```js
import QurasLib from 'quras-js'
QurasLib.u.reverseHex(hexstring)
QurasLib.u.num2fixed8(1)
QurasLib.u.ab2str(arrayBuffer)

// Conversions to hex
QurasLib.u.str2hexstring('normalString') // 6e6f726d616c537472696e67
QurasLib.u.int2hex(234) // EA
QurasLib.u.ab2hexstring(arrayBuffer)

// Conversion from hex
QurasLib.u.hexstring2str('6e6f726d616c537472696e67') // normalString
QurasLib.u.hex2int('EA') // 234
QurasLib.u.hexstring2ab(hexString)
```

The most common format is hex string. This is a string where every 2 characters represents a byte in an bytearray. `quras-js` intentionally works with hex strings because strings are easy to print and manipulate.

A special format used in QRS is the fixed8 number format. It is a fixed point float with precision of 8 decimal places. It is usually received as a hexstring from `getrawtransaction`. `quras-js` has functions to convert it to and from a JS number type.

### Hashing

These methods are convenient wrappers around the CryptoJS functions. They take in strings and return strings.

```js
import QurasLib from 'quras-js'
// Performs a single SHA
QurasLib.u.sha256(item)
// Performs a SHA followed by a SHA
QurasLib.u.hash256(item)
// Performs a SHA followed by a RIPEMD160
QurasLib.u.hash160(item)
```

