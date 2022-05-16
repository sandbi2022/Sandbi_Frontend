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
    
    sidebar:{
        gridArea: "sidebar",
    },
    totalContainer:{
        marginLeft: "15vw",
        marginRight:'20vw',
        display:'grid',
        gridTemplateColumns:'auto auto',
    },
    mainContainer: {
        marginLeft: "15vw",
        backgroundColor:'#141126',
        height:'700px',
        display:'grid',
        gridTemplateColumns:'auto auto',

    },
    UserInfoContainer:{
        marginLeft: "15vw",
        backgroundColor:'#141126',
        height:'80px',
        marginBottom:'20px',
        display:'grid',
        gridTemplateColumns:'40% 60%',
        textAlign:'left',
        
    },
    SwitchButtonContainer:{
        marginLeft: "15vw",
        width:'30%',
        display:'grid',
        gridTemplateColumns:'auto auto',
    },
    TitleBalanceContainers:{
        display:'grid',
        gridTemplateColumns:'auto auto auto auto',
        width: '60%',
        
    },
    TitleContainer:{
        color:'white',
        fontSize:'20px',
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:'5%',
        padding:'10px 0px 0px 0px',
        margin:'0px 0px 10px 0px'
    },
    SubTitleContainer:{
        color:'white',
        fontSize:'10px',
        textAlign:'left',
        marginLeft:'20px',
        padding:'10px 0px 0px 0px',
        margin:'0px 0px 5px 0px'
    },
    AmountContainer:{
        color:'white',
        fontSize:'40px',
        textAlign:'left',
        marginLeft:'20px',
    },
    textSetting:{
        color:'white',
        fontSize:'14px',
        marginLeft:'30px',
        marginTop:'15px',
        textAlign:'left',
    },
    textSetting2:{
        color:'grey',
        fontSize:'14px',
        marginTop:'15px',
        textAlign:'right',
    },
    infoContainer:{
        width:'80%',
        display:'grid',
        gridTemplateColumns:'auto auto',
    },
    image_setting:{
        width:"100px",
        backgroundColor:'white',
        textAlign:'left',
        marginLeft:'-100px'
    },
    inputWrapper: {
        display: 'grid',
        gridTemplateRows: 'min-content 20px'
    },
    input: {
        color:'white',
        width: '80%',
        outline: 'none',
        fontSize: '14px',
        padding: '10px',
        marginLeft:'30px',
        background: '#141126',
        letterSpacing: '1px',
        border: '2px solid #707070',
        borderRadius: '11px'
    },
    inputSetting2:{
        color:'white',
        backgroundColor:'#04011A',
        borderColor:'grey',
        textAlign:'left',
        marginLeft:'30px',
        padding:'0px 20px 0px 20px'
    },
    
})