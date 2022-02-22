
import axios from 'axios';
const CATEGORY_API_BASE_URL="http://192.168.1.11:8080/api";
let token = null;
let user = null;


class CategoryService  {
    getCategoryList()
    {
        //token=localStorage.getItem('user');

        user = JSON.parse(localStorage.getItem('user'));
        token = user.Authorization;
        return axios.get(CATEGORY_API_BASE_URL + '/category', { headers: {Authorization: token} });
    }

    


}

export default new CategoryService();
