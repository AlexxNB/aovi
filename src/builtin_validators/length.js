export default (length) => {                 
    return {
        test: v => v.length === length,                       
        message: `must have a length of ${length}`,
        notMessage: `must not have a length of ${length}`     
    }
}