import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const Info_API_BASE_URL="https://sandbi.us:8443/SandBi";

class InfoAPI{
    getTradePairs(Currency){
        return axios.post(Info_API_BASE_URL+'/Info/TradePairs.jsp',
            JSON.stringify(Currency),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
        // axios.post(Info_API_BASE_URL+'/Info/TradePair.jsp',
        //     JSON.stringify(Currency),
        //     {
        //         headers:{'Content-Type':'application/json'},
        //         withCredentials:true
        //     }
        // ).then((response)=>{
        //     console.log(response.data)
        //     var newlist={}
        //  for (let [key,value] of Object.entries(response.data)) {
        //      var data= JSON.parse(value)
        //      newlist[key]=data
        //    }
        //   return newlist
        // })

    }
    getTradePair(TradePair){
        return axios.post(Info_API_BASE_URL+'/Info/TradePair.jsp',
            JSON.stringify(TradePair),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }
    getCoins(){
        return axios.post(Info_API_BASE_URL+'/Info/Coins.jsp',
            JSON.stringify(),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }

}
export default new InfoAPI()