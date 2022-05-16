import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const C2C_API_BASE_URL="https://sandbi.us:8443/SandBi";
class C2CAPI{
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
    getPOrder(data){
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/PendingOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    getHistory(TPair){
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/HistoryOrder.jsp',
            JSON.stringify(TPair),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    getUserHistory(data){
        console.log(data);
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/HistoryUserOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

    createOrder(data){
        console.log(data)
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/CreateOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    AcceptOrder(data){
        console.log(data)
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/AcceptOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

    CancelPendingOrder(data){
        console.log(data)
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/CancelPendingOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    FinishOrder(data){
        console.log(data)
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/FinishOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    CancelAcceptedOrder(data){
        console.log(data)
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/CancelAcceptOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    PayOrder(data){
        console.log(data)
        return axios.post(C2C_API_BASE_URL+'/C2CTrade/PayOrder.jsp',
            JSON.stringify(data),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

}
export default new C2CAPI()