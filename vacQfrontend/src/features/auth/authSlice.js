import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import axios from 'axios'
//Get user from localstorage
//const user = JSON.parse(localStorage.getItem('user'))

const user=localStorage.getItem('user')
const initialState={
    user: user? user: null,
    //user: null,
    isError: false,
    isSuccess:false,
    isLoading: false,
    message: ''
}

//Register new user
export const register =
    createAsyncThunk('auth/register',async(user,thunkAPI)=>{
        console.log(user);
    try {
        return await authService.register(user)
    } catch (error) {
        const message=(error.response && error.response.data &&
        error.response.data.message)||error.message||error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

//Login user
export const login =
createAsyncThunk('auth/login',async(user,thunkAPI)=>{
try {
return await authService.login(user)
} catch (error) {
const message=(error.response && error.response.data &&
error.response.data.message)||error.message||error.toString();
return thunkAPI.rejectWithValue(message)
}
})
//Logout user
export const logout = createAsyncThunk('auth/logout',async()=>{
await authService.logout()
})



// Google login
export const loginWithGoogle = createAsyncThunk(
    'auth/google',
    async (userData, thunkAPI) => {
      try {
        console.log("🔁 1. Before axios.post");
        const res = await axios.post('/api/v1/auth/google-token', userData);
        console.log("✅ 2. After axios.post - response:", res.data);
        return res.data;
      } catch (err) {
        // ✅ Properly handle backend error
        console.error("🔥 3. Axios error:", err);
        return thunkAPI.rejectWithValue(err?.response?.data || { error: 'Unknown error' });
      }
    }
  );
  




export const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
reset: (state)=> {
state.isLoading = false
state.isError = false
state.isSuccess = false
state.message = ''
}
},
extraReducers: (builder)=> {
builder.addCase(register.pending, (state)=>{
state.isLoading=true
})
.addCase(login.pending, (state)=>{
    state.isLoading=true
    })
    .addCase(login.fulfilled,(state, action)=>{
    state.isLoading = false
    state.isSuccess=true
    state.user=action.payload
    })
    .addCase(login.rejected,(state, action)=>{
    state.isLoading = false
    state.isError=true
    state.message=action.payload
    state.user=null
    })
    .addCase(logout.fulfilled,(state)=>{
    state.user=null
    })

    .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
    })
    .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
    })
   
    
},
})
export const {reset} = authSlice.actions
export default authSlice.reducer

















