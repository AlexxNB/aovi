export default (max) => {                 
    return {
        test: v => v <= max,                       
        message: `%Label% must be less than ${max}`,
    }
}