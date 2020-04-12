# aovi

AOVI is a tiny (~1.5KB) dependency free library to validate values of the simple object's properties in declarative way. May be used in Node or in browser as well.

## Usage

### Node
```js
const {aovi} = require('aovi');

const test_object = {name:'John'};

const result = aovi(test_object)
    .check('name')
        .require()
        .match(/^[a-z]$/i)

console.log(result.valid); // true
```

### Browser
```html
<script src='https://unpkg.com/aovi/dist/aovi.browser.js'></script>
...
<Input id="password" type="password" value="12345"/>

<script>
    const test_object = {password:document.getElementById('password').value};
    const result = aovi(test_object)
        .check('password')
            .require()
            .minLength(5)

    console.log(result.valid); // true
</script>
```


## Example

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

## API

### `aovi(test_object)`

Detrmine object for validation

### `check(property_name)`

Set which property will be validate by next functions

### `label(property_label)`

Set the name for the property which will be shown in default error messages

### `required([custom_message])`

Check if the propertyis defined in object and its value is not equal empty string. 

### `type(type,[custom_message])`

Check if the property's value is of specified `type`, like 'string','number' etc. 

### `match(regular_expression,[custom_message])`

Check if the property's value is match `regular_expression`.

### `is(condition,[custom_message])`

Pass if the `condition` is `true`. `condition` may be either boolean or function which returns boolean.

### `oneof(array_of_variants,[custom_message])`

Check if the property's value is in the `array_of_variants` array.

### `length(needed_length,[custom_message])`

Check if the property's value length is exact `needed_length`.

### `minLength(min_length,[custom_message])`

Check if the property's value length is greater than or equal `min_length`.

### `maxLength(max_length,[custom_message])`

Check if the property's value length is less than or equal `max_length`.

### `min(minimum,[custom_message])`

Check if the property's valueis greater than or equal `minimum`.

### `max(maximum,[custom_message])`

Check if the property's value is less than or equal `maximum`.

### `valid`

Is `true` when no errors where occured during validation chain. Will be `false` in other case.

### `text()`

Return errors as string. Will return `''` if no errors.

### `json()`

Return errors as JSON-string. Will return `'[]'` if no errors.

### `array()`

Return errors as array. Will return `[]` if no errors.