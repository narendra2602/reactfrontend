import axios from 'axios';
const PRODUCT_API_BASE_URL = "http://192.168.1.13:8080/api";
let token = null;
let user = null;

class ProductService {


    getProduct() {
        user = JSON.parse(localStorage.getItem('user'));
        console.log(JSON.stringify(user));
        token = user.Authorization;
       
        return axios.get(PRODUCT_API_BASE_URL + '/offer', { headers: { Authorization: token } });
    }

    addProduct(product) {
        //        token=localStorage.getItem('user');
        user = localStorage.getItem('user');
        token = user.Authorization;

        return axios.post(PRODUCT_API_BASE_URL + '/product', product, { headers: { Authorization: token } });
    }


    updateProduct(product, id) {
        return axios.put(PRODUCT_API_BASE_URL + '/product/' + id, product, { headers: { Authorization: token } });
    }

    getProductById(id) {
        return axios.get(PRODUCT_API_BASE_URL + '/product/' + id, { headers: { Authorization: token } });
    }

}

export default new ProductService(); 