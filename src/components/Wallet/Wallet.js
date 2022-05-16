import { useRef, useState, useEffect, useContext } from 'react';
// import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import WalletAPI from '../../api/wallet_api';
import SideBar from '../Sidebar/SideBar';
import{useDispatch, useSelector} from 'react-redux';
import { useStyles } from "./style";
const Wallet =()=>{

    //const classes = useStyles();
    const history = useHistory();
    const[total,settotal]= useState();
    const [formErrors, setFormErrors] = useState({})
    const [PBalance,setPBalance] = useState([])
    const user = useSelector((state)=>state.user.value)
    const [content,setcontent]= useState("");
    const [Assets, setAssets]= useState({});
    const [UID,setUID]= useState();
    const [BTC,setBTC]= useState();
    const [BCH,setBCH]= useState();
    const [ETH,setETH]= useState();
    const [render,setrender]=useState([])
    const classes = useStyles();
    useEffect(() => {
        WalletAPI.getPrice({"TradePair":"BTCUSDC"}).then((response)=>{
           console.log(response.data)
           setBTC(response.data["price"])

           
       }
       ) 
      }, []);


      useEffect(()=>{
         WalletAPI.getPrice({"TradePair":"BCHUSDC"}).then((response)=>{
        console.log(response.data)
        setBCH(response.data["price"])
    }
    ) 
       },[])



useEffect(()=>{
 WalletAPI.getPrice({"TradePair":"ETHUSDC"}).then((response)=>{
        console.log(response.data)
        setETH(response.data["price"]);
        
    }
    ) 
},[])

useEffect(()=>{
    balancelist();
},[BTC,ETH,BCH])






  const  balancelist=()=>{
        const UID= user.UID;
        console.log(UID);
        WalletAPI.getBalance({UID}).then((response) => {
        const data = response.data;

        setPBalance([
            {
             name:"BTC",
             balance:parseFloat(data["BTC"]).toFixed(2),
             available:data["BTC"]-data["FreezeBTC"]
            },
            {
             name:"BCH",
             balance:parseFloat(data["BCH"]).toFixed(2),
             available:data["BCH"]-data["FreezeBCH"]
            },
            {
                name:"ETH",
                balance:parseFloat(data["ETH"]).toFixed(2),
                available:data["ETH"]-data["FreezeETH"]  
            },
            {
                name:"USDC",
                balance:parseFloat(data["USDC"]).toFixed(2),
                available:data["USDC"]-data["FreezeUSDC"]  
            }

        ]);
        var totalBalance = parseFloat(BTC*data["BTC"]+0)+parseFloat(BCH*data["BCH"]+0)+parseFloat(ETH*data["ETH"]+0)+parseFloat(data["USDC"]+0)+0;
        settotal((totalBalance).toFixed(2)) ;
       
        });
       
      }
    
useEffect(()=>{
    setrender(PBalance);
},[PBalance])



      const searchcontent=(event)=>{
        setcontent(event.target.value)
       
    }
    
    const handlesearch=()=>{
        if (content===""){
            setrender(PBalance);
        }
        else{
        const newList=[]
        for (let i = 0; i < PBalance.length; i++) { 
            if(PBalance[i].name===content){    
              newList.push(PBalance[i])
            }
        }
        console.log(newList.length) 
        setrender(newList)
        }
        setcontent("");
    }
    
    
    
return(
    <div>
    <div>
        <SideBar className={classes.sidebar}/>
    </div>
    <div className={classes.mainContainer}>
    
    <div className={classes.Tittle}>Portfolio Balance</div>
    <h4 className={classes.Amount} >${total}</h4>

    <div className={classes.columContainers}>
        <div className={classes.Tittle}>Balance</div>
        <div></div>
        <div> 
        <input className={classes.input} type="text" onChange={searchcontent}></input>
        <button style={{color:'#707070'} } onClick={handlesearch}>Search </button>   
        </div> 
    </div>
    <hr
    style={{
        color: '#707070',
        height: 3,
        width:'90%'
    }}/>

    <div className={classes.infoContainers}>
    <div className={classes.infoText}>Asset</div>
    <div className={classes.infoText}>Balance</div>
    <div className={classes.infoText}> Available Balance</div>
    <div></div>
    </div>
    <hr
    style={{
        color: '#707070',
        height: 3,
        width:'90%'
    }}/>


   {/*} {render.map((item, index) => {
          return (
            <li key={index} className={item.name}>
                {item.name} 
                <span>  {item.balance}  </span>
                <span>  {item.available}</span>
                <button>Trade</button>
            </li>
          );
        })}*/}

{render.map((item, index) => {
          return (
            <div>
            <div className={classes.infoContainers} key={index}>
            <div className={classes.infoText}>{item.name}</div>
            <div className={classes.infoText}>{item.balance}</div>
            <div className={classes.infoText}>{item.available}</div>
            <div className={classes.button}>Trade</div>
            </div>
            <hr
    style={{
        color: '#707070',
        height: 3,
        width:'90%'
    }}/>
            </div>
            
          );
        })}


  </div>
  </div>
)
}

export default Wallet