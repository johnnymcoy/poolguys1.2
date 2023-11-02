import { useState } from "react";

// Input Verification

//! Example
// const { 
//     value: enteredEmail, 
//     isValid: emailIsValid,
//     hasError: emailInputHasError, 
//     resetValue: emailResetValue,
//     valueChangedHandler: emailChangedHandler, 
//     valueBlurHandler: emailBlurHandler
// } = useInput(value => value.trim() !== "" && value.includes("@") && value.includes("."));



function useInput(validateValue : (arg0: string) => boolean){
    const [ enteredValue, setEnteredValue] = useState("");
    const [ isTouched, setIsTouched] = useState(false);

    const valueIsValid : boolean = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    function valueChangedHandler(event : any)
    {
        setEnteredValue(event.target.value);
    }
    function valueBlurHandler()
    {
        setIsTouched(true);
    }

    function resetValue()
    {
        setEnteredValue("");
        setIsTouched(false);
    }


return{
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangedHandler: valueChangedHandler,
    valueBlurHandler: valueBlurHandler,
    resetValue: resetValue,
};}

export default useInput;