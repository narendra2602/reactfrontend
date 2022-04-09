import axios from 'axios';
const ORDER_API_BASE_URL = "http://192.168.1.13:8080/api";
let token = null;
let user = null;

class OrderService {

    getOrderList()
    {
        
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;
        
        let urlString='/order';

        
        if(user.role==='Stockiest')
        {
            urlString='/order/stockiest/'+user.stkcode;

        }
        else if(user.role==='CF')
        {
            urlString='/order/cf/'+user.cfcode;
        }

      //  return axios.get(ORDER_API_BASE_URL + urlString,  { headers: { Authorization: token } });
        return axios.get(urlString,  { headers: { Authorization: token } });

    }


    getOrderDetailByOrderno(orderno)
    {
        
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;

  //      return axios.get(ORDER_API_BASE_URL + '/order/orderdetail/'+ orderno, { headers: { Authorization: token } });
        return axios.get('/order/orderdetail/'+ orderno, { headers: { Authorization: token } });
        

    }

    addOrder(order) {
        //        token=localStorage.getItem('user');
        //user = localStorage.getItem('user');
        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;
        let urlString='/order';

       
//        return axios.post(PRODUCT_API_BASE_URL + '/product', product, { headers: { Authorization: token } });
        return axios.post('/order', order, { headers: { Authorization: token } });
    }

}

export default new OrderService();