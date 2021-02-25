const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Not operator', () => {
    let result;

    result = aovi({name:'john'})
        .check('name')
            .not.length(4)

    equal(result.text(),'Name must not have a length of 4.',"Test not operator");
});

test.run();