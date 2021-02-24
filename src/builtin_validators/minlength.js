export default (min) => {                 
    return {
        test: v => v.length >= min,                       
        message: `must have a minimum length of ${min}`
    }
}