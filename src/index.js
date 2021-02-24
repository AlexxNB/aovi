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
                fn: validator.isnot ? v => !conditionFn(v) : conditionFn,
                message: customMessage||`${validator.current.label} ${validator.isnot ? notMessage : message}`,
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
            const addError = (valid)=>!valid && validator.errors.push({
                name: prop.name, 
                error: check.message
            });

            for(let prop of validator.queue) 
            for(let check of prop.checks){
                if(!check.required && !prop.exists) continue;

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

    const methods = {
        check: validator.add,
        required:        msg   => validator.test((_,exists)=>exists,'is required',false,msg,true),
        is:        (cond,msg)  => validator.test(cond,`is not valid`,`is truly`,msg),
        type:      (type,msg)  => validator.test(v=>typeof v === type,`must be of type ${type}`,`must not be of type ${type}`,msg),
        match:     (regex,msg) => validator.test(v=>regex.test(v),`must match ${regex.toString()}`,`must not match ${regex.toString()}`,msg),
        length:   (length,msg) => validator.test(v=>v.length === length,`must have a length of ${length}`,`must not have a length of ${length}`,msg),
        minLength:   (min,msg) => validator.test(v=>v.length >= min,`must have a minimum length of ${min}`,false,msg),
        maxLength:   (max,msg) => validator.test(v=>v.length <= max,`must have a maximum length of ${max}`,false,msg),
        min:         (min,msg) => validator.test(v=>v >= min,`must be greater than ${min}`,false,msg),
        max:         (max,msg) => validator.test(v=>v <= max,`must be less than ${max}`,false,msg),
        oneof:      (list,msg) => validator.test(v=>list.includes(v),
                                            `must be either ${list.slice(0,-1).join(', ')} or ${list[list.length-1]}`,
                                            `must be neither ${list.slice(0,-1).join(', ')} or ${list[list.length-1]}`,
                                        msg),
        use: (customValidator) => {  
            methods[customValidator().name] = function (){
                const params=Array.from(arguments);
                const customMessage = params.length > customValidator.length ? params.pop() : undefined;
                const custom = customValidator.apply(null,params);
                return validator.test(custom.test, custom.message, custom.notMessage||false, customMessage);
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

    return methods;
}

function wait(fn,callback){
    const result = fn();
    if(result && result.then){
        return new Promise( resolve => result.then( res => resolve( callback(res) ) ) );
    }else return callback(result);
}