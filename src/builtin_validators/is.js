export default (cond) => {                 
    return {
        test: cond,                       
        message: `%Label% is not valid`,
        notMessage: `%Label% is truly`        
    }
}