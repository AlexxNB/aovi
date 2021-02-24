export default (list) => {                 
    return {
        test: v => list.includes(v),                       
        message: `must be either ${list.slice(0,-1).join(', ')} or ${list[list.length-1]}`,
        notMessage: `must be neither ${list.slice(0,-1).join(', ')} or ${list[list.length-1]}`
    }
}