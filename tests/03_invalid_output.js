const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Invalid output', () => {
    let result;

    result = aovi({name:'john',lastname:''})
        .check('name')
            .oneof(['bill','boris','alex'])
        .check('lastname')
            .required()

    equal(result.valid,false,"Valid");
    equal(result.text(),'Name must be either bill, boris or alex. Lastname is required.',"Text");
    equal(result.json(),'[{"name":"name","error":"Name must be either bill, boris or alex"},{"name":"lastname","error":"Lastname is required"}]',"JSON");
    equal(result.array(),[ { name: 'name', error: 'Name must be either bill, boris or alex' }, { name: 'lastname', error: 'Lastname is required' } ],"Array");
});

test.run();