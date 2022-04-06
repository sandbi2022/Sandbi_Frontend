import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const useStyles = createUseStyles({
    barContainer: {
        display: "grid",
        gridTemplateColumns: "10% 70% 20%",
        gridTemplateRows: "40px",
        backgroundColor: "#04011A",
        border: "solid",
        borderWidth: "0px 0px 6px 0px",
        borderColor:"#242044",
        width: "100vw",
        position: 'sticky',
        top:"0",
        zIndex: "999"
    },

    icon:{
        
        height:"40px",
        ...flexCenter
    },

    selection:{
        height:"35px",
    },

    buttons:{
        height:"35px",
        ...flexCenter
    }

})