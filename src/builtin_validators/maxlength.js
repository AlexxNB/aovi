export default (max) => {                 
    return {
        test: v => v.length <= max,                       
        message: `must have a maximum length of ${max}`
    }
}