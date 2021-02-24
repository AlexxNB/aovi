const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Simple tests', () => {
    let result;

    result = aovi({name:''})
        .check('name','Your name')
            .required()
    equal(result.text(),'Your name is required.',"Custom label for message");

    result = aovi({name:'John',lastname:''})
        .check('unexistent')
            .required()
        .check('name')
            .required()    
        .check('lastname')
            .required()    
    equal(result.text(),'unexistent is required. lastname is required.',"Required test");

    result = aovi({name:123})
        .check('name')
            .type('string')
        .check('name')
            .type('number')
    equal(result.text(),'name must be of type string.',"Type test");

    result = aovi({name:'john'})
        .check('name')
            .match(/^[a-z]+$/)
        .check('name')
            .match(/^[0-9]+$/)
    equal(result.text(),'name must match /^[0-9]+$/.',"Match test");

    result = aovi({name:'john',list:[1,2,3,4,5]})
        .check('name')
            .length(4)
        .check('name')
            .length(10)
        .check('list')
            .length(5)
        .check('list')
            .length(10)
    equal(result.text(),'name must have a length of 10. list must have a length of 10.',"Length test");

    result = aovi({name:'john',list:[1,2,3,4,5]})
        .check('name')
            .minLength(3)
        .check('name')
            .minLength(10)
        .check('list')
            .minLength(3)
        .check('list')
            .minLength(10)
    equal(result.text(),'name must have a minimum length of 10. list must have a minimum length of 10.',"minLength test");

    result = aovi({name:'john',list:[1,2,3,4,5]})
        .check('name')
            .maxLength(3)
        .check('name')
            .maxLength(10)
        .check('list')
            .maxLength(3)
        .check('list')
            .maxLength(10)
    equal(result.text(),'name must have a maximum length of 3. list must have a maximum length of 3.',"maxLength test");

    result = aovi({number:42})
        .check('number')
            .min(3)
        .check('number')
            .min(50)
    equal(result.text(),'number must be greater than 50.',"Min test");

    result = aovi({number:42})
        .check('number')
            .max(3)
        .check('number')
            .max(50)
    equal(result.text(),'number must be less than 3.',"Max test");

    const test_obj = {name:'john'};
    result = aovi(test_obj)
        .check('name')
            .is(test_obj.name === 'john')
        .check('name')
            .is(()=>test_obj.name === 'bill')
    equal(result.text(),'name is not valid.',"Is test");

    result = aovi({name:'john'})
        .check('name')
            .oneof(['bill','john','alex'])
        .check('name')
            .oneof(['bill','boris','alex'])
    equal(result.text(),'name must be either bill, boris or alex.',"Oneof test");
});

test.run();