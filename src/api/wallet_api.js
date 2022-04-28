import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const Wallet_API_BASE_URL="https://sandbi.us:8443/SandBi";

class WalletAPI{
    
    getBalance(User){
        console.log(JSON.stringify(User));
        return axios.post(Wallet_API_BASE_URL+'/User/Balance.jsp',
            JSON.stringify(User),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
   
    getPrice(Currency){
        return axios.post(Wallet_API_BASE_URL+'/Price/Price.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

 
}
export default new WalletAPI()