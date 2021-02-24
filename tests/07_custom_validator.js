const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Custom validator', () => {
    let result,test_object={};

    const validator = (a,b) => {
        return {
            func: (v)=>(v>=a && v<=b),
            name: 'between',
            msg: `must be between ${a} and ${b}`
        }
    }

    test_object={number:42,number2:100};

    result = aovi(test_object)
        .use(validator)
        .check('number')
            .between(10,100)
        .check('number')
            .between(1,10)
        .check('number2')
            .between(10,50,'Value is out of range')
        
    equal(result.text(),'number must be between 1 and 10. Value is out of range.',"Test custom validator");
});

test.run();