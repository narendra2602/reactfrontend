import axios from 'axios';
const LOGIN_API_BASE_URL="http://192.168.1.13:8080/api/user/login";


class LoginService{

        getAuthenticate(login)
        {
            return axios.post(LOGIN_API_BASE_URL,login);
        }
}

export default new LoginService();