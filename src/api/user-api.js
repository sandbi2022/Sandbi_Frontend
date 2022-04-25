import axios from 'axios'
import { config } from 'dotenv';
import App from '../App';

const USER_API_BASE_URL="http://sandbi.us:8080/SandBi";

class UserAPI{
    getUsers(){
        return axios.get(USER_API_BASE_URL)
    }

    createUser(User){
        return axios.post(USER_API_BASE_URL+'/User/Register.jsp',
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
        return axios.post(USER_API_BASE_URL+'/User/Login.jsp',
            JSON.stringify(User),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            }
        ).catch((error) => {
            if (error.response.status === 400) {
               alert('Email or Password is not correct');
              }
        });
    }

    sendMail(User){
        return axios.post(USER_API_BASE_URL+'/User/Mail.jsp',
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


    changePassword(User){
        return axios.post(USER_API_BASE_URL+'/User/ResetPassword.jsp',
        JSON.stringify(User),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }

    IdentityVerification(data){
        return axios.post(USER_API_BASE_URL+'/User/SetInfo.jsp',
        JSON.stringify(data),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
        );
    }
}
export default new UserAPI()