import { Container } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    columContainers:{
        display:'grid',
        gridTemplateColumns:'18% 50% 16% 16%',
        width: '100%',
        
    },
    UpContainers:{
        height:'700px',
        border: "solid",
        borderWidth: "0px 0px 6px 0px",
        borderColor:"#242044",
    },
    leftSideContainer:{
        display:'grid',
        marginLeft:'10px',
        gridTemplateColumns:'auto auto auto',
        width: '100%',
        
    },
    columPartContainers:{
        border: "solid",
        borderWidth: "0px 3px 0px 3px",
        borderColor:"#242044",
        height:'700px'
    },
    smallText:{
        color:'white'
    },
    smallTextRed:{
        color:'red'
    },
    smallTextGreen:{
        color:'green'
    },
    smallText2:{
        color:'grey'
    },
    ExchangeContainer:{
        display:'grid',
        gridTemplateColumns:'auto auto',
        width: '100%',
    },
    orderHistoryContainer:{
        display:'grid',
        gridTemplateColumns:'auto auto auto auto auto auto auto auto auto',
        width: '100%',
    },
    buttonContainer:{
        textAlign:'left'
    },
    TitleText:{
        color:'white',
        fontsize:'20px',
        textAlign:'left'
    },
    inputSetting:{
        background: '#04011A',
        width:'100%',
        color:'white',
        margin:'5px',
        border: "solid",
        borderWidth: "1px",
        borderColor:"grey",

    },
    buttonSettingGreen:{
        background:'green',
        color:'white',
        width:'100%',
        margin:'5px',
        
    },
    buttonSettingRed:{
        background:'red',
        color:'white',
        width:'100%',
        margin:'5px',
    },
    totLeft:{
        color:'grey',
        textAlign:'left'
    },
    

})