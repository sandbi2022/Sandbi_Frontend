import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const useStyles = createUseStyles({
    pageContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#04011A'
    },
    loginContainer: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop:'-400px',
        marginLeft:'-450px',
    },
})