import { useRef, useState, useEffect, useContext } from 'react';
// import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
const Wallet =()=>{

    //const classes = useStyles();
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({})
    const [PBalance,setPBalance] = useState()
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
                <span>  {item.Inorder}</span>
                <button>Trade</button>
            </li>
          );
        })}


  </div>
)
}

export default Wallet