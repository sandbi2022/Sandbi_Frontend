import { createUseStyles } from 'react-jss'
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }


export const useStyles = createUseStyles({
    
    // TitleForm: {
    //     width: '900px',
    //     height: '400px',
    //     borderRadius: '14px',
    //     ...flexCenter,
    //     flexDirection: 'column',
       
    //     //background: '#141126',
    //     background: 'rgba(20, 17, 38,0.7)',
    //     //opacity:0.2
    //     //background:transparent
    //     //background: url('/opt/front/react-app-master/src/images/bg.jpeg')
    // },
    // titleWrapper: {
    //     width: '100%',
    //     marginBottom: '25px'
    // },
    // title: {
    //     color: 'black',
    //     fontWeight: '600',
    //     fontSize: '30px',
    //     color:'#FFFFFF'
    // },
    // little:{
    //     color: 'black',
    //     fontWeight: '300',
    //     fontSize: '15px',
    //     color:'#FFFFFF'

    // },
    coinContainers:{
        display:'grid',
        gridTemplateColumns:'25% 25% 25% 25%',
        width: '100%',
        background:'rgba(255,255,255,0.0)'
    },
    // .bgimg{
    //     background-image:('/opt/front/react-app-master/src/images/bg.jpeg"');
    // }

})