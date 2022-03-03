import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    
    userControlsContainers:{
        display:'grid',
        gridTemplateColumns:'50% 50%',
        width: '90%',
        paddingLeft: '40%'
    },
    signUpButtonContainter:{
        height:'100%'
    },
    signUpBtn:{
        width: '100%',
        backgroundColor: '#398FBB',
        color: 'white',
        fontSize: '13px',
        paddingLeft: '4px',
        paddingRight: '4px',
        borderRadius:'13px',
        border: 'none',
        cursor: 'pointer',
        fontWeight:'bold'
    },
    LoginBtn:{
        cursor: 'pointer',
        color: 'white',
        fontSize:"13px",
        fontWeight:'bold'
    }

})