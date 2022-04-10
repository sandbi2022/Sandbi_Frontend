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
        width:'900px',
        top: '5%',
        left: '50%',
        marginTop:'0px',
        marginLeft:'-450px',
    },
})