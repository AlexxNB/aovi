export default (min) => {                 
    return {
        test: v => v.length >= min,                       
        message: `%Label% must have a minimum length of ${min}`
    }
}