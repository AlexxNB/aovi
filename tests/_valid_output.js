const {aovi} = require('../dist/aovi');

module.exports = function (t) {
    let result;

    result = aovi({name:'john'})
        .check('name')
            .required()

    t.equal(result.valid,true,"Valid");
    t.equal(result.text(),'',"Text");
    t.equal(result.json(),'[]',"JSON");
    t.deepEqual(result.array(),[],"Array");

    t.end();
}