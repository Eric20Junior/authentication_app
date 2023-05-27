import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import logo from '../../assets/logo.svg';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

export const Header = () => {
  const { user, logoutUser, profile } = useContext(AuthContext);

  const {
    buttonProps,
    itemProps,
    isOpen,
    setIsOpen,
  } = useDropdownMenu({
    triggerButtonProps: { 'aria-label': 'User menu' },
    menuProps: { 'aria-label': 'User options' },
  });

  return (
    <>
      <div className='flex justify-between shadow-lg w-full h-13 p-4 mb-6'>
        <Link to='/'>
          <img src={logo} alt='' />
        </Link>
        <div className='flex space-x-5'>
          {user ? (
            <div className='flex space-x-1 sm:space-x-5'>
              {user && (
                <button {...buttonProps}>
                  Welcome | {profile.last_name}
                </button>
              )}
              {isOpen && (
                <div
                  className='absolute mt-10 w-[98px] bg-white border rounded-lg shadow-md'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='options-menu'
                >
                  <Link
                    {...itemProps[0]}
                    to={'/'}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  >
                    My Profile
                  </Link>
                  <button
                    {...itemProps[1]}
                    onClick={logoutUser}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
