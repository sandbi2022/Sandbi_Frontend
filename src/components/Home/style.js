import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const useStyles = createUseStyles({
    TitleForm: {
        width: '900px',
        height: '400px',
        borderRadius: '14px',
        ...flexCenter,
        flexDirection: 'column',
        background: '#141126'
    },
    titleWrapper: {
        width: '100%',
        marginBottom: '25px'
    },
    title: {
        color: 'black',
        fontWeight: '600',
        fontSize: '30px',
        color:'#FFFFFF'
    },
    coinContainers:{
        display:'grid',
        gridTemplateColumns:'auto auto auto auto',
        width: '100%',
        
    },

})