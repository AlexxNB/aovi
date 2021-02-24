export default (min) => {                 
    return {
        test: v => v >= min,                       
        message: `must be greater than ${min}`
    }
}