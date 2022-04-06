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
    const [formErrors, setFormErrors] = useState({})
    const [PBalance,setPBalance] = useState([])
    const user = useSelector((state)=>state.user.value)
    const [email,setEmail]= useState("");
    const [Assets, setAssets]= useState({});
    const [UID,setUID]= useState();
    
    useEffect(() => {
        setUID(user.UID)
        console.log(user.UID)
       
      }, []);

    useEffect(() => {
        const ID= user.UID;
        console.log(ID);
        WalletAPI.getBalance({ID}).then((response) => {
        console.log(response.data);
        setPBalance(response.data);
        });
        console.log(PBalance)
      }, []);


    const BalanceData=[
		{
			Asset: "USD",
			Balance:100,
            Available_Balance:0,
			Inorder:0
		} ,
        { 
			Asset: "USD",
			Balance:100,
            Available_Balance:0,
			Inorder:0
		} ,
		{
            Asset: "USD",
			Balance:100,
            Available_Balance:0,
			Inorder:0
		},
        {
            Asset: "USD",
			Balance:100,
            Available_Balance:0,
			Inorder:0
        },
        {
            Asset: "USD",
			Balance:100,
            Available_Balance:0,
			Inorder:0
        } 
];

    
    
return(
    <div>
    <div>Portfolio Balance</div>
    <h4 className="Balance" >{100}</h4>

    <div>Balance</div>
    <div> 
       <input type="text"></input>
      <button >Search </button>   
    </div> 


    {BalanceData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
                {item.Asset} 
                <span>  {item.Balance}  </span>
                <span>  {item.Available_Balance}</span>
                <button>Trade</button>
            </li>
          );
        })}


  </div>
)
}

export default Wallet