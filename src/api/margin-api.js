import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const MARGIM_API_BASE_URL="https://sandbi.us:8443/SandBi";
class MarginAPI{
    getMarginBalance(data){
        return axios.post(MARGIM_API_BASE_URL+'/User/MarginBalance.jsp',
        JSON.stringify(data),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }
}
export default new MarginAPI()