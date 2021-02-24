export default (max) => {                 
    return {
        test: v => v <= max,                       
        message: `must be less than ${max}`,
    }
}