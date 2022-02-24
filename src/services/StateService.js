import axios from 'axios';
const BASE_URL="http://192.168.1.13:8080/api/state";

let user=null;
let token=null;
class StateService{

    getStateList()
    {
        user = JSON.parse(localStorage.getItem('user'));
        token= user.Authorization;
        return axios.get(BASE_URL, {headers: {Authorization: token}});


    }


}

 
export default new StateService();