const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Valid output', () => {
    let result;

    result = aovi({name:'john'})
        .check('name')
            .required()

    equal(result.valid,true,"Valid");
    equal(result.text(),'',"Text");
    equal(result.json(),'[]',"JSON");
    equal(result.array(),[],"Array");
});

test.run();