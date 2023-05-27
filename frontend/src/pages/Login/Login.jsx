import {React, useContext} from 'react'
import logo from '../../assets/logo.svg'
import google from '../../assets/Google.svg'
import fb from '../../assets/Facebook.svg'
import twitter from '../../assets/Twitter.svg'
import github from '../../assets/Gihub.svg'
import { Link } from "react-router-dom";
import AuthContext from '../../context/AuthContext'

export const Login = () => {
  const {loginUser} = useContext(AuthContext)

  return (
    <>
      <div className='pt-4 mx-10 sm:mx-auto sm:my-10 sm:px-10 sm:border sm:border-[#BDBDBD] sm:w-[400px] sm:h-[450px] sm:rounded-[20px] text-[#333333]'>
        <div className='space-y-4'>
          <img src={logo} alt="" />

          <h1 className='font-bold w-60'>Login</h1>

        </div>

        <div className='mt-9'>
          <form onSubmit={loginUser}>
            <div>
              <input type="text" name="username" placeholder='Username' className='border border-[#BDBDBD] rounded h-[40px] w-[300px] p-2 text-[#828282] text-sm' />
            </div>
            <div>
              <input type="password" name="password" placeholder='Password' className='border border-[#BDBDBD] rounded h-[40px] w-[300px] mt-4 p-2 text-[#828282] text-sm' />
            </div>

            <div className='w-[300px] h-[35px] rounded bg-[#2F80ED] mt-4 text-white text-center py-1.5 text-sm font-bold'>
              <input type="submit" />
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

          <p>Don’t have an account yet? 
            <Link to={'/signup/'}><span className='text-[#2D9CDB]'> Register</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
