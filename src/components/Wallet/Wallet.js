import { useRef, useState, useEffect, useContext } from 'react';
// import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import WalletAPI from '../../api/wallet_api';
import{useDispatch, useSelector} from 'react-redux';
const Wallet =()=>{

    //const classes = useStyles();
    const history = useHistory();
    const[total,settotal]= useState();
    const [formErrors, setFormErrors] = useState({})
    const [PBalance,setPBalance] = useState([])
    const user = useSelector((state)=>state.user.value)
    const [email,setEmail]= useState("");
    const [Assets, setAssets]= useState({});
    const [UID,setUID]= useState();
    const [BTC,setBTC]= useState();
    const [BCH,setBCH]= useState();
    const [ETH,setETH]= useState();

    useEffect(() => {
       WalletAPI.getPrice({"TradePair":"BTCUSDT"}).then((response)=>{
           console.log(response.data)
           setBTC(response.data["Price"])
       }
       ) 
       WalletAPI.getPrice({"TradePair":"BCHUSDT"}).then((response)=>{
        console.log(response.data)
        setBCH(response.data["Price"])
    }
    ) 
    WalletAPI.getPrice({"TradePair":"ETHUSDT"}).then((response)=>{
        console.log(response.data)
        setETH(response.data["Price"])
    }
    ) 
      }, []);

    useEffect(() => {
        const UID= user.UID;
        console.log(UID);
        WalletAPI.getBalance({UID}).then((response) => {
        const data = response.data;
        setPBalance([
            {
             name:"BTC",
             balance:data["BTC"],
             available:data["BTC"]-data["FreezeBTC"]
            },
            {
             name:"BCH",
             balance:data["BCH"],
             available:data["BCH"]-data["FreezeBCH"]
            },
            {
                name:"ETH",
                balance:data["ETH"],
                available:data["ETH"]-data["FreezeETH"]  
            },
            {
                name:"USDT",
                balance:data["USDT"],
                available:data["USDT"]-data["FreezeUSDT"]  
            }

        ]);
        });
        console.log(PBalance[0])
       // settotal(BTC*PBalance[0].balance+BCH*PBalance[1].balance+ETH*PBalance[2].balance+PBalance[3].balance)
      }, [BTC,ETH,BCH]);
   useEffect(()=>{
    console.log(PBalance[0])
   },[PBalance]

   )

    

    
    
return(
    <div>
    <div>Portfolio Balance</div>
    <h4 className="Balance" >{total}</h4>

    <div>Balance</div>
    <div> 
       <input type="text"></input>
      <button >Search </button>   
    </div> 


    {PBalance.map((item, index) => {
          return (
            <li key={index} className={item.name}>
                {item.name} 
                <span>  {item.balance}  </span>
                <span>  {item.available}</span>
                <button>Trade</button>
            </li>
          );
        })}


  </div>
)
}

export default Wallet