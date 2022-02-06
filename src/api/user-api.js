import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const USER_API_BASE_URL="http://sandbi.us:8080/SandBi";

class UserAPI{
    getUsers(){
        return axios.get(USER_API_BASE_URL)
    }

    createUser(User){
        return axios.post(USER_API_BASE_URL+'/Register.jsp',
            JSON.stringify(User),
            {
                headers:{
                    'Content-Type':'application/json'
            },
                withCredentials:true
            }
        );
    }
    getUser(User){
        return axios.post(USER_API_BASE_URL+'/Login.jsp',
            JSON.stringify(User),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        );
    }


    getUserId(UserId){
        return axios.get(USER_API_BASE_URL+'/'+UserId);
    }
}
export default new UserAPI()