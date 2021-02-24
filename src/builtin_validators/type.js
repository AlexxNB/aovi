export default (type) => {                 
    return {
        test: v => typeof v === type,                       
        message: `must be of type ${type}`,
        notMessage: `must not be of type ${type}`     
    }
}