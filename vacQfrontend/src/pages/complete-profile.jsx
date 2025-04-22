// /pages/complete-profile.jsx
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CompleteProfile() {
  const [formData, setFormData] = useState({ tel: '', role: 'user' });
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  
  useEffect(() => {
    const userStr = params.get('user');
    if (userStr) {
      setUserInfo(JSON.parse(decodeURIComponent(userStr)));
    }
  }, []);

  const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/v1/auth/complete-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userInfo, ...formData })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  };

  if (!userInfo) return <p>Loading Google Info...</p>;

  return (
    <form onSubmit={onSubmit}>
      <h2>Complete Your Registration</h2>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <input name="tel" type="text" placeholder="Phone Number" onChange={onChange} required />
      <select name="role" onChange={onChange} required>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default CompleteProfile;
