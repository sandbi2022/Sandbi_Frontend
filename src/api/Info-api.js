import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const Info_API_BASE_URL="http://sandbi.us:8080/SandBi";

class InfoAPI{
    getTradePair(Currency){
        return axios.post(Info_API_BASE_URL+'/Info/TradePair.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

}
export default new InfoAPI()