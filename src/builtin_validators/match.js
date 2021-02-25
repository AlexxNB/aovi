export default (regex) => {                 
    return {
        test: v => regex.test(v),                       
        message: `%Label% must match ${regex.toString()}`,
        notMessage: `%Label% must not match ${regex.toString()}`     
    }
}