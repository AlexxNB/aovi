export function aovi(input) {
    
    const v = {
        er: false,
        qu: [],
        cu: false,
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
        test: (cond,dmsg,msg,r)=>(
            v.cu.c.push({
                f:typeof cond === 'function' ? cond : _=>cond,
                m: msg||`${v.cu.l} ${dmsg}`,
                r: r||false
            }),
            a
        ),
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
        required:        msg   => v.test(p=>p.is,'is required',msg,true),
        is:        (cond,msg)  => v.test(cond,`is not valid`,msg),
        type:      (type,msg)  => v.test(v=>typeof v === type,`must be of type ${type}`,msg),
        match:     (regex,msg) => v.test(v=>regex.test(v),`must match ${regex.toString()}`,msg),
        length:   (length,msg) => v.test(v=>v.length === length,`must have a length of ${length}`,msg),
        minLength:   (min,msg) => v.test(v=>v.length >= min,`must have a minimum length of ${min}`,msg),
        maxLength:   (max,msg) => v.test(v=>v.length <= max,`must have a maximum length of ${max}`,msg),
        min:         (min,msg) => v.test(v=>v >= min,`must be greater than ${min}`,msg),
        max:         (max,msg) => v.test(v=>v <= max,`must be less than ${max}`,msg),
        oneof:      (list,msg) => v.test(v=>list.includes(v),`must be either ${list.slice(0,-1).join(', ')} or ${list[list.length-1]}`,msg),
        use:              (vl) => {  a[vl().name] = function (){
                                        const p=arguments,
                                        c = vl.apply(null,p),
                                        cmsg = p.length > vl.length ? p[vl.length] : undefined;
                                        return v.test(c.func, c.msg, cmsg);
                                        }
                                        return a;
                            },
        async: async _ => (await v.proc(true),a),
        text:  _ => ( v.proc(), v.er.map(e=>e.error+'.').join(' ') ),
        json:  _ => ( v.proc(), JSON.stringify(v.er) ),
        array: _ => ( v.proc(), v.er ),
        get valid(){v.proc(); return v.er.length===0},
    }

    return a;
}