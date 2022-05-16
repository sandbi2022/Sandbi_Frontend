
import { Container } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    columPartContainers:{
    border: "solid",
    borderWidth: "0px 3px 0px 3px",
    borderColor:"#242044",
    height:'700px',
    
},
TitleText:{
    color:'white',
    fontsize:'20px',
    textAlign:'left'
},
leftSideContainer:{
    display:'grid',
    marginLeft:'10px',
    gridTemplateColumns:'30% 40% 30%',
    width: '100%',
    
},
leftSideContainer1:{
    display:'grid',
    marginLeft:'10px',
    gridTemplateColumns:'30% 40% 30%',
    width: '100%',
    textAlign:'bottom',
    justifyContent:"flex-end",
    height:'8%',
    
},
smallText:{
    color:'white',
    fontSize:'14px',
    textAlign:'left',
    marginLeft:'10%',
     justifyContent:"flex-end"
},
smallText2:{
    color:'grey',
    textAlign:'left',
    marginLeft:'5%',
     justifyContent:"flex-end"
},
smallTextRed:{
    color:'red',
    fontSize:'14px',
    textAlign:'left',
    marginLeft:'8%',
    justifyContent:"flex-end"
},
smallTextGreen:{
    color:'green',
    fontSize:'14px',
    textAlign:'left',
    marginLeft:'8%',
    justifyContent:"flex-end"
},
})