export type AoviTestObject = Record<string, any>
export type ValidatorCreator = (...params:any) => Validator
export type TestFunction = (value:any) => Boolean | Promise<Boolean>

export interface ValidationError {
    /** Property name or label */
    name:string,
    /** Validation error message */
    error: string
}

export interface Validator {
    /** Name of the validator method */
    name: string,
    /** Function which gets value for testing, 
     * must return true or false 
     * */
    test: (value:any)=>boolean,
    /** Message, when test returns false */
    message: string,
    /** Message, when used .not and test returns true */
    notMessage?: string
}

export interface Aovi {
    /** Add custom validator to the aovi object.  
     * @param custom_validator Your custom validator function. 
     * @see https://www.npmjs.com/package/aovi#custom-validators
    */
    use: (custom_validator: ValidatorCreator) => Aovi

    /** Set which property will be validate by next functions. 
     * @param prop Property name from testing object
     * @param label Name for the property which will be shown in default error messages 
     * */
    check: (prop:string,label?:string) => Aovi

    /** Invert result of the next validator. 
     * Can be used before type,match,is,oneof and length validators.  
     * */
    not: Aovi,

    /** Check if the property is defined in object and its value is not equal empty string. 
     * @param message Custom message when test fails
    */
    required: (message?:string) => Aovi

    /** Check if the property's value is of specified type, like 'string','number' etc. 
     * @param type Needed type of the value
     * @param message Custom message when test fails
    */
    type: (type:string,message?:string) => Aovi

    /** Check if the property's value is match regular expression. 
     * @param regex Regular expression to test value
     * @param message Custom message when test fails
    */
    match: (regex:RegExp,message?:string) => Aovi

    /** Pass if the function returns true. This function accept one parameter which is a value of the current property.
     * If function is asynchronous, you must call result
     * functions (.text(), .json(), .array() and .valid) asynchronously too.
     * @param func Function to test the value. Must return true or false.
     * @param message Custom message when test fails
    */
    is: (func:TestFunction,message?:string) => Aovi

    /** Check if the property's value is in the array of variants. 
     * @param variants Array of possible variants
     * @param message Custom message when test fails
    */
     oneof: (variants:[any],message?:string) => Aovi

    /** Check if the property's value length is exact needed length.
     * @param length Needed length
     * @param message Custom message when test fails
    */
     length: (length:number,message?:string) => Aovi

    /** Check if the property's value length is greater than or equal provided number.
     * @param length Minimum length
     * @param message Custom message when test fails
    */
     minLength: (length:number,message?:string) => Aovi

    /** Check if the property's value length is less than or equal provided number.
     * @param length Maximum length
     * @param message Custom message when test fails
    */
     maxLength: (length:number,message?:string) => Aovi

    /** Check if the property's valueis greater than or equal minimum value.
     * @param value Minimum value
     * @param message Custom message when test fails
    */
     min: (value:number,message?:string) => Aovi

    /** Check if the property's value is less than or equal maximum value.
     * @param value Maximum value
     * @param message Custom message when test fails
    */
    max: (value:number,message?:string) => Aovi

    /** Is true when no errors where occured during validation chain. 
     * Will be false in other case. 
     * */
    valid: Boolean | Promise<Boolean>

    /** Return errors as string. 
     * Will return '' if no errors. 
     * */
    text: string | Promise<string>

    /** Return errors as a JSON-string. 
     * Will return '[]' if no errors.
     * */
    json: string | Promise<string>

    /** Return errors as array. 
     * Will return [] if no errors.
     * */
    array: [ValidationError] | Promise<[ValidationError]>
}

/** Run validation of the test object
 * @param object Object which properties will be validated
*/
export function aovi(object: AoviTestObject): Aovi