import required from './required';
import is from './is';
import type from './type';
import match from './match';
import length from './length';
import minLength from './minlength';
import maxLength from './maxlength';
import min from './min';
import max from './max';
import oneof from './oneof';

const list = {
    required,
    is,
    type,
    match,
    length,
    minLength,
    maxLength,
    min,
    max,
    oneof
}

export default function(methods){
    for(let name in list){
        methods.use(list[name],name);
    }
}