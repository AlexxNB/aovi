const {aovi} = require('../dist/aovi');

module.exports = function (t) {
    let result;

    result = aovi({name:'john'})
        .check('name')
            .not.length(4)

    t.equal(result.text(),'name must not have a length of 4.',"Test not operator");

    t.end();
}