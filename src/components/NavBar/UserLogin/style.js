import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    
    userControlsContainers:{
        display:'grid',
        gridTemplateColumns:'50% 50%',
        width: '80%',
        paddingLeft: '40%'
    },
    signUpButtonContainter:{
        height:'100%'
    },
    signUpBtn:{
        width: '100%',
        backgroundColor: '#555',
        color: 'black',
        fontSize: '17px',
        border: 'none',
        cursor: 'pointer',
    },
    LoginBtn:{
        cursor: 'pointer',
    }

})