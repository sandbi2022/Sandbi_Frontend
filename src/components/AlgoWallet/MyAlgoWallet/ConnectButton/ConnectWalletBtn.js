import React from 'react'
import { loadStdlib } from '@reach-sh/stdlib'
//import MyAlgoConnect from '@reach-sh/stdlib/ALGO_MyAlgoConnect';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import ConnectButton from '.';
//import { BodyText } from '../MyAlgoWallet.styles';
const reach = loadStdlib("ALGO")
reach.setWalletFallback(reach.walletFallback({
    providerEnv: 'TestNet', MyAlgoConnect })); 


const ConnectWalletButton = ({connectWallet,accountAddress, accountBal }) => {

    return(
        <div>
            <ConnectButton connectWallet = {connectWallet}/>
                <div>Account Address: {accountAddress} </div>
                <div>Account Balance: {accountBal}</div>
        </div>
    )
}

export default ConnectWalletButton