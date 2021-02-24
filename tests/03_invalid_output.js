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
    equal(result.text(),'name must be either bill, boris or alex. lastname is required.',"Text");
    equal(result.json(),'[{"name":"name","error":"name must be either bill, boris or alex"},{"name":"lastname","error":"lastname is required"}]',"JSON");
    equal(result.array(),[ { name: 'name', error: 'name must be either bill, boris or alex' }, { name: 'lastname', error: 'lastname is required' } ],"Array");
});

test.run();