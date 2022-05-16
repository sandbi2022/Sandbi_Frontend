import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

export const useStyles = createUseStyles({
    TitleSetting:{
        color:'white',
        fontSize:'30px',
        margin:'20px',
        fontWeight:'bold'
    },
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'#04011A',
    },
    SelectButtonSetting:{
        color:'white',
        backgroundColor:'#4ABCBB',
        fontWeight:'bold',
        borderRadius:'10px',
        padding:'0px 30px 0px 30px',
    },
    SelectButtonSetting2:{
        color:'white',
        backgroundColor:'#4ABCBB',
        borderRadius:'10px',
        padding:'0px 10px 0px 10px',
    },
    UnselectButtonSetting:{
        color:'#727272',
        backgroundColor:'141126',
        borderColor:'#727272',
        fontWeight:'bold',
        borderWidth:'2px',
        borderRadius:'10px',
        padding:'0px 30px 0px 30px'
    },
    bottonSetting:{
        color:'white',
        backgroundColor:'#141126',
        margin:'0px 30px 0px 30px',
        display:'inline-block',
        
    },
    buttonContainer:{
        textAlign:'left',
        margin:'20px 20px 10px 20px'
    },
    searchContainers:{
        display:'grid',
        gridTemplateColumns:'30% 30% 40%',
        width: '100%',
        
    },
    subTitleSetting:{
        color:'white',
        fontWeight:'bold',
        fontsize:'20px'
    },
    subTitleSetting2:{
        color:'white',
        textAlign:'left',
        marginLeft:'60px',
        fontWeight:'bold',
        fontsize:'20px'
    },
    subTitleContainer:{
        textAlign:'left',
        marginLeft:'15%',
        marginBottom:'5%'
    },
    subTitleContainer2:{
        textAlign:'Right',
        marginRight:'100px'
        
    },
    subsearchContainers:{
        display:'grid',
        gridTemplateColumns:'70% 30%',
        width: '110%',
        
    },
    inputSetting:{
        color:'white',
        backgroundColor:'#04011A',
        borderColor:'grey',
        borderRadius:'10px 0px 0px 10px'
    },
    searchbuttonSetting:{
        color:'#4ABCBB',
        backgroundColor:'#04011A',
        borderColor:'grey',
        borderRadius:'0px 10px 10px 0px',
        fontSize:'10px'
    },
    inputSetting2:{
        color:'white',
        backgroundColor:'#04011A',
        borderColor:'grey',
        borderRadius:'10px',
        padding:'0px 20px 0px 20px'
    },
    infoContainers:{
        display:'grid',
        gridTemplateColumns:'15% 15% 15% 20% 15% 15%',
        width: '100%',
        margin:'0px 0px 15px 0px'
        
    },
    infoTextSetting:{
        color:'white',
        textAlign:'left',
        marginLeft:'60px',
    }
})