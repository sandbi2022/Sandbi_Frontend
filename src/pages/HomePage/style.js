import { createUseStyles } from 'react-jss'
import Background from '../../images/background.png'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
//import bg from "/opt/front/react-app-master/src/images/bg.jpeg"

export const useStyles = createUseStyles({
    pageContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#04011A',
        overflow:'auto'
        
    },
    loginContainer: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop:'-400px',
        marginLeft:'-450px',
        
    },
})