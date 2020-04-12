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
    t.equal(result.json(),'[{"name":"name","err":"name must be either bill, boris or alex"},{"name":"lastname","err":"lastname is required"}]',"JSON");
    t.deepEqual(result.array(),[ { name: 'name', err: 'name must be either bill, boris or alex' }, { name: 'lastname', err: 'lastname is required' } ],"Array");

    t.end();
}
