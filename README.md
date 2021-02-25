# aovi

AOVI is a tiny (~2.5KB) dependency free library to validate values of the simple object's properties in declarative way. May be used in Node or in browser as well.

## Usage

### Node
```js
const {aovi} = require('aovi');

const test_object = {name:'John'};

const result = aovi(test_object)
    .check('name')
        .required()
        .match(/^[a-z]+$/i)

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
            .required()
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
    email: 'no',
    age: 16
}

const result = aovi(test_object)
    .check('user')              // the property name
        .required()             // check something
        .type('string')         // check more
    .check('sex')               // and once again with another property
        .required()
        .oneof(['male','female'])
    .check('email')
        .match(/[^@]+@[^\.]+\..+/,'E-Mail is invalid')
        .minLength(6)       // skipped, because match already failed
    .check('age')
        .min(18)
    .check('name')
        .type('string')     // skipped, because name is undefined and not required     

console.log(result.valid); // false
console.log(result.text()); // E-Mail is invalid. age must be greater than 18.
console.log(result.json()); // [{"name": "email", "err":"E-Mail is invalid"},{"name": "age", "err":"age must be greater than 18"}]
```
### Asynchronus example
```js
// http-request with body_parser.json middleware example
async function(req,res){
    const check_password = async function(userid,password) {
        const user = await db.getuser(userid); // asynchronly request user from db 
        return user.password===password;
    }

    const data = req.body;

    const result = aovi(data)     
        .check('password')
            .required()    
            .is(async password => await check_password(data.userid,password)),'Wrong password')
        .check('userid')
            .required()
            .type('number')

    console.log(await result.valid);  // don't miss await keyword here
    console.log(await result.text());
    console.log(await result.json());
}

```

## Custom validators
You may add your own reusable validators to the `aovi` object. Custom validator is the function which must return object with three elements:

* `name` - name for validator method 

* `test` - test function must return `true` or `false`. When `true` value of the property is valid. Function gets the value of the property as its parameter.

* `message` - default validation error message. Name of the property or its label will be added at the start of this text.

* `notMessage` - default validation error message if used `.not` operator before. Name of the property or its label will be added at the start of this text. If ommited, `.not` will not be allowing to use with this custom validator.

### Custom validator example

```js
// a,b - params, which should be be passed to the validator by user
const my_custom_validator = (a,b) => {                      
    return {    
        // name of the validator method
        name: 'between',             
        
        // test function gets value, must return true or false
        test: (v)=>(v>=a && v<=b),      
        
        // error message, when test returns false
        message: `%Label% must be between ${a} and ${b}`      
        
        // error message, when used .not and test returns true
        notMessage: `%Label% must not be between ${a} and ${b}` 
    }
}

const test_object={number1:5, number2:42, number3:100};

const result = aovi(test_object)
    .use(my_custom_validator)
    .check('number1')
        .between(10,50)
    .check('number2')
        .not.between(0,100)
    .check('number3')
        .between(1,10,'The value is out of range')

console.log(result.text()); // number1 must be between 10 and 50. number2 must not be between 0 and 100. The value is out of range.
```

## Meassages variables
There is a set ov placeholders, which you may use in validators custom messages  or in the messages of custom validators. They will be replaced by their values in result.

* `%label%` - label (or name, if label not specified) of the tested property.
* `%Label%` - same, but with capitalized first letter.
* `%name%` - name of the tested property.
* `%Name%` - same, but with capitalized first letter.
* `%value%` - provided property value.

## API

### `aovi(test_object)`

Detrmine object for validation

### `.use(validator_function)`

Add custom validator to the `aovi` object. See [Custom validators](#custom-validators) for more info.

### `.check(property_name,[label])`

Set which property will be validate by next functions. `label` is the name for the property which will be shown in default error messages

### `.not`

Invert result of the next validator. Can be used before `type`,`match`,`is`,`oneof` and `length` validators. Example `.not.length(5)`.

### `.required([custom_message])`

Check if the propertyis defined in object and its value is not equal empty string. 

### `.type(type,[custom_message])`

Check if the property's value is of specified `type`, like 'string','number' etc. 

### `.match(regular_expression,[custom_message])`

Check if the property's value is match `regular_expression`.

### `.is(function,[custom_message])`

Pass if the `function` returns `true`. This function accept one parameter which is a value of the current property. If `function` is asynchronous, you must call result functions (`.text()`, `.json()`, `.array()` and `.valid`) asynchronously too.

### `.oneof(array_of_variants,[custom_message])`

Check if the property's value is in the `array_of_variants` array.

### `.length(needed_length,[custom_message])`

Check if the property's value length is exact `needed_length`.

### `.minLength(min_length,[custom_message])`

Check if the property's value length is greater than or equal `min_length`.

### `.maxLength(max_length,[custom_message])`

Check if the property's value length is less than or equal `max_length`.

### `.min(minimum,[custom_message])`

Check if the property's valueis greater than or equal `minimum`.

### `.max(maximum,[custom_message])`

Check if the property's value is less than or equal `maximum`.

### `.valid`

Is `true` when no errors where occured during validation chain. Will be `false` in other case.

### `.text()`

Return errors as string. Will return `''` if no errors.

### `.json()`

Return errors as JSON-string. Will return `'[]'` if no errors.

### `.array()`

Return errors as array. Will return `[]` if no errors.