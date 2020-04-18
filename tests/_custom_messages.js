const {aovi} = require('../dist/aovi');

module.exports = function (t) {
    let result,msg;

    msg = 'You must provide the lastname';
    result = aovi({name:'john'})
        .check('lastname')
            .required(msg)
            
    t.equal(result.text(),`${msg}.`,"Required custom message");

    msg = 'Wrong type for name';
    result = aovi({name:'john'})
        .check('name')
            .type('number',msg)
            
    t.equal(result.text(),`${msg}.`,"Type custom message");

    msg = 'Wrong name';
    result = aovi({name:'john'})
        .check('name')
            .match(/^[0-9]+$/,msg)
            
    t.equal(result.text(),`${msg}.`,"Match custom message");

    msg = 'Wrong name';
    result = aovi({name:'john'})
        .check('name')
            .match(/^[0-9]+$/,msg)
            
    t.equal(result.text(),`${msg}.`,"Match custom message");

    msg = 'Wrong length';
    result = aovi({name:'john'})
        .check('name')
            .length(5,msg)
        .check('name')
            .minLength(5,msg)
        .check('name')
            .maxLength(3,msg)
            
    t.equal(result.text(),`${msg}. ${msg}. ${msg}.`,"Length,minLength,maxLength custom messages");

    msg = 'Wrong value';
    result = aovi({number:42})
        .check('number')
            .min(50,msg)
        .check('number')
            .max(5,msg)
            
    t.equal(result.text(),`${msg}. ${msg}.`,"Min,Max custom messages");

    msg = 'Name is bad';
    result = aovi({name:'john'})
        .check('name')
            .is(false,msg)
         
    t.equal(result.text(),`${msg}.`,"Is custom message");

    msg = 'Name should be one of the list';
    result = aovi({name:'john'})
        .check('name')
            .oneof(['one','two','three'],msg)
            
    t.equal(result.text(),`${msg}.`,"Oneof custom message");
        
    t.end();
}