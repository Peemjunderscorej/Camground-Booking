import axios from 'axios'
const API_URL='http://localhost:5000/api/v1/auth/'

//Register user
const register = async (userData) => {
const response = await axios.post(API_URL+'register/',userData)
if(response.data) {
//localStorage.setItem('user',JSON.stringify(response.data))
localStorage.setItem('user',response.data.name)
}
console.log(response.data);
return response.data
}
//Login user
const login = async (userData) => {
const response = await axios.post(API_URL + 'login',userData)
if(response.data) {
//localStorage.setItem('user',JSON.stringify(response.data))
localStorage.setItem('user',response.data.name)
localStorage.setItem('token', response.data.token);
}
console.log(response.data);
return response.data
}


const googleLogin = async (userData) => {
    const response = await axios.post(API_URL + 'google-token', userData);
  
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    console.log(response.data)
    return response.data;
  };
  
  




//Logout user
const logout = () => {
localStorage.setItem('user', null);
}
const authService ={
register,
logout,
login,
googleLogin
}
export default authService;






