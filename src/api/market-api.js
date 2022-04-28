import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const Market_API_BASE_URL="https://sandbi.us:8443/SandBi";

class MarketAPI{
   
    getPrice(Currency){
        return axios.post(Market_API_BASE_URL+'/Price/Price.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

    getOpenPrice(Currency){
        return axios.post(Market_API_BASE_URL+'/Price/OpenPrice.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    getOrder(Currency){
        return axios.post(Market_API_BASE_URL+'/Trade/PendingOrder.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    getuserOrder(Currency){
        return axios.post(Market_API_BASE_URL+'/Trade/PendingUserOrder.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    getHistoryOrder(Currency){
        return axios.post(Market_API_BASE_URL+'/Trade/HistoryOrder.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    getUserHistoryOrder(Currency){
        return axios.post(Market_API_BASE_URL+'/Trade/HistoryUserOrder.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
 

     submitTrade(Currency){
        return axios.post(Market_API_BASE_URL+'/Trade/NewTrade.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
 

 
    getGraphData(Currency){
        return axios.post(Market_API_BASE_URL+'/Trade/TradeData.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

    
    

}
export default new MarketAPI()