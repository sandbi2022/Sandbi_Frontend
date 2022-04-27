export default function validatePassword(values) {
    //This function checks if the front end information
    
    let errors = {}
    //email regex
    if(!values.OldPassword){
        errors.PasswordError = "Please Enter a Password"
    }else if(values.OldPassword.length < 6){
        errors.PasswordError = "Please Enter an 6 character password"
    }

    if(!values.NewPassword){
        errors.PasswordError = "Please Enter a Password"
    }else if(values.NewPassword.length < 6){
        errors.PasswordError = "Please Enter an 6 character password"
    }

    if(!values.ConfirmPassword){
        errors.ConfirmPasswordError = "Please Enter a Confirmed Password"
    }else if(!(values.NewPassword === values.ConfirmPassword)){
        errors.ConfirmPasswordError = "Password and Confirm Password must be the same"
    }
    

    return errors

}