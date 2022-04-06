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
        height: '100%',
        marginLeft: '10%',
        marginRight: '35%',
        ...flexCenter
    },
})