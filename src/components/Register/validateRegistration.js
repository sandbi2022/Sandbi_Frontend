export default function validateRegistration(values) {
    //This function checks if the front end information
    
    let errors = {}
    //email regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!values.Email){
        errors.EmailError = "Please Enter an Email Address"
    }else if (!emailRegex.test(values.Email)) {
        errors.EmailError = "Please Provide email in the format of 'sample@email.com"
    }

    if(!values.UserName){
        errors.UsernameError = "Please Enter an Username"
    }

    if(!values.Password){
        errors.PasswordError = "Please Enter a Password"
    }else if(values.Password.length < 6){
        errors.PasswordError = "Please Enter an 6 character password"
    }

    if(!values.confirmPassword){
        errors.ConfirmPasswordError = "Please Enter a Confirmed Password"
    }else if(!(values.Password === values.confirmPassword)){
        errors.ConfirmPasswordError = "Password and Confirm Password must be the same"
    }
    

    return errors

}