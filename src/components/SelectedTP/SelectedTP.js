import { useRef, useState, useEffect, useContext } from 'react';
import MarketAPI from '../../api/market-api';
import InfoAPI from '../../api/Info-api';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from "./style";



const SelectedTP= param =>{
    const classes = useStyles()
    const user = useSelector((state) => state.user.value)
    const Tradepair=param.TradePair
    const change = param.Refresh
    const coin1=param.Coin1
    const coin2=param.Coin2
    const [PairInfo, setInfo] = useState({})
   
    const [Tpinfo,setTPINFO]=useState({close:0,high:0,low:0})
    

    useEffect(() => {
        InfoAPI.getTradePairs().then((response) => {
            var newlist = {}
            for (let [key, value] of Object.entries(response.data)) {
                var data = JSON.parse(value)
                newlist[key] = data
            }
            setInfo(newlist)
        })
    }, [])

    useEffect(() => {
        MarketAPI.getGraphData({"TradePair":Tradepair,"Period":"1","Second":86400}).then((response) => {
             console.log(response.data)
            var newlist = {}
            for (let key of Object.keys(response.data)) {
                if(key!=="time"){
                 var data= JSON.parse(response.data[key])
                 console.log(data)
                 newlist=data
               
               }
         }
            setTPINFO(newlist)
        })

    }, [PairInfo,change,Tradepair])

   

    const perenatage = (close, open) => {
        //  console.log(number)
        if ((open == 0)|(open-close)==0) { return 0 + "%" }
        if (open - close > 0) {
            return "+" + ((open - close) / open).toFixed(2) + "%"
        }
        else {
            return "-" + ((open - close) / open).toFixed(2) + "%"
        }
    }

    

    const getColor=(change)=>{
        if(change===1){
            return "red";
        } else if(change === -1){
            return "green";
        } else {
            return "#DBDBDB";
        }
    }
    
    const getSign=(close, open)=>{
        if(open == 0|| close==0 ){return 0;}
        else{
            return Math.sign(close-open)
        }
    }




   


    return(
        <div className={classes.ChartTitleContainer}>
        <div>
            <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>
                {coin1}/{coin2}
            </div>
            <div className={classes.ChartTitleInfoContainer}>
                <div style={{ color: 'green', fontSize: '10px' }}>={Tpinfo.close}</div>
                <div style={{ color: 'grey', fontSize: '10px' }}>{coin2}</div>
                <div style={{ color: getColor(getSign(Tpinfo.close,Tpinfo.open)), fontSize: '10px' }}>{perenatage(Tpinfo.close, Tpinfo.open)}</div>
            </div>
        </div>
        <div>
            <div style={{ color: '#546071', fontSize: '14px' }}>
                24H High
            </div>
            <div style={{ color: '#BFBFBF', fontSize: '14px' }}>
                {Tpinfo.high}
            </div>
        </div>
        <div>
            <div style={{ color: '#546071', fontSize: '14px' }}>
                24H Low
            </div>
            <div style={{ color: '#BFBFBF', fontSize: '14px' }}>
                {Tpinfo.low}
            </div>
        </div>

    </div>
    )
}
export default SelectedTP