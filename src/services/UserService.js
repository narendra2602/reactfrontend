
import axios from 'axios';
const USER_API_BASE_URL = "http://3.111.58.95:9090/api";
let token = null;
let user = null;

class UserService {

    addUser(userdata) {
        //        token=localStorage.getItem('user');
        user = localStorage.getItem('user');
        token = user.Authorization;

        //return axios.post(USER_API_BASE_URL + '/user', userdata, { headers: { Authorization: token } });
        return axios.post('/user', userdata, { headers: { Authorization: token } });
    }

    getUserList()
    {
        
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;

        //return axios.get(USER_API_BASE_URL + '/user',  { headers: { Authorization: token } });
        return axios.get('/user',  { headers: { Authorization: token } });

    }

    getUserById(id)
    {
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;

//        return axios.get(USER_API_BASE_URL + '/user/'+ id, { headers: { Authorization: token } });
        return axios.get('/user/'+ id, { headers: { Authorization: token } });

    }


    getRoleCombo(state_code,role)
    {
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;
        console.log(USER_API_BASE_URL + '/user/'+ state_code+'/'+role);
//        return axios.get(USER_API_BASE_URL + '/user/'+ state_code+'/'+role, { headers: { Authorization: token } });
        return axios.get('/user/'+ state_code+'/'+role, { headers: { Authorization: token } });

    }

    checkCodeExists(code)
    {
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;
        
//        return axios.get(USER_API_BASE_URL + '/user/exist/'+ code, { headers: { Authorization: token } });
        return axios.get('/user/exist/'+ code, { headers: { Authorization: token } });

    }


}

export default new UserService();