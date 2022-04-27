import React, { useRef, useState, useEffect, useContext, Component } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
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
import{useDispatch, useSelector} from 'react-redux';

const Dashboard = () => {
    const classes = useStyles()
    const history = useHistory();
    const user = useSelector((state)=>state.user.value);
    const [C2CBalance, setC2CBal]= useState({})
    const [MBalance, setMBal]= useState({})
    const redirectTransferIn = () => {
        history.push('/Transfer In')
    }
    const redirectWithdraw = () => {
        history.push('/Withdraw')
    }
    const [active, setActive] = useState("CurrentBalance")

    useEffect(() => {
        UserServer.getC2CBal({"UID":user.UID}).then((response)=>{
           
           console.log(response.data)
           setC2CBal(response.data)
           
       }
       ) 
      }, []);

      useEffect(() => {
        UserServer.getMarginBal({"UID":user.UID}).then((response)=>{
           console.log(response.data)
        //    setMBal(response.data)
       }
       ) 
      }, []);







    const Announcement = [
        {
            comment: 'XXXXXXXXXXXXX',
            date: 'XX/XX/XX'
        },
        {
            comment: 'XXXXXXXXXXXXX',
            date: 'XX/XX/XX'
        },
    ]
    const data = [
        {
            name: 'BTC',
            value: 10
        },
        {
            name: 'USDT',
            value: 20
        },
        {
            name: 'HT',
            value: 30
        },
        {
            name: 'ETH',
            value: 50
        }
    ]
    const typeArray=data.map(d=>d.name);

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
                                            <div className={classes.AmountContainer}>0.010000</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>$1000</div>
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
                                                    top:20,
                                                    right: 10,
                                                    data: typeArray
                                                },
                                                series: [
                                                    {
                                                        name: 'Utilization',
                                                        type: 'pie',
                                                        radius: ['50%', '70%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
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
                                                        data: data
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
                                            <div className={classes.AmountContainer}>0.010000</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>$1000</div>
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
                                                    top:20,
                                                    right: 10,
                                                    data: typeArray
                                                },
                                                series: [
                                                    {
                                                        name: 'Utilization',
                                                        type: 'pie',
                                                        radius: ['50%', '70%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
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
                                                        data: data
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
                                            <div className={classes.AmountContainer}>{C2CBalance.FreezeBTC}</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>$1000</div>
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
                                                    top:20,
                                                    right: 10,
                                                    data: typeArray
                                                },
                                                series: [
                                                    {
                                                        name: 'Utilization',
                                                        type: 'pie',
                                                        radius: ['50%', '70%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
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
                                                        data: data
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
                                            <div className={classes.AmountContainer}>0.010000</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>$1000</div>
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
                                                    top:20,
                                                    right: 10,
                                                    data: typeArray
                                                },
                                                series: [
                                                    {
                                                        name: 'Utilization',
                                                        type: 'pie',
                                                        radius: ['50%', '70%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
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
                                                        data: data
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>

                                </div>


                            </div>
                        }

                        {active === "FutureAccount" &&
                            <div>
                                <div className={classes.TitleBalanceContainers}>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("CurrentBalance")}>Current Balance</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("ExchangeAccount")}>Exchange Account</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("C2CTrading")}>C2C Trading</div>
                                    <div className={classes.SubTitleContainer} onClick={() => setActive("MarginAccount")}>Margin Account</div>
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
                                            <div className={classes.AmountContainer}>0.010000</div>
                                            <div className={classes.SubTitleContainer}>BTC</div>
                                        </div>
                                        <div className={classes.SubTitleContainer}>total valuation</div>
                                        <div className={classes.PriceContainer}>$1000</div>
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
                                                    top:20,
                                                    right: 10,
                                                    data: typeArray
                                                },
                                                series: [
                                                    {
                                                        name: 'Utilization',
                                                        type: 'pie',
                                                        radius: ['50%', '70%'],
                                                        avoidLabelOverlap: false,
                                                        label: {
                                                            show: false,
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
                                                        data: data
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