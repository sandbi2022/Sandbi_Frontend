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
        
        backgroundColor:'#141126',
        height:'600px'
    },
    UserInfoContainer:{

        backgroundColor:'#141126',
        height:'80px',
        marginBottom:'20px',
        display:'grid',
        gridTemplateColumns:'auto auto 30%',
        textAlign:'left',
        paddingLeft:'30px',
    },
    AnnouncementContainer:{
        backgroundColor:'#141126',
        height:'700px',
        marginLeft:'20px'
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
        marginLeft:'5px',
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
    
})