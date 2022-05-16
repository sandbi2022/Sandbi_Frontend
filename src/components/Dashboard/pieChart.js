import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import { useDispatch, useSelector } from 'react-redux';
import UserServer from '../../api/user-api';


const Manage = () => {
    const [ManageFrom, setManageFrom] = useState(0)
    const [ManageTo, setManageTo] = useState(0)
    const [PieChart, setPieChart] = useState("CurrentBalance")
    const [currency, setCurrency] = useState("USDC")
    const [amount, setAmount] = useState()
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector((state) => state.user.value);

    const setFrom = (event) => {
        if (event.target.value == "Exchange") {
            setManageFrom(0)
        } else if (event.target.value == "C2C") {
            setManageFrom(1)
        } else if (event.target.value == "Margin") {
            setManageFrom(2)
        }
    }
    const setTo = (event) => {
        if (event.target.value == "Exchange") {
            setManageTo(0)
        } else if (event.target.value == "C2C") {
            setManageTo(1)
        } else if (event.target.value == "Margin") {
            setManageTo(2)
        }
    }
    const setCoin = (event) => {
        setCurrency(event.target.value)
    }
    const setInput = (event) => {
        setAmount(event.target.value)
    }
    const handleSubmit = () => {
        console.log(ManageFrom + "," + ManageTo + "," + currency + "," + amount)
        UserServer.setManage({ "UID": user.UID, "ManageFrom": ManageFrom, "ManageTo": ManageTo, "Currency": currency, "Amount": amount }).then((response) => {
            console.log(response.data)
        })
        window.location.reload();

    }
    if(PieChart === "CurrentBalance"){
        CurrentBalance = <div className={classes.SubTitleContainer2}>Current Balance</div>;
    } else {
        CurrentBalance = <div className={classes.SubTitleContainer} onClick={() => setPieChart("CurrentBalance")}>Current Balance</div>
    }
    if(PieChart === "ExchangeAccount"){
        ExchangeAccount = <div className={classes.SubTitleContainer2}>Exchange Account</div>;
    } else {
        ExchangeAccount = <div className={classes.SubTitleContainer} onClick={() => setActive("ExchangeAccount")}>Exchange Account</div>
    }
    if(PieChart === "C2CAccount"){
        C2CAccount = <div className={classes.SubTitleContainer2}>C2C Account</div>;
    } else {
        C2CAccount = <div className={classes.SubTitleContainer} onClick={() => setActive("C2CAccount")}>C2C Account</div>
    }
    if(PieChart === "MarginAccount"){
        MarginAccount = <div className={classes.SubTitleContainer2}>Margin Account</div>;
    } else {
        MarginAccount = <div className={classes.SubTitleContainer} onClick={() => setActive("MarginAccount")}>Margin Account</div>
    }

    nameTable = {"CurrentBalance":"Current Balance", "ExchangeAccount":"Exchange Account", "C2CAccount":"C2C Account", "MarginAccount":"Margin Account"}


    return (
        <div>
            <div className={classes.TitleBalanceContainers}>
                {CurrentBalance}
                {ExchangeAccount}
                {C2CAccount}
                {MarginAccount}
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
                    <div className={classes.SubTitleContainer}>{nameTable[PieChart]}</div>
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
    )

}

export default Manage