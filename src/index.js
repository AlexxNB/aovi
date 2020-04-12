export function aovi(object) {
    const c = {
        errors: [],
        name: undefined,
        label: undefined,
        value: undefined,
        invalid: false,
        set(name){
            this.name=name;
            this.label=name;
            this.value=object[name]||undefined;
            this.invalid=false;
            return o;
        },
        setlabel(label){
            this.label=label;
            return o;
        },
        test(cond,dmsg,msg){
            if(dmsg !== 'is required' && !this.is()) return o;
            if(!this.invalid && !cond()) {
                this.errors.push({name:this.name,err:msg||`${this.label} ${dmsg}`});
                this.invalid=true;
            }
            return o;
        },
        is(){return this.value !== undefined && this.value !== ''}
    }, 
    o = {
        check:            name=>c.set(name),
        label:           label=>c.setlabel(label),
        required:          msg=>c.test(_=>c.is(),'is required',msg),
        type:          (t,msg)=>c.test(_=>typeof c.value === t,`must be of type ${t}`,msg),
        match:     (regex,msg)=>c.test(_=>regex.test(c.value),`must match ${regex.toString()}`,msg),
        length:   (length,msg)=>c.test(_=>c.value.length === length,`must have a length of ${length}`,msg),
        minLength:   (min,msg)=>c.test(_=>c.value.length >= min,`must have a minimum length of ${min}`,msg),
        maxLength:   (max,msg)=>c.test(_=>c.value.length <= max,`must have a maximum length of ${max}`,msg),
        min:         (min,msg)=>c.test(_=>c.value >= min,`must be greater than ${min}`,msg),
        max:         (max,msg)=>c.test(_=>c.value <= max,`must be less than ${max}`,msg),
        is:         (cond,msg)=>c.test(_=>cond,`is not valid`,msg),
        oneof:      (list,msg)=>{
                        const last = list.pop();
                        return c.test(_=>list.includes(c.value),`must be either ${list.join(', ')} or ${last}`,msg)
                    },
        json:  ()=>JSON.stringify(c.errors),
        text:  ()=>c.errors.map(e=>e.err+'.').join(' '),
        array: ()=>c.errors,
        get valid(){return c.errors.length===0},
    }

    return o;
}