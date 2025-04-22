import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login,reset, loginWithGoogle} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login(){
    const [formData,setFormData]=useState({
        email: '',
        password: '',
    });
    const {name,email,password,password2}=formData;
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const {user,isLoading, isError, isSuccess,message}=useSelector(state=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        //redirect when logged in
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    },[isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const onSubmit =(e) => {
        e.preventDefault()
        const userData={
            email,
            password
        }
        dispatch(login(userData))
    }
    
return(
<>
<section className="heading">
    <h1>
        <FaSignInAlt /> Login
    </h1>
    <p>Please login to get support</p>
</section>

<section className='form'>
    <form onSubmit={onSubmit}>

        <div className="form-group">
            <input type="email" className='form-control'
                id='email' name='email' value={email} onChange={onChange}
                placeholder='Enter Your email' required/>
        </div>

        <div className="form-group">
            <input type="password" className='formcontrol' id='password' name='password' value={password}
                onChange={onChange} placeholder='Enter Your password' required/>
        </div>

        <div className='form-group'>
            <button className='btn btnblock'>Submit</button>
        </div>
        



        <div className="form-group">
  <p>or login with Google:</p>
  <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google User:', decoded);
  
      const userData = {
        email: decoded.email,
        name: decoded.name,
        sub: decoded.sub,
        picture: decoded.picture,
      };
  
      console.log('👉 Sending to backend:', userData);
      const resultAction = await dispatch(loginWithGoogle(userData));
  
      if (loginWithGoogle.fulfilled.match(resultAction)) {
        const payload = resultAction.payload;
  
        console.log("🎯 Payload after dispatch:", payload);
  
        setTimeout(() => {
          if (payload?.needProfile) {
            const encoded = encodeURIComponent(JSON.stringify(payload.tempUser));
            navigate(`/complete-profile?user=${encoded}`);
          } else {
            navigate('/');
          }
        }, 100); // Delay just enough to avoid Google SDK conflict
      } else {
        toast.error(resultAction.payload?.error || 'Google login failed');
      }
    } catch (err) {
      console.error('🔥 Google login error:', err);
      toast.error('Something went wrong during Google login');
    }
  }}
  
  onError={() => {
    toast.error('Google Sign In was unsuccessful');
  }}
/>

</div>





    </form>
</section>
</>
)
}
export default Login;