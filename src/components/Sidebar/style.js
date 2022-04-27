import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const useStyles = createUseStyles({
    sideBarContainer: {
        borderStyle: "solid",
        borderWidth: "0px 1px 0px 0px",
        height: "100%",
        width: "13vw",
        // marginTop: "50px",
        position: "fixed",
        overflowY: "auto",
        backgroundColor:'#141126'
    },
    textStyle:{
        fontWeight:'bold',
        padding:'10px',
        textAlign:'left',
        left:'20px',
        color:'white',
        fontSize:'20px'
    }

})