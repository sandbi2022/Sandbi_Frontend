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
    getRiskRate(data){
        return axios.post(MARGIM_API_BASE_URL+'/Margin/GetRiskRate.jsp',
        JSON.stringify(data),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }
    getTotalAsset(data){
        return axios.post(MARGIM_API_BASE_URL+'/Margin/GetTotalAsset.jsp',
        JSON.stringify(data),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }

    getTotalLiability(data){
        console.log(data);
        return axios.post(MARGIM_API_BASE_URL+'/Margin/GetTotalLiability.jsp',
        JSON.stringify(data),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }

    getLend(data){
        console.log(data);
        return axios.post(MARGIM_API_BASE_URL+'/Margin/Lend.jsp',
        JSON.stringify(data),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }
    getReturnBack(data){
        console.log(data);
        return axios.post(MARGIM_API_BASE_URL+'/Margin/ReturnBack.jsp',
        JSON.stringify(data),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }
    
}
export default new MarginAPI()