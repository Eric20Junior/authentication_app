import { React, useState, useEffect, useContext } from 'react'
import photo from '../../assets/photo.png'
import AuthContext from '../../context/AuthContext';

export const Profile = () => {
  const [bioText, setBioText] = useState(''); // add state variable for bio text

  const { profile } = useContext(AuthContext);
  
  // use useEffect to update the state variable with the sliced bio text
  useEffect(() => {
    if (profile && profile.bio) {
      if (window.innerWidth < 640) { // set condition for mobile view
        setBioText(profile.bio.slice(0, 25) + '...'); // slice text and set state
      } else {
        setBioText(profile.bio); // set full text for desktop view
      }
    }
  }, [profile]);
 
  return (
    <>
        <div>
            <div className='text-center pb-10 '>
        <h1 className='text-[24px] font-normal'>Personal info</h1>
        <p className='text-xs font-light'>Basic info, like your name and photo</p>
      </div>

      <div className='sm:border sm:rounded-[12px] md:w-[800px] sm:mx-auto'>
        <div className='flex justify-between px-5 sm:m-6'>
          <div>
            <h1 className='font-normal text-[24px]'>Profile</h1>
            <p className='text-xs w-40 sm:w-60 font-medium text-[#828282]'>Some info may be visible to other people</p>
          </div>
          <button className='border border-black rounded w-20 h-8 mt-4'>Edit</button>
        </div>

        <div className='mt-14 space-y-9'>
          <div className='flex justify-between px-5 border-b-2 sm:border'>
            <p className='text-[#BDBDBD] text-xs mt-6'>PHOTO</p>
            <img src={photo} alt="" className='w-[70px] h-[60px] mb-4 sm:my-2' />
          </div>

          <div className='flex justify-between px-5 border-b-2 pb-8'>
            <p className='text-[#BDBDBD] text-xs'>NAME</p>
            <p className='text-xs'>{profile.first_name} {profile.last_name}</p>
          </div>

          <div className='flex justify-between px-5 border-b-2 pb-8'>
            <p className='text-[#BDBDBD] text-xs'>BIO</p>
            <p className='text-xs'>{bioText}</p>
          </div>

          <div className='flex justify-between px-5 border-b-2 pb-8'>
            <p className='text-[#BDBDBD] text-xs'>EMAIL</p>
            <p className='text-xs'>{profile.email}</p>
          </div>

        </div>
      </div>
        </div>
    </>
  )
}
