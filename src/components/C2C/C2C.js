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
          <div className={classes.TitleSetting}>C2C Trading</div>
            <div className={classes.mainContainer}>
                <div className={classes.buttonContainer}>
                <button className={classes.SelectButtonSetting}>BUY</button>
                <button className={classes.UnselectButtonSetting}>Sell</button>
                <button className={classes.bottonSetting}>ACoin</button>
                <button className={classes.bottonSetting}>BCoin</button>
                <button className={classes.bottonSetting}>CCoin</button>
                <button className={classes.bottonSetting}>DCoin</button>
                </div>
                <hr
                    style={{
                        color: '#707070',
                        height: 3,
                        width:'90%'
                    }}/>
                <div className={classes.searchContainers}>
                    <div className={classes.subTitleContainer}>
                        <div className={classes.subTitleSetting}>Amout</div>
                        <div className={classes.subsearchContainers}> 
                            <input type="text" className={classes.inputSetting} placeholder="Enter Amount"></input>
                            <button className={classes.searchbuttonSetting}>Search </button>   
                        </div> 
                    </div>
                    <div className={classes.subTitleContainer}>
                        <div className={classes.subTitleSetting}>Payment</div>
                        <div > 
                            <select className={classes.inputSetting2}> 
                                <option >all payment</option>
                                    <option >check</option>
                                    <option >card</option>
                            </select>	
                        </div> 
                    </div>
                    <div className={classes.subTitleContainer2}>
                        <button className={classes.inputSetting2}>Refresh </button> 
                    </div>
                </div>

                <div className={classes.infoContainers}>
                    <div className={classes.subTitleSetting2}>Advertisers</div>
                    <div className={classes.subTitleSetting2}>Price</div>
                    <div className={classes.subTitleSetting2}>Limit/Available</div>
                    <div className={classes.subTitleSetting2}>Payment</div>
                    <div className={classes.subTitleSetting2}>Trade</div>
                </div>
                {TradeData.map((item, index) => {
                        return (
                            <div  className={classes.infoContainers}>
                                <div  className={classes.infoTextSetting}>{item.Advertiser}</div>
                                <div  className={classes.infoTextSetting}>{item.Price}</div>
                                <div>
                                    <div  className={classes.infoTextSetting}>
                                        Limit:{item.Limit}
                                        
                                    </div>
                                    <div  className={classes.infoTextSetting}>
                                        Available{item.Availabke}
                                    </div>
                                    </div>
                                <div  className={classes.infoTextSetting}>{item.Payment}</div>
                                <div><button className={classes.SelectButtonSetting2}>Buy xxx</button></div>
                            </div>
                        
                        );
                    })}
                    {/*<li key={index} className={item.cName}>
                            {item.Asset} 
                            <span>  {item.Advertiser}  </span>
                            <span>  {item.Price}</span>
                            <span>  {item.Limit}</span>
                            <span>  {item.Availabke}</span>
                            <span>  {item.Payment}</span>
                            <button>bUY xxx</button>
                        </li>
                        */}

            </div>
        </div>
    )
}

export default C2C