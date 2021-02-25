const { test } = require('uvu');
const {equal} = require('uvu/assert');
const {aovi} = require('../dist/aovi.js');

test('Asynchronus test', async () => {
    let result,test_object={};

    let dbrequest = (name)=>new Promise((resolve, reject) => setTimeout( _ => {resolve(name==="john");}, 100));

    test_object={name:'john',name2:'bob'};

    result = aovi(test_object)
        .check('name')
            .is( async v => dbrequest(v) )
            .length(3)
        .check('name2')
            .is( async v => dbrequest(v) )
        
    equal(await result.text(),'Name must have a length of 3. Name2 is not valid.',"Asynchronus text");
    equal(await result.json(),'[{"name":"name","error":"Name must have a length of 3"},{"name":"name2","error":"Name2 is not valid"}]',"Asynchronus json");
});

test.run();