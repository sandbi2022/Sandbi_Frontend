import React, {useRef, useState} from "react";
import { loadStdlib } from '@reach-sh/stdlib'
//import { FormStyle } from "../Form.style";
//import { Button, TransactionButton } from "../Button.styles";
//import { BodyText } from "./MyAlgoWallet.styles";

const reach = loadStdlib("ALGO")

const TransferFund = ({account, getBalance}) => {
    const transferAmount = useRef()
    const receiverAddress = useRef()
    const [isLoading, setLoading] = useState(false)

    const transferFund = async () =>{
        try{
        setLoading(true)
        const receiver = await reach.connectAccount({
             addr: receiverAddress.current
         })
         console.log(receiver)
 
         await reach.transfer(account.current, receiver, reach.parseCurrency(transferAmount.current))
         await getBalance()
         setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
        

     }

    return(
        <div>
            <br/>
            <div>Transfer Fund</div>
            <div onChange = {(e) => receiverAddress.current = e.target.value} placeholder="Receiver address" /><br/>
            <div onChange = {(e) => transferAmount.current = e.target.value} placeholder="Amount" /><br/>
            <button onClick ={transferFund}>{isLoading ? "loading...": "Transfer Fund"}</button>
        </div>
    )
}

export default TransferFund