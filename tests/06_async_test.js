const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Asynchronus test', async () => {
    let result,test_object={};

    let dbrequest = (name)=>new Promise((resolve, reject) => setTimeout( _ => {resolve(name==="john");}, 300));

    test_object={name:'john',name2:'bob'};
    result = await aovi(test_object)
        .check('name')
            .is( async v => dbrequest(v) )
            .length(3)
        .check('name2')
            .is( async v => dbrequest(v) )
        .async()
        
    equal(result.text(),'name must have a length of 3. name2 is not valid.',"Is asynchronus condition");
});

test.run();