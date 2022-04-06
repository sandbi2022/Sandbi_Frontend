import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const useStyles = createUseStyles({
    coinBarContainer:{
        background: '#141126',
        margin:'10px',
        borderRadius: '10px',
    },
    Title:{
        color:'white',
        fontSize:'20px',
        marginLeft:'-100px'
    },
    Price:{
        color:'white',
        fontSize:'20px',
        fontWeight: '600',
    },
    usdPrice:{
        color:'white',
        fontSize:'10px',
        fontWeight: '600',
    },
    change:{
        color:'green',
        fontSize:'5px',
        fontWeight: '200',
    },
    columContainers:{
        display:'grid',
        marginLeft:'30px',
        gridTemplateColumns:'auto auto',
        width: '40%',
        
    },
    
})