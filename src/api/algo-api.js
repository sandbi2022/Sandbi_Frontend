
import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

//const ALGO_API_BASE_URL="https://node.algoexplorerapi.io/";
const ALGO_API_BASE_URL="https://node.testnet.algoexplorerapi.io/";



class ALFOAPI{
    getPUOrder(data){
        console.log(data);
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/PendingUserOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

}
export default new ALGOAPI()