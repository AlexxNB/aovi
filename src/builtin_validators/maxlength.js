export default (max) => {                 
    return {
        test: v => v.length <= max,                       
        message: `%Label% must have a maximum length of ${max}`
    }
}