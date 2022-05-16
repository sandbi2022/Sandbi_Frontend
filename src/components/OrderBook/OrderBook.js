import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import WalletAPI from '../../api/wallet_api';
import MarketAPI from '../../api/market-api';
import InfoAPI from '../../api/Info-api';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from "./style";
import Chart from "../Chart/Kline";
import AssetTable from '../TradeData/Asset/AssetTable';
import { useLocation } from "react-router-dom";

const OrderBook= param =>{
    const classes = useStyles()
    const user = useSelector((state) => state.user.value)
    const [stotal, setstotal] = useState(0)
    const [btotal, setbtotal] = useState(0)
    const [UserBTC, setUBTC] = useState();
    const [USDC, setUUSDC] = useState();
    const [buyorder, setbuyorder] = useState([])
    const [sellorder, setsellorder] = useState([])
    const [market, setmarket] = useState([])
    const [sellprice, setsellPrice] = useState()
    const [sellamount, setsellamount] = useState()
    const [buyprice, setbuyPrice] = useState()
    const [buyamount, setbuyamount] = useState()
    const Tradepair=param.TradePair
    const change = param.Refresh
    const [coin1, setcoin1] = useState("BTC")
    const [coin2, setcoin2] = useState("USDC")
    const [openorder, setopenorder] = useState([])
    const [orderH, setorderH] = useState([])
    const [bottom, setbottom] = useState([])
    const [Switch, setswitch] = useState(0)
    const [PairInfo, setInfo] = useState({})
    const [active, setActive] = useState("openOrder")
    const [Time, setTime] = useState(1800)
    const [Sellactive,setSellactive]=useState("Limit")
    const [Buyactive,setBuyactive]=useState("Limit")
    const [Tpinfo,setTPINFO]=useState({close:0,high:0,low:0})
    const location = useLocation();

    useEffect(() => {
        const UID = user.UID;
        WalletAPI.getBalance({ UID }).then((response) => {
            const data = response.data;
            setUBTC(data[coin1] - data["Freeze" + coin1])
            setUUSDC(data[coin2] - data["Freeze" + coin2])
        });
    }, [change,Tradepair])

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

    }, [PairInfo])

    useEffect(() => {
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 1 }).then((response) => {
            // console.log(response.data)
            var newlist = []
            console.log(PairInfo)
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"].toFixed(PairInfo[Tradepair]["LimitPrice"]),
                    amount: (data["amount"] - data["doneAmount"]).toFixed(PairInfo[Tradepair]["LimitCount"]),
                    sum: 0
                })
                // console.log(newlist)
            }
            
           // newlist.sort(function (a, b) { return -a.price + b.price })
            fillsum(newlist)
            newlist = mergeArr(newlist)
            setbuyorder(newlist)

             
        })
    }, [PairInfo, Tradepair, change]);

    useEffect(() => {
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 0 }).then((response) => {
            // console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"].toFixed(PairInfo[Tradepair]["LimitPrice"]),
                    amount: (data["amount"] - data["doneAmount"]).toFixed(PairInfo[Tradepair]["LimitCount"]),
                    sum: 0
                })
                //console.log(newlist)
            }
            
            newlist.sort(function (a, b) { return -Number(a.price) + Number(b.price) })         
            fillbuysum(newlist)
            newlist = mergeArr(newlist)      
            setsellorder(newlist)

        })
    }, [PairInfo, Tradepair, change]);



    const fillsum = (list) => {
        var sum = 0;
        for (let i = list.length - 1; i >= 0; i--) {
            sum += Number(list[i]["amount"]);
            list[i]["sum"] = sum;

        }
    }

    const fillbuysum = (list) => {
        var sum = 0;
        for (let i = 0; i < list.length; i++) {
            sum += Number(list[i]["amount"]);
            list[i]["sum"] = sum;

        }
    }

    useEffect(() => {
        MarketAPI.getHistoryOrder({ "TradePair": Tradepair }).then((response) => {
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"].toFixed(PairInfo[Tradepair]["LimitPrice"]),
                    amount: data["amount"].toFixed(PairInfo[Tradepair]["LimitCount"]),
                    time: data["time"].slice(11,),
                    timestamp: new Date(Date.parse(data["time"])).getTime()
                })
            }
            newlist.sort(function (a, b) { return -a.timestamp + b.timestamp })
            setmarket(newlist)
        })
    }, [PairInfo, Tradepair, change]);


    useEffect(() => {
        MarketAPI.getuserOrder({ "TradePair": Tradepair, "UID": user.UID }).then((response) => {
            //  console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push(data)

            }
            //    console.log(newlist)
            setopenorder(newlist)
        })
    }, [Tradepair, change]);


    useEffect(() => {
        MarketAPI.getUserHistoryOrder({ "TradePair": Tradepair, "UID": user.UID }).then((response) => {
            console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push(data)

            }
            console.log(newlist)
            setorderH(newlist)
        })
    }, [Tradepair, change]);



    useEffect(() => {
        if (sellamount === undefined | sellamount === "" | sellprice === undefined | sellprice === "") {
            setstotal(0);
        }
        else {
            var total = parseFloat(sellamount) * parseFloat(sellprice)
            setstotal(total)
        }

    }, [sellamount, sellprice])


    useEffect(() => {
        if (buyamount === undefined | buyamount === "" | buyprice === undefined | buyprice === "") {
            setbtotal(0);
        }
        else {
            setbtotal(parseFloat(buyamount) * parseFloat(buyprice))
        }
    }, [buyamount, buyprice])



   
    useEffect(() => {
        if (Switch == 0) {
            setbottom(openorder)
        } else {
            setbottom(orderH)
        }

    }, [Switch, openorder, orderH])

    
    const perenatage=(close,open)=>{
      //  console.log(number)
        if(open==0){return 0+"%"}
        if (open-close>0){
         return "+"+((open-close)/open).toFixed(2)+"%"
        }
        else{
            return "-"+((open-close)/open).toFixed(2)+"%"
        }
    }

    function mergeArr(arr) {
        let arrWarp = []
        let result = []
        console.log("test");
        console.log(arr);
        for (let item of arr) {
            console.log(item);
            if (arrWarp.includes(item.price) == false) {
                let obj = {
                    price: item.price,
                    amount:(Number(item.amount)).toFixed(PairInfo[Tradepair]["LimitCount"]),
                    sum: (item.sum).toFixed(PairInfo[Tradepair]["LimitCount"])
                }
                result.push(obj)
                arrWarp.push(item.price)

            } else {
                let index = arrWarp.indexOf(item.price)
                result[index].amount=(Number(result[index].amount)+ Number(item.amount)).toFixed(PairInfo[Tradepair]["LimitCount"])
                result[index].sum =(Number(result[index].sum)+ Number(item.amount)).toFixed(PairInfo[Tradepair]["LimitCount"])
            }
        }
        console.log(result);
        return result
    }
    return(
        <div className={classes.columPartContainers}>
        <div className={classes.TitleText}>OrderBook</div>
        <div style={{ height: '45%',position:'relative',bottom:'0px' }}>
            <div style={{position:'absolute',
                bottom:'0px',width:'100%',display:'flex',flexDirection:'column-reverse'}}>
            {buyorder.map((item, index) => {
                return (
                   
                    <div className={classes.leftSideContainer1}>
                        <div className={classes.smallTextRed}>{item.price}</div>
                        <div className={classes.smallText}>{item.amount}</div>
                        <div className={classes.smallText}>{item.sum}</div>
                    </div>
                    
                );
            })}
            </div>
        </div>
        <div className={classes.leftSideContainer}>
            <div className={classes.smallText2}>Price</div>
            <div className={classes.smallText2}>Amount</div>
            <div className={classes.smallText2}>sum</div>
        </div>
        {sellorder.map((item, index) => {
            return (
                <div className={classes.leftSideContainer}>
                    <div className={classes.smallTextGreen}>{item.price}</div>
                    <div className={classes.smallText}>{item.amount}</div>
                    <div className={classes.smallText}>{item.sum}</div>
                </div>
            );
        })}
    </div>
    )
}
export default OrderBook