const {aovi} = require('../dist/aovi');

module.exports = function (t) {
    let result;

    result = aovi({name:'john',lastname:''})
        .check('name')
            .required()
            .length(10)
        .check('lastname')
            .length(10)
            
    t.equal(result.text(),'name must have a length of 10.',"Skip checks if not required");

    t.end();
}