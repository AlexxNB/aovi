const {aovi} = require('../dist/aovi');

module.exports = function (t) {
    let result;

    result = aovi({name:'john',lastname:''})
        .check('name')
            .oneof(['bill','boris','alex'])
        .check('lastname')
            .required()

    t.equal(result.valid,false,"Valid");
    t.equal(result.text(),'name must be either bill, boris or alex. lastname is required.',"Text");
    t.equal(result.json(),'[{"name":"name","error":"name must be either bill, boris or alex"},{"name":"lastname","error":"lastname is required"}]',"JSON");
    t.deepEqual(result.array(),[ { name: 'name', error: 'name must be either bill, boris or alex' }, { name: 'lastname', error: 'lastname is required' } ],"Array");

    t.end();
}
