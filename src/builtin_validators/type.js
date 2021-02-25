export default (type) => {                 
    return {
        test: v => typeof v === type,                       
        message: `%Label% must be of type ${type}`,
        notMessage: `%Label% must not be of type ${type}`     
    }
}