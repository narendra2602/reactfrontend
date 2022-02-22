
import axios from 'axios';
const USER_API_BASE_URL = "http://192.168.1.11:8080/api";
let token = null;
let user = null;

class UserService {

    addUser(userdata) {
        //        token=localStorage.getItem('user');
        user = localStorage.getItem('user');
        token = user.Authorization;

        return axios.post(USER_API_BASE_URL + '/user', userdata, { headers: { Authorization: token } });
    }

    getUserList()
    {
        
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;

        return axios.get(USER_API_BASE_URL + '/user',  { headers: { Authorization: token } });

    }

    getUserById(id)
    {
        
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;

        return axios.get(USER_API_BASE_URL + '/user/'+ id, { headers: { Authorization: token } });
        

    }


}

export default new UserService();