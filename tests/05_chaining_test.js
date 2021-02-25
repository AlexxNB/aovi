const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Chaining test', () => {
    let result;

    result = aovi({name:'john',lastname:''})
        .check('name')
            .required()
            .length(10)
        .check('lastname')
            .length(10)
            
    equal(result.text(),'Name must have a length of 10.',"Skip checks if not required");
});

test.run();