import injectBuiltinValidators from './builtin_validators';

export function aovi(input) {

    const validator = {
        errors: null,
        queue: [],
        current: null,
        isnot: false,
        async: null,

        add: (name,label) => {
            validator.current = { 
                name, 
                label: label||name, 
                value: input[name], 
                exists: (input[name] !== undefined && input[name] !== ''), 
                checks:[] 
            };
            validator.queue.push(validator.current);
            return methods;
        },

        test: (condition,message,notMessage,customMessage,required)=>{

            if(!notMessage && validator.isnot) throw new Error('Using .not with unsupported validator');

            const conditionFn = typeof condition === 'function' ? condition : ()=>condition;

            validator.current.checks.push({
                fn: validator.isnot ? (v,e) => !conditionFn(v,e) : conditionFn,
                message: customMessage||`${validator.isnot ? notMessage : message}`,
                required: required||false
            });

            validator.isnot=false;

            return methods
        },

        proc: () => {
            if(validator.errors || validator.async) return validator.async;

            validator.errors = [];
            validator.async = null;

            let promises = [];
            
            for(let prop of validator.queue) 
            for(let check of prop.checks){
                if(!check.required && !prop.exists) continue;

                const addError = (valid)=>!valid && validator.errors.push({
                    name: prop.name, 
                    error: injectVars(check.message,prop)
                });

                const checkResult = check.fn(prop.value,prop.exists);

                if(checkResult.then) {
                    promises.push(checkResult);
                    checkResult.then(result => {
                        addError(result);
                    })
                }else addError(checkResult);
            }

            if(promises.length) validator.await = Promise.all(promises);
            return validator.await;
        }
    }

    const preserved = ['check','use','not','valid','text','json','array'];

    const methods = {
        check: validator.add,
        use: (customValidator,name) => {  
            name = name || customValidator().name;

            if(preserved.includes(name)) throw new Error('Invalid validator name:'+name);
            
            methods[name] = function (){
                const params=Array.from(arguments);
                const customMessage = params.length > customValidator.length ? params.pop() : undefined;
                const custom = customValidator.apply(null,params);
                return validator.test(custom.test, custom.message, custom.notMessage||false, customMessage, custom.required);
            }
            return methods;
        },
        get not(){
            validator.isnot = true;
            return methods
        },
        get valid(){ return wait(validator.proc, () => validator.errors.length === 0 )},
        text:  () => wait(validator.proc, () => validator.errors.map(e=>e.error+'.').join(' ')),
        json:  () => wait(validator.proc, () => JSON.stringify(validator.errors) ),
        array: () => wait(validator.proc, () => validator.errors )
    }

    injectBuiltinValidators(methods);

    return methods;
}

function wait(fn,callback){
    const result = fn();
    if(result && result.then){
        return new Promise( resolve => result.then( res => resolve( callback(res) ) ) );
    }else return callback(result);
}

function injectVars(str,prop){
    return str
        .replace(new RegExp(`%label%`,'g'),prop.label)
        .replace(new RegExp(`%Label%`,'g'),capitilizeFL(prop.label))
        .replace(new RegExp(`%name%`,'g'),prop.name)
        .replace(new RegExp(`%Name%`,'g'),capitilizeFL(prop.name))
        .replace(new RegExp(`%value%`,'g'),String(prop.value));
}

function capitilizeFL(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}