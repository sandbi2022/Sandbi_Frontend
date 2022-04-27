import { createUseStyles } from 'react-jss'

const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

export const useStyles = createUseStyles({
    loginContainer: {
        width: '100%',
        height: '100%',
        ...flexCenter
    },
    titleWrapper: {
        width: '100%',
        marginBottom: '25px'
    },
    title: {
        color: 'black',
        fontWeight: '600',
        fontSize: '30px'
    },
    logo: {
        width: '100%',
        minWidth: '771px',
        minHeight: '220px'
    },
    loginWrapper: {
        width: '100%'
    },
    loginForm: {
        width: '100%',
        height: '100%',
        padding: '30px',
        borderRadius: '14px',
        ...flexCenter,
        flexDirection: 'column',
        background: '#ffffff',
        marginTop: "50px",
        overflowY: "auto"
    },
    formGroup: {
        width: '100%',
        height: 'auto'
    },
    inputWrapper: {
        marginBottom: '10px',
        display: 'grid',
        gridTemplateRows: 'min-content 20px'
    },
    input: {
        width: '100%',
        outline: 'none',
        fontSize: '19px',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        letterSpacing: '1px',
        border: '2px solid rgba(69, 102, 191, 0.5)',
        borderRadius: '11px',
        borderWidth: "0px 0px 1px 0px",
    },
    loginOptions: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    forgotPassword: {
        color: 'gray',
        margin: '14px 0',
        textAlign: 'right',
        display: 'block',
        fontSize: '14px',
        lineHeight: '1'
    },
    checkboxContainer: {
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        '& input': {
            marginRight: '5px'
        },
        '& span': {
            paddingTop: '2px'
        }
    },
    buttonContainer: {
        width: '100%',
        height: 'auto',
        padding: '20px 0',
        ...flexCenter
    },
    button: {
        border: 'none',
        outline: 'none',
        borderRadius: '5px',
        width: '100%',
        padding: '15px 0',
        color: '#fff',
        fontSize: '16px',
        letterSpacing: '1px',
        justifyContent: 'center',
        background: '#4566bf',
        display: 'flex',
        cursor: 'pointer'
    },
    link: {
        textDecoration: 'none'
    },
    registerLink: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: '14px'
    },
    divider: {
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(69, 102, 191, 0.44)',
        margin: '25px 0'
    },
    //errors
    inputError: {
        extend: 'input',
        border: '2px solid red',
        borderWidth: "0px 0px 1px 0px",
    },
    formError: {
        fontSize: '13px',
        fontWeight: '600',
        color: 'var(--danger)',
        margin: '0',
        paddingLeft: '10px',
        paddingTop: '3px'
    },
    textToLeft: {
        textAlign: "left"
    },
    errorMsg: {
        margin: '0 15px',
        fontSize: '12px',
        color: 'red',
        textAlign: 'left'
    },
    image_setting:{
        width:"40px"
    },
    verifybutton:{
        height:"35px",
        width:'30%',
        background: '#4566bf',
        color: '#fff',
    }

})
