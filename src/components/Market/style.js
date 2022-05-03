import { Container } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({

    coinContainers:{
        display:'grid',
        gridTemplateColumns:'auto auto auto auto',
        width: '100%',
        
    },
    mainContainer:{
        backgroundColor:'#141126',
        width:'100%',
        height:'1200px',
        marginTop:'20px'
    },


    infoContainers:{
        marginBottom: '10px',
        display:'grid',
        //marginLeft:'20px',
        gridTemplateColumns:'15% 13.5% 13.5% 14% 14% 15% 15%',
        width: '95%',
        
    },
    infoTitleSetting:{
        color:'#757575',
        textAlign:'Left',
        marginLeft:'10%',
    },
    TitleSetting:{
        color:'white',
        textAlign:'Left',
        marginLeft:'5%',
        fontSize:'20px',
        fontWeight:'bold'
    },
    infoTextSetting:{
        color:'white',
        fontSize:'14px',
        textAlign:'Left',
        marginLeft:'10%',
    }

})