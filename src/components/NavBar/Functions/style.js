import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({

    userControlsContainers:{
        display:'grid',
        paddingRight:'10%',
        marginUp:'10%',
        paddingLeft:"0%",
        gridTemplateColumns:'auto auto auto auto auto',
        width: '60%',
        
    },
    Button:{
        color:"white",
        fontWeight:'bold'
    }
})