//import axios from 'axios';
import axios from 'axios';
//axios.defaults.baseURL = 'http://3.111.58.95:9090/api';
axios.defaults.baseURL = 'http://192.168.1.13:8080/api';
const LOGIN_API_BASE_URL="/api/user/login";


class LoginService{

        getAuthenticate(login)
        {
            //return axios.post(LOGIN_API_BASE_URL,login);
            return axios.post('/user/login',login);
            
        }
}

export default new LoginService(); 