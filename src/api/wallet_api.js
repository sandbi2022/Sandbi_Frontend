import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const Wallet_API_BASE_URL="http://sandbi.us:8080/SandBi";

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


 
}
export default new WalletAPI()