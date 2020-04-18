const {check} = require('../dist/aovi');

module.exports = function (t) {
    t.equal(check('a').minLength(4).valid,false,"Should be invalid");

    t.end();
}