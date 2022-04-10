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
        gridTemplateColumns:'auto auto auto auto auto auto auto',
        width: '95%',
        
    },
    infoTitleSetting:{
        color:'#757575'
    },
    TitleSetting:{
        color:'white',
        textAlign:'Left',
        marginLeft:'20px',
        fontSize:'20px',
        fontWeight:'bold'
    },
    infoTextSetting:{
        color:'white',
        fontSize:'14px',
        textAlign:'Left',
        marginLeft:'30px',
    }

})