import React, { useRef, useState, useEffect, useContext, Component } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import InfoAPI from '../../api/Info-api';
import UserServer from '../../api/user-api';
import axios from 'axios';
import { useStyles } from "./style";
import SideBar from '../Sidebar/SideBar';
import { render } from '@testing-library/react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import { Button } from 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import WalletAPI from '../../api/wallet_api';
import Manage from './manage';
import Popup from 'reactjs-popup';
const Dashboard = () => {
    const classes = useStyles()
    const history = useHistory();
    const user = useSelector((state) => state.user.value);
    const [C2CBalance, setC2CBal] = useState({})
    const [MBalance, setMBal] = useState({})
    const [exBalance, setexBal] = useState({})
    const [Coins, setCoins] = useState({})
    const redirectTransferIn = () => {
        history.push('/Transfer In')
    }
    const redirectWithdraw = () => {
        history.push('/Withdraw')
    }
    const [active, setActive] = useState("CurrentBalance")

    const [BTC, setBTC] = useState();
    const [BCH, setBCH] = useState();
    const [ETH, setETH] = useState();
    // const [Exchange,setExchange]=useState()
    // const [C2C,setC2C]=useState()
    // const [Margin,setMargin]=useState()

    useEffect(() => {
        InfoAPI.getCoins().then((response) => {
            console.log(response.data)
            setCoins(response.data)


        }
        )
    }, []);

    useEffect(() => {
        WalletAPI.getPrice({ "TradePair": "BTCUSDC" }).then((response) => {
            console.log(response.data)
            setBTC(response.data["price"])


        }
        )
    }, []);


    useEffect(() => {
        WalletAPI.getPrice({ "TradePair": "BCHUSDC" }).then((response) => {
            console.log(response.data)
            setBCH(response.data["price"])
        }
        )
    }, [])



    useEffect(() => {
        WalletAPI.getPrice({ "TradePair": "ETHUSDC" }).then((response) => {
            console.log(response.data)
            setETH(response.data["price"]);

        }
        )
    }, [])

    useEffect(() => {
        UserServer.getC2CBal({ "UID": user.UID }).then((response) => {
            console.log("c2c")
            console.log(response.data)
            setC2CBal(response.data)
            //    setC2C(((parseFloat(BTC*C2CBalance.BTC+0)+parseFloat(BCH*C2CBalance.BCH+0)+parseFloat(ETH*C2CBalance.ETH+0)+parseFloat(C2CBalance.USDC+0)+0)/BTC).toFixed(5))

        }
        )
    }, []);

    useEffect(() => {
        UserServer.getMarginBal({ "UID": user.UID }).then((response) => {
            console.log("margin")
            console.log(response.data)
            setMBal(response.data)
            //    setMargin(((parseFloat(BTC*MBalance.BTC+0)+parseFloat(BCH*MBalance.BCH+0)+parseFloat(ETH*MBalance.ETH+0)+parseFloat(MBalance.USDC+0)+0)/BTC).toFixed(5))
            //    console("margin total"+Margin)
        }
        )
    }, []);

    useEffect(() => {
        WalletAPI.getBalance({ "UID": user.UID }).then((response) => {
            console.log("exchange")
            console.log(response.data)
            setexBal(response.data)
            // setExchange(((parseFloat(BTC*exBalance.BTC+0)+parseFloat(BCH*exBalance.BCH+0)+parseFloat(ETH*exBalance.ETH+0)+parseFloat(exBalance.USDC+0)+0)/BTC).toFixed(5))

        }
        )

    }, [])



    const Announcement = [
        {
            comment: 'Thank you so much for registering to our website',
            date: '5/4/2022'
        },

    ]
    const data = [
        {
            name: 'Exchange Account',

        },
        {
            name: 'C2C Account',

        },
        {
            name: 'Margin Account',

        },

    ]
    const Exchange = ((parseFloat(BTC * exBalance.BTC + 0) + parseFloat(BCH * exBalance.BCH + 0) + parseFloat(ETH * exBalance.ETH + 0) + parseFloat(exBalance.USDC + 0) + 0) / BTC).toFixed(5);
    const C2C = ((parseFloat(BTC * C2CBalance.BTC + 0) + parseFloat(BCH * C2CBalance.BCH + 0) + parseFloat(ETH * C2CBalance.ETH + 0) + parseFloat(C2CBalance.USDC + 0) + 0) / BTC).toFixed(5);
    const Margin = ((parseFloat(BTC * MBalance.BTC + 0) + parseFloat(BCH * MBalance.BCH + 0) + parseFloat(ETH * MBalance.ETH + 0) + parseFloat(MBalance.USDC + 0) + 0) / BTC).toFixed(5);
    const typeArray = data.map(d => d.name);

    const dataex = [
        // {
        //     name: 'BTC: ' + parseFloat(exBalance.BTC).toFixed(5),

        // },
        // {
        //     name: 'USDC: ' + parseFloat(exBalance.USDC).toFixed(5),

        // },
        // {
        //     name: 'BCH: ' + parseFloat(exBalance.BCH).toFixed(5),

        // },
        // {
        //     name: 'ETH: ' + parseFloat(exBalance.ETH).toFixed(5),

        // }
    ]
    for(let coin of Object.values(Coins)){
        dataex.push({name: coin +': ' + exBalance[coin]});
    }
    const typeArrayex = dataex.map(d => d.name);

    console.log(Object.values(Coins));
    
    const datamar = [
        // {
        //     name: 'BTC: ' + MBalance.BTC,

        // },
        // {
        //     name: 'USDC: ' + MBalance.USDC,

        // },
        // {
        //     name: 'BCH: ' + MBalance.BCH,

        // },
        // {
        //     name: 'ETH: ' + MBalance.ETH,

        // }
    ]
    for(let coin of Object.values(Coins)){
        datamar.push({name: coin +': ' + MBalance[coin]});
    }
    console.log(datamar);
    const typeArraymar = datamar.map(d => d.name);

    const datac2c = [
        // {
        //     name: 'BTC: ' + C2CBalance.BTC,

        // },
        // {
        //     name: 'USDC: ' + C2CBalance.USDC,

        // },
        // {
        //     name: 'BCH: ' + C2CBalance.BCH,

        // },
        // {
        //     name: 'ETH: ' + C2CBalance.ETH,

        // }
    ]
    for(let coin of Object.values(Coins)){
        datac2c.push({name: coin +': ' + C2CBalance[coin]});
    }
    const typeArrayc2c = datac2c.map(x => x.name);
    console.log('array' + typeArrayc2c)
    //  console.log('array'+typeArray)
    return (
        <div>
            <div>
                <SideBar className={classes.sidebar} />
            </div>

            <div className={classes.totalContainer}>
                <div>

                    <div className={classes.UserInfoContainer}>
                        <div className={classes.TitleContainer}>{user.email}</div>
                        <div className={classes.TitleContainer}>User Name:{user.username}</div>
                    </div>
                    <div className={classes.mainContainer}>
                        <div className={classes.TitleContainer}>
                            Account
                        </div>
                        {active === "CurrentBalance" &&
                            <div>
                                <div className={classes.TitleBalanceContainers}>
                                    <div className={classes.SubTitleContainer2}>Current Balance</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("ExchangeAccount")}>Exchange Account</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("C2CTrading")}>C2C Trading</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("MarginAccount")}>Margin Account</div>
                                    <Popup contentStyle={{
                                        width: "20%", height: '40%', backgroundColor: '#04011A'
                                    }}
                                        position="bottom right"
                                        trigger={<button className={classes.buttonSetting}
                                        >Manage</button>}>
                                        {close => (
                                            <Manage />
                                        )}
                                    </Popup>
                                </div>
                                <hr
                                    style={{
                                        color: '#707070',
                                        height: 3,
                                        width: '90%'
                                    }} />
                                <div className={classes.infoContainer}>
                                    <div>
                                        <div className={classes.SubTitleContainer}>Account Balance</div>
                                        <div style={{ gridTemplateColumns: 'auto auto', display: 'grid', width: '40%' }}>
                                            <div className={classes.AmountContainer}>{(parseFloat(C2C + 0) + parseFloat(Exchange + 0) + parseFloat(Margin + 0)).toFixed(5)}</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>{((parseFloat(C2C + 0) + parseFloat(Exchange + 0) + parseFloat(Margin + 0)) * BTC).toFixed(5)}</div>
                                    </div>
                                    <div>
                                        <ReactEcharts
                                            option={{
                                                tooltip: {
                                                    trigger: 'item',
                                                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                                                },
                                                legend: {
                                                    orient: 'vertical',
                                                    top: '5%',
                                                    left: '0%',
                                                    data: typeArray,
                                                    textStyle: {
                                                        color: 'fffdd0'
                                                    }
                                                },
                                                series: [
                                                    {
                                                        name: 'Total Balance',
                                                        type: 'pie',
                                                        radius: ['25%', '40%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
                                                            position: 'center'
                                                        },
                                                        emphasis: {
                                                            label: {
                                                                show: true,
                                                                fontSize: '10px',
                                                                fontWeight: 'bold'
                                                            }
                                                        },
                                                        labelLine: {
                                                            show: false
                                                        },
                                                        data: [{ name: typeArray[0], value: Exchange }, { name: typeArray[1], value: C2C }, { name: typeArray[2], value: Margin }]
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>

                                </div>

                                <div style={{ gridTemplateColumns: '50% 50%', display: 'grid', width: '100%' }}>
                                    <div>
                                        <button className={classes.buttonGreen} onClick={redirectTransferIn}>Transfer In</button>
                                    </div>
                                    <div>
                                        <button className={classes.buttonRed} onClick={redirectWithdraw}>Withdraw</button>
                                    </div>
                                </div>
                            </div>
                        }
                        {active === "ExchangeAccount" &&
                            <div>
                                <div className={classes.TitleBalanceContainers}>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("CurrentBalance")}>Current Balance</div>
                                    <div className={classes.SubTitleContainer2} >Exchange Account</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("C2CTrading")}>C2C Trading</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("MarginAccount")}>Margin Account</div>
                                    <Popup contentStyle={{
                                        width: "20%", height: '40%', backgroundColor: '#04011A'
                                    }}
                                        position="bottom right"
                                        trigger={<button className={classes.buttonSetting}
                                        >Manage</button>}>
                                        {close => (
                                            <Manage />
                                        )}
                                    </Popup>
                                </div>
                                <hr
                                    style={{
                                        color: '#707070',
                                        height: 3,
                                        width: '90%'
                                    }} />


                                <div className={classes.infoContainer}>
                                    <div>
                                        <div className={classes.SubTitleContainer}>Account Balance</div>
                                        <div style={{ gridTemplateColumns: 'auto auto', display: 'grid', width: '40%' }}>
                                            <div className={classes.AmountContainer}>{Exchange}</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>{parseFloat(BTC * exBalance.BTC + 0) + parseFloat(BCH * exBalance.BCH + 0) + parseFloat(ETH * exBalance.ETH + 0) + parseFloat(exBalance.USDC + 0) + 0}</div>
                                    </div>
                                    <div>
                                        <ReactEcharts
                                            option={{
                                                tooltip: {
                                                    trigger: 'item',
                                                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                                                },
                                                legend: {
                                                    orient: 'vertical',
                                                    top: '5%',
                                                    left: '0%',
                                                    fontSize: '5',
                                                    data: typeArrayex,
                                                    textStyle: {
                                                        color: 'fffdd0'
                                                    }
                                                },
                                                series: [
                                                    {
                                                        name: 'Value ratio',
                                                        type: 'pie',
                                                        radius: ['25%', '40%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,

                                                            position: 'center'
                                                        },
                                                        emphasis: {
                                                            label: {
                                                                show: true,
                                                                fontSize: '10',
                                                                fontWeight: 'bold'
                                                            }
                                                        },
                                                        labelLine: {
                                                            show: false
                                                        },
                                                        data: [{ name: typeArrayex[0], value: exBalance.BTC }, { name: typeArrayex[1], value: exBalance.USDC / BTC }, { name: typeArrayex[2], value: parseFloat(BCH * exBalance.BCH + 0) / BTC }, { name: typeArrayex[3], value: parseFloat(ETH * exBalance.ETH + 0) / BTC }]
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>
                        }
                        {active === "C2CTrading" &&
                            <div>
                                <div className={classes.TitleBalanceContainers}>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("CurrentBalance")}>Current Balance</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("ExchangeAccount")}>Exchange Account</div>
                                    <div className={classes.SubTitleContainer2}>C2C Trading</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("MarginAccount")}>Margin Account</div>
                                    <Popup contentStyle={{
                                        width: "20%", height: '40%', backgroundColor: '#04011A'
                                    }}
                                        position="bottom right"
                                        trigger={<button className={classes.buttonSetting}
                                        >Manage</button>}>
                                        {close => (
                                            <Manage />
                                        )}
                                    </Popup>
                                </div>
                                <hr
                                    style={{
                                        color: '#707070',
                                        height: 3,
                                        width: '90%'
                                    }} />
                                <div className={classes.infoContainer}>
                                    <div>
                                        <div className={classes.SubTitleContainer}>Account Balance</div>
                                        <div style={{ gridTemplateColumns: 'auto auto', display: 'grid', width: '40%' }}>
                                            <div className={classes.AmountContainer}>{((parseFloat(BTC * C2CBalance.BTC + 0) + parseFloat(BCH * C2CBalance.BCH + 0) + parseFloat(ETH * C2CBalance.ETH + 0) + parseFloat(C2CBalance.USDC + 0) + 0) / BTC).toFixed(5)}</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>{/*C2CBalance.BTC*BTC+C2CBalance.USDC+C2CBalance.BCH*BCH+C2CBalance.ETH*ETH*/parseFloat(BTC * C2CBalance.BTC + 0) + parseFloat(BCH * C2CBalance.BCH + 0) + parseFloat(ETH * C2CBalance.ETH + 0) + parseFloat(C2CBalance.USDC + 0) + 0}</div>
                                    </div>
                                    <div>
                                        <ReactEcharts
                                            option={{
                                                tooltip: {
                                                    trigger: 'item',
                                                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                                                },
                                                legend: {
                                                    orient: 'vertical',
                                                    top: '5%',
                                                    left: '0%',
                                                    data: typeArrayc2c,
                                                    textStyle: {
                                                        color: 'fffdd0'
                                                    }
                                                },
                                                series: [
                                                    {
                                                        name: 'Value ratio',
                                                        type: 'pie',
                                                        radius: ['25%', '40%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
                                                            fontSize: '10px',
                                                            position: 'center'
                                                        },
                                                        emphasis: {
                                                            label: {
                                                                show: true,
                                                                fontSize: '30',
                                                                fontWeight: 'bold'
                                                            }
                                                        },
                                                        labelLine: {
                                                            show: false
                                                        },
                                                        data: [{ name: typeArrayc2c[0], value: C2CBalance.BTC }, { name: typeArrayc2c[1], value: C2CBalance.C / BTC }, { name: typeArrayc2c[2], value: parseFloat(BCH * C2CBalance.BCH + 0) / BTC }, { name: typeArrayc2c[3], value: parseFloat(ETH * C2CBalance.ETH + 0) / BTC }]
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {active === "MarginAccount" &&
                            <div>
                                <div className={classes.TitleBalanceContainers}>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("CurrentBalance")}>Current Balance</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("ExchangeAccount")}>Exchange Account</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("C2CTrading")}>C2C Trading</div>
                                    <div className={classes.SubTitleContainer2}>Margin Account</div>
                                    <Popup contentStyle={{
                                        width: "20%", height: '40%', backgroundColor: '#04011A'
                                    }}
                                        position="bottom right"
                                        trigger={<button className={classes.buttonSetting}
                                        >Manage</button>}>
                                        {close => (
                                            <Manage />
                                        )}
                                    </Popup>
                                </div>
                                <hr
                                    style={{
                                        color: '#707070',
                                        height: 3,
                                        width: '90%'
                                    }} />


                                <div className={classes.infoContainer}>
                                    <div>
                                        <div className={classes.SubTitleContainer}>Account Balance</div>
                                        <div style={{ gridTemplateColumns: 'auto auto', display: 'grid', width: '40%' }}>
                                            <div className={classes.AmountContainer}>{((parseFloat(BTC * MBalance.BTC + 0) + parseFloat(BCH * MBalance.BCH + 0) + parseFloat(ETH * MBalance.ETH + 0) + parseFloat(MBalance.USDC + 0) + 0) / BTC).toFixed(5)}</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>{parseFloat(BTC * MBalance.BTC + 0) + parseFloat(BCH * MBalance.BCH + 0) + parseFloat(ETH * MBalance.ETH + 0) + parseFloat(MBalance.USDC + 0) + 0}</div>
                                    </div>
                                    <div>
                                        <ReactEcharts
                                            option={{
                                                tooltip: {
                                                    trigger: 'item',
                                                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                                                },
                                                legend: {
                                                    orient: 'vertical',
                                                    top: '5%',
                                                    left: '0%',
                                                    data: typeArraymar,
                                                    textStyle: {
                                                        color: 'fffdd0'
                                                    }
                                                },
                                                series: [
                                                    {
                                                        name: 'Value ratio',
                                                        type: 'pie',
                                                        radius: ['25%', '40%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
                                                            position: 'center'
                                                        },
                                                        emphasis: {
                                                            label: {
                                                                show: true,
                                                                fontSize: '10',
                                                                fontWeight: 'bold'
                                                            }
                                                        },
                                                        labelLine: {
                                                            show: false
                                                        },
                                                        data: [{ name: typeArraymar[0], value: MBalance.BTC }, { name: typeArraymar[1], value: MBalance.USDC / BTC }, { name: typeArraymar[2], value: parseFloat(BCH * MBalance.BCH + 0) / BTC }, { name: typeArraymar[3], value: parseFloat(ETH * MBalance.ETH + 0) / BTC }]
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={classes.AnnouncementContainer}>
                    <div className={classes.TitleContainer}>
                        Announcement
                    </div>
                    <hr
                        style={{
                            color: '#707070',
                            height: 3,
                            width: '90%'
                        }} />
                    {Announcement.map((item, index) => {
                        return (
                            <div>
                                <div style={{
                                    color: 'white',
                                    fontSize: '20px', textAlign: 'left', marginLeft: '5px'
                                }}>{item.comment}</div>
                                <div style={{
                                    color: 'white',
                                    fontSize: '15px', textAlign: 'right', marginRight: '5px'
                                }}>{item.date}</div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}

export default Dashboard