import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({

    userControlsContainers:{
        display:'grid',
        paddingRight:'40%',
        paddingLeft:"0%",
        gridTemplateColumns:'auto auto auto auto auto',
        width: '100%',
        
    },
    Button:{
        color:"white"
    }
})