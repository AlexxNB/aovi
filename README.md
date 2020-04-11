# aovi

AOVI is a tiny (~1.5KB) dependency free library to validate values of the simple object's properties in declarative way. May be used in Node or in browser as well.

## Examples

```js
const {aovi} = require('aovi');

const test_object = {
    user: 'John',
    sex: 'male',
    email: 'not_the_email',
    age: 16
}

const result = aovi(test_object)
    .check('user')                   // the property name
        .required()                  // check something
        .type('string')              // check more
    .check('sex')                    // and once again with another property
        .required()
        .oneof(['male','female'])
    .check('email')
        .match(/[^@]+@[^\.]+\..+/,'E-Mail is invalid')
    .check('age')
        .min(18)

console.log(result.valid); // false
console.log(result.text()); // E-Mail is invalid. age must be greater than 18.
console.log(result.json()); // [{"name": "email", "err":"E-Mail is invalid"},{"name": "age", "err":"age must be greater than 18"}]
```

