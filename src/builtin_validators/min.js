export default (min) => {                 
    return {
        test: v => v >= min,                       
        message: `%Label% must be greater than ${min}`
    }
}