export default (regex) => {                 
    return {
        test: v => regex.test(v),                       
        message: `must match ${regex.toString()}`,
        notMessage: `must not match ${regex.toString()}`     
    }
}