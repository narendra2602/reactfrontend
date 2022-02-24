// import axios from 'axios';
const axios = require('axios');
const EMPLOYEE_API_BASE_URL="http://192.168.1.13:8080/api/employees";
//const AUTH='Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9tcHQiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE2NDQxNTMwMTB9.RIQoxDdETPxn4yXJsZ4fNI35xAiKs3_-3PA9A2-IeAt4FvMG5ZAjoha2VeZSZXa0CiGDsRIWuEp5FuBVcw_Lpg';
let token=null;
class EmployeeService
{
    
        getEmployee()
        {
            console.log("geemployee");
            token=localStorage.getItem('user');
            console.log(token);
            localStorage.setItem("loggedIn",true);    
            console.log(localStorage.getItem('loggedIn'));   
            return axios.get(EMPLOYEE_API_BASE_URL, { headers: {Authorization: token} });
        }

        createEmployee(employee)
        {
            return axios.post(EMPLOYEE_API_BASE_URL, employee, { headers: {Authorization: token} });
        }

        getEmployeeById(employeeId)
        {
            return axios.get(EMPLOYEE_API_BASE_URL +'/' +employeeId, { headers: {Authorization: token} });
        }

        updateEmployee(employee,employeeId)
        {
            return axios.put(EMPLOYEE_API_BASE_URL +'/' + employeeId, employee,{ headers: {Authorization: token} });
        }

        deleteEmployee(employeeId)
        {
            console.log("Employee id is "+employeeId);
            return axios.delete(EMPLOYEE_API_BASE_URL +'/' + employeeId,{ headers: {Authorization: token} });
            //return axios.delete(EMPLOYEE_API_DELETE_URL +'/' +employeeId, { headers: {Authorization: AUTH} });
        }
}

export default new EmployeeService();
