export function aovi(input) {
    
    const v = {
        er: false,
        qu: [],
        cu: false,
         n: false,
        add: (name,label) => (v.cu = { 
                n:name, 
                l:label||name, 
                v:input[name], 
                is:(input[name] !== undefined && input[name] !== ''), 
                c:[] 
            },
            v.qu.push(v.cu),
            a
        ),
        test: (cond,ymsg,nmsg,msg,r)=>{
            if(!nmsg && v.n) throw new Error('Using .not with unsupported validator');
            let cfn = typeof cond === 'function' ? cond : _=>cond;
            v.cu.c.push({
                f: v.n ? p => !cfn(p) : cfn,
                m: msg||`${v.cu.l} ${v.n ? nmsg : ymsg}`,
                r: r||false
            });
            v.n=false;
            return a
        },
        proc: async th=>{
            if(v.er) return;
            v.er = [];
            for(let p of v.qu) for(let chk of p.c){
                if(!chk.r && !p.is) continue;
                let b = th ? await chk.f(chk.r ? p : p.v) : chk.f(chk.r ? p : p.v);
                if(!th && b instanceof Promise) throw new Error('You must run .async() before get result');
                if(!b) { v.er.push({name:p.n, error:chk.m}); break; }
            }
        }
    }

    const a = {
        check: v.add,
        required:        msg   => v.test(p=>p.is,'is required',false,msg,true),
        is:        (cond,msg)  => v.test(cond,`is not valid`,`is truly`,msg),
        type:      (type,msg)  => v.test(v=>typeof v === type,`must be of type ${type}`,`must not be of type ${type}`,msg),
        match:     (regex,msg) => v.test(v=>regex.test(v),`must match ${regex.toString()}`,`must not match ${regex.toString()}`,msg),
        length:   (length,msg) => v.test(v=>v.length === length,`must have a length of ${length}`,`must not have a length of ${length}`,msg),
        minLength:   (min,msg) => v.test(v=>v.length >= min,`must have a minimum length of ${min}`,false,msg),
        maxLength:   (max,msg) => v.test(v=>v.length <= max,`must have a maximum length of ${max}`,false,msg),
        min:         (min,msg) => v.test(v=>v >= min,`must be greater than ${min}`,false,msg),
        max:         (max,msg) => v.test(v=>v <= max,`must be less than ${max}`,false,msg),
        oneof:      (list,msg) => v.test(v=>list.includes(v),
                                            `must be either ${list.slice(0,-1).join(', ')} or ${list[list.length-1]}`,
                                            `must be neither ${list.slice(0,-1).join(', ')} or ${list[list.length-1]}`,
                                        msg),
        use:              (vl) => {  a[vl().name] = function (){
                                        const p=arguments,
                                        c = vl.apply(null,p),
                                        cmsg = p.length > vl.length ? p[vl.length] : undefined;
                                        return v.test(c.func, c.msg, c.notmsg||false, cmsg);
                                        }
                                        return a;
                            },
        get not(){v.n=true;return a},
        async: async _ => (await v.proc(true),a),
        text:  _ => ( v.proc(), v.er.map(e=>e.error+'.').join(' ') ),
        json:  _ => ( v.proc(), JSON.stringify(v.er) ),
        array: _ => ( v.proc(), v.er ),
        get valid(){v.proc(); return v.er.length===0},
    }

    return a;
}

export function check(value){
    return aovi({e:value}).check('e','Value').required();
}