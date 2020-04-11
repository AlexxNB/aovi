const test = require('tape');
const {aovi} = require('../dist/aovi');

const test_object = {
    username: 'john',
    email: 'john@mail.exmpl',
    info:{
        sex:'male',
        birthday: new Date('1985-12-03T04:00:00'),
        tnings: 5
    }
}

test('Simple module', function (t) {
    t.plan(1);

    let result = aovi(test_object)
        .check('username')
            .required()
            .oneof(['hue','moe','sere'])

    console.log(result.json());

    t.equal(1,1);
});
