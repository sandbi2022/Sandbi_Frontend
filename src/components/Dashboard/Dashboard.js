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

const Dashboard = () => {
    const classes = useStyles()
    const history = useHistory();

    const redirectTransferIn=()=>{
        history.push('/Transfer In')
    }
    const redirectWithdraw=()=>{
        history.push('/Withdraw')
    }
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
    const data=[
        {
            type:'BTC',
            value:10
        },
        {
            type:'USDT',
            value:20
        },
        {
            type:'HT',
            value:30
        },
        {
            type:'ETH',
            value:50
        }
    ]


    return (
        <div>
            <div>
                <SideBar className={classes.sidebar} />
            </div>

            <div className={classes.totalContainer}>
                <div>

                    <div className={classes.UserInfoContainer}>
                        <div className={classes.TitleContainer}>XXXXXXXXX@gmail.com</div>
                        <div className={classes.TitleContainer}>User ID:XXXXXXXX</div>
                    </div>
                    <div className={classes.mainContainer}>
                        <div className={classes.TitleContainer}>
                            Account
                        </div>
                        <div className={classes.TitleBalanceContainers}>
                            <div className={classes.SubTitleContainer}>Current Balance</div>
                            <div className={classes.SubTitleContainer}>C2C Trading</div>
                            <div className={classes.SubTitleContainer}>Margin Account</div>
                            <div className={classes.SubTitleContainer}>Future Account</div>
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
                                            left: 10,
                                            data: data.type
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