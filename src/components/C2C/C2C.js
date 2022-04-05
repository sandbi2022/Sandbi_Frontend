import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
const C2C =()=>{

    const classes = useStyles();
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({})
    const [PBalance,setPBalance] = useState()
    const TradeData=[
		{
			Advertiser: "IDxxx",
			Price: 10,
            Limit:0,
            Availabke:1000,
            Payment:"xxx"
			
		} ,
        { 
			Advertiser: "IDxxx",
			Price: 10,
            Limit:0,
            Availabke:1000,
            Payment:"xxx"
		} ,
		{
            Advertiser: "IDxxx",
			Price: 10,
            Limit:0,
            Availabke:1000,
            Payment:"xxx"
		},
        {
            Advertiser: "IDxxx",
			Price: 10,
            Limit:0,
            Availabke:1000,
            Payment:"xxx"
        },
        {
            Advertiser: "IDxxx",
			Price: 10,
            Limit:0,
            Availabke:1000,
            Payment:"xxx"
        } 
];

    
    

    return(
        <div >
          <div>C2C Trading</div>
          <button>BUY</button>
          <button>Sell</button>
          <button>ACoin</button>
          <button>BCoin</button>
          <button>CCoin</button>
          <button>DCoin</button>
          
          <div>Amout</div>
          <div > 
			 <input type="text"></input>
			<button >Search </button>   
		  </div> 

          <div>Payment</div>
          <div > 
			 <select> 
                   <option >all payment</option>
                    <option >check</option>
                    <option >card</option>
            </select>	
		 </div> 
         <button >Refresh </button> 

          {TradeData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                      {item.Asset} 
                      <span>  {item.Advertiser}  </span>
                      <span>  {item.Price}</span>
                      <span>  {item.Limit}</span>
                      <span>  {item.Availabke}</span>
                      <span>  {item.Payment}</span>
                      <button>bUY xxx</button>
                  </li>
                );
              })}


        </div>
    )
}

export default C2C