import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    userControlsContainers:{
        display:'grid',
        
        gridTemplateColumns:'auto auto auto auto auto',
        width: '100%',
        paddingRight:'40%'
    },
    Button:{
        color:"white"
    }
})