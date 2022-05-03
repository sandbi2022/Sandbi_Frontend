import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }


export const useStyles = createUseStyles({
    // bg:{
    //     background: URL('/opt/front/react-app-master/src/images/bg.jpeg')
    // },
    TitleForm: {
        width: '900px',
        height: '400px',
        borderRadius: '14px',
        ...flexCenter,
        flexDirection: 'column',
       
        //background: '#141126',
        background: 'rgb(20, 17, 38)',
        //opacity:0.2
        //background:transparent
        //background: url('/opt/front/react-app-master/src/images/bg.jpeg')
    },
    titleWrapper: {
        width: '100%',
        marginBottom: '25px'
    },
    title: {
        color: 'black',
        fontWeight: '600',
        fontSize: '30px',
        color:'#FFFFFF'
    },
    little:{
        color: 'black',
        fontWeight: '300',
        fontSize: '15px',
        color:'#FFFFFF'

    },
    coinContainers:{
        display:'grid',
        gridTemplateColumns:'auto auto auto auto',
        width: '100%',
        background:'rgb(255,255,255)'
    },
    // .bgimg{
    //     background-image:('/opt/front/react-app-master/src/images/bg.jpeg"');
    // }

})