import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

export const useStyles = createUseStyles({
    Tittle:{
        color:'white',
        fontSize:'30px',
        textAlign:'left'
    },
    Amount:{
        color:'white',
        fontSize:'40px',
        fontWeight:'bold',
        textAlign:'left'
    },
    line:{
        color:'#707070',
        fontSize:'10px',
        fontWeight:'bold',
        textAlign:'left'
    },
    columContainers:{
        display:'grid',
        marginLeft:'30px',
        gridTemplateColumns:'10% auto 30%',
        width: '100%',
        
    },
    inputWrapper: {
        display: 'grid',
        gridTemplateRows: 'min-content 20px'
    },
    input: {
        width: '50%',
        height:'60%',
        outline: 'none',
        fontSize: '19px',
        padding: '10px',
        background: '#04011A',
        letterSpacing: '1px',
        border: '2px solid rgba(69, 102, 191, 0.5)',
        borderRadius: '11px'
    },
    buttonContainer: {
        width: '100%',
        height: 'auto',
        padding: '20px 0',
        ...flexCenter
    },
    infoContainers:{
        display:'grid',
        marginLeft:'0px',
        gridTemplateColumns:'auto auto auto auto',
        width: '90%',
        
    },
    infoText:{
        color:'white',
        fontSize:'15px',
        textAlign:'left'
    },
    button: {
        border: 'none',
        outline: 'none',
        borderRadius: '5px',
        width: '100%',
        color: '#fff',
        fontSize: '20px',
        letterSpacing: '1px',
        justifyContent: 'center',
        background: '#4566bf',
        display: 'flex',
        cursor: 'pointer'
    },
    sidebar:{
        gridArea: "sidebar",
    },
    mainContainer: {
        marginLeft: "15vw",
    }
    
})