import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import google from '../../assets/Google.svg'
import fb from '../../assets/Facebook.svg'
import twitter from '../../assets/Twitter.svg'
import github from '../../assets/Gihub.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


export const Signup = () => {

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault();
  
    try {
      const url = 'http://127.0.0.1:8000/account/register/';
      const response = await axios.post(url, {
        username: username,
        email: email,
        password: password,
      });
  
      const data = response.data;
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      navigate('/login');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='pt-4 mx-10 sm:mx-auto sm:my-10 sm:px-10 sm:border sm:border-[#BDBDBD] sm:w-[400px] sm:h-[550px] sm:rounded-[20px] text-[#333333]'>
        <div className='space-y-4'>
          <img src={logo} alt="" />

          <h1 className='font-bold w-60'>Join thousands of learners from around the world </h1>

          <p className='w-72 text-sm '>Master web development by making real-life projects. There are multiple paths for you to choose</p>
        </div>

        <div className='mt-9'>
          <form onSubmit={registerUser}>
            <div>
              <input type="text" name="username" placeholder='Username' value={username} onChange={(e) => {setUsername(e.target.value)}} className='border border-[#BDBDBD] rounded h-[40px] w-[300px] p-2 text-[#828282] text-sm' />
            </div>

            <div>
              <input type="email" name="email" placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} className='border border-[#BDBDBD] rounded h-[40px] w-[300px] p-2 text-[#828282] text-sm' />
            </div>

            <div>
              <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} className='border border-[#BDBDBD] rounded h-[40px] w-[300px] mt-4 p-2 text-[#828282] text-sm' />
            </div>

            <div className='w-[300px] h-[35px] rounded bg-[#2F80ED] mt-4 text-white text-center py-1.5 text-sm font-bold'>
              <button type="submit">Start coding now</button>
            </div>
          </form>
        </div>

        <div className=' mt-8 text-center text-[#828282] text-sm space-y-6'>
          <p>or continue with these social profile</p>

          <div className='flex justify-evenly'>
            <img src={google} alt="" />
            <img src={fb} alt="" />
            <img src={twitter} alt="" />
            <img src={github} alt="" />
          </div>

          <p>Adready a member? 
          <Link to={'/login'}>
            <span className='text-[#2D9CDB]'>Login</span>
          </Link>
            </p>
        </div>
      </div>
    </>
  )
}
