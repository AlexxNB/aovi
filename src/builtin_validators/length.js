export default (length) => {                 
    return {
        test: v => v.length === length,                       
        message: `%Label% must have a length of ${length}`,
        notMessage: `%Label% must not have a length of ${length}`     
    }
}