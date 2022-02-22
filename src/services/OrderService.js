import axios from 'axios';
const ORDER_API_BASE_URL = "http://192.168.1.11:8080/api";
let token = null;
let user = null;

class OrderService {

    getOrderList()
    {
        
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;

        return axios.get(ORDER_API_BASE_URL + '/order',  { headers: { Authorization: token } });

    }


    getUserById(id)
    {
        
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;

        return axios.get(ORDER_API_BASE_URL + '/order/'+ id, { headers: { Authorization: token } });
        

    }


}

export default new OrderService();