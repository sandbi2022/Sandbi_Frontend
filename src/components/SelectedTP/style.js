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
        gridTemplateColumns:'30% 40% 30%',
        width: '100%',
        
    },
    leftSideCoinContainer:{
        display:'grid',
        marginLeft:'10px',
        gridTemplateColumns:'20% 25% 25% auto',
        width: '100%',
        
    },
    CoinSetting:{
        color:'white',
        backgroundColor:'#04011A',
        border: "solid",
        borderColor:'white',
        borderRadius:'5px',
        borderWidth:'2px',
        fontSize:'14px',
        padding:'0px 5px 0px 5px',
        margin:'0px 5px 0px 5px'

    },
    columPartContainers:{
        border: "solid",
        borderWidth: "0px 3px 0px 3px",
        borderColor:"#242044",
        height:'700px'
    },
    smallText:{
        color:'white',
        fontSize:'14px',
        textAlign:'left',
        marginLeft:'5%'
    },
    smallTextRed:{
        color:'red',
        fontSize:'14px',
        textAlign:'left',
        marginLeft:'8%'
    },
    smallTextGreen:{
        color:'green',
        fontSize:'14px',
        textAlign:'left',
        marginLeft:'8%'
    },
    smallText2:{
        color:'grey',
        textAlign:'left',
        marginLeft:'5%'
    },
    ExchangeContainer:{
        display:'grid',
        gridTemplateColumns:'auto 5% auto',
        width: '100%',
        backgroundColor:'#141126',
        padding:'9px 0px 9px 0px'
    },
    orderHistoryContainer:{
        display:'grid',
        gridTemplateColumns:'20% 20% 20% 20% 20%',
        width: '100%',
    },
    openOrderContainer:{
        display:'grid',
        gridTemplateColumns:'17% 17% 17% 17% 17% 15%',
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
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
        marginLeft:'50%'
      },
    Left:{
        paddingLeft:'5%'
    },
    Right:{
        paddingRight:'5%'
    },
    ChartTitleContainer:{
        display:'grid',
        marginLeft:'10px',
        gridTemplateColumns:'auto auto auto',
        width: '50%',
        
    },
    ChartTitleInfoContainer:{
        display:'grid',
        marginLeft:'0px',
        gridTemplateColumns:'auto auto auto',
        width: '100%',
        
    },

})