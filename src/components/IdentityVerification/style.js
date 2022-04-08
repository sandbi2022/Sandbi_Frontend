import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const useStyles = createUseStyles({

    formGroup: {
        width: '100%',
        height: 'auto'
    },
    inputWrapper: {
        marginBottom: '10px',
        display: 'grid',
        gridTemplateRows: 'min-content 20px'
    },
    
    input: {
        width: '60%',
        outline: 'none',
        fontSize: '15px',
        padding: '5px',
        background: '#141126',
        letterSpacing: '1px',
        border: '2px solid grey',
        borderRadius: '5px',
        marginLeft:'30px',
        color:'white'
        
    },
    textToLeft: {
        textAlign: "left",
        marginLeft:'30px',
        color:'white',
        fontSize:'20px'
    },
    textToGender: {
        textAlign: "left",
        marginLeft:'10px',
        color:'white',
        fontSize:'15px'
    },
    sidebar:{
        gridArea: "sidebar",
    },
    mainContainer: {
        marginLeft: "15vw",
        marginRight:'20vw',
        backgroundColor:'#141126',
        height:'800px'
    },
    inputContainers:{
        display:'grid',
        marginLeft:'20px',
        marginBottom: '20px',
        gridTemplateColumns:'auto auto auto',
        width: '80%',
        
    },
    TitleContainer:{
        color:'white',
        fontSize:'20px',
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:'5px',
        padding:'10px 0px 0px 0px',
        margin:'0px 0px 10px 0px'
    },
    buttonSetting:{
        backgroundColor:'#154B67',
        fontWeight:'bold',
        color:'white',
        borderRadius:'5px',
        right:'0px'
    }
})