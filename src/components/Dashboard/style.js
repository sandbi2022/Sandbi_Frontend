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
        marginRight:'10vw',
        display:'grid',
        gridTemplateColumns:'65% 35%',
    },
    mainContainer: {
        
        backgroundColor:'#141126',
        height:'600px'
    },
    UserInfoContainer:{

        backgroundColor:'#141126',
        height:'80px',
        marginBottom:'20px',
        display:'grid',
        gridTemplateColumns:'40% 60%',
        textAlign:'left',
        
    },
    AnnouncementContainer:{
        backgroundColor:'#141126',
        height:'700px',
        marginLeft:'10px'
    },
    TitleBalanceContainers:{
        display:'grid',
        gridTemplateColumns:'auto auto auto auto auto',
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
        fontSize:'12px',
        textAlign:'left',
        marginLeft:'20px',
        padding:'10px 0px 0px 0px',
        margin:'0px 0px 5px 0px',
        fontWeight:'300'
    },
    SubTitleContainer2:{
        color:'white',
        fontSize:'12px',
        textAlign:'left',
        marginLeft:'20px',
        padding:'10px 0px 0px 0px',
        margin:'0px 0px 5px 0px',
        fontWeight:'bold'
    },
    manage:{
        backgroundColor: '#4CAF50',
        
        color: 'white',
        
        
        
    },
    AmountContainer:{
        color:'white',
        fontSize:'40px',
        textAlign:'left',
        marginLeft:'20px',
    },
    PriceContainer:{
        color:'white',
        fontSize:'20px',
        textAlign:'left',
        marginLeft:'20px',
    },
    buttonSetting:{
        backgroundColor:'#154B67',
        fontWeight:'bold',
        color:'white',
        borderRadius:'5px',
        right:'0px'
    },
    
    infoContainer:{
        display:'grid',
        marginLeft:'60px 20px 60px 20px',
        gridTemplateColumns:'50% 50%',
        width: '100%',
    },
    buttonGreen:{
        backgroundColor:'green',
        padding:'2px 50px 2px 50px',
        color:'white',
        fontWeight:'bold'
    },
    buttonRed:{
        backgroundColor:'red',
        padding:'2px 50px 2px 50px',
        color:'white',
        fontWeight:'bold'
    },
    inputSetting2:{
        color:'white',
        width:'70%',
        backgroundColor:'#04011A',
        borderColor:'grey',
        textAlign:'left',
        marginLeft:'10%',
        padding:'0px 20px 0px 20px'
    },
    inputSetting:{
        color:'white',
        backgroundColor:'#04011A',
        borderColor:'grey',
        textAlign:'left',
        marginLeft:'10%',
        borderRadius:'10px'
    },
    
})